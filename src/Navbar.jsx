import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faChevronDown } from '@fortawesome/free-solid-svg-icons';
import royologo from '../src/images/logo.png';

export default function Navbar({ selectedCategory, onCategoryChange, onSearch }) {
  const navigate = useNavigate();

  const categories = [
    'All',
    'Electronics',
    'Fashion',
    'Health & Beauty',
    'Home & Kitchen',
    'Sports & Outdoors',
    'Books',
    'Automotive',
  ];

  return (
    <div className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-white px-3 sm:px-6 lg:px-8 py-2 sm:py-3 shadow-lg">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center space-x-4 sm:space-x-6">
          <img 
            src={royologo} 
            alt="Logo" 
            className="h-8 sm:h-12 cursor-pointer hidden sm:block" 
            onClick={() => navigate('/')} 
          />
          <span className="text-lg sm:text-xl font-bold">Affiliate Hub</span>
        </div>

        <div className="flex-1 flex justify-center">
          <div className="relative w-full max-w-xs sm:max-w-md lg:max-w-lg flex items-center">
            <div className="relative hidden md:block">
              <select
                className="appearance-none bg-white text-gray-800 font-semibold py-2 px-3 pr-8 rounded-l-md focus:outline-none focus:ring-2 focus:ring-yellow-400 cursor-pointer text-xs sm:text-sm"
                style={{ minWidth: '140px' }}
                value={selectedCategory}
                onChange={(e) => onCategoryChange(e.target.value)}
              >
                {categories.map((category, index) => (
                  <option key={index} value={category}>
                    {category}
                  </option>
                ))}
              </select>
              <FontAwesomeIcon icon={faChevronDown} className="absolute top-1/2 transform -translate-y-1/2 right-2 text-gray-800 pointer-events-none" />
            </div>
            <input
              type="text"
              placeholder={`Search ${selectedCategory !== 'All' ? selectedCategory : ''}`.trim()}
              className="w-full px-4 py-2 rounded-md border border-gray-300 text-gray-800 focus:outline-none focus:ring-2 focus:ring-yellow-400 text-xs sm:text-sm"
              onChange={(e) => onSearch(e.target.value)}
            />
            <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:pr-3">
              <FontAwesomeIcon icon={faSearch} className="text-gray-500 h-4 sm:h-5 cursor-pointer" />
            </div>
          </div>
        </div>

      
      </div>
    </div>
  );
}
