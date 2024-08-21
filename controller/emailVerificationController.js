const User = require("../model/userModel")

const emailVerificationController = async (req,res)=>{
    
    let exitingUser = await User.findOneAndUpdate({ email: req.params.email },{emailVerify: true},{new:true});



    if(exitingUser == null){
        return res.send("Email not found")
    }else{
        return res.send("Email Verified")
    }
   
}

module.exports = emailVerificationController