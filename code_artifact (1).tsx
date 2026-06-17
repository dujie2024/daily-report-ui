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
  ChevronLeft
} from 'lucide-react';

export default function App() {
  // 登录与权限状态
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userRole, setUserRole] = useState('admin'); // admin | zushan | xiaozhen | ticket | suodao
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [activeTab, setActiveTab] = useState('platform'); // platform | zushan | xiaozhen | mine
  const [dimension, setDimension] = useState('month'); // day | month | year
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
      { id: 'zushan', name: '祖山景区', revenue: getRankedVal(proportions.zushan), ratio: 44, trend: '+5.2%', isUp: true, bg: 'from-blue-500 to-indigo-600', color: '#3b82f6' },
      { id: 'xiaozhen', name: '天女小镇', revenue: getRankedVal(proportions.xiaozhen), ratio: 19, trend: '+1.8%', isUp: true, bg: 'from-emerald-500 to-teal-600', color: '#10b981' },
      { id: 'cruise', name: '海上游船', revenue: getRankedVal(proportions.cruise), ratio: 20, trend: '-0.5%', isUp: false, bg: 'from-amber-400 to-orange-500', color: '#f59e0b' },
      { id: 'beach', name: '浪淘沙', revenue: getRankedVal(proportions.beach), ratio: 10, trend: '+3.1%', isUp: true, bg: 'from-rose-500 to-pink-500', color: '#ef4444' },
      { id: 'qihang', name: '启航公司', revenue: getRankedVal(proportions.qihang), ratio: 7, trend: '+4.2%', isUp: true, bg: 'from-cyan-400 to-blue-500', color: '#06b6d4' },
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

  // 祖山客创单元明细数据
  const zushanDetails = [
    { name: '售票处一窗口', ticketCount: '3,842 张', revenue: '345,780.00', trend: '+4.5%', isUp: true },
    { name: '祖山索道段', ticketCount: '4,102 人次', revenue: '410,200.00', trend: '+6.1%', isUp: true },
    { name: '天女峰观光车', ticketCount: '2,950 人次', revenue: '88,500.00', trend: '-1.2%', isUp: false },
    { name: '景区餐饮/文创', ticketCount: '5,201 笔', revenue: '121,300.00', trend: '+8.3%', isUp: true },
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
          <div className="absolute inset-0 bg-black/60 z-50 flex items-end justify-center transition-all animate-fade-in">
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
                <div className="flex items-center justify-between mb-2">
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

                <div 
                  onClick={() => setIsDatePickerOpen(true)}
                  className="flex items-center justify-between text-slate-500 text-xs bg-blue-50/40 px-3 py-2 rounded-xl cursor-pointer hover:bg-blue-50/70 active:scale-[0.99] transition-all border border-blue-50"
                >
                  <div className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-ping"></span>
                    <span className="font-extrabold tracking-wide text-[11px] font-mono text-slate-700">{currentData.dateRange}</span>
                  </div>
                  <ChevronRight className="w-3.5 h-3.5 text-blue-400" />
                </div>
              </div>
            )}

            {/* 2.3 可滚动主数据区 */}
            <main className="flex-1 overflow-y-auto p-4 space-y-4">

              {/* A. 平台总览看板视图 */}
              {activeTab === 'platform' && userRole === 'admin' && (
                <>
                  {/* KPI网格 (客流(人) 彻底改为 客流(人次)) */}
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
                          {currentData.revenue}
                        </div>
                      </div>
                      <div className="flex items-center gap-1">
                        <span className="inline-flex items-center px-1.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-600">
                          <TrendingUp className="w-2.5 h-2.5 mr-0.5" />
                          同比 {currentData.revenueTrend}
                        </span>
                      </div>
                    </div>

                    {/* 总客流 (人) -> (人次) */}
                    <div className="bg-white p-3.5 rounded-2xl shadow-sm border border-slate-100 flex flex-col justify-between">
                      <div className="flex items-center justify-between">
                        <span className="text-slate-400 text-[11px] font-bold">总客流 (人次)</span>
                        <div className="w-6 h-6 rounded-full bg-blue-50 flex items-center justify-center text-blue-500">
                          <Users className="w-3.5 h-3.5" />
                        </div>
                      </div>
                      <div className="my-1.5">
                        <div className="text-slate-800 text-lg font-black tracking-tight whitespace-nowrap font-mono">
                          {currentData.visitors}
                        </div>
                      </div>
                      <div className="flex items-center gap-1">
                        <span className="inline-flex items-center px-1.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-600">
                          <TrendingUp className="w-2.5 h-2.5 mr-0.5" />
                          同比 {currentData.visitorsTrend}
                        </span>
                      </div>
                    </div>

                    {/* 收费客流 (人) -> (人次) */}
                    <div className="bg-white p-3.5 rounded-2xl shadow-sm border border-slate-100 flex flex-col justify-between">
                      <div className="flex items-center justify-between">
                        <span className="text-slate-400 text-[11px] font-bold">收费客流 (人次)</span>
                        <div className="w-6 h-6 rounded-full bg-indigo-50 flex items-center justify-center text-indigo-500">
                          <Activity className="w-3.5 h-3.5" />
                        </div>
                      </div>
                      <div className="my-1.5">
                        <div className="text-slate-800 text-lg font-black tracking-tight whitespace-nowrap font-mono">
                          {currentData.paidVisitors}
                        </div>
                      </div>
                      <div className="flex items-center gap-1">
                        <span className="inline-flex items-center px-1.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-600">
                          <TrendingUp className="w-2.5 h-2.5 mr-0.5" />
                          同比 {currentData.paidVisitorsTrend}
                        </span>
                      </div>
                    </div>

                    {/* 接待客流 (人) -> (人次) */}
                    <div className="bg-white p-3.5 rounded-2xl shadow-sm border border-slate-100 flex flex-col justify-between">
                      <div className="flex items-center justify-between">
                        <span className="text-slate-400 text-[11px] font-bold">接待客流 (人次)</span>
                        <div className="w-6 h-6 rounded-full bg-purple-50 flex items-center justify-center text-purple-500">
                          <Users className="w-3.5 h-3.5" />
                        </div>
                      </div>
                      <div className="my-1.5">
                        <div className="text-slate-800 text-lg font-black tracking-tight whitespace-nowrap font-mono">
                          {currentData.receptionVisitors}
                        </div>
                      </div>
                      <div className="flex items-center gap-1">
                        <span className="inline-flex items-center px-1.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-600">
                          <TrendingUp className="w-2.5 h-2.5 mr-0.5" />
                          同比 {currentData.receptionVisitorsTrend}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* 预算与计划执行分析 (实际销售完成率 -> 实际收入完成率; 领先和预计月底完成率去掉) */}
                  <div className="bg-white p-4 rounded-2xl shadow-sm border border-slate-100">
                    <div className="flex justify-between items-center mb-3">
                      <div className="flex items-center gap-1.5">
                        <span className="w-1 h-3.5 bg-blue-600 rounded-full"></span>
                        <h3 className="text-slate-800 text-xs font-bold tracking-wide">月度计划执行进度</h3>
                      </div>
                      <span className="text-[10px] text-slate-400 font-semibold">当期基准预算</span>
                    </div>

                    <div className="space-y-3.5">
                      <div className="grid grid-cols-2 gap-2 text-xs bg-slate-50 p-2.5 rounded-xl border border-slate-100">
                        <div>
                          <span className="text-slate-400 text-[10px] block">预算目标 (元)</span>
                          <span className="text-slate-700 font-extrabold font-mono text-sm">{currentData.budgetRevenue}</span>
                        </div>
                        <div className="text-right">
                          <span className="text-slate-400 text-[10px] block">当前达成率</span>
                          <span className="text-blue-600 font-black text-sm">{currentData.completionRate}</span>
                        </div>
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

                        {/* 修正：实际销售完成率 -> 实际收入完成率 */}
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

                  {/* 4. 子公司收入贡献排行 -> 客创单元收入概览，名称简化且移除多余解释 */}
                  <div className="bg-white p-4 rounded-2xl shadow-sm border border-slate-100">
                    <div className="flex justify-between items-center mb-3">
                      <div className="flex items-center gap-1.5">
                        <span className="w-1.5 h-3.5 bg-blue-600 rounded-full"></span>
                        <h3 className="text-slate-800 text-xs font-bold tracking-wide">客创单元收入概览</h3>
                      </div>
                      <span className="text-[10px] text-slate-400">点击卡片可穿透</span>
                    </div>

                    <div className="space-y-3">
                      {activeRankings.map((item, index) => (
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
                          className="p-3 bg-slate-50 hover:bg-slate-100 active:scale-[0.99] border border-slate-200/60 hover:border-slate-300 rounded-xl cursor-pointer transition-all flex flex-col gap-2"
                        >
                          <div className="flex justify-between items-center">
                            <div className="flex items-center gap-2">
                              <span className="w-5 h-5 rounded bg-slate-200 text-[11px] font-black flex items-center justify-center text-slate-600">
                                {index + 1}
                              </span>
                              <span className="text-xs font-bold text-slate-700">{item.name}</span>
                            </div>
                            <span className="text-xs font-extrabold text-slate-900 font-mono">¥{item.revenue.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
                          </div>

                          <div className="flex items-center gap-3">
                            <div className="flex-1 bg-slate-200 h-1.5 rounded-full overflow-hidden">
                              <div className={`h-full rounded-full bg-gradient-to-r ${item.bg}`} style={{ width: `${item.ratio}%` }}></div>
                            </div>
                            <div className="flex items-center gap-1.5 shrink-0">
                              <span className="text-[10px] text-slate-400 font-bold">占比 {item.ratio}%</span>
                              <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${item.isUp ? 'bg-emerald-50 text-emerald-600' : 'bg-rose-50 text-rose-600'}`}>
                                {item.trend}
                              </span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* 5. 收入结构分析 */}
                  <div className="bg-white p-4 rounded-2xl shadow-sm border border-slate-100">
                    <div className="flex justify-between items-center mb-3">
                      <div className="flex items-center gap-1.5">
                        <span className="w-1.5 h-3.5 bg-blue-600 rounded-full"></span>
                        <h3 className="text-slate-800 text-xs font-bold tracking-wide">收入结构分析</h3>
                      </div>
                    </div>

                    <div className="text-center font-black text-slate-700 text-sm py-1 border-b border-slate-50 mb-4">
                      单位收入对比 (占比结构)
                    </div>

                    {/* 圆环图与中心数值区域 */}
                    <div className="flex justify-center items-center relative py-2">
                      {renderDonutChart(activeRankings, totalRevVal)}
                      
                      {/* 圈内绝对定位文本 */}
                      <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                        <span className="text-[10px] text-slate-400 font-bold">总收入</span>
                        <span className="text-xs font-black text-slate-800 mt-0.5 font-mono">
                          ¥{totalRevVal.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                        </span>
                      </div>
                    </div>

                    {/* 动态比例色块说明列表 */}
                    <div className="grid grid-cols-2 gap-2 pt-2">
                      {activeRankings.map((company) => (
                        <div key={company.id} className="flex items-center gap-2 p-2 bg-slate-50 rounded-lg border border-slate-100 text-[11px]">
                          <span className="w-2.5 h-2.5 rounded-full shrink-0" style={{ backgroundColor: company.color }}></span>
                          <span className="text-slate-500 font-medium truncate flex-1">{company.name}</span>
                          <span className="font-extrabold text-slate-800 font-mono text-right">{company.ratio}%</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* 6. 按渠道分析 */}
                  <div className="bg-white p-4 rounded-2xl shadow-sm border border-slate-100">
                    <div className="flex justify-between items-center mb-3">
                      <div className="flex items-center gap-1.5">
                        <span className="w-1.5 h-3.5 bg-blue-600 rounded-full"></span>
                        <h3 className="text-slate-800 text-xs font-bold tracking-wide">按渠道分析</h3>
                      </div>
                    </div>

                    {/* 经营单元选择栏 */}
                    <div className="flex gap-1.5 overflow-x-auto pb-2 pt-1 scrollbar-none border-b border-slate-50 mb-4">
                      {activeRankings.map((co) => (
                        <button
                          key={co.id}
                          onClick={() => setSelectedAnalysisCompany(co.id)}
                          className={`px-3 py-1.5 rounded-lg text-xs font-black whitespace-nowrap transition-all border ${
                            selectedAnalysisCompany === co.id 
                              ? 'bg-blue-600 text-white border-blue-600 shadow-md shadow-blue-500/10' 
                              : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'
                          }`}
                        >
                          {co.name}
                        </button>
                      ))}
                    </div>

                    <div className="text-center font-black text-slate-700 text-sm mb-4">
                      渠道收入结构对比
                    </div>

                    {/* 渠道对比圆环图 */}
                    <div className="flex justify-center items-center relative py-2">
                      {renderDonutChart(currentChannels, currentChannels.reduce((sum, item) => sum + item.value, 0))}
                      
                      {/* 圈内绝对定位文本 */}
                      <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                        <span className="text-[10px] text-slate-400 font-bold">总收入</span>
                        <span className="text-xs font-black text-slate-800 mt-0.5 font-mono">
                          ¥{currentChannels.reduce((sum, item) => sum + item.value, 0).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                        </span>
                      </div>
                    </div>

                    {/* 渠道图例 */}
                    <div className="grid grid-cols-2 gap-2 pt-1">
                      {currentChannels.map((ch, idx) => (
                        <div key={idx} className="flex items-center gap-2 p-2 bg-slate-50 rounded-lg border border-slate-100 text-[11px]">
                          <span className="w-2.5 h-2.5 rounded-full shrink-0" style={{ backgroundColor: ch.color }}></span>
                          <span className="text-slate-500 font-medium truncate flex-1">{ch.name}</span>
                          <span className="font-extrabold text-slate-800 font-mono text-right">{ch.ratio}%</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </>
              )}


              {/* 祖山景区子公司看板 */}
              {activeTab === 'zushan' && (
                <div className="space-y-4">
                  <div className="bg-gradient-to-r from-teal-800 to-emerald-900 p-4 rounded-2xl text-white shadow-md relative overflow-hidden">
                    <div className="absolute right-0 bottom-0 translate-x-1/4 translate-y-1/4 opacity-10">
                      <MapPin className="w-40 h-40" />
                    </div>
                    <div className="relative z-10">
                      <div className="flex items-center gap-1 text-[10px] bg-white/10 w-fit px-2 py-0.5 rounded-full mb-2">
                        <MapPin className="w-3 h-3 text-emerald-300" />
                        <span>秦皇岛 · 祖山国家森林公园</span>
                      </div>
                      <h2 className="text-lg font-black">祖山景区经营看板</h2>
                      <p className="text-slate-200 text-xs mt-1">
                        运营数据健康度良好，当前客流处于高位区间。
                      </p>

                      <div className="grid grid-cols-2 gap-4 mt-4 pt-4 border-t border-white/10">
                        <div>
                          <span className="text-slate-300 text-[10px] block">当前收入 (元)</span>
                          <span className="text-lg font-black font-mono">¥1,284,500.00</span>
                        </div>
                        <div>
                          <span className="text-slate-300 text-[10px] block">客运总量 (人次)</span>
                          <span className="text-lg font-black font-mono">14,205</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white p-4 rounded-2xl shadow-sm border border-slate-100">
                    <div className="flex justify-between items-center mb-3">
                      <div className="flex items-center gap-1.5">
                        <span className="w-1.5 h-3.5 bg-emerald-600 rounded-full"></span>
                        <h3 className="text-slate-800 text-xs font-bold">下辖客创单元经营贡献</h3>
                      </div>
                      <span className="text-[10px] text-slate-400">实时统计</span>
                    </div>

                    <div className="space-y-3">
                      {zushanDetails.map((unit, index) => (
                        <div 
                          key={index} 
                          onClick={() => triggerAlert(`已锁定：${unit.name} 详情。`)}
                          className="p-3 bg-slate-50 hover:bg-slate-100 border border-slate-150 rounded-xl transition-all flex items-center justify-between cursor-pointer"
                        >
                          <div>
                            <div className="flex items-center gap-1.5">
                              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                              <span className="text-xs font-bold text-slate-700">{unit.name}</span>
                            </div>
                            <span className="text-[10px] text-slate-400 mt-1 block">客流累计: {unit.ticketCount}</span>
                          </div>
                          
                          <div className="text-right">
                            <span className="text-xs font-extrabold text-slate-800 font-mono block">¥{unit.revenue}</span>
                            <span className={`text-[9px] font-bold inline-block px-1 rounded ${unit.isUp ? 'bg-emerald-50 text-emerald-600' : 'bg-rose-50 text-rose-600'}`}>
                              {unit.trend}
                            </span>
                          </div>
                        </div>
                      ))}
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


              {/* 天女小镇子公司看板 */}
              {activeTab === 'xiaozhen' && (
                <div className="space-y-4">
                  <div className="bg-gradient-to-r from-amber-700 to-orange-800 p-4 rounded-2xl text-white shadow-md relative overflow-hidden">
                    <div className="absolute right-0 bottom-0 translate-x-1/4 translate-y-1/4 opacity-10">
                      <Compass className="w-40 h-40" />
                    </div>
                    <div className="relative z-10">
                      <div className="flex items-center gap-1 text-[10px] bg-white/10 w-fit px-2 py-0.5 rounded-full mb-2">
                        <MapPin className="w-3 h-3 text-amber-300" />
                        <span>秦皇岛 · 天女小镇康养度假区</span>
                      </div>
                      <h2 className="text-lg font-black">天女小镇经营看板</h2>
                      <p className="text-slate-200 text-xs mt-1">
                        温泉、汤泉及民俗康养板块销售稳步增长。
                      </p>

                      <div className="grid grid-cols-2 gap-4 mt-4 pt-4 border-t border-white/10">
                        <div>
                          <span className="text-slate-300 text-[10px] block">当前收入 (元)</span>
                          <span className="text-lg font-black font-mono">¥645,800.00</span>
                        </div>
                        <div>
                          <span className="text-slate-300 text-[10px] block">接待人次 (人次)</span>
                          <span className="text-lg font-black font-mono">7,842</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white p-4 rounded-2xl shadow-sm border border-slate-100">
                    <div className="flex justify-between items-center mb-3">
                      <div className="flex items-center gap-1.5">
                        <span className="w-1.5 h-3.5 bg-amber-600 rounded-full"></span>
                        <h3 className="text-slate-800 text-xs font-bold">小镇核心消费结构</h3>
                      </div>
                      <span className="text-[10px] text-slate-400 font-semibold">比重排行</span>
                    </div>

                    <div className="space-y-3">
                      <div className="p-3 bg-slate-50 rounded-xl flex justify-between items-center">
                        <span className="text-xs font-bold text-slate-700">天女汤泉温泉康养</span>
                        <div className="text-right">
                          <span className="text-xs font-extrabold text-slate-800 font-mono block">¥384,500.00</span>
                          <span className="text-[9px] text-slate-400 font-bold">占比 59.5%</span>
                        </div>
                      </div>

                      <div className="p-3 bg-slate-50 rounded-xl flex justify-between items-center">
                        <span className="text-xs font-bold text-slate-700">山谷民宿特种客房</span>
                        <div className="text-right">
                          <span className="text-xs font-extrabold text-slate-800 font-mono block">¥182,300.00</span>
                          <span className="text-[9px] text-slate-400 font-bold">占比 28.2%</span>
                        </div>
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

                    <button 
                      onClick={handleLogout}
                      className="w-full bg-rose-50 hover:bg-rose-100 text-rose-600 py-3 rounded-xl text-xs font-bold transition-all flex justify-center items-center gap-1.5"
                    >
                      <LogOut className="w-4 h-4" />
                      退出登录
                    </button>
                  </div>

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
            <nav className="bg-white border-t border-slate-200 shrink-0 h-16 flex items-center justify-around pb-1.5 z-40">
              
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
                  <Compass className="w-5 h-5" />
                  <span className="text-[10px]">祖山景区</span>
                </button>
              )}

              {/* 天女小镇 Tab */}
              {(userRole === 'admin' || userRole === 'xiaozhen') && (
                <button 
                  onClick={() => setActiveTab('xiaozhen')}
                  className={`flex flex-col items-center gap-1 transition-all ${activeTab === 'xiaozhen' ? 'text-amber-600 font-bold' : 'text-slate-400 hover:text-slate-600'}`}
                >
                  <Sliders className="w-5 h-5" />
                  <span className="text-[10px]">天女小镇</span>
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