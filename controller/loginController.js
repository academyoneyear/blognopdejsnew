const User = require("../model/userModel");
const bcrypt = require("bcrypt");

let login = async (req, res) => {
  let { email, password } = req.body;

  let exitingUser = await User.findOne({ email: email });

  if (exitingUser == null) {
    return res.send("We do not find any account with this email");
  }

  bcrypt.compare(password, exitingUser.password, function (err, result) {
    if (result) {
      console.log(exitingUser)
      if(exitingUser.emailVerify){
        return res.send({
          message: "Login Successful",
          id: exitingUser._id,
          name: exitingUser.name,
          email: exitingUser.email,
        });
      }else{
        return res.send("please verify your email")
      }
      
    } else {
      res.send("Wrong Password");
    }
  });
};

module.exports = login;
