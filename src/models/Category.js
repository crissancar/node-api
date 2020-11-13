const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const uniqueValidator = require("mongoose-unique-validator");

const categorySchema = new Schema({
  name: {
    type: String,
    required: [true, "El nombre es obligatorio"],
    unique: true,
    trim: true,
  },
  description: {
    type: String,
    required: [true, "El nombre es obligatorio"],
    trim: true,
  },
  user: {
      type: Schema.Types.ObjectId, ref: 'User',
      required: true,
  }
});

categorySchema.plugin(uniqueValidator, {
  message: "{PATH} ya existe en la base de datos.",
});

module.exports = mongoose.model("Category", categorySchema);