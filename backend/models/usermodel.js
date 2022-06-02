const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    name:{type: String, required: true},
    email:{type: String, required: true,unique: true},
    password:{type: String, required: true},
    pic: {type: String,  default:"https://preview.redd.it/ld489agqo0371.jpg?auto=webp&s=d45bcf705e7085e504a3b9c202c9eafe4c89ba40"}
},
{
    timestamps: true
}
);

const User = mongoose.model("User", userSchema);

module.exports = User;
