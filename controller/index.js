var app;
exports.init= (app_ref) => {
app = app_ref;
let apk = require(`./apk`);
apk.init(app);
return {
    apk:apk
}
}
    
