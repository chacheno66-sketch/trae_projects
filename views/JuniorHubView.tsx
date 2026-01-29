import React, { useState, useMemo, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Tag, ChevronDown, ChevronUp, Filter, X, MapPin, Home } from 'lucide-react';
import { Company, Zone } from '../types';
import { parseCSV } from '../src/utils/csvParser';

interface JuniorHubViewProps {
  onGoHome: () => void;
}

const BOOTH_RANGES = [
  { label: '全部', value: 'all' },
  { label: '01-08', value: '01-08' },
  { label: '09-16', value: '09-16' },
  { label: '17-24', value: '17-24' },
];

const INITIAL_DISPLAY_COUNT = 8;

const JuniorHubView: React.FC<JuniorHubViewProps> = ({ onGoHome }) => {
  // Data State
  const [companies, setCompanies] = useState<Company[]>([]);
  const [loading, setLoading] = useState(true);

  // Filter State
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRange, setSelectedRange] = useState('all');
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  // UI State
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [showAll, setShowAll] = useState(false);

  // Load CSV
  useEffect(() => {
    const loadCompanies = async () => {
      try {
        const response = await fetch('/junior_companies.csv');
        const text = await response.text();
        const data = parseCSV(text);
        
        const mappedCompanies: Company[] = data.map((row: any) => {
          const boothNum = row['展位号']?.toString() || '';
          const paddedBooth = boothNum.padStart(2, '0');
          
          return {
            id: `J${paddedBooth}`,
            name: row['团队名称'],
            school: row['学校名称'] || '',
            boothNumber: paddedBooth,
            zone: 'A' as Zone, // Default zone
            tag: row['主题'] || '未分类',
            shortDescription: row['主题'] || '',
            painPoints: '现场了解更多...',
            solution: '现场了解更多...',
            teamName: row['团队名称'] || '',
            imageUrl: '',
            likes: 0
          };
        }).filter((c: any) => c.id && c.name && c.boothNumber);

        setCompanies(mappedCompanies);
      } catch (error) {
        console.error('Failed to load companies:', error);
      } finally {
        setLoading(false);
      }
    };

    loadCompanies();
  }, []);

  // Derived State: Unique Categories
  const allCategories = useMemo(() => {
    const categories = new Set(companies.map(c => c.tag).filter(Boolean));
    return Array.from(categories);
  }, [companies]);

  // Filtering Logic
  const filteredCompanies = useMemo(() => {
    return companies.filter(c => {
      // 1. Search Filter
      const searchLower = searchTerm.toLowerCase();
      const matchesSearch = 
        !searchTerm || 
        c.name.toLowerCase().includes(searchLower) || 
        c.boothNumber.toLowerCase().includes(searchLower) ||
        c.school.toLowerCase().includes(searchLower);

      // 2. Range Filter
      let matchesRange = true;
      if (selectedRange !== 'all') {
        const [start, end] = selectedRange.split('-').map(Number);
        const boothNum = parseInt(c.boothNumber, 10);
        matchesRange = boothNum >= start && boothNum <= end;
      }

      // 3. Category Filter
      const matchesCategory = 
        selectedCategories.length === 0 || 
        selectedCategories.includes(c.tag);

      return matchesSearch && matchesRange && matchesCategory;
    });
  }, [companies, searchTerm, selectedRange, selectedCategories]);

  // Display List Logic
  const displayList = showAll ? filteredCompanies : filteredCompanies.slice(0, INITIAL_DISPLAY_COUNT);

  // Handlers
  const toggleCategory = (category: string) => {
    setSelectedCategories(prev => 
      prev.includes(category)
        ? prev.filter(c => c !== category)
        : [...prev, category]
    );
  };

  const clearFilters = () => {
    setSearchTerm('');
    setSelectedRange('all');
    setSelectedCategories([]);
    setShowAll(false);
  };

  const toggleExpand = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setExpandedId(prev => prev === id ? null : id);
  };

  return (
    <div className="min-h-screen bg-junior/5 pb-20">
      
      {/* 1. Header Section - Different Color for Junior */}
      <header className="bg-gradient-to-r from-junior to-junior/80 text-white px-6 pt-12 pb-8 rounded-b-[2.5rem] shadow-lg relative overflow-hidden">
        <button 
          onClick={onGoHome}
          className="absolute top-12 right-6 p-2 bg-white/20 backdrop-blur-md rounded-full text-white hover:bg-white/30 transition-colors z-20"
          aria-label="返回首页"
        >
          <Home className="w-5 h-5" />
        </button>
        <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
           {/* Decorative circles */}
           <div className="absolute top-[-50px] right-[-50px] w-40 h-40 rounded-full bg-white blur-3xl"></div>
           <div className="absolute bottom-[-20px] left-[-20px] w-32 h-32 rounded-full bg-yellow-300 blur-2xl"></div>
        </div>
        
        <div className="relative z-10 max-w-md mx-auto">
          <h1 className="text-2xl font-bold mb-2">小小创变家 & 点亮未来</h1>
          <p className="text-white/90 text-sm font-medium opacity-90 leading-relaxed">
            「小小创变家·循环向未来」成果展
            <br />
            点亮未来挑战赛优秀团队
          </p>
        </div>
      </header>

      <div className="max-w-md mx-auto px-4 -mt-6 relative z-20">
        
        {/* 2. Search Section */}
        <div className="bg-white rounded-2xl shadow-md p-2 mb-6 flex items-center gap-2">
          <Search className="w-5 h-5 text-slate-400 ml-2" />
          <input 
            type="text"
            placeholder="搜索小小创变家项目..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="flex-1 bg-transparent border-none focus:ring-0 text-slate-700 placeholder-slate-400 text-sm py-2"
          />
          {searchTerm && (
            <button onClick={() => setSearchTerm('')} className="p-1 text-slate-400 hover:text-slate-600">
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* 3. Booth Range Navigation (Segmented Control) */}
        <div className="flex gap-2 overflow-x-auto pb-4 no-scrollbar mb-2">
          {BOOTH_RANGES.map(range => (
            <button
              key={range.value}
              onClick={() => setSelectedRange(range.value)}
              className={`whitespace-nowrap px-4 py-2 rounded-full text-sm font-bold transition-all ${
                selectedRange === range.value 
                  ? 'bg-junior text-white shadow-md' 
                  : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
              }`}
            >
              {range.label}
            </button>
          ))}
        </div>

        {/* Map / Image Section */}
        <div className="mb-6 rounded-2xl overflow-hidden shadow-md border border-slate-100">
          {/* TODO: Replace src with your local image import, e.g. src={mapImage} */}
          <img 
            src="https://placehold.co/800x300/e2e8f0/64748b?text=Map+Image+Area" 
            alt="Venue Map" 
            className="w-full h-auto object-cover block"
          />
        </div>

        {/* 4. Category Filter Trigger & Info */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2 text-sm text-slate-600">
            <span className="font-bold text-slate-900">{filteredCompanies.length}</span> 个项目
            {selectedCategories.length > 0 && (
              <span className="text-xs bg-junior/10 text-junior px-2 py-0.5 rounded-full">
                已选 {selectedCategories.length} 类
              </span>
            )}
          </div>
          <button 
            onClick={() => setIsFilterOpen(true)}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-white border border-slate-200 rounded-lg text-sm font-medium text-slate-700 hover:bg-slate-50"
          >
            <Filter className="w-4 h-4" />
            筛选
          </button>
        </div>

        {/* 5. Company List */}
        <div className="space-y-4">
          {loading ? (
            <div className="text-center py-12 text-slate-400">加载中...</div>
          ) : filteredCompanies.length === 0 ? (
            <div className="text-center py-12 text-slate-400 bg-white rounded-2xl border border-slate-100">
              <p>未找到匹配的项目</p>
              <button onClick={clearFilters} className="mt-2 text-junior font-bold text-sm">
                清除筛选
              </button>
            </div>
          ) : (
            <>
              {displayList.map((company) => {
                const isExpanded = expandedId === company.id;
                
                return (
                  <motion.div
                    key={company.id}
                    layout
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`bg-white rounded-2xl overflow-hidden border transition-all ${
                      isExpanded ? 'border-junior/30 shadow-md ring-1 ring-junior/20' : 'border-slate-100 shadow-sm'
                    }`}
                  >
                    {/* Card Header (Always Visible) */}
                    <div className="p-4" onClick={(e) => toggleExpand(company.id, e)}>
                      <div className="flex gap-4 items-start">
                        {/* Visual Anchor: Big Booth Number */}
                        <div className="flex flex-col items-center justify-center w-16 h-16 bg-junior/10 text-junior rounded-2xl shrink-0 border border-junior/20">
                          <span className="text-[10px] font-bold uppercase tracking-wider opacity-60">展位</span>
                          <span className="text-2xl font-black leading-none">{company.boothNumber}</span>
                        </div>
                        
                        <div className="flex-1 min-w-0 pt-0.5">
                          <div className="flex justify-between items-start gap-2 mb-1">
                            <h3 className="font-bold text-lg text-slate-900 leading-tight truncate">{company.name}</h3>
                            <span className="text-[10px] font-bold text-junior bg-junior/10 px-2 py-1 rounded-full whitespace-nowrap shrink-0">
                              {company.tag}
                            </span>
                          </div>
                          
                          <div className="flex items-center gap-1 text-xs text-slate-500 mb-2">
                            <MapPin className="w-3 h-3" />
                            <span className="truncate">{company.school}</span>
                          </div>
                          {!isExpanded && (
                            <p className="text-sm text-slate-500 line-clamp-1">
                              {company.shortDescription}
                            </p>
                          )}
                        </div>
                      </div>

                      {/* Expand Button */}
                      <div className="flex justify-center mt-2">
                        <button 
                          className="p-1 rounded-full hover:bg-slate-50 text-slate-400 transition-colors"
                        >
                          {isExpanded ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                        </button>
                      </div>
                    </div>

                    {/* Expanded Content */}
                    <AnimatePresence>
                      {isExpanded && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          className="bg-slate-50 border-t border-slate-100 px-4 py-4"
                        >
                          <h4 className="text-sm font-bold text-slate-900 mb-2">项目介绍</h4>
                          <div className="space-y-3 text-sm text-slate-600 leading-relaxed">
                            <div>
                              <span className="font-bold text-junior">发现问题：</span>
                              {company.painPoints}
                            </div>
                            <div>
                              <span className="font-bold text-junior">解决方案：</span>
                              {company.solution}
                            </div>
                          </div>
                          
                          <div className="mt-4 pt-4 border-t border-slate-200 flex justify-between items-center">
                            <span className="text-xs text-slate-400">
                              分组: {company.zone}
                            </span>
                            <button 
                              onClick={(e) => toggleExpand(company.id, e)}
                              className="text-xs font-bold text-junior px-3 py-1.5 bg-junior/10 rounded-lg hover:bg-junior/20 transition-colors"
                            >
                              收起详情
                            </button>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                );
              })}
              
              {/* View All Toggle */}
              {!showAll && filteredCompanies.length > INITIAL_DISPLAY_COUNT && (
                <button
                  onClick={() => setShowAll(true)}
                  className="w-full py-3 bg-white border border-slate-200 rounded-xl text-sm font-bold text-slate-600 hover:bg-slate-50 shadow-sm transition-all"
                >
                  查看剩余 {filteredCompanies.length - INITIAL_DISPLAY_COUNT} 个项目
                </button>
              )}
              
              {showAll && filteredCompanies.length > INITIAL_DISPLAY_COUNT && (
                 <button
                  onClick={() => { setShowAll(false); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                  className="w-full py-3 bg-slate-100 rounded-xl text-sm font-bold text-slate-500 hover:bg-slate-200 transition-all"
                >
                  收起列表
                </button>
              )}
            </>
          )}
        </div>
      </div>

      {/* Category Filter Bottom Sheet (Simulated) */}
      <AnimatePresence>
        {isFilterOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsFilterOpen(false)}
              className="fixed inset-0 bg-black z-40"
            />
            <motion.div
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className="fixed bottom-0 left-0 right-0 bg-white rounded-t-3xl z-50 p-6 max-h-[80vh] overflow-y-auto"
            >
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-lg font-bold text-slate-900">筛选项目类别</h3>
                <button 
                  onClick={() => setIsFilterOpen(false)}
                  className="p-2 bg-slate-100 rounded-full hover:bg-slate-200 transition-colors"
                >
                  <X className="w-5 h-5 text-slate-600" />
                </button>
              </div>
              
              <div className="flex flex-wrap gap-3 mb-8">
                {allCategories.map(category => {
                  const isSelected = selectedCategories.includes(category);
                  return (
                    <button
                      key={category}
                      onClick={() => toggleCategory(category)}
                      className={`px-4 py-2 rounded-xl text-sm font-bold transition-all ${
                        isSelected 
                          ? 'bg-junior text-white shadow-md ring-2 ring-junior/30' 
                          : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                      }`}
                    >
                      {category}
                    </button>
                  );
                })}
              </div>
              
              <div className="flex gap-4">
                <button
                  onClick={() => setSelectedCategories([])}
                  className="flex-1 py-3 bg-slate-100 rounded-xl font-bold text-slate-600"
                >
                  重置
                </button>
                <button
                  onClick={() => setIsFilterOpen(false)}
                  className="flex-1 py-3 bg-junior rounded-xl font-bold text-white shadow-lg shadow-junior/30"
                >
                  确认 ({selectedCategories.length})
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

export default JuniorHubView;
