import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import Title from './Title';
import ProductItem from './ProductItem';

const LatestCollection = () => {

    const { products } = useContext(ShopContext);
    const [latestProducts,setLatestProducts] = useState([]);

    useEffect(()=>{
        setLatestProducts(products.slice(0,10));
    },[products])

  return (
    <div className='my-10'>
      <div className="my-10">
  <div className="text-center py-8 text-3xl">
    <Title text1="MEET" text2="THE ARTISTS" />
    <p className="w-3/4 m-auto text-xs sm:text-sm md:text-base text-gray-600">
      Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the.
    </p>
  </div>
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 px-4">
    {[
      {
        name: "Artist 1",
        image: "https://via.placeholder.com/150",
        description: "A passionate artist with a flair for abstract art.",
      },
      {
        name: "Artist 2",
        image: "https://via.placeholder.com/150",
        description: "Specializes in landscapes and nature photography.",
      },
      {
        name: "Artist 3",
        image: "https://via.placeholder.com/150",
        description: "Focuses on modern digital art and illustrations.",
      },
    ].map((artist, index) => (
      <div
        key={index}
        className="flex items-center space-x-4 p-4 bg-gray-100 rounded-lg shadow-md"
      >
        <img
          src={artist.image}
          alt={artist.name}
          className="w-24 h-24 rounded-full object-cover"
        />
        <div>
          <h3 className="text-lg font-bold">{artist.name}</h3>
          <p className="text-sm text-gray-600">{artist.description}</p>
        </div>
      </div>
    ))}
  </div>
</div>

      {/* Rendering Products */}
      <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6'>
        {
          latestProducts.map((item,index)=>(
            <ProductItem key={index} id={item._id} image={item.image} name={item.name} price={item.price} />
          ))
        }
      </div>
    </div>
  )
}

export default LatestCollection
