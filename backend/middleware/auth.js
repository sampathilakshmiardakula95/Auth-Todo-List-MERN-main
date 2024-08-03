const jwt = require("jsonwebtoken");

const auth = (req, res, next) =>{
    const token = req.headers.authorization.split(" ")[1];
    if (!token){
        return res.status(403).send("Access denied!")
    }
    try {
        const decode = jwt.verify(token, process.env.SECRET ); 
        console.log("++"+decode);
        req.user =decode; 
    } catch (error) {
        console.log(error)
        res.status(401).send("Token is invalid or session expired");
    }
return next();
}

module.exports = auth;
