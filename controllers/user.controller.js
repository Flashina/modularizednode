let userModel = require("../models/user.model");
let jwt = require("jsonwebtoken")
const displayWelcome = (req, res) => {
  res.send("welcome user");
};

const registerUser = (req, res) => {
  console.log(req.body);
  // let userData = {
  //     Firstname: req.body.Firstname,
  //     Lastname: req.body.Lastname,
  //     Email: req.body.Email,
  //     Password: req.body.Password
  // }
  let userData = {
    firstname: req.body.Firstname,
    lastname: req.body.Lastname,
    email: req.body.Email,
    password: req.body.Password,
  };

  let form = new userModel(userData);
  form
    .save()
    .then(() => {
      console.log("Saved Successfully");
      res.send({
        status: true,
        message: "Signup Successfully! Congratulations!",
      });
    })
    .catch((err) => {
      console.log("Not saved Successfully;" + err);
      res.send({ status: true, message: "Oops! Signup was not Successfully!" });
    });
};

const signin = (req, res) => {
  console.log(req.body);
  let { email, password } = req.body;
  userModel.findOne( { email: email })
    .then((user) => {
      console.log(user);
      if (!user) {
        res.send({ status: false, message: "user not found" });
      } else {
        let secret = process.env.SECRET
        user.validatePassword(password, (err, same) => {
          if (!same) {
            res.send({ status: false, message: "Wrong credentials" });
          }else {
            let token = jwt.sign({email}, secret, {expiresIn:'7h'})
            console.log(token);
            res.send({ status: true, message: "welcome", token})
          }
        });
        console.log("Hurray! welcome user");
      }
    })
    .catch((err) => {
      console.log(err);
    });
};

const getDashboard = (req, res) => {
  let token = req.headers.authorization.split(" ")[2]
  let secret = process.env.SECRET
  jwt.verify(token, secret, (err, result)=>{
    if(err){
      console.log(err)
      res.send({status: false, message: err.message})
    }else {
      // userModel.findOne({email:result.email})
      res.send({status: true, message: "welcome", result})
      console.log(result);
    }    
  })
}


module.exports = { displayWelcome, registerUser, signin, getDashboard };
