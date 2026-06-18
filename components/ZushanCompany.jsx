import { useState } from 'react';
import { DollarSign, Users, Activity, UserCheck, TrendingUp } from 'lucide-react';

export const ZushanCompany = ({ 
  zushanData, zushanChannelSales, zushanRevenueStructure, zushanProductSales,
  zushanProductPrice, zushanBusinessRevenue, userRole, setActiveTab, dimension = 'day', setDimension
}) => {
  const [pf, setPf] = useState('mixed');
  const fpb = zushanBusinessRevenue.filter(b => b.type === '联营').filter(b => {
    if (pf === 'mixed') return b.rentMode === '保底+流水';
    if (pf === 'direct') return b.rentMode === '直接分成';
    if (pf === 'fixed') return b.rentMode === '固定租金';
    return true;
  });

  const fm = v => Math.round(v).toLocaleString('en-US');
  const dl = dimension === 'day' ? '本日' : dimension === 'month' ? '本月' : '本年';

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

  // grid模板：每个字符串包含 grid（display:grid）和 grid-cols-[...]（列宽）
  const QD   = 'grid grid-cols-[1fr_60px_100px_70px]'; // 渠道：名称 | 人次 | 金额 | 同比
  const G4   = 'grid grid-cols-[1fr_70px_100px_70px]';
  const G4B  = 'grid grid-cols-[1fr_50px_70px_100px]';
  const G4C  = 'grid grid-cols-[1fr_90px_90px_70px]';
  const G3C  = 'grid grid-cols-[1fr_90px_70px]';

  // 表头样式
  const H = 'text-[10px] text-slate-500 font-bold mb-1 pb-1.5 border-b border-slate-200';
  // 数据行
  const D = 'items-center py-1.5 hover:bg-slate-50 rounded';

  const kpis = [
    {l:'总收入 (元)', v:zushanData.revenue, t:zushanData.revenueTrend, ic:DollarSign, bg:'bg-emerald-50', tc:'text-emerald-500'},
    {l:'总客流 (人次)', v:zushanData.visitors, t:zushanData.visitorsTrend, ic:Users, bg:'bg-blue-50', tc:'text-blue-500'},
    {l:'收费客流 (人次)', v:zushanData.paidVisitors, t:null, ic:Activity, bg:'bg-indigo-50', tc:'text-indigo-500'},
    {l:'接待客流 (人次)', v:zushanData.receptionVisitors, t:null, ic:UserCheck, bg:'bg-purple-50', tc:'text-purple-500'},
  ];

  // 主营业态收入 3列 Grid 模板
  const G3_Revenue = 'grid grid-cols-[5fr_2fr_3fr] gap-x-1 items-center';

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-3">
        {kpis.map((k,i) => {
          const IC = k.ic;
          return (
            <div key={i} className="bg-white p-3 rounded-2xl shadow-sm border border-slate-100">
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-slate-400 text-[10px] font-bold">{k.l}</span>
                <div className={`w-5 h-5 rounded-full ${k.bg} ${k.tc} flex items-center justify-center`}><IC className="w-3 h-3" /></div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-800 text-base font-black tracking-tight font-mono">{k.v}</span>
                {k.t && <span className="inline-flex items-center px-1.5 py-0.5 rounded-full text-[9px] font-bold bg-emerald-50 text-emerald-600 whitespace-nowrap"><TrendingUp className="w-2.5 h-2.5 mr-0.5" />同比 {k.t}</span>}
              </div>
            </div>
          );
        })}
      </div>

      <div className="bg-white p-4 rounded-2xl shadow-sm border border-slate-100">
        <div className="flex items-center gap-1.5 mb-3">
          <span className="w-1 h-3.5 bg-blue-600 rounded-full shrink-0"></span>
          <h3 className="text-slate-800 text-xs font-bold">{dimension === 'year' ? '年度计划达成' : '月度计划达成'}</h3>
        </div>
        <div className="space-y-3.5">
          <div className="flex items-center justify-between bg-slate-50 p-2.5 rounded-xl border border-slate-100">
            <span className="text-slate-400 text-[10px] font-bold">{dimension === 'year' ? '年度创值计划（6月）' : '月度创值计划（6月）'}</span>
            <span className="text-slate-700 font-extrabold font-mono text-sm">{Math.round(zushanData.rawRevenue * 1.15).toLocaleString('en-US')}</span>
          </div>
          <div className="space-y-2">
            {[
              ['时间进度比','70%','bg-slate-400',''],
              ['实际收入完成率',`${((zushanData.rawRevenue/(zushanData.rawRevenue*1.15))*100).toFixed(1)}%`,'bg-emerald-500','text-emerald-600']
            ].map(([lb,vl,cl,vc],j) => (
              <div key={j}>
                <div className="flex justify-between text-[10px] text-slate-500 mb-1"><span>{lb}</span><span className={`font-bold ${vc}`}>{vl}</span></div>
                <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden"><div className={`${cl} h-full rounded-full`} style={{width:vl}}></div></div>
              </div>
            ))}
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
        {zushanRevenueStructure.map((d,j) => (
          <div key={j} className="flex items-center w-full text-[11px] py-1.5 hover:bg-slate-50 rounded whitespace-nowrap overflow-hidden">
            {/* 第1列：业态名称（35%） */}
            <div style={{ width: '35%' }} className="text-left flex items-center gap-1 min-w-0">
              <span className="w-1.5 h-1.5 rounded-full shrink-0" style={{backgroundColor:d.color}}></span>
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
          <div style={{ width: '40%' }} className="text-right font-extrabold text-slate-800 font-mono pr-4">{fm(zushanRevenueStructure.reduce((s,d)=>s+d.value,0))}</div>
          <div style={{ width: '25%' }}></div>
        </div>
      </div>

      {/* === 渠道销售情况（4列：渠道 | 人次 | 金额 | 同比）=== */}
      <div className="bg-white p-3.5 rounded-2xl shadow-sm border border-slate-100">
        <div className="flex items-center gap-1.5 mb-2">
          <span className="w-1 h-3.5 bg-blue-600 rounded-full shrink-0"></span>
          <h3 className="text-slate-800 text-xs font-bold">渠道销售情况（{dl}）</h3>
        </div>
        {/* 表头 */}
        <div className="flex items-center w-full text-[10px] text-slate-400 font-bold mb-1 pb-1.5 border-b border-slate-100 whitespace-nowrap">
          <div style={{ width: '35%' }} className="text-left">渠道</div>
          <div style={{ width: '15%' }} className="text-right">人次</div>
          <div style={{ width: '30%' }} className="text-right pr-4">销售收入</div>
          <div style={{ width: '20%' }} className="text-center">同比</div>
        </div>
        {/* 数据行 */}
        {zushanChannelSales.map((d,j) => (
          <div key={j} className="flex items-center w-full text-[11px] py-1.5 hover:bg-slate-50 rounded whitespace-nowrap overflow-hidden">
            <div style={{ width: '35%' }} className="text-left flex items-center gap-1.5 min-w-0">
              <span className={`w-1.5 h-1.5 rounded-full shrink-0 ${d.bgColor}`}></span>
              <span className="text-slate-700 font-medium truncate">{d.name}</span>
            </div>
            <div style={{ width: '15%' }} className="text-right font-mono text-slate-800 font-semibold">{d.quantity.toLocaleString('en-US')}</div>
            <div style={{ width: '30%' }} className="text-right font-mono text-slate-800 font-semibold truncate pr-4">{fm(d.revenue)}</div>
            <div style={{ width: '20%' }} className="flex justify-center items-center min-w-0">
              <span className={`inline-block text-center px-1 py-0.5 rounded text-[10px] font-bold truncate ${d.isUp?'bg-emerald-50 text-emerald-600':'bg-rose-50 text-rose-600'}`}>{d.trend}</span>
            </div>
          </div>
        ))}
        {/* 小计行 */}
        <div className="flex items-center w-full text-[11px] mt-1 border-t border-slate-100 bg-slate-50 py-1.5 rounded whitespace-nowrap">
          <div style={{ width: '35%' }} className="text-left font-bold text-slate-800 pl-1">小计</div>
          <div style={{ width: '15%' }} className="text-right font-extrabold text-slate-800 font-mono">{zushanChannelSales.reduce((s,c)=>s+c.quantity,0).toLocaleString('en-US')}</div>
          <div style={{ width: '30%' }} className="text-right font-extrabold text-slate-800 font-mono pr-4">{fm(zushanChannelSales.reduce((s,c)=>s+c.revenue,0))}</div>
          <div style={{ width: '20%' }}></div>
        </div>
      </div>

      {/* === 产品销售情况（4列）=== */}
      <div className="bg-white p-3.5 rounded-2xl shadow-sm border border-slate-100">
        <div className="flex items-center gap-1.5 mb-2">
          <span className="w-1 h-3.5 bg-cyan-600 rounded-full shrink-0"></span>
          <h3 className="text-slate-800 text-xs font-bold">产品销售情况（{dl}）</h3>
        </div>
        {/* 表头 */}
        <div className="flex items-center w-full text-[10px] text-slate-400 font-bold mb-1 pb-1.5 border-b border-slate-100 whitespace-nowrap">
          <div style={{ width: '35%' }} className="text-left">产品名称</div>
          <div style={{ width: '15%' }} className="text-right">销售数量</div>
          <div style={{ width: '30%' }} className="text-right pr-4">销售收入</div>
          <div style={{ width: '20%' }} className="text-center">同比</div>
        </div>
        {/* 数据行 */}
        {zushanProductSales.map((p,j) => (
          <div key={j} className="flex items-center w-full text-[11px] py-1.5 hover:bg-slate-50 rounded whitespace-nowrap overflow-hidden">
            <div style={{ width: '35%' }} className="text-left flex items-center gap-1.5 min-w-0">
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-500 shrink-0"></span>
              <span className="text-slate-700 font-medium truncate">{p.name}</span>
            </div>
            <div style={{ width: '15%' }} className="text-right font-mono text-slate-800 font-semibold">{p.quantity.toLocaleString('en-US')}</div>
            <div style={{ width: '30%' }} className="text-right font-mono text-slate-800 font-semibold truncate pr-4">{fm(p.revenue)}</div>
            <div style={{ width: '20%' }} className="flex justify-center items-center min-w-0">
              <span className={`inline-block text-center px-1 py-0.5 rounded text-[10px] font-bold truncate ${p.isUp?'bg-emerald-50 text-emerald-600':'bg-rose-50 text-rose-600'}`}>{p.trend}</span>
            </div>
          </div>
        ))}
        {/* 小计行 */}
        <div className="flex items-center w-full text-[11px] mt-1 border-t border-slate-100 bg-slate-50 py-1.5 rounded whitespace-nowrap">
          <div style={{ width: '35%' }} className="text-left font-bold text-slate-800 pl-1">小计</div>
          <div style={{ width: '15%' }} className="text-right font-extrabold text-slate-800 font-mono">{zushanProductSales.reduce((s,p)=>s+p.quantity,0).toLocaleString('en-US')}</div>
          <div style={{ width: '30%' }} className="text-right font-extrabold text-slate-800 font-mono pr-4">{fm(zushanProductSales.reduce((s,p)=>s+p.revenue,0))}</div>
          <div style={{ width: '20%' }}></div>
        </div>
      </div>

      {/* 产品客单 */}
      <div className="bg-white p-4 rounded-2xl shadow-sm border border-slate-100">
        <div className="flex justify-between items-center mb-3">
          <div className="flex items-center gap-1.5"><span className="w-1.5 h-3.5 bg-indigo-600 rounded-full"></span><h3 className="text-slate-800 text-xs font-bold">产品客单</h3></div>
          <span className="text-[10px] text-slate-400">平均价格</span>
        </div>
        <div className="bg-gradient-to-br from-indigo-50 to-blue-50 p-4 rounded-xl border border-indigo-100">
          <div className="flex items-center justify-between">
            <div><span className="text-xs text-slate-500 block mb-1">祖山门票客单</span><div className="flex items-baseline gap-2"><span className="text-2xl font-black text-indigo-600 font-mono">{zushanProductPrice.ticketPrice}</span><span className="text-xs text-slate-400">/人次</span></div></div>
            <span className={`inline-flex items-center px-2 py-1 rounded-lg text-xs font-bold ${zushanProductPrice.isUp?'bg-emerald-100 text-emerald-700':'bg-rose-100 text-rose-700'}`}><TrendingUp className="w-3 h-3 mr-0.5"/>同比 {zushanProductPrice.trend}</span>
          </div>
        </div>
      </div>

      {/* 自营商业收入 */}
      <div className="bg-white p-3.5 rounded-2xl shadow-sm border border-slate-100">
        <div className="flex items-center gap-1.5 mb-2">
          <span className="w-1.5 h-3.5 bg-emerald-600 rounded-full shrink-0"></span>
          <h3 className="text-slate-800 text-xs font-bold">自营商业收入</h3>
          <span className="text-[10px] text-slate-400 ml-auto">共 {zushanBusinessRevenue.filter(b=>b.type==='自营').length} 家商户</span>
        </div>
        {/* 表头 */}
        <div className="flex items-center w-full text-[10px] text-slate-400 font-bold mb-1 pb-1.5 border-b border-slate-100 whitespace-nowrap">
          <div style={{ width: '40%' }} className="text-left">店铺名称</div>
          <div style={{ width: '20%' }} className="text-center">类型</div>
          <div style={{ width: '18%' }} className="text-right">交易笔数</div>
          <div style={{ width: '22%' }} className="text-right pr-4">交易额</div>
        </div>
        {/* 数据行 */}
        {zushanBusinessRevenue.filter(b=>b.type==='自营').map((b,j) => (
          <div key={j} className="flex items-center w-full text-[11px] py-1.5 hover:bg-emerald-50/50 border-l-2 border-emerald-500 pl-2 rounded whitespace-nowrap overflow-hidden">
            <div style={{ width: '40%' }} className="text-left font-medium text-slate-700 truncate">{b.name}</div>
            <div style={{ width: '20%' }} className="flex justify-center">
              <span className="inline-block text-center text-[9px] font-bold bg-emerald-50 text-emerald-700 px-1 py-0.5 rounded">{b.type}</span>
            </div>
            <div style={{ width: '18%' }} className="text-right font-mono text-slate-800 font-semibold">{b.transactions.toLocaleString('en-US')}</div>
            <div style={{ width: '22%' }} className="text-right font-mono text-slate-800 font-semibold truncate pr-4">{fm(b.revenue)}</div>
          </div>
        ))}
        <div className="flex items-center w-full text-[11px] mt-1 border-t border-slate-100 bg-slate-50 py-1.5 rounded whitespace-nowrap">
          <div style={{ width: '40%' }} className="text-left font-bold text-slate-800 pl-1">小计</div>
          <div style={{ width: '20%' }}></div>
          <div style={{ width: '18%' }} className="text-right font-extrabold text-slate-800 font-mono">{zushanBusinessRevenue.filter(b=>b.type==='自营').reduce((s,b)=>s+b.transactions,0).toLocaleString('en-US')}</div>
          <div style={{ width: '22%' }} className="text-right font-extrabold text-slate-800 font-mono pr-4">{fm(zushanBusinessRevenue.filter(b=>b.type==='自营').reduce((s,b)=>s+b.revenue,0))}</div>
        </div>
        <div className="mt-2 pt-2 border-t border-slate-100 flex items-center gap-2 text-[10px] text-slate-400"><span className="w-2 h-2 rounded-sm bg-emerald-500"></span><span>自营店铺流水计入收入</span></div>
      </div>

      {/* 商业经营情况 */}
      <div className="bg-white p-3.5 rounded-2xl shadow-sm border border-slate-100">
        <div className="flex items-center gap-1.5 mb-2">
          <span className="w-1.5 h-3.5 bg-blue-600 rounded-full shrink-0"></span>
          <h3 className="text-slate-800 text-xs font-bold">商业经营情况</h3>
          <span className="text-[10px] text-slate-400 ml-auto">共 {fpb.length} 家商户</span>
        </div>
        <div className="flex gap-1.5 mb-3 p-1 bg-slate-100 rounded-lg">
          {[
            {k:'mixed',l:'保底+流水分成',c:'bg-purple-600'},
            {k:'direct',l:'直接分成',c:'bg-emerald-600'},
            {k:'fixed',l:'固定租金',c:'bg-blue-600'},
          ].map(t => (
            <button key={t.k} onClick={()=>setPf(t.k)} className={`flex-1 px-2 py-2 rounded-md text-[11px] font-bold transition-all ${pf===t.k?`${t.c} text-white shadow-md`:'text-slate-500 hover:text-slate-700 hover:bg-slate-200'}`}>{t.l}</button>
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

        <div className="mt-2 pt-2 border-t border-slate-100 flex items-center gap-2 text-[10px] text-slate-400"><span className="w-2 h-2 rounded-sm bg-blue-500"></span><span>联营商户流水仅作参考</span></div>
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
        <button onClick={()=>setActiveTab('platform')} className="w-full bg-slate-200 hover:bg-slate-300 text-slate-700 py-3 rounded-xl text-xs font-bold transition-all">返回平台总览</button>
      )}
    </div>
  );
};