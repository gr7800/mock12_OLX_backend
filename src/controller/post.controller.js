const { PostModel } = require("../model/Post.model")

exports.post_classification = async (req, res) => {
    const { name, description, category, image, location, postedAt, price } = req.body;
    try {
        const newPost = new PostModel({ name, description, category, image, location, postedAt, price });
        await newPost.save();
        return res.status(201).send({ meassage: "POST created sucessfully", "post": newPost })
    }
    catch (error) {
        return res.status(500).send({ error:true, message: "Internal Server Error" })
    }
}

exports.browse_classifieds = async (req, res) => {
    
    try {
        const page = parseInt(req.query.page)-1||0;
        const limit = parseInt(req.query.limit)||5;
        const search = req.query.search||"";
        let sort = req.query.sort||"postedAt";
        let category = req.query.category||"All"
        const categoryOption = [
            "electronics","clothing","furniture","others"
        ];
        category=="All"?(category=[...categoryOption]):(category=req.query.category.split(","));
        req.query.sort?(sort=req.query.sort.split(",")):(sort=[sort]);
        let sortBy = {};
        if(sort[1]){
            sortBy[sort[0]]=sort[1];
        }else{
            sortBy[sort[0]]="asc"
        }

        const post = await PostModel.find({name:{$regex:search,$options:"i"}}).where("category").in([...category]).sort(sortBy).skip(page*limit).limit(limit);
        const total = await PostModel.countDocuments({
            category:{$in:[...category]},
            name:{$regex:search,$options:"i"},
        });
        const response = {
            error:false,
            total,page:page+1,
            limit,
            category:categoryOption,
            post
        }
        return res.status(200).send(response);
    } catch (error) {
        console.log(err);
        res.status(500).send({error:true, message: "Internal Server Error" })
    }
}
