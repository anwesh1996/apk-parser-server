/*
 *  Apk schema
 * 
*/
module.exports = function(app, mongoose) {
    var ApkSchema = new mongoose.Schema({
      "name"         : { type : String, trim:true}, 
      "created_date" : { type : Date, default:new Date() },
      "description"  : { type : String },
      "fileDetails"  : { type: Object },
      "manifest"     : { type:Object }
    });
    app.db.model('Apk', ApkSchema);
  };
  