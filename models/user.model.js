const mongoose = require("mongoose")
const bcrypt = require("bcryptjs")
// let studentSchema = mongoose.Schema({
//     Firstname: {type: String, required: true},
//     Lastname: {type: String, required: true},
//     Email: {type: String, required: true, unique: true},
//     Password: {type: String, required: true},
//     Date: {type: Date, default: Date.now()},
  
//   })
let studentSchema = mongoose.Schema({
    firstname: {type: String, required: true},
    lastname: {type: String, required: true},
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    Date: {type: Date, default: Date.now()},
  
  })

  let saltRound = 10

  studentSchema.pre("save", function(next) {
    console.log(this.password);
    bcrypt.hash(this.password, saltRound, (err, hashedPassword) => {
      console.log(hashedPassword);
      if(err){
        console.log("Could not hash password" + err.message);
      } else {
        this.password = hashedPassword
        next()
      }
    })
  })
  
  studentSchema.methods.validatePassword = function(password, callback){
    bcrypt.compare(password, this.password, (err, same)=>{
        callback(err, same)
    })
  }
  let userModel = mongoose.model('student', studentSchema)



  module.exports = userModel
  