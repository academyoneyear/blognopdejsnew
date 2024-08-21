let Blog = require("../model/blogModel")


let blogPostController = (req,res)=>{


console.log("right place")
        const {title,description,category,postedBy,tags} = req.body

    let tagArr = tags.split(",")

    // console.log(tagArr)
    if(tagArr.length > 5){
        return res.send("Maximum 5 tag you can add")
    }else{
        let blog = new Blog({
        title: title,
        description: description,
        image: req.file.path,
        tags:tagArr,
        category: category,
        postedBy: postedBy
    })

    blog.save()

    res.send({message:"Blog post successfull"})
    }

    


}

module.exports = blogPostController