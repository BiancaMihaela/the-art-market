import validator from "validator";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import userModel from "../models/userModel.js";

const createToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET)
}

const getUserIdFromHeader = (req) => {
  const authHeader = req.headers.token || req.headers.authorization;
  if (!authHeader) throw new Error("Token not provided");
  const token = authHeader.startsWith("Bearer ")
    ? authHeader.split(" ")[1]
    : authHeader;
  const { id } = jwt.verify(token, process.env.JWT_SECRET);
  return id;
};

// Route GET /api/user/profile
const getProfile = async (req, res) => {
  try {
    const userId = getUserIdFromHeader(req);
    const user = await userModel.findById(userId).select("-password");
    if (!user) {
      return res.json({ success: false, message: "User doesn't exist" });
    }
    res.json({ success: true, user });
  } catch (error) {
    console.error(error);
    res.json({ success: false, message: error.message });
  }
};

// Route PUT /api/user/profile
// Requires în body: { field: string, value: any }
const updateProfile = async (req, res) => {
  try {
    const userId = getUserIdFromHeader(req);
    const { field, value } = req.body;

    // Validări specifice
    if (field === "email" && !validator.isEmail(value)) {
      return res.json({ success: false, message: "Invalid email" });
    }
    if (field === "password" && value.length < 8) {
      return res.json({
        success: false,
        message: "Password must be at least 8 characters long",
      });
    }

    let updateData = {};
    if (field === "password") {
      const salt = await bcrypt.genSalt(10);
      updateData.password = await bcrypt.hash(value, salt);
    } else {
      updateData[field] = value;
    }

    await userModel.findByIdAndUpdate(userId, updateData);
    res.json({ success: true, message: "Changes saved successfully" });
  } catch (error) {
    console.error(error);
    res.json({ success: false, message: error.message });
  }
};

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.json({ success: false, message: "User doesn't exist" });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.json({ success: false, message: "Invalid credentials" });
    }
    const token = createToken(user._id);
    res.json({
      success: true,
      token
    });
  } catch (error) {
    console.error(error);
    res.json({ success: false, message: error.message });
  }
};

const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!validator.isEmail(email)) {
      return res.json({ success: false, message: "Please enter a valid email" });
    }
    if (password.length < 8) {
      return res.json({
        success: false,
        message: "Please enter a strong password",
      });
    }
    const exists = await userModel.findOne({ email });
    if (exists) {
      return res.json({ success: false, message: "User already exists" });
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const newUser = new userModel({ fullName: name, email, password: hashedPassword });
    const saved = await newUser.save();
    const token = createToken(saved._id);
    res.json({ success: true, token });
  } catch (error) {
    console.error(error);
    res.json({ success: false, message: error.message });
  }
};

const registerArtist = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!validator.isEmail(email)) {
      return res.json({ success: false, message: "Please enter a valid email" });
    }
    if (password.length < 8) {
      return res.json({
        success: false,
        message: "Please enter a strong password",
      });
    }
    const exists = await userModel.findOne({ email });
    if (exists) {
      return res.json({ success: false, message: "User already exists" });
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const newUser = new userModel({ fullName: name, email, password: hashedPassword, userGroup: 'artist' });
    const saved = await newUser.save();
    const token = createToken(saved._id);
    res.json({ success: true, token });
  } catch (error) {
    console.error(error);
    res.json({ success: false, message: error.message });
  }
};

const adminLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Caută utilizatorul în baza de date
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.json({ success: false, message: "User does not exist" });
    }

    // Verifică parola
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.json({ success: false, message: "Invalid credentials" });
    }

    // Permite logarea doar pentru userGroup: admin sau artist
    if (user.userGroup !== "admin" && user.userGroup !== "artist") {
      return res.json({ success: false, message: "Access denied" });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);

    res.json({
      success: true,
      token,
      userGroup: user.userGroup
    });

  } catch (error) {
    console.error(error);
    res.json({ success: false, message: error.message });
  }
};

const getArtists = async (req, res) => {
  try {
    const artists = await userModel.find({ userGroup: 'artist' }).select('fullName _id');
    res.json({ success: true, artists });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};


export {
  loginUser,
  registerUser,
  registerArtist,
  adminLogin,
  getProfile,
  updateProfile,
  getArtists
};
