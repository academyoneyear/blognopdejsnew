require("dotenv").config();
const express = require("express");
const app = express();
const secureApi = require("./middleware/secureApi");
const registrationController = require("./controller/registrationController");
const loginController = require("./controller/loginController");
const dbConnection = require("./helper/dbConnection");
const emailVerificationController = require("./controller/emailVerificationController");
const blogPostController = require("./controller/blogPostController");
const getAllBlogController = require("./controller/getAllBlogController");
const multer  = require('multer')
const path = require('path');
const categoryController = require("./controller/categoryController");
const categoryDeleteController = require("./controller/categoryDeleteController");
const categoryEditController = require("./controller/categoryEditController");
const allDeleteController = require("./controller/allDeleteController");
const blogEditController = require("./controller/blogEditController");
const blogDelete = require("./controller/blogDelete");

dbConnection();

app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')))

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './uploads')
    },
    filename: function (req, file, cb) {
    console.log("file",file)
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
      cb(null,uniqueSuffix + "-" + file.originalname  )
    }
  })
  
  const upload = multer({ storage: storage })


app.post("/registration", secureApi, registrationController);

app.post("/login", secureApi, loginController);
app.post("/blogpost",upload.single('avatar'), blogPostController);
app.post("/createcategory", categoryController);
app.delete("/categorydelete/:id",categoryDeleteController)
app.post("/categoryedit",categoryEditController)
app.get("/blogpost", getAllBlogController);
app.post("/blogedit",upload.single('avatar'), blogEditController);
app.post("/blogedelete", blogDelete);
app.post("/alldelete", allDeleteController);
app.get("/:email", emailVerificationController);

app.listen(8000);
