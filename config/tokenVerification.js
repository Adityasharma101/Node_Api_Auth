function verifyToken(req,res,next){
    const bearerHeader = req.headers['authorization'];
    
    if(typeof bearerHeader !== 'undefined'){
        const bearer = bearerHeader.split(' ');

        const bearerToken= bearer[1];
        req.token= bearerToken;
        next();
    }
    else{
        res.status(403).send("that's forbidden"); 
    }
}

// EXPORTING TOKEN VERIFICATION FUNCTION
module.exports= verifyToken;