const bcrypt = require("bcrypt");
const User = require("../model/userModel");
const nodemailer = require("nodemailer");

let registraionController = async (req, res) => {
  const { name, email, password } = req.body;

  if (name == "" || name == undefined) {
    return res.send("Name Required");
  }
  if (email == "" || email == undefined) {
    return res.send("Email Required");
  }

  if (password == "" || password == undefined) {
    return res.send("Password Required");
  }

  let exitingUser = await User.findOne({ email: email });

  if (exitingUser != null) {
    return res.send("User Already Exists");
  }

  bcrypt.hash(password, 10,async function (err, hash) {
    let user = new User({
      name: name,
      email: email,
      password: hash,
    });

    user.save();
  

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "abmshawonislam@gmail.com",
        pass: "weag ksup pxag zqep",
      },
    });
    
    
      const info = await transporter.sendMail({
        from: 'MyBlog', // sender address
        to: user.email, // list of receivers
        subject: "Email Verification link", // Subject line
        html: `<body style=font-family:Arial,sans-serif;margin:0;padding:0;box-sizing:border-box><table border=0 cellpadding=0 cellspacing=0 style="padding:40px;max-width:1024px;margin:0 auto"width=100%><tr><td><table border=0 cellpadding=0 cellspacing=0 style=width:100%;margin-bottom:20px width=100%><tr><td style=width:150px><a href=https://oneyear.academy/ target=_blank><img alt=One-year-logo border=0 src=https://i.ibb.co/VtLncWN/One-year-logo.png width=90%></a><br><td style="background-color:#a435f0;color:#fff;padding:40px 20px;text-align:left"><h2 style=font-size:40px;margin:0;padding:0>Hey! ${user.name} Verify Link: <a href="http://localhost:8000/${user.email}">Click Here</a></h2></table></table>`, // html body
      });
    
      console.log("Message sent: %s", info.messageId);
      // Message sent: <d786aa62-4e0a-070a-47ed-0b0666549519@ethereal.email>
    

    res.send({
      message: "Registration Successful",
      id: user._id,
      name: user.name,
      email: user.email,
    });
  });
};

module.exports = registraionController;
