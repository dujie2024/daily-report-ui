import { useState } from 'react';
import { DollarSign, Users, Activity, TrendingUp, Car, Sparkles, UserCheck } from 'lucide-react';

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

  const revenueSubtotal = xiaozhenRevenueStructure.reduce((s, d) => s + d.value, 0);
  const channelSubtotalQty = xiaozhenChannelSales.reduce((s, c) => s + c.quantity, 0);
  const channelSubtotalRev = xiaozhenChannelSales.reduce((s, c) => s + c.revenue, 0);
  const bizSubtotalQty = xiaozhenBusinessRevenue.reduce((s, b) => s + b.transactions, 0);
  const bizSubtotalRev = xiaozhenBusinessRevenue.reduce((s, b) => s + b.revenue, 0);

  const handleContractView = (contractInfo) => {
    if (window.triggerAlert) {
      window.triggerAlert(contractInfo);
    }
  };

  return (
    <div className="space-y-6 text-slate-800">
      {/* 顶部标题 */}
      <div className="flex items-center justify-between border-b border-slate-100 pb-4">
        <div>
          <h2 className="text-xl font-black text-slate-900 flex items-center gap-2">
            <span className="w-1.5 h-6 bg-indigo-600 rounded-full"></span>
            天女小镇 运营决策中心
          </h2>
          <p className="text-xs text-slate-500 mt-1">深度汇总小镇温泉、酒店住宿、特色餐饮、停车场收费及商圈联营数据</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex bg-slate-100 p-1 rounded-xl">
            {[['day', '日报'], ['month', '月报'], ['year', '年报']].map(([v, l]) => (
              <button
                key={v}
                onClick={() => setDimension(v)}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${dimension === v ? 'bg-white text-indigo-600 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
              >
                {l}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* KPI 数据卡片 - 5列排版 */}
      <div className="grid grid-cols-5 gap-4">
        <div className="bg-gradient-to-br from-emerald-50 to-teal-50/20 p-4 rounded-2xl border border-emerald-100 shadow-sm flex flex-col justify-between">
          <div>
            <span className="text-emerald-800 text-xs font-bold">总收入 (元)</span>
            <div className="text-2xl font-black text-slate-800 font-mono mt-3">{xiaozhenData.revenue}</div>
          </div>
          <div className="flex items-center gap-1 text-[10px] text-emerald-600 font-bold mt-2">
            <TrendingUp className="w-3 h-3" />
            <span>{xiaozhenData.revenueTrend} 同比增幅</span>
          </div>
        </div>

        <div className="bg-gradient-to-br from-blue-50 to-cyan-50/20 p-4 rounded-2xl border border-blue-100 shadow-sm flex flex-col justify-between">
          <div>
            <span className="text-blue-800 text-xs font-bold">酒店入住 (间夜)</span>
            <div className="text-2xl font-black text-slate-800 font-mono mt-3">{fm(xiaozhenData.roomNights)}</div>
          </div>
          <div className="flex items-center gap-1 text-[10px] text-emerald-600 font-bold mt-2">
            <TrendingUp className="w-3 h-3" />
            <span>{xiaozhenData.roomNightsTrend} 同比</span>
          </div>
        </div>

        <div className="bg-gradient-to-br from-indigo-50 to-purple-50/20 p-4 rounded-2xl border border-indigo-100 shadow-sm flex flex-col justify-between">
          <div>
            <span className="text-indigo-800 text-xs font-bold">平均房价 ADR (元)</span>
            <div className="text-2xl font-black text-slate-800 font-mono mt-3">{xiaozhenData.adr}</div>
          </div>
          <div className="flex items-center gap-1 text-[10px] text-emerald-600 font-bold mt-2">
            <TrendingUp className="w-3 h-3" />
            <span>{xiaozhenData.adrTrend} 同比</span>
          </div>
        </div>

        <div className="bg-gradient-to-br from-amber-50 to-orange-50/20 p-4 rounded-2xl border border-amber-100 shadow-sm flex flex-col justify-between">
          <div>
            <span className="text-amber-800 text-xs font-bold">餐饮接待 (人次)</span>
            <div className="text-2xl font-black text-slate-800 font-mono mt-3">{fm(xiaozhenData.diningGuests)}</div>
          </div>
          <div className="flex items-center gap-1 text-[10px] text-emerald-600 font-bold mt-2">
            <TrendingUp className="w-3 h-3" />
            <span>{xiaozhenData.diningGuestsTrend} 同比</span>
          </div>
        </div>

        <div className="bg-gradient-to-br from-rose-50 to-pink-50/20 p-4 rounded-2xl border border-rose-100 shadow-sm flex flex-col justify-between">
          <div>
            <span className="text-rose-800 text-xs font-bold">餐饮客单 (元)</span>
            <div className="text-2xl font-black text-slate-800 font-mono mt-3">{xiaozhenData.diningAvg}</div>
          </div>
          <div className="flex items-center gap-1 text-[10px] text-emerald-600 font-bold mt-2">
            <TrendingUp className="w-3 h-3" />
            <span>{xiaozhenData.diningAvgTrend} 同比</span>
          </div>
        </div>
      </div>

      {/* PC 双栏排版 */}
      <div className="grid grid-cols-12 gap-6">
        
        {/* 左侧：主营收入结构 + 渠道销售 (7/12) */}
        <div className="col-span-7 space-y-6">
          
          {/* 主营业态 */}
          <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm">
            <div className="flex items-center gap-2 mb-4 border-b border-slate-50 pb-3">
              <span className="w-1.5 h-4 bg-purple-600 rounded-full"></span>
              <h3 className="text-sm font-black text-slate-800">主营业态收入结构（{dl}）</h3>
            </div>
            
            <div className="grid grid-cols-12 gap-1 px-2 text-xs font-bold text-slate-400 border-b border-slate-100 pb-2 mb-2">
              <div className="col-span-5 text-left">业态部门</div>
              <div className="col-span-4 text-right pr-4">收入金额 (元)</div>
              <div className="col-span-3 text-center">同比</div>
            </div>

            <div className="space-y-1">
              {xiaozhenRevenueStructure.map((d, j) => (
                <div key={j} className="grid grid-cols-12 gap-1 text-sm py-2 hover:bg-slate-50 rounded-lg px-2 items-center transition-all">
                  <div className="col-span-5 flex items-center gap-2 min-w-0">
                    <span className="w-2.5 h-2.5 rounded-full shrink-0" style={{ backgroundColor: d.color }}></span>
                    <span className="text-slate-700 font-semibold truncate">{d.name}</span>
                  </div>
                  <div className="col-span-4 text-right font-extrabold text-slate-800 font-mono pr-4">{fm(d.value)}</div>
                  <div className="col-span-3 flex justify-center">
                    <span className={`px-2 py-0.5 rounded text-[10px] font-black tracking-wider ${d.isUp ? 'bg-emerald-50 text-emerald-600' : 'bg-rose-50 text-rose-600'}`}>
                      {d.trend}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            <div className="grid grid-cols-12 gap-1 text-sm mt-3 pt-3 border-t border-slate-100 bg-slate-50/50 p-2 rounded-xl">
              <div className="col-span-5 font-black text-slate-800 pl-2">主营小计</div>
              <div className="col-span-4 text-right font-black text-slate-900 font-mono pr-4">{fm(revenueSubtotal)}</div>
              <div className="col-span-3"></div>
            </div>
          </div>

          {/* 渠道销售情况 */}
          <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm">
            <div className="flex items-center gap-2 mb-4 border-b border-slate-50 pb-3">
              <span className="w-1.5 h-4 bg-blue-600 rounded-full"></span>
              <h3 className="text-sm font-black text-slate-800">酒店分分销渠道统计（{dl}）</h3>
            </div>

            <div className="grid grid-cols-12 gap-1 text-xs font-bold text-slate-400 border-b border-slate-100 pb-2 mb-2 px-2">
              <div className="col-span-5">渠道</div>
              <div className="col-span-3 text-right">预订间夜</div>
              <div className="col-span-4 text-right pr-4">销售收入 (元)</div>
            </div>

            <div className="space-y-1">
              {xiaozhenChannelSales.map((d, j) => (
                <div key={j} className="grid grid-cols-12 gap-1 text-xs py-2 hover:bg-slate-50 rounded-lg px-2 items-center transition-all">
                  <div className="col-span-5 flex items-center gap-1.5 min-w-0">
                    <span className={`w-2 h-2 rounded-full shrink-0 ${d.bgColor}`}></span>
                    <span className="text-slate-700 font-semibold truncate">{d.name}</span>
                  </div>
                  <div className="col-span-3 text-right font-semibold font-mono text-slate-600">{d.quantity.toLocaleString('en-US')}</div>
                  <div className="col-span-4 text-right font-extrabold font-mono text-slate-800 pr-4">{fm(d.revenue)}</div>
                </div>
              ))}
            </div>

            <div className="grid grid-cols-12 gap-1 text-xs font-black text-slate-900 border-t border-slate-100 mt-3 pt-3 px-2 bg-slate-50 p-2 rounded-lg">
              <div className="col-span-5">合计</div>
              <div className="col-span-3 text-right font-mono">{channelSubtotalQty.toLocaleString('en-US')}</div>
              <div className="col-span-4 text-right font-mono pr-4">{fm(channelSubtotalRev)}</div>
            </div>
          </div>

        </div>

        {/* 右侧：计划达成、住宿细分、停车场 (5/12) */}
        <div className="col-span-5 space-y-6">

          {/* 计划达成 */}
          <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm">
            <div className="flex items-center gap-1.5 mb-3">
              <span className="w-1.5 h-4 bg-blue-600 rounded-full"></span>
              <h3 className="text-sm font-black text-slate-800">{dimension === 'year' ? '年度创值达成率' : '月度创值达成率'}</h3>
            </div>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between bg-slate-50 p-3 rounded-xl border border-slate-100">
                <span className="text-slate-500 text-xs font-bold">{dimension === 'year' ? '年度计划' : '月度计划'}</span>
                <span className="text-slate-800 font-black font-mono text-base">{Math.round(xiaozhenData.rawRevenue * 1.15).toLocaleString('en-US')} 元</span>
              </div>
              <div className="space-y-3">
                <div>
                  <div className="flex justify-between text-xs text-slate-500 mb-1.5">
                    <span>时间进度比</span>
                    <span className="font-bold text-slate-700">70%</span>
                  </div>
                  <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                    <div className="bg-slate-400 h-full rounded-full" style={{ width: '70%' }}></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-xs text-slate-700 mb-1.5">
                    <span className="font-semibold">创值完成率</span>
                    <span className="text-emerald-600 font-bold">{((xiaozhenData.rawRevenue / (xiaozhenData.rawRevenue * 1.15)) * 100).toFixed(1)}%</span>
                  </div>
                  <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                    <div className="bg-emerald-500 h-full rounded-full" style={{ width: `${((xiaozhenData.rawRevenue / (xiaozhenData.rawRevenue * 1.15)) * 100).toFixed(1)}%` }}></div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* 住宿分项收入情况 */}
          <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm">
            <div className="flex items-center gap-1.5 mb-3 border-b border-slate-50 pb-3">
              <span className="w-1.5 h-4 bg-emerald-600 rounded-full"></span>
              <h3 className="text-sm font-black text-slate-800">各酒店住宿绩效</h3>
              <span className="text-[10px] text-slate-400 ml-auto font-bold bg-emerald-50 text-emerald-700 px-2 py-0.5 rounded-full">共 {xiaozhenBusinessRevenue.length} 家</span>
            </div>

            <div className="grid grid-cols-12 gap-1 text-xs font-bold text-slate-400 border-b border-slate-100 pb-2 mb-2 px-1">
              <div className="col-span-5">酒店名称</div>
              <div className="col-span-3 text-right">间夜</div>
              <div className="col-span-4 text-right pr-4">收入额 (元)</div>
            </div>

            <div className="space-y-1">
              {xiaozhenBusinessRevenue.map((b, j) => (
                <div key={j} className="grid grid-cols-12 gap-1 text-xs py-2 hover:bg-emerald-50/20 border-l-2 border-emerald-500 pl-2 rounded-lg transition-all items-center">
                  <div className="col-span-5 text-slate-700 font-semibold truncate">{b.name}</div>
                  <div className="col-span-3 text-right font-semibold font-mono text-slate-600">{b.transactions.toLocaleString('en-US')}</div>
                  <div className="col-span-4 text-right font-extrabold font-mono text-emerald-700 pr-4">{fm(b.revenue)}</div>
                </div>
              ))}
            </div>

            <div className="grid grid-cols-12 gap-1 text-xs font-black text-slate-900 border-t border-slate-100 mt-3 pt-3 px-2 bg-slate-50 p-2 rounded-lg">
              <div className="col-span-5">小计</div>
              <div className="col-span-3 text-right font-mono">{bizSubtotalQty.toLocaleString('en-US')}</div>
              <div className="col-span-4 text-right font-mono pr-4">{fm(bizSubtotalRev)}</div>
            </div>
          </div>

          {/* 停车场收入情况 */}
          <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm">
            <div className="flex justify-between items-center mb-3 pb-3 border-b border-slate-50">
              <div className="flex items-center gap-1.5">
                <span className="w-1.5 h-4 bg-indigo-600 rounded-full"></span>
                <h3 className="text-sm font-black text-slate-800">停车场收益监控</h3>
              </div>
              <span className="text-[10px] text-slate-400 font-bold">共 {xiaozhenParkingData.length} 处停车场</span>
            </div>

            <div className="grid grid-cols-2 gap-3">
              {xiaozhenParkingData.map((parking, index) => (
                <div key={index} className="bg-gradient-to-br from-indigo-50/50 to-purple-50/50 p-3 rounded-xl border border-indigo-100">
                  <div className="flex items-center gap-2 mb-2">
                    <Car className="w-3.5 h-3.5" style={{ color: parking.color }} />
                    <span className="text-xs font-black text-slate-700">{parking.name}</span>
                  </div>
                  <div className="grid grid-cols-2 gap-1 text-[10px] mb-2">
                    <div>
                      <div className="text-slate-400 font-bold">收费车次</div>
                      <div className="font-extrabold text-slate-800 font-mono text-xs">{parking.vehicles.toLocaleString('en-US')}</div>
                    </div>
                    <div>
                      <div className="text-slate-400 font-bold">停车费收入</div>
                      <div className="font-extrabold text-indigo-700 font-mono text-xs">{parking.revenue.toLocaleString('en-US')}</div>
                    </div>
                  </div>
                  <div className="flex justify-between items-center text-[9px] pt-1.5 border-t border-indigo-100/40">
                    <span className="text-slate-400">均价: {parking.avgPrice}</span>
                    <span className={`font-bold px-1.5 py-0.5 rounded ${parking.isUp ? 'bg-emerald-50 text-emerald-600' : 'bg-rose-50 text-rose-600'}`}>{parking.trend}</span>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="mt-3 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500 font-semibold px-1">
              <div>总车次：<span className="font-mono text-indigo-700 font-black">{xiaozhenParkingData.reduce((sum, p) => sum + p.vehicles, 0).toLocaleString('en-US')}</span></div>
              <div>总费收：<span className="font-mono text-indigo-700 font-black">{Math.round(xiaozhenParkingData.reduce((sum, p) => sum + p.revenue, 0)).toLocaleString('en-US')}</span></div>
              <div>综合客单：<span className="font-mono text-indigo-700 font-black">{Math.round(xiaozhenParkingData.reduce((sum, p) => sum + p.revenue, 0) / xiaozhenParkingData.reduce((sum, p) => sum + p.vehicles, 0))} 元</span></div>
            </div>
          </div>

        </div>
      </div>

      {/* ================= 联营商业经营情况 (PC Widescreen Custom Table) ================= */}
      <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm mt-6">
        <div className="flex items-center justify-between mb-4 border-b border-slate-50 pb-3">
          <div className="flex items-center gap-1.5">
            <span className="w-1.5 h-4 bg-blue-600 rounded-full"></span>
            <h3 className="text-sm font-black text-slate-800">联营商业经营情况</h3>
            <span className="text-xs text-slate-400 ml-2 bg-slate-50 px-2 py-0.5 rounded-full font-bold">联营商户数: {fpb.length}</span>
          </div>

          <div className="flex gap-2 p-1 bg-slate-100 rounded-xl text-xs font-bold">
            {[
              { k: 'mixed', l: '保底+流水分成模式', c: 'bg-purple-600 text-white shadow-sm' },
              { k: 'direct', l: '流水分成模式', c: 'bg-emerald-600 text-white shadow-sm' },
              { k: 'fixed', l: '固定租金模式', c: 'bg-blue-600 text-white shadow-sm' },
            ].map(t => (
              <button
                key={t.k}
                onClick={() => setPf(t.k)}
                className={`px-3 py-1.5 rounded-lg transition-all ${pf === t.k ? t.c : 'text-slate-500 hover:text-slate-700 hover:bg-slate-200'}`}
              >
                {t.l}
              </button>
            ))}
          </div>
        </div>

        {/* 宽屏响应式表格：保底+流水分成 */}
        {pf === 'mixed' && (
          <div className="overflow-x-auto rounded-xl border border-slate-100">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50/80 text-xs font-black text-slate-400 border-b border-slate-100">
                  <th className="p-3 pl-4">商户名称</th>
                  <th className="p-3 text-right">经营流水 (元)</th>
                  <th className="p-3 text-right">租金收入 (元)</th>
                  <th className="p-3 text-right text-purple-600">我方分成金额 (元)</th>
                  <th className="p-3 text-center">合同摘要</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50 text-sm">
                {fpb.map((b, j) => (
                  <tr key={j} className="hover:bg-purple-50/10 transition-all border-l-2 border-purple-500">
                    <td className="p-3 pl-4 font-semibold text-slate-800">{b.name}</td>
                    <td className="p-3 text-right font-semibold font-mono text-slate-700">{fm(b.revenue)}</td>
                    <td className="p-3 text-right font-semibold font-mono text-blue-700">50,000</td>
                    <td className="p-3 text-right font-black font-mono text-purple-600">{fm(cfs(b))}</td>
                    <td className="p-3 text-center">
                      <button 
                        onClick={() => handleContractView('协议信息：\n合同有效期：2024-01-01 至 2026-12-31\n保底租金：50,000元/月\n保底流水：100,000元/月\n超出部分分成比例：20%')}
                        className="text-blue-600 hover:text-blue-700 font-black underline text-xs cursor-pointer"
                      >
                        查看
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* 宽屏响应式表格：直接分成 */}
        {pf === 'direct' && (
          <div className="overflow-x-auto rounded-xl border border-slate-100">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50/80 text-xs font-black text-slate-400 border-b border-slate-100">
                  <th className="p-3 pl-4">商户名称</th>
                  <th className="p-3 text-right">经营流水 (元)</th>
                  <th className="p-3 text-right text-emerald-600">我方分成金额 (元)</th>
                  <th className="p-3 text-center">分成比例</th>
                  <th className="p-3 text-center">合同摘要</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50 text-sm">
                {fpb.map((b, j) => (
                  <tr key={j} className="hover:bg-emerald-50/10 transition-all border-l-2 border-emerald-500">
                    <td className="p-3 pl-4 font-semibold text-slate-800">{b.name}</td>
                    <td className="p-3 text-right font-semibold font-mono text-slate-700">{fm(b.revenue)}</td>
                    <td className="p-3 text-right font-black font-mono text-emerald-600">{fm(cfs(b))}</td>
                    <td className="p-3 text-center font-bold text-emerald-700">15%</td>
                    <td className="p-3 text-center">
                      <button 
                        onClick={() => handleContractView('协议信息：\n合同有效期：2024-01-01 至 2026-12-31\n流水分成比例：15%')}
                        className="text-blue-600 hover:text-blue-700 font-black underline text-xs cursor-pointer"
                      >
                        查看
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* 宽屏响应式表格：固定租金 */}
        {pf === 'fixed' && (
          <div className="overflow-x-auto rounded-xl border border-slate-100">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50/80 text-xs font-black text-slate-400 border-b border-slate-100">
                  <th className="p-3 pl-4">商户名称</th>
                  <th className="p-3 text-right text-blue-700">租金收入 (元)</th>
                  <th className="p-3 text-center">合同摘要</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50 text-sm">
                {fpb.map((b, j) => (
                  <tr key={j} className="hover:bg-blue-50/10 transition-all border-l-2 border-blue-500">
                    <td className="p-3 pl-4 font-semibold text-slate-800">{b.name}</td>
                    <td className="p-3 text-right font-black font-mono text-blue-700">{fm(b.revenue)}</td>
                    <td className="p-3 text-center">
                      <button 
                        onClick={() => handleContractView('协议信息：\n合同有效期：2024-01-01 至 2026-12-31\n固定租金：30,000元/月')}
                        className="text-blue-600 hover:text-blue-700 font-black underline text-xs cursor-pointer"
                      >
                        查看
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        <div className="mt-3 pt-3 border-t border-slate-100 flex items-center gap-2 text-[11px] text-slate-400">
          <span className="w-2 h-2 rounded-sm bg-blue-500"></span>
          <span>小镇商圈联营流水作为二销活跃度监测，其分成直接划转归入各联营实体往来账目。</span>
        </div>
      </div>
    </div>
  );
};
