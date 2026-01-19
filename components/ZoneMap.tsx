import React from 'react';
import { Zone } from '../types';

interface ZoneMapProps {
  selectedZone: Zone | null;
  onSelectZone: (zone: Zone | null) => void;
}

const ZoneMap: React.FC<ZoneMapProps> = ({ selectedZone, onSelectZone }) => {
  const getFill = (zone: Zone) => {
    if (!selectedZone) return '#E2E8F0'; // Default gray
    return selectedZone === zone ? '#004B8D' : '#F1F5F9'; // Active blue or muted
  };

  const getStroke = (zone: Zone) => {
    return selectedZone === zone ? '#003366' : '#94A3B8';
  };

  const zones: { id: Zone; path: string; labelX: number; labelY: number }[] = [
    { id: 'A', path: "M10,10 L140,10 L140,90 L10,90 Z", labelX: 75, labelY: 50 },
    { id: 'B', path: "M150,10 L280,10 L280,90 L150,90 Z", labelX: 215, labelY: 50 },
    { id: 'C', path: "M290,10 L390,10 L390,140 L290,140 Z", labelX: 340, labelY: 75 },
    { id: 'D', path: "M10,100 L140,100 L140,190 L10,190 Z", labelX: 75, labelY: 145 },
    { id: 'E', path: "M150,100 L280,100 L280,190 L150,190 Z", labelX: 215, labelY: 145 },
  ];

  return (
    <div className="w-full max-w-md mx-auto p-4 bg-white rounded-xl shadow-sm border border-slate-100 mb-6">
      <div className="flex justify-between items-center mb-2">
        <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">场馆地图</span>
        {selectedZone && (
          <button 
            onClick={(e) => { e.stopPropagation(); onSelectZone(null); }}
            className="text-xs text-ja-blue font-semibold hover:underline"
          >
            清除筛选
          </button>
        )}
      </div>
      <svg viewBox="0 0 400 200" className="w-full h-auto drop-shadow-lg cursor-pointer">
        {zones.map((z) => (
          <g 
            key={z.id} 
            onClick={() => onSelectZone(selectedZone === z.id ? null : z.id)}
            className="transition-all duration-300 ease-in-out hover:opacity-90"
          >
            <path
              d={z.path}
              fill={getFill(z.id)}
              stroke={getStroke(z.id)}
              strokeWidth="2"
              className="transition-colors duration-300"
            />
            <text
              x={z.labelX}
              y={z.labelY}
              textAnchor="middle"
              dominantBaseline="middle"
              fill={selectedZone === z.id ? "white" : "#64748B"}
              fontWeight="bold"
              fontSize="16"
              className="pointer-events-none select-none"
            >
              {z.id} 区
            </text>
          </g>
        ))}
      </svg>
      <div className="text-center mt-2 text-xs text-slate-400">
        点击区域筛选摊位
      </div>
    </div>
  );
};

export default ZoneMap;