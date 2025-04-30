require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const path = require('path');

const authRoutes    = require('./routes/authRoutes');
const productRoutes = require('./routes/productRoutes');
const cartRoutes    = require('./routes/cartRoutes');
const orderRoutes   = require('./routes/orderRoutes');
const userRoutes    = require('./routes/userRoutes');

const app = express();
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(_=> console.log('✅ MongoDB Bağlandı'))
.catch(err=> console.error('❌ MongoDB Hatası:', err));

// API rotaları
app.use('/api/auth',    authRoutes);
app.use('/api/products',productRoutes);
app.use('/api/cart',    cartRoutes);
app.use('/api/orders',  orderRoutes);
app.use('/api/users',   userRoutes);

// Herhangi bir GET isteğini index.html’e yönlendir
app.get('*', (req,res)=> {
  res.sendFile(path.join(__dirname, 'public/index.html'));
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, ()=> console.log(`🚀 Sunucu ${PORT} portunda`));
