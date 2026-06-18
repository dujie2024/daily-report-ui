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
            <span className="text-slate-800 text-base font-black tracking-tight font-mono">{langtaoshaData.revenue}</span>
            <span className="inline-flex items-center px-1.5 py-0.5 rounded-full text-[9px] font-bold bg-emerald-50 text-emerald-600 whitespace-nowrap">
              <TrendingUp className="w-2.5 h-2.5 mr-0.5" />
              同比 {langtaoshaData.revenueTrend}
            </span>
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
            <span className="text-slate-700 font-extrabold font-mono text-sm">{Math.round(langtaoshaData.rawRevenue * 1.15).toLocaleString('en-US')}</span>
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
        <div className="flex items-center gap-1.5 mb-2.5">
          <span className="w-1 h-3.5 bg-purple-600 rounded-full shrink-0"></span>
          <h3 className="text-slate-800 text-xs font-bold">主营业态收入（{dl}）</h3>
        </div>
        {/* 表头行 - 目标顺序：业态(35%) -> 收入金额(40%) -> 同比(25%) */}
        <div className="flex items-center w-full text-[10px] text-slate-400 font-bold mb-1 pb-1.5 border-b border-slate-100 whitespace-nowrap">
          <div style={{ width: '35%' }} className="text-left">业态</div>
          <div style={{ width: '40%' }} className="text-right pr-4">收入金额</div>
          <div style={{ width: '25%' }} className="text-center">同比</div>
        </div>
        {/* 数据行 - 严格对应比例与顺序 */}
        {langtaoshaRevenueStructure.map((d, j) => (
          <div key={j} className="flex items-center w-full text-[11px] py-1.5 hover:bg-slate-50 rounded whitespace-nowrap overflow-hidden">
            {/* 第1列：业态名称（35%） */}
            <div style={{ width: '35%' }} className="text-left flex items-center gap-1 min-w-0">
              <span className="w-1.5 h-1.5 rounded-full shrink-0" style={{ backgroundColor: d.color }}></span>
              <span className="text-slate-700 font-medium truncate">{d.name}</span>
            </div>
            {/* 第2列：数字金额（40% 靠右对齐，带右边距防止和同比贴太紧） */}
            <div style={{ width: '40%' }} className="text-right font-semibold text-slate-800 font-mono truncate pr-4">{fm(d.value)}</div>
            {/* 第3列：同比标签（25% 居中对齐） */}
            <div style={{ width: '25%' }} className="flex justify-center items-center min-w-0">
              <span className={`inline-block text-center px-1 py-0.5 rounded text-[10px] font-bold truncate ${d.isUp ? 'bg-emerald-50 text-emerald-600' : 'bg-rose-50 text-rose-600'}`}>{d.trend}</span>
            </div>
          </div>
        ))}
        {/* 小计行 - 严格对应比例与顺序 */}
        <div className="flex items-center w-full text-[11px] mt-1 border-t border-slate-100 bg-slate-50 py-1.5 rounded whitespace-nowrap">
          <div style={{ width: '35%' }} className="text-left font-bold text-slate-800 pl-1">小计</div>
          <div style={{ width: '40%' }} className="text-right font-extrabold text-slate-800 font-mono pr-4">{fm(revenueSubtotal)}</div>
          <div style={{ width: '25%' }}></div>
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
        <div className="flex items-center text-[10px] text-slate-400 font-bold mb-1 pb-1.5 border-b border-slate-100 whitespace-nowrap">
          <div style={{ width: '50%' }} className="text-left">商户名称</div>
          <div style={{ width: '20%' }} className="text-right">笔数</div>
          <div style={{ width: '30%' }} className="text-right">销售收入</div>
        </div>
        {/* 数据行 */}
        <div className="space-y-0.5 max-h-[300px] overflow-y-auto">
          {fpb.map((b, j) => (
            <div key={j} className="flex items-center text-[11px] py-1.5 hover:bg-blue-50/50 border-l-2 border-blue-500 pl-2 rounded whitespace-nowrap">
              <div style={{ width: '50%' }} className="text-left font-bold text-slate-700 truncate">{b.name}</div>
              <div style={{ width: '20%' }} className="text-right font-mono text-slate-800 font-semibold">{b.transactions.toLocaleString('en-US')}</div>
              <div style={{ width: '30%' }} className="text-right font-mono text-slate-800 font-semibold">{fm(b.revenue)}</div>
            </div>
          ))}
        </div>
        {/* 小计行 */}
        <div className="flex items-center text-[11px] mt-1 border-t border-slate-100 bg-slate-50 py-1.5 px-1 rounded whitespace-nowrap">
          <div style={{ width: '50%' }} className="text-left font-bold text-slate-800">小计</div>
          <div style={{ width: '20%' }} className="text-right font-extrabold text-slate-800 font-mono">{shopSubtotalQty.toLocaleString('en-US')}</div>
          <div style={{ width: '30%' }} className="text-right font-extrabold text-slate-800 font-mono">{fm(shopSubtotalRev)}</div>
        </div>

        <div className="mt-2 pt-2 border-t border-slate-100 flex items-center gap-2 text-[10px] text-slate-400">
          <span className="w-2 h-2 rounded-sm bg-blue-500"></span>
          <span>联营商户流水仅作参考</span>
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