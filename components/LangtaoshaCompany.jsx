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

  // 计算合计
  const revenueSubtotal = langtaoshaRevenueStructure.reduce((s, d) => s + d.value, 0);
  const shopSubtotalQty = fpb.reduce((s, b) => s + b.transactions, 0);
  const shopSubtotalRev = fpb.reduce((s, b) => s + b.revenue, 0);
  // 商铺总数
  const totalShopCount = langtaoshaBusinessRevenue.length;
  // 固定租金商铺
  const fixedRentCount = langtaoshaBusinessRevenue.filter(b => b.rentMode === '固定租金').length;

  return (
    <div className="space-y-4">
      {/* 浪淘沙头部信息卡 - 标题与日期切换同行 */}
      <div className="bg-white p-4 rounded-2xl shadow-sm border border-slate-100">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-black text-slate-800">浪淘沙经营看板</h2>
          <div className="flex items-center gap-2">
            <span className="text-[10px] px-2 py-0.5 rounded-full bg-blue-50 text-blue-700 font-bold">岸基沙滩</span>
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
      </div>

      {/* KPI 数据网格 */}
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
            <span className="text-slate-800 text-base font-black tracking-tight font-mono">{fm(langtaoshaData.revenue)}</span>
            <span className="inline-flex items-center px-1.5 py-0.5 rounded-full text-[9px] font-bold bg-emerald-50 text-emerald-600 whitespace-nowrap">
              <TrendingUp className="w-2.5 h-2.5 mr-0.5" />
              同比 {langtaoshaData.revenueTrend}
            </span>
          </div>
        </div>

        {/* 商铺数 + 出租率 - 两排 */}
        <div className="grid grid-cols-2 gap-3">
          <div className="bg-white p-3 rounded-2xl shadow-sm border border-slate-100">
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-slate-400 text-[10px] font-bold">商铺数</span>
              <div className="w-5 h-5 rounded-full bg-orange-50 flex items-center justify-center text-orange-500">
                <Store className="w-3 h-3" />
              </div>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-slate-800 text-base font-black tracking-tight font-mono">{totalShopCount}</span>
            </div>
          </div>

          <div className="bg-white p-3 rounded-2xl shadow-sm border border-slate-100">
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-slate-400 text-[10px] font-bold">出租率</span>
              <div className="w-5 h-5 rounded-full bg-blue-50 flex items-center justify-center text-blue-500">
                <Activity className="w-3 h-3" />
              </div>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-slate-800 text-base font-black tracking-tight font-mono">{Math.round(fixedRentCount / totalShopCount * 100)}%</span>
              <span className="inline-flex items-center px-1.5 py-0.5 rounded-full text-[9px] font-bold bg-emerald-50 text-emerald-600 whitespace-nowrap">
                <TrendingUp className="w-2.5 h-2.5 mr-0.5" />
                同比 +3.2%
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* 月度计划达成 */}
      <div className="bg-white p-4 rounded-2xl shadow-sm border border-slate-100">
        <div className="flex items-center gap-1.5 mb-3">
          <span className="w-1 h-3.5 bg-blue-600 rounded-full"></span>
          <h3 className="text-slate-800 text-xs font-bold tracking-wide">{dimension === 'year' ? '年度计划达成' : '月度计划达成'}</h3>
        </div>

        <div className="space-y-3.5">
          <div className="flex items-center justify-between bg-slate-50 p-2.5 rounded-xl border border-slate-100">
            <span className="text-slate-400 text-[10px] font-bold">{dimension === 'year' ? '年度创值计划（6月）' : '月度创值计划（6月）'}</span>
            <span className="text-slate-700 font-extrabold font-mono text-sm">¥{(langtaoshaData.rawRevenue * 1.15).toFixed(0)}</span>
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

      {/* === 主营业态收入（3列）=== */}
      <div className="bg-white p-3.5 rounded-2xl shadow-sm border border-slate-100">
        <div className="flex items-center gap-1.5 mb-2">
          <span className="w-1 h-3.5 bg-purple-600 rounded-full shrink-0"></span>
          <h3 className="text-slate-800 text-xs font-bold">主营业态收入（{dl}）</h3>
        </div>
        <div className="grid grid-cols-[1fr_100px_70px] text-[10px] text-slate-500 font-bold mb-1 pb-1.5 border-b border-slate-200">
          <div>业态</div>
          <div className="text-right">收入金额</div>
          <div className="text-center">同比</div>
        </div>
        {langtaoshaRevenueStructure.map((d, j) => (
          <div key={j} className="grid grid-cols-[1fr_100px_70px] items-center py-1.5 hover:bg-slate-50 rounded">
            <div className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full shrink-0" style={{ backgroundColor: d.color }}></span>
              <span className="text-[11px] font-bold text-slate-700 truncate">{d.name}</span>
            </div>
            <span className="text-right text-[11px] font-mono text-slate-800 font-semibold">{fm(d.value)}</span>
            <span className={`text-center text-[9px] font-bold px-1 py-0.5 rounded ${d.isUp ? 'bg-emerald-50 text-emerald-600' : 'bg-rose-50 text-rose-600'}`}>{d.trend}</span>
          </div>
        ))}
        <div className="grid grid-cols-[1fr_100px_70px] items-center py-1.5 mt-1 border-t border-slate-200 bg-slate-50 rounded">
          <span className="text-[11px] font-bold text-slate-800">小计</span>
          <span className="text-right text-[11px] font-mono text-slate-800 font-extrabold">{fm(revenueSubtotal)}</span>
          <span></span>
        </div>
      </div>

      {/* === 商铺销售情况（4列: 商户名称 | 业态 | 交易笔数 | 销售收入 | 同比）=== */}
      <div className="bg-white p-3.5 rounded-2xl shadow-sm border border-slate-100">
        <div className="flex items-center gap-1.5 mb-2">
          <span className="w-1 h-3.5 bg-blue-600 rounded-full shrink-0"></span>
          <h3 className="text-slate-800 text-xs font-bold">商铺销售情况（{dl}）</h3>
          <span className="text-[10px] text-slate-400 ml-auto">共 {fpb.length} 家</span>
        </div>

        {/* 标签页筛选 */}
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

        {/* 表头 */}
        <div className="grid grid-cols-[1fr_50px_90px_70px] text-[10px] text-slate-500 font-bold mb-1 pb-1 border-b border-slate-200 items-center">
          <div>商户名称</div>
          <div className="text-right">笔数</div>
          <div className="text-right">销售收入</div>
          <div className="text-center">同比</div>
        </div>
        {/* 数据行 */}
        <div className="space-y-0.5 max-h-[300px] overflow-y-auto">
          {fpb.map((b, j) => (
            <div key={j} className="grid grid-cols-[1fr_50px_90px_70px] items-center py-1.5 hover:bg-blue-50/50 border-l-2 border-blue-500 pl-2 rounded">
              <span className="text-[11px] font-bold text-slate-700 truncate">{b.name}</span>
              <span className="text-right text-[11px] font-mono text-slate-800 font-semibold">{b.transactions.toLocaleString('en-US')}</span>
              <span className="text-right text-[11px] font-mono text-slate-800 font-semibold">{fm(b.revenue)}</span>
              <span className={`text-center text-[9px] font-bold px-1 py-0.5 rounded ${b.isUp ? 'bg-emerald-50 text-emerald-600' : 'bg-rose-50 text-rose-600'}`}>{b.trend}</span>
            </div>
          ))}
        </div>
        {/* 小计行 */}
        <div className="grid grid-cols-[1fr_50px_90px_70px] items-center py-1.5 mt-1 border-t border-slate-200 bg-slate-50 rounded">
          <span className="text-[11px] font-bold text-slate-800">小计</span>
          <span className="text-right text-[11px] font-mono text-slate-800 font-extrabold">{shopSubtotalQty.toLocaleString('en-US')}</span>
          <span className="text-right text-[11px] font-mono text-slate-800 font-extrabold">{fm(shopSubtotalRev)}</span>
          <span></span>
        </div>

        <div className="mt-2 pt-2 border-t border-slate-100 flex items-center gap-2 text-[10px] text-slate-400">
          <span className="w-2 h-2 rounded-sm bg-blue-500"></span>
          <span>联营商户流水仅作参考</span>
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