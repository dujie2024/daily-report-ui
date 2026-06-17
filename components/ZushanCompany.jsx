import { useState } from 'react';
import { DollarSign, Users, Activity, UserCheck, TrendingUp } from 'lucide-react';

export const ZushanCompany = ({ 
  zushanData, 
  zushanChannelSales, 
  zushanRevenueStructure, 
  zushanProductSales,
  zushanProductPrice,
  zushanBusinessRevenue,
  userRole,
  setActiveTab,
  dimension = 'day'
}) => {
  // 联营商户筛选状态：all-全部, fixed-固定租金, direct-直接分成, mixed-保底+流水
  const [partnerFilter, setPartnerFilter] = useState('all');
  
  // 获取联营商户
  const partnerBusinesses = zushanBusinessRevenue.filter(b => b.type === '联营');
  
  // 根据筛选条件过滤联营商户
  const filteredPartnerBusinesses = partnerBusinesses.filter(business => {
    if (partnerFilter === 'all') return true;
    if (partnerFilter === 'fixed') return business.rentMode === '固定租金';
    if (partnerFilter === 'direct') return business.rentMode === '直接分成';
    if (partnerFilter === 'mixed') return business.rentMode === '保底+流水';
    return true;
  });

  return (
    <div className="space-y-4">
      {/* 祖山景区头部信息卡 - 经营看板 + 日期同排 */}
      <div className="bg-white p-4 rounded-2xl shadow-sm border border-slate-100">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-black text-slate-800">祖山景区经营看板</h2>
          <span className="text-[10px] text-slate-400 font-extrabold font-mono">数据日期：2026-04-21</span>
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
            <span className="text-slate-800 text-base font-black tracking-tight font-mono">¥{zushanData.revenue}</span>
            <span className="inline-flex items-center px-1.5 py-0.5 rounded-full text-[9px] font-bold bg-emerald-50 text-emerald-600 whitespace-nowrap">
              <TrendingUp className="w-2.5 h-2.5 mr-0.5" />
              同比 {zushanData.revenueTrend}
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
            <span className="text-slate-800 text-base font-black tracking-tight font-mono">{zushanData.visitors}</span>
            <span className="inline-flex items-center px-1.5 py-0.5 rounded-full text-[9px] font-bold bg-emerald-50 text-emerald-600 whitespace-nowrap">
              <TrendingUp className="w-2.5 h-2.5 mr-0.5" />
              同比 {zushanData.visitorsTrend}
            </span>
          </div>
        </div>

        {/* 收费客流 (人次) */}
        <div className="bg-white p-3 rounded-2xl shadow-sm border border-slate-100">
          <div className="flex items-center justify-between mb-1.5">
            <span className="text-slate-400 text-[10px] font-bold">收费客流 (人次)</span>
            <div className="w-5 h-5 rounded-full bg-indigo-50 flex items-center justify-center text-indigo-500">
              <Activity className="w-3 h-3" />
            </div>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-slate-800 text-base font-black tracking-tight font-mono">{zushanData.paidVisitors}</span>
            <span className="inline-flex items-center px-1.5 py-0.5 rounded-full text-[9px] font-bold bg-emerald-50 text-emerald-600 whitespace-nowrap">
              <TrendingUp className="w-2.5 h-2.5 mr-0.5" />
              同比 {zushanData.paidVisitorsTrend}
            </span>
          </div>
        </div>

        {/* 接待客流 (人次) */}
        <div className="bg-white p-3 rounded-2xl shadow-sm border border-slate-100">
          <div className="flex items-center justify-between mb-1.5">
            <span className="text-slate-400 text-[10px] font-bold">接待客流 (人次)</span>
            <div className="w-5 h-5 rounded-full bg-purple-50 flex items-center justify-center text-purple-500">
              <UserCheck className="w-3 h-3" />
            </div>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-slate-800 text-base font-black tracking-tight font-mono">{zushanData.receptionVisitors}</span>
            <span className="inline-flex items-center px-1.5 py-0.5 rounded-full text-[9px] font-bold bg-emerald-50 text-emerald-600 whitespace-nowrap">
              <TrendingUp className="w-2.5 h-2.5 mr-0.5" />
              同比 {zushanData.receptionVisitorsTrend}
            </span>
          </div>
        </div>
      </div>

      {/* {dimension === 'year' ? '年度' : '月度'}计划达成 */}
      <div className="bg-white p-4 rounded-2xl shadow-sm border border-slate-100">
        <div className="flex items-center gap-1.5 mb-3">
          <span className="w-1 h-3.5 bg-blue-600 rounded-full"></span>
          <h3 className="text-slate-800 text-xs font-bold tracking-wide">{dimension === 'year' ? '年度计划达成' : '月度计划达成'}</h3>
        </div>

        <div className="space-y-3.5">
          <div className="flex items-center justify-between bg-slate-50 p-2.5 rounded-xl border border-slate-100">
            <span className="text-slate-400 text-[10px] font-bold">{dimension === 'year' ? '年度创值计划（6月）' : '月度创值计划（6月）'}</span>
            <span className="text-slate-700 font-extrabold font-mono text-sm">¥{(zushanData.rawRevenue * 1.15).toFixed(0)}</span>
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
                <span className="text-emerald-600 font-bold">{((zushanData.rawRevenue / (zushanData.rawRevenue * 1.15)) * 100).toFixed(1)}%</span>
              </div>
              <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                <div className="bg-emerald-500 h-full rounded-full transition-all duration-500" style={{ width: `${((zushanData.rawRevenue / (zushanData.rawRevenue * 1.15)) * 100).toFixed(1)}%` }}></div>
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

      {/* 自营商业收入 */}
      <div className="bg-white p-4 rounded-2xl shadow-sm border border-slate-100">
        <div className="flex justify-between items-center mb-3">
          <div className="flex items-center gap-1.5">
            <span className="w-1.5 h-3.5 bg-emerald-600 rounded-full"></span>
            <h3 className="text-slate-800 text-xs font-bold tracking-wide">自营商业收入</h3>
          </div>
          <span className="text-[10px] text-slate-400 font-semibold">共 {zushanBusinessRevenue.filter(b => b.type === '自营').length} 家商户</span>
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
          {zushanBusinessRevenue.filter(b => b.type === '自营').map((business, index) => (
            <div 
              key={index}
              className="grid grid-cols-5 gap-2 py-2 rounded-lg transition-all hover:bg-emerald-50/50 border-l-2 border-emerald-500 pl-2"
            >
              <div className="flex items-center gap-1.5">
                <span className="text-xs font-bold text-slate-700">{business.name}</span>
              </div>
              <div className="text-center">
                <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-emerald-50 text-emerald-700">
                  {business.type}
                </span>
              </div>
              <div className="text-xs font-mono text-slate-800 text-right font-semibold">
                {business.transactions.toLocaleString('en-US')}
              </div>
              <div className="text-xs font-mono text-slate-800 text-right font-semibold">
                ¥{(business.revenue / 1000).toFixed(1)}K
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
            <span className="w-2 h-2 rounded-sm bg-emerald-500"></span>
            <span>自营店铺流水计入收入</span>
          </div>
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
          <div className="text-[10px] text-slate-500 font-bold">店铺名称</div>
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
