import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { ShopContext } from '../context/ShopContext';
import { assets } from '../assets/assets';
import RelatedProducts from '../components/RelatedProducts';

const Product = () => {

  const { productId } = useParams();
  const { products, currency, addToCart, cartItems } = useContext(ShopContext);
  const [productData, setProductData] = useState(false);
  const [image, setImage] = useState('')
  const [size, setSize] = useState('')

  // Count how many of this item are already in cart
  const currentCount = cartItems[productData._id]
    ? Object.values(cartItems[productData._id]).reduce((sum, qty) => sum + qty, 0)
    : 0

  // Disable if out of stock OR if Traditional and already in cart
  const isTraditionalLimitReached =
    productData.category === 'Traditional' && currentCount >= 1

  const fetchProductData = async () => {

    products.map((item) => {
      if (item._id === productId) {
        setProductData(item)
        setImage(item.image[0])
        return null;
      }
    })

  }

  useEffect(() => {
    fetchProductData();
  }, [productId, products])

  return productData ? (
    <div className='border-t-2 pt-10 transition-opacity ease-in duration-500 opacity-100'>
      {/*----------- Product Data-------------- */}
      <div className='flex gap-12 sm:gap-12 flex-col sm:flex-row'>

        {/*---------- Product Images------------- */}
        <div className='flex-1 flex flex-col-reverse gap-3 sm:flex-row'>
          <div className='flex sm:flex-col overflow-x-auto sm:overflow-y-scroll justify-between sm:justify-normal sm:w-[18.7%] w-full'>
            {
              productData.image.map((item, index) => (
                <img onClick={() => setImage(item)} src={item} key={index} className='w-[24%] sm:w-full sm:mb-3 flex-shrink-0 cursor-pointer' alt="" />
              ))
            }
          </div>
          <div className='w-full sm:w-[80%]'>
            <img className='w-full h-auto' src={image} alt="" />
          </div>
        </div>

        {/* -------- Product Info ---------- */}
        <div className='flex-1'>
          <h1 className='font-medium text-2xl mt-2'>{productData.name}</h1>
          <p className='mt-5 text-3xl font-medium'>{currency}{productData.price}</p>
          <p className='mt-5 text-gray-500 md:w-4/5'>{productData.description}</p>
          {productData.outOfStock && (
            <p className="text-red-500 font-semibold mt-5">
              Product is out of stock
            </p>
          )}

          {isTraditionalLimitReached && (
            <p className="text-yellow-600 font-semibold mt-2">
              Only one Traditional art piece allowed per order
            </p>
          )}

          <button
            onClick={() => addToCart(productData._id, size)}
            disabled={productData.outOfStock || isTraditionalLimitReached}
            className={`px-8 py-3 text-sm mt-2 ${productData.outOfStock || isTraditionalLimitReached
                ? 'bg-gray-400 cursor-not-allowed text-white'
                : 'bg-black text-white active:bg-gray-700'
              }`}
          >
            ADD TO CART
          </button>
          <hr className='mt-8 sm:w-4/5' />
          <div className='text-sm text-gray-500 mt-5 flex flex-col gap-1'>
            <p>100% Original product.</p>
            <p>Cash on delivery is available on this product.</p>
            <p>Easy return and exchange policy within 7 days.</p>
          </div>
        </div>
      </div>

      {/* ---------- Description & Review Section ------------- */}
      <div className='mt-20'>
        <div className='flex'>
          <b className='border px-5 py-3 text-sm'>Description</b>
        </div>
        <div className='flex flex-col gap-4 border px-6 py-6 text-sm text-gray-500'>
          <p>FAQ- What Is an Online Art Gallery & How It Works ?</p>
          <p>An online art gallery is a virtual marketplace where you can browse, learn about, and purchase artworks entirely through your browser or mobile device. Simply filter by style, medium, price, or artist, click to view high-res images and backstories, then add to cart for secure checkout. Optional commissions let you submit a brief and budget so an artist can create a custom piece. All orders include tracking, insured shipping, and a certificate of authenticity—no studio visit required.</p>
        </div>
      </div>

      {/* --------- display related products ---------- */}

      <RelatedProducts category={productData.category} subCategory={productData.subCategory} />

    </div>
  ) : <div className=' opacity-0'></div>
}

export default Product
