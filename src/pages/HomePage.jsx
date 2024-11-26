import React from 'react'
import HomePageStart from '../components/HomePage/HomePageStart';
import FilterBar from '../components/HomePage/FilterBar';
import Categories from '../components/HomePage/Categories';

const HomePage = () => {
  return (
    <div className="w-full h-screen">
      <HomePageStart />
      <FilterBar />
      <Categories />
    </div>
  )
}

export default HomePage
