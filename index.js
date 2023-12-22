//  List of Imports
const express = require("express");
const app = express();
require("dotenv").config();
let userRouter = require("./routes/user.route");
const cors = require("cors");
const mongoose = require("mongoose");

// Middleware - interception
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use("/user", userRouter);

let URI =
  // "mongodb+srv://olutolu20:olushina123@cluster0.21ykhuc.mongodb.net/student_dashboard?retryWrites=true&w=majority";
  "mongodb+srv://olutolu20:olushina123@cluster0.21ykhuc.mongodb.net/student_details?retryWrites=true&w=majority";

mongoose
  .connect(URI)
  .then(() => {
    console.log("mongodb connected");
  })
  .catch((err) => {
    console.log("mongodb error:" + err);
  });

  app.get('/', (req, res) => {
    res.send('Hello!');
  })

// Variable Declarations
let PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log("app is listening on PORT:" + PORT);
});
