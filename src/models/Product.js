const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const uniqueValidator = require("mongoose-unique-validator");

const productSchema = new Schema({
  name: {
    type: String,
    required: [true, "El nombre es obligatorio"],
    unique: true,
    trim: true,
  },
  description: {
    type: String,
    required: false,
  },
  img: {
    type: String,
    required: false,
  },
  price: {
    type: Number,
    required: [true, "El precio es obligatorio"],
  },
  available: {
    type: Boolean,
    required: true,
    default: true,
  },
  category: {
      type: Schema.Types.ObjectId, ref: 'Category',
      required: true,
  },
  user: {
    type: Schema.Types.ObjectId, ref: 'User',
    required: true,
  }
});

productSchema.plugin(uniqueValidator, {
    message: "{PATH} ya existe en la base de datos.",
  });

module.exports = mongoose.model("Product", productSchema);
