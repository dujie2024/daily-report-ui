import { useState } from 'react';
import { DollarSign, Activity, TrendingUp, Store } from 'lucide-react';

export const LangtaoshaCompany = ({ 
  langtaoshaData, 
  langtaoshaChannelSales, 
  langtaoshaRevenueStructure,
  langtaoshaBusinessRevenue,
  userRole,
  setActiveTab,
  dimension = 'day',
  setDimension
}) => {
  const dl = dimension === 'day' ? '本日' : dimension === 'month' ? '本月' : '本年';
  const fm = v => Math.round(v).toLocaleString('en-US');

  // 商铺筛选状态
  const [pf, setPf] = useState('mixed');
  const fpb = langtaoshaBusinessRevenue.filter(b => {
    if (pf === 'mixed') return b.rentMode === '保底+流水';
    if (pf === 'direct') return b.rentMode === '直接分成';
    if (pf === 'fixed') return b.rentMode === '固定租金';
    return true;
  });

  const revenueSubtotal = langtaoshaRevenueStructure.reduce((s, d) => s + d.value, 0);

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
            <span className="w-1.5 h-6 bg-blue-600 rounded-full"></span>
            浪淘沙公司 运营决策中心
          </h2>
          <p className="text-xs text-slate-500 mt-1">全局掌控海滨浴场、游船观光、特许商铺租赁及联营实体营收绩效</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex bg-slate-100 p-1 rounded-xl">
            {[['day', '日报'], ['month', '月报'], ['year', '年报']].map(([v, l]) => (
              <button
                key={v}
                onClick={() => setDimension(v)}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${dimension === v ? 'bg-white text-blue-600 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
              >
                {l}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* KPI 数据卡片 - 3列 PC 宽屏排版 */}
      <div className="grid grid-cols-3 gap-6">
        <div className="bg-gradient-to-br from-emerald-50 to-teal-50/20 p-5 rounded-2xl border border-emerald-100 shadow-sm flex flex-col justify-between">
          <span className="text-emerald-800 text-xs font-bold">总收入 (元)</span>
          <div className="text-3xl font-black text-slate-800 font-mono mt-4">{langtaoshaData.revenue}</div>
          <span className="text-xs text-emerald-600 font-bold mt-2 flex items-center gap-1">
            <TrendingUp className="w-3.5 h-3.5" />
            <span>同比 {langtaoshaData.revenueTrend} 强劲增长</span>
          </span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm">
          <div className="flex items-center gap-1.5 mb-3">
            <span className="w-1.5 h-4 bg-blue-600 rounded-full"></span>
            <h3 className="text-sm font-black text-slate-800">{dimension === 'year' ? '年度计划达成情况' : '月度计划达成情况'}</h3>
          </div>
          <div className="space-y-4">
            <div className="flex items-center justify-between bg-slate-50 p-3 rounded-xl border border-slate-100">
              <span className="text-slate-500 text-xs font-bold">创值计划目标</span>
              <span className="text-slate-800 font-black font-mono text-sm">{Math.round(langtaoshaData.rawRevenue * 1.15).toLocaleString('en-US')} 元</span>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <div className="flex justify-between text-[10px] text-slate-500 mb-1">
                  <span>时间进度</span>
                  <span className="font-bold">70%</span>
                </div>
                <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
                  <div className="bg-slate-400 h-full" style={{ width: '70%' }}></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between text-[10px] text-slate-700 mb-1">
                  <span className="font-semibold">创值完成率</span>
                  <span className="text-emerald-600 font-bold">{((langtaoshaData.rawRevenue / (langtaoshaData.rawRevenue * 1.15)) * 100).toFixed(1)}%</span>
                </div>
                <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
                  <div className="bg-emerald-500 h-full" style={{ width: `${((langtaoshaData.rawRevenue / (langtaoshaData.rawRevenue * 1.15)) * 100).toFixed(1)}%` }}></div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 主营业态收入 (PC 3列简化展示) */}
        <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm">
          <div className="flex items-center gap-1.5 mb-3">
            <span className="w-1.5 h-4 bg-purple-600 rounded-full"></span>
            <h3 className="text-sm font-black text-slate-800">主营业态收入占比（{dl}）</h3>
          </div>
          <div className="space-y-2">
            {langtaoshaRevenueStructure.map((d, j) => (
              <div key={j} className="flex justify-between items-center text-xs py-1">
                <div className="flex items-center gap-1.5 min-w-0">
                  <span className="w-2 h-2 rounded-full shrink-0" style={{ backgroundColor: d.color }}></span>
                  <span className="text-slate-600 truncate">{d.name}</span>
                </div>
                <div className="flex gap-4 font-mono font-bold">
                  <span className="text-slate-800">{fm(d.value)}</span>
                  <span className={`text-[10px] px-1.5 py-0.2 rounded ${d.isUp ? 'text-emerald-600 bg-emerald-50' : 'text-rose-600 bg-rose-50'}`}>{d.trend}</span>
                </div>
              </div>
            ))}
            <div className="flex justify-between border-t border-slate-50 pt-2 text-xs font-black text-slate-900 mt-2">
              <span>主营业态合计</span>
              <span className="font-mono">{fm(revenueSubtotal)}</span>
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
                    <td className="p-3 text-right font-black font-mono text-purple-600">{fm(b.revenue * 0.2)}</td>
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
                    <td className="p-3 text-right font-black font-mono text-emerald-600">{fm(b.revenue * 0.15)}</td>
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
          <span>联营商铺数据作为沙滩综合消费指标。所有分成款项汇入浪淘沙二销主营账户统一核算。</span>
        </div>
      </div>
    </div>
  );
};
