const User = require("../Model/userSchema.js");
const jwt = require("jsonwebtoken");
const bcryptJS = require("bcryptjs");
const auth = require("../middleware/auth.js");


    exports.registration = async (req, res)=>{
    try {
             const {firstName,lastName,email,password} = req.body;          
        if (!(firstName && lastName && email && password)) {
            res.status(401).send("All fields are required!");
        } 
        const existingUser =  await User.findOne({email});
            if (existingUser) {               
                res.status(401).send("User already exist.");
            }
           const myEntityPassword=  await bcryptJS.hash(password,10);
           const user = await  User.create({
                firstName,
                lastName,
                email,
                password : myEntityPassword,
            })
            const token = jwt.sign({id : user._id  },process.env.SECRET)
                user.token =token; 
                user.password = undefined;

                res.status(201).json({
                    success : true,
                    user
                })

    } catch (error) {        
        console.log(error);
        console.log("error is response route");
    }     
};


   exports.login = async  (req, res)=>{

    try {
        
        const  {email,password} = req.body;

            if (!(email && password)) {
               res.status(401).send("email and password are required.")
               return ;
            }

        const  user  = await User.findOne({email});
        if (!user) {
           res.status(401).json({
                success : false,
                message:"Email doesn't exist,please create account!"})
                return ;
        }

        if (user && (await bcryptJS.compare(password,user.password)) ) {
           const token =  jwt.sign({id :user._id},process.env.SECRET);
           user.password = undefined;
           user.token =token;
           const  options = {
                expires : new Date(Date.now()+ 3*24*60*60*1000 ), 
                httpOnly : true,
                sameSite :'None',
                secure : true
           }
         return  res.status(200).cookie("token",token,options).json({
                success : true,
                token,
                user
           })
        }else{
           return res.status(401).json({
            success :false,
            message : "password didn't matched!"
           })
        }
        
    } catch (error) {
      return  res.status(401).send("Bad Request");
    }
};

exports.getUser =async (req, res) =>{
    try {
        const user = await User.findById(req.user.id);
        if (!user) {
            return res.send("No such user exist");
        }
        user.password =undefined;
        res.status(200).json({
            success :true,
            user
        });
    } catch (error) {
        res.status(401).json({
            success: false,
            message: "Bad request!"
        });
    }
}

