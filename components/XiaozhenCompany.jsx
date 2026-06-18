import { useState } from 'react';
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
  const [pf, setPf] = useState('mixed');
  const dl = dimension === 'day' ? '本日' : dimension === 'month' ? '本月' : '本年';
  const fm = v => Math.round(v).toLocaleString('en-US');

  // 模拟联营商户数据
  const xiaozhenPartnerBusinesses = [
    { name: '丹栗餐厅', type: '联营', rentMode: '保底+流水', baseFlow: '5万', shareRate: '25%', transactions: 856, revenue: 125000, trend: '+12.5%', isUp: true },
    { name: '温源谷SPA', type: '联营', rentMode: '保底+流水', baseFlow: '3万', shareRate: '20%', transactions: 456, revenue: 85000, trend: '+18.3%', isUp: true },
    { name: '小镇市集', type: '联营', rentMode: '保底+流水', baseFlow: '8万', shareRate: '30%', transactions: 1245, revenue: 95000, trend: '+25.8%', isUp: true },
    { name: '茶语轩', type: '联营', rentMode: '直接分成', shareRate: '15%', transactions: 345, revenue: 45000, trend: '+32.5%', isUp: true },
    { name: '手作坊', type: '联营', rentMode: '直接分成', shareRate: '20%', transactions: 567, revenue: 38000, trend: '+15.2%', isUp: true },
    { name: '便利店A', type: '联营', rentMode: '固定租金', baseRent: '2万', transactions: 756, revenue: 20000, trend: '+5.2%', isUp: true },
    { name: '纪念品店', type: '联营', rentMode: '固定租金', baseRent: '3万', transactions: 423, revenue: 30000, trend: '+6.8%', isUp: true },
  ];

  // 流水分成计算
  const cfs = b => {
    if (b.rentMode === '保底+流水') {
      const r = b.shareRate?.match(/(\d+)%/);
      const f = b.baseFlow?.match(/([\d.]+)万/);
      if (r && f) return Math.round(parseFloat(f[1]) * 10000 * (parseInt(r[1]) / 100));
      return b.revenue;
    }
    if (b.rentMode === '直接分成') {
      const r = b.shareRate?.match(/(\d+)%/);
      if (r) return Math.round(b.revenue / (parseInt(r[1]) / 100));
      return b.revenue;
    }
    return 0;
  };

  const fpb = xiaozhenPartnerBusinesses.filter(b => {
    if (pf === 'mixed') return b.rentMode === '保底+流水';
    if (pf === 'direct') return b.rentMode === '直接分成';
    if (pf === 'fixed') return b.rentMode === '固定租金';
    return true;
  });

  // 计算合计行
  const revenueSubtotal = xiaozhenRevenueStructure.reduce((s, d) => s + d.value, 0);
  const channelSubtotalQty = xiaozhenChannelSales.reduce((s, c) => s + c.quantity, 0);
  const channelSubtotalRev = xiaozhenChannelSales.reduce((s, c) => s + c.revenue, 0);
  const bizSubtotalQty = xiaozhenBusinessRevenue.reduce((s, b) => s + b.transactions, 0);
  const bizSubtotalRev = xiaozhenBusinessRevenue.reduce((s, b) => s + b.revenue, 0);

  return (
    <div className="space-y-4">
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
            <span className="text-slate-800 text-base font-black tracking-tight font-mono">{xiaozhenData.revenue}</span>
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

      {/* 月度计划达成 - 参照平台总览 */}
      <div className="bg-white p-4 rounded-2xl shadow-sm border border-slate-100">
        <div className="flex items-center gap-1.5 mb-3">
          <span className="w-1 h-3.5 bg-blue-600 rounded-full"></span>
          <h3 className="text-slate-800 text-xs font-bold tracking-wide">{dimension === 'year' ? '年度计划达成' : '月度计划达成'}</h3>
        </div>

        <div className="space-y-3.5">
          <div className="flex items-center justify-between bg-slate-50 p-2.5 rounded-xl border border-slate-100">
            <span className="text-slate-400 text-[10px] font-bold">{dimension === 'year' ? '年度创值计划（6月）' : '月度创值计划（6月）'}</span>
            <span className="text-slate-700 font-extrabold font-mono text-sm">{Math.round(xiaozhenData.rawRevenue * 1.15).toLocaleString('en-US')}</span>
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

      {/* === 主营业态收入（3列）=== */}
      <div className="bg-white p-3 rounded-2xl shadow-sm border border-slate-100">
        <div className="flex items-center gap-1.5 mb-2.5">
          <span className="w-1 h-3.5 bg-purple-600 rounded-full shrink-0"></span>
          <h3 className="text-slate-800 text-xs font-bold">主营业态收入（{dl}）</h3>
        </div>
        {/* 表头行 - 顺序：业态(35%) -> 收入金额(40%) -> 同比(25%) */}
        <div className="flex items-center w-full text-[10px] text-slate-400 font-bold mb-1 pb-1.5 border-b border-slate-100 whitespace-nowrap">
          <div style={{ width: '35%' }} className="text-left">业态</div>
          <div style={{ width: '40%' }} className="text-right pr-4">收入金额</div>
          <div style={{ width: '25%' }} className="text-center">同比</div>
        </div>
        {/* 数据行 */}
        {xiaozhenRevenueStructure.map((d, j) => (
          <div key={j} className="flex items-center w-full text-[11px] py-1.5 hover:bg-slate-50 rounded whitespace-nowrap overflow-hidden">
            <div style={{ width: '35%' }} className="text-left flex items-center gap-1 min-w-0">
              <span className="w-1.5 h-1.5 rounded-full shrink-0" style={{ backgroundColor: d.color }}></span>
              <span className="text-slate-700 font-medium truncate">{d.name}</span>
            </div>
            <div style={{ width: '40%' }} className="text-right font-semibold text-slate-800 font-mono truncate pr-4">{fm(d.value)}</div>
            <div style={{ width: '25%' }} className="flex justify-center items-center min-w-0">
              <span className={`inline-block text-center px-1 py-0.5 rounded text-[10px] font-bold truncate ${d.isUp ? 'bg-emerald-50 text-emerald-600' : 'bg-rose-50 text-rose-600'}`}>{d.trend}</span>
            </div>
          </div>
        ))}
        {/* 小计行 */}
        <div className="flex items-center w-full text-[11px] mt-1 border-t border-slate-100 bg-slate-50 py-1.5 rounded whitespace-nowrap">
          <div style={{ width: '35%' }} className="text-left font-bold text-slate-800 pl-1">小计</div>
          <div style={{ width: '40%' }} className="text-right font-extrabold text-slate-800 font-mono pr-4">{fm(revenueSubtotal)}</div>
          <div style={{ width: '25%' }}></div>
        </div>
      </div>

      {/* === 渠道销售情况（4列: 渠道 | 间夜数 | 销售收入 | 同比）=== */}
      <div className="bg-white p-3 rounded-2xl shadow-sm border border-slate-100">
        <div className="flex items-center gap-1.5 mb-2">
          <span className="w-1 h-3.5 bg-blue-600 rounded-full shrink-0"></span>
          <h3 className="text-slate-800 text-xs font-bold">渠道销售情况（{dl}）</h3>
        </div>
        {/* 表头 */}
        <div className="flex items-center w-full text-[10px] text-slate-400 font-bold mb-1 pb-1.5 border-b border-slate-100 whitespace-nowrap">
          <div style={{ width: '35%' }} className="text-left">渠道</div>
          <div style={{ width: '15%' }} className="text-right">间夜数</div>
          <div style={{ width: '30%' }} className="text-right pr-4">销售收入</div>
          <div style={{ width: '20%' }} className="text-center">同比</div>
        </div>
        {/* 数据行 */}
        {xiaozhenChannelSales.map((d, j) => (
          <div key={j} className="flex items-center w-full text-[11px] py-1.5 hover:bg-slate-50 rounded whitespace-nowrap overflow-hidden">
            <div style={{ width: '35%' }} className="text-left flex items-center gap-1 min-w-0">
              <span className={`w-1.5 h-1.5 rounded-full shrink-0 ${d.bgColor}`}></span>
              <span className="text-slate-700 font-medium truncate">{d.name}</span>
            </div>
            <div style={{ width: '15%' }} className="text-right font-mono text-slate-800 font-semibold">{d.quantity.toLocaleString('en-US')}</div>
            <div style={{ width: '30%' }} className="text-right font-mono text-slate-800 font-semibold truncate pr-4">{fm(d.revenue)}</div>
            <div style={{ width: '20%' }} className="flex justify-center items-center min-w-0">
              <span className={`inline-block text-center px-1 py-0.5 rounded text-[10px] font-bold truncate ${d.isUp ? 'bg-emerald-50 text-emerald-600' : 'bg-rose-50 text-rose-600'}`}>{d.trend}</span>
            </div>
          </div>
        ))}
        {/* 小计行 */}
        <div className="flex items-center w-full text-[11px] mt-1 border-t border-slate-100 bg-slate-50 py-1.5 rounded whitespace-nowrap">
          <div style={{ width: '35%' }} className="text-left font-bold text-slate-800 pl-1">小计</div>
          <div style={{ width: '15%' }} className="text-right font-extrabold text-slate-800 font-mono">{channelSubtotalQty.toLocaleString('en-US')}</div>
          <div style={{ width: '30%' }} className="text-right font-extrabold text-slate-800 font-mono pr-4">{fm(channelSubtotalRev)}</div>
          <div style={{ width: '20%' }}></div>
        </div>
      </div>

      {/* === 住宿分项收入情况（4列: 酒店名称 | 间夜数 | 收入金额 | 同比）=== */}
      <div className="bg-white p-3 rounded-2xl shadow-sm border border-slate-100">
        <div className="flex items-center gap-1.5 mb-2">
          <span className="w-1 h-3.5 bg-emerald-600 rounded-full shrink-0"></span>
          <h3 className="text-slate-800 text-xs font-bold">住宿分项收入情况（{dl}）</h3>
          <span className="text-[10px] text-slate-400 ml-auto">共 {xiaozhenBusinessRevenue.length} 家</span>
        </div>
        {/* 表头 */}
        <div className="flex items-center w-full text-[10px] text-slate-400 font-bold mb-1 pb-1.5 border-b border-slate-100 whitespace-nowrap">
          <div style={{ width: '35%' }} className="text-left">酒店名称</div>
          <div style={{ width: '15%' }} className="text-right">间夜数</div>
          <div style={{ width: '30%' }} className="text-right pr-4">收入金额</div>
          <div style={{ width: '20%' }} className="text-center">同比</div>
        </div>
        {/* 数据行 */}
        {xiaozhenBusinessRevenue.map((b, j) => (
          <div key={j} className="flex items-center w-full text-[11px] py-1.5 hover:bg-emerald-50/30 border-l-2 border-emerald-500 pl-2 rounded whitespace-nowrap overflow-hidden">
            <div style={{ width: '35%' }} className="text-left font-medium text-slate-700 truncate">{b.name}</div>
            <div style={{ width: '15%' }} className="text-right font-mono text-slate-800 font-semibold">{b.transactions.toLocaleString('en-US')}</div>
            <div style={{ width: '30%' }} className="text-right font-mono text-emerald-700 font-semibold truncate pr-4">{fm(b.revenue)}</div>
            <div style={{ width: '20%' }} className="flex justify-center items-center min-w-0">
              <span className={`inline-block text-center px-1 py-0.5 rounded text-[10px] font-bold truncate ${b.isUp ? 'bg-emerald-50 text-emerald-600' : 'bg-rose-50 text-rose-600'}`}>{b.trend}</span>
            </div>
          </div>
        ))}
        {/* 小计行 */}
        <div className="flex items-center w-full text-[11px] mt-1 border-t border-slate-100 bg-slate-50 py-1.5 rounded whitespace-nowrap">
          <div style={{ width: '35%' }} className="text-left font-bold text-slate-800 pl-1">小计</div>
          <div style={{ width: '15%' }} className="text-right font-extrabold text-slate-800 font-mono">{bizSubtotalQty.toLocaleString('en-US')}</div>
          <div style={{ width: '30%' }} className="text-right font-extrabold text-slate-800 font-mono pr-4">{fm(bizSubtotalRev)}</div>
          <div style={{ width: '20%' }}></div>
        </div>
      </div>

      {/* === 商业经营情况 === */}
      <div className="bg-white p-3.5 rounded-2xl shadow-sm border border-slate-100">
        <div className="flex items-center gap-1.5 mb-2">
          <span className="w-1 h-3.5 bg-blue-600 rounded-full shrink-0"></span>
          <h3 className="text-slate-800 text-xs font-bold">商业经营情况</h3>
          <span className="text-[10px] text-slate-400 ml-auto">共 {fpb.length} 家商户</span>
        </div>
        <div className="flex gap-1.5 mb-3 p-1 bg-slate-100 rounded-lg">
          {[
            {k:'mixed',l:'保底+流水分成',c:'bg-purple-600'},
            {k:'direct',l:'直接分成',c:'bg-emerald-600'},
            {k:'fixed',l:'固定租金',c:'bg-blue-600'},
          ].map(t => (
            <button key={t.k} onClick={()=>setPf(t.k)}
              className={`flex-1 px-2 py-2 rounded-md text-[11px] font-bold transition-all ${pf===t.k?`${t.c} text-white shadow-md`:'text-slate-500 hover:text-slate-700 hover:bg-slate-200'}`}>{t.l}</button>
          ))}
        </div>

        {(pf==='mixed'||pf==='direct') && (
          <>
            {/* 表头 */}
            <div className="flex items-center w-full text-[10px] text-slate-400 font-bold mb-1 pb-1.5 border-b border-slate-100 whitespace-nowrap">
              <div style={{ width: '40%' }} className="text-left">商户名称</div>
              <div style={{ width: '30%' }} className="text-right">经营流水</div>
              <div style={{ width: '30%' }} className="text-right pr-4">流水分成</div>
            </div>
            {/* 数据行 */}
            {fpb.map((b,j) => (
              <div key={j} className={`flex items-center w-full text-[11px] py-1.5 border-l-2 pl-2 rounded whitespace-nowrap overflow-hidden ${pf==='mixed'?'hover:bg-purple-50/50 border-purple-500':'hover:bg-emerald-50/50 border-emerald-500'}`}>
                <div style={{ width: '40%' }} className="text-left font-medium text-slate-700 truncate">{b.name}</div>
                <div style={{ width: '30%' }} className="text-right font-mono text-slate-800 font-semibold">{fm(b.revenue)}</div>
                <div style={{ width: '30%', color: pf === 'mixed' ? '#7c3aed' : '#059669' }} className="text-right font-mono font-semibold truncate pr-4">{fm(cfs(b))}</div>
              </div>
            ))}
          </>
        )}

        {pf==='fixed' && (
          <>
            {/* 表头 */}
            <div className="flex items-center w-full text-[10px] text-slate-400 font-bold mb-1 pb-1.5 border-b border-slate-100 whitespace-nowrap">
              <div style={{ width: '55%' }} className="text-left">商户名称</div>
              <div style={{ width: '45%' }} className="text-right pr-4">租金收入</div>
            </div>
            {/* 数据行 */}
            {fpb.map((b,j) => (
              <div key={j} className="flex items-center w-full text-[11px] py-1.5 hover:bg-blue-50/50 border-l-2 border-blue-500 pl-2 rounded whitespace-nowrap overflow-hidden">
                <div style={{ width: '55%' }} className="text-left font-medium text-slate-700 truncate">{b.name}</div>
                <div style={{ width: '45%' }} className="text-right font-mono text-blue-700 font-semibold truncate pr-4">{fm(b.revenue)}</div>
              </div>
            ))}
          </>
        )}

        <div className="mt-2 pt-2 border-t border-slate-100 flex items-center gap-2 text-[10px] text-slate-400">
          <span className="w-2 h-2 rounded-sm bg-blue-500"></span>
          <span>联营商户流水仅作参考</span>
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
              className="bg-gradient-to-br from-indigo-50 to-purple-50 p-3 rounded-2xl shadow-sm border-2 border-indigo-200"
            >
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-1.5">
                  <div className="w-5 h-5 rounded-full flex items-center justify-center" style={{ backgroundColor: parking.color + '20' }}>
                    <Car className="w-3 h-3" style={{ color: parking.color }} />
                  </div>
                  <span className="text-xs font-bold text-slate-700">{parking.name}</span>
                </div>
              </div>

              <div className="flex items-center justify-between gap-2 mb-1.5">
                <div className="flex-1">
                  <div className="text-[9px] text-slate-500 font-bold">收费车次</div>
                  <div className="text-sm font-black tracking-tight font-mono" style={{ color: parking.color }}>
                    {parking.vehicles.toLocaleString('en-US')}
                  </div>
                </div>
                <div className="flex-1">
                  <div className="text-[9px] text-slate-500 font-bold">停车收入</div>
                  <div className="text-sm font-black tracking-tight font-mono text-slate-800">
                    {parking.revenue.toLocaleString('en-US')}
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between pt-1.5 border-t border-indigo-100">
                <span className="text-[10px] text-slate-500 font-bold">单价: {parking.avgPrice}</span>
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
              {Math.round(xiaozhenParkingData.reduce((sum, p) => sum + p.revenue, 0)).toLocaleString('en-US')}
            </span>
          </div>
          <div className="text-slate-500">
            <span className="font-bold">均价：</span>
            <span className="font-mono text-indigo-700 font-black">
              {Math.round(xiaozhenParkingData.reduce((sum, p) => sum + p.revenue, 0) / xiaozhenParkingData.reduce((sum, p) => sum + p.vehicles, 0)).toLocaleString('en-US')}
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