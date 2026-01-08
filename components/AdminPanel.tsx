import React, { useState } from 'react';
import { SiteContent, MenuItem, StoreLocation, StartupCostItem, ReviewItem, InteriorItem, SectionKey } from '../types';
import { X, Save, Plus, Trash2, MoveUp, MoveDown, Layout, Image, Type, Menu, MapPin, DollarSign, Home, Award, Phone, Settings, Tag } from 'lucide-react';

interface AdminPanelProps {
  content: SiteContent;
  setContent: React.Dispatch<React.SetStateAction<SiteContent>>;
  isOpen: boolean;
  onClose: () => void;
}

type TabType = 'layout' | 'branding' | 'hero' | 'menu' | 'reviews' | 'benefits' | 'interior' | 'startup' | 'locations' | 'franchise';

export const AdminPanel: React.FC<AdminPanelProps> = ({ content, setContent, isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState<TabType>('layout');

  if (!isOpen) return null;

  const handleChange = (section: keyof SiteContent, field: string, value: string) => {
    setContent(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value
      }
    }));
  };

  const updateListItem = (section: keyof SiteContent, listName: string, index: number, field: string, value: any) => {
     setContent(prev => {
         // @ts-ignore
         const newList = [...prev[section][listName]];
         newList[index] = { ...newList[index], [field]: value };
         return {
             ...prev,
             [section]: {
                 ...prev[section],
                 [listName]: newList
             }
         }
     })
  }

  const addItem = (section: keyof SiteContent, listName: string, initialItem: any) => {
      setContent(prev => ({
          ...prev,
          [section]: {
              ...prev[section],
              // @ts-ignore
              [listName]: [...prev[section][listName], initialItem]
          }
      }))
  }

  const removeItem = (section: keyof SiteContent, listName: string, index: number) => {
      setContent(prev => ({
          ...prev,
          [section]: {
              ...prev[section],
              // @ts-ignore
              [listName]: prev[section][listName].filter((_, i) => i !== index)
          }
      }))
  }

  const moveSection = (index: number, direction: 'up' | 'down') => {
      const newOrder = [...content.sectionOrder];
      if (direction === 'up' && index > 0) {
          [newOrder[index], newOrder[index - 1]] = [newOrder[index - 1], newOrder[index]];
      } else if (direction === 'down' && index < newOrder.length - 1) {
          [newOrder[index], newOrder[index + 1]] = [newOrder[index + 1], newOrder[index]];
      }
      setContent(prev => ({ ...prev, sectionOrder: newOrder }));
  };

  const tabs: { id: TabType; label: string; icon: React.ReactNode }[] = [
      { id: 'layout', label: '섹션 순서', icon: <Layout size={18} /> },
      { id: 'branding', label: '로고/브랜딩', icon: <Tag size={18} /> },
      { id: 'hero', label: '메인 화면', icon: <Image size={18} /> },
      { id: 'menu', label: '메뉴 관리', icon: <Menu size={18} /> },
      { id: 'reviews', label: '리뷰 관리', icon: <Type size={18} /> },
      { id: 'benefits', label: '혜택 관리', icon: <Award size={18} /> },
      { id: 'interior', label: '인테리어', icon: <Home size={18} /> },
      { id: 'startup', label: '창업 비용', icon: <DollarSign size={18} /> },
      { id: 'locations', label: '매장 위치', icon: <MapPin size={18} /> },
      { id: 'franchise', label: '가맹 문의', icon: <Phone size={18} /> },
  ];

  // Components
  const TextInput = ({ label, value, onChange, placeholder = '', multiline = false }: { label?: string, value: string, onChange: (v: string) => void, placeholder?: string, multiline?: boolean }) => (
      <div className="mb-4">
          {label && <label className="block text-xs font-bold text-gray-500 uppercase mb-1">{label}</label>}
          {multiline ? (
              <textarea 
                  value={value} 
                  onChange={e => onChange(e.target.value)} 
                  className="w-full p-2 border border-gray-200 rounded text-sm focus:border-brand-main focus:ring-1 focus:ring-brand-main outline-none"
                  rows={3}
                  placeholder={placeholder}
              />
          ) : (
              <input 
                  type="text" 
                  value={value} 
                  onChange={e => onChange(e.target.value)} 
                  className="w-full p-2 border border-gray-200 rounded text-sm focus:border-brand-main focus:ring-1 focus:ring-brand-main outline-none"
                  placeholder={placeholder}
              />
          )}
      </div>
  );

  const ImageInput = ({ label, value, onChange }: { label?: string, value: string, onChange: (v: string) => void }) => (
     <div className="mb-4">
         {label && <label className="block text-xs font-bold text-gray-500 uppercase mb-1">{label}</label>}
         <div className="flex gap-2 items-center">
             <div className="w-12 h-12 bg-gray-100 rounded border border-gray-200 shrink-0 overflow-hidden flex items-center justify-center">
                 {value ? <img src={value} alt="" className="w-full h-full object-cover" /> : <Image size={20} className="text-gray-400"/>}
             </div>
             <input 
                 type="text" 
                 value={value} 
                 onChange={e => onChange(e.target.value)} 
                 className="flex-1 p-2 border border-gray-200 rounded text-xs focus:border-brand-main focus:ring-1 focus:ring-brand-main outline-none"
                 placeholder="이미지 URL 입력 (https://...)"
             />
         </div>
     </div>
  );

  return (
    <div className="fixed inset-0 z-[100] bg-black/60 backdrop-blur-sm flex justify-center items-center p-4 md:p-10">
      <div className="bg-white w-full max-w-6xl h-full max-h-[90vh] rounded-3xl shadow-2xl flex overflow-hidden border border-white/20">
        
        {/* Sidebar */}
        <div className="w-64 bg-gray-50 border-r border-gray-200 flex flex-col">
            <div className="p-6 border-b border-gray-200">
                <h2 className="text-xl font-black text-brand-dark flex items-center gap-2">
                    <Settings size={24} className="text-brand-main" />
                    Admin Tool
                </h2>
                <p className="text-xs text-gray-500 mt-1">사이트 콘텐츠 및 디자인 관리</p>
            </div>
            <nav className="flex-1 overflow-y-auto p-4 space-y-1">
                {tabs.map(tab => (
                    <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold transition-all ${
                            activeTab === tab.id 
                            ? 'bg-brand-main text-white shadow-md' 
                            : 'text-gray-600 hover:bg-gray-200'
                        }`}
                    >
                        {tab.icon}
                        {tab.label}
                    </button>
                ))}
            </nav>
            <div className="p-4 border-t border-gray-200">
                <button 
                    onClick={onClose}
                    className="w-full bg-brand-dark text-white py-3 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-black transition-colors"
                >
                    <Save size={18} />
                    저장 및 닫기
                </button>
            </div>
        </div>

        {/* Content Area */}
        <div className="flex-1 overflow-y-auto p-8 bg-white">
            <div className="flex justify-between items-center mb-8 pb-4 border-b border-gray-100">
                <h3 className="text-2xl font-bold text-gray-800">
                    {tabs.find(t => t.id === activeTab)?.label} 설정
                </h3>
                <button onClick={onClose} className="p-2 text-gray-400 hover:text-gray-800 rounded-full hover:bg-gray-100">
                    <X size={24} />
                </button>
            </div>

            {/* TAB CONTENT: Layout / Order */}
            {activeTab === 'layout' && (
                <div className="space-y-4 max-w-2xl">
                    <div className="bg-blue-50 text-blue-800 p-4 rounded-xl text-sm mb-6 flex items-start gap-2">
                        <Layout size={16} className="mt-0.5 shrink-0" />
                        웹사이트의 섹션 순서를 드래그 앤 드롭 대신 화살표로 변경할 수 있습니다. 상단(Hero)과 하단(Footer)을 제외한 본문 섹션의 순서를 조정하세요.
                    </div>
                    {content.sectionOrder.map((section, idx) => (
                        <div key={section} className="flex items-center justify-between bg-white border border-gray-200 p-4 rounded-xl shadow-sm hover:shadow-md transition-shadow">
                            <span className="font-bold text-gray-700 uppercase tracking-wide flex items-center gap-3">
                                <span className="w-6 h-6 rounded-full bg-gray-100 flex items-center justify-center text-xs text-gray-500">{idx + 1}</span>
                                {section}
                            </span>
                            <div className="flex gap-2">
                                <button 
                                    onClick={() => moveSection(idx, 'up')} 
                                    disabled={idx === 0}
                                    className="p-2 bg-gray-100 rounded hover:bg-brand-main hover:text-white disabled:opacity-30 disabled:hover:bg-gray-100 disabled:hover:text-gray-500 transition-colors"
                                >
                                    <MoveUp size={16} />
                                </button>
                                <button 
                                    onClick={() => moveSection(idx, 'down')}
                                    disabled={idx === content.sectionOrder.length - 1} 
                                    className="p-2 bg-gray-100 rounded hover:bg-brand-main hover:text-white disabled:opacity-30 disabled:hover:bg-gray-100 disabled:hover:text-gray-500 transition-colors"
                                >
                                    <MoveDown size={16} />
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {/* TAB CONTENT: Branding */}
             {activeTab === 'branding' && (
                <div className="space-y-6 max-w-3xl">
                     <ImageInput label="사이트 로고 이미지 (URL)" value={content.header.logo} onChange={v => handleChange('header', 'logo', v)} />
                     <div className="bg-gray-50 p-4 rounded-lg border border-gray-100 mt-4 text-center">
                         <p className="text-xs text-gray-400 mb-2">로고 미리보기</p>
                         <img src={content.header.logo} alt="Logo Preview" className="h-20 mx-auto object-contain" />
                     </div>
                </div>
            )}


            {/* TAB CONTENT: Hero */}
            {activeTab === 'hero' && (
                <div className="space-y-6 max-w-3xl">
                    <TextInput label="메인 타이틀" value={content.hero.title} onChange={v => handleChange('hero', 'title', v)} multiline />
                    <TextInput label="서브 타이틀" value={content.hero.subtitle} onChange={v => handleChange('hero', 'subtitle', v)} multiline />
                    <div className="mb-4">
                        <label className="block text-xs font-bold text-gray-500 uppercase mb-1">배경 이미지 URL (줄바꿈으로 구분)</label>
                        <textarea
                            value={content.hero.images.join('\n')}
                            onChange={(e) => setContent(prev => ({...prev, hero: {...prev.hero, images: e.target.value.split('\n').filter(s => s.trim() !== '')}}))}
                            className="w-full p-2 border border-gray-200 rounded text-sm focus:border-brand-main focus:ring-1 focus:ring-brand-main outline-none h-32"
                            placeholder="https://..."
                        />
                    </div>
                    <div className="grid grid-cols-3 gap-2">
                        {content.hero.images.map((img, i) => (
                             <img key={i} src={img} className="h-20 w-full object-cover rounded border" />
                        ))}
                    </div>
                </div>
            )}

            {/* TAB CONTENT: Menu */}
            {activeTab === 'menu' && (
                <div>
                     <div className="grid grid-cols-2 gap-4 mb-6">
                        <TextInput label="섹션 제목" value={content.menu.title} onChange={v => handleChange('menu', 'title', v)} />
                        <TextInput label="섹션 설명" value={content.menu.subtitle} onChange={v => handleChange('menu', 'subtitle', v)} />
                    </div>
                    <div className="space-y-4">
                        {content.menu.items.map((item, idx) => (
                            <div key={item.id} className="border border-gray-200 rounded-xl p-4 flex gap-4 bg-gray-50 items-start">
                                <div className="flex-1 grid grid-cols-2 gap-3">
                                    <input value={item.name} onChange={e => updateListItem('menu', 'items', idx, 'name', e.target.value)} className="p-2 border rounded text-sm font-bold" placeholder="메뉴명" />
                                    <input value={item.price} onChange={e => updateListItem('menu', 'items', idx, 'price', e.target.value)} className="p-2 border rounded text-sm" placeholder="가격" />
                                    <input value={item.engName} onChange={e => updateListItem('menu', 'items', idx, 'engName', e.target.value)} className="col-span-2 p-2 border rounded text-xs" placeholder="영문명" />
                                    <div className="col-span-2">
                                         <ImageInput value={item.image} onChange={v => updateListItem('menu', 'items', idx, 'image', v)} />
                                    </div>
                                    <textarea value={item.description} onChange={e => updateListItem('menu', 'items', idx, 'description', e.target.value)} className="col-span-2 p-2 border rounded text-xs" rows={2} placeholder="설명" />
                                </div>
                                <button onClick={() => removeItem('menu', 'items', idx)} className="text-red-500 hover:bg-red-50 p-2 rounded"><Trash2 size={18} /></button>
                            </div>
                        ))}
                        <button 
                            onClick={() => addItem('menu', 'items', { id: Date.now().toString(), name: "새 메뉴", engName: "New Menu", description: "설명", price: "0", image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c" })}
                            className="w-full py-3 border-2 border-dashed border-gray-300 rounded-xl text-gray-500 font-bold hover:border-brand-main hover:text-brand-main transition-colors flex justify-center gap-2"
                        >
                            <Plus size={20} /> 메뉴 추가하기
                        </button>
                    </div>
                </div>
            )}

            {/* TAB CONTENT: Reviews */}
            {activeTab === 'reviews' && (
                <div>
                     <div className="grid grid-cols-2 gap-4 mb-6">
                        <TextInput label="섹션 제목" value={content.reviews.title} onChange={v => handleChange('reviews', 'title', v)} />
                        <TextInput label="섹션 설명" value={content.reviews.subtitle} onChange={v => handleChange('reviews', 'subtitle', v)} />
                    </div>
                    <div className="space-y-4">
                        {content.reviews.items.map((item, idx) => (
                            <div key={item.id} className="border border-gray-200 rounded-xl p-4 bg-gray-50 relative">
                                <button onClick={() => removeItem('reviews', 'items', idx)} className="absolute top-4 right-4 text-red-500 hover:bg-red-50 p-2 rounded"><Trash2 size={18} /></button>
                                <div className="grid grid-cols-2 gap-4 pr-10">
                                    <input value={item.author} onChange={e => updateListItem('reviews', 'items', idx, 'author', e.target.value)} className="p-2 border rounded font-bold" placeholder="작성자" />
                                    <input value={item.tag} onChange={e => updateListItem('reviews', 'items', idx, 'tag', e.target.value)} className="p-2 border rounded text-sm" placeholder="태그 (메뉴명)" />
                                    <textarea value={item.content} onChange={e => updateListItem('reviews', 'items', idx, 'content', e.target.value)} className="col-span-2 p-2 border rounded text-sm" rows={2} placeholder="리뷰 내용" />
                                    <div className="col-span-2">
                                        <ImageInput value={item.image} onChange={v => updateListItem('reviews', 'items', idx, 'image', v)} />
                                    </div>
                                </div>
                            </div>
                        ))}
                        <button 
                            onClick={() => addItem('reviews', 'items', { id: Date.now().toString(), author: "새 고객", rating: 5, content: "리뷰 내용", image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c", tag: "메뉴" })}
                            className="w-full py-3 border-2 border-dashed border-gray-300 rounded-xl text-gray-500 font-bold hover:border-brand-main hover:text-brand-main transition-colors flex justify-center gap-2"
                        >
                            <Plus size={20} /> 리뷰 추가하기
                        </button>
                    </div>
                </div>
            )}

            {/* TAB CONTENT: Benefits */}
             {activeTab === 'benefits' && (
                <div>
                    <TextInput label="섹션 제목" value={content.benefits.title} onChange={v => handleChange('benefits', 'title', v)} />
                    <div className="space-y-3 mt-6">
                        {content.benefits.items.map((item, idx) => (
                            <div key={idx} className="flex gap-3 items-start border p-3 rounded bg-gray-50">
                                <div className="flex-1 space-y-2">
                                    <input value={item.title} onChange={e => updateListItem('benefits', 'items', idx, 'title', e.target.value)} className="w-full p-2 border rounded font-bold" placeholder="혜택 제목" />
                                    <input value={item.desc} onChange={e => updateListItem('benefits', 'items', idx, 'desc', e.target.value)} className="w-full p-2 border rounded text-sm" placeholder="혜택 설명" />
                                    <ImageInput label="혜택 아이콘/이미지 (선택)" value={item.image || ''} onChange={v => updateListItem('benefits', 'items', idx, 'image', v)} />
                                </div>
                                <button onClick={() => removeItem('benefits', 'items', idx)} className="text-red-500 p-2"><Trash2 size={18} /></button>
                            </div>
                        ))}
                         <button 
                            onClick={() => addItem('benefits', 'items', { title: "새 혜택", desc: "설명 입력" })}
                            className="w-full py-3 border-2 border-dashed border-gray-300 rounded-xl text-gray-500 font-bold hover:border-brand-main hover:text-brand-main transition-colors flex justify-center gap-2 mt-4"
                        >
                            <Plus size={20} /> 혜택 추가하기
                        </button>
                    </div>
                </div>
            )}

             {/* TAB CONTENT: Interior */}
             {activeTab === 'interior' && (
                <div>
                    <TextInput label="섹션 제목" value={content.interior.title} onChange={v => handleChange('interior', 'title', v)} multiline />
                    <div className="grid grid-cols-2 gap-4 mt-6">
                        {content.interior.items.map((item, idx) => (
                            <div key={idx} className="border p-3 rounded-xl relative group">
                                <ImageInput value={item.image} onChange={v => updateListItem('interior', 'items', idx, 'image', v)} />
                                <input value={item.name} onChange={e => updateListItem('interior', 'items', idx, 'name', e.target.value)} className="w-full p-2 border rounded text-sm font-bold mb-1" placeholder="지점명" />
                                <button onClick={() => removeItem('interior', 'items', idx)} className="absolute top-2 right-2 bg-white/80 p-1 rounded-full text-red-500 opacity-0 group-hover:opacity-100 transition-opacity"><Trash2 size={16} /></button>
                            </div>
                        ))}
                    </div>
                    <button 
                        onClick={() => addItem('interior', 'items', { name: "새 인테리어", image: "https://images.unsplash.com/photo-1554118811-1e0d58224f24" })}
                        className="w-full py-3 border-2 border-dashed border-gray-300 rounded-xl text-gray-500 font-bold hover:border-brand-main hover:text-brand-main transition-colors flex justify-center gap-2 mt-4"
                    >
                        <Plus size={20} /> 인테리어 추가하기
                    </button>
                </div>
            )}

             {/* TAB CONTENT: Startup Costs */}
             {activeTab === 'startup' && (
                <div>
                    <div className="grid grid-cols-2 gap-4 mb-6">
                        <TextInput label="섹션 제목" value={content.startupCost.title} onChange={v => handleChange('startupCost', 'title', v)} />
                        <TextInput label="섹션 설명" value={content.startupCost.subtitle} onChange={v => handleChange('startupCost', 'subtitle', v)} />
                    </div>
                    <div className="space-y-4">
                        {content.startupCost.items.map((item, idx) => (
                            <div key={idx} className="flex gap-4 items-center bg-gray-50 p-3 rounded-lg border">
                                <div className="flex-1 grid grid-cols-3 gap-2">
                                     <div className="col-span-3">
                                          <ImageInput label="아이콘 이미지" value={item.image || ''} onChange={v => updateListItem('startupCost', 'items', idx, 'image', v)} />
                                     </div>
                                     <input value={item.category} onChange={e => updateListItem('startupCost', 'items', idx, 'category', e.target.value)} className="p-2 border rounded text-sm font-bold" placeholder="항목" />
                                     <input value={item.price} onChange={e => updateListItem('startupCost', 'items', idx, 'price', e.target.value)} className="p-2 border rounded text-sm" placeholder="가격" />
                                     <input value={item.originalPrice || ''} onChange={e => updateListItem('startupCost', 'items', idx, 'originalPrice', e.target.value)} className="p-2 border rounded text-xs" placeholder="원래 가격(선택)" />
                                </div>
                                <div className="flex flex-col gap-2 items-center">
                                    <label className="text-xs flex items-center gap-1 cursor-pointer">
                                        <input type="checkbox" checked={item.highlight || false} onChange={e => updateListItem('startupCost', 'items', idx, 'highlight', e.target.checked)} />
                                        강조
                                    </label>
                                    <button onClick={() => removeItem('startupCost', 'items', idx)} className="text-red-500 hover:text-red-700"><Trash2 size={16}/></button>
                                </div>
                            </div>
                        ))}
                         <button 
                            onClick={() => addItem('startupCost', 'items', { category: "새 항목", price: "0원", highlight: false })}
                            className="w-full py-3 border-2 border-dashed border-gray-300 rounded-xl text-gray-500 font-bold hover:border-brand-main hover:text-brand-main transition-colors flex justify-center gap-2"
                        >
                            <Plus size={20} /> 비용 항목 추가하기
                        </button>
                    </div>
                </div>
            )}

            {/* TAB CONTENT: Locations */}
            {activeTab === 'locations' && (
                <div>
                     <TextInput label="섹션 제목" value={content.locations.title} onChange={v => handleChange('locations', 'title', v)} />
                     <ImageInput label="지도 배경 이미지" value={content.locations.mapImage} onChange={v => handleChange('locations', 'mapImage', v)} />
                     
                     <div className="space-y-3 mt-6">
                        {content.locations.list.map((loc, idx) => (
                             <div key={idx} className="flex gap-3 items-start border p-3 rounded-lg bg-gray-50">
                                 <div className="flex-1 space-y-2">
                                     <div className="flex gap-2">
                                        <input value={loc.name} onChange={e => updateListItem('locations', 'list', idx, 'name', e.target.value)} className="flex-1 p-2 border rounded font-bold" placeholder="지점명" />
                                        <input value={loc.lat} type="number" step="0.001" onChange={e => updateListItem('locations', 'list', idx, 'lat', parseFloat(e.target.value))} className="w-20 p-2 border rounded text-xs" placeholder="위도" />
                                        <input value={loc.lng} type="number" step="0.001" onChange={e => updateListItem('locations', 'list', idx, 'lng', parseFloat(e.target.value))} className="w-20 p-2 border rounded text-xs" placeholder="경도" />
                                     </div>
                                     <input value={loc.address} onChange={e => updateListItem('locations', 'list', idx, 'address', e.target.value)} className="w-full p-2 border rounded text-sm" placeholder="주소" />
                                 </div>
                                 <button onClick={() => removeItem('locations', 'list', idx)} className="text-red-500 p-2"><Trash2 size={18} /></button>
                             </div>
                        ))}
                        <button 
                            onClick={() => addItem('locations', 'list', { name: "새 지점", address: "주소 입력", lat: 37.5, lng: 127.0 })}
                            className="w-full py-3 border-2 border-dashed border-gray-300 rounded-xl text-gray-500 font-bold hover:border-brand-main hover:text-brand-main transition-colors flex justify-center gap-2 mt-4"
                        >
                            <Plus size={20} /> 매장 추가하기
                        </button>
                     </div>
                </div>
            )}

             {/* TAB CONTENT: Franchise */}
             {activeTab === 'franchise' && (
                <div className="space-y-6">
                    <TextInput label="섹션 제목" value={content.franchise.title} onChange={v => handleChange('franchise', 'title', v)} />
                    <TextInput label="가맹 문의 전화번호" value={content.franchise.contactPhone} onChange={v => handleChange('franchise', 'contactPhone', v)} />
                </div>
            )}

        </div>
      </div>
      
      {/* Import lucide-react settings for icon usage */}
      <style>{`
         /* Scrollbar styling for admin panel */
         ::-webkit-scrollbar { width: 8px; }
         ::-webkit-scrollbar-track { background: #f1f1f1; }
         ::-webkit-scrollbar-thumb { background: #ccc; border-radius: 4px; }
         ::-webkit-scrollbar-thumb:hover { background: #999; }
      `}</style>
    </div>
  );
};