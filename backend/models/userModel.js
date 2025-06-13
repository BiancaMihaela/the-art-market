import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    fullName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    birthDate:{type: Date, required: false},
    phoneNumber:{type: String, required: false},
    cartData: { type: Object, default: {} },
    userGroup: { type: String, default: '' } 
}, { minimize: false })

const userModel = mongoose.models.user || mongoose.model('user',userSchema);

export default userModel