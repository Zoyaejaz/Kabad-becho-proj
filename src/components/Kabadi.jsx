import React, { useState } from 'react';
import { 
  Truck,
  MapPin,
  Phone,
  Navigation,
  Clock,
  CheckCircle,
  Package,
  DollarSign,
  User,
  Calendar,
  TrendingUp,
  Award,
  AlertCircle,
  X,
  Camera,
  Scale,
  MessageSquare,
  Star,
  LayoutDashboard,
  History,
  Settings,
  LogOut,
  ChevronRight
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const KabadBechoDriverDashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [selectedPickup, setSelectedPickup] = useState(null);
  const [filterStatus, setFilterStatus] = useState('pending');

  // Driver Stats
  const driverStats = {
    name: 'Amit Sharma',
    id: 'DRV001',
    todayPickups: 8,
    completedToday: 5,
    pendingToday: 3,
    totalEarnings: '₹2,450',
    rating: 4.8,
    totalTrips: 245,
    joinedDate: '12 Jan 2023',
    vehicleNo: 'MH 04 AB 1234',
    phone: '+91 98765 43210',
    email: 'amit.sharma@kabadi.com'
  };

  // Pickup assignments
  const pickups = [
    {
      id: 'KB123457',
      customer: 'Priya Sharma',
      phone: '+91 98765 43211',
      address: '456 Eco Avenue, Green Park, Mumbai, Maharashtra 400052',
      landmark: 'Near Green Park Metro Station',
      scrapType: 'Plastic Scrap',
      emoji: '♻️',
      estimatedWeight: '30 kg',
      scheduledTime: '01:00 PM - 03:00 PM',
      status: 'pending',
      distance: '2.5 km',
      expectedAmount: '₹300-450'
    },
    {
      id: 'KB123458',
      customer: 'Anjali Desai',
      phone: '+91 98765 43212',
      address: '789 Recycle Road, Clean City, Mumbai, Maharashtra 400053',
      landmark: 'Behind City Mall',
      scrapType: 'E-Waste',
      emoji: '📱',
      estimatedWeight: '15 kg',
      scheduledTime: '11:00 AM - 01:00 PM',
      status: 'pending',
      distance: '4.2 km',
      expectedAmount: '₹300-750'
    },
    {
      id: 'KB123459',
      customer: 'Suresh Mehta',
      phone: '+91 98765 43213',
      address: '321 Sustainable Street, Eco Zone, Mumbai, Maharashtra 400054',
      landmark: 'Next to Community Center',
      scrapType: 'Paper Scrap',
      emoji: '📄',
      estimatedWeight: '45 kg',
      scheduledTime: '03:00 PM - 05:00 PM',
      status: 'pending',
      distance: '6.8 km',
      expectedAmount: '₹450-810'
    },
    {
      id: 'KB123456',
      customer: 'Rajesh Kumar',
      phone: '+91 98765 43210',
      address: '123 Green Street, Eco City, Mumbai, Maharashtra 400051',
      landmark: 'Near Eco City Park',
      scrapType: 'Metal Scrap',
      emoji: '🔩',
      actualWeight: '45 kg',
      scheduledTime: '09:00 AM - 11:00 AM',
      status: 'completed',
      distance: '3.2 km',
      collectedAmount: '₹1,800',
      completedAt: '09:45 AM',
      date: 'Today'
    },
    {
      id: 'KB123455',
      customer: 'Vikram Singh',
      phone: '+91 98765 43209',
      address: '555 Green Valley, Eco Area, Mumbai, Maharashtra 400055',
      landmark: 'Opposite Green School',
      scrapType: 'Wood Scrap',
      emoji: '🪵',
      actualWeight: '60 kg',
      scheduledTime: '08:00 AM - 10:00 AM',
      status: 'completed',
      distance: '5.1 km',
      collectedAmount: '₹650',
      completedAt: '08:30 AM',
      date: 'Today'
    }
  ];

  const filteredPickups = pickups.filter(p => p.status === filterStatus);

  const navigate = useNavigate();

  const handleSignOut = () => {
    // 1. Add your sign-out logic here (e.g., clearing tokens, calling API)
    console.log("Signing out...");

    // 2. Redirect to the home page
    navigate('/');
  };

  

  const handleStartPickup = (pickup) => {
    alert(`Starting navigation to ${pickup.customer}'s location`);
  };

  const handleCompletePickup = (pickup) => {
    alert(`Pickup ${pickup.id} marked as completed`);
    setSelectedPickup(null);
  };

  // --- Sidebar Component ---
  const Sidebar = () => (
    <div className="w-64 bg-white shadow-xl h-screen sticky top-0 flex flex-col z-50 transition-all duration-300 hidden md:flex">
      <div className="p-6 border-b border-gray-100">
        <div className="flex items-center gap-3 text-[#4CAF50]">
          <Truck size={32} strokeWidth={2.5} />
          <span className="text-xl font-extrabold tracking-tight">KabadBecho</span>
        </div>
        <p className="text-xs text-gray-400 mt-1 ml-11">Partner Dashboard</p>
      </div>

      <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
        {[
          { id: 'overview', icon: LayoutDashboard, label: 'Overview' },
          { id: 'previous', icon: History, label: 'Previous Pickups' },
          { id: 'profile', icon: Settings, label: 'Profile Settings' },
        ].map((item) => (
          <button
            key={item.id}
            onClick={() => setActiveTab(item.id)}
            className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-300 group ${
              activeTab === item.id
                ? 'bg-gradient-to-r from-[#E8F5E9] to-[#F1F8E9] text-[#2E7D32]'
                : 'text-gray-600 hover:bg-gray-50 hover:text-[#2E7D32]'
            }`}
          >
            <item.icon 
              size={20} 
              className={`transition-colors duration-300 ${
                activeTab === item.id ? 'text-[#2E7D32]' : 'text-gray-400 group-hover:text-[#2E7D32]'
              }`} 
            />
            <span className={`font-semibold ${activeTab === item.id ? 'font-bold' : ''}`}>
              {item.label}
            </span>
            {activeTab === item.id && (
              <ChevronRight size={16} className="ml-auto text-[#2E7D32]" />
            )}
          </button>
        ))}
      </nav>

      <div className="p-4 border-t border-gray-100">
        <div className="bg-[#F1F8E9] rounded-xl p-4 flex items-center gap-3 mb-2">
          <div className="w-10 h-10 bg-[#C8E6C9] rounded-full flex items-center justify-center text-[#2E7D32] font-bold shadow-sm">
            {driverStats.name.charAt(0)}
          </div>
          <div className="flex-1 overflow-hidden">
            <h4 className="font-bold text-[#2E7D32] text-sm truncate">{driverStats.name}</h4>
            <p className="text-xs text-[#558B2F] truncate">ID: {driverStats.id}</p>
          </div>
        </div>
        <button 
         onClick={handleSignOut}
         className="w-full flex items-center justify-center space-x-2 px-4 py-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors text-sm font-semibold">
          <LogOut size={16} />
          <span>Sign Out</span>
        </button>
      </div>
    </div>
  );

  // --- Mobile Tab Bar for small screens (Optional but good for responsiveness) ---
  const MobileTabBar = () => (
    <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1)] z-50 flex justify-around p-2">
        {[
          { id: 'overview', icon: LayoutDashboard, label: 'Overview' },
          { id: 'previous', icon: History, label: 'History' },
          { id: 'profile', icon: Settings, label: 'Profile' },
        ].map((item) => (
          <button
            key={item.id}
            onClick={() => setActiveTab(item.id)}
            className={`flex flex-col items-center p-2 rounded-lg transition-colors ${
              activeTab === item.id ? 'text-[#2E7D32]' : 'text-gray-400'
            }`}
          >
            <item.icon size={24} />
            <span className="text-[10px] font-medium mt-1">{item.label}</span>
          </button>
        ))}
    </div>
  );

  // --- Views ---
  
  const Overview = () => (
    <div className="animate-fadeIn">
      {/* Header */}
      <section className="relative py-8 bg-gradient-to-br from-[#66BB6A] to-[#4CAF50] text-white overflow-hidden rounded-3xl mx-4 mb-6 shadow-lg mt-4">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 w-72 h-72 bg-white rounded-full blur-3xl animate-blob"></div>
          <div className="absolute bottom-10 right-10 w-96 h-96 bg-white rounded-full blur-3xl animate-blob animation-delay-2000"></div>
        </div>

        <div className="relative z-10 px-6 md:px-8">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div className="flex items-center space-x-4">
              <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm shadow-inner">
                <Truck size={32} />
              </div>
              <div>
                <div className="text-sm opacity-90">Welcome Back,</div>
                <h1 className="text-3xl font-bold">{driverStats.name}</h1>
                <div className="text-sm opacity-90">ID: {driverStats.id}</div>
              </div>
            </div>

            <div className="flex items-center space-x-3">
              <div className="bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full flex items-center space-x-2 shadow-sm">
                <Star className="text-yellow-300" size={18} fill="currentColor" />
                <span className="font-bold">{driverStats.rating}</span>
              </div>
              <div className="bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full shadow-sm">
                <span className="font-bold">{driverStats.totalTrips} Trips</span>
              </div>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
            {[
              { icon: <Package size={24} />, value: driverStats.todayPickups, label: "Today's Pickups" },
              { icon: <CheckCircle size={24} />, value: driverStats.completedToday, label: 'Completed' },
              { icon: <Clock size={24} />, value: driverStats.pendingToday, label: 'Pending' },
              { icon: <DollarSign size={24} />, value: driverStats.totalEarnings, label: "Today's Earnings" }
            ].map((stat, idx) => (
              <div key={idx} className="bg-white/20 backdrop-blur-sm p-4 rounded-xl border border-white/10 shadow-sm hover:bg-white/30 transition-colors">
                <div className="flex items-center space-x-2 mb-2">
                  {stat.icon}
                </div>
                <div className="text-2xl font-bold">{stat.value}</div>
                <div className="text-sm opacity-90">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Filter Tabs */}
      <section className="px-4 mb-6 overflow-x-auto">
        <div className="flex gap-3 bg-white p-2 rounded-2xl shadow-sm inline-flex min-w-max">
          {[
            { id: 'pending', label: 'Pending', count: pickups.filter(p => p.status === 'pending').length },
            { id: 'completed', label: 'Overview', count: pickups.filter(p => p.status === 'completed').length }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setFilterStatus(tab.id)}
              className={`px-6 py-2.5 rounded-xl font-semibold transition-all duration-300 flex items-center space-x-2 ${
                filterStatus === tab.id
                  ? 'bg-gradient-to-r from-[#66BB6A] to-[#4CAF50] text-white shadow-md'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              <span>{tab.label === 'Overview' ? 'Completed' : tab.label}</span>
              <span className={`px-2 py-0.5 rounded-full text-xs ${
                filterStatus === tab.id ? 'bg-white/30 text-white' : 'bg-gray-200 text-gray-600'
              }`}>
                {tab.count}
              </span>
            </button>
          ))}
        </div>
      </section>

      {/* Pickups List */}
      <section className="px-4 pb-24 md:pb-8">
        {filteredPickups.length === 0 ? (
          <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-12 text-center">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-[#E8F5E9] rounded-full mb-4">
              <Package className="text-[#66BB6A]" size={40} />
            </div>
            <h3 className="text-2xl font-bold text-[#5D4037] mb-2">No Pickups Found</h3>
            <p className="text-gray-600">You're all caught up!</p>
          </div>
        ) : (
          <div className="space-y-6">
            {filteredPickups.map((pickup) => (
              <div
                key={pickup.id}
                className="bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100 hover:border-[#66BB6A]/50"
              >
                <div className="p-6">
                  <div className="flex flex-col lg:flex-row gap-6">
                    {/* Left Section */}
                    <div className="flex-1 space-y-4">
                      {/* Header */}
                      <div className="flex items-start justify-between">
                        <div className="flex items-center space-x-3">
                          <div className="text-4xl filter drop-shadow-sm">{pickup.emoji}</div>
                          <div>
                            <div className="flex items-center space-x-2">
                              <h3 className="text-xl font-bold text-[#5D4037]">{pickup.id}</h3>
                              
                              
                            </div>
                            <p className="text-gray-600 font-medium">{pickup.scrapType}</p>
                          </div>
                        </div>
                        {pickup.status === 'completed' && (
                          <div className="flex items-center space-x-2 bg-green-50 text-green-700 px-3 py-1.5 rounded-full border border-green-100">
                            <CheckCircle size={16} />
                            <span className="font-semibold text-sm">Completed</span>
                          </div>
                        )}
                      </div>

                      {/* Customer Info */}
                      <div className="bg-[#F8FAF8] p-4 rounded-xl border border-gray-100 hover:border-[#66BB6A]/30 transition-colors">
                        <div className="flex items-center space-x-3 mb-3">
                          <div className="w-10 h-10 bg-gradient-to-br from-[#66BB6A] to-[#4CAF50] rounded-full flex items-center justify-center text-white font-bold shadow-md">
                            {pickup.customer.charAt(0)}
                          </div>
                          <div className="flex-1">
                            <div className="font-bold text-[#5D4037]">{pickup.customer}</div>
                            <div className="flex items-center space-x-2 text-sm text-gray-600">
                              <Phone size={14} />
                              <span>{pickup.phone}</span>
                            </div>
                          </div>
                          <a
                            href={`tel:${pickup.phone}`}
                            className="p-2 bg-white border border-gray-200 rounded-lg hover:bg-[#66BB6A] hover:text-white hover:border-[#66BB6A] transition-all duration-300 shadow-sm"
                          >
                            <Phone size={18} />
                          </a>
                        </div>
                        
                        <div className="flex items-start space-x-2 text-sm text-gray-700">
                          <MapPin className="flex-shrink-0 mt-0.5 text-[#66BB6A]" size={16} />
                          <div>
                            <p className="font-medium">{pickup.address}</p>
                            <p className="text-gray-500 mt-1 text-xs">Landmark: {pickup.landmark}</p>
                          </div>
                        </div>
                      </div>

                      {/* Details Grid */}
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                        <div className="bg-gray-50 p-3 rounded-xl border border-gray-100">
                          <div className="text-xs text-gray-500 mb-1 flex items-center gap-1"><Clock size={12}/> Time Slot</div>
                          <div className="font-semibold text-sm text-[#5D4037]">{pickup.scheduledTime}</div>
                        </div>
                        <div className="bg-gray-50 p-3 rounded-xl border border-gray-100">
                          <div className="text-xs text-gray-500 mb-1 flex items-center gap-1"><Navigation size={12}/> Distance</div>
                          <div className="font-semibold text-sm text-[#5D4037]">{pickup.distance}</div>
                        </div>
                        <div className="bg-gray-50 p-3 rounded-xl border border-gray-100">
                          <div className="text-xs text-gray-500 mb-1 flex items-center gap-1"><Scale size={12}/> Weight</div>
                          <div className="font-semibold text-sm text-[#5D4037]">
                            {pickup.status === 'completed' ? pickup.actualWeight : pickup.estimatedWeight}
                          </div>
                        </div>
                        <div className="bg-gray-50 p-3 rounded-xl border border-gray-100">
                          <div className="text-xs text-gray-500 mb-1 flex items-center gap-1"><DollarSign size={12}/> Amount</div>
                          <div className="font-semibold text-sm text-[#66BB6A]">
                            {pickup.status === 'completed' ? pickup.collectedAmount : pickup.expectedAmount}
                          </div>
                        </div>
                      </div>

                      {pickup.status === 'completed' && (
                        <div className="bg-green-50/50 p-3 rounded-lg border border-green-200 flex items-center gap-2 text-green-800">
                          <Clock size={16} />
                          <div className="text-sm">
                            <strong>Completed at:</strong> {pickup.completedAt}
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Right Section - Actions */}
                    <div className="lg:w-48 flex flex-col gap-3 justify-center">
                      {pickup.status === 'pending' ? (
                        <>
                          <button
                            onClick={() => handleStartPickup(pickup)}
                            className="flex items-center justify-center space-x-2 px-4 py-3 bg-gradient-to-r from-[#66BB6A] to-[#4CAF50] text-white font-semibold rounded-xl hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1"
                          >
                            <Navigation size={18} />
                            <span>Navigate</span>
                          </button>
                          <button
                            onClick={() => setSelectedPickup(pickup)}
                            className="flex items-center justify-center space-x-2 px-4 py-3 bg-white border-2 border-[#66BB6A] text-[#66BB6A] font-semibold rounded-xl hover:bg-[#E8F5E9] transition-all duration-300"
                          >
                            <CheckCircle size={18} />
                            <span>Complete</span>
                          </button>
                        </>
                      ) : (
                        <div className="h-full flex flex-col items-center justify-center bg-green-50 rounded-xl p-4 border border-green-100">
                           <div className="w-12 h-12 bg-green-100 text-green-600 rounded-full flex items-center justify-center mb-2">
                              <Award size={24} />
                           </div>
                           <div className="text-sm font-bold text-green-800">Trip Completed</div>
                           <div className="text-xs text-green-600 mt-1">{pickup.date}</div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );

  const PreviousPickups = () => {
    const historyPickups = pickups.filter(p => p.status === 'completed');
    
    return (
      <div className="p-8 animate-fadeIn pb-24 md:pb-8">
        <div className="flex items-center justify-between mb-8">
           <div>
             <h2 className="text-2xl font-bold text-[#5D4037]">Previous Pickups</h2>
             <p className="text-gray-500 mt-1">History of all your completed trips</p>
           </div>
           <div className="bg-white p-2 rounded-xl border border-gray-200 shadow-sm">
              <Calendar className="text-gray-500" size={20} />
           </div>
        </div>

        <div className="grid gap-6">
          {historyPickups.map((pickup, idx) => (
             <div key={idx} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col md:flex-row items-center gap-6 hover:shadow-md transition-shadow">
                <div className="w-16 h-16 bg-[#E8F5E9] rounded-2xl flex items-center justify-center text-3xl">
                   {pickup.emoji}
                </div>
                <div className="flex-1 text-center md:text-left">
                   <h3 className="text-lg font-bold text-[#5D4037]">{pickup.scrapType} Pickup</h3>
                   <p className="text-gray-500 text-sm">{pickup.address}</p>
                   <div className="flex items-center justify-center md:justify-start gap-4 mt-2 text-sm text-gray-600">
                      <span className="flex items-center gap-1"><Calendar size={14}/> {pickup.date || 'Oct 24, 2023'}</span>
                      <span className="flex items-center gap-1"><Clock size={14}/> {pickup.completedAt}</span>
                   </div>
                </div>
                <div className="text-center md:text-right">
                   <div className="text-2xl font-bold text-[#66BB6A]">{pickup.collectedAmount}</div>
                   <div className="text-sm text-gray-500">Earned</div>
                   <div className="mt-2 text-xs font-semibold bg-green-100 text-green-700 px-3 py-1 rounded-full inline-block">
                     Completed
                   </div>
                </div>
             </div>
          ))}
          {/* Mock history items if list is short */}
          {[1, 2, 3].map((_, i) => (
             <div key={`mock-${i}`} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col md:flex-row items-center gap-6 opacity-60 hover:opacity-100 transition-opacity">
                <div className="w-16 h-16 bg-gray-100 rounded-2xl flex items-center justify-center text-3xl grayscale">
                   📦
                </div>
                <div className="flex-1 text-center md:text-left">
                   <h3 className="text-lg font-bold text-gray-400">Old Newspaper Pickup</h3>
                   <p className="text-gray-400 text-sm">Sector 45, Gurgaon (Archived)</p>
                   <div className="flex items-center justify-center md:justify-start gap-4 mt-2 text-sm text-gray-400">
                      <span className="flex items-center gap-1"><Calendar size={14}/> Sep {20 - i}, 2023</span>
                   </div>
                </div>
                <div className="text-center md:text-right">
                   <div className="text-2xl font-bold text-gray-400">₹ 450</div>
                   <div className="text-sm text-gray-400">Earned</div>
                </div>
             </div>
          ))}
        </div>
      </div>
    );
  };

  const ProfileSettings = () => (
    <div className="p-8 max-w-4xl mx-auto animate-fadeIn pb-24 md:pb-8">
      <h2 className="text-2xl font-bold text-[#5D4037] mb-6">Profile Settings</h2>
      
      <div className="bg-white rounded-3xl shadow-lg border border-gray-100 overflow-hidden">
         {/* Cover & Profile Pic */}
         <div className="h-32 bg-gradient-to-r from-[#66BB6A] to-[#4CAF50]"></div>
         <div className="px-8 pb-8 relative">
            <div className="absolute -top-16 left-8">
               <div className="w-32 h-32 bg-white rounded-full p-2 shadow-lg">
                  <div className="w-full h-full bg-[#E8F5E9] rounded-full flex items-center justify-center text-4xl font-bold text-[#2E7D32] border-4 border-white">
                     {driverStats.name.charAt(0)}
                  </div>
                  <div className="absolute bottom-2 right-2 bg-white p-2 rounded-full shadow-md cursor-pointer hover:bg-gray-50 transition-colors">
                     <Camera size={16} className="text-gray-600"/>
                  </div>
               </div>
            </div>
            
            <div className="ml-40 pt-4 flex justify-between items-start flex-wrap gap-4">
               <div>
                  <h3 className="text-2xl font-bold text-[#5D4037]">{driverStats.name}</h3>
                  <p className="text-gray-500">{driverStats.id} • Joined {driverStats.joinedDate}</p>
               </div>
               <button className="px-6 py-2 bg-[#2E7D32] text-white rounded-xl font-semibold hover:bg-[#1B5E20] transition-colors shadow-md">
                  Save Changes
               </button>
            </div>

            {/* Form Fields */}
            <div className="mt-12 grid md:grid-cols-2 gap-8">
               <div className="space-y-4">
                  <h4 className="font-bold text-gray-900 border-b pb-2">Personal Information</h4>
                  <div>
                     <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                     <input type="text" defaultValue={driverStats.name} className="w-full px-4 py-2 rounded-xl border border-gray-200 focus:outline-none focus:border-[#4CAF50] focus:ring-1 focus:ring-[#4CAF50]" />
                  </div>
                  <div>
                     <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                     <input type="email" defaultValue={driverStats.email} className="w-full px-4 py-2 rounded-xl border border-gray-200 focus:outline-none focus:border-[#4CAF50] focus:ring-1 focus:ring-[#4CAF50]" />
                  </div>
                  <div>
                     <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                     <input type="tel" defaultValue={driverStats.phone} className="w-full px-4 py-2 rounded-xl border border-gray-200 focus:outline-none focus:border-[#4CAF50] focus:ring-1 focus:ring-[#4CAF50]" />
                  </div>
               </div>
               
               <div className="space-y-4">
                  <h4 className="font-bold text-gray-900 border-b pb-2">Vehicle Details</h4>
                  <div>
                     <label className="block text-sm font-medium text-gray-700 mb-1">Vehicle Type</label>
                     <select className="w-full px-4 py-2 rounded-xl border border-gray-200 focus:outline-none focus:border-[#4CAF50] focus:ring-1 focus:ring-[#4CAF50]">
                        <option>Mini Tempo (Tata Ace)</option>
                        <option>Pickup Truck</option>
                        <option>Three Wheeler</option>
                     </select>
                  </div>
                  <div>
                     <label className="block text-sm font-medium text-gray-700 mb-1">Vehicle Number</label>
                     <input type="text" defaultValue={driverStats.vehicleNo} className="w-full px-4 py-2 rounded-xl border border-gray-200 focus:outline-none focus:border-[#4CAF50] focus:ring-1 focus:ring-[#4CAF50]" />
                  </div>
                  <div>
                     <label className="block text-sm font-medium text-gray-700 mb-1">License Number</label>
                     <input type="text" defaultValue="DL-1234567890123" className="w-full px-4 py-2 rounded-xl border border-gray-200 focus:outline-none focus:border-[#4CAF50] focus:ring-1 focus:ring-[#4CAF50]" />
                  </div>
               </div>
            </div>

            
         </div>
      </div>
    </div>
  );

  return (
    <div className="flex min-h-screen bg-[#F8FAF9]">
      <Sidebar />
      <main className="flex-1 overflow-x-hidden overflow-y-auto h-screen">
        {activeTab === 'overview' && <Overview />}
        {activeTab === 'previous' && <PreviousPickups />}
        {activeTab === 'profile' && <ProfileSettings />}
      </main>
      <MobileTabBar />

      {/* Complete Pickup Modal */}
      {selectedPickup && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fadeIn">
          <div className="bg-white rounded-3xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="bg-gradient-to-r from-[#66BB6A] to-[#4CAF50] p-6 text-white relative">
              <button
                onClick={() => setSelectedPickup(null)}
                className="absolute top-4 right-4 w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white/30 transition-colors duration-300"
              >
                <X size={20} />
              </button>
              <h2 className="text-2xl font-bold mb-2">Complete Pickup</h2>
              <p className="text-green-50">Booking ID: {selectedPickup.id}</p>
            </div>

            <div className="p-6 space-y-6">
              {/* Weight Input */}
              <div>
                <label className="block text-sm font-semibold text-[#5D4037] mb-2">
                  Actual Weight (kg) *
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <Scale className="text-gray-400" size={20} />
                  </div>
                  <input
                    type="number"
                    placeholder="Enter weight in kg"
                    className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-[#66BB6A] transition-all duration-300"
                  />
                </div>
              </div>

              {/* Amount Input */}
              <div>
                <label className="block text-sm font-semibold text-[#5D4037] mb-2">
                  Collection Amount (₹) *
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <DollarSign className="text-gray-400" size={20} />
                  </div>
                  <input
                    type="number"
                    placeholder="Enter amount"
                    className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-[#66BB6A] transition-all duration-300"
                  />
                </div>
              </div>

              {/* Photo Upload */}
              <div>
                <label className="block text-sm font-semibold text-[#5D4037] mb-2">
                  Upload Photos *
                </label>
                <div className="border-2 border-dashed border-gray-300 rounded-xl p-6 text-center hover:border-[#66BB6A] transition-colors duration-300">
                  <Camera className="mx-auto text-gray-400 mb-2" size={32} />
                  <p className="text-gray-600 text-sm">Click to upload scrap photos</p>
                </div>
              </div>

              {/* Notes */}
              <div>
                <label className="block text-sm font-semibold text-[#5D4037] mb-2">
                  Notes (Optional)
                </label>
                <textarea
                  placeholder="Any additional notes"
                  rows="3"
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-[#66BB6A] transition-all duration-300 resize-none"
                />
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3">
                <button
                  onClick={() => setSelectedPickup(null)}
                  className="flex-1 px-6 py-3 bg-gray-100 text-gray-700 font-semibold rounded-xl hover:bg-gray-200 transition-all duration-300"
                >
                  Cancel
                </button>
                <button
                  onClick={() => handleCompletePickup(selectedPickup)}
                  className="flex-1 px-6 py-3 bg-gradient-to-r from-[#66BB6A] to-[#4CAF50] text-white font-semibold rounded-xl hover:shadow-lg transition-all duration-300"
                >
                  Complete Pickup
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes blob {
          0%, 100% { transform: translate(0, 0) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
        }
        .animate-fadeIn { animation: fadeIn 0.3s ease-out forwards; }
        .animate-blob { animation: blob 7s ease-in-out infinite; }
        .animation-delay-2000 { animation-delay: 2s; }
      `}</style>
    </div>
  );
};

export default KabadBechoDriverDashboard;