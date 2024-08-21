let Category = require("../model/categoryModel")

let categoryController = async (req,res)=>{
    let {name,description} = req.body

    console.log(name.toLowerCase())
    let exitingCategory = await Category.findOne({ name: name.toLowerCase() });

    if (exitingCategory != null) {
      return res.send("Category Already Exists");
    }

    let category = new Category({
        name: name.toLowerCase(),
        description: description
    })

    category.save()

    res.send("Catery created successfully")

    
}

module.exports = categoryController