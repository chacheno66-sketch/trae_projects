import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, ChevronDown, ChevronUp, Sparkles, Rocket, Camera } from 'lucide-react';

interface HomeViewProps {
  onEnterHub: () => void;
  onEnterJuniorHub: () => void;
}

const HomeView: React.FC<HomeViewProps> = ({ onEnterHub, onEnterJuniorHub }) => {
  const [isAboutExpanded, setIsAboutExpanded] = useState(false);

  return (
    <div className="h-screen w-full bg-slate-50 flex flex-col relative overflow-hidden text-slate-900">
      {/* Background Decor */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-senior/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-junior/10 rounded-full blur-3xl translate-y-1/3 -translate-x-1/4 pointer-events-none" />

      {/* Header */}
      <header className="px-6 pt-12 pb-6 z-10 text-center">
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-2xl font-bold tracking-tight text-slate-900 mb-3">
            JA 中国｜青少年创新与创业实践市集
          </h1>
          <p className="text-slate-500 text-sm font-medium">
            欢迎来到学生公司集市，请选择您想前往的区域
          </p>
        </motion.div>
      </header>

      {/* Main Content - Split Cards */}
      <main className="flex-1 flex flex-col px-6 gap-5 z-10 pb-6 min-h-0">
        
        {/* Card A: Junior Hub */}
        <motion.button
          onClick={onEnterJuniorHub}
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="flex-1 rounded-2xl relative overflow-hidden group shadow-lg shadow-junior/5 border border-junior/20 text-left w-full"
        >
          {/* Background Gradient */}
          <div className="absolute inset-0 bg-gradient-to-br from-junior to-junior/80 transition-transform duration-500 group-hover:scale-105" />
          
          {/* Decor */}
          <div className="absolute top-0 right-0 p-4 opacity-20">
            <Sparkles className="w-24 h-24 text-white rotate-12" />
          </div>

          <div className="absolute inset-0 p-6 flex flex-col justify-between">
            <div className="flex justify-between items-start">
              <div className="p-2.5 bg-white/20 backdrop-blur-md rounded-xl">
                <Sparkles className="text-white w-6 h-6" />
              </div>
              <div className="bg-white/20 backdrop-blur-md rounded-full p-1.5">
                <ArrowRight className="w-5 h-5 text-white" />
              </div>
            </div>
            
            <div>
              <h3 className="text-2xl font-bold text-white mb-1">小小创变家 & 点亮未来</h3>
              <p className="text-white/90 text-sm font-medium">发现改变世界的奇思妙想</p>
            </div>
          </div>
        </motion.button>

        {/* Card B: Senior Hub */}
        <motion.button
          onClick={onEnterHub}
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="flex-1 rounded-2xl relative overflow-hidden group shadow-lg shadow-senior/5 border border-senior/20 text-left w-full"
        >
          {/* Background Gradient */}
          <div className="absolute inset-0 bg-gradient-to-br from-senior to-senior/80 transition-transform duration-500 group-hover:scale-105" />
          
          {/* Decor */}
          <div className="absolute top-0 right-0 p-4 opacity-20">
            <Rocket className="w-24 h-24 text-white -rotate-12" />
          </div>

          <div className="absolute inset-0 p-6 flex flex-col justify-between">
            <div className="flex justify-between items-start">
              <div className="p-2.5 bg-white/20 backdrop-blur-md rounded-xl">
                <Rocket className="text-white w-6 h-6" />
              </div>
              <div className="bg-white/20 backdrop-blur-md rounded-full p-1.5">
                <ArrowRight className="w-5 h-5 text-white" />
              </div>
            </div>
            
            <div>
              <h3 className="text-2xl font-bold text-white mb-1">学生公司</h3>
              <p className="text-white/90 text-sm font-medium">见证未来企业家的起步</p>
            </div>
          </div>
        </motion.button>

        {/* Live Photo Streaming Section */}
        <motion.a
          href="https://live.photoplus.cn/live/73768487"
          target="_blank"
          rel="noopener noreferrer"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="h-24 rounded-2xl relative overflow-hidden group shadow-lg shadow-purple-500/5 border border-purple-500/20 text-left w-full flex-none"
        >
          {/* Background Gradient */}
          <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-indigo-600 transition-transform duration-500 group-hover:scale-105" />
          
          <div className="absolute inset-0 px-6 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-white/20 backdrop-blur-md rounded-xl">
                <Camera className="text-white w-6 h-6" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-white leading-tight">现场图片直播</h3>
                <p className="text-white/80 text-xs mt-1">实时查看活动精彩瞬间</p>
              </div>
            </div>
            <div className="bg-white/20 backdrop-blur-md rounded-full p-1.5">
              <ArrowRight className="w-5 h-5 text-white" />
            </div>
          </div>
        </motion.a>

      </main>

      {/* Footer - About Section */}
      <footer className="px-6 pb-8 z-20">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-white/80 backdrop-blur-md rounded-2xl shadow-sm border border-slate-200 overflow-hidden"
        >
          <button 
            onClick={() => setIsAboutExpanded(!isAboutExpanded)}
            className="w-full px-5 py-4 flex items-center justify-between text-slate-800 hover:bg-slate-50 transition-colors"
          >
            <span className="font-semibold text-sm">关于本次活动</span>
            {isAboutExpanded ? (
              <ChevronDown className="w-4 h-4 text-slate-400" />
            ) : (
              <ChevronUp className="w-4 h-4 text-slate-400" />
            )}
          </button>
          
          <AnimatePresence>
            {isAboutExpanded && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="px-5 pb-5 text-sm text-slate-600 leading-relaxed border-t border-slate-100"
              >
                <div className="pt-3 space-y-3">
                  <p>
                    青年成就中国(Junior Achievement China，简称JA中国)成立于1993年，是一家致力于培养青少年核心素养的公益机构。自成立以来，青年成就中国积极与政府、教育部门和具有社会责任感的企业开展合作，为中国的大、中、小学生提供体验式、系统化的公益教育项目，以提升学生在职业构建、金融素养、责任创业方面的综合素质。截至目前已影响了中国70多个城市，超过770万青少年。
                  </p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </footer>
    </div>
  );
};

export default HomeView;