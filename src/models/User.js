const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const uniqueValidator = require("mongoose-unique-validator");

const validRoles = {
  values: ["ADMIN_ROLE", "USER_ROLE"],
  message: "{VALUE} no es un rol válido",
};

const userSchema = new Schema({
  name: {
    type: String,
    required: [true, "El nombre es obligatorio"],
    trim: true,
  },
  email: {
    type: String,
    unique: true,
    required: [true, "El correo es obligatorio"],
    lowercase: true,
  },
  password: {
    type: String,
    required: [true, "La contraseña es obligatoria"],
  },
  img: {
    type: String,
    required: false,
  },
  role: {
    type: String,
    default: "USER_ROLE",
    enum: validRoles,
  },
  google: {
    type: Boolean,
    default: false,
  },
  active: {
    type: Boolean,
    default: false,
  },
});

userSchema.methods.toJSON = function(){
    const userObject = this.toObject();
    delete userObject.password;
    return userObject;
}

userSchema.plugin(uniqueValidator, {
  message: "{PATH} ya existe en la base de datos.",
});

module.exports = mongoose.model("User", userSchema);