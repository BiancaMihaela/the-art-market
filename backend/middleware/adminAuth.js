import jwt from 'jsonwebtoken'
import userModel from "../models/userModel.js"

const adminAuth = async (req,res,next) => {
    try {
        const { token } = req.headers
        if (!token) {
            return res.json({success:false,message:"Not Authorized Login Again"})
        }
        const token_decode = jwt.verify(token,process.env.JWT_SECRET);
      const userId = token_decode.id;
        const userGroup = userModel.findById(userId)?.userGroup;
        if (userGroup !== 'admin') {
            return res.json({ success: false, message: "Not Authorized" })
        }
        next()
    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}

export default adminAuth