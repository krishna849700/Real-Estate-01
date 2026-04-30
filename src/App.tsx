/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Search, Home, Key, MapPin, Bed, Bath, Square, ChevronRight, CheckCircle, MessageCircle, ArrowRight, Star, X, Send, Bot, Sliders, Check } from 'lucide-react';

const PROPERTIES = [
  {
    id: 1,
    title: '2BHK in Andheri West',
    location: 'Near Metro Station, Andheri West',
    price: '₹1.85 Cr',
    beds: 2,
    baths: 2,
    sqft: 850,
    tag: 'FURNISHED',
    image: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800&q=80',
  },
  {
    id: 2,
    title: '3BHK in Bandra East',
    location: 'Premium Society, Bandra East',
    price: '₹3.2 Cr',
    beds: 3,
    baths: 3,
    sqft: 1200,
    tag: 'PREMIUM',
    image: 'https://images.unsplash.com/photo-1502672260266-1c1de2d93688?w=800&q=80',
  },
  {
    id: 3,
    title: '1BHK in Powai',
    location: 'Lake View, Powai',
    price: '₹95 Lakh',
    beds: 1,
    baths: 1,
    sqft: 550,
    tag: 'GATED COMMUNITY',
    image: 'https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=800&q=80',
  },
  {
    id: 4,
    title: '2BHK in Thane West',
    location: 'Family-friendly area, Thane West',
    price: '₹1.25 Cr',
    beds: 2,
    baths: 2,
    sqft: 780,
    tag: 'SCHOOLS NEARBY',
    image: 'https://images.unsplash.com/photo-1512918580421-b2feaf3cb80b?w=800&q=80',
  },
  {
    id: 5,
    title: 'Studio Apartment Built',
    location: 'Navi Mumbai',
    price: '₹55 Lakh',
    beds: 1,
    baths: 1,
    sqft: 400,
    tag: 'INVESTMENT',
    image: 'https://images.unsplash.com/photo-1416331108676-a22ccb276e35?w=800&q=80',
  },
  {
    id: 6,
    title: '4BHK Luxury Mansion',
    location: 'Sea-facing, Juhu',
    price: '₹8.5 Cr',
    beds: 4,
    baths: 5,
    sqft: 2200,
    tag: 'LUXURY',
    image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80',
  },
];

const REVIEWS = [
  { text: "Found my dream home in just 2 weeks!", author: "Rohit Mehta" },
  { text: "Very responsive team on WhatsApp. Smooth process.", author: "Sneha Kapoor" },
  { text: "Transparent deals, no hidden charges.", author: "Amit Shah" },
  { text: "Helped me invest in the right property at the best price.", author: "Neha Jain" },
];

const FAQS = [
  { q: "Are the properties verified?", a: "Yes, all listings are personally verified by our experts before showing." },
  { q: "Do you charge brokerage?", a: "Yes, standard brokerage applies (negotiable based on property)." },
  { q: "Can I schedule a visit today?", a: "Yes, we offer same-day site visits for most properties." },
];

function ChatbotWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { sender: 'bot', text: 'Hi! 👋 Welcome to UrbanNest Realty. Are you looking to Buy or Rent a property in Mumbai?' }
  ]);
  const [step, setStep] = useState(0);
  const [inputValue, setInputValue] = useState('');
  const chatEndRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, step]);

  React.useEffect(() => {
    const handleOpen = () => setIsOpen(true);
    window.addEventListener('open-chatbot', handleOpen);
    return () => window.removeEventListener('open-chatbot', handleOpen);
  }, []);

  const addMessage = (sender: string, text: string) => {
    setMessages(prev => [...prev, { sender, text }]);
  };

  const handleAction = (actionText: string) => {
    addMessage('user', actionText);
    
    setTimeout(() => {
      if (step === 0) {
        addMessage('bot', `Great! What is your approximate budget for ${actionText.toLowerCase()}ing?`);
        setStep(1);
      } else if (step === 1) {
        addMessage('bot', 'Noted. Which specific locations in Mumbai are you interested in?');
        setStep(2);
      }
    }, 600);
  };

  const handleSubmitInput = () => {
    if (!inputValue.trim()) return;
    const userInput = inputValue;
    addMessage('user', userInput);
    setInputValue('');

    setTimeout(() => {
      if (step === 2) {
        addMessage('bot', `Perfect, looking in ${userInput}. Any specific amenities you need? (e.g. Gym, Parking, Pool)`);
        setStep(3);
      } else if (step === 3) {
        addMessage('bot', `Noted on the amenities. Lastly, could you share your WhatsApp number so we can send you matched properties and arrange site visits?`);
        setStep(4);
      } else if (step === 4) {
        addMessage('bot', `Thanks! I've sent the best verified properties matching your criteria to your WhatsApp. 📲 Our agent will assist you further.`);
        setStep(5);
      } else {
         addMessage('bot', `Our agent will reach out to you shortly.`);
      }
    }, 600);
  };

  return (
    <>
      <div className="fixed bottom-6 right-6 z-50">
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.95 }}
              className="absolute bottom-16 right-0 w-80 sm:w-96 bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden flex flex-col"
            >
              <div className="bg-accent p-4 text-white flex justify-between items-center z-10">
                <div className="flex items-center gap-2">
                  <Bot size={20} />
                  <span className="font-semibold text-sm">Smart Property Assistant</span>
                </div>
                <button onClick={() => setIsOpen(false)} className="text-white/80 hover:text-white">
                  <X size={18} />
                </button>
              </div>

              <div className="p-4 flex-1 h-80 overflow-y-auto bg-gray-50 flex flex-col gap-3 text-sm">
                {messages.map((msg, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`p-3 max-w-[85%] shadow-sm ${msg.sender === 'bot' ? 'bg-white rounded-2xl rounded-tl-sm border border-gray-100 self-start' : 'bg-primary text-white rounded-2xl rounded-tr-sm self-end'}`}
                  >
                    {msg.text}
                  </motion.div>
                ))}
                
                {step === 5 && (
                  <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="self-start w-full">
                    <button onClick={() => window.open('https://api.whatsapp.com/send?phone=919876543210&text=Hello%20UrbanNest', '_blank')} className="bg-[#25D366] text-white font-semibold py-2 rounded-lg w-full flex justify-center items-center gap-2 mt-1 shadow-md hover:bg-[#20bd5a] transition-colors">
                      <MessageCircle size={16} /> Open WhatsApp
                    </button>
                  </motion.div>
                )}
                
                <div ref={chatEndRef} />
              </div>

              {step === 0 && (
                <div className="p-4 bg-white border-t border-gray-100 grid grid-cols-2 gap-2">
                  <button onClick={() => handleAction('Buy')} className="border border-gray-200 text-primary py-2 rounded-lg text-sm font-medium hover:bg-gray-50 transition-colors">I want to Buy</button>
                  <button onClick={() => handleAction('Rent')} className="border border-gray-200 text-primary py-2 rounded-lg text-sm font-medium hover:bg-gray-50 transition-colors">I want to Rent</button>
                </div>
              )}

              {step === 1 && (
                <div className="p-4 bg-white border-t border-gray-100 grid grid-cols-2 gap-2">
                  <button onClick={() => handleAction('< ₹1Cr')} className="border border-gray-200 text-primary py-2 rounded-lg text-sm font-medium hover:bg-gray-50 transition-colors">&lt; ₹1Cr</button>
                  <button onClick={() => handleAction('₹1Cr - ₹3Cr')} className="border border-gray-200 text-primary py-2 rounded-lg text-sm font-medium hover:bg-gray-50 transition-colors">₹1Cr - ₹3Cr</button>
                  <button onClick={() => handleAction('₹3Cr+')} className="border border-gray-200 text-primary py-2 rounded-lg text-sm font-medium hover:bg-gray-50 transition-colors col-span-2">₹3Cr+</button>
                </div>
              )}

              {(step >= 2 && step <= 4) && (
                <div className="p-3 bg-white border-t border-gray-100 flex gap-2">
                  <input 
                    type={step === 4 ? "tel" : "text"}
                    placeholder={step === 4 ? "e.g. +91 98765 43210" : (step === 3 ? "e.g. Gym, Pool, Parking" : "e.g. Andheri, Juhu")} 
                    className="flex-1 px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-accent"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleSubmitInput()}
                  />
                  <button onClick={handleSubmitInput} className="bg-accent text-white p-2 rounded-lg hover:bg-accent/90">
                    <Send size={16} />
                  </button>
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>

        <button 
          onClick={() => setIsOpen(!isOpen)}
          className="bg-[#25D366] text-white p-4 rounded-full shadow-xl hover:scale-105 transition-transform flex items-center justify-center relative"
        >
          {isOpen ? <X size={28} /> : <MessageCircle size={28} />}
          {!isOpen && (
            <span className="absolute -top-1 -right-1 flex h-4 w-4">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75"></span>
              <span className="relative inline-flex rounded-full h-4 w-4 bg-accent"></span>
            </span>
          )}
        </button>
      </div>
    </>
  );
}

export default function App() {
  const [showAdvanced, setShowAdvanced] = useState(false);
  const amenities = ["Furnished", "Gym", "Swimming Pool", "Parking", "Security", "Lake View", "Balcony"];

  return (
    <div className="min-h-screen">
      {/* Navigation */}
      <header className="fixed top-0 w-full z-40 bg-white/90 backdrop-blur-md border-b border-gray-100 shadow-[0_4px_20px_rgba(0,0,0,0.03)]">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="text-2xl font-serif font-bold tracking-tight text-primary">UrbanNest Realty<span className="text-accent">.</span></div>
          <nav className="hidden md:flex gap-8">
            <a href="#properties" className="text-primary font-semibold border-b-2 border-accent pb-1">Buy</a>
            <a href="#properties" className="text-gray-500 hover:text-primary font-medium transition-colors">Rent</a>
            <a href="#services" className="text-gray-500 hover:text-primary font-medium transition-colors">Sell</a>
            <a href="#services" className="text-gray-500 hover:text-primary font-medium transition-colors">Invest</a>
          </nav>
          <button onClick={() => window.dispatchEvent(new CustomEvent('open-chatbot'))} className="bg-accent text-white px-6 py-2.5 rounded-lg text-sm font-bold hover:bg-accent/90 transition-colors">
            Book Site Visit
          </button>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative pt-20 pb-24 lg:pb-32 bg-gray-50 overflow-hidden">
        <div className="absolute inset-0 z-0 bg-black">
          <video 
            autoPlay 
            loop 
            muted 
            playsInline
            poster="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=2000&q=80"
            className="w-full h-full object-cover opacity-80"
          >
            <source src="https://assets.mixkit.co/videos/preview/mixkit-modern-architecture-of-a-house-with-a-pool-39876-large.mp4" type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-transparent"></div>
        </div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-6 pt-24 lg:pt-32">
          <div className="max-w-2xl text-white">
            <span className="inline-block py-1 px-3 rounded-full bg-accent/20 text-accent font-bold text-xs tracking-wider uppercase mb-6 backdrop-blur-sm border border-accent/30">
              Mumbai's Premier Real Estate
            </span>
            <h1 className="text-5xl lg:text-7xl font-serif font-bold leading-[1.1] tracking-tight mb-6">
              Find your perfect property in Mumbai.
            </h1>
            <p className="text-xl text-gray-200 mb-8 max-w-lg font-light leading-relaxed">
              From luxury apartments to budget-friendly homes, we provide verified listings and transparent deals.
            </p>
            <button onClick={() => window.open('https://api.whatsapp.com/send?phone=919876543210&text=Hi%20UrbanNest!%20I%20am%20looking%20for%20property.', '_blank')} className="bg-[#25D366] text-white px-6 py-3 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-[#20bd5a] transition-all shadow-[0_0_20px_rgba(37,211,102,0.3)] w-max text-sm sm:text-base">
              <MessageCircle size={20} /> Chat on WhatsApp
            </button>
          </div>
          
          <div className="mt-10 bg-white/95 backdrop-blur-lg p-3 rounded-2xl shadow-2xl flex flex-col gap-0 transition-all duration-300 w-full max-w-5xl border border-white/20">
            <div className="flex flex-col lg:flex-row gap-2">
              <div className="flex-1 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-2 lg:gap-0 lg:divide-x divide-gray-200 bg-gray-50 rounded-xl border border-gray-100 p-1 lg:p-0">
                <div className="px-4 py-3 flex flex-col justify-center">
                  <label className="text-[10px] font-bold text-gray-500 uppercase tracking-wider mb-1">Keyword</label>
                  <input type="text" placeholder="2BHK, Luxury..." className="w-full text-sm font-medium text-gray-900 focus:outline-none placeholder:text-gray-400 bg-transparent" />
                </div>
                <div className="px-4 py-3 flex flex-col justify-center">
                  <label className="text-[10px] font-bold text-gray-500 uppercase tracking-wider mb-1">Location</label>
                  <input type="text" placeholder="Andheri, Bandra..." className="w-full text-sm font-medium text-gray-900 focus:outline-none placeholder:text-gray-400 bg-transparent" />
                </div>
                <div className="px-4 py-3 flex flex-col justify-center">
                  <label className="text-[10px] font-bold text-gray-500 uppercase tracking-wider mb-1">Property Type</label>
                  <select className="w-full text-sm font-medium text-gray-900 focus:outline-none bg-transparent appearance-none">
                    <option>Apartment</option>
                    <option>Villa</option>
                    <option>Studio</option>
                    <option>Penthouse</option>
                  </select>
                </div>
                <div className="px-4 py-3 flex flex-col justify-center">
                  <label className="text-[10px] font-bold text-gray-500 uppercase tracking-wider mb-1">Price Range</label>
                  <select className="w-full text-sm font-medium text-gray-900 focus:outline-none bg-transparent appearance-none cursor-pointer">
                    <option>₹50L - ₹1Cr</option>
                    <option>₹1Cr - ₹3Cr</option>
                    <option>₹3Cr+</option>
                  </select>
                </div>
              </div>
              <div className="flex gap-2 py-1 px-1 lg:flex-shrink-0 mt-2 lg:mt-0">
                <button 
                  onClick={() => setShowAdvanced(!showAdvanced)} 
                  className={`px-5 rounded-xl border transition-colors flex items-center justify-center flex-1 lg:flex-none py-3 lg:py-0 ${showAdvanced ? 'bg-primary text-white border-primary' : 'bg-white text-primary border-gray-200 hover:bg-gray-50'}`}
                >
                  <Sliders size={20} />
                </button>
                <button onClick={() => document.getElementById('properties')?.scrollIntoView({ behavior: 'smooth' })} className="flex-1 lg:flex-none bg-accent text-white px-8 rounded-xl font-bold hover:bg-accent/90 transition-colors text-sm py-3 lg:py-0 text-shadow-sm flex items-center justify-center gap-2">
                  <Search size={18} /> Search
                </button>
              </div>
            </div>

            <AnimatePresence>
              {showAdvanced && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="overflow-hidden"
                >
                  <div className="pt-6 pb-4 px-6 border-t border-gray-200 mt-3 grid grid-cols-1 md:grid-cols-2 gap-8 text-gray-900 bg-white rounded-xl">
                    {/* Size and Bathrooms */}
                    <div className="space-y-6">
                      <div>
                        <div className="flex justify-between items-center mb-4">
                          <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">Price Range (Crores)</label>
                          <span className="text-sm font-bold text-primary">₹0.5Cr - ₹10Cr+</span>
                        </div>
                        <input type="range" min="0.5" max="10" step="0.5" defaultValue="5" className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-accent" />
                        <div className="flex justify-between text-xs text-gray-400 mt-2">
                          <span>₹50 Lakhs</span>
                          <span>Any</span>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-6">
                        <div>
                          <label className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-3 block">Bedrooms</label>
                          <div className="flex gap-2">
                            {['1', '2', '3', '4+'].map(num => (
                              <button key={num} className="w-10 h-10 rounded-lg border border-gray-200 text-sm font-medium hover:border-accent hover:text-accent transition-colors">
                                {num}
                              </button>
                            ))}
                          </div>
                        </div>
                        <div>
                          <label className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-3 block">Bathrooms</label>
                          <div className="flex gap-2">
                            {['1', '2', '3+'].map(num => (
                              <button key={num} className="w-10 h-10 rounded-lg border border-gray-200 text-sm font-medium hover:border-accent hover:text-accent transition-colors">
                                {num}
                              </button>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Amenities Checklist */}
                    <div>
                      <label className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-4 block">Amenities</label>
                      <div className="grid grid-cols-2 gap-y-3 gap-x-4">
                        {amenities.map((amenity, i) => (
                          <label key={i} className="flex items-center gap-3 cursor-pointer group">
                            <input type="checkbox" className="w-5 h-5 rounded border-gray-300 text-accent focus:ring-accent accent-accent transition-all cursor-pointer" />
                            <span className="text-sm text-gray-600 group-hover:text-primary transition-colors">{amenity}</span>
                          </label>
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-24 bg-surface max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-serif font-bold text-primary mb-4">Our Services</h2>
          <p className="text-gray-500 max-w-xl mx-auto text-lg pt-2">Comprehensive real estate solutions designed for buyers, sellers, and investors.</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {[
            { icon: <Home />, title: 'Buy Residential Properties', desc: 'Find your perfect home with our verified listings.' },
            { icon: <Key />, title: 'Rental Assistance', desc: 'Seamless rental process for landlords and tenants.' },
            { icon: <MapPin />, title: 'Site Visits & Tours', desc: 'Complimentary virtual and physical site visits.' },
            { icon: <CheckCircle />, title: 'Investment Consulting', desc: 'Data-driven insights for high-ROI properties.' },
          ].map((s, i) => (
            <div key={i} className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
              <div className="w-14 h-14 bg-accent/5 text-accent rounded-xl flex items-center justify-center mb-6">
                {s.icon}
              </div>
              <h3 className="text-xl font-serif font-bold mb-3">{s.title}</h3>
              <p className="text-gray-500 leading-relaxed text-sm">{s.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Featured Properties */}
      <section id="properties" className="py-24 bg-gray-50 line-bg">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
            <div>
              <span className="text-accent font-bold text-sm tracking-wider uppercase mb-2 block">Premium Selection</span>
              <h2 className="text-4xl font-serif font-bold text-primary">Featured Properties in Mumbai</h2>
            </div>
            <button onClick={() => window.dispatchEvent(new CustomEvent('open-chatbot'))} className="text-primary font-bold flex items-center gap-2 hover:text-accent transition-colors">
              View All Listings <ArrowRight size={20} />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {PROPERTIES.map((prop) => (
              <div key={prop.id} className="bg-white rounded-2xl overflow-hidden shadow-[0_8px_30px_rgba(0,0,0,0.04)] border border-gray-100 group hover:shadow-[0_8px_30px_rgba(0,0,0,0.08)] transition-all">
                <div className="relative h-64 overflow-hidden">
                  <div className="absolute top-4 left-4 z-10 bg-white/90 backdrop-blur-md px-3 py-1 rounded-md text-[10px] font-bold tracking-wider uppercase text-primary">
                    {prop.tag}
                  </div>
                  <img 
                    src={prop.image} 
                    alt={prop.title} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-[cubic-bezier(0.25,1,0.5,1)]"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold font-serif text-primary mb-2 truncate">{prop.title}</h3>
                  <p className="text-gray-500 text-sm flex items-center gap-1.5 mb-6"><MapPin size={16} /> {prop.location}</p>
                  
                  <div className="grid grid-cols-3 gap-4 border-t border-gray-100 pt-6 mb-6">
                    <div className="flex items-center gap-2 text-gray-600">
                      <Bed size={18} className="text-gray-400" />
                      <span className="font-semibold text-sm">{prop.beds}</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-600">
                      <Bath size={18} className="text-gray-400" />
                      <span className="font-semibold text-sm">{prop.baths}</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-600">
                      <Square size={18} className="text-gray-400" />
                      <span className="font-semibold text-sm">{prop.sqft} sq.ft</span>
                    </div>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <div className="text-2xl font-serif font-bold text-primary">{prop.price}</div>
                    <button onClick={() => window.dispatchEvent(new CustomEvent('open-chatbot'))} className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white group-hover:border-primary transition-all">
                      <ChevronRight size={20} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* WhatsApp / Lead Capture Spotlight */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="bg-primary rounded-[2rem] overflow-hidden flex flex-col lg:flex-row relative shadow-2xl">
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-10 background-grid" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '24px 24px' }}></div>
            
            <div className="lg:w-1/2 p-12 lg:p-20 relative z-10 flex flex-col justify-center text-white">
              <span className="inline-block py-1 px-3 rounded-full bg-white/10 text-white font-bold text-xs tracking-wider uppercase mb-6 sm:self-start border border-white/20">
                Smart Property Assistant
              </span>
              <h2 className="text-4xl lg:text-5xl font-serif font-bold mb-6 leading-tight">
                Stop losing out on good properties.
              </h2>
              <p className="text-gray-400 text-lg mb-10 max-w-md leading-relaxed">
                Get instant replies, automated property suggestions, and schedule site visits directly on WhatsApp within seconds.
              </p>
              
              <ul className="space-y-4 mb-10">
                {[
                  'Instant property suggestions',
                  'Auto-reply to buyer inquiries',
                  'Schedule site visits automatically',
                  'Verified market data'
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-3 text-gray-300">
                    <CheckCircle size={20} className="text-[#25D366]" /> {item}
                  </li>
                ))}
              </ul>
              
              <button onClick={() => window.open('https://api.whatsapp.com/send?phone=919876543210&text=I%20want%20to%20get%20listings', '_blank')} className="bg-[#25D366] text-white px-8 py-4 rounded-xl font-bold flex items-center justify-center gap-3 hover:bg-[#20bd5a] transition-all sm:self-start shadow-[0_0_20px_rgba(37,211,102,0.3)]">
                <MessageCircle size={24} /> Get Listings on WhatsApp
              </button>
            </div>
            
            <div className="lg:w-1/2 relative min-h-[400px]">
              <img 
                src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1000&q=80" 
                alt="Luxury Property interior" 
                className="absolute inset-0 w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-primary to-transparent lg:w-32"></div>
              
              {/* Floating UI Element */}
              <div className="absolute right-8 bottom-8 lg:right-12 lg:bottom-12 bg-white/95 backdrop-blur-md p-6 rounded-2xl shadow-2xl max-w-xs border border-white/20 hidden md:block">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 bg-[#25D366] rounded-full flex items-center justify-center text-white shadow-lg"><Bot size={24} /></div>
                  <div>
                    <div className="font-bold text-primary">UrbanNest Bot</div>
                    <div className="text-xs text-gray-500">Active now</div>
                  </div>
                </div>
                <div className="bg-gray-50 p-3 rounded-lg text-sm text-gray-700 border border-gray-100">
                  "I found 3 properties matching your criteria in Bandra. Sending details now..."
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Reviews & FAQs */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Reviews */}
          <div>
            <h2 className="text-3xl font-serif font-bold text-primary mb-10">Client Reviews</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {REVIEWS.map((review, i) => (
                <div key={i} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                  <div className="flex text-[#FFB800] mb-4">
                    {[1,2,3,4,5].map(s => <Star key={s} size={16} fill="currentColor" />)}
                  </div>
                  <p className="text-gray-600 mb-6 italic text-sm leading-relaxed">"{review.text}"</p>
                  <p className="font-bold text-primary text-sm">— {review.author}</p>
                </div>
              ))}
            </div>
          </div>

          {/* FAQs */}
          <div>
            <h2 className="text-3xl font-serif font-bold text-primary mb-10">Frequently Asked Questions</h2>
            <div className="space-y-4">
              {FAQS.map((faq, i) => (
                <div key={i} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                  <h4 className="font-bold text-primary mb-2 text-lg">{faq.q}</h4>
                  <p className="text-gray-500 text-sm leading-relaxed">{faq.a}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-primary text-white py-16">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          <div>
            <div className="text-2xl font-serif font-bold tracking-tight mb-6">UrbanNest<span className="text-accent">.</span></div>
            <p className="text-gray-400 text-sm leading-relaxed mb-6">Providing verified listings, transparent deals, and fast responses for Mumbai's finest real estate.</p>
          </div>
          
          <div>
            <h4 className="font-bold mb-6 text-sm uppercase tracking-wider text-gray-300">Quick Links</h4>
            <ul className="space-y-3 text-gray-400 text-sm">
              <li><a href="#properties" className="hover:text-white transition-colors">Buy Property</a></li>
              <li><a href="#services" className="hover:text-white transition-colors">Sell Property</a></li>
              <li><a href="#properties" className="hover:text-white transition-colors">Rentals</a></li>
              <li><a href="#services" className="hover:text-white transition-colors">Invest</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold mb-6 text-sm uppercase tracking-wider text-gray-300">Contact Us</h4>
            <ul className="space-y-3 text-gray-400 text-sm">
              <li>Phone: +91 91234 56789</li>
              <li>Email: contact@urbanestrealty.com</li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold mb-6 text-sm uppercase tracking-wider text-gray-300">Office</h4>
            <p className="text-gray-400 text-sm leading-relaxed">
              Office No. 12, Link Road<br />
              Andheri West, Mumbai,<br />
              Maharashtra, India
            </p>
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-6 mt-16 pt-8 border-t border-white/10 text-center text-gray-500 text-sm">
          © 2026 UrbanNest Realty. All rights reserved. Demo created per instructions.
        </div>
      </footer>

      {/* Bottom Right Chatbot Floating Widget */}
      <ChatbotWidget />
    </div>
  );
}
