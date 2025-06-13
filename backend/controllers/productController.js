import { v2 as cloudinary } from "cloudinary"
import productModel from "../models/productModel.js"
import jwt from "jsonwebtoken";
import userModel from "../models/userModel.js";

// function for add product
const addProduct = async (req, res) => {
    try {

        const { name, description, price, category, subCategory, bestseller, outOfStock, artistId } = req.body

        const image1 = req.files.image1 && req.files.image1[0]
        const image2 = req.files.image2 && req.files.image2[0]
        const image3 = req.files.image3 && req.files.image3[0]
        const image4 = req.files.image4 && req.files.image4[0]

        const images = [image1, image2, image3, image4].filter((item) => item !== undefined)

        let imagesUrl = await Promise.all(
            images.map(async (item) => {
                let result = await cloudinary.uploader.upload(item.path, { resource_type: 'image' });
                return result.secure_url
            })
        )

        const productData = {
            name,
            description,
            category,
            price: Number(price),
            subCategory,
            bestseller: bestseller === "true" ? true : false,
            outOfStock,
            image: imagesUrl,
            artistId,
            date: Date.now()
        }

        console.log(productData);

        const product = new productModel(productData);
        await product.save()

        res.json({ success: true, message: "Product Added" })

    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}

// function for list product
const listProducts = async (req, res) => {
    try {
        
        const products = await productModel.find({});
        res.json({success:true,products})

    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}

// function for list product
const listProductsAdminPanel = async (req, res) => {
  try {
    const token = req.headers.token;
    if (!token) return res.status(401).json({ success: false, message: "Token missing" });

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const id = decoded.id;
    const user = await userModel.findById(id);
    const userGroup = user.userGroup;
    let products;
    if (userGroup === 'admin') {
      products = await productModel.find({});
    } else {
      products = await productModel.find({ artistId: user.id });
    }

    res.json({ success: true, products });
  } catch (error) {
    console.error(error);
    res.status(401).json({ success: false, message: "Invalid token" });
  }
};

// function for removing product
const removeProduct = async (req, res) => {
    try {
        
        await productModel.findByIdAndDelete(req.body.id)
        res.json({success:true,message:"Product Removed"})

    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}

// function for single product info
const singleProduct = async (req, res) => {
    try {
        
        const { productId } = req.body
        const product = await productModel.findById(productId)
        res.json({success:true,product})

    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}

export { listProducts, listProductsAdminPanel, addProduct, removeProduct, singleProduct }