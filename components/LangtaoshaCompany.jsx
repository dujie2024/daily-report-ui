import { useState } from 'react';
import { DollarSign, Users, Activity, UserCheck, TrendingUp } from 'lucide-react';

export const LangtaoshaCompany = ({ 
  langtaoshaData, 
  langtaoshaChannelSales, 
  langtaoshaRevenueStructure,
  langtaoshaBusinessRevenue,
  userRole,
  setActiveTab 
}) => {
  // 联营商户筛选状态：all-全部, fixed-固定租金, direct-直接分成, mixed-保底+流水
  const [partnerFilter, setPartnerFilter] = useState('all');
  
  // 根据筛选条件过滤联营商户
  const filteredPartnerBusinesses = langtaoshaBusinessRevenue.filter(business => {
    if (partnerFilter === 'all') return true;
    if (partnerFilter === 'fixed') return business.rentMode === '固定租金';
    if (partnerFilter === 'direct') return business.rentMode === '直接分成';
    if (partnerFilter === 'mixed') return business.rentMode === '保底+流水';
    return true;
  });

  return (
    <div className="space-y-4">
      {/* 浪淘沙头部信息卡 */}
      <div className="bg-white p-4 rounded-2xl shadow-sm border border-slate-100">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-black text-slate-800">浪淘沙经营看板</h2>
          <span className="text-xs px-3 py-1 rounded-full bg-blue-50 text-blue-700 font-bold">经营区域：岸基沙滩</span>
        </div>
      </div>

      {/* KPI 数据网格 - 紧凑排版 */}
      <div className="grid grid-cols-2 gap-3">
        {/* 总收入 (元) */}
        <div className="bg-white p-3 rounded-2xl shadow-sm border border-slate-100">
          <div className="flex items-center justify-between mb-1.5">
            <span className="text-slate-400 text-[10px] font-bold">总收入 (元)</span>
            <div className="w-5 h-5 rounded-full bg-emerald-50 flex items-center justify-center text-emerald-500">
              <DollarSign className="w-3 h-3" />
            </div>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-slate-800 text-base font-black tracking-tight font-mono">¥{langtaoshaData.revenue}</span>
            <span className="inline-flex items-center px-1.5 py-0.5 rounded-full text-[9px] font-bold bg-emerald-50 text-emerald-600 whitespace-nowrap">
              <TrendingUp className="w-2.5 h-2.5 mr-0.5" />
              同比 {langtaoshaData.revenueTrend}
            </span>
          </div>
        </div>

        {/* 总客流 (人次) */}
        <div className="bg-white p-3 rounded-2xl shadow-sm border border-slate-100">
          <div className="flex items-center justify-between mb-1.5">
            <span className="text-slate-400 text-[10px] font-bold">总客流 (人次)</span>
            <div className="w-5 h-5 rounded-full bg-blue-50 flex items-center justify-center text-blue-500">
              <Users className="w-3 h-3" />
            </div>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-slate-800 text-base font-black tracking-tight font-mono">{langtaoshaData.visitors}</span>
            <span className="inline-flex items-center px-1.5 py-0.5 rounded-full text-[9px] font-bold bg-emerald-50 text-emerald-600 whitespace-nowrap">
              <TrendingUp className="w-2.5 h-2.5 mr-0.5" />
              同比 {langtaoshaData.visitorsTrend}
            </span>
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
              <span className="text-slate-700 font-extrabold font-mono text-sm">¥{(langtaoshaData.rawRevenue * 1.15).toFixed(0)}</span>
            </div>
            <div className="text-right">
              <span className="text-slate-400 text-[10px] block">当前达成率</span>
              <span className="text-blue-600 font-black text-sm">{((langtaoshaData.rawRevenue / (langtaoshaData.rawRevenue * 1.15)) * 100).toFixed(1)}%</span>
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
                <span className="text-emerald-600 font-bold">{((langtaoshaData.rawRevenue / (langtaoshaData.rawRevenue * 1.15)) * 100).toFixed(1)}%</span>
              </div>
              <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                <div className="bg-emerald-500 h-full rounded-full transition-all duration-500" style={{ width: `${((langtaoshaData.rawRevenue / (langtaoshaData.rawRevenue * 1.15)) * 100).toFixed(1)}%` }}></div>
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
          {langtaoshaRevenueStructure.map((item, index) => (
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

      {/* 联营收入 */}
      <div className="bg-white p-4 rounded-2xl shadow-sm border border-slate-100">
        <div className="flex justify-between items-center mb-3">
          <div className="flex items-center gap-1.5">
            <span className="w-1.5 h-3.5 bg-blue-600 rounded-full"></span>
            <h3 className="text-slate-800 text-xs font-bold tracking-wide">联营收入</h3>
          </div>
          <span className="text-[10px] text-slate-400 font-semibold">共 {filteredPartnerBusinesses.length} 家商户</span>
        </div>

        {/* 标签页筛选 */}
        <div className="flex gap-2 mb-3 p-1 bg-slate-100 rounded-lg">
          <button
            onClick={() => setPartnerFilter('all')}
            className={`flex-1 px-3 py-2 rounded-md text-xs font-bold transition-all ${
              partnerFilter === 'all'
                ? 'bg-white text-slate-800 shadow-sm'
                : 'text-slate-500 hover:text-slate-700'
            }`}
          >
            全部商户
          </button>
          <button
            onClick={() => setPartnerFilter('fixed')}
            className={`flex-1 px-3 py-2 rounded-md text-xs font-bold transition-all ${
              partnerFilter === 'fixed'
                ? 'bg-blue-500 text-white shadow-sm'
                : 'text-slate-500 hover:text-slate-700'
            }`}
          >
            固定租金
          </button>
          <button
            onClick={() => setPartnerFilter('direct')}
            className={`flex-1 px-3 py-2 rounded-md text-xs font-bold transition-all ${
              partnerFilter === 'direct'
                ? 'bg-emerald-500 text-white shadow-sm'
                : 'text-slate-500 hover:text-slate-700'
            }`}
          >
            直接分成
          </button>
          <button
            onClick={() => setPartnerFilter('mixed')}
            className={`flex-1 px-3 py-2 rounded-md text-xs font-bold transition-all ${
              partnerFilter === 'mixed'
                ? 'bg-purple-500 text-white shadow-sm'
                : 'text-slate-500 hover:text-slate-700'
            }`}
          >
            保底+流水
          </button>
        </div>

        {/* 表格头 */}
        <div className="grid grid-cols-5 gap-2 mb-2 pb-2 border-b border-slate-200">
          <div className="text-[10px] text-slate-500 font-bold">商户名称</div>
          <div className="text-[10px] text-slate-500 font-bold text-center">类型</div>
          <div className="text-[10px] text-slate-500 font-bold text-right">交易笔数</div>
          <div className="text-[10px] text-slate-500 font-bold text-right">交易额</div>
          <div className="text-[10px] text-slate-500 font-bold text-center">趋势</div>
        </div>

        {/* 表格内容 */}
        <div className="space-y-1.5">
          {filteredPartnerBusinesses.map((business, index) => (
            <div 
              key={index}
              className="grid grid-cols-5 gap-2 py-2 rounded-lg transition-all hover:bg-blue-50/50 border-l-2 border-blue-500 pl-2"
            >
              <div className="flex items-center gap-1.5">
                <span className="text-xs font-bold text-slate-700">{business.name}</span>
              </div>
              <div className="text-center">
                <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-blue-50 text-blue-700">
                  联营
                </span>
              </div>
              <div className="text-xs font-mono text-slate-800 text-right font-semibold">
                {business.transactions.toLocaleString('en-US')}
              </div>
              <div className="text-xs font-mono text-slate-800 text-right font-semibold">
                ¥{(business.revenue / 1000).toFixed(1)}K
                <span className="text-[9px] text-slate-400 ml-1">参考</span>
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
        <div className="mt-3 pt-3 border-t border-slate-100 flex items-center gap-2 text-[10px] text-slate-400">
          <div className="flex items-center gap-1">
            <span className="w-2 h-2 rounded-sm bg-blue-500"></span>
            <span>联营商户流水仅作参考</span>
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
