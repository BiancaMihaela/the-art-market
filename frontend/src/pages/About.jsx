import React from 'react'
import Title from '../components/Title'
import { assets } from '../assets/assets'
import NewsletterBox from '../components/NewsletterBox'

const About = () => {
  return (
    <div>

      <div className='text-2xl text-center pt-8 border-t'>
          <Title text1={'ABOUT'} text2={'US'} />
      </div>

      <div className='my-10 flex flex-col md:flex-row gap-16'>
          <img className='w-full md:max-w-[450px]' src={assets.about_img} alt="" />
          <div className='flex flex-col justify-center gap-6 md:w-2/4 text-gray-600'>
              <p>The Art Market was born out of a passion for innovation and a desire to revolutionize the way people shop online. Our journey began with a simple idea: to provide a platform where customers can easily discover, explore, and purchase a wide range of art products from the comfort of their homes.</p>
              <p>Since our inception, we've worked tirelessly to curate a diverse selection of high-quality art products that cater to every taste and preference. From one art style to another we offer an extensive collection sourced from talented and dedicated artists.</p>
              <b className='text-gray-800'>Our Mission</b>
              <p>Our mission at The Art Market is to empower customers with choice, convenience, and confidence. We're dedicated to providing the best art shopping experience that exceeds expectations, from browsing and ordering to delivery and beyond.</p>
          </div>
      </div>

      <div className=' text-xl py-4'>
          <Title text1={'WHY'} text2={'CHOOSE US'} />
      </div>

      <div className='flex flex-col md:flex-row text-sm mb-20'>
          <div className='border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5'>
            <b>Personalized Art Experience:</b>
            <p className=' text-gray-600'>Customers can commission unique, custom artworks tailored to their personal vision, creating a deeper, more meaningful connection with the art they purchase.</p>
          </div>
          <div className='border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5'>
            <b>Support for Emerging Artists:</b>
            <p className=' text-gray-600'>By choosing our platform, users directly support talented, lesser-known artists, helping them grow their careers and reach new audiences.</p>
          </div>
          <div className='border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5'>
            <b>Easy and Enjoyable Shopping:</b>
            <p className=' text-gray-600'>With a user-friendly design, transparent pricing, and loyalty rewards, our platform makes discovering and purchasing art an effortless and enjoyable experience.</p>
          </div>
      </div>

      <NewsletterBox/>
      
    </div>
  )
}

export default About
