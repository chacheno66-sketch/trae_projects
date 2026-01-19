import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Star, Rocket } from 'lucide-react';

interface HomeViewProps {
  onEnterHub: () => void;
}

const HomeView: React.FC<HomeViewProps> = ({ onEnterHub }) => {
  return (
    <div className="h-screen w-full bg-gradient-to-br from-ja-blue to-ja-dark flex flex-col text-white overflow-hidden relative">
      {/* Background Decor */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-ja-light opacity-10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-ja-accent opacity-5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />

      {/* Header */}
      <header className="p-8 pt-12 z-10">
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-4xl font-extrabold tracking-tight mb-2">JA 中国</h1>
          <p className="text-ja-accent font-medium tracking-widest text-sm uppercase">学生公司展销会</p>
          <div className="w-12 h-1 bg-white mt-6 mb-2" />
          <h2 className="text-2xl font-light italic opacity-90">"预见未来的创变者"</h2>
        </motion.div>
      </header>

      {/* Main Content - Split Cards */}
      <main className="flex-1 flex flex-col p-6 gap-6 z-10 pb-12">
        
        {/* Card A: Inner Arena (Decorative/Placeholder) */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="flex-1 rounded-3xl relative overflow-hidden group cursor-pointer"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-orange-400 to-pink-500 opacity-90 transition-transform duration-500 group-hover:scale-105" />
          <div className="absolute inset-0 p-6 flex flex-col justify-between">
            <div className="p-3 bg-white/20 backdrop-blur-md rounded-full w-fit">
              <Star className="text-white w-6 h-6" />
            </div>
            <div>
              <h3 className="text-2xl font-bold mb-1">小小创变家</h3>
              <p className="text-white/80 text-sm">小学组展示 • 内场</p>
            </div>
          </div>
        </motion.div>

        {/* Card B: Outer Arena (Actionable) */}
        <motion.button
          onClick={onEnterHub}
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="flex-[1.2] rounded-3xl relative overflow-hidden group shadow-2xl shadow-ja-dark/50"
        >
          <div className="absolute inset-0 bg-gradient-to-bl from-ja-light to-ja-blue transition-transform duration-500 group-hover:scale-105" />
          
          {/* Abstract Grid Line Decoration */}
          <div className="absolute inset-0 opacity-20" 
               style={{ backgroundImage: 'radial-gradient(white 1px, transparent 1px)', backgroundSize: '20px 20px' }} 
          />

          <div className="absolute inset-0 p-6 flex flex-col justify-between items-start text-left">
            <div className="p-3 bg-white/20 backdrop-blur-md rounded-full w-fit animate-float">
              <Rocket className="text-white w-6 h-6" />
            </div>
            
            <div className="w-full">
              <div className="flex justify-between items-end">
                <div>
                  <h3 className="text-3xl font-bold mb-1">学生公司发布会</h3>
                  <p className="text-white/80 text-sm mb-4">高中组集市 • 外场</p>
                </div>
                <div className="bg-white text-ja-blue p-3 rounded-full mb-1">
                  <ArrowRight className="w-6 h-6" />
                </div>
              </div>
              <div className="w-full h-[1px] bg-white/30" />
            </div>
          </div>
        </motion.button>

      </main>
    </div>
  );
};

export default HomeView;