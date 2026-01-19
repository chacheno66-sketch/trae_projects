import React, { useState, useMemo, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Search, MapPin, Tag, Home, ChevronLeft, ChevronRight } from 'lucide-react';
import { Company, Zone } from '../types';
import ZoneMap from '../components/ZoneMap';
import { parseCSV } from '../src/utils/csvParser';

interface HubViewProps {
  onSelectCompany: (company: Company) => void;
  onGoHome: () => void;
}

const ITEMS_PER_PAGE = 10;

const HubView: React.FC<HubViewProps> = ({ onSelectCompany, onGoHome }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedZone, setSelectedZone] = useState<Zone | null>(null);
  const [companies, setCompanies] = useState<Company[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);

  // Load companies from CSV
  useEffect(() => {
    const loadCompanies = async () => {
      try {
        const response = await fetch('/companies.csv');
        const text = await response.text();
        const data = parseCSV(text);
        
        // Map CSV data to Company type
        const mappedCompanies: Company[] = data.map((row: any) => ({
          id: row['摊位号码'], // Use booth number as ID
          name: row['学生公司名称'],
          boothNumber: row['摊位号码'],
          zone: row['分组编号'] as Zone,
          tag: row['分组名称'],
          shortDescription: row['产品介绍'],
          // Default values for fields not in CSV
          description: row['产品介绍'], 
          logoUrl: '',
          images: [],
          members: [],
          painPoints: '',
          solution: '',
          teamName: row['学生公司名称'], // Use company name as team name default
          imageUrl: '',
          likes: 0
        })).filter(c => c.id && c.name); // Basic validation

        setCompanies(mappedCompanies);
      } catch (error) {
        console.error('Failed to load companies:', error);
      } finally {
        setLoading(false);
      }
    };

    loadCompanies();
  }, []);

  // Filter companies
  const filteredCompanies = useMemo(() => {
    return companies.filter(c => {
      const matchesSearch = 
        c.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
        c.boothNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
        c.tag.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesZone = selectedZone ? c.zone === selectedZone : true;
      
      return matchesSearch && matchesZone;
    });
  }, [searchTerm, selectedZone, companies]);

  // Pagination logic
  const totalPages = Math.ceil(filteredCompanies.length / ITEMS_PER_PAGE);
  
  const paginatedCompanies = useMemo(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredCompanies.slice(startIndex, startIndex + ITEMS_PER_PAGE);
  }, [filteredCompanies, currentPage]);

  // Reset page when filter changes
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, selectedZone]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-slate-50 pb-20">
      {/* Sticky Header */}
      <div className="sticky top-0 z-30 bg-white/90 backdrop-blur-md border-b border-slate-100 shadow-sm px-4 py-4">
        <div className="max-w-md mx-auto flex gap-3 items-center">
          <button 
            onClick={onGoHome}
            className="p-3 bg-slate-100 rounded-xl hover:bg-slate-200 text-slate-600 transition-colors"
            aria-label="Back to Home"
          >
            <Home className="w-5 h-5" />
          </button>
          
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
            <input
              type="text"
              placeholder="搜索公司、摊位号或标签..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-slate-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-ja-blue/50 text-slate-700 placeholder-slate-400 transition-all"
            />
          </div>
        </div>
      </div>

      <div className="max-w-md mx-auto px-4 pt-6">
        
        {/* Map Section */}
        <ZoneMap selectedZone={selectedZone} onSelectZone={setSelectedZone} />

        {/* Results Count */}
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-bold text-slate-800 text-lg">
            {selectedZone ? `${selectedZone} 区展商` : '所有展商'}
          </h3>
          <span className="text-xs font-medium px-2 py-1 bg-slate-200 rounded-full text-slate-600">
            {filteredCompanies.length}
          </span>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="text-center py-12 text-slate-400">
            <p>正在加载数据...</p>
          </div>
        )}

        {/* Masonry-ish List */}
        {!loading && (
          <div className="grid grid-cols-1 gap-4">
            {paginatedCompanies.map((company, idx) => (
              <motion.div
                key={company.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.05, duration: 0.3 }}
                onClick={() => onSelectCompany(company)}
                className="bg-white rounded-2xl p-4 shadow-sm border border-slate-100 cursor-pointer active:scale-[0.98] transition-transform hover:shadow-md group"
              >
                <div className="flex gap-4">
                  {/* ID Badge */}
                  <div className="flex flex-col items-center justify-center bg-slate-100 rounded-xl w-14 h-14 shrink-0 group-hover:bg-ja-blue group-hover:text-white transition-colors">
                    <span className="text-xs font-bold uppercase">区域</span>
                    <span className="text-xl font-black">{company.zone}</span>
                  </div>
                  
                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-start">
                      <h4 className="font-bold text-slate-900 truncate pr-2">{company.name}</h4>
                      <span className="text-xs font-mono text-slate-400">#{company.boothNumber}</span>
                    </div>
                    
                    <div className="flex items-center gap-1 mt-1 mb-2">
                      <Tag className="w-3 h-3 text-ja-light" />
                      <span className="text-xs font-medium text-ja-light">{company.tag}</span>
                    </div>
                    
                    <p className="text-sm text-slate-500 line-clamp-2 leading-relaxed">
                      {company.shortDescription}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
            
            {filteredCompanies.length === 0 && (
              <div className="text-center py-12 text-slate-400">
                <p>未找到符合条件的公司。</p>
                <button 
                  onClick={() => { setSearchTerm(''); setSelectedZone(null); }}
                  className="mt-2 text-ja-blue font-bold text-sm"
                >
                  清除所有筛选
                </button>
              </div>
            )}
          </div>
        )}

        {/* Pagination Controls */}
        {!loading && totalPages > 1 && (
          <div className="flex justify-center items-center gap-4 mt-8 pb-8">
            <button
              onClick={() => handlePageChange(Math.max(1, currentPage - 1))}
              disabled={currentPage === 1}
              className="p-2 rounded-lg bg-white border border-slate-200 text-slate-600 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-slate-50 transition-colors"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            
            <span className="text-sm font-medium text-slate-600">
              {currentPage} / {totalPages}
            </span>
            
            <button
              onClick={() => handlePageChange(Math.min(totalPages, currentPage + 1))}
              disabled={currentPage === totalPages}
              className="p-2 rounded-lg bg-white border border-slate-200 text-slate-600 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-slate-50 transition-colors"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default HubView;
