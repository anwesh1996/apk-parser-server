var app;
const erroHandler = require('../error-handler');
const Joi = require('@hapi/joi');
const apkParser = require('../utils/apkParser')
exports.init = (app_ref) => {
    app = app_ref;
}

/*
*Main-methods
*/

exports.methods = {

    create: async (req, res) => {
        try {
            erroHandler.expressHandler.sendSuccessResponse(res, await create(req.body,req.files), 'Added new apk succesfully', 201)
        } catch (err) {
            app.logger.methods.error(req.path, __filename, "Error", err, "500")
            erroHandler.expressHandler.sendFailureResponse(res, err, 'There was a problem in adding new apk!', 500)
        }
    },
    getAll: async (req, res) => {
        try {
            erroHandler.expressHandler.sendSuccessResponse(res, await getAll(req.query), 'List apk succesfully', 200)
        } catch (err) {
            app.logger.methods.error(req.path, __filename, "Error", err, "500")
            erroHandler.expressHandler.sendFailureResponse(res, err, 'There was a problem in Listing  apks!', 500)
        }
    }
}


/*
* Re-usable methods
*/
let create = async (data,file) => {
    try {
        let apkManifest = await apkParser.getManifest(file[0])
        if(Object.keys(apkManifest).length==0){
            throw new Error('Invalid apk file')
        }
        data.fileDetails = file[0]
        data.manifest = apkManifest
        if (apk_valid(data)) {
            let apk = await app.db.models.Apk(data).save()
            return apk;
        } else {
            throw new Error(JSON.stringify({ message: 'Invalid form data', code: 400 }))
        }
    }
    catch (err) {
        console.log(err)
        throw new Error( err.message || 'Failed to parse apk')
    }
}

let getAll = async (data) => {

    try {
        let apks = [];
        if (data.pageSize && data.pageNo) {
            let limit = data.pageSize ? Number(data.pageSize) : 30
            let skip = data.pageNo ? parseInt(data.pageNo - 1) * limit : 0
            apks = await app.db.models.Apk.find({},{manifest:0}).skip(skip).limit(limit).lean()
        } else {
            apks = await app.db.models.Apk.find({},{manifest:0}).lean()
        }
        return apks;
    }
    catch (err) {
        console.log(err)
        throw new Error(JSON.stringify({ message: err.message ? err.message : 'Failed to list', code: 500 }))
    }
}
/*
* Object validators
* we can have it outside in seperate folder as well
* since its single resource handling it in single file
* we can validate client request object with its type,length lot more using Joi npm
* We can make it as common function for all post requests based on method & route as middlewares
*/

const apk_valid = (data) => {
    let createApk = Joi.object({
        name: Joi.string().required(),
        description:Joi.string().optional(),
        fileDetails:Joi.object().required(),
        manifest:Joi.object().required()
    })
    const { error, value } = createApk.validate(data);
    if (error) {
        //we can segregate errors and send to client if required
        return false;
    } else {
        return true;;
    }

}

exports.helperMethods = {
    create: create,
    getAll: getAll
}