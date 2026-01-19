import { Company, Zone } from './types';

const ZONES: Zone[] = ['A', 'B', 'C', 'D', 'E'];
const TAGS = ['可持续发展', '科技创新', '文创设计', '社会影响力', '生活方式', '食品饮料'];

const COMPANY_NAMES = [
  "生态环 EcoLoop", "未来视界 FutureVision", "绿拇指 GreenThumb", "城市丰收 UrbanHarvest", "正念思维 MindfulMinds",
  "科新星 TechNova", "光步 SolarStep", "净源 AquaPure", "再生衣 ReWear", "生物包 BioPack",
  "智行 SmartCycle", "启智火花 EduSpark", "健康伴侣 HealthMate", "静音 SilentSound", "清风 CleanAir",
  "助手机器人 RoboAssist", "银发关怀 ElderCare", "宠友 PetPal", "健踪 FitTrack", "安睡 SleepWell",
  "安行 SafeWalk", "地道味 LocalEats", "艺境 Artify", "代码工坊 CodeCraft", "声波 SoundWave",
  "光路 LightPath", "绿墙 GreenWall", "无纸化 PaperLess", "零碳 CarbonZero", "海洋卫士 OceanGuard",
  "农科 AgriTech", "食救 FoodRescue", "技享 SkillShare", "邻里网 NeighborNet", "智游 TravelWise",
  "本土生长 HomeGrown", "纯净生活 PureLife", "活力 Vitality", "禅空间 ZenSpace", "专注流 FocusFlow",
  "回忆巷 MemoryLane", "快修 QuickFix", "易搬 EasyMove", "安全区 SafeZone", "充能 PowerUp",
  "晨曦 SunBeam", "新起点 FreshStart", "新叶 NewLeaf", "亮空 BrightSky", "观星者 StarGazer"
];

// Deterministic mock data generator
export const COMPANIES: Company[] = COMPANY_NAMES.map((name, index) => {
  const zone = ZONES[index % 5];
  const tag = TAGS[index % 6];
  
  return {
    id: `c-${index + 1}`,
    name: name,
    zone: zone,
    boothNumber: `${zone}-${100 + index}`,
    tag: tag,
    shortDescription: `致力于${tag}领域的创新，用学生视角重新定义未来，带来前所未有的${tag}体验。`,
    painPoints: "市场现有方案往往忽视了用户体验，且成本高昂，缺乏对可持续性的关注，难以满足现代消费者的深层需求。",
    solution: `我们打造了一款兼具美学与功能的产品，通过创新的设计和环保材料，旨在完美解决这一痛点，让生活更美好。`,
    teamName: `${name.split(' ')[0]} 团队`,
    imageUrl: `https://picsum.photos/800/600?random=${index}`,
    likes: Math.floor(Math.random() * 500) + 50
  };
});