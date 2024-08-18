import { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './Navbar';
import Products from './Products';
import ProductInfo from './ProductInfo';
import axios from 'axios';
import Slider from 'react-slick';
import link from './link'; // Assume this is your backend URL
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import threepoint5 from '../src/images/3.5.png';
import AdminPanel from './AdminPanel';
import four from '../src/images/4.0.png';
import fourpoint5 from '../src/images/4.5.png';
import five from '../src/images/5.0.png';

function Banner() {
  const bannerImages = [
    {
      src: 'https://images.unsplash.com/photo-1593642532973-d31b6557fa68?fit=crop&w=1500&q=80',
      alt: 'High-Tech Products',
      text: 'Discover the Best High-Tech Products',
    },
    {
      src: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?fit=crop&w=1500&q=80',
      alt: 'Quality Electronics',
      text: 'Top Quality Electronics for Your Needs',
    },
    {
      src: 'https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?fit=crop&w=1500&q=80',
      alt: 'Latest Gadgets',
      text: 'Find the Latest Gadgets Here',
    },
  ];

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000, // 3 seconds
    fade: true,
    arrows: false,
  };

  return (
    <div className="relative w-full h-[500px] overflow-hidden">
      <Slider {...settings}>
        {bannerImages.map((image, index) => (
          <div key={index} className="relative">
            <img
              src={image.src}
              alt={image.alt}
              className="w-full h-[500px] object-cover"
            />
            <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
              <h2 className="text-white text-3xl sm:text-4xl md:text-5xl font-bold text-center">
                {image.text}
              </h2>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
}

function AppContent() {
  const [username, setUsername] = useState('Guest');
  const [products, setProducts] = useState([]); // Initialize as an empty array
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchText, setSearchText] = useState('');

  const location = useLocation();

  const staticProducts = [
    {
      name: 'Iphone 15',
      category: 'Mobile',
      price: '400.66 USD',
      image: 'https://cdn.mos.cms.futurecdn.net/yDn3ZSXu9eSBxmXQDZ4PCF-1200-80.jpg',
      count: 1,
      description: 'Secured and Ultra fast mobile',
      brand: 'Apple',
      rating: 5.0,
      t: ['Argan Oil', 'Coconut Oil', 'Vitamin E'],
      ratingimg:four,
      pur:'500+ purchased last month',
      mrp:'800.32',
      dis:'50%',
      ati: [
        'Sleek design and premium build quality, powered by cutting-edge A-series chips.',
        'Leading-edge camera technology with features like Portrait mode and Night mode.',
        'Integration into the cohesive Apple ecosystem, ensuring seamless connectivity between devices.',
        'Emphasis on security and privacy, featuring Face ID or Touch ID for biometric authentication.',
        'Regular updates and support, maintaining the longevity and performance of the iPhone.'
      ]
    },
    // Add more static products as necessary
  ];

  const fetchProducts = async (category = selectedCategory, search = searchText) => {
    try {
      const params = {};
      if (category !== 'All') params.category = category;
      if (search) params.name = search;
      const response = await axios.get(`${link}/pro/all`, { params });
      const combinedProducts = [...staticProducts, ...response.data];
      setProducts(combinedProducts);
    } catch (error) {
      console.error('Error fetching products from backend:', error);
      setProducts(staticProducts); // Fallback to static products if backend fails
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [selectedCategory, searchText]);

  const filteredProducts = products.filter(p => 
    (selectedCategory === 'All' || p.category === selectedCategory) &&
    (searchText === '' || p.name.toLowerCase().includes(searchText.toLowerCase()))
  );

  const handleSearch = (text) => {
    setSearchText(text);
    fetchProducts(selectedCategory, text);
  };

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    fetchProducts(category, searchText);
  };

  const hideNavbar = location.pathname === '/login' || location.pathname === '/signup';

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-800 via-black to-gray-800 text-white">
      {!hideNavbar && (
        <>
          <Navbar 
            username={username} 
            selectedCategory={selectedCategory} 
            onCategoryChange={handleCategoryChange} 
            onSearch={handleSearch}
          />
          <Banner />
        </>
      )}
      <div className="container mx-auto px-4 py-8">
        <Routes>
          <Route
            path="/"
            element={
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                {filteredProducts.map((p) => (
                  <Products key={p._id || p.name} data={p} />
                ))}
              </div>
            }
          />
          <Route path="/productinfo" element={<ProductInfo />} />
          <Route path="/admin" element={<AdminPanel />} />
        </Routes>
      </div>
    </div>
  );
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;
