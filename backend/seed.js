require('dotenv').config();
const mongoose = require('mongoose');
const Product = require('./models/Product');

const products = [
  {
    name: 'Banarasi Silk Saree - Red',
    price: 1299,
    mrp: 2999,
    image: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=500',
    video: 'https://assets.mixkit.co/videos/preview/mixkit-woman-in-a-red-dress-39875-large.mp4',
    category: 'silk',
    description: 'Pure Banarasi silk with zari work.',
  },
  {
    name: 'Kanjivaram Silk Saree - Gold',
    price: 2499,
    mrp: 4999,
    image: 'https://images.unsplash.com/photo-1583391733956-6c78276477e2?w=500',
    video: 'https://assets.mixkit.co/videos/preview/mixkit-woman-modeling-a-yellow-dress-39871-large.mp4',
    category: 'silk',
    description: 'Traditional Kanjivaram with gold border.',
  },
  {
    name: 'Cotton Handloom Saree - Blue',
    price: 899,
    mrp: 1799,
    image: 'https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?w=500',
    video: 'https://assets.mixkit.co/videos/preview/mixkit-woman-in-a-floral-dress-39873-large.mp4',
    category: 'cotton',
    description: 'Soft cotton handloom saree.',
  },
  {
    name: 'Georgette Party Saree - Pink',
    price: 1599,
    mrp: 3199,
    image: 'https://images.unsplash.com/photo-1594736797933-d0501ba2fe65?w=500',
    video: 'https://assets.mixkit.co/videos/preview/mixkit-woman-in-a-red-dress-39875-large.mp4',
    category: 'georgette',
    description: 'Designer georgette saree.',
  },
  {
    name: 'Dark Green Art Silk Kurta Set',
    price: 1599,
    mrp: 4361,
    image: 'https://images.unsplash.com/photo-1583391733956-6c78276477e2?w=500',
    video: 'https://assets.mixkit.co/videos/preview/mixkit-woman-modeling-a-yellow-dress-39871-large.mp4',
    category: 'kurta',
    description: 'Dark green art silk woven straight kurta set.',
  },
  {
    name: 'Off White Cotton Kurta Set',
    price: 1599,
    mrp: 4189,
    image: 'https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?w=500',
    video: 'https://assets.mixkit.co/videos/preview/mixkit-woman-in-a-floral-dress-39873-large.mp4',
    category: 'kurta',
    description: 'Off white pure cotton woven straight kurta set.',
  },
  {
    name: 'Maroon Georgette Anarkali Kurta',
    price: 1699,
    mrp: 4791,
    image: 'https://images.unsplash.com/photo-1594736797933-d0501ba2fe65?w=500',
    video: 'https://assets.mixkit.co/videos/preview/mixkit-woman-in-a-red-dress-39875-large.mp4',
    category: 'kurta',
    description: 'Maroon georgette embroidery anarkali kurta.',
  },
  {
    name: 'Mustard Yellow Cotton Kurta Set',
    price: 1599,
    mrp: 4189,
    image: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=500',
    video: 'https://assets.mixkit.co/videos/preview/mixkit-woman-in-a-red-dress-39875-large.mp4',
    category: 'kurta',
    description: 'Mustard yellow pure cotton woven straight kurta set.',
  },
  {
    name: 'Dusty Rose Embroidered Saree',
    price: 2299,
    mrp: 4599,
    image: 'https://images.unsplash.com/photo-1583391733956-6c78276477e2?w=500',
    video: 'https://assets.mixkit.co/videos/preview/mixkit-woman-modeling-a-yellow-dress-39871-large.mp4',
    category: 'silk',
    description: 'Dusty rose embroidered silk saree.',
  },
  {
    name: 'Royal Blue Banarasi Saree',
    price: 1899,
    mrp: 3799,
    image: 'https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?w=500',
    video: 'https://assets.mixkit.co/videos/preview/mixkit-woman-in-a-floral-dress-39873-large.mp4',
    category: 'silk',
    description: 'Royal blue Banarasi silk saree.',
  },
  {
    name: 'Peach Organza Saree',
    price: 1399,
    mrp: 2799,
    image: 'https://images.unsplash.com/photo-1594736797933-d0501ba2fe65?w=500',
    video: 'https://assets.mixkit.co/videos/preview/mixkit-woman-in-a-red-dress-39875-large.mp4',
    category: 'organza',
    description: 'Peach organza saree with embroidery.',
  },
  {
    name: 'Wine Velvet Saree',
    price: 2599,
    mrp: 5199,
    image: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=500',
    video: 'https://assets.mixkit.co/videos/preview/mixkit-woman-in-a-red-dress-39875-large.mp4',
    category: 'velvet',
    description: 'Wine velvet saree with gold work.',
  },
];

async function seed() {
  await mongoose.connect(process.env.MONGO_URI);
  console.log('Connected');

  await Product.deleteMany({});
  await Product.insertMany(products);

  console.log(`✅ ${products.length} products added`);
  process.exit();
}

seed();