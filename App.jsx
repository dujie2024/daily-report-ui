import React, { useState } from 'react';
import { 
  TrendingUp, 
  TrendingDown, 
  Users, 
  DollarSign, 
  Activity, 
  ChevronRight, 
  LogOut, 
  Calendar,
  Mountain,
  Waves,
  Hotel,
  Ship,
  Anchor, 
  MapPin, 
  CheckCircle, 
  User, 
  Lock, 
  Eye, 
  EyeOff, 
  Smartphone, 
  BarChart2, 
  Compass, 
  PieChart,
  ShieldCheck,
  AlertCircle,
  X,
  Sliders,
  ChevronLeft,
  UserCheck,
  Bell,
  HelpCircle,
  Settings
} from 'lucide-react';
import { ZushanCompany } from './components/ZushanCompany';
import { XiaozhenCompany } from './components/XiaozhenCompany';
import { HaishangyouCompany } from './components/HaishangyouCompany';
import { LangtaoshaCompany } from './components/LangtaoshaCompany';
import { haishangyouConfig, langtaoshaConfig } from './data/companyConfigs';

export default function App() {
  // 登录与权限状态
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userRole, setUserRole] = useState('admin'); // admin | zushan | xiaozhen | ticket | suodao
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [activeTab, setActiveTab] = useState('platform'); // platform | zushan | xiaozhen | mine
  const [dimension, setDimension] = useState('day'); // day | month | year
  const [alertMsg, setAlertMsg] = useState(null);
  
  // 选中的具体数据日期（支持2026年4月各天联动）
  const [selectedDay, setSelectedDay] = useState(21); 
  const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);

  // 业务分析状态
  const [selectedAnalysisCompany, setSelectedAnalysisCompany] = useState('zushan'); // zushan | xiaozhen | cruise | beach | qihang

  // 弹出自定义警告通知
  const triggerAlert = (msg) => {
    setAlertMsg(msg);
    setTimeout(() => {
      setAlertMsg(null);
    }, 3000);
  };

  // 根据选择的日期(1-30)和维度(day/month/year)，动态计算数据源，确保21号完美贴合截图
  const getDynamicStats = (dim, targetDay) => {
    // 4月21日基准数据 (完美还原截图指标)
    const baseline = {
      day: {
        revenue: 86752.40, visitors: 969, paid: 842, rec: 127, budget: 90310.00
      },
      month: {
        revenue: 2255562.40, visitors: 25194, paid: 21892, rec: 3302, budget: 2348060.00
      },
      year: {
        revenue: 27760768.00, visitors: 310080, paid: 269440, rec: 40640, budget: 28899200.00
      }
    };

    // 格式化输出函数
    const fmtNum = (val) => val.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
    const fmtInt = (val) => Math.round(val).toLocaleString('en-US');

    if (dim === 'day') {
      let rev, vis, paid, rec, budget;
      if (targetDay === 21) {
        rev = baseline.day.revenue;
        vis = baseline.day.visitors;
        paid = baseline.day.paid;
        rec = baseline.day.rec;
        budget = baseline.day.budget;
      } else {
        // 基于日期的规律振荡系数 (0.6 ~ 1.35)
        const factor = 0.6 + ((targetDay * 7) % 11) * 0.075;
        rev = Math.round((baseline.day.revenue * factor) * 100) / 100;
        vis = Math.round(baseline.day.visitors * factor);
        paid = Math.round(vis * 0.87);
        rec = vis - paid;
        budget = Math.round((baseline.day.budget * (0.85 + (targetDay % 4) * 0.05)) * 100) / 100;
      }

      const compRateNum = (rev / budget) * 100;
      const compRate = compRateNum.toFixed(2) + "%";

      return {
        dateRange: `数据日期：2026-04-${targetDay < 10 ? '0' + targetDay : targetDay}`,
        revenue: fmtNum(rev),
        revenueTrend: "+" + (3.5 + (targetDay % 4) * 0.4).toFixed(2) + "%",
        visitors: fmtInt(vis),
        visitorsTrend: "+" + (1.8 + (targetDay % 5) * 0.3).toFixed(2) + "%",
        paidVisitors: fmtInt(paid),
        paidVisitorsTrend: "+" + (2.5 + (targetDay % 3) * 0.5).toFixed(2) + "%",
        receptionVisitors: fmtInt(rec),
        receptionVisitorsTrend: "+" + (1.5 + (targetDay % 2) * 0.6).toFixed(2) + "%",
        budgetRevenue: fmtNum(budget),
        completionRate: compRate,
        timeProgress: `${Math.round((targetDay / 30) * 100)}%`,
        rawRevenue: rev,
        rawVisitors: vis,
      };

    } else if (dim === 'month') {
      let rev, vis, paid, rec, budget = baseline.month.budget;
      if (targetDay === 21) {
        rev = baseline.month.revenue;
        vis = baseline.month.visitors;
        paid = baseline.month.paid;
        rec = baseline.month.rec;
      } else {
        const diff = targetDay - 21;
        const avgDailyRev = 85000;
        const avgDailyVis = 950;
        rev = Math.max(120000, baseline.month.revenue + diff * avgDailyRev);
        vis = Math.max(1500, baseline.month.visitors + diff * avgDailyVis);
        paid = Math.max(1200, baseline.month.paid + diff * (avgDailyVis * 0.87));
        rec = vis - paid;
      }

      const compRateNum = (rev / budget) * 100;
      const compRate = compRateNum.toFixed(2) + "%";
      const timePercent = Math.round((targetDay / 30) * 100);

      return {
        dateRange: `数据周期：2026年4月 (2026-04-01 ~ 2026-04-${targetDay < 10 ? '0' + targetDay : targetDay})`,
        revenue: fmtNum(rev),
        revenueTrend: "+" + (3.2 + (targetDay % 3) * 0.3).toFixed(2) + "%",
        visitors: fmtInt(vis),
        visitorsTrend: "+" + (2.1 + (targetDay % 4) * 0.2).toFixed(2) + "%",
        paidVisitors: fmtInt(paid),
        paidVisitorsTrend: "+" + (2.8 + (targetDay % 2) * 0.4).toFixed(2) + "%",
        receptionVisitors: fmtInt(rec),
        receptionVisitorsTrend: "+" + (2.0 + (targetDay % 5) * 0.25).toFixed(2) + "%",
        budgetRevenue: fmtNum(budget),
        completionRate: compRate,
        timeProgress: `${timePercent}%`,
        rawRevenue: rev,
        rawVisitors: vis,
      };

    } else { // year
      let rev, vis, paid, rec, budget = baseline.year.budget;
      if (targetDay === 21) {
        rev = baseline.year.revenue;
        vis = baseline.year.visitors;
        paid = baseline.year.paid;
        rec = baseline.year.rec;
      } else {
        const diff = targetDay - 21;
        const avgDailyRev = 85000;
        const avgDailyVis = 950;
        rev = Math.max(10000000, baseline.year.revenue + diff * avgDailyRev);
        vis = Math.max(120000, baseline.year.visitors + diff * avgDailyVis);
        paid = Math.max(100000, baseline.year.paid + diff * (avgDailyVis * 0.87));
        rec = vis - paid;
      }

      const compRateNum = (rev / budget) * 100;
      const compRate = compRateNum.toFixed(2) + "%";
      const baseYearProgress = 30.4;
      const diffProgress = (targetDay - 21) * 0.27; 
      const timePercent = (baseYearProgress + diffProgress).toFixed(1);

      return {
        dateRange: `数据周期：2026年 (2026-01-01 ~ 2026-04-${targetDay < 10 ? '0' + targetDay : targetDay})`,
        revenue: fmtNum(rev),
        revenueTrend: "+4.37%",
        visitors: fmtInt(vis),
        visitorsTrend: "+2.62%",
        paidVisitors: fmtInt(paid),
        paidVisitorsTrend: "+3.28%",
        receptionVisitors: fmtInt(rec),
        receptionVisitorsTrend: "+2.71%",
        budgetRevenue: fmtNum(budget),
        completionRate: compRate,
        timeProgress: `${timePercent}%`,
        rawRevenue: rev,
        rawVisitors: vis,
      };
    }
  };

  // 1. 获取当前联动数据
  const currentData = getDynamicStats(dimension, selectedDay);
  const totalRevVal = currentData.rawRevenue;
  const totalVisVal = currentData.rawVisitors;

  // 2. 客创单元收入概览数据 (根据大盘总收入动态等比例缩放，并移除括号内多余解释)
  const getCompanyRankings = () => {
    const proportions = {
      zushan: 0.4383,  // 祖山景区
      xiaozhen: 0.1887, // 天女小镇
      cruise: 0.2011,   // 海上游船
      beach: 0.0968,    // 浪淘沙
      qihang: 0.0751    // 启航公司
    };

    const getRankedVal = (prop) => (totalRevVal * prop);

    return [
      { id: 'zushan', name: '祖山景区', revenue: getRankedVal(proportions.zushan), ratio: 44, trend: '+5.2%', isUp: true, bg: 'from-blue-500 to-indigo-600', color: '#3b82f6', icon: 'Mountain' },
      { id: 'xiaozhen', name: '天女小镇', revenue: getRankedVal(proportions.xiaozhen), ratio: 19, trend: '+1.8%', isUp: true, bg: 'from-emerald-500 to-teal-600', color: '#10b981', icon: 'Hotel' },
      { id: 'cruise', name: '海上游船', revenue: getRankedVal(proportions.cruise), ratio: 20, trend: '-0.5%', isUp: false, bg: 'from-amber-400 to-orange-500', color: '#f59e0b', icon: 'Ship' },
      { id: 'beach', name: '浪淘沙', revenue: getRankedVal(proportions.beach), ratio: 10, trend: '+3.1%', isUp: true, bg: 'from-rose-500 to-pink-500', color: '#ef4444', icon: 'Waves' },
      { id: 'qihang', name: '启航公司', revenue: getRankedVal(proportions.qihang), ratio: 7, trend: '+4.2%', isUp: true, bg: 'from-cyan-400 to-blue-500', color: '#06b6d4', icon: 'Anchor' },
    ];
  };

  const activeRankings = getCompanyRankings();

  // 3. 渠道收入对比数据 (按渠道分析，完美对应截图 image_95ae60)
  const getChannelBreakdown = (companyId) => {
    // 假设当前选中公司的收入
    const compData = activeRankings.find(r => r.id === companyId) || activeRankings[0];
    const compRevenue = compData.revenue;

    // 截图中的比例
    // 美团: 27.95%, 携程: 24.04%, 小程序: 37.90%, 窗口直销: 10.11%
    const scale = compRevenue;
    
    return [
      { name: '小程序', type: 'SELF', value: scale * 0.3790, ratio: 37.90, color: '#f59e0b' },
      { name: '美团', type: 'OTA', value: scale * 0.2795, ratio: 27.95, color: '#3b82f6' },
      { name: '携程', type: 'OTA', value: scale * 0.2404, ratio: 24.04, color: '#10b981' },
      { name: '窗口直销', type: 'OFFLINE', value: scale * 0.1011, ratio: 10.11, color: '#ef4444' }
    ];
  };

  const currentChannels = getChannelBreakdown(selectedAnalysisCompany);

  // 祖山景区独立数据函数
  const getZushanData = () => {
    // 基于平台总数据的祖山占比（43.83%）
    const zushanProportion = 0.4383;
    const zushanRevenue = totalRevVal * zushanProportion;
    const zushanVisitors = totalVisVal * zushanProportion;
    
    // 祖山景区内部数据分配
    const paidVisitors = Math.round(zushanVisitors * 0.85); // 85%为收费客流
    const receptionVisitors = Math.round(zushanVisitors * 0.15); // 15%为接待客流
    
    const fmtNum = (n) => {
      if (n >= 1000000) return '¥' + (n / 1000000).toFixed(2) + 'M';
      if (n >= 1000) return '¥' + (n / 1000).toFixed(2) + 'K';
      return '¥' + n.toFixed(2);
    };
    
    const fmtInt = (n) => Math.round(n).toLocaleString('en-US');
    
    return {
      revenue: fmtNum(zushanRevenue),
      revenueTrend: '+12.5%',
      visitors: fmtInt(zushanVisitors),
      visitorsTrend: '+8.3%',
      paidVisitors: fmtInt(paidVisitors),
      paidVisitorsTrend: '+9.1%',
      receptionVisitors: fmtInt(receptionVisitors),
      receptionVisitorsTrend: '+4.7%',
      rawRevenue: zushanRevenue,
      rawVisitors: zushanVisitors,
    };
  };
  
  const zushanData = getZushanData();

  // 祖山景区渠道销售数据
  const getZushanChannelSales = () => {
    const totalRevenue = zushanData.rawRevenue;
    const totalVisitors = zushanData.rawVisitors;
    
    return [
      { 
        name: '团队', 
        quantity: Math.round(totalVisitors * 0.28),
        revenue: totalRevenue * 0.32,
        trend: '+15.2%',
        isUp: true,
        color: '#3b82f6',
        bgColor: 'bg-blue-50',
        textColor: 'text-blue-600'
      },
      { 
        name: '分销', 
        quantity: Math.round(totalVisitors * 0.18),
        revenue: totalRevenue * 0.21,
        trend: '+8.7%',
        isUp: true,
        color: '#10b981',
        bgColor: 'bg-emerald-50',
        textColor: 'text-emerald-600'
      },
      { 
        name: 'OTA', 
        quantity: Math.round(totalVisitors * 0.25),
        revenue: totalRevenue * 0.23,
        trend: '+6.3%',
        isUp: true,
        color: '#f59e0b',
        bgColor: 'bg-amber-50',
        textColor: 'text-amber-600'
      },
      { 
        name: '新媒体及小程序', 
        quantity: Math.round(totalVisitors * 0.16),
        revenue: totalRevenue * 0.14,
        trend: '+22.5%',
        isUp: true,
        color: '#8b5cf6',
        bgColor: 'bg-purple-50',
        textColor: 'text-purple-600'
      },
      { 
        name: '散客', 
        quantity: Math.round(totalVisitors * 0.13),
        revenue: totalRevenue * 0.10,
        trend: '-2.1%',
        isUp: false,
        color: '#ef4444',
        bgColor: 'bg-rose-50',
        textColor: 'text-rose-600'
      },
    ];
  };
  
  const zushanChannelSales = getZushanChannelSales();
  
  // 祖山收入结构分析数据
  const getZushanRevenueStructure = () => {
    const totalRevenue = zushanData.rawRevenue;
    
    return [
      {
        name: '门票收入（门车索）',
        value: totalRevenue * 0.62,
        ratio: 62,
        color: '#3b82f6',
        trend: '+11.5%',
        isUp: true
      },
      {
        name: '商业收入',
        value: totalRevenue * 0.28,
        ratio: 28,
        color: '#10b981',
        trend: '+15.8%',
        isUp: true
      },
      {
        name: '其他收入',
        value: totalRevenue * 0.10,
        ratio: 10,
        color: '#f59e0b',
        trend: '+6.2%',
        isUp: true
      }
    ];
  };
  
  const zushanRevenueStructure = getZushanRevenueStructure();
  
  // 祖山产品销售图表（门票类主要产品）
  const getZushanProductSales = () => {
    const ticketRevenue = zushanData.rawRevenue * 0.62; // 门票收入总额
    
    return [
      {
        name: '祖山门票',
        quantity: Math.round(zushanData.rawVisitors * 0.65),
        revenue: ticketRevenue * 0.48,
        price: 128,
        trend: '+10.2%',
        isUp: true
      },
      {
        name: '索道票',
        quantity: Math.round(zushanData.rawVisitors * 0.58),
        revenue: ticketRevenue * 0.35,
        price: 80,
        trend: '+12.8%',
        isUp: true
      },
      {
        name: '观光车票',
        quantity: Math.round(zushanData.rawVisitors * 0.42),
        revenue: ticketRevenue * 0.17,
        price: 45,
        trend: '+8.5%',
        isUp: true
      }
    ];
  };
  
  const zushanProductSales = getZushanProductSales();
  
  // 祖山产品客单数据
  const zushanProductPrice = {
    ticketPrice: 128,  // 祖山门票客单价（元）
    trend: '+3.2%',
    isUp: true
  };

  // 祖山商业收入情况
  // 天女小镇数据函数（酒店业务为核心）
  const getXiaozhenData = () => {
    const xiaozhenProportion = 0.2205; // 天女小镇约占平台总量的22.05%
    const xiaozhenRevenue = totalRevVal * xiaozhenProportion;
    const xiaozhenVisitors = totalVisVal * xiaozhenProportion;
    
    // 酒店核心指标：间夜数（基于总客流的40%作为住宿客人）
    const roomNights = Math.round(xiaozhenVisitors * 0.40);
    // 入住率（假设总房间数为150间）
    const totalRooms = 150;
    const occupancyRate = Math.min(95, Math.round((roomNights / (totalRooms * 30)) * 100)); // 月度入住率
    
    // 第二重要指标：餐饮接待量（基于总客流的42%）
    const diningGuests = Math.round(xiaozhenVisitors * 0.42);
    
    // 房价客单价（ADR - Average Daily Rate）
    const roomRevenue = xiaozhenRevenue * 0.48; // 客房收入占48%
    const adr = Math.round(roomRevenue / roomNights); // 客房收入 / 间夜数
    
    // 餐饮客单价
    const diningRevenue = xiaozhenRevenue * 0.32; // 餐饮收入占32%
    const diningAvg = Math.round(diningRevenue / diningGuests); // 餐饮收入 / 餐饮接待量
    
    const fmtNum = (n) => {
      if (n >= 1000000) return `${(n / 1000000).toFixed(2)}M`;
      if (n >= 1000) return `${(n / 1000).toFixed(2)}K`;
      return n.toFixed(2);
    };
    const fmtInt = (n) => Math.round(n).toLocaleString('en-US');
    
    return {
      revenue: fmtNum(xiaozhenRevenue),
      revenueTrend: '+9.8%',
      visitors: fmtInt(xiaozhenVisitors),
      visitorsTrend: '+7.2%',
      roomNights: fmtInt(roomNights),
      roomNightsTrend: '+12.3%',
      occupancyRate: `${occupancyRate}%`,
      occupancyRateTrend: '+5.2%',
      diningGuests: fmtInt(diningGuests),
      diningGuestsTrend: '+11.5%',
      adr: `¥${adr}`,
      adrTrend: '+8.5%',
      diningAvg: `¥${diningAvg}`,
      diningAvgTrend: '+9.2%',
      rawRevenue: xiaozhenRevenue,
      rawVisitors: xiaozhenVisitors,
      rawRoomNights: roomNights,
      rawDiningGuests: diningGuests,
      rawAdr: adr,
      rawDiningAvg: diningAvg,
    };
  };
  
  const xiaozhenData = getXiaozhenData();
  
  // 天女小镇停车场收入数据
  const xiaozhenParkingData = [
    {
      name: '小镇中心停车场',
      vehicles: 1245,
      revenue: 18675,
      trend: '+15.8%',
      isUp: true,
      avgPrice: 15,
      color: '#3b82f6'
    },
    {
      name: '小镇东西停车场',
      vehicles: 856,
      revenue: 12840,
      trend: '+12.3%',
      isUp: true,
      avgPrice: 15,
      color: '#8b5cf6'
    }
  ];
  
  // 天女小镇渠道销售数据（酒店核心渠道）
  const getXiaozhenChannelSales = () => {
    const totalRevenue = xiaozhenData.rawRevenue;
    const totalRoomNights = xiaozhenData.rawRoomNights;
    
    return [
      { 
        name: '协议大客户', 
        quantity: Math.round(totalRoomNights * 0.42),
        revenue: totalRevenue * 0.45,
        trend: '+15.8%',
        isUp: true,
        bgColor: 'bg-blue-50'
      },
      { 
        name: '抖音', 
        quantity: Math.round(totalRoomNights * 0.28),
        revenue: totalRevenue * 0.25,
        trend: '+28.5%',
        isUp: true,
        bgColor: 'bg-purple-50'
      },
      { 
        name: '携程', 
        quantity: Math.round(totalRoomNights * 0.18),
        revenue: totalRevenue * 0.18,
        trend: '+12.3%',
        isUp: true,
        bgColor: 'bg-emerald-50'
      },
      { 
        name: '美团', 
        quantity: Math.round(totalRoomNights * 0.08),
        revenue: totalRevenue * 0.08,
        trend: '+9.6%',
        isUp: true,
        bgColor: 'bg-amber-50'
      },
      { 
        name: '其他渠道', 
        quantity: Math.round(totalRoomNights * 0.04),
        revenue: totalRevenue * 0.04,
        trend: '+3.2%',
        isUp: true,
        bgColor: 'bg-slate-50'
      },
    ];
  };
  
  const xiaozhenChannelSales = getXiaozhenChannelSales();
  
  // 天女小镇收入结构分析
  const getXiaozhenRevenueStructure = () => {
    const totalRevenue = xiaozhenData.rawRevenue;
    
    return [
      {
        name: '客房收入',
        value: totalRevenue * 0.48,
        ratio: 48,
        color: '#3b82f6',
        trend: '+12.3%',
        isUp: true
      },
      {
        name: '餐饮收入',
        value: totalRevenue * 0.32,
        ratio: 32,
        color: '#10b981',
        trend: '+11.5%',
        isUp: true
      },
      {
        name: '停车场收入',
        value: totalRevenue * 0.08,
        ratio: 8,
        color: '#f59e0b',
        trend: '+6.8%',
        isUp: true
      },
      {
        name: '山居休闲度假收入',
        value: totalRevenue * 0.12,
        ratio: 12,
        color: '#8b5cf6',
        trend: '+15.2%',
        isUp: true
      }
    ];
  };
  
  const xiaozhenRevenueStructure = getXiaozhenRevenueStructure();
  
  // 天女小镇住房收入情况
  const xiaozhenBusinessRevenue = [
    { 
      name: '丹栗客栈', 
      type: '住宿',
      transactions: Math.round(xiaozhenData.rawRoomNights * 0.42), 
      revenue: xiaozhenData.rawRevenue * 0.18, 
      trend: '+10.8%', 
      isUp: true,
      category: 'danli-inn',
      unit: '间夜'
    },
    { 
      name: '温源谷酒店', 
      type: '住宿',
      transactions: Math.round(xiaozhenData.rawRoomNights * 0.58), 
      revenue: xiaozhenData.rawRevenue * 0.30, 
      trend: '+13.5%', 
      isUp: true,
      category: 'wenyuangu-hotel',
      unit: '间夜'
    }
  ];

  // 海上游公司数据函数
  const getHaishangyouData = () => {
    const config = haishangyouConfig;
    const haishangyouRevenue = totalRevVal * config.proportion;
    const haishangyouVisitors = totalVisVal * config.proportion;
    const paidVisitors = Math.round(haishangyouVisitors * config.paidRatio);
    const receptionVisitors = Math.round(haishangyouVisitors * config.receptionRatio);
    
    // 计算总航次（基于三艘船的航次总和）
    const totalTrips = Math.round(haishangyouVisitors * 0.45 / 150) + // 浪淘沙号
                       Math.round(haishangyouVisitors * 0.32 / 90) +  // 寻仙2号
                       Math.round(haishangyouVisitors * 0.23 / 60);   // 求仙6号
    
    const fmtNum = (n) => {
      if (n >= 1000000) return `${(n / 1000000).toFixed(2)}M`;
      if (n >= 1000) return `${(n / 1000).toFixed(2)}K`;
      return n.toFixed(2);
    };
    const fmtInt = (n) => Math.round(n).toLocaleString('en-US');
    
    // 计算总体客单价
    const avgPrice = Math.round(haishangyouRevenue / haishangyouVisitors);
    
    return {
      revenue: fmtNum(haishangyouRevenue),
      revenueTrend: config.revenueTrend,
      visitors: fmtInt(haishangyouVisitors),
      visitorsTrend: config.visitorsTrend,
      paidVisitors: fmtInt(paidVisitors),
      paidVisitorsTrend: config.paidVisitorsTrend,
      receptionVisitors: fmtInt(receptionVisitors),
      receptionVisitorsTrend: config.receptionVisitorsTrend,
      totalTrips: fmtInt(totalTrips),
      totalTripsTrend: '+13.5%',
      avgPrice: `¥${avgPrice}`,
      avgPriceTrend: '+4.8%',
      rawRevenue: haishangyouRevenue,
      rawVisitors: haishangyouVisitors,
      rawTotalTrips: totalTrips,
      rawAvgPrice: avgPrice,
    };
  };
  
  const haishangyouData = getHaishangyouData();
  
  const haishangyouChannelSales = haishangyouConfig.channelConfig.map(channel => ({
    name: channel.name,
    quantity: Math.round(haishangyouData.rawVisitors * channel.visitorRatio),
    revenue: haishangyouData.rawRevenue * channel.revenueRatio,
    trend: channel.trend,
    isUp: channel.isUp,
    bgColor: channel.bgColor
  }));
  
  const haishangyouRevenueStructure = haishangyouConfig.revenueStructure.map(item => ({
    name: item.name,
    value: haishangyouData.rawRevenue * item.ratio,
    ratio: Math.round(item.ratio * 100),
    color: item.color,
    trend: item.trend,
    isUp: item.isUp
  }));
  
  const haishangyouBusinessRevenue = haishangyouConfig.businessRevenue(haishangyouData.rawRevenue);

  // 海上游三艘游船数据（按船型展示各渠道销售及收入）
  const haishangyouShips = [
    {
      name: '浪淘沙号',
      type: '大型游船',
      capacity: 780,
      trips: Math.round(haishangyouData.rawVisitors * 0.45 / 150), // 航次
      passengers: Math.round(haishangyouData.rawVisitors * 0.45),
      revenue: haishangyouData.rawRevenue * 0.42,
      avgPrice: Math.round((haishangyouData.rawRevenue * 0.42) / Math.round(haishangyouData.rawVisitors * 0.45)), // 客单价
      avgPriceTrend: '+4.5%',
      trend: '+16.8%',
      isUp: true,
      channels: [
        { name: '携程', passengers: Math.round(haishangyouData.rawVisitors * 0.45 * 0.35), revenue: haishangyouData.rawRevenue * 0.42 * 0.35, trend: '+18.2%', isUp: true },
        { name: '美团', passengers: Math.round(haishangyouData.rawVisitors * 0.45 * 0.28), revenue: haishangyouData.rawRevenue * 0.42 * 0.28, trend: '+15.5%', isUp: true },
        { name: '抖音', passengers: Math.round(haishangyouData.rawVisitors * 0.45 * 0.22), revenue: haishangyouData.rawRevenue * 0.42 * 0.22, trend: '+25.3%', isUp: true },
        { name: '现场售票', passengers: Math.round(haishangyouData.rawVisitors * 0.45 * 0.10), revenue: haishangyouData.rawRevenue * 0.42 * 0.10, trend: '+8.6%', isUp: true },
        { name: '其他渠道', passengers: Math.round(haishangyouData.rawVisitors * 0.45 * 0.05), revenue: haishangyouData.rawRevenue * 0.42 * 0.05, trend: '+5.2%', isUp: true }
      ]
    },
    {
      name: '寻仙2号',
      type: '中型游船',
      capacity: 128,
      trips: Math.round(haishangyouData.rawVisitors * 0.32 / 90),
      passengers: Math.round(haishangyouData.rawVisitors * 0.32),
      revenue: haishangyouData.rawRevenue * 0.30,
      avgPrice: Math.round((haishangyouData.rawRevenue * 0.30) / Math.round(haishangyouData.rawVisitors * 0.32)), // 客单价
      avgPriceTrend: '+3.8%',
      trend: '+14.2%',
      isUp: true,
      channels: [
        { name: '携程', passengers: Math.round(haishangyouData.rawVisitors * 0.32 * 0.32), revenue: haishangyouData.rawRevenue * 0.30 * 0.32, trend: '+15.8%', isUp: true },
        { name: '美团', passengers: Math.round(haishangyouData.rawVisitors * 0.32 * 0.30), revenue: haishangyouData.rawRevenue * 0.30 * 0.30, trend: '+13.5%', isUp: true },
        { name: '抖音', passengers: Math.round(haishangyouData.rawVisitors * 0.32 * 0.25), revenue: haishangyouData.rawRevenue * 0.30 * 0.25, trend: '+22.8%', isUp: true },
        { name: '现场售票', passengers: Math.round(haishangyouData.rawVisitors * 0.32 * 0.08), revenue: haishangyouData.rawRevenue * 0.30 * 0.08, trend: '+6.5%', isUp: true },
        { name: '其他渠道', passengers: Math.round(haishangyouData.rawVisitors * 0.32 * 0.05), revenue: haishangyouData.rawRevenue * 0.30 * 0.05, trend: '+4.2%', isUp: true }
      ]
    },
    {
      name: '求仙6号',
      type: '小型游船',
      capacity: 800,
      trips: Math.round(haishangyouData.rawVisitors * 0.23 / 60),
      passengers: Math.round(haishangyouData.rawVisitors * 0.23),
      revenue: haishangyouData.rawRevenue * 0.28,
      avgPrice: Math.round((haishangyouData.rawRevenue * 0.28) / Math.round(haishangyouData.rawVisitors * 0.23)), // 客单价
      avgPriceTrend: '+5.2%',
      trend: '+11.5%',
      isUp: true,
      channels: [
        { name: '携程', passengers: Math.round(haishangyouData.rawVisitors * 0.23 * 0.28), revenue: haishangyouData.rawRevenue * 0.28 * 0.28, trend: '+12.8%', isUp: true },
        { name: '美团', passengers: Math.round(haishangyouData.rawVisitors * 0.23 * 0.25), revenue: haishangyouData.rawRevenue * 0.28 * 0.25, trend: '+10.5%', isUp: true },
        { name: '抖音', passengers: Math.round(haishangyouData.rawVisitors * 0.23 * 0.30), revenue: haishangyouData.rawRevenue * 0.28 * 0.30, trend: '+18.6%', isUp: true },
        { name: '现场售票', passengers: Math.round(haishangyouData.rawVisitors * 0.23 * 0.12), revenue: haishangyouData.rawRevenue * 0.28 * 0.12, trend: '+7.2%', isUp: true },
        { name: '其他渠道', passengers: Math.round(haishangyouData.rawVisitors * 0.23 * 0.05), revenue: haishangyouData.rawRevenue * 0.28 * 0.05, trend: '+3.8%', isUp: true }
      ]
    }
  ];

  // 浪淘沙公司数据函数
  const getLangtaoshaData = () => {
    const config = langtaoshaConfig;
    const langtaoshaRevenue = totalRevVal * config.proportion;
    const langtaoshaVisitors = totalVisVal * config.proportion;
    const paidVisitors = Math.round(langtaoshaVisitors * config.paidRatio);
    const receptionVisitors = Math.round(langtaoshaVisitors * config.receptionRatio);
    
    const fmtNum = (n) => {
      if (n >= 1000000) return `${(n / 1000000).toFixed(2)}M`;
      if (n >= 1000) return `${(n / 1000).toFixed(2)}K`;
      return n.toFixed(2);
    };
    const fmtInt = (n) => Math.round(n).toLocaleString('en-US');
    
    return {
      revenue: fmtNum(langtaoshaRevenue),
      revenueTrend: config.revenueTrend,
      visitors: fmtInt(langtaoshaVisitors),
      visitorsTrend: config.visitorsTrend,
      paidVisitors: fmtInt(paidVisitors),
      paidVisitorsTrend: config.paidVisitorsTrend,
      receptionVisitors: fmtInt(receptionVisitors),
      receptionVisitorsTrend: config.receptionVisitorsTrend,
      rawRevenue: langtaoshaRevenue,
      rawVisitors: langtaoshaVisitors,
    };
  };
  
  const langtaoshaData = getLangtaoshaData();
  
  const langtaoshaChannelSales = langtaoshaConfig.channelConfig.map(channel => ({
    name: channel.name,
    quantity: Math.round(langtaoshaData.rawVisitors * channel.visitorRatio),
    revenue: langtaoshaData.rawRevenue * channel.revenueRatio,
    trend: channel.trend,
    isUp: channel.isUp,
    bgColor: channel.bgColor
  }));
  
  const langtaoshaRevenueStructure = langtaoshaConfig.revenueStructure.map(item => ({
    name: item.name,
    value: langtaoshaData.rawRevenue * item.ratio,
    ratio: Math.round(item.ratio * 100),
    color: item.color,
    trend: item.trend,
    isUp: item.isUp
  }));
  
  const langtaoshaBusinessRevenue = langtaoshaConfig.businessRevenue(langtaoshaData.rawRevenue);

  const zushanBusinessRevenue = [
    // 自营商户（3家）- 流水全部计入收入
    { 
      name: '幽谷禅堂', 
      type: '自营',
      rentMode: '自营',
      transactions: 856, 
      revenue: 156800, 
      trend: '+15.7%', 
      isUp: true,
      countInRevenue: true
    },
    { 
      name: '观心阁（大庙文创）', 
      type: '自营',
      rentMode: '自营',
      transactions: 1245, 
      revenue: 89600, 
      trend: '+18.5%', 
      isUp: true,
      countInRevenue: true
    },
    { 
      name: '小鹿餐厅', 
      type: '自营',
      rentMode: '自营',
      transactions: 1678, 
      revenue: 198500, 
      trend: '+12.4%', 
      isUp: true,
      countInRevenue: true
    },
    
    // 联营-固定租金（3家）- 不需要知道流水
    { 
      name: '天女峰王母峰便利店', 
      type: '联营',
      rentMode: '固定租金',
      baseRent: '3万',
      transactions: 945, 
      revenue: 30000, 
      trend: '+8.5%', 
      isUp: true,
      countInRevenue: false
    },
    { 
      name: '东门检票口便利店', 
      type: '联营',
      rentMode: '固定租金',
      baseRent: '2万',
      transactions: 756, 
      revenue: 20000, 
      trend: '+5.2%', 
      isUp: true,
      countInRevenue: false
    },
    { 
      name: '忘忧谷商铺', 
      type: '联营',
      rentMode: '固定租金',
      baseRent: '3.5万',
      transactions: 1123, 
      revenue: 35000, 
      trend: '+6.8%', 
      isUp: true,
      countInRevenue: false
    },
    
    // 联营-直接分成（2家）
    { 
      name: '狐迹梵晶', 
      type: '联营',
      rentMode: '直接分成',
      shareRate: '商品20%/课程8%',
      transactions: 456, 
      revenue: 65000, 
      trend: '+35.2%', 
      isUp: true,
      countInRevenue: false
    },
    { 
      name: '目的地婚纱摄影', 
      type: '联营',
      rentMode: '直接分成',
      shareRate: '15%',
      transactions: 125, 
      revenue: 45000, 
      trend: '+32.5%', 
      isUp: true,
      countInRevenue: false
    },
    
    // 联营-保底+流水（7家）
    { 
      name: '索道上站观山海', 
      type: '联营',
      rentMode: '保底+流水',
      baseRent: '1万',
      baseFlow: '4万',
      shareRate: '25%',
      transactions: 856, 
      revenue: 125000, 
      trend: '+22.5%', 
      isUp: true,
      countInRevenue: false
    },
    { 
      name: '云海酒店住宿', 
      type: '联营',
      rentMode: '保底+流水',
      baseRent: '20万',
      baseFlow: '100万',
      shareRate: '20%',
      transactions: 456, 
      revenue: 285000, 
      trend: '+18.3%', 
      isUp: true,
      countInRevenue: false
    },
    { 
      name: '创世谷文创店', 
      type: '联营',
      rentMode: '保底+流水',
      baseRent: '1万',
      baseFlow: '13.3万',
      shareRate: '15%',
      transactions: 1245, 
      revenue: 95000, 
      trend: '+25.8%', 
      isUp: true,
      countInRevenue: false
    },
    { 
      name: '索道上站便利店', 
      type: '联营',
      rentMode: '保底+流水',
      baseRent: '15万',
      baseFlow: '60万',
      shareRate: '25%',
      transactions: 2156, 
      revenue: 215000, 
      trend: '+20.5%', 
      isUp: true,
      countInRevenue: false
    },
    { 
      name: '济心寺广场便利店', 
      type: '联营',
      rentMode: '保底+流水',
      baseRent: '7万',
      baseFlow: '28万',
      shareRate: '25%',
      transactions: 1856, 
      revenue: 125000, 
      trend: '+16.8%', 
      isUp: true,
      countInRevenue: false
    },
    { 
      name: '云海酒店餐厅', 
      type: '联营',
      rentMode: '保底+流水',
      baseRent: '20万',
      baseFlow: '80万',
      shareRate: '20%',
      transactions: 1678, 
      revenue: 245000, 
      trend: '+15.3%', 
      isUp: true,
      countInRevenue: false
    },
    { 
      name: '萌宠乐园', 
      type: '联营',
      rentMode: '保底+流水',
      baseRent: '3.6万',
      baseFlow: '12万',
      shareRate: '30%',
      transactions: 2345, 
      revenue: 85000, 
      trend: '+28.5%', 
      isUp: true,
      countInRevenue: false
    }
  ];

  // 快捷登录
  const handleQuickLogin = (role, defaultUser, defaultPass) => {
    setUsername(defaultUser);
    setPassword(defaultPass);
    setUserRole(role);
    setIsLoggedIn(true);
    if (role === 'admin') {
      setActiveTab('platform');
    } else {
      setActiveTab('zushan');
    }
    triggerAlert(`登录成功！当前身份：${getRoleName(role)}`);
  };

  const getRoleName = (role) => {
    switch (role) {
      case 'admin': return '平台决策层';
      case 'zushan': return '祖山子公司决策层';
      case 'xiaozhen': return '天女小镇决策层';
      case 'ticket': return '业务层 · 售票处';
      case 'suodao': return '业务层 · 索道单元';
      default: return '游客';
    }
  };

  const handleManualLogin = (e) => {
    e.preventDefault();
    if (!username.trim() || !password.trim()) {
      triggerAlert('请输入完整的用户名和密码');
      return;
    }
    setUserRole('admin');
    setIsLoggedIn(true);
    setActiveTab('platform');
    triggerAlert('登录成功！欢迎回到经营驾驶舱');
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUsername('');
    setPassword('');
    triggerAlert('已安全退出登录');
  };

  // 辅助函数：绘制 SVG 环形切片
  const renderDonutChart = (data, totalValue) => {
    const radius = 30;
    const strokeWidth = 12;
    const circumference = 2 * Math.PI * radius; // ~188.49
    let accumulatedPercent = 0;

    return (
      <svg viewBox="0 0 100 100" className="w-48 h-48 transform -rotate-90">
        <circle cx="50" cy="50" r={radius} fill="transparent" stroke="#f1f5f9" strokeWidth={strokeWidth} />
        {data.map((slice, index) => {
          const sliceVal = slice.revenue || slice.value;
          const percent = sliceVal / totalValue;
          const strokeDasharray = `${percent * circumference} ${circumference}`;
          const strokeDashoffset = -accumulatedPercent * circumference;
          accumulatedPercent += percent;

          return (
            <circle
              key={index}
              cx="50"
              cy="50"
              r={radius}
              fill="transparent"
              stroke={slice.color}
              strokeWidth={strokeWidth}
              strokeDasharray={strokeDasharray}
              strokeDashoffset={strokeDashoffset}
              strokeLinecap="butt"
              className="transition-all duration-500 hover:scale-105 origin-center cursor-pointer"
              title={`${slice.name}: ${(percent * 100).toFixed(2)}%`}
            />
          );
        })}
      </svg>
    );
  };

  return (
    <div className="min-h-screen bg-slate-100 flex justify-center items-center p-0 md:p-4 font-sans text-slate-800">
      {/* 手机外壳 */}
      <div className="w-full max-w-md bg-slate-50 min-h-screen md:min-h-[850px] md:max-h-[900px] md:rounded-[40px] md:shadow-2xl overflow-hidden flex flex-col relative border border-slate-200">
        
        {/* 自定义全局提示 */}
        {alertMsg && (
          <div className="absolute top-4 left-4 right-4 z-50 bg-slate-950/90 backdrop-blur text-white px-4 py-3 rounded-xl shadow-xl flex items-center gap-2 text-sm animate-fade-in">
            <AlertCircle className="w-5 h-5 text-amber-400 shrink-0" />
            <span>{alertMsg}</span>
          </div>
        )}

        {/* 日历选择半屏抽屉 */}
        {isDatePickerOpen && (
          <div className="fixed inset-0 bg-black/60 z-50 flex items-end justify-center transition-all animate-fade-in">
            <div className="w-full bg-white rounded-t-3xl p-5 shadow-2xl space-y-4 max-h-[80%] overflow-y-auto">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <div className="flex items-center gap-2">
                  <Calendar className="w-5 h-5 text-blue-600" />
                  <h3 className="font-black text-slate-800 text-sm">选择数据日期 (2026年4月)</h3>
                </div>
                <button 
                  onClick={() => setIsDatePickerOpen(false)}
                  className="p-1.5 hover:bg-slate-100 rounded-full text-slate-400 hover:text-slate-600"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* 星期日历头部 */}
              <div className="grid grid-cols-7 gap-1 text-center text-[10px] font-bold text-slate-400">
                <span>日</span><span>一</span><span>二</span><span>三</span><span>四</span><span>五</span><span>六</span>
              </div>

              {/* 4月份日历矩阵 */}
              <div className="grid grid-cols-7 gap-1.5">
                {Array.from({ length: 3 }).map((_, i) => (
                  <span key={`empty-${i}`} className="h-9"></span>
                ))}
                {Array.from({ length: 30 }).map((_, i) => {
                  const dayNum = i + 1;
                  const isSelected = selectedDay === dayNum;
                  return (
                    <button
                      key={`day-${dayNum}`}
                      onClick={() => {
                        setSelectedDay(dayNum);
                        setIsDatePickerOpen(false);
                        triggerAlert(`已成功切换数据日期至：2026-04-${dayNum < 10 ? '0' + dayNum : dayNum}`);
                      }}
                      className={`h-9 w-9 mx-auto rounded-full text-xs font-bold transition-all flex items-center justify-center ${
                        isSelected 
                          ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/30' 
                          : 'text-slate-700 hover:bg-slate-100'
                      }`}
                    >
                      {dayNum}
                    </button>
                  );
                })}
              </div>

              <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-100 text-[11px] text-slate-500 text-center">
                💡 提示：点击任意日期，大盘将自动为您加载并重算当期数据。
              </div>
            </div>
          </div>
        )}

        {/* 1. 登录界面 */}
        {!isLoggedIn ? (
          <div className="flex-1 flex flex-col relative min-h-full">
            {/* 顶部的自然风光拼接视觉 */}
            <div className="h-64 relative overflow-hidden flex">
              <div className="w-1/4 h-full relative">
                <div className="absolute inset-0 bg-gradient-to-b from-teal-900/60 to-emerald-950/80 z-10"></div>
                <div className="absolute inset-0 bg-emerald-800 animate-pulse opacity-50"></div>
                <div className="absolute bottom-4 left-0 right-0 text-center z-20">
                  <span className="text-white text-[10px] font-semibold px-1 py-0.5 rounded bg-emerald-700/80">祖山</span>
                </div>
              </div>
              
              <div className="w-1/4 h-full relative">
                <div className="absolute inset-0 bg-gradient-to-b from-amber-800/60 to-amber-950/80 z-10"></div>
                <div className="absolute inset-0 bg-amber-700 animate-pulse opacity-30"></div>
                <div className="absolute bottom-4 left-0 right-0 text-center z-20">
                  <span className="text-white text-[10px] font-semibold px-1 py-0.5 rounded bg-amber-700/80">天女小镇</span>
                </div>
              </div>

              <div className="w-1/4 h-full relative">
                <div className="absolute inset-0 bg-gradient-to-b from-cyan-800/60 to-cyan-950/80 z-10"></div>
                <div className="absolute inset-0 bg-cyan-600 animate-pulse opacity-40"></div>
                <div className="absolute bottom-4 left-0 right-0 text-center z-20">
                  <span className="text-white text-[10px] font-semibold px-1 py-0.5 rounded bg-cyan-700/80">浪淘沙</span>
                </div>
              </div>

              <div className="w-1/4 h-full relative">
                <div className="absolute inset-0 bg-gradient-to-b from-blue-900/60 to-blue-950/80 z-10"></div>
                <div className="absolute inset-0 bg-blue-800 animate-pulse opacity-50"></div>
                <div className="absolute bottom-4 left-0 right-0 text-center z-20">
                  <span className="text-white text-[10px] font-semibold px-1 py-0.5 rounded bg-blue-700/80">海上游轮</span>
                </div>
              </div>

              <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-950/60 to-transparent z-30 flex flex-col justify-end p-6">
                <div className="flex items-center gap-2 mb-1">
                  <span className="bg-blue-500 w-2.5 h-2.5 rounded-full animate-ping"></span>
                  <span className="text-blue-400 text-[10px] tracking-wider uppercase font-bold">New Dynasty Tourism</span>
                </div>
                <h1 className="text-white text-2xl font-black tracking-tight leading-tight">
                  秦皇岛新朝旅游
                </h1>
                <p className="text-slate-300 text-xs font-medium mt-0.5">
                  经营日报分析系统（移动端）
                </p>
              </div>
            </div>

            {/* 登录表单 */}
            <div className="flex-1 bg-white px-6 pt-6 pb-20 -mt-4 rounded-t-2xl z-40 flex flex-col">
              <div className="mb-4">
                <h2 className="text-slate-800 text-base font-bold">欢迎登录</h2>
                <p className="text-slate-400 text-xs">请输入您的账号密码，进入移动端经营驾驶舱</p>
              </div>

              <form onSubmit={handleManualLogin} className="space-y-4">
                <div>
                  <label className="block text-slate-600 text-xs font-bold mb-1.5 flex items-center gap-1">
                    用户名 <span className="text-rose-500">*</span>
                  </label>
                  <div className="relative">
                    <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-slate-400">
                      <User className="w-4 h-4" />
                    </span>
                    <input 
                      type="text" 
                      placeholder="请输入用户名" 
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3 pl-10 pr-4 text-sm focus:outline-none focus:border-blue-500 focus:bg-white transition-all"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-slate-600 text-xs font-bold mb-1.5 flex items-center gap-1">
                    密码 <span className="text-rose-500">*</span>
                  </label>
                  <div className="relative">
                    <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-slate-400">
                      <Lock className="w-4 h-4" />
                    </span>
                    <input 
                      type={showPassword ? "text" : "password"} 
                      placeholder="请输入密码" 
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3 pl-10 pr-10 text-sm focus:outline-none focus:border-blue-500 focus:bg-white transition-all"
                    />
                    <button 
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute inset-y-0 right-0 flex items-center pr-3 text-slate-400 hover:text-slate-600"
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-1">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input 
                      type="checkbox" 
                      checked={rememberMe} 
                      onChange={() => setRememberMe(!rememberMe)}
                      className="rounded border-slate-300 text-blue-600 focus:ring-blue-500 w-4 h-4"
                    />
                    <span className="text-xs text-slate-500 font-medium">记住密码并自动登录</span>
                  </label>
                </div>

                <button 
                  type="submit"
                  className="w-full bg-blue-600 hover:bg-blue-700 active:scale-[0.98] text-white py-3.5 rounded-xl text-sm font-bold shadow-lg shadow-blue-500/20 transition-all flex justify-center items-center gap-2 mt-4"
                >
                  <Smartphone className="w-4 h-4" />
                  登 录 进 入
                </button>
              </form>

              {/* 快捷登录 */}
              <div className="mt-8">
                <div className="relative flex py-2 items-center">
                  <div className="flex-grow border-t border-slate-100"></div>
                  <span className="flex-shrink mx-4 text-slate-400 text-[10px] font-bold tracking-wider uppercase">演示账号一键快捷填入</span>
                  <div className="flex-grow border-t border-slate-100"></div>
                </div>

                <div className="flex flex-wrap gap-2 justify-center mt-3">
                  <button 
                    onClick={() => handleQuickLogin('admin', 'ceo_xinchao', 'pass123')}
                    className="px-3 py-1.5 bg-rose-50 text-rose-600 text-[11px] font-bold rounded-lg border border-rose-100 hover:bg-rose-100 active:scale-95 transition-all flex items-center gap-1"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-rose-500"></span>
                    管理层 (admin)
                  </button>
                  
                  <button 
                    onClick={() => handleQuickLogin('zushan', 'op_zushan', 'pass123')}
                    className="px-3 py-1.5 bg-emerald-50 text-emerald-600 text-[11px] font-bold rounded-lg border border-emerald-100 hover:bg-emerald-100 active:scale-95 transition-all flex items-center gap-1"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                    运营层 · 祖山
                  </button>

                  <button 
                    onClick={() => handleQuickLogin('xiaozhen', 'op_town', 'pass123')}
                    className="px-3 py-1.5 bg-amber-50 text-amber-600 text-[11px] font-bold rounded-lg border border-amber-100 hover:bg-amber-100 active:scale-95 transition-all flex items-center gap-1"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-500"></span>
                    运营层 · 小镇
                  </button>
                </div>
              </div>

              <div className="mt-auto pt-6 text-center text-slate-400 text-xs flex flex-col items-center gap-1">
                <div className="flex items-center gap-1 text-slate-300 font-bold">
                  <span>HUAJING LEYOU</span>
                </div>
                <span className="text-[10px]">技术支持：华景乐游公司</span>
              </div>
            </div>
          </div>
        ) : (
          
          /* 2. 主体页面 */
          <div className="flex-1 flex flex-col bg-slate-50 overflow-hidden">
            
            {/* 2.1 最顶部左侧 “秦皇岛新朝旅游” */}
            <header className="bg-blue-700 text-white px-4 py-3 shrink-0 shadow-md">
              <div className="flex items-center justify-between">
                <div className="flex flex-col">
                  <h1 className="text-base font-black tracking-wide text-white leading-tight">
                    秦皇岛新朝旅游
                  </h1>
                  <div className="flex items-center gap-1 mt-0.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                    <span className="text-[10px] text-blue-200 font-bold">
                      经营分析驾驶舱 · {getRoleName(userRole)}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  {userRole === 'admin' && activeTab !== 'platform' && (
                    <button 
                      onClick={() => setActiveTab('platform')}
                      className="px-2 py-1 bg-white/15 text-white hover:bg-white/25 rounded text-[11px] font-bold transition-all"
                    >
                      平台公司页
                    </button>
                  )}
                  <button 
                    onClick={handleLogout}
                    className="p-1.5 hover:bg-white/15 rounded-lg text-blue-100 hover:text-white transition-all flex items-center gap-1 text-xs"
                  >
                    <LogOut className="w-4 h-4" />
                    <span>退出</span>
                  </button>
                </div>
              </div>
            </header>

            {/* 2.2 数据维度控制 与 可交互日期 (仅非业务分析页面显示此条，分析页内有专属标题控制) */}
            {activeTab !== 'analysis' && (
              <div className="bg-white px-4 py-3 border-b border-slate-100 shadow-sm shrink-0">
                {/* 日期显示 - 移到最上部 */}
                <div 
                  onClick={() => setIsDatePickerOpen(true)}
                  className="flex items-center justify-between text-slate-500 text-xs bg-blue-50/40 px-3 py-2 rounded-xl cursor-pointer hover:bg-blue-50/70 active:scale-[0.99] transition-all border border-blue-50 mb-2"
                >
                  <div className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-ping"></span>
                    <span className="font-extrabold tracking-wide text-[11px] font-mono text-slate-700">{currentData.dateRange}</span>
                  </div>
                  <ChevronRight className="w-3.5 h-3.5 text-blue-400" />
                </div>

                {/* 维度切换和筛选按钮 */}
                <div className="flex items-center justify-between">
                  <div className="bg-slate-100 p-0.5 rounded-xl flex-1 mr-3 flex shadow-inner">
                    <button 
                      onClick={() => setDimension('day')}
                      className={`flex-1 text-center py-1.5 text-[11px] font-bold rounded-lg transition-all ${dimension === 'day' ? 'bg-white text-blue-700 shadow-sm' : 'text-slate-500 hover:text-slate-800'}`}
                    >
                      本日数据
                    </button>
                    <button 
                      onClick={() => setDimension('month')}
                      className={`flex-1 text-center py-1.5 text-[11px] font-bold rounded-lg transition-all ${dimension === 'month' ? 'bg-white text-blue-700 shadow-sm' : 'text-slate-500 hover:text-slate-800'}`}
                    >
                      本月数据
                    </button>
                    <button 
                      onClick={() => setDimension('year')}
                      className={`flex-1 text-center py-1.5 text-[11px] font-bold rounded-lg transition-all ${dimension === 'year' ? 'bg-white text-blue-700 shadow-sm' : 'text-slate-500 hover:text-slate-800'}`}
                    >
                      本年数据
                    </button>
                  </div>

                  <button 
                    onClick={() => setIsDatePickerOpen(true)}
                    className="flex items-center gap-1 px-2.5 py-1.5 bg-blue-50 hover:bg-blue-100 rounded-lg text-blue-600 text-xs font-bold border border-blue-100 transition-all shadow-sm"
                  >
                    <Calendar className="w-3.5 h-3.5" />
                    <span>筛选</span>
                  </button>
                </div>
              </div>
            )}

            {/* 2.3 可滚动主数据区 */}
            <main className="flex-1 overflow-y-auto p-4 pb-20 space-y-4">

              {/* A. 平台总览看板视图 */}
              {activeTab === 'platform' && userRole === 'admin' && (
                <>
                  {/* KPI网格 - 紧凑排版：数值和同比同一行 */}
                  <div className="grid grid-cols-2 gap-3">
                    {/* 总收入 */}
                    <div className="bg-white p-3 rounded-2xl shadow-sm border border-slate-100">
                      <div className="flex items-center justify-between mb-1.5">
                        <span className="text-slate-400 text-[10px] font-bold">总收入 (元)</span>
                        <div className="w-5 h-5 rounded-full bg-emerald-50 flex items-center justify-center text-emerald-500">
                          <DollarSign className="w-3 h-3" />
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-slate-800 text-base font-black tracking-tight font-mono">{currentData.revenue}</span>
                        <span className="inline-flex items-center px-1.5 py-0.5 rounded-full text-[9px] font-bold bg-emerald-50 text-emerald-600 whitespace-nowrap">
                          <TrendingUp className="w-2.5 h-2.5 mr-0.5" />
                          同比 {currentData.revenueTrend}
                        </span>
                      </div>
                    </div>

                    {/* 总客流 */}
                    <div className="bg-white p-3 rounded-2xl shadow-sm border border-slate-100">
                      <div className="flex items-center justify-between mb-1.5">
                        <span className="text-slate-400 text-[10px] font-bold">总客流 (人次)</span>
                        <div className="w-5 h-5 rounded-full bg-blue-50 flex items-center justify-center text-blue-500">
                          <Users className="w-3 h-3" />
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-slate-800 text-base font-black tracking-tight font-mono">{currentData.visitors}</span>
                        <span className="inline-flex items-center px-1.5 py-0.5 rounded-full text-[9px] font-bold bg-emerald-50 text-emerald-600 whitespace-nowrap">
                          <TrendingUp className="w-2.5 h-2.5 mr-0.5" />
                          同比 {currentData.visitorsTrend}
                        </span>
                      </div>
                    </div>

                    {/* 收费客流 */}
                    <div className="bg-white p-3 rounded-2xl shadow-sm border border-slate-100">
                      <div className="flex items-center justify-between mb-1.5">
                        <span className="text-slate-400 text-[10px] font-bold">收费客流 (人次)</span>
                        <div className="w-5 h-5 rounded-full bg-indigo-50 flex items-center justify-center text-indigo-500">
                          <Activity className="w-3 h-3" />
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-slate-800 text-base font-black tracking-tight font-mono">{currentData.paidVisitors}</span>
                        <span className="inline-flex items-center px-1.5 py-0.5 rounded-full text-[9px] font-bold bg-emerald-50 text-emerald-600 whitespace-nowrap">
                          <TrendingUp className="w-2.5 h-2.5 mr-0.5" />
                          同比 {currentData.paidVisitorsTrend}
                        </span>
                      </div>
                    </div>

                    {/* 接待客流 */}
                    <div className="bg-white p-3 rounded-2xl shadow-sm border border-slate-100">
                      <div className="flex items-center justify-between mb-1.5">
                        <span className="text-slate-400 text-[10px] font-bold">接待客流 (人次)</span>
                        <div className="w-5 h-5 rounded-full bg-purple-50 flex items-center justify-center text-purple-500">
                          <Users className="w-3 h-3" />
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-slate-800 text-base font-black tracking-tight font-mono">{currentData.receptionVisitors}</span>
                        <span className="inline-flex items-center px-1.5 py-0.5 rounded-full text-[9px] font-bold bg-emerald-50 text-emerald-600 whitespace-nowrap">
                          <TrendingUp className="w-2.5 h-2.5 mr-0.5" />
                          同比 {currentData.receptionVisitorsTrend}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* 当{dimension === 'year' ? '年' : '月'}度计划达成 */}
                  <div className="bg-white p-4 rounded-2xl shadow-sm border border-slate-100">
                    <div className="flex items-center gap-1.5 mb-3">
                      <span className="w-1 h-3.5 bg-blue-600 rounded-full"></span>
                      <h3 className="text-slate-800 text-xs font-bold tracking-wide">{dimension === 'year' ? '年度计划达成' : '月度计划达成'}</h3>
                    </div>

                    <div className="space-y-3.5">
                      <div className="flex items-center justify-between bg-slate-50 p-2.5 rounded-xl border border-slate-100">
                        <span className="text-slate-400 text-[10px] font-bold">{dimension === 'year' ? '年度计划目标（6月）' : '月度计划目标（6月）'}</span>
                        <span className="text-slate-700 font-extrabold font-mono text-sm">{currentData.budgetRevenue}</span>
                      </div>

                      <div className="space-y-2">
                        <div>
                          <div className="flex justify-between text-[10px] text-slate-500 mb-1">
                            <span>时间进度比 (当前周期已过)</span>
                            <span className="font-bold">{currentData.timeProgress}</span>
                          </div>
                          <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                            <div className="bg-slate-400 h-full rounded-full transition-all duration-500" style={{ width: currentData.timeProgress }}></div>
                          </div>
                        </div>

                        <div>
                          <div className="flex justify-between text-[10px] text-slate-700 mb-1">
                            <span className="font-semibold">实际收入完成率</span>
                            <span className="text-emerald-600 font-bold">{currentData.completionRate}</span>
                          </div>
                          <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                            <div className="bg-emerald-500 h-full rounded-full transition-all duration-500" style={{ width: currentData.completionRate }}></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* 客创单元收入概览（按维度） */}
                  <div className="bg-white p-4 rounded-2xl shadow-sm border border-slate-100">
                    <div className="flex justify-between items-center mb-3">
                      <div className="flex items-center gap-1.5">
                        <span className="w-1.5 h-3.5 bg-blue-600 rounded-full"></span>
                        <h3 className="text-slate-800 text-xs font-bold tracking-wide">客创单元收入概览（{dimension === 'day' ? '本日' : dimension === 'month' ? '本月' : '本年'}）</h3>
                      </div>
                      <span className="text-[10px] text-slate-400">点击卡片可穿透</span>
                    </div>

                    <div className="space-y-2">
                      {activeRankings.map((item, index) => {
                        const IconComponent = item.icon === 'Mountain' ? Mountain :
                                             item.icon === 'Hotel' ? Hotel :
                                             item.icon === 'Waves' ? Waves :
                                             item.icon === 'Ship' ? Ship :
                                             item.icon === 'Anchor' ? Anchor : Activity;
                        
                        return (
                          <div
                            key={item.id}
                            onClick={() => {
                              if (item.id === 'zushan' || item.id === 'xiaozhen') {
                                setActiveTab(item.id);
                                triggerAlert(`已成功跨层穿透进入：${item.name}`);
                              } else {
                                triggerAlert(`当前所在系统：${item.name}`);
                              }
                            }}
                            className="px-3 py-2.5 bg-slate-50 hover:bg-slate-100 active:scale-[0.99] border border-slate-200/60 hover:border-slate-300 rounded-xl cursor-pointer transition-all flex items-center"
                          >
                            <div className="flex items-center gap-2 min-w-0 flex-1">
                              <div className="w-6 h-6 rounded-lg flex items-center justify-center shrink-0" style={{ backgroundColor: item.color + '20' }}>
                                <IconComponent className="w-3.5 h-3.5" style={{ color: item.color }} />
                              </div>
                              <span className="text-xs font-bold text-slate-700 truncate">{item.name}</span>
                            </div>
                            <div className="flex items-center gap-2 shrink-0">
                              <span className="text-xs font-extrabold text-slate-900 font-mono">¥{item.revenue.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
                              <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${item.isUp ? 'bg-emerald-50 text-emerald-600' : 'bg-rose-50 text-rose-600'}`}>
                                同比 {item.trend}
                              </span>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* 备注说明 */}
                  <div className="bg-amber-50 p-4 rounded-2xl shadow-sm border border-amber-200">
                    <div className="flex items-start gap-2">
                      <div className="flex items-center gap-1.5 shrink-0">
                        <span className="w-1.5 h-3.5 bg-amber-600 rounded-full"></span>
                        <h3 className="text-slate-800 text-xs font-bold tracking-wide">备注说明</h3>
                      </div>
                    </div>
                    <div className="mt-3 space-y-2">
                      <p className="text-xs text-slate-700 leading-relaxed">
                        <span className="font-bold text-amber-700">• 特殊收入说明：</span>
                        2025年端午节滨海总收入包括一次性购买浪淘沙船票2000张11万元，一卡通收入8万元。
                      </p>
                      <p className="text-xs text-slate-700 leading-relaxed">
                        <span className="font-bold text-amber-700">• 客流统计说明：</span>
                        客流量和船票收入未含一次性购买浪淘沙船票的2000人次和收入。
                      </p>
                    </div>
                  </div>

                </>
              )}


              {/* 祖山景区子公司看板 */}
              {activeTab === 'zushan' && (
                <ZushanCompany
                  zushanData={zushanData}
                  zushanChannelSales={zushanChannelSales}
                  zushanRevenueStructure={zushanRevenueStructure}
                  zushanProductSales={zushanProductSales}
                  zushanProductPrice={zushanProductPrice}
                  zushanBusinessRevenue={zushanBusinessRevenue}
                  userRole={userRole}
                  setActiveTab={setActiveTab}
                  dimension={dimension}
                />
              )}

              {/* 天女小镇子公司看板 */}
              {activeTab === 'xiaozhen' && (
                <XiaozhenCompany
                  xiaozhenData={xiaozhenData}
                  xiaozhenChannelSales={xiaozhenChannelSales}
                  xiaozhenRevenueStructure={xiaozhenRevenueStructure}
                  xiaozhenBusinessRevenue={xiaozhenBusinessRevenue}
                  xiaozhenParkingData={xiaozhenParkingData}
                  userRole={userRole}
                  setActiveTab={setActiveTab}
                />
              )}

              {/* 海上游公司看板 */}
              {activeTab === 'haishangyou' && (
                <HaishangyouCompany
                  haishangyouData={haishangyouData}
                  haishangyouChannelSales={haishangyouChannelSales}
                  haishangyouRevenueStructure={haishangyouRevenueStructure}
                  haishangyouBusinessRevenue={haishangyouBusinessRevenue}
                  haishangyouShips={haishangyouShips}
                  userRole={userRole}
                  setActiveTab={setActiveTab}
                />
              )}

              {/* 浪淘沙公司看板 */}
              {activeTab === 'langtaosha' && (
                <LangtaoshaCompany
                  langtaoshaData={langtaoshaData}
                  langtaoshaChannelSales={langtaoshaChannelSales}
                  langtaoshaRevenueStructure={langtaoshaRevenueStructure}
                  langtaoshaBusinessRevenue={langtaoshaBusinessRevenue}
                  userRole={userRole}
                  setActiveTab={setActiveTab}
                />
              )}

              {/* 旧的祖山景区JSX - 待删除 */}
              {false && activeTab === 'zushan_old' && (
                <div className="space-y-4">
                  {/* 祖山景区头部信息卡 */}
                  <div className="bg-white p-4 rounded-2xl shadow-sm border border-slate-100">
                    <h2 className="text-lg font-black text-slate-800">祖山景区经营看板</h2>
                  </div>

                  {/* KPI 网格 - 四个数据项 */}
                  <div className="grid grid-cols-2 gap-3">
                    {/* 总收入 */}
                    <div className="bg-white p-3.5 rounded-2xl shadow-sm border border-slate-100 flex flex-col justify-between">
                      <div className="flex items-center justify-between">
                        <span className="text-slate-400 text-[11px] font-bold">总收入 (元)</span>
                        <div className="w-6 h-6 rounded-full bg-emerald-50 flex items-center justify-center text-emerald-500">
                          <DollarSign className="w-3.5 h-3.5" />
                        </div>
                      </div>
                      <div className="my-1.5">
                        <div className="text-slate-800 text-lg font-black tracking-tight whitespace-nowrap overflow-x-auto scrollbar-none font-mono">
                          {zushanData.revenue}
                        </div>
                      </div>
                      <div className="flex items-center gap-1">
                        <span className="inline-flex items-center px-1.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-600">
                          <TrendingUp className="w-2.5 h-2.5 mr-0.5" />
                          同比 {zushanData.revenueTrend}
                        </span>
                      </div>
                    </div>

                    {/* 总客流 */}
                    <div className="bg-white p-3.5 rounded-2xl shadow-sm border border-slate-100 flex flex-col justify-between">
                      <div className="flex items-center justify-between">
                        <span className="text-slate-400 text-[11px] font-bold">总客流 (人次)</span>
                        <div className="w-6 h-6 rounded-full bg-blue-50 flex items-center justify-center text-blue-500">
                          <Users className="w-3.5 h-3.5" />
                        </div>
                      </div>
                      <div className="my-1.5">
                        <div className="text-slate-800 text-lg font-black tracking-tight whitespace-nowrap font-mono">
                          {zushanData.visitors}
                        </div>
                      </div>
                      <div className="flex items-center gap-1">
                        <span className="inline-flex items-center px-1.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-600">
                          <TrendingUp className="w-2.5 h-2.5 mr-0.5" />
                          同比 {zushanData.visitorsTrend}
                        </span>
                      </div>
                    </div>

                    {/* 收费客流 */}
                    <div className="bg-white p-3.5 rounded-2xl shadow-sm border border-slate-100 flex flex-col justify-between">
                      <div className="flex items-center justify-between">
                        <span className="text-slate-400 text-[11px] font-bold">收费客流 (人次)</span>
                        <div className="w-6 h-6 rounded-full bg-indigo-50 flex items-center justify-center text-indigo-500">
                          <Activity className="w-3.5 h-3.5" />
                        </div>
                      </div>
                      <div className="my-1.5">
                        <div className="text-slate-800 text-lg font-black tracking-tight whitespace-nowrap font-mono">
                          {zushanData.paidVisitors}
                        </div>
                      </div>
                      <div className="flex items-center gap-1">
                        <span className="inline-flex items-center px-1.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-600">
                          <TrendingUp className="w-2.5 h-2.5 mr-0.5" />
                          同比 {zushanData.paidVisitorsTrend}
                        </span>
                      </div>
                    </div>

                    {/* 接待客流 */}
                    <div className="bg-white p-3.5 rounded-2xl shadow-sm border border-slate-100 flex flex-col justify-between">
                      <div className="flex items-center justify-between">
                        <span className="text-slate-400 text-[11px] font-bold">接待客流 (人次)</span>
                        <div className="w-6 h-6 rounded-full bg-purple-50 flex items-center justify-center text-purple-500">
                          <Users className="w-3.5 h-3.5" />
                        </div>
                      </div>
                      <div className="my-1.5">
                        <div className="text-slate-800 text-lg font-black tracking-tight whitespace-nowrap font-mono">
                          {zushanData.receptionVisitors}
                        </div>
                      </div>
                      <div className="flex items-center gap-1">
                        <span className="inline-flex items-center px-1.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-600">
                          <TrendingUp className="w-2.5 h-2.5 mr-0.5" />
                          同比 {zushanData.receptionVisitorsTrend}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* 各渠道销售数量及销售收入 - 表格形式 */}
                  <div className="bg-white p-4 rounded-2xl shadow-sm border border-slate-100">
                    <div className="flex justify-between items-center mb-3">
                      <div className="flex items-center gap-1.5">
                        <span className="w-1.5 h-3.5 bg-blue-600 rounded-full"></span>
                        <h3 className="text-slate-800 text-xs font-bold tracking-wide">各渠道销售数量及销售收入</h3>
                      </div>
                      <span className="text-[10px] text-slate-400 font-semibold">实时统计</span>
                    </div>

                    {/* 表格头 */}
                    <div className="grid grid-cols-4 gap-2 mb-2 pb-2 border-b border-slate-200">
                      <div className="text-[10px] text-slate-500 font-bold">渠道</div>
                      <div className="text-[10px] text-slate-500 font-bold text-right">销售数量</div>
                      <div className="text-[10px] text-slate-500 font-bold text-right">销售收入</div>
                      <div className="text-[10px] text-slate-500 font-bold text-center">趋势</div>
                    </div>

                    {/* 表格内容 */}
                    <div className="space-y-1.5">
                      {zushanChannelSales.map((channel, index) => (
                        <div 
                          key={index}
                          className="grid grid-cols-4 gap-2 py-2 hover:bg-slate-50 rounded-lg transition-all"
                        >
                          <div className="flex items-center gap-1.5">
                            <span className={`w-1.5 h-1.5 rounded-full ${channel.bgColor}`}></span>
                            <span className="text-xs font-bold text-slate-700">{channel.name}</span>
                          </div>
                          <div className="text-xs font-mono text-slate-800 text-right font-semibold">
                            {channel.quantity.toLocaleString('en-US')}
                          </div>
                          <div className="text-xs font-mono text-slate-800 text-right font-semibold">
                            ¥{(channel.revenue / 1000).toFixed(1)}K
                          </div>
                          <div className="text-center">
                            <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${channel.isUp ? 'bg-emerald-50 text-emerald-600' : 'bg-rose-50 text-rose-600'}`}>
                              {channel.trend}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* 收入结构分析 - 表格形式 */}
                  <div className="bg-white p-4 rounded-2xl shadow-sm border border-slate-100">
                    <div className="flex justify-between items-center mb-3">
                      <div className="flex items-center gap-1.5">
                        <span className="w-1.5 h-3.5 bg-purple-600 rounded-full"></span>
                        <h3 className="text-slate-800 text-xs font-bold tracking-wide">收入结构分析</h3>
                      </div>
                      <span className="text-[10px] text-slate-400 font-semibold">占比结构</span>
                    </div>

                    {/* 表格头 */}
                    <div className="grid grid-cols-4 gap-2 mb-2 pb-2 border-b border-slate-200">
                      <div className="text-[10px] text-slate-500 font-bold">类别</div>
                      <div className="text-[10px] text-slate-500 font-bold text-right">收入金额</div>
                      <div className="text-[10px] text-slate-500 font-bold text-right">占比</div>
                      <div className="text-[10px] text-slate-500 font-bold text-center">趋势</div>
                    </div>

                    {/* 表格内容 */}
                    <div className="space-y-1.5">
                      {zushanRevenueStructure.map((item, index) => (
                        <div 
                          key={index}
                          className="grid grid-cols-4 gap-2 py-2 hover:bg-slate-50 rounded-lg transition-all"
                        >
                          <div className="flex items-center gap-1.5">
                            <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: item.color }}></span>
                            <span className="text-xs font-bold text-slate-700">{item.name}</span>
                          </div>
                          <div className="text-xs font-mono text-slate-800 text-right font-semibold">
                            ¥{(item.value / 1000).toFixed(1)}K
                          </div>
                          <div className="text-xs font-mono text-slate-800 text-right font-semibold">
                            {item.ratio}%
                          </div>
                          <div className="text-center">
                            <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${item.isUp ? 'bg-emerald-50 text-emerald-600' : 'bg-rose-50 text-rose-600'}`}>
                              {item.trend}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* 产品销售图表 */}
                  <div className="bg-white p-4 rounded-2xl shadow-sm border border-slate-100">
                    <div className="flex justify-between items-center mb-3">
                      <div className="flex items-center gap-1.5">
                        <span className="w-1.5 h-3.5 bg-cyan-600 rounded-full"></span>
                        <h3 className="text-slate-800 text-xs font-bold tracking-wide">产品销售图表</h3>
                      </div>
                      <span className="text-[10px] text-slate-400 font-semibold">门票类产品</span>
                    </div>

                    {/* 表格头 */}
                    <div className="grid grid-cols-5 gap-2 mb-2 pb-2 border-b border-slate-200">
                      <div className="text-[10px] text-slate-500 font-bold">产品名称</div>
                      <div className="text-[10px] text-slate-500 font-bold text-right">销售数量</div>
                      <div className="text-[10px] text-slate-500 font-bold text-right">销售收入</div>
                      <div className="text-[10px] text-slate-500 font-bold text-right">单价</div>
                      <div className="text-[10px] text-slate-500 font-bold text-center">趋势</div>
                    </div>

                    {/* 表格内容 */}
                    <div className="space-y-1.5">
                      {zushanProductSales.map((product, index) => (
                        <div 
                          key={index}
                          className="grid grid-cols-5 gap-2 py-2 hover:bg-slate-50 rounded-lg transition-all"
                        >
                          <div className="flex items-center gap-1.5">
                            <span className="w-1.5 h-1.5 rounded-full bg-cyan-500"></span>
                            <span className="text-xs font-bold text-slate-700">{product.name}</span>
                          </div>
                          <div className="text-xs font-mono text-slate-800 text-right font-semibold">
                            {product.quantity.toLocaleString('en-US')}
                          </div>
                          <div className="text-xs font-mono text-slate-800 text-right font-semibold">
                            ¥{(product.revenue / 1000).toFixed(1)}K
                          </div>
                          <div className="text-xs font-mono text-slate-800 text-right font-semibold">
                            ¥{product.price}
                          </div>
                          <div className="text-center">
                            <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${product.isUp ? 'bg-emerald-50 text-emerald-600' : 'bg-rose-50 text-rose-600'}`}>
                              {product.trend}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* 产品客单 */}
                  <div className="bg-white p-4 rounded-2xl shadow-sm border border-slate-100">
                    <div className="flex justify-between items-center mb-3">
                      <div className="flex items-center gap-1.5">
                        <span className="w-1.5 h-3.5 bg-indigo-600 rounded-full"></span>
                        <h3 className="text-slate-800 text-xs font-bold tracking-wide">产品客单</h3>
                      </div>
                      <span className="text-[10px] text-slate-400 font-semibold">平均价格</span>
                    </div>

                    <div className="bg-gradient-to-br from-indigo-50 to-blue-50 p-4 rounded-xl border border-indigo-100">
                      <div className="flex items-center justify-between">
                        <div>
                          <span className="text-xs text-slate-500 font-medium block mb-1">祖山门票客单</span>
                          <div className="flex items-baseline gap-2">
                            <span className="text-2xl font-black text-indigo-600 font-mono">¥{zushanProductPrice.ticketPrice}</span>
                            <span className="text-xs text-slate-400 font-medium">/人次</span>
                          </div>
                        </div>
                        <div className="text-right">
                          <span className={`inline-flex items-center px-2 py-1 rounded-lg text-xs font-bold ${zushanProductPrice.isUp ? 'bg-emerald-100 text-emerald-700' : 'bg-rose-100 text-rose-700'}`}>
                            <TrendingUp className="w-3 h-3 mr-0.5" />
                            同比 {zushanProductPrice.trend}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* 商业收入情况 */}
                  <div className="bg-white p-4 rounded-2xl shadow-sm border border-slate-100">
                    <div className="flex justify-between items-center mb-3">
                      <div className="flex items-center gap-1.5">
                        <span className="w-1.5 h-3.5 bg-emerald-600 rounded-full"></span>
                        <h3 className="text-slate-800 text-xs font-bold tracking-wide">商业收入情况</h3>
                      </div>
                      <span className="text-[10px] text-slate-400 font-semibold">自营/第三方</span>
                    </div>

                    {/* 表格头 */}
                    <div className="grid grid-cols-5 gap-2 mb-2 pb-2 border-b border-slate-200">
                      <div className="text-[10px] text-slate-500 font-bold">店铺名称</div>
                      <div className="text-[10px] text-slate-500 font-bold text-center">类型</div>
                      <div className="text-[10px] text-slate-500 font-bold text-right">交易笔数</div>
                      <div className="text-[10px] text-slate-500 font-bold text-right">交易额</div>
                      <div className="text-[10px] text-slate-500 font-bold text-center">趋势</div>
                    </div>

                    {/* 表格内容 */}
                    <div className="space-y-1.5">
                      {zushanBusinessRevenue.map((business, index) => (
                        <div 
                          key={index}
                          className={`grid grid-cols-5 gap-2 py-2 rounded-lg transition-all ${
                            business.countInRevenue 
                              ? 'hover:bg-emerald-50/50 border-l-2 border-emerald-500 pl-2' 
                              : 'hover:bg-slate-50 border-l-2 border-slate-300 pl-2 opacity-75'
                          }`}
                        >
                          <div className="flex items-center gap-1.5">
                            <span className="text-xs font-bold text-slate-700">{business.name}</span>
                          </div>
                          <div className="text-center">
                            <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${
                              business.type === '自营' 
                                ? 'bg-emerald-50 text-emerald-700' 
                                : 'bg-slate-100 text-slate-600'
                            }`}>
                              {business.type}
                            </span>
                          </div>
                          <div className="text-xs font-mono text-slate-800 text-right font-semibold">
                            {business.transactions.toLocaleString('en-US')}
                          </div>
                          <div className="text-xs font-mono text-slate-800 text-right font-semibold">
                            ¥{(business.revenue / 1000).toFixed(1)}K
                            {!business.countInRevenue && (
                              <span className="text-[9px] text-slate-400 ml-1">参考</span>
                            )}
                          </div>
                          <div className="text-center">
                            <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${business.isUp ? 'bg-emerald-50 text-emerald-600' : 'bg-rose-50 text-rose-600'}`}>
                              {business.trend}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* 说明 */}
                    <div className="mt-3 pt-3 border-t border-slate-100 flex items-center gap-3 text-[10px] text-slate-400">
                      <div className="flex items-center gap-1">
                        <span className="w-2 h-2 rounded-sm bg-emerald-500"></span>
                        <span>自营店铺流水计入收入</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <span className="w-2 h-2 rounded-sm bg-slate-300"></span>
                        <span>第三方仅作参考</span>
                      </div>
                    </div>
                  </div>

                  {userRole === 'admin' && (
                    <button 
                      onClick={() => setActiveTab('platform')}
                      className="w-full bg-slate-200 hover:bg-slate-300 text-slate-700 py-3 rounded-xl text-xs font-bold transition-all"
                    >
                      返回平台总览
                    </button>
                  )}
                </div>
              )}


              {/* 我的/关于 */}
              {activeTab === 'mine' && (
                <div className="space-y-4">
                  {/* 用户信息卡片 */}
                  <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex flex-col items-center text-center">
                    <div className="w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 mb-3">
                      <User className="w-8 h-8" />
                    </div>
                    <h3 className="text-slate-800 text-base font-bold">{username || 'admin'}</h3>
                    <p className="text-slate-400 text-xs mt-1">{getRoleName(userRole)}</p>

                    <div className="w-full border-t border-slate-100 my-4 pt-4 grid grid-cols-2 gap-2 text-left">
                      <div className="bg-slate-50 p-2.5 rounded-xl">
                        <span className="text-[10px] text-slate-400 block">系统状态</span>
                        <span className="text-xs font-bold text-emerald-600 flex items-center gap-1 mt-0.5">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                          在线
                        </span>
                      </div>
                      <div className="bg-slate-50 p-2.5 rounded-xl">
                        <span className="text-[10px] text-slate-400 block">数据同步</span>
                        <span className="text-xs font-bold text-blue-600 flex items-center gap-1 mt-0.5">
                          实时联动
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* 功能菜单 */}
                  <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
                    <button 
                      onClick={() => triggerAlert('账户设置功能开发中')}
                      className="w-full flex items-center justify-between p-4 hover:bg-slate-50 transition-all border-b border-slate-100"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center text-blue-600">
                          <User className="w-4 h-4" />
                        </div>
                        <span className="text-sm font-semibold text-slate-700">账户设置</span>
                      </div>
                      <ChevronRight className="w-4 h-4 text-slate-400" />
                    </button>

                    <button 
                      onClick={() => triggerAlert('通知中心功能开发中')}
                      className="w-full flex items-center justify-between p-4 hover:bg-slate-50 transition-all border-b border-slate-100"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-amber-50 flex items-center justify-center text-amber-600">
                          <Bell className="w-4 h-4" />
                        </div>
                        <span className="text-sm font-semibold text-slate-700">通知中心</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="px-1.5 py-0.5 bg-red-500 text-white text-[10px] font-bold rounded-full">3</span>
                        <ChevronRight className="w-4 h-4 text-slate-400" />
                      </div>
                    </button>

                    <button 
                      onClick={() => triggerAlert('帮助中心功能开发中')}
                      className="w-full flex items-center justify-between p-4 hover:bg-slate-50 transition-all border-b border-slate-100"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-emerald-50 flex items-center justify-center text-emerald-600">
                          <HelpCircle className="w-4 h-4" />
                        </div>
                        <span className="text-sm font-semibold text-slate-700">帮助中心</span>
                      </div>
                      <ChevronRight className="w-4 h-4 text-slate-400" />
                    </button>

                    <button 
                      onClick={() => triggerAlert('系统设置功能开发中')}
                      className="w-full flex items-center justify-between p-4 hover:bg-slate-50 transition-all"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-slate-100 flex items-center justify-center text-slate-600">
                          <Settings className="w-4 h-4" />
                        </div>
                        <span className="text-sm font-semibold text-slate-700">系统设置</span>
                      </div>
                      <ChevronRight className="w-4 h-4 text-slate-400" />
                    </button>
                  </div>

                  {/* 退出登录按钮 */}
                  <button 
                    onClick={handleLogout}
                    className="w-full bg-white hover:bg-rose-50 text-rose-600 py-3.5 rounded-2xl text-sm font-bold transition-all flex justify-center items-center gap-2 border border-slate-100 shadow-sm"
                  >
                    <LogOut className="w-4 h-4" />
                    退出登录
                  </button>

                  {/* 关于信息 */}
                  <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-100 text-center">
                    <h4 className="text-xs font-bold text-slate-700">新朝旅游移动驾驶舱项目</h4>
                    <p className="text-[11px] text-slate-400 mt-1 leading-relaxed">
                      版本号：v2.3.0-Production<br/>
                      本系统专为秦皇岛新朝旅游开发，实现多业态数据联通与快速辅助决策。
                    </p>
                    <div className="mt-4 pt-4 border-t border-slate-100 text-[10px] text-slate-400">
                      技术支持：北京华景乐游科技股份有限公司
                    </div>
                  </div>
                </div>
              )}

            </main>

            {/* 底部导航 */}
            <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-slate-200 h-16 flex items-center justify-around pb-1.5 z-40">
              
              {/* 平台总览 Tab */}
              {userRole === 'admin' && (
                <button 
                  onClick={() => setActiveTab('platform')}
                  className={`flex flex-col items-center gap-1 transition-all ${activeTab === 'platform' ? 'text-blue-600 font-bold' : 'text-slate-400 hover:text-slate-600'}`}
                >
                  <BarChart2 className="w-5 h-5" />
                  <span className="text-[10px]">平台总览</span>
                </button>
              )}

              {/* 祖山景区 Tab */}
              {(userRole === 'admin' || userRole === 'zushan' || userRole === 'ticket' || userRole === 'suodao') && (
                <button 
                  onClick={() => setActiveTab('zushan')}
                  className={`flex flex-col items-center gap-1 transition-all ${activeTab === 'zushan' ? 'text-emerald-600 font-bold' : 'text-slate-400 hover:text-slate-600'}`}
                >
                  <Mountain className="w-5 h-5" />
                  <span className="text-[10px]">祖山景区</span>
                </button>
              )}

              {/* 天女小镇 Tab */}
              {(userRole === 'admin' || userRole === 'xiaozhen') && (
                <button 
                  onClick={() => setActiveTab('xiaozhen')}
                  className={`flex flex-col items-center gap-1 transition-all ${activeTab === 'xiaozhen' ? 'text-amber-600 font-bold' : 'text-slate-400 hover:text-slate-600'}`}
                >
                  <Hotel className="w-5 h-5" />
                  <span className="text-[10px]">天女小镇</span>
                </button>
              )}

              {/* 海上游 Tab */}
              {userRole === 'admin' && (
                <button 
                  onClick={() => setActiveTab('haishangyou')}
                  className={`flex flex-col items-center gap-1 transition-all ${activeTab === 'haishangyou' ? 'text-cyan-600 font-bold' : 'text-slate-400 hover:text-slate-600'}`}
                >
                  <Ship className="w-5 h-5" />
                  <span className="text-[10px]">海上游</span>
                </button>
              )}

              {/* 浪淘沙 Tab */}
              {userRole === 'admin' && (
                <button 
                  onClick={() => setActiveTab('langtaosha')}
                  className={`flex flex-col items-center gap-1 transition-all ${activeTab === 'langtaosha' ? 'text-orange-600 font-bold' : 'text-slate-400 hover:text-slate-600'}`}
                >
                  <Waves className="w-5 h-5" />
                  <span className="text-[10px]">浪淘沙</span>
                </button>
              )}

              {/* 我的 Tab */}
              <button 
                onClick={() => setActiveTab('mine')}
                className={`flex flex-col items-center gap-1 transition-all ${activeTab === 'mine' ? 'text-blue-600 font-bold' : 'text-slate-400 hover:text-slate-600'}`}
              >
                <User className="w-5 h-5" />
                <span className="text-[10px]">我的</span>
              </button>
            </nav>
          </div>
        )}
      </div>
    </div>
  );
}