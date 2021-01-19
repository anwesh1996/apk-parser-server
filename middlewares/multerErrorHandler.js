var app;
module.exports.init= (appDef)=>{
    app=appDef
}

module.exports.handle = (multerFunction) => {
   return (req,res,next) => {
    multerFunction(req,res,err =>{
        if(err){
            res.status(400).json({message:err})
        }else{
            next();
        }
        
    })
   }
}