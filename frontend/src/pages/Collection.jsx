import React, { useContext, useEffect, useState } from 'react';
import { ShopContext } from '../context/ShopContext';
import Title from '../components/Title';
import ProductItem from '../components/ProductItem';

const Collection = () => {
  const { products, search } = useContext(ShopContext);
  const [filterProducts, setFilterProducts] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedSubCategories, setSelectedSubCategories] = useState([]);
  const [expandedCategory, setExpandedCategory] = useState(null);
  const [sortType, setSortType] = useState('relevant');

  const categories = ['Traditional', 'Digital', 'Comission'];
  const subCategories = {
    Traditional: ['Oil', 'Acrylics', 'Watercolor', 'Ink', 'Sculpture', 'Clay', 'Other'],
    Digital: ['Prints', 'Stickers', 'Other'],
    Comission: ['Traditional', 'Digital'],
  };

  useEffect(() => {
    let filtered = products.slice();
    if (search) {
      filtered = filtered.filter((p) =>
        p.name.toLowerCase().includes(search.toLowerCase())
      );
    }
    if (selectedCategories.length) {
      filtered = filtered.filter((p) =>
        selectedCategories.includes(p.category)
      );
    }
    if (selectedSubCategories.length) {
      filtered = filtered.filter((p) =>
        selectedSubCategories.includes(p.subCategory)
      );
    }
    if (sortType === 'low-high') {
      filtered.sort((a, b) => a.price - b.price);
    } else if (sortType === 'high-low') {
      filtered.sort((a, b) => b.price - a.price);
    }
    setFilterProducts(filtered);
  }, [products, search, selectedCategories, selectedSubCategories, sortType]);

  const toggleCategory = (cat) => {
    setSelectedSubCategories([]);
    setSelectedCategories((prev) =>
      prev.includes(cat) ? prev.filter((c) => c !== cat) : [...prev, cat]
    );
    setExpandedCategory((prev) => (prev === cat ? null : cat));
  };

  const toggleSubCategory = (sub) => {
    setSelectedSubCategories((prev) =>
      prev.includes(sub) ? prev.filter((s) => s !== sub) : [...prev, sub]
    );
  };

  return (
    <div className='flex flex-col lg:flex-row gap-6 pt-10'>
      {/* Filters Panel */}
      <aside className='w-full lg:w-1/4 p-4 bg-white rounded shadow'>
        <h3 className='text-lg font-semibold mb-4'>Filters</h3>
        {categories.map((cat) => (
          <div key={cat} className='mb-3'>
            <button
              onClick={() => toggleCategory(cat)}
              className='w-full flex justify-between items-center p-2 font-medium bg-gray-100 rounded'>
              <span
                className={`capitalize ${
                  selectedCategories.includes(cat)
                    ? 'text-black'
                    : 'text-gray-600'
                }`}>
                {cat}
              </span>
              <span className='text-gray-500'>
                {expandedCategory === cat ? '▴' : '▾'}
              </span>
            </button>
            {expandedCategory === cat && selectedCategories.includes(cat) && (
              <div className='pl-4 mt-2 space-y-2'>
                {subCategories[cat].map((sub) => (
                  <label
                    key={sub}
                    className='flex items-center gap-2 text-gray-700'>
                    <input
                      type='checkbox'
                      checked={
                        selectedSubCategories.includes(sub)
                      }
                      onChange={() => toggleSubCategory(sub)}
                      className='h-4 w-4'
                    />
                    <span className='capitalize'>{sub}</span>
                  </label>
                ))}
              </div>
            )}
          </div>
        ))}
      </aside>

      {/* Products & Sort */}
      <section className='flex-1'>
        <div className='flex justify-between items-center mb-6'>
          <Title text1='ALL' text2='ARTWORKS' />
          <select
            value={sortType}
            onChange={(e) => setSortType(e.target.value)}
            className='border border-gray-300 rounded px-3 py-1'>
            <option value='relevant'>Sort: Relevant</option>
            <option value='low-high'>Price: Low to High</option>
            <option value='high-low'>Price: High to Low</option>
          </select>
        </div>
        <div className='grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6'>
          {filterProducts.map((item) => (
            <ProductItem
              key={item._id}
              id={item._id}
              name={item.name}
              price={item.price}
              image={item.image}
            />
          ))}
        </div>
      </section>
    </div>
  );
};

export default Collection;
