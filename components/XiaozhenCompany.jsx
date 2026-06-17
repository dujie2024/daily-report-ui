import { DollarSign, Users, Activity, TrendingUp, Car } from 'lucide-react';

export const XiaozhenCompany = ({ 
  xiaozhenData, 
  xiaozhenChannelSales, 
  xiaozhenRevenueStructure,
  xiaozhenBusinessRevenue,
  xiaozhenParkingData,
  userRole,
  setActiveTab,
  dimension = 'day',
  setDimension
}) => {
  const dl = dimension === 'day' ? '本日' : dimension === 'month' ? '本月' : '本年';
  const fm = v => Math.round(v).toLocaleString('en-US');

  return (
    <div className="space-y-4">
      {/* 天女小镇头部信息卡 - 标题与日期切换同行 */}
      <div className="bg-white p-4 rounded-2xl shadow-sm border border-slate-100">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-black text-slate-800">天女小镇经营看板</h2>
          <div className="bg-slate-100 p-0.5 rounded-xl flex shadow-inner">
            {['day','month','year'].map(d => (
              <button key={d} onClick={() => setDimension?.(d)}
                className={`px-3 py-1 text-[11px] font-bold rounded-lg transition-all ${dimension === d ? 'bg-white text-blue-700 shadow-sm' : 'text-slate-500 hover:text-slate-800'}`}>
                {d === 'day' ? '本日' : d === 'month' ? '本月' : '本年'}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* KPI 数据网格 - 紧凑排版 */}
      <div className="space-y-3">
        {/* 总收入 (元) - 独占一行 */}
        <div className="bg-white p-3 rounded-2xl shadow-sm border border-slate-100">
          <div className="flex items-center justify-between mb-1.5">
            <span className="text-slate-400 text-[10px] font-bold">总收入 (元)</span>
            <div className="w-5 h-5 rounded-full bg-emerald-50 flex items-center justify-center text-emerald-500">
              <DollarSign className="w-3 h-3" />
            </div>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-slate-800 text-base font-black tracking-tight font-mono">¥{fm(xiaozhenData.revenue)}</span>
            <span className="inline-flex items-center px-1.5 py-0.5 rounded-full text-[9px] font-bold bg-emerald-50 text-emerald-600 whitespace-nowrap">
              <TrendingUp className="w-2.5 h-2.5 mr-0.5" />
              同比 {xiaozhenData.revenueTrend}
            </span>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          {/* 间夜数 */}
          <div className="bg-white p-3 rounded-2xl shadow-sm border border-slate-100">
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-slate-400 text-[10px] font-bold">间夜数</span>
              <div className="w-5 h-5 rounded-full bg-blue-50 flex items-center justify-center text-blue-500">
                <Activity className="w-3 h-3" />
              </div>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-slate-800 text-base font-black tracking-tight font-mono">{fm(xiaozhenData.roomNights)}</span>
              <span className="inline-flex items-center px-1.5 py-0.5 rounded-full text-[9px] font-bold bg-blue-50 text-blue-600 whitespace-nowrap">
                <TrendingUp className="w-2.5 h-2.5 mr-0.5" />
                同比 {xiaozhenData.roomNightsTrend}
              </span>
            </div>
          </div>

          {/* 平均房价 ADR */}
          <div className="bg-white p-3 rounded-2xl shadow-sm border border-slate-100">
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-slate-400 text-[10px] font-bold">平均房价 ADR</span>
              <div className="w-5 h-5 rounded-full bg-purple-50 flex items-center justify-center text-purple-500">
                <TrendingUp className="w-3 h-3" />
              </div>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-slate-800 text-base font-black tracking-tight font-mono">{xiaozhenData.adr}</span>
              <span className="inline-flex items-center px-1.5 py-0.5 rounded-full text-[9px] font-bold bg-purple-50 text-purple-600 whitespace-nowrap">
                <TrendingUp className="w-2.5 h-2.5 mr-0.5" />
                同比 {xiaozhenData.adrTrend}
              </span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          {/* 餐饮接待 */}
          <div className="bg-white p-3 rounded-2xl shadow-sm border border-slate-100">
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-slate-400 text-[10px] font-bold">餐饮接待</span>
              <div className="w-5 h-5 rounded-full bg-amber-50 flex items-center justify-center text-amber-500">
                <Users className="w-3 h-3" />
              </div>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-slate-800 text-base font-black tracking-tight font-mono">{fm(xiaozhenData.diningGuests)}</span>
              <span className="inline-flex items-center px-1.5 py-0.5 rounded-full text-[9px] font-bold bg-amber-50 text-amber-600 whitespace-nowrap">
                <TrendingUp className="w-2.5 h-2.5 mr-0.5" />
                同比 {xiaozhenData.diningGuestsTrend}
              </span>
            </div>
          </div>

          {/* 餐饮客单 */}
          <div className="bg-white p-3 rounded-2xl shadow-sm border border-slate-100">
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-slate-400 text-[10px] font-bold">餐饮客单</span>
              <div className="w-5 h-5 rounded-full bg-rose-50 flex items-center justify-center text-rose-500">
                <DollarSign className="w-3 h-3" />
              </div>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-slate-800 text-base font-black tracking-tight font-mono">{xiaozhenData.diningAvg}</span>
              <span className="inline-flex items-center px-1.5 py-0.5 rounded-full text-[9px] font-bold bg-rose-50 text-rose-600 whitespace-nowrap">
                <TrendingUp className="w-2.5 h-2.5 mr-0.5" />
                同比 {xiaozhenData.diningAvgTrend}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* 月度计划达成 */}
      <div className="bg-white p-4 rounded-2xl shadow-sm border border-slate-100">
        <div className="flex items-center gap-1.5 mb-3">
          <span className="w-1 h-3.5 bg-blue-600 rounded-full"></span>
          <h3 className="text-slate-800 text-xs font-bold tracking-wide">月度计划达成</h3>
        </div>

        <div className="space-y-3.5">
          <div className="flex items-center justify-between bg-slate-50 p-2.5 rounded-xl border border-slate-100">
            <span className="text-slate-400 text-[10px] font-bold">月度创值计划（6月）</span>
            <span className="text-slate-700 font-extrabold font-mono text-sm">¥{(xiaozhenData.rawRevenue * 1.15).toFixed(0)}</span>
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
                <span className="text-emerald-600 font-bold">{((xiaozhenData.rawRevenue / (xiaozhenData.rawRevenue * 1.15)) * 100).toFixed(1)}%</span>
              </div>
              <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                <div className="bg-emerald-500 h-full rounded-full transition-all duration-500" style={{ width: `${((xiaozhenData.rawRevenue / (xiaozhenData.rawRevenue * 1.15)) * 100).toFixed(1)}%` }}></div>
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
          {xiaozhenRevenueStructure.map((item, index) => (
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

      {/* 各渠道间夜数及销售收入 - 表格形式 */}
      <div className="bg-white p-4 rounded-2xl shadow-sm border border-slate-100">
        <div className="flex justify-between items-center mb-3">
          <div className="flex items-center gap-1.5">
            <span className="w-1.5 h-3.5 bg-blue-600 rounded-full"></span>
            <h3 className="text-slate-800 text-xs font-bold tracking-wide">各渠道间夜数及销售收入</h3>
          </div>
          <span className="text-[10px] text-slate-400 font-semibold">酒店核心渠道</span>
        </div>

        {/* 表格头 */}
        <div className="grid grid-cols-4 gap-2 mb-2 pb-2 border-b border-slate-200">
          <div className="text-[10px] text-slate-500 font-bold">渠道</div>
          <div className="text-[10px] text-slate-500 font-bold text-right">间夜数</div>
          <div className="text-[10px] text-slate-500 font-bold text-right">销售收入</div>
          <div className="text-[10px] text-slate-500 font-bold text-center">趋势</div>
        </div>

        {/* 表格内容 */}
        <div className="space-y-1.5">
          {xiaozhenChannelSales.map((channel, index) => (
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

      {/* 住房收入情况 */}
      <div className="bg-white p-4 rounded-2xl shadow-sm border border-slate-100">
        <div className="flex justify-between items-center mb-3">
          <div className="flex items-center gap-1.5">
            <span className="w-1.5 h-3.5 bg-emerald-600 rounded-full"></span>
            <h3 className="text-slate-800 text-xs font-bold tracking-wide">住房收入情况</h3>
          </div>
          <span className="text-[10px] text-slate-400 font-semibold">丹栗客栈 & 温源谷酒店</span>
        </div>

        {/* 表格头 */}
        <div className="grid grid-cols-4 gap-2 mb-2 pb-2 border-b border-slate-200">
          <div className="text-[10px] text-slate-500 font-bold">酒店名称</div>
          <div className="text-[10px] text-slate-500 font-bold text-right">间夜数</div>
          <div className="text-[10px] text-slate-500 font-bold text-right">收入金额</div>
          <div className="text-[10px] text-slate-500 font-bold text-center">趋势</div>
        </div>

        {/* 表格内容 */}
        <div className="space-y-2">
          {xiaozhenBusinessRevenue.map((business, index) => (
            <div 
              key={index}
              className="grid grid-cols-4 gap-2 py-3 rounded-lg transition-all hover:bg-emerald-50/30 border-l-3 border-emerald-500 pl-3 bg-gradient-to-r from-emerald-50/50 to-transparent"
            >
              <div className="flex items-center gap-1.5">
                <span className="text-sm font-bold text-slate-800">{business.name}</span>
              </div>
              <div className="text-sm font-mono text-slate-800 text-right font-semibold">
                {business.transactions.toLocaleString('en-US')}
                <span className="text-[10px] text-slate-400 ml-1">间夜</span>
              </div>
              <div className="text-sm font-mono text-emerald-700 text-right font-black">
                ¥{(business.revenue / 1000).toFixed(1)}K
              </div>
              <div className="text-center">
                <span className="inline-flex items-center px-2 py-1 rounded-full text-[11px] font-bold bg-emerald-50 text-emerald-600">
                  <TrendingUp className="w-3 h-3 mr-0.5" />
                  {business.trend}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* 汇总信息 */}
        <div className="mt-3 pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
          <div className="text-slate-500">
            <span className="font-bold">总间夜数：</span>
            <span className="font-mono text-slate-800 font-semibold">
              {xiaozhenBusinessRevenue.reduce((sum, b) => sum + b.transactions, 0).toLocaleString('en-US')}
            </span>
          </div>
          <div className="text-slate-500">
            <span className="font-bold">客房总收入：</span>
            <span className="font-mono text-emerald-700 font-black">
              ¥{(xiaozhenBusinessRevenue.reduce((sum, b) => sum + b.revenue, 0) / 1000).toFixed(1)}K
            </span>
          </div>
        </div>
      </div>

      {/* 停车场收入情况 */}
      <div className="bg-white p-4 rounded-2xl shadow-sm border border-slate-100">
        <div className="flex justify-between items-center mb-3">
          <div className="flex items-center gap-1.5">
            <span className="w-1.5 h-3.5 bg-indigo-600 rounded-full"></span>
            <h3 className="text-slate-800 text-xs font-bold tracking-wide">停车场收入情况</h3>
          </div>
          <span className="text-[10px] text-slate-400 font-semibold">共 {xiaozhenParkingData.length} 个车场</span>
        </div>

        {/* 停车场卡片 */}
        <div className="grid grid-cols-2 gap-3">
          {xiaozhenParkingData.map((parking, index) => (
            <div 
              key={index}
              className="bg-gradient-to-br from-indigo-50 to-purple-50 p-3.5 rounded-2xl shadow-sm border-2 border-indigo-200"
            >
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-1.5">
                  <div className="w-6 h-6 rounded-full flex items-center justify-center" style={{ backgroundColor: parking.color + '20' }}>
                    <Car className="w-3.5 h-3.5" style={{ color: parking.color }} />
                  </div>
                  <span className="text-xs font-bold text-slate-700">{parking.name}</span>
                </div>
              </div>

              {/* 收费车次 */}
              <div className="mb-2">
                <div className="text-[10px] text-slate-500 font-bold mb-0.5">收费车次</div>
                <div className="text-lg font-black tracking-tight font-mono" style={{ color: parking.color }}>
                  {parking.vehicles.toLocaleString('en-US')}
                </div>
              </div>

              {/* 停车收入 */}
              <div className="mb-2">
                <div className="text-[10px] text-slate-500 font-bold mb-0.5">停车收入</div>
                <div className="text-base font-black tracking-tight font-mono text-slate-800">
                  ¥{(parking.revenue / 1000).toFixed(1)}K
                </div>
              </div>

              {/* 趋势 */}
              <div className="flex items-center justify-between pt-2 border-t border-indigo-100">
                <span className="text-[10px] text-slate-500 font-bold">平均单价: ¥{parking.avgPrice}</span>
                <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${parking.isUp ? 'bg-emerald-50 text-emerald-600' : 'bg-rose-50 text-rose-600'}`}>
                  {parking.trend}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* 停车场汇总 - 一行显示 */}
        <div className="mt-3 pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
          <div className="text-slate-500">
            <span className="font-bold">总车次：</span>
            <span className="font-mono text-indigo-700 font-black">
              {xiaozhenParkingData.reduce((sum, p) => sum + p.vehicles, 0).toLocaleString('en-US')}
            </span>
          </div>
          <div className="text-slate-500">
            <span className="font-bold">总收入：</span>
            <span className="font-mono text-indigo-700 font-black">
              ¥{(xiaozhenParkingData.reduce((sum, p) => sum + p.revenue, 0) / 1000).toFixed(1)}K
            </span>
          </div>
          <div className="text-slate-500">
            <span className="font-bold">平均单价：</span>
            <span className="font-mono text-indigo-700 font-black">
              ¥{(xiaozhenParkingData.reduce((sum, p) => sum + p.revenue, 0) / xiaozhenParkingData.reduce((sum, p) => sum + p.vehicles, 0)).toFixed(0)}
            </span>
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
  );
};