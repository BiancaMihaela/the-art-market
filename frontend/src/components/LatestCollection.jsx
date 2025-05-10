import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import Title from './Title'
import ProductItem from './ProductItem'

const LatestCollection = () => {
  const { products } = useContext(ShopContext)
  const [latestProducts, setLatestProducts] = useState([])
  const [activeArtist, setActiveArtist] = useState(null)

  useEffect(() => {
    setLatestProducts(products.slice(0, 10))
  }, [products])

  const artists = [
    {
      name: 'Cristina Popovici',
      image:
        'https://i.pinimg.com/736x/3a/fb/69/3afb69720cadb929ec43b36657cbe2b8.jpg',
      description: 'A passionate artist with a flair for abstract art.',
      details:
        'Cristina Popovici explores the intersection of color and form, creating large-scale abstract pieces that challenge perception and evoke emotion. Her work has been exhibited internationally and celebrated for its bold textures and innovative techniques.',
    },
    {
      name: 'Irina Matei',
      image:
        'https://i.pinimg.com/736x/1d/60/e6/1d60e65f1004d56d1d7fd7ae467a01ac.jpg',
      description: 'Specializes in landscapes and nature photography.',
      details:
        'Irina Matei captures breathtaking natural scenes, focusing on light and composition to bring landscapes to life. Her portfolio includes award-winning photographs from mountain treks, coastal vistas, and wildlife expeditions.',
    },
    {
      name: 'Andrei Paunescu',
      image:
        'https://i.pinimg.com/736x/67/19/d5/6719d5b388b44d8d71a12bf9ab2d314d.jpg',
      description: 'Focuses on modern digital art and illustrations.',
      details:
        'Andrei Paunescu blends digital techniques with traditional motifs, producing intricate illustrations and concept art. His collaborations with game studios and publishers showcase his versatility in storytelling through visuals.',
    },
  ]

  return (
    <div className='my-10 relative'>
      {/* Overlay when tooltip active */}
      {activeArtist !== null && (
        <div
          className='fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm z-20 flex items-center justify-center transition-opacity'
          onClick={() => setActiveArtist(null)}
        />
      )}

      <div className='my-10'>
        <div className='text-center py-8 text-3xl'>
          <Title text1='MEET' text2='THE ARTISTS' />
          <p className='w-3/4 m-auto text-xs sm:text-sm md:text-base text-gray-600'>
            Find more about the authors of these amazing art pieces and their
            creation journey
          </p>
        </div>
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 px-4'>
          {artists.map((artist, index) => (
            <div
              key={artist.name}
              className='relative flex items-center space-x-4 p-4 bg-gray-100 rounded-lg shadow-md cursor-pointer hover:shadow-lg transition-shadow'
              onClick={() =>
                setActiveArtist(activeArtist === index ? null : index)
              }
            >
              <img
                src={artist.image}
                alt={artist.name}
                className='w-24 h-24 rounded-full object-cover'
              />
              <div>
                <h3 className='text-lg font-bold'>{artist.name}</h3>
                <p className='text-sm text-gray-600'>{artist.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Tooltip modal centered */}
      {activeArtist !== null && (
        <div className='fixed inset-0 z-30 flex items-center justify-center p-4'>
          <div className='bg-white max-w-lg w-full p-6 rounded-lg shadow-xl transition-transform transform scale-100'>
            <div className='flex justify-between items-center mb-4'>
              <h4 className='text-2xl font-semibold'>
                {artists[activeArtist].name}
              </h4>
              <button
                onClick={() => setActiveArtist(null)}
                className='text-gray-500 hover:text-gray-800'
              >
                &times;
              </button>
            </div>
            {/* Artist image in modal */}
            <div className='flex justify-center mb-4'>
              <img
                src={artists[activeArtist].image}
                alt={artists[activeArtist].name}
                className='w-32 h-32 rounded-full object-cover'
              />
            </div>
            <p className='text-gray-700'>{artists[activeArtist].details}</p>
          </div>
        </div>
      )}}

      {/* Rendering Products */}
      <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6'>
        {latestProducts.map((item) => (
          <ProductItem
            key={item._id}
            id={item._id}
            image={item.image}
            name={item.name}
            price={item.price}
          />
        ))}
      </div>
    </div>
  )
}

export default LatestCollection;
