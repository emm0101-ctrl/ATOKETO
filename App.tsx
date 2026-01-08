import React, { useState } from 'react';
import { INITIAL_CONTENT, SiteContent, StoreLocation, SectionKey } from './types';
import { Navigation } from './components/Navigation';
import { AdminPanel } from './components/AdminPanel';
import { HeroCarousel } from './components/HeroCarousel';
import { 
  Settings,
  ArrowRight,
  Quote,
  Star,
  MapPin,
  ChevronRight,
  Phone,
  CheckCircle2,
  DollarSign,
  UtensilsCrossed,
  Instagram,
  Facebook,
  Play
} from 'lucide-react';

function App() {
  const [content, setContent] = useState<SiteContent>(INITIAL_CONTENT);
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState<StoreLocation | null>(content.locations.list[0] || null);
  const [hoveredLocationId, setHoveredLocationId] = useState<number | null>(null);

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    location: ''
  });
  
  const [quickConsult, setQuickConsult] = useState('');
  const [agreePrivacy, setAgreePrivacy] = useState(false);

  const sendEmail = (subject: string, body: string) => {
      const mailtoLink = `mailto:onmusic1@naver.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
      window.location.href = mailtoLink;
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const body = `이름: ${formData.name}\n연락처: ${formData.phone}\n희망 지역: ${formData.location}\n\n아토키토 가맹 문의드립니다.`;
    sendEmail("아토키토 가맹 문의", body);
    setFormData({ name: '', phone: '', email: '', location: '' });
  };
  
  const handleQuickSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!agreePrivacy) {
        alert("개인정보 취급방침에 동의해주세요.");
        return;
    }
    if (!quickConsult.trim()) {
        alert("정보를 입력해주세요.");
        return;
    }
    const body = `간편 상담 신청\n\n내용: ${quickConsult}\n\n연락 부탁드립니다.`;
    sendEmail("아토키토 간편 상담 신청", body);
    setQuickConsult('');
  };

  // Helper to project lat/lng to % for South Korea Map
  const getMapPosition = (lat: number, lng: number) => {
      const minLat = 34.0;
      const maxLat = 38.0;
      const minLng = 126.0;
      const maxLng = 129.5;

      const top = ((maxLat - lat) / (maxLat - minLat)) * 100;
      const left = ((lng - minLng) / (maxLng - minLng)) * 100;
      
      return { 
          top: `${Math.max(5, Math.min(95, top))}%`, 
          left: `${Math.max(5, Math.min(95, left))}%` 
      };
  };

  const renderSection = (key: SectionKey) => {
      switch(key) {
          case 'hero': return (
            <section id="main" className="relative h-screen w-full overflow-hidden flex items-end pb-20 md:pb-32 px-4 md:px-16">
               <HeroCarousel images={content.hero.images} />
               
               {/* Sophisticated Gradient Overlay (Bottom Up) */}
               <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent pointer-events-none"></div>
               
               <div className="relative z-10 w-full max-w-[1400px] mx-auto text-left">
                  <div className="flex flex-col md:flex-row items-end justify-between gap-10">
                      
                      {/* Left: Title & Subtitle */}
                      <div className="max-w-4xl">
                        {/* Dynamic Reveal Title */}
                        <h1 className="text-6xl md:text-8xl lg:text-9xl font-black text-white leading-[0.9] tracking-tight mb-8">
                            {content.hero.title.split('\n').map((line, i) => (
                                <div key={i} className="reveal-text-container">
                                    <div 
                                        className="animate-reveal" 
                                        style={{ animationDelay: `${0.2 + (i * 0.15)}s` }}
                                    >
                                        {line}
                                    </div>
                                </div>
                            ))}
                        </h1>
                        
                        <p className="text-lg md:text-xl text-white/80 max-w-xl font-medium leading-relaxed animate-fade-in-up opacity-0" style={{ animationDelay: '0.8s' }}>
                            {content.hero.subtitle}
                        </p>
                      </div>

                      {/* Right: Actions */}
                      <div className="flex flex-row gap-4 animate-fade-in-up opacity-0" style={{ animationDelay: '1.0s' }}>
                          <a href="#menu" className="group flex items-center gap-3 bg-white text-brand-dark px-8 py-4 rounded-full font-bold text-sm uppercase tracking-widest hover:bg-brand-light transition-all">
                              View Menu
                              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                          </a>
                          <a href="#franchise" className="group flex items-center justify-center w-14 h-14 rounded-full border border-white/30 text-white hover:bg-white hover:text-brand-dark transition-all backdrop-blur-sm">
                               <Play size={18} fill="currentColor" className="ml-0.5" />
                          </a>
                      </div>
                  </div>
               </div>
            </section>
          );
          case 'reviews': return (
            <section className="py-24 px-4 md:px-8 max-w-[1400px] mx-auto">
              <div className="text-center mb-20">
                 <div className="flex items-center justify-center gap-1 mb-4">
                   {[1,2,3,4,5].map(i => <Star key={i} className="fill-brand-main text-brand-main" size={20} />)}
                 </div>
                 <p className="text-brand-main font-bold text-base mb-2 tracking-widest uppercase">{content.reviews.subtitle}</p>
                 <h2 className="text-4xl md:text-5xl font-black text-brand-dark uppercase tracking-tight">{content.reviews.title}</h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                 {content.reviews.items.map((review) => (
                    <div key={review.id} className="bg-white p-8 rounded-[2rem] border border-gray-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col">
                       <div className="flex items-center gap-4 mb-6">
                          <div className="w-12 h-12 rounded-full bg-brand-light flex items-center justify-center font-bold text-brand-main text-lg">
                             {review.author[0]}
                          </div>
                          <div>
                             <p className="font-bold text-brand-dark text-lg">{review.author}</p>
                             <div className="flex text-brand-main mt-1">
                                {[...Array(review.rating)].map((_, i) => <Star key={i} size={12} fill="currentColor" />)}
                             </div>
                          </div>
                       </div>
                       <div className="relative mb-6 flex-grow">
                          <Quote className="text-brand-light absolute -top-3 -left-2" size={32} />
                          <p className="text-gray-700 leading-relaxed font-medium text-base relative z-10 pl-6">
                            "{review.content}"
                          </p>
                       </div>
                       <div className="mt-auto pt-5 border-t border-gray-50 flex items-center gap-4">
                          <img src={review.image} className="w-14 h-14 rounded-full object-cover shadow-sm" alt="Review food" />
                          <span className="text-xs font-bold text-brand-main bg-brand-light px-3 py-1 rounded-full">
                             {review.tag}
                          </span>
                       </div>
                    </div>
                 ))}
              </div>
            </section>
          );
          case 'benefits': return (
            <section className="py-24 px-4 md:px-8 bg-brand-main text-white relative overflow-hidden">
               <div className="max-w-[1400px] mx-auto relative z-10">
                  <div className="text-center mb-16">
                     <h2 className="text-5xl md:text-6xl font-black tracking-tight mb-4">{content.benefits.title}</h2>
                     <p className="text-white/70">성공적인 창업을 위한 아토키토의 약속</p>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                     {content.benefits.items.map((item, idx) => (
                        <div key={idx} className="bg-brand-dark/30 backdrop-blur-sm border border-white/10 p-8 rounded-[2rem] flex flex-col items-start hover:bg-white/5 transition-colors group">
                           <div className="flex items-center gap-4 mb-4">
                              {item.image ? (
                                  <div className="w-12 h-12 rounded-full bg-white p-2 flex items-center justify-center shrink-0">
                                      <img src={item.image} alt="" className="w-full h-full object-contain" />
                                  </div>
                              ) : (
                                  <span className="flex items-center justify-center w-10 h-10 rounded-full bg-white text-brand-main font-bold shrink-0">
                                     {idx + 1}
                                  </span>
                              )}
                              <h3 className="text-xl font-bold">{item.title}</h3>
                           </div>
                           <p className="text-white/60 font-medium leading-relaxed pl-14">{item.desc}</p>
                        </div>
                     ))}
                  </div>
               </div>
            </section>
          );
          case 'interior': return (
            <section className="py-24 px-4 md:px-8 bg-white relative">
                <div className="max-w-[1400px] mx-auto">
                   <div className="text-center mb-20">
                       <h2 className="text-4xl md:text-5xl font-black text-brand-dark whitespace-pre-line mb-6 uppercase tracking-tight">
                           {content.interior.title}
                       </h2>
                   </div>
                   <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      {content.interior.items.map((item, idx) => (
                          <div key={idx} className="relative group rounded-[2rem] overflow-hidden shadow-lg h-[400px]">
                              <img 
                                src={item.image} 
                                alt={item.name} 
                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out" 
                              />
                              <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors"></div>
                              <div className="absolute bottom-6 left-6">
                                  <span className="text-white text-2xl font-black px-3 py-1 bg-brand-main/80 backdrop-blur rounded-lg">
                                      {item.name}
                                  </span>
                              </div>
                          </div>
                      ))}
                   </div>
                </div>
            </section>
          );
          case 'startupCost': return (
            <section className="py-24 px-4 md:px-8 bg-brand-cream relative">
               <div className="max-w-[1400px] mx-auto">
                  <div className="text-center mb-20">
                     <h2 className="text-5xl md:text-6xl font-black text-brand-dark mb-4 tracking-tight">{content.startupCost.title}</h2>
                     <p className="text-lg text-gray-500 font-bold tracking-wide">{content.startupCost.subtitle}</p>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                     {content.startupCost.items.map((item, idx) => (
                        <div 
                            key={idx} 
                            className={`
                                relative flex flex-col items-center p-8 rounded-[2rem] text-center transition-all duration-300
                                ${item.highlight 
                                    ? 'bg-white border-2 border-brand-main shadow-xl scale-[1.03] z-10' 
                                    : 'bg-white border border-gray-100 text-gray-800 hover:border-brand-main/30'
                                }
                            `}
                        >
                           {item.highlight && (
                              <div className="absolute -top-3">
                                    <span className="bg-brand-main text-white text-xs font-bold px-4 py-1 rounded-full uppercase tracking-wider shadow-md">
                                        Benefit
                                    </span>
                              </div>
                           )}
                           <div className="mb-6 h-20 flex items-center justify-center opacity-90">
                               {item.image ? (
                                   <img src={item.image} alt={item.category} className="h-full w-auto object-contain" />
                               ) : (
                                   <div className="w-14 h-14 rounded-full bg-brand-light flex items-center justify-center text-brand-main">
                                      <DollarSign size={28} />
                                   </div>
                               )}
                           </div>
                           <h3 className="text-lg font-bold mb-3 text-brand-dark">{item.category}</h3>
                           <div className="mt-auto space-y-1 w-full pt-4 border-t border-gray-50">
                               {item.originalPrice && (
                                   <div className="text-sm decoration-1 line-through text-gray-400 font-medium">
                                       {item.originalPrice}
                                   </div>
                               )}
                               <div className={`text-2xl font-black ${item.highlight ? 'text-brand-main' : 'text-gray-700'}`}>
                                   {item.price}
                               </div>
                           </div>
                        </div>
                     ))}
                  </div>
                  <div className="mt-12 text-center">
                     <p className="text-gray-400 text-xs font-medium">* 별도공사: 철거, 전기증설, 냉난방기, 가스증설, 소방, 화장실 등 현장 상황에 따라 변동 가능</p>
                  </div>
               </div>
            </section>
          );
          case 'menu': return (
            <section id="menu" className="py-24 px-4 md:px-8 bg-white">
               <div className="max-w-[1400px] mx-auto">
                  <div className="text-center mb-24">
                     <p className="text-brand-main font-bold uppercase tracking-widest mb-2 text-sm">Signature Menu</p>
                     <h2 className="text-4xl md:text-6xl font-black text-brand-dark uppercase tracking-tight mb-6">{content.menu.title}</h2>
                     <p className="text-lg text-gray-500 max-w-2xl mx-auto">{content.menu.subtitle}</p>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-20">
                     {content.menu.items.map((item, idx) => (
                        <div key={item.id} className="flex flex-col group">
                           <div className="relative mb-8 w-full aspect-square rounded-[2.5rem] overflow-hidden bg-brand-light/30">
                               <img 
                                 src={item.image} 
                                 alt={item.name} 
                                 className="w-full h-full object-cover animate-float"
                                 style={{
                                    animationDelay: `${idx * 0.2}s`
                                 }}
                               />
                           </div>
                           <div className="flex flex-col items-start px-2">
                              <div className="flex justify-between items-baseline w-full mb-2">
                                 <h3 className="text-2xl font-black text-brand-dark">{item.name}</h3>
                                 <span className="text-lg font-bold text-brand-main">{item.price}원</span>
                              </div>
                              <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-3">{item.engName}</p>
                              <p className="text-gray-600 leading-relaxed text-sm">
                                 {item.description}
                              </p>
                           </div>
                        </div>
                     ))}
                  </div>
                  <div className="mt-24 text-center">
                     <button className="border-2 border-brand-dark text-brand-dark px-10 py-4 rounded-full font-bold text-lg hover:bg-brand-dark hover:text-white transition-all flex items-center gap-3 mx-auto uppercase tracking-wide">
                        <UtensilsCrossed size={20} />
                        전체 메뉴 보기
                     </button>
                  </div>
               </div>
            </section>
          );
          case 'locations': return (
            <section id="locations" className="py-24 px-4 md:px-8 bg-brand-cream">
               <div className="max-w-[1400px] mx-auto">
                  <div className="flex flex-col md:flex-row justify-between items-end mb-12">
                     <div>
                        <h2 className="text-4xl md:text-5xl font-black text-brand-dark mb-3 tracking-tight">{content.locations.title}</h2>
                        <p className="text-lg text-gray-500">전국 어디서나 아토키토를 만나보세요</p>
                     </div>
                  </div>
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 h-[600px] md:h-[700px]">
                     <div className="lg:col-span-4 bg-white rounded-[2rem] p-4 overflow-y-auto custom-scrollbar border border-gray-100 shadow-sm">
                        {content.locations.list.map((loc, idx) => (
                           <div 
                             key={idx} 
                             onMouseEnter={() => {
                                 setHoveredLocationId(idx);
                                 setSelectedLocation(loc);
                             }}
                             onMouseLeave={() => setHoveredLocationId(null)}
                             onClick={() => setSelectedLocation(loc)}
                             className={`
                                group flex items-center justify-between p-5 mb-2 rounded-xl transition-all duration-200 cursor-pointer
                                ${selectedLocation?.name === loc.name 
                                    ? 'bg-brand-main text-white shadow-md' 
                                    : 'hover:bg-gray-50 text-brand-dark'
                                }
                             `}
                           >
                              <div>
                                 <h4 className="font-bold text-lg">{loc.name}</h4>
                                 <p className={`text-sm mt-1 ${selectedLocation?.name === loc.name ? 'text-white/80' : 'text-gray-400'}`}>
                                     {loc.address}
                                 </p>
                              </div>
                              <ChevronRight className={`transition-opacity ${selectedLocation?.name === loc.name ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}`} size={18} />
                           </div>
                        ))}
                     </div>
                     <div className="lg:col-span-8 bg-[#f2f4f7] rounded-[2rem] relative overflow-hidden shadow-inner border border-gray-200">
                         <div 
                            className="absolute inset-0"
                            style={{
                                backgroundImage: `url('${content.locations.mapImage}')`,
                                backgroundSize: 'cover',
                                backgroundPosition: 'center',
                                opacity: 0.3,
                                filter: 'grayscale(100%)'
                            }}
                         ></div>
                         <div className="absolute top-4 right-4 flex flex-col gap-2 z-20">
                            <div className="bg-white p-2 rounded shadow text-gray-500 font-bold text-xs">지도</div>
                            <div className="bg-white p-2 rounded shadow text-gray-500 font-bold text-xs">위성</div>
                         </div>
                         <div className="absolute bottom-4 right-4 text-xs text-gray-400 z-20 font-sans">© NAVER Corp.</div>
                         {content.locations.list.map((loc, idx) => {
                             const pos = getMapPosition(loc.lat, loc.lng);
                             const isSelected = selectedLocation?.name === loc.name;
                             const isHovered = hoveredLocationId === idx;
                             const active = isSelected || isHovered;
                             return (
                                 <div 
                                    key={idx}
                                    className="absolute flex flex-col items-center cursor-pointer transition-all duration-300"
                                    style={{ top: pos.top, left: pos.left, transform: 'translate(-50%, -100%)', zIndex: active ? 50 : 10 }}
                                    onClick={() => setSelectedLocation(loc)}
                                 >
                                     <div className={`
                                         relative flex items-center justify-center transition-all duration-300
                                         ${active ? 'scale-110 drop-shadow-xl' : 'scale-100 drop-shadow-md'}
                                     `}>
                                         <MapPin 
                                            size={active ? 48 : 32} 
                                            className={`${active ? 'text-brand-main fill-brand-main' : 'text-brand-main/70 fill-brand-main/70'}`} 
                                         />
                                         <div className="absolute w-2 h-2 bg-white rounded-full top-[14px] left-1/2 -translate-x-1/2"></div>
                                     </div>
                                     <div className={`
                                         mt-1 whitespace-nowrap bg-white border border-brand-main text-brand-dark text-xs font-bold px-3 py-1.5 rounded shadow-lg
                                         transition-all duration-200
                                         ${active ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-2 pointer-events-none'}
                                     `}>
                                         {loc.name}
                                     </div>
                                 </div>
                             );
                         })}
                     </div>
                  </div>
               </div>
            </section>
          );
          case 'franchise': return (
            <section id="franchise" className="py-24 px-4 md:px-8 bg-brand-main text-white relative overflow-hidden">
               <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-white/5 rounded-full blur-[100px] pointer-events-none -mr-20 -mt-20"></div>
               <div className="max-w-[1200px] mx-auto relative z-10">
                  <div className="text-center mb-16">
                     <h2 className="text-4xl md:text-6xl font-black mb-6 leading-tight">가맹 문의</h2>
                     <p className="text-xl text-white/80 max-w-2xl mx-auto font-medium">
                        성공적인 창업, 아토키토와 함께라면 가능합니다.
                     </p>
                     <div className="mt-8 inline-flex items-center gap-3 bg-white/10 px-8 py-4 rounded-full text-white font-black text-2xl border border-white/20 hover:bg-white/20 transition-colors cursor-pointer" onClick={() => window.location.href = `tel:${content.franchise.contactPhone}`}>
                        <Phone size={24} /> {content.franchise.contactPhone}
                     </div>
                  </div>
                  <div className="bg-white rounded-[2.5rem] p-8 md:p-16 text-brand-dark shadow-2xl max-w-4xl mx-auto">
                     <form onSubmit={handleFormSubmit} className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                           <div className="space-y-2">
                              <label className="font-bold text-base ml-1 text-gray-600">이름</label>
                              <input 
                                type="text" 
                                className="w-full bg-gray-50 p-4 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-main text-base border border-gray-200"
                                placeholder="성함을 입력해주세요"
                                required
                                value={formData.name}
                                onChange={e => setFormData({...formData, name: e.target.value})}
                              />
                           </div>
                           <div className="space-y-2">
                              <label className="font-bold text-base ml-1 text-gray-600">연락처</label>
                              <input 
                                type="tel" 
                                className="w-full bg-gray-50 p-4 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-main text-base border border-gray-200"
                                placeholder="010-0000-0000"
                                required
                                value={formData.phone}
                                onChange={e => setFormData({...formData, phone: e.target.value})}
                              />
                           </div>
                        </div>
                        <div className="space-y-2">
                           <label className="font-bold text-base ml-1 text-gray-600">희망 지역</label>
                           <input 
                              type="text" 
                              className="w-full bg-gray-50 p-4 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-main text-base border border-gray-200"
                              placeholder="예: 서울 강남구"
                              value={formData.location}
                              onChange={e => setFormData({...formData, location: e.target.value})}
                           />
                        </div>
                        <button type="submit" className="w-full bg-brand-main text-white font-black py-5 rounded-xl text-xl hover:bg-brand-dark transition-all shadow-lg flex justify-center items-center gap-2 mt-4 hover:scale-[1.01]">
                           무료 상담 신청하기 <ArrowRight size={24} />
                        </button>
                        <p className="text-center text-xs text-gray-400 mt-2">
                           개인정보 수집 및 이용에 동의합니다.
                        </p>
                     </form>
                  </div>
               </div>
            </section>
          );
          default: return null;
      }
  }

  return (
    <div className="font-sans text-brand-dark bg-brand-cream min-h-screen selection:bg-brand-main selection:text-white overflow-x-hidden pb-20">
      <Navigation logo={content.header.logo} />

      <main className="w-full">
        {content.sectionOrder.map((key) => (
            <React.Fragment key={key}>
                {renderSection(key)}
            </React.Fragment>
        ))}

        {/* Footer */}
        <footer className="bg-white text-center py-16 pb-28 text-gray-400 text-sm font-medium border-t border-gray-100">
           <div className="flex justify-center space-x-6 mb-6">
              <a href="#" className="p-3 bg-gray-50 rounded-full hover:bg-brand-main hover:text-white transition-all"><Instagram size={18} /></a>
              <a href="#" className="p-3 bg-gray-50 rounded-full hover:bg-brand-main hover:text-white transition-all"><Facebook size={18} /></a>
           </div>
           <p className="mb-2 uppercase tracking-widest text-xs font-bold opacity-100 text-brand-main">{content.footer.address}</p>
           <p>{content.footer.copyright}</p>
        </footer>

      </main>

      {/* STICKY CONSULTATION BAR */}
      <div className="fixed bottom-0 left-0 w-full bg-brand-main z-50 py-2 px-4 shadow-[0_-4px_20px_-5px_rgba(0,0,0,0.1)] border-t border-white/10">
         <div className="max-w-[1200px] mx-auto flex flex-col md:flex-row items-center justify-between gap-2 h-auto md:h-12">
             {/* Left Info */}
             <div className="flex items-center gap-4 hidden md:flex">
                 <div className="text-white text-left flex items-baseline gap-2">
                     <span className="text-xs font-bold text-white/70 uppercase tracking-wide">가맹문의</span>
                     <span className="text-xl font-black">{content.franchise.contactPhone}</span>
                 </div>
             </div>

             {/* Right Form */}
             <div className="flex items-center gap-2 w-full md:w-auto">
                 <form onSubmit={handleQuickSubmit} className="flex items-center gap-2 w-full">
                    <input 
                      type="text" 
                      placeholder="이름/지역/전화번호" 
                      className="px-4 py-2 rounded-lg w-full md:w-[250px] border-none focus:ring-1 focus:ring-white text-brand-dark placeholder-gray-400 font-bold text-sm h-10 bg-white"
                      value={quickConsult}
                      onChange={(e) => setQuickConsult(e.target.value)}
                    />
                    <button type="submit" className="bg-brand-dark text-white px-5 py-2 rounded-lg font-bold hover:bg-black transition-colors whitespace-nowrap h-10 text-sm">
                        상담 신청
                    </button>
                 </form>
                 
                 {/* Privacy Checkbox */}
                 <div className="flex items-center gap-1 cursor-pointer" onClick={() => setAgreePrivacy(!agreePrivacy)}>
                    <div className={`w-4 h-4 rounded bg-white flex items-center justify-center transition-colors ${agreePrivacy ? 'text-brand-main' : 'text-gray-300'}`}>
                        <CheckCircle2 size={12} className={agreePrivacy ? 'opacity-100' : 'opacity-0'} />
                    </div>
                    <span className="text-white font-medium text-xs whitespace-nowrap select-none hidden sm:inline">동의</span>
                 </div>
             </div>
         </div>
      </div>

      {/* Admin Toggle */}
      <button 
        onClick={() => setIsAdminOpen(true)}
        className="fixed bottom-24 right-6 bg-brand-main text-white p-3 rounded-full shadow-lg hover:scale-110 transition z-40 border border-white/20"
      >
        <Settings size={20} />
      </button>

      <AdminPanel 
        content={content} 
        setContent={setContent} 
        isOpen={isAdminOpen} 
        onClose={() => setIsAdminOpen(false)} 
      />
    </div>
  );
}

export default App;