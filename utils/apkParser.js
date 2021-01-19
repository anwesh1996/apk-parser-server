var util = require('util')
var ApkReader = require('node-apk-parser')

let getManifest = async(file)=>{
    var reader = ApkReader.readFile(file.path)
    var manifest = reader.readManifestSync()
   return manifest;
}
module.exports={
    getManifest
}