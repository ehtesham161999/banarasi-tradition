import { useState, useEffect } from 'react'
import { getProducts } from '../api/api'

import HeroSlider from '../components/home/HeroSlider'
import TrustBar from '../components/home/TrustBar'
import TopCategories from '../components/home/TopCategories'
import TrendingNow from '../components/home/TrendingNow'
import Celebrities from '../components/home/Celebrities'
import NewLaunched from '../components/home/NewLaunched'
import SareeStore from '../components/home/SareeStore'
import SareeOfIndia from '../components/home/SareeOfIndia'
import CategoryCircles from '../components/home/CategoryCircles'
import VideoReels from '../components/VideoReels'
import NewArrivals from '../components/home/NewArrivals'

export default function Home() {
  const [products, setProducts] = useState([])

  useEffect(() => {
    getProducts()
      .then((res) => setProducts(res.data))
      .catch((err) => console.error(err))
  }, [])

  return (
    <div className="pb-20">
      <HeroSlider />
      <TrustBar />
      <TopCategories />
      <TrendingNow />
      <Celebrities />
      <NewLaunched products={products} />
      <SareeStore />
      <SareeOfIndia />
      <CategoryCircles />
      <VideoReels products={products} />
      <NewArrivals products={products} />
    </div>
  )
}