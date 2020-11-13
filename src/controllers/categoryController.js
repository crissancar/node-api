const Category = require("../models/Category");
const _ = require("underscore");


module.exports.categories = async (req, res) => {
    try {
        let categories = await Category.find({}).populate('user');
        let count = await Category.countDocuments();
        res.json({ count, categories });
      } catch (error) {
        res.status(400).json(error);
      }
}

module.exports.category = async (req, res) => {
    let categoryId = req.params.id;

    try {
        let category = await Category.findById(categoryId);
        res.json(category)
        
    } catch (error) {
        res.status(400).json({message: "Category not exists", error});
    }
}

module.exports.create = async (req, res) => {
    let {name, description} = req.body;
    let user = req.user._id;
    let category = new Category({name, description, user});
    
    try {
        await category.save();
        res.json(category);
    } catch (error) {
        res.status(400).json(error);
    }
}

module.exports.update = async (req, res) => {
    let categoryId = req.params.id;
    let body = _.pick(req.body, ["name", "description"]);

    try {
        let category = await Category.findByIdAndUpdate(categoryId, body, {
            new: true,
            runValidators: true,
            context: "query",
        });
        res.json({category});
    } catch (error) {
        res.status(400).json(error)
    }
}

module.exports.delete = async (req, res) => {
    let categoryId = req.params.id;

    try {
        await Category.findByIdAndRemove(categoryId);
        res.json({message: "Category deleted"});
    } catch (error) {
        res.status(400).json({message: "Category not exists", error});
    }

}