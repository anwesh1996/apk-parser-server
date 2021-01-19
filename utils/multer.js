const multer = require('multer');
const fs = require('fs');
module.exports.upload = {
    storage: multer.diskStorage({
        
        destination: (req, file, callback) => {
            let path;
            if(file.fieldname === 'apkFile'){
              path ='./uploads/' + file.fieldname;
            }else{
                console.log(file.fieldname,'file field name')
                callback('Error:Invalid file field name')
            }
            
            console.log(path,'path')
            if (!fs.existsSync(path)) {
                fs.mkdirSync(path, {recursive: true});
            }
            callback(null, path);
        },
        filename: function (req, file, callback) {
            let ext = file.mimetype.split('/')[1]
            console.log(ext)
            let fileName=Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15) +'.'+ext;
            callback(null, fileName);
        }
    }),
    limits: {
        fileSize: 40 * 1024 * 1024 // limited file size to 40MB
    },
    fileFilter: (req,file,callback) => {
        // let ext=file.originalname.split('.')
        // let extension=ext[ext.length-1]
        // if(extension==='apk' || extension==='zip'){
            callback(null,file)
        // }else{
        //     callback('Invalid file extension',null)
        // }
    }
};
