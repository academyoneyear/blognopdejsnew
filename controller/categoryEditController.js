const Category = require("../model/categoryModel")

let categoryEditController = async (req,res)=>{

    const {id,name,description} = req.body

    let exitingCategory = await Category.findOne({ _id: id });

    if (exitingCategory == null) {
      return res.send("Category Not Found");
    }

    let updateData = {
        name: name || exitingCategory.name,
        description: description || exitingCategory.description
    }

    let update = await Category.findByIdAndUpdate({_id:id},updateData,{new:true})

    res.send(update)

}

module.exports = categoryEditController