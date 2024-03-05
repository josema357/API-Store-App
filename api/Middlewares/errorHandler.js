function logErrors(err, req, res, next){
    next(err);
}

function errorHandler(err, req, res){
    res.json({
        message: err.message,
        stack: err.stack
    });
}

module.exports={logErrors, errorHandler};