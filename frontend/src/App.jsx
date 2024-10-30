import { useState } from 'react';
import './App.css'; // Ensure your styles are imported
import LandingPage from './components/main/LandingPage'; // Adjust path as necessary
import Navbar from './components/navbar/Navbar';
import Footer from './components/footer/Footer';
import ImageConverter from './components/main/ImageConvertor';
import { Routes, Route } from 'react-router-dom';
import NotFound from './components/404/NotFound';
import ImageResizer from './components/main/ImageResizer';
import ContactUs from './components/contact/ContactUs'


function App() {
  const [count, setCount] = useState(0);

  return (
    <div className='min-h-screen'>
      <Navbar />
      <Routes>
      <Route path='/' element={<LandingPage/>} />
      <Route path="/image-convertor" element={<ImageConverter/>} />
      <Route path="/image-resize" element={<ImageResizer/>} />
      <Route path="/contact" element={<ContactUs/>} />
      <Route path="*" element={<NotFound/>} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
