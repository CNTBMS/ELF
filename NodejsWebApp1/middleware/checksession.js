
const auth = async (req, res, next) => {
    if( req.session.is_logined ) { 
        return next();
    } else{
        return next(new HttpException(HttpStatusCode.UNAUTHORIZED, "Unauthorized"));
    }
};

module.exports = {auth};