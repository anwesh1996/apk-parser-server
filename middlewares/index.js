module.exports = function(app){
    let multerErrorHandler=require('./multerErrorHandler')
    multerErrorHandler.init(app)
    return {
        multerErrorHandler : multerErrorHandler
    }
}