const userModel = require("../models/userModel");
let bcrypt = require("bcrypt");
let jwt = require("jsonwebtoken");

const securePassword = async (password) => {
  try {
    const hashPassword = await bcrypt.hash(password, 10);
    return hashPassword;
  } catch (error) {
    throw new Error("Something wrong in password hshing");
  }
};

const verifyPassword = async (password, hash) => {
  try {
    const isMatch = await bcrypt.compare(password, hash);
    return isMatch;
  } catch (error) {
    throw new Error("Wrong in password verification");
  }
};

const userSignUpController = async (req, res) => {

  try {
    let userAlready = await userModel.findOne({ email: req.body.email });
    if (userAlready) {
      throw new Error("User exist with same email");
    }
    const spassword = await securePassword(req.body.password);
    const image = req.file ? req.file.path : null;

    let userData = new userModel({
      name: req.body.name,
      email: req.body.email,
      password: spassword,
      profilePic: image,
    });
    let saveData = await userData.save();
    if (saveData) {
      res.status(201).json({
        data: saveData,
        success: true,
        error: false,
        message: "User created succesfully",
      });
    }
  } catch (error) {
    console.error("Error in userSignUpController:", error);
    res.json({
      message: error.message,
      error: true,
      success: false,
    });
  }
};
const userSignIn = async (req, res) => {
  try {
    let user = await userModel.findOne({ email: req.body.email });
    if (user) {
      let passMatch = await verifyPassword(req.body.password, user.password);
      if (passMatch) {
        let tockenData = {
          _id: user._id,
          email: user.email,
        };
        const token = jwt.sign({ tockenData }, process.env.TOCKEN_SECRET, {
          expiresIn: "1d",
        });
        res.status(200).json({
          userName: user.name,
          userId: user._id,
          userEmail: user.email,
          token: token,
          message: "LogedIn succesfully",
          success: true,
          profilePic: user.profilePic,
        });
      } else {
        throw new Error("password mismatch");
      }
    } else {
      throw new Error("no user exist");
    }
  } catch (error) {
    res.status(400).json({
      message: error.message,
      error: true,
      success: false,
    });
  }
};

const userDetails = async (req, res) => {
  try {
    res.json({
      message: "yesssssssss",
    });
  } catch (error) {
    res.status(400).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
};
module.exports = {
  userSignUpController,
  userSignIn,
  userDetails,
};
