const Category = require("../model/categoryModel")

let categoryDeleteController = async (req,res)=>{
    const {id} = req.params

    await Category.findByIdAndDelete(id)

    res.send("Delete Successfull")

}

module.exports = categoryDeleteController