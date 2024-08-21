const Blog = require("../model/blogModel")

const blogEditController = async (req,res)=>{
    const {id,title,description,image} = req.body

    let imagedata = req.file.path ? req.file.path : image

    await Blog.findByIdAndUpdate({_id:id},{title:title,description:description,image:imagedata})

    res.send("Updated")
}

module.exports = blogEditController