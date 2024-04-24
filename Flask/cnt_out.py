#Ray를 이용한 Spark sql 데이터 이동
# import ray
# ray.shutdown()
# ray.init(log_to_driver=False)
# import os
# os.environ["MODIN_ENGINE"] = "ray"
# from modin.config import Engine
# Engine.put("ray")

# import modin.pandas as mpd



app = Flask(__name__) 

#DataFrame 선언
sourceDF = None
targetDF = None

cols = []

sourceCount =0

#검증 결과 데이터 Execl 쌓는 배열
excelResult = {"0":[],"1":[],"2":[],"3":[],"4":[],"9":[],"10":[]}
stopMig = {"0":False,"1":False,"2":False,"3":False,"4":False}

#로그인 삭제/수정 필요 
@app.route('/action/login', methods=['GET', 'POST'])
def login():
    login_info = request.get_json()['login']
    userid = login_info["id"]
    pw = login_info["pw"]

    conn = pymysql.connect(user='root', passwd='1234', host='192.168.1.197', port=3306, db='metaweaver', charset='utf8')
    cur = conn.cursor()

    sql = "select * from user_login"

    cur.execute(sql)
    result = NULL

    for row in cur:
        if row[0] == userid and row[1] == pw:
            result = True
        else:
            result = False

    data = {"result": result, "userid": userid}
    return data

#접속정보 불러오기 삭제/수정 필요
@app.route('/action/getConnection', methods=['GET', 'POST'])
def getConnection():
    import pymysql

    conn = pymysql.connect(user='root', passwd='1234', host='192.168.1.197', port=3306, db='metaweaver', charset='utf8')
    cur = conn.cursor()

    sql = "select * from connection_info"

    cur.execute(sql)
    data=[]

    for row in cur:
        data.append({"database": row[1], "driver":row[2], "user": row[3], "password":row[4], "ip": row[5], "port": row[6], "sid": row[7], "server": row[8]})

    return jsonify(data)

#검증 시작 전 Excel 배열 초기화
@app.route('/action/VerificationOnlyFirst', methods=['GET','POST'])
def VerificationOnlyFirst():
    global excelResult
    
    excelResult["10"] = [] 
    result = "True"
    return result

#검증만 진행
@app.route('/action/VerificationOnly', methods=['GET','POST'])
def VerificationOnly():
    global excelResult
    
    sourceConnection_info = request.get_json()['sourceConnection_info']
    s_database = sourceConnection_info['database']
    s_driver = sourceConnection_info['driver']
    s_user = sourceConnection_info['user']
    s_password = sourceConnection_info['password']
    s_ip = sourceConnection_info['ip']
    s_port = sourceConnection_info['port']
    s_sid = sourceConnection_info['sid']
    s_server = sourceConnection_info['server']
    
    targetConnection_info = request.get_json()['targetConnection_info']
    
    tableArray = request.get_json()['tableArray']

    stopDate = request.get_json()['stopDate']
    tableName = tableArray['tableName']

    databaseName = tableArray['databaseName']
    link = 'DRIVER={DRIVERNAME};DBCNAME={hostname};UID={uid};PWD={pwd}'.format(
        DRIVERNAME=s_driver, hostname=s_ip,uid=s_user,pwd=s_password)
    with pyodbc.connect(link,autocommit=True,use_batch_mode=True) as connect:
                
        tableName = tableArray['tableName']
        databaseName = tableArray['databaseName']

        sql = " select ColumnName,ColumnTitle from dbc.ColumnsV where (TableName = '"+tableName+"') and DatabaseName ='"+databaseName+"' order by ColumnId" 
        columns=[]
        df = pd.read_sql(sql, connect)
        # print(df)
        maxDate="null"
        maxCol_name = ""
        for i in df.index:
            col_name = df["ColumnName"][i].upper()
            if col_name =="OCCDATE" or col_name =="YM" or col_name =="YWKSEQ" or col_name =="YWK" or col_name=="EARLY_EDDATE" or col_name=="TREAT_START_DATE" or col_name=="PCHG_DATE" or col_name=="DISUSE_DATE":
                maxCol_name = col_name
                if stopDate != "null":
                    splitArray = stopDate.split('-')
                    if col_name == "OCCDATE":
                        maxDate = stopDate
                    elif col_name == "YM":
                        maxDate = splitArray[0]+splitArray[1]
                    elif col_name == "YWKSEQ":
                        if splitArray[1] == "01":
                            maxDate = splitArray[0]+splitArray[1]
                        else:
                            month=(int(splitArray[1])-1)*4+1
                            if month <10:
                                maxDate = splitArray[0]+"0"+str(month)
                            else:
                                maxDate = splitArray[0]+str(month)
                    elif col_name == "YWK":
                        maxDate = splitArray[0] +splitArray[1]+"1"
                    elif col_name == "EARLY_EDDATE":
                        maxDate = stopDate
                    elif col_name == "EVNT_STDATE":
                        maxDate = stopDate
                    #     maxDate = "2023-01-01"
                    elif col_name == "TREAT_START_DATE":
                        maxDate = stopDate
                    elif col_name == "PCHG_DATE":
                        maxDate = stopDate
                    elif col_name == "DISUSE_DATE":
                        maxDate = stopDate
            columns.append(col_name)  
        
        if maxDate=="null":
            sql = "SELECT CAST(count(*) AS BIGINT) FROM "+databaseName+"."+tableName
        else:
            sql = "SELECT CAST(count(*) AS BIGINT) FROM "+databaseName+"."+tableName + ' WHERE '+maxCol_name+'< \''+maxDate+'\''
        df = pd.read_sql(sql, connect)
        #print(df)
        cnt =0
        for i in df.index:
            cnt = df["Count(*)"][i]
              
        print(tableName + " where절 시작")
        where_result = whereMaker(sourceConnection_info,tableArray,maxCol_name,maxDate)
        print(where_result)
        if where_result == "fail":
            #where절 실패로 인한 검증 생략 
            print("where절 실패")
            excelResult["10"].append({"database":databaseName,"table_name":tableName,"column_name":None,"table_total_length":cnt,
            "total_length":cnt,"success_length":None,"false_length":None, "mig_start_time":None,"mig_end_time":None,
            "start_time":None,"end_time":None,"trueArray":[],"falseArray":[],"cols":None,"where_result":None,"etc":"마이그완료,Where절 실패"})
            result = "fail"
        else:
            verificationResult=direct_verification(sourceConnection_info,targetConnection_info,tableArray,where_result,columns,"10",None,None,cnt,maxCol_name,maxDate)
            if verificationResult == "Fail":
                result = "fail"
            else:
                result = "10"
    return result


def whereMaker(sourceConnection_info,tableArray,maxCol_name,maxDate):
    s_database = sourceConnection_info['database']
    s_driver = sourceConnection_info['driver']
    s_user = sourceConnection_info['user']
    s_password = sourceConnection_info['password']
    s_ip = sourceConnection_info['ip']
    s_port = sourceConnection_info['port']
    s_sid = sourceConnection_info['sid']
    s_server = sourceConnection_info['server']
    
    try:
        link = 'DRIVER={DRIVERNAME};DBCNAME={hostname};UID={uid};PWD={pwd}'.format(
            DRIVERNAME=s_driver, hostname=s_ip,uid=s_user,pwd=s_password)
        with pyodbc.connect(link,autocommit=True,use_batch_mode=True) as connect:
                
            tableName = tableArray['tableName']
            databaseName = tableArray['databaseName']

            if maxDate=="null":
                sql = "SELECT CAST(count(*) AS BIGINT) FROM "+databaseName+"."+tableName
            else:
                sql = "SELECT CAST(count(*) AS BIGINT) FROM "+databaseName+"."+tableName + ' WHERE '+maxCol_name+'< \''+maxDate+'\''
            
            df = pd.read_sql(sql, connect)
            #print(df)
            for i in df.index:
                cnt = df["Count(*)"][i]
            print(cnt)
            
            if int(cnt) > 300000:
                print("십오만개 이상")
                sql = " select * from dbc.ColumnsV where (TableName = '"+tableName+"') and DatabaseName ='"+databaseName+"'"
                df = pd.read_sql(sql, connect)
                col_array =[]
                for i in df.index:
                    col_name = df["ColumnName"][i].upper()
                    col_array.append(col_name)
                status = 'wait'
                subcolname = 'NULL'
                if 'SKUCD' in col_array:
                    zcol_name= 'SKUCD'
                    subcolname = 'SKUCD,3,2'
                    sublange = '85'
                if 'STORECD' in col_array:
                    zcol_name= 'STORECD'
                    subcolname = 'STORECD,1,2'
                    sublange = '18'
                elif 'DCODE_CD' in col_array:
                    zcol_name= 'DCODE_CD'
                    subcolname = 'DCODE_CD,1,2'
                    sublange = '25'
                elif 'VNDR_CD' in col_array:
                    zcol_name= 'VNDR_CD'
                    subcolname = 'VNDR_CD,1,2'
                    sublange = '25'
                elif 'SKU_CODE' in col_array:
                    zcol_name= 'SKU_CODE'
                    subcolname = 'SKU_CODE,3,2'
                    sublange = '85'
                elif 'SLPNO' in col_array:
                    zcol_name= 'SLPNO'
                    subcolname = 'SLPNO,1,2'
                    sublange = '25'
                else:
                    subcolname = 'NULL'
                    sublange = 'NULL'
                print(subcolname)
                print("여기까지")
                for i in df.index:
                    col_name = df["ColumnName"][i].upper()
                    
                    if col_name =="OCCDATE" or col_name =="YM" or col_name =="YWKSEQ" or col_name =="YWK" or col_name =="EARLY_EDDATE" or col_name=="TREAT_START_DATE" or col_name=="PCHG_DATE" or col_name=="DISUSE_DATE":
                        sql = 'SELECT '+col_name+ '"'+col_name+'", CAST(count('+col_name+') AS BIGINT) AS"COUNT" FROM ' +databaseName+'.'+tableName+ ' WHERE '+maxCol_name+'< \''+maxDate+'\'' +' GROUP BY '+col_name+' ORDER BY '+col_name
                        df2 = pd.read_sql(sql, connect)
                        c_sum = 0
                        t_array = []
                        sublangeResult = NULL
                        for j in df2.index:
                            if status == 'done':
                                break
                            if df2["COUNT"][0] > 50000 or subcolname!='NULL':
                                print(subcolname)
                                sql = 'SELECT '+col_name+ '"'+col_name+'", CAST(count('+col_name+') AS BIGINT) AS"COUNT" FROM ' +databaseName+'.'+tableName +' WHERE substr('+subcolname+')>\''+sublange+'\' and '+maxCol_name+'< \''+maxDate+'\' GROUP BY '+col_name+' ORDER BY '+col_name
                                print(sql)
                                df3 = pd.read_sql(sql, connect)
                                for a in df3.index:
                                    if status == 'done':
                                        break
                                    if df3["COUNT"][0] > 50000:
                                        sql = 'SELECT '+col_name+ '"'+col_name+'", CAST(count('+col_name+') AS BIGINT) AS"COUNT" FROM ' +databaseName+'.'+tableName +' WHERE substr('+subcolname+')>\''+str(int(sublange)+10)+'\' and '+maxCol_name+'< \''+maxDate+'\' GROUP BY '+col_name+' ORDER BY '+col_name
                                        print(sql)
                                        df4 = pd.read_sql(sql, connect)
                                        for b in df4.index:
                                            if df4["COUNT"][0] > 50000:
                                                status = 'check'
                                            else:
                                                sublangeResult = str(int(sublange)+10)
                                                c_sum += df4["COUNT"][b]
                                                t_array.append(str(df4[col_name][b]))
                                                if c_sum > 50000:
                                                    status = 'done'
                                                    print("done")
                                                    break
                                    else:
                                        sublangeResult = sublange
                                        c_sum += df3["COUNT"][a]
                                        t_array.append(str(df3[col_name][a]))
                                        if c_sum > 50000:
                                            status = 'done'
                                            print("done")
                                            break
                            else:
                                c_sum += df2["COUNT"][j]
                                t_array.append(str(df2[col_name][j]))
                                if c_sum > 50000:
                                    status = 'done'
                                    print("done")
                                    break

                        where_string = 'null'
                        if len(t_array) > 1:
                            if sublangeResult == NULL:
                                where_string = col_name+' >= \''+t_array[0] +'\' and '+col_name+' <= \''+t_array[len(t_array)-1] + '\'' 
                            else:
                                where_string = col_name+' >= \''+t_array[0] +'\' and '+col_name+' <= \''+t_array[len(t_array)-1] + '\' and substr('+subcolname+')>\''+sublangeResult+'\''
                            
                        else:
                            if sublangeResult == NULL:
                                where_string = col_name+' = \''+t_array[0]+'\''
                            else:
                                where_string = col_name+' = \''+t_array[0] + '\' and substr('+subcolname+')>\''+sublangeResult+'\''
                        if status == 'check':
                            
                            print("오류2")
                            result = "fail"
                            break
                        else:
                            result = where_string
                            break
                    result = "null"
                
                #날짜 키가 없을 때
                if result=="null" and subcolname != 'NULL':
                    c_sum = 0
                    t_array = []
                    sublangeResult = NULL
                    sql = 'SELECT '+zcol_name+ '"'+zcol_name+'", CAST(count('+zcol_name+') AS BIGINT) AS"COUNT" FROM ' +databaseName+'.'+tableName +' WHERE substr('+subcolname+')>\''+sublange+'\' GROUP BY '+zcol_name+' ORDER BY '+zcol_name
                    print(sql)
                    df3 = pd.read_sql(sql, connect)
                    for a in df3.index:
                        if status == 'done':
                            break
                        if df3["COUNT"][0] > 50000:
                            sql = 'SELECT '+zcol_name+ '"'+zcol_name+'", CAST(count('+zcol_name+') AS BIGINT) AS"COUNT" FROM ' +databaseName+'.'+tableName +' WHERE substr('+subcolname+')>\''+str(int(sublange)+10)+'\' GROUP BY '+zcol_name+' ORDER BY '+zcol_name
                            print(sql)
                            df4 = pd.read_sql(sql, connect)
                            for b in df4.index:
                                if df4["COUNT"][0] > 50000:
                                    status = 'check'
                                else:
                                    sublangeResult = str(int(sublange)+10)
                                    c_sum += df4["COUNT"][b]
                                    t_array.append(str(df4[zcol_name][b]))
                                    if c_sum > 50000:
                                        status = 'done'
                                        print("done")
                                        break
                        else:
                            sublangeResult = sublange
                            c_sum += df3["COUNT"][a]
                            t_array.append(str(df3[zcol_name][a]))
                            if c_sum > 50000:
                                status = 'done'
                                print("done")
                                break
                    where_string = 'null'
                    if len(t_array) > 1:
                        if sublangeResult == NULL:
                            where_string = zcol_name+' >= \''+t_array[0] +'\' and '+zcol_name+' <= \''+t_array[len(t_array)-1] + '\'' 
                        else:
                            where_string = zcol_name+' >= \''+t_array[0] +'\' and '+zcol_name+' <= \''+t_array[len(t_array)-1] + '\' and substr('+subcolname+')>\''+sublangeResult+'\''
                        
                    else:
                        if sublangeResult == NULL:
                            where_string = zcol_name+' = \''+t_array[0]+'\''
                        else:
                            where_string = zcol_name+' = \''+t_array[0] + '\' and substr('+zcol_name+')>\''+sublangeResult+'\''
                    if status == 'check':
                        print("오류3")
                        result = "fail"
                    else:
                        result = where_string
            else:
                result = "null"
    except Exception as e:
        print(e)
        print("오류")
        result = "fail"
    return result