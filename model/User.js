const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    username:{
        type:String,
        require:true,
        min:5,
        max:255
    },
    email:{
      type:String,
      require:true,
    },
    password:{
        type:String,
        required:true,
        min:7,
        max:1024,
    },
    Date:{
        type:Date,
        default:Date.now
    },
    
    
});

module.exports = mongoose.model("User",userSchema);