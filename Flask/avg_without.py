import tensorflow as tf
import numpy as np
import sys
import os

Noise = sys.argv[1]
Name = sys.argv[2]
Algo = sys.argv[3]
Variation =  sys.argv[4]
Round = sys.argv[5]

data1_n = {data1 size}
data2_n = {data2 size}
data3_n = {data3 size}

data1_w = {data1_n / total_n}
data2_w = {data2_n / total_n}
data3_w = {data3_n / total_n}

path = {File_PATH} // write path where weights stored
subpath {File_SUBPATH} // write path where weights stored

def add_noise(a) :
 return a + np.random.normal(0, float(Noise))

models = []

Hoslist = os.listdir(path)

for Hos in Hoslist :
 if Hos != "CNT" :
  if os.path.exists(path+Hos+subpath) :
   if os.path.exists(path+Hos+subpath+os.listdir(path+Hos+subpath)[0]) :
    models.append(tf.keras.models.load_model(path+Hos+subpath+os.listdir(path+Hos+subpath)[0]))


weights = [ list(map(add_noise,model.get_weights())) for model in models]
new_weights = list()
for weights_list_tuple in zip(*weights): 
    new_weights.append(
        np.average(np.array(weights_list_tuple), axis=0, weights=[data1_w, data2_w, data3_w])
    )
model = tf.keras.models.load_model({init_model})
model.set_weights(new_weights)

storepath = path+"CNT"+subpath
if not os.path.exists(storepath) :
 os.makedirs(storepath)
models[0].save(storepath+Name)
