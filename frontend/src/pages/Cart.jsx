import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import Title from '../components/Title'
import CartTotal from '../components/CartTotal'

const Cart = () => {
  const { products, currency, cartItems, updateQuantity, navigate, token } = useContext(ShopContext)
  const [cartData, setCartData] = useState([])

  // Rebuild cartData with productId, size, and quantity
  useEffect(() => {
    if (products.length > 0) {
      const tempData = []
      for (const productId in cartItems) {
        for (const size in cartItems[productId]) {
          const qty = cartItems[productId][size]
          if (qty > 0) {
            tempData.push({
              _id: productId,
              size,
              quantity: qty,
            })
          }
        }
      }
      setCartData(tempData)
    }
  }, [cartItems, products])

  return (
    <div className='border-t pt-14'>
      <div className='text-2xl mb-3'>
        <Title text1={'YOUR'} text2={'CART'} />
      </div>

      <div>
        {cartData.map((item, index) => {
          const { _id: productId, size, quantity } = item
          const productData = products.find(p => p._id === productId)
          if (!productData) return null

          const isTraditional = productData.category === 'Traditional'

          // Handle quantity change using correct size key
          const handleChange = e => {
            const val = parseInt(e.target.value, 10)
            if (isNaN(val) || val < 1) return
            updateQuantity(productId, size, val)
          }

          return (
            <div
              key={`${productId}-${size}`}
              className='py-4 border-t border-b text-gray-700 grid grid-cols-[4fr_1fr_1fr] items-center gap-4'
            >
              {/* Product info */}
              <div className='flex items-start gap-6'>
                <img
                  className='w-16 sm:w-20'
                  src={productData.image[0]}
                  alt={productData.name}
                />
                <div>
                  <p className='text-xs sm:text-lg font-medium'>
                    {productData.name}
                  </p>
                  <p className='mt-2'>
                    {currency}{productData.price}
                  </p>
                </div>
              </div>

              {/* Quantity input */}
              <div className='text-center'>
                <input
                  type='number'
                  value={quantity}
                  min={1}
                  onChange={handleChange}
                  disabled={isTraditional}
                  className='w-16 text-center border rounded py-1'
                />
              </div>

              {/* Remove or fixed label */}
              <div className='text-center'>
                {
                  <button
                    onClick={() => updateQuantity(productId, size, 0)}
                    className='text-red-500 text-sm hover:underline'
                  >
                    Remove
                  </button>
                }
              </div>
            </div>
          )
        })}
      </div>

      <div className='flex justify-end my-20'>
        <div className='w-full sm:w-[450px]'>
          <CartTotal />
          <div className='w-full text-end'>
            <button
              onClick={() => (token ? navigate('/place-order') : navigate('/login'))}
              className='bg-black text-white text-sm my-8 px-8 py-3'
            >
              PROCEED TO CHECKOUT
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Cart
