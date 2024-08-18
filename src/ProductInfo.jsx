import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { FaShippingFast, FaRegCheckCircle, FaRegCreditCard, FaStar } from 'react-icons/fa';
import { BiSupport } from 'react-icons/bi';
import InnerImageZoom from 'react-inner-image-zoom';
import 'react-inner-image-zoom/lib/InnerImageZoom/styles.css';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

export default function ProductInfo() {
  const location = useLocation();
  const data = location.state?.data || {};

  const [ati, setati] = useState(data?.ati || []);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  return (
    <div className="flex flex-col md:flex-row justify-center items-center md:items-start bg-white p-4 md:p-8 gap-8 md:gap-16">
      <div className="w-full md:w-1/2 flex justify-center">
        <InnerImageZoom
          src={data.image}
          zoomSrc={data.image}
          alt={data.name}
          className="w-full h-auto max-h-[600px] object-contain rounded-lg shadow-md"
        />
      </div>
      <div className="w-full md:w-1/2 flex flex-col">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">{data.name}</h1>
        <p className="text-lg md:text-xl text-gray-700 mb-6">{data.description}</p>
        <div className="flex items-center mb-4">
          <b className="text-2xl text-yellow-500 mr-2">{data.rating}</b>
          <img src={data.ratingimg} alt="Rating" className="h-6" />
        </div>
        <div className="mb-4 text-gray-600 font-semibold">
          <b>{data.pur}</b>
        </div>
        <div className="border-b border-gray-300 mb-4"></div>
        <div className="mb-4">
          <b className="text-4xl text-red-600">{data.dis}</b>
        </div>
        <div className="mb-4">
          <b className="text-3xl text-gray-900">{data.price}</b>
        </div>
        <div className="text-gray-500 text-sm mb-4">
          <p className="line-through">MRP: {data.mrp}</p>
        </div>
        <div className="border-b border-gray-300 mb-4"></div>
        <div className="text-gray-700 font-medium text-lg mb-6">
          <p>Including all taxes</p>
        </div>
        <div className="mb-6 grid grid-cols-2 gap-4 text-center">
          <div>
            <BiSupport size={40} className="mx-auto text-orange-500" />
            <p className="mt-2 text-sm text-gray-700">7 days service center</p>
          </div>
          <div>
            <FaShippingFast size={40} className="mx-auto text-orange-500" />
            <p className="mt-2 text-sm text-gray-700">free delivery</p>
          </div>
          <div>
            <FaRegCheckCircle size={40} className="mx-auto text-orange-500" />
            <p className="mt-2 text-sm text-gray-700">warranty policy</p>
          </div>
          <div>
            <FaRegCreditCard size={40} className="mx-auto text-orange-500" />
            <p className="mt-2 text-sm text-gray-700">pay on delivery</p>
          </div>
          <div>
            <FaStar size={40} className="mx-auto text-orange-500" />
            <p className="mt-2 text-sm text-gray-700">top brand</p>
          </div>
        </div>
        <div className="text-xl font-semibold mb-4">About this item</div>
        <ul className="list-disc list-inside text-lg text-gray-700 mb-6">
          {ati.map((a, index) => (
            <li key={index} className="mb-2">{a}</li>
          ))}
        </ul>
        <button
          className="w-full md:w-1/2 py-3 bg-yellow-500 hover:bg-yellow-600 text-white font-semibold rounded-md shadow-md focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:ring-opacity-75"
        >
          Buy Now
        </button>
      </div>
    </div>
  );
}
