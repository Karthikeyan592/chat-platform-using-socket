const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

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

userSchema.methods.matchPassword = async function (enteredPassword){
    return await bcrypt.compare(enteredPassword,this.password);
}

userSchema.pre('save', async function (next){
    if(!this.isModified){
        next();
    }

    const salt = await bcrypt.genSalt(10);
    this.password= await bcrypt.hash(this.password,salt);
})

const User = mongoose.model("User", userSchema);

module.exports = User;
