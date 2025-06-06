import React from 'react'
import Title from '../components/Title'
import { assets } from '../assets/assets'
import NewsletterBox from '../components/NewsletterBox'

const Contact = () => {
  return (
    <div>
      
      <div className='text-center text-2xl pt-10 border-t'>
          <Title text1={'CONTACT'} text2={'US'} />
      </div>

      <div className='my-10 flex flex-col justify-center md:flex-row gap-10 mb-28'>
        <img className='w-full md:max-w-[480px]' src={assets.contact_img} alt="" />
        <div className='flex flex-col justify-center items-start gap-6'>
          <p className='font-semibold text-xl text-gray-600'>Our Gallery Studio</p>
          <p className=' text-gray-500'>Strada Mihai Eminescu <br /> Bucharest</p>
          <p className=' text-gray-500'>Tel: (+40) 777-777-777 <br /> Email: theartmarket@support.com</p>
          <p className='font-semibold text-xl text-gray-600'>Become a featured artist</p>
          <p className=' text-gray-500'>Learn more about how to apply.</p>
          <button className='border border-black px-8 py-4 text-sm hover:bg-black hover:text-white transition-all duration-500'>Apply</button>
        </div>
      </div>

      <NewsletterBox/>
    </div>
  )
}

export default Contact
