import { useState } from 'react';
import { DollarSign, Users, Activity, UserCheck, TrendingUp } from 'lucide-react';

export const HaishangyouCompany = ({ 
  haishangyouData, 
  haishangyouChannelSales, 
  haishangyouRevenueStructure,
  haishangyouBusinessRevenue,
  haishangyouShips,
  userRole,
  setActiveTab 
}) => {
  // 收入结构筛选状态：total-总体, ship1-浪淘沙号, ship2-寻仙2号, ship3-求仙6号
  const [revenueFilter, setRevenueFilter] = useState('total');
  
  // 根据筛选条件获取收入结构数据
  const getRevenueStructureData = () => {
    if (revenueFilter === 'total') {
      return haishangyouRevenueStructure;
    }
    
    // 找到对应的船只
    const shipIndex = revenueFilter === 'ship1' ? 0 : revenueFilter === 'ship2' ? 1 : 2;
    const ship = haishangyouShips[shipIndex];
    
    // 为每条船生成收入结构（基于船只收入）
    return [
      { name: '票务收入', value: ship.revenue * 0.58, ratio: 58, color: '#3b82f6', trend: '+12.5%', isUp: true },
      { name: '二销商品收入', value: ship.revenue * 0.22, ratio: 22, color: '#10b981', trend: '+18.2%', isUp: true },
      { name: '甲板观光收入', value: ship.revenue * 0.12, ratio: 12, color: '#f59e0b', trend: '+15.8%', isUp: true },
      { name: '其他收入', value: ship.revenue * 0.08, ratio: 8, color: '#64748b', trend: '+8.5%', isUp: true },
    ];
  };

  return (
    <div className="space-y-4">
      {/* 海上游头部信息卡 */}
      <div className="bg-white p-4 rounded-2xl shadow-sm border border-slate-100">
        <h2 className="text-lg font-black text-slate-800">海上游经营看板</h2>
      </div>

      {/* KPI 数据网格 - 上2下3布局 */}
      <div className="space-y-3">
        {/* 第一行：基础指标 */}
        <div className="grid grid-cols-2 gap-3">
          {/* 总收入 (元) */}
          <div className="bg-white p-3.5 rounded-2xl shadow-sm border border-slate-100 flex flex-col justify-between">
            <div className="flex items-center justify-between">
              <span className="text-slate-400 text-[11px] font-bold">总收入 (元)</span>
              <div className="w-6 h-6 rounded-full bg-emerald-50 flex items-center justify-center text-emerald-500">
                <DollarSign className="w-3.5 h-3.5" />
              </div>
            </div>
            <div className="my-1.5">
              <div className="text-slate-800 text-lg font-black tracking-tight whitespace-nowrap font-mono">
                ¥{haishangyouData.revenue}
              </div>
            </div>
            <div className="flex items-center gap-1">
              <span className="inline-flex items-center px-1.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-600">
                <TrendingUp className="w-2.5 h-2.5 mr-0.5" />
                同比 {haishangyouData.revenueTrend}
              </span>
            </div>
          </div>

          {/* 总客流 (人次) */}
          <div className="bg-white p-3.5 rounded-2xl shadow-sm border border-slate-100 flex flex-col justify-between">
            <div className="flex items-center justify-between">
              <span className="text-slate-400 text-[11px] font-bold">总客流 (人次)</span>
              <div className="w-6 h-6 rounded-full bg-blue-50 flex items-center justify-center text-blue-500">
                <Users className="w-3.5 h-3.5" />
              </div>
            </div>
            <div className="my-1.5">
              <div className="text-slate-800 text-lg font-black tracking-tight whitespace-nowrap font-mono">
                {haishangyouData.visitors}
              </div>
            </div>
            <div className="flex items-center gap-1">
              <span className="inline-flex items-center px-1.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-600">
                <TrendingUp className="w-2.5 h-2.5 mr-0.5" />
                同比 {haishangyouData.visitorsTrend}
              </span>
            </div>
          </div>
        </div>

        {/* 第二行：总航次、收费客流、接待客流、客单价 */}
        <div className="grid grid-cols-4 gap-3">
          {/* 总航次 (核心指标) */}
          <div className="bg-gradient-to-br from-cyan-50 to-blue-50 p-3.5 rounded-2xl shadow-sm border-2 border-cyan-200 flex flex-col justify-between">
            <div className="flex items-center justify-between">
              <span className="text-cyan-700 text-[11px] font-bold">总航次 ⭐</span>
              <div className="w-6 h-6 rounded-full bg-cyan-100 flex items-center justify-center text-cyan-600">
                <Activity className="w-3.5 h-3.5" />
              </div>
            </div>
            <div className="my-1.5">
              <div className="text-cyan-900 text-lg font-black tracking-tight whitespace-nowrap font-mono">
                {haishangyouData.totalTrips}
              </div>
            </div>
            <div className="flex items-center gap-1">
              <span className="inline-flex items-center px-1.5 py-0.5 rounded-full text-[10px] font-bold bg-cyan-100 text-cyan-700">
                <TrendingUp className="w-2.5 h-2.5 mr-0.5" />
                {haishangyouData.totalTripsTrend}
              </span>
            </div>
          </div>

          {/* 收费客流 (人次) */}
          <div className="bg-white p-3.5 rounded-2xl shadow-sm border border-slate-100 flex flex-col justify-between">
            <div className="flex items-center justify-between">
              <span className="text-slate-400 text-[11px] font-bold">收费客流</span>
              <div className="w-6 h-6 rounded-full bg-indigo-50 flex items-center justify-center text-indigo-500">
                <Activity className="w-3.5 h-3.5" />
              </div>
            </div>
            <div className="my-1.5">
              <div className="text-slate-800 text-lg font-black tracking-tight whitespace-nowrap font-mono">
                {haishangyouData.paidVisitors}
              </div>
            </div>
            <div className="flex items-center gap-1">
              <span className="inline-flex items-center px-1.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-600">
                <TrendingUp className="w-2.5 h-2.5 mr-0.5" />
                {haishangyouData.paidVisitorsTrend}
              </span>
            </div>
          </div>

          {/* 接待客流 (人次) */}
          <div className="bg-white p-3.5 rounded-2xl shadow-sm border border-slate-100 flex flex-col justify-between">
            <div className="flex items-center justify-between">
              <span className="text-slate-400 text-[11px] font-bold">接待客流</span>
              <div className="w-6 h-6 rounded-full bg-purple-50 flex items-center justify-center text-purple-500">
                <UserCheck className="w-3.5 h-3.5" />
              </div>
            </div>
            <div className="my-1.5">
              <div className="text-slate-800 text-lg font-black tracking-tight whitespace-nowrap font-mono">
                {haishangyouData.receptionVisitors}
              </div>
            </div>
            <div className="flex items-center gap-1">
              <span className="inline-flex items-center px-1.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-600">
                <TrendingUp className="w-2.5 h-2.5 mr-0.5" />
                {haishangyouData.receptionVisitorsTrend}
              </span>
            </div>
          </div>

          {/* 客单价 */}
          <div className="bg-gradient-to-br from-amber-50 to-orange-50 p-3.5 rounded-2xl shadow-sm border-2 border-amber-200 flex flex-col justify-between">
            <div className="flex items-center justify-between">
              <span className="text-amber-700 text-[11px] font-bold">客单价 💰</span>
              <div className="w-6 h-6 rounded-full bg-amber-100 flex items-center justify-center text-amber-600">
                <DollarSign className="w-3.5 h-3.5" />
              </div>
            </div>
            <div className="my-1.5">
              <div className="text-amber-900 text-lg font-black tracking-tight whitespace-nowrap font-mono">
                {haishangyouData.avgPrice}
              </div>
            </div>
            <div className="flex items-center gap-1">
              <span className="inline-flex items-center px-1.5 py-0.5 rounded-full text-[10px] font-bold bg-amber-100 text-amber-700">
                <TrendingUp className="w-2.5 h-2.5 mr-0.5" />
                {haishangyouData.avgPriceTrend}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* 月度计划执行进度 */}
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
              <span className="text-slate-700 font-extrabold font-mono text-sm">¥{(haishangyouData.rawRevenue * 1.15).toFixed(0)}</span>
            </div>
            <div className="text-right">
              <span className="text-slate-400 text-[10px] block">当前达成率</span>
              <span className="text-blue-600 font-black text-sm">{((haishangyouData.rawRevenue / (haishangyouData.rawRevenue * 1.15)) * 100).toFixed(1)}%</span>
            </div>
          </div>

          <div className="space-y-2">
            <div>
              <div className="flex justify-between text-[10px] text-slate-500 mb-1">
                <span>时间进度比 (当前周期已过)</span>
                <span className="font-bold">70%</span>
              </div>
              <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                <div className="bg-slate-400 h-full rounded-full transition-all duration-500" style={{ width: '70%' }}></div>
              </div>
            </div>

            <div>
              <div className="flex justify-between text-[10px] text-slate-700 mb-1">
                <span className="font-semibold">实际收入完成率</span>
                <span className="text-emerald-600 font-bold">{((haishangyouData.rawRevenue / (haishangyouData.rawRevenue * 1.15)) * 100).toFixed(1)}%</span>
              </div>
              <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                <div className="bg-emerald-500 h-full rounded-full transition-all duration-500" style={{ width: `${((haishangyouData.rawRevenue / (haishangyouData.rawRevenue * 1.15)) * 100).toFixed(1)}%` }}></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 收入结构分析 - 表格形式 */}
      <div className="bg-white p-4 rounded-2xl shadow-sm border border-slate-100">
        <div className="flex justify-between items-center mb-3">
          <div className="flex items-center gap-1.5">
            <span className="w-1.5 h-3.5 bg-purple-600 rounded-full"></span>
            <h3 className="text-slate-800 text-xs font-bold tracking-wide">收入结构分析</h3>
          </div>
          <span className="text-[10px] text-slate-400 font-semibold">
            {revenueFilter === 'total' ? '总体占比' : haishangyouShips[revenueFilter === 'ship1' ? 0 : revenueFilter === 'ship2' ? 1 : 2].name}
          </span>
        </div>

        {/* 标签页筛选 */}
        <div className="flex gap-2 mb-3 p-1 bg-slate-100 rounded-lg">
          <button
            onClick={() => setRevenueFilter('total')}
            className={`flex-1 px-3 py-2 rounded-md text-xs font-bold transition-all ${
              revenueFilter === 'total'
                ? 'bg-white text-slate-800 shadow-sm'
                : 'text-slate-500 hover:text-slate-700'
            }`}
          >
            全部收入
          </button>
          <button
            onClick={() => setRevenueFilter('ship1')}
            className={`flex-1 px-3 py-2 rounded-md text-xs font-bold transition-all ${
              revenueFilter === 'ship1'
                ? 'bg-cyan-500 text-white shadow-sm'
                : 'text-slate-500 hover:text-slate-700'
            }`}
          >
            浪淘沙号
          </button>
          <button
            onClick={() => setRevenueFilter('ship2')}
            className={`flex-1 px-3 py-2 rounded-md text-xs font-bold transition-all ${
              revenueFilter === 'ship2'
                ? 'bg-blue-500 text-white shadow-sm'
                : 'text-slate-500 hover:text-slate-700'
            }`}
          >
            寻仙2号
          </button>
          <button
            onClick={() => setRevenueFilter('ship3')}
            className={`flex-1 px-3 py-2 rounded-md text-xs font-bold transition-all ${
              revenueFilter === 'ship3'
                ? 'bg-purple-500 text-white shadow-sm'
                : 'text-slate-500 hover:text-slate-700'
            }`}
          >
            求仙6号
          </button>
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
          {getRevenueStructureData().map((item, index) => (
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

      {/* 游船收入情况（按船型展示各渠道销售及收入） */}
      {haishangyouShips && haishangyouShips.map((ship, shipIndex) => (
        <div key={shipIndex} className="bg-white p-4 rounded-2xl shadow-sm border border-slate-100">
          <div className="flex justify-between items-center mb-3">
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-3.5 bg-cyan-600 rounded-full"></span>
              <h3 className="text-slate-800 text-sm font-black tracking-wide">{ship.name}</h3>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-cyan-50 text-cyan-700 font-bold">{ship.type}</span>
            </div>
            <div className="flex items-center gap-3 text-[10px] text-slate-500">
              <span>载客量: <strong className="text-slate-800">{ship.capacity}人</strong></span>
              <span>航次: <strong className="text-slate-800">{ship.trips}次</strong></span>
            </div>
          </div>

          {/* 船只总览 - 一排显示 */}
          <div className="flex items-center gap-4 mb-3 p-3 bg-gradient-to-r from-cyan-50/50 to-transparent rounded-lg border-l-3 border-cyan-500">
            <div className="flex-1">
              <div className="text-[10px] text-slate-500 font-bold mb-1">总客流</div>
              <div className="text-lg font-black text-slate-800 font-mono">{ship.passengers.toLocaleString('en-US')}</div>
            </div>
            <div className="flex-1">
              <div className="text-[10px] text-slate-500 font-bold mb-1">总收入</div>
              <div className="text-lg font-black text-cyan-700 font-mono">¥{(ship.revenue / 1000).toFixed(1)}K</div>
            </div>
            <div className="flex-1">
              <div className="text-[10px] text-slate-500 font-bold mb-1">客单价 💰</div>
              <div className="text-base font-black text-amber-700 font-mono">¥{ship.avgPrice} <span className="text-[10px] text-amber-600 font-bold ml-1">↗{ship.avgPriceTrend}</span></div>
            </div>
            <div className="flex-1">
              <div className="text-[10px] text-slate-500 font-bold mb-1">收入增长</div>
              <div className="inline-flex items-center px-2 py-1 rounded-full text-xs font-bold bg-emerald-50 text-emerald-600">
                <TrendingUp className="w-3 h-3 mr-0.5" />
                {ship.trend}
              </div>
            </div>
          </div>

          {/* 各渠道销售及收入 */}
          <div>
            <div className="text-[11px] font-bold text-slate-600 mb-2 px-2">各渠道销售及收入</div>
            <div className="grid grid-cols-4 gap-2 mb-2 pb-2 border-b border-slate-200 px-2">
              <div className="text-[10px] text-slate-500 font-bold">渠道</div>
              <div className="text-[10px] text-slate-500 font-bold text-right">客流量</div>
              <div className="text-[10px] text-slate-500 font-bold text-right">收入</div>
              <div className="text-[10px] text-slate-500 font-bold text-center">趋势</div>
            </div>
            <div className="space-y-1">
              {ship.channels.map((channel, channelIndex) => (
                <div 
                  key={channelIndex}
                  className="grid grid-cols-4 gap-2 py-2 px-2 hover:bg-cyan-50/30 rounded-lg transition-all"
                >
                  <div className="flex items-center gap-1.5">
                    <span className="text-xs font-bold text-slate-700">{channel.name}</span>
                  </div>
                  <div className="text-xs font-mono text-slate-800 text-right font-semibold">
                    {channel.passengers.toLocaleString('en-US')}
                  </div>
                  <div className="text-xs font-mono text-cyan-700 text-right font-bold">
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
        </div>
      ))}

      {userRole === 'admin' && (
        <button 
          onClick={() => setActiveTab('platform')}
          className="w-full bg-slate-200 hover:bg-slate-300 text-slate-700 py-3 rounded-xl text-xs font-bold transition-all"
        >
          返回平台总览
        </button>
      )}
    </div>
  );
};
