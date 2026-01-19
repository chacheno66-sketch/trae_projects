import React from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Users, Lightbulb, CheckCircle2, Home } from 'lucide-react';
import { Company } from '../types';
import LikeButton from '../components/LikeButton';

interface DetailViewProps {
  company: Company;
  onBack: () => void;
  onGoHome: () => void;
}

const DetailView: React.FC<DetailViewProps> = ({ company, onBack, onGoHome }) => {
  return (
    <div className="min-h-screen bg-white pb-12">
      {/* Sticky Nav */}
      <div className="fixed top-0 left-0 right-0 z-40 p-4 flex justify-between pointer-events-none">
        <button
          onClick={onBack}
          className="pointer-events-auto bg-white/80 backdrop-blur-md shadow-sm border border-slate-100 p-3 rounded-full hover:bg-white active:scale-95 transition-all text-slate-800"
          aria-label="Back"
        >
          <ArrowLeft className="w-6 h-6" />
        </button>

        <button
          onClick={onGoHome}
          className="pointer-events-auto bg-white/80 backdrop-blur-md shadow-sm border border-slate-100 p-3 rounded-full hover:bg-white active:scale-95 transition-all text-slate-800"
          aria-label="Go Home"
        >
          <Home className="w-6 h-6" />
        </button>
      </div>

      {/* Hero Image */}
      <motion.div 
        layoutId={`img-${company.id}`}
        className="w-full h-72 bg-slate-200 relative overflow-hidden"
      >
        <img 
          src={company.imageUrl} 
          alt={company.name} 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        <div className="absolute bottom-0 left-0 p-6 text-white">
          <div className="inline-block px-3 py-1 bg-ja-accent text-ja-dark text-xs font-bold uppercase tracking-wider rounded-md mb-2">
            摊位 {company.boothNumber}
          </div>
          <h1 className="text-4xl font-black leading-tight mb-1">{company.name}</h1>
          <p className="text-white/90 font-medium">{company.tag}</p>
        </div>
      </motion.div>

      {/* Content Body */}
      <div className="max-w-md mx-auto px-6 -mt-6 relative z-10">
        <div className="bg-white rounded-t-3xl pt-8">
          
          {/* Pitch Section */}
          <section className="mb-8">
            <h2 className="text-xs font-bold text-ja-light uppercase tracking-widest mb-4 flex items-center gap-2">
              <Lightbulb className="w-4 h-4" /> 核心痛点
            </h2>
            <p className="text-slate-700 leading-relaxed text-lg font-light">
              "{company.painPoints}"
            </p>
          </section>

          <section className="mb-8 p-6 bg-slate-50 rounded-2xl border border-slate-100">
            <h2 className="text-xs font-bold text-ja-blue uppercase tracking-widest mb-4 flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4" /> 我们的解决方案
            </h2>
            <p className="text-slate-800 font-medium leading-relaxed">
              {company.solution}
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4 flex items-center gap-2">
              <Users className="w-4 h-4" /> 团队风采
            </h2>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-ja-blue flex items-center justify-center text-white font-bold text-sm">
                {company.teamName.charAt(0)}
              </div>
              <span className="font-semibold text-slate-800">{company.teamName}</span>
            </div>
          </section>

          <div className="border-t border-slate-100" />

          {/* Interaction */}
          <LikeButton initialLikes={company.likes} />

        </div>
      </div>
    </div>
  );
};

export default DetailView;