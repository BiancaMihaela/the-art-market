import React, { useContext, useEffect, useState } from 'react';
import { ShopContext } from '../context/ShopContext';
import Title from '../components/Title';
import ProductItem from '../components/ProductItem';

const Collection = () => {
  const { products, search } = useContext(ShopContext);
  const [filterProducts, setFilterProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedSubCategories, setSelectedSubCategories] = useState([]);
  const [sortType, setSortType] = useState('relevant');

  const categories = ['Traditional', 'Digital', 'Comission'];
  const subCategories = {
    Traditional: ['Oil', 'Acrylics', 'Watercolor', 'Ink', 'Sculpture', 'Clay', 'Other'],
    Digital: ['Prints', 'Stickers', 'Other'],
    Comission: ['Traditional', 'Digital'],
  };

  // Filter and sort effect
  useEffect(() => {
    let filtered = products.slice();
    if (search) {
      filtered = filtered.filter(p => p.name.toLowerCase().includes(search.toLowerCase()));
    }
    if (selectedCategory) {
      filtered = filtered.filter(p => p.category === selectedCategory);
    }
    if (selectedSubCategories.length) {
      filtered = filtered.filter(p => selectedSubCategories.includes(p.subCategory));
    }
    if (sortType === 'low-high') filtered.sort((a, b) => a.price - b.price);
    else if (sortType === 'high-low') filtered.sort((a, b) => b.price - a.price);
    setFilterProducts(filtered);
  }, [products, search, selectedCategory, selectedSubCategories, sortType]);

  // Handle category checkbox: only one at a time
  const handleCategoryChange = (cat) => {
    if (cat === selectedCategory) {
      setSelectedCategory('');
      setSelectedSubCategories([]);
    } else {
      setSelectedCategory(cat);
      setSelectedSubCategories([]);
    }
  };

  // Toggle individual subcategory
  const toggleSubCategory = (sub) => {
    setSelectedSubCategories(prev =>
      prev.includes(sub) ? prev.filter(s => s !== sub) : [...prev, sub]
    );
  };

  return (
    <div className='flex flex-col lg:flex-row gap-6 pt-10'>
      {/* Filters Panel */}
      <aside className='w-full lg:w-1/4 p-4 bg-white rounded shadow'>
        <h3 className='text-lg font-semibold mb-4'>Filters</h3>
        {/* Category checkboxes */}
        <div className='space-y-3'>
          {categories.map(cat => (
            <label key={cat} className='flex items-center gap-2'>
              <input
                type='checkbox'
                className='h-4 w-4'
                checked={selectedCategory === cat}
                onChange={() => handleCategoryChange(cat)}
              />
              <span className='capitalize'>{cat}</span>
            </label>
          ))}
        </div>

        {/* Subcategories appear only when a category is selected */}
        {selectedCategory && (
          <div className='mt-6'>
            <h4 className='mb-2 text-sm font-medium'>Subcategories</h4>
            <div className='space-y-2'>
              {subCategories[selectedCategory].map(sub => (
                <label key={sub} className='flex items-center gap-2'>
                  <input
                    type='checkbox'
                    className='h-4 w-4'
                    checked={selectedSubCategories.includes(sub)}
                    onChange={() => toggleSubCategory(sub)}
                  />
                  <span className='capitalize'>{sub}</span>
                </label>
              ))}
            </div>
          </div>
        )}
      </aside>

      {/* Products & Sort */}
      <section className='flex-1'>
        <div className='flex justify-between items-center mb-6'>
          <Title text1='ALL' text2='ARTWORKS' />
          <select
            value={sortType}
            onChange={e => setSortType(e.target.value)}
            className='border border-gray-300 rounded px-3 py-1 text-sm'
          >
            <option value='relevant'>Sort: Relevant</option>
            <option value='low-high'>Price: Low to High</option>
            <option value='high-low'>Price: High to Low</option>
          </select>
        </div>

        <div className='grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6'>
          {filterProducts.map(item => (
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
