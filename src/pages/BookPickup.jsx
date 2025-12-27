import React, { useState, useEffect } from 'react';
import { useLocation,useNavigate } from 'react-router-dom';
import { Calendar, Clock, Upload, MapPin, Phone, Mail, User, Weight, CheckCircle, Send, Sparkles, ArrowRight, Truck } from 'lucide-react';


const BookPickup = () => {
  const location = useLocation();
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    address: '',
    weight: '',
    scrapType: '',
    date: '',
    time: '',
    notes: ''
  });

  useEffect(() => {
    if (location.state && location.state.scrapType) {
      setFormData(prev => ({ ...prev, scrapType: location.state.scrapType }));
    }
  }, [location]);

  const [selectedFile, setSelectedFile] = useState(null);

  const scrapTypes = [
    { id: 'wood', label: 'Wood/Paper', icon: '🪵', desc: 'Furniture, logs, newspapers' },
    { id: 'plastic', label: 'Plastic', icon: '🥤', desc: 'Bottles, containers' },
    { id: 'metal', label: 'Metal', icon: '🔩', desc: 'Iron, aluminum, copper' },
    { id: 'mixed', label: 'E-Waste/Mixed', icon: '🗑️', desc: 'Electronics, combination' }
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form Submitted:', { ...formData, selectedFile });
    alert("Pickup scheduled successfully! (Demo)");
  };

  return (
    <div className="relative min-h-screen bg-[#F9FAFB] overflow-hidden">

      {/* Background Blobs (Subtler for Uniformity) */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-40">
        <div className="absolute top-0 left-0 w-125 h-125 bg-[#66BB6A]/20 rounded-full blur-[100px] animate-blob"></div>
        <div className="absolute top-1/2 right-0 w-125 h-125 bg-[#81C784]/20 rounded-full blur-[100px] animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-0 left-1/4 w-125 h-125 bg-[#A1887F]/10 rounded-full blur-[100px] animate-blob animation-delay-4000"></div>
      </div>

      {/* Header Section (Matching Contact.jsx) */}
      <section className="pt-32 pb-16 bg-linear-to-b from-white to-[#E8F5E9]/50 relative z-10">
        <div className="max-w-7xl mx-auto px-4 text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white shadow-sm border border-gray-100 animate-fadeIn mx-auto">
            <Truck className="text-[#66BB6A]" size={18} />
            <span className="text-sm font-semibold text-[#5D4037]">DOORSTEP COLLECTION</span>
          </div>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#5D4037] tracking-tight animate-fadeIn animation-delay-200">
            Schedule Your <span className="text-[#66BB6A]">Pickup</span>
          </h1>

          <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed animate-fadeIn animation-delay-400">
            Experience the most seamless scrap collection service. Fast, reliable, and eco-friendly.
          </p>
        </div>
      </section>

      <div className="relative z-10 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto -mt-8 pb-20">
        <div className="grid lg:grid-cols-12 gap-8 items-start">

          {/* Main Form Container (Uniform: Solid White, Rounded-3xl, Shadow-xl) */}
          <div className="lg:col-span-8 bg-white rounded-3xl shadow-xl border border-gray-100 p-8 md:p-12 animate-fadeInUp">
            <form onSubmit={handleSubmit} className="space-y-10">

              {/* Section 1: Personal Details */}
              <div className="space-y-6">
                <h3 className="text-2xl font-bold text-[#5D4037] flex items-center gap-3 pb-2 border-b border-gray-100">
                  <span className="w-8 h-8 rounded-full bg-[#66BB6A] text-white flex items-center justify-center text-sm font-bold shadow-md">1</span>
                  Contact Details
                </h3>

                <div className="grid md:grid-cols-2 gap-6">
                  {['name', 'phone', 'email', 'weight'].map((field) => (
                    <div key={field} className="space-y-2">
                      <label className="text-sm font-semibold text-[#5D4037] ml-1 capitalize">
                        {field === 'weight' ? (<span>Est. Weight (kg) <span className="text-gray-400 font-normal">(Optional)</span></span>) : field === 'name' ? 'Full Name' : field === 'phone' ? 'Phone Number' : 'Email Address'}
                      </label>
                      <input
                        type={field === 'email' ? 'email' : field === 'weight' ? 'number' : field === 'phone' ? 'tel' : 'text'}
                        name={field}
                        value={formData[field]}
                        onChange={handleInputChange}
                        placeholder={`Enter your ${field}`}
                        className="w-full px-5 py-3 rounded-xl bg-gray-50 border border-gray-200 focus:bg-white focus:border-[#66BB6A] focus:ring-4 focus:ring-[#66BB6A]/10 outline-none transition-all duration-300 font-medium text-[#5D4037] placeholder-gray-400"
                        required={field !== 'weight'}
                      />
                    </div>
                  ))}

                  <div className="md:col-span-2 space-y-2">
                    <label className="text-sm font-semibold text-[#5D4037] ml-1">Pickup Address</label>
                    <textarea
                      name="address"
                      value={formData.address}
                      onChange={handleInputChange}
                      placeholder="Enter full address including text landmark..."
                      rows="3"
                      className="w-full px-5 py-3 rounded-xl bg-gray-50 border border-gray-200 focus:bg-white focus:border-[#66BB6A] focus:ring-4 focus:ring-[#66BB6A]/10 outline-none transition-all duration-300 font-medium text-[#5D4037] placeholder-gray-400 resize-none"
                      required
                    />
                  </div>
                </div>
              </div>

              {/* Section 2: Scrap Type */}
              <div className="space-y-6">
                <h3 className="text-2xl font-bold text-[#5D4037] flex items-center gap-3 pb-2 border-b border-gray-100">
                  <span className="w-8 h-8 rounded-full bg-[#66BB6A] text-white flex items-center justify-center text-sm font-bold shadow-md">2</span>
                  Scrap Category
                </h3>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {scrapTypes.map((type) => (
                    <div
                      key={type.id}
                      onClick={() => setFormData(prev => ({ ...prev, scrapType: type.id }))}
                      className={`relative overflow-hidden cursor-pointer rounded-2xl p-4 transition-all duration-300 border-2 ${formData.scrapType === type.id
                        ? 'border-[#66BB6A] bg-[#E8F5E9] shadow-md transform scale-[1.02]'
                        : 'border-transparent bg-gray-50 hover:bg-white hover:shadow-lg hover:border-gray-100'
                        }`}
                    >
                      <div className="text-center space-y-2 relative z-10">
                        <span className="text-4xl filter drop-shadow-sm block mb-2">{type.icon}</span>
                        <p className={`font-bold text-sm md:text-base ${formData.scrapType === type.id ? 'text-[#66BB6A]' : 'text-[#5D4037]'}`}>
                          {type.label}
                        </p>
                      </div>
                      {/* Check Icon for Active State */}
                      {formData.scrapType === type.id && (
                        <div className="absolute top-2 right-2 text-[#66BB6A]">
                          <CheckCircle size={16} fill="currentColor" className="text-white" />
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Section 3: Schedule & Media */}
              <div className="space-y-6">
                <h3 className="text-2xl font-bold text-[#5D4037] flex items-center gap-3 pb-2 border-b border-gray-100">
                  <span className="w-8 h-8 rounded-full bg-[#66BB6A] text-white flex items-center justify-center text-sm font-bold shadow-md">3</span>
                  Schedule & Photo
                </h3>

                <div className="grid md:grid-cols-2 gap-8">
                  {/* Date & Time */}
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <label className="text-sm font-semibold text-[#5D4037] ml-1">Preferred Date</label>
                      <div className="relative">
                        <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                        <input
                          type="date"
                          name="date"
                          value={formData.date}
                          onChange={handleInputChange}
                          className="w-full pl-12 pr-5 py-3 rounded-xl bg-gray-50 border border-gray-200 focus:bg-white focus:border-[#66BB6A] focus:ring-4 focus:ring-[#66BB6A]/10 outline-none transition-all duration-300 text-[#5D4037] font-medium"
                          required
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-semibold text-[#5D4037] ml-1">Preferred Time</label>
                      <div className="relative">
                        <Clock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                        <select
                          name="time"
                          value={formData.time}
                          onChange={handleInputChange}
                          className="w-full pl-12 pr-5 py-3 rounded-xl bg-gray-50 border border-gray-200 focus:bg-white focus:border-[#66BB6A] focus:ring-4 focus:ring-[#66BB6A]/10 outline-none transition-all duration-300 text-[#5D4037] font-medium cursor-pointer appearance-none"
                          required
                        >
                          <option value="">Select Time Slot</option>
                          <option value="morning">Morning (9 AM - 12 PM)</option>
                          <option value="afternoon">Afternoon (12 PM - 4 PM)</option>
                          <option value="evening">Evening (4 PM - 7 PM)</option>
                        </select>
                      </div>
                    </div>
                  </div>

                  {/* Upload */}
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-[#5D4037] ml-1">Upload Photo (Optional)</label>
                    <div className="relative group h-34">
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleFileChange}
                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-20"
                      />
                      <div className="h-full border-2 border-dashed border-gray-300 rounded-xl bg-gray-50/50 flex flex-col items-center justify-center p-4 transition-all duration-300 group-hover:bg-[#E8F5E9] group-hover:border-[#66BB6A]">
                        <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-sm mb-2 text-gray-400 group-hover:text-[#66BB6A] group-hover:scale-110 transition-transform">
                          <Upload size={20} />
                        </div>
                        <p className="font-semibold text-[#5D4037] text-sm text-center">
                          {selectedFile ? selectedFile.name : "Click to upload image"}
                        </p>
                        <p className="text-xs text-gray-400 mt-1">Max 5MB (JPG, PNG)</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Button */}
              <div className="pt-4">
                <button
                  type="submit"
                  className="w-full py-4 bg-linear-to-r from-[#66BB6A] to-[#4CAF50] text-white rounded-xl font-bold text-lg shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex items-center justify-center gap-3"
                >
                  Confirm Booking
                  <ArrowRight size={20} />
                </button>
              </div>

            </form>
          </div>

          {/* Sidebar / Info Panel (Unique but Uniform Styling) */}
          <div className="lg:col-span-4 space-y-6 lg:sticky lg:top-32 animate-fadeInRight">
            {/* Trust Card */}
            <div className="bg-[#5D4037] text-white p-8 rounded-3xl shadow-xl relative overflow-hidden group">
              {/* Decorative Circle */}
              <div className="absolute -top-10 -right-10 w-40 h-40 bg-white/10 rounded-full blur-3xl group-hover:scale-150 transition-transform duration-700"></div>

              <h3 className="text-2xl font-bold mb-6 flex items-center gap-2">
                <Sparkles className="text-[#66BB6A]" />
                Why Kabad Becho?
              </h3>
              <ul className="space-y-5">
                {[
                  'Best Rates Guaranteed',
                  'Instant Cash Payment',
                  'Digital Weighing Scale',
                  'Verified Pickup Staff'
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-3 text-white/90 font-medium">
                    <div className="w-6 h-6 rounded-full bg-[#66BB6A]/20 flex items-center justify-center">
                      <CheckCircle size={14} className="text-[#66BB6A]" />
                    </div>
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            {/* Support Card */}
            <div className="bg-white p-8 rounded-3xl shadow-lg border border-gray-100 text-center">
              <div className="w-14 h-14 bg-[#E8F5E9] rounded-full flex items-center justify-center mx-auto mb-4 text-[#66BB6A]">
                <Phone size={24} />
              </div>
              <h3 className="text-xl font-bold text-[#5D4037] mb-2">Need Assistance?</h3>
              <p className="text-gray-600 text-sm mb-4">Our support team is available from 9 AM to 8 PM to assist you.</p>
              <a href="tel:+919876543210" className="text-lg font-bold text-[#66BB6A] hover:underline">
                +91 98765 43210
              </a>
            </div>
          </div>

        </div>
      </div>

      <style>{`
        @keyframes blob {
          0% { transform: translate(0px, 0px) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
          100% { transform: translate(0px, 0px) scale(1); }
        }
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(40px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes fadeInRight {
          from { opacity: 0; transform: translateX(20px); }
          to { opacity: 1; transform: translateX(0); }
        }
        .animate-fadeIn { animation: fadeIn 0.8s ease-out forwards; }
        .animate-fadeInUp { animation: fadeInUp 0.8s ease-out forwards; }
        .animate-fadeInRight { animation: fadeInRight 0.8s ease-out forwards; }
        .animation-delay-200 { animation-delay: 0.2s; }
        .animation-delay-400 { animation-delay: 0.4s; }
      `}</style>
    </div>
  );
};

export default BookPickup;
