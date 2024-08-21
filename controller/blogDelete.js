const Blog = require("../model/blogModel")
const blogDelete = async (req,res)=>{
    const {id}= req.body
    await Blog.findByIdAndDelete(id)

    res.send("Delete Successfull")
}

module.exports = blogDelete