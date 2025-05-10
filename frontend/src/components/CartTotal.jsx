import React, { useContext } from 'react'
import { ShopContext } from '../context/ShopContext'
import Title from './Title'

const CartTotal = () => {
  const { currency, delivery_fee, getCartAmount, getCartCount } = useContext(ShopContext)
  const subtotal = getCartAmount()
  const itemCount = getCartCount()

  return (
    <div className='w-full'>
      <div className='text-2xl'>
        <Title text1={'CART'} text2={'TOTALS'} />
      </div>

      <div className='flex flex-col gap-2 mt-2 text-sm'>
        <div className='flex justify-between'>
          <p>Subtotal</p>
          <p>
            {currency} {subtotal}.00
          </p>
        </div>

        {/* Show shipping only if at least one item */}
        {itemCount > 0 && (
          <>
            <hr />
            <div className='flex justify-between'>
              <p>Shipping Fee</p>
              <p>
                {currency} {delivery_fee}.00
              </p>
            </div>
          </>
        )}

        <hr />
        <div className='flex justify-between'>
          <b>Total</b>
          <b>
            {currency}{' '}
            {itemCount > 0 ? subtotal + delivery_fee : subtotal}.00
          </b>
        </div>
      </div>
    </div>
  )
}

export default CartTotal
