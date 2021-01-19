const multer = require('multer');
const multerUtil = require('./utils/multer');
module.exports = function (app) {
  var controller = require('./controller').init(app);
  app.get('/api', function (req, res) {
    console.log('Health check!', req.path, req.headers)
    res.status(200).json({ "Status": "Hey! Welcome to Apk parser service" });
  });
let middlewares=  require('./middlewares')(app)
let multerMiddleware = middlewares.multerErrorHandler.handle(multer(multerUtil.upload).any())
app.post('/api/apk',multerMiddleware,controller.apk.methods.create)
app.get('/api/apks',controller.apk.methods.getAll)

};
