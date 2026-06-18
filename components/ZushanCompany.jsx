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
  const G3   = 'grid grid-cols-[1fr_100px_70px]';
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
        <div className="flex items-center gap-1.5 mb-2">
          <span className="w-1 h-3.5 bg-purple-600 rounded-full shrink-0"></span>
          <h3 className="text-slate-800 text-xs font-bold">主营业态收入（{dl}）</h3>
        </div>
        <div className={`${G3} ${H}`}>
          <div>业态</div>
          <div className="text-right">收入金额</div>
          <div className="text-center">同比</div>
        </div>
        {zushanRevenueStructure.map((d,j) => (
          <div key={j} className={`${G3} ${D}`}>
            <div className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full shrink-0" style={{backgroundColor:d.color}}></span>
              <span className="text-[11px] font-bold text-slate-700 truncate">{d.name}</span>
            </div>
            <span className="text-right text-[11px] font-mono text-slate-800 font-semibold">{fm(d.value)}</span>
            <span className={`text-center text-[9px] font-bold px-1 py-0.5 rounded ${d.isUp?'bg-emerald-50 text-emerald-600':'bg-rose-50 text-rose-600'}`}>{d.trend}</span>
          </div>
        ))}
        <div className={`${G3} items-center py-1.5 mt-1 border-t border-slate-200 bg-slate-50 rounded`}>
          <span className="text-[11px] font-bold text-slate-800">小计</span>
          <span className="text-right text-[11px] font-mono text-slate-800 font-extrabold">{fm(zushanRevenueStructure.reduce((s,d)=>s+d.value,0))}</span>
          <span></span>
        </div>
      </div>

      {/* === 渠道销售情况（4列：渠道 | 人次 | 金额 | 同比）=== */}
      <div className="bg-white p-3.5 rounded-2xl shadow-sm border border-slate-100">
        <div className="flex items-center gap-1.5 mb-2">
          <span className="w-1 h-3.5 bg-blue-600 rounded-full shrink-0"></span>
          <h3 className="text-slate-800 text-xs font-bold">渠道销售情况（{dl}）</h3>
        </div>
        <div className={`${QD} ${H}`}>
          <div>渠道</div>
          <div className="text-right">人次</div>
          <div className="text-right">销售收入</div>
          <div className="text-center">同比</div>
        </div>
        {zushanChannelSales.map((d,j) => (
          <div key={j} className={`${QD} ${D}`}>
            <div className="flex items-center gap-1.5">
              <span className={`w-1.5 h-1.5 rounded-full shrink-0 ${d.bgColor}`}></span>
              <span className="text-[11px] font-bold text-slate-700 truncate">{d.name}</span>
            </div>
            <span className="text-right text-[11px] font-mono text-slate-800 font-semibold">{d.quantity.toLocaleString('en-US')}</span>
            <span className="text-right text-[11px] font-mono text-slate-800 font-semibold">{fm(d.revenue)}</span>
            <span className={`text-center text-[9px] font-bold px-1 py-0.5 rounded ${d.isUp?'bg-emerald-50 text-emerald-600':'bg-rose-50 text-rose-600'}`}>{d.trend}</span>
          </div>
        ))}
        <div className={`${QD} items-center py-1.5 mt-1 border-t border-slate-200 bg-slate-50 rounded`}>
          <span className="text-[11px] font-bold text-slate-800">小计</span>
          <span className="text-right text-[11px] font-mono text-slate-800 font-extrabold">{zushanChannelSales.reduce((s,c)=>s+c.quantity,0).toLocaleString('en-US')}</span>
          <span className="text-right text-[11px] font-mono text-slate-800 font-extrabold">{fm(zushanChannelSales.reduce((s,c)=>s+c.revenue,0))}</span>
          <span></span>
        </div>
      </div>

      {/* === 产品销售情况（4列）=== */}
      <div className="bg-white p-3.5 rounded-2xl shadow-sm border border-slate-100">
        <div className="flex items-center gap-1.5 mb-2">
          <span className="w-1 h-3.5 bg-cyan-600 rounded-full shrink-0"></span>
          <h3 className="text-slate-800 text-xs font-bold">产品销售情况（{dl}）</h3>
        </div>
        <div className={`${G4} ${H}`}>
          <div>产品名称</div><div className="text-right">销售数量</div><div className="text-right">销售收入</div><div className="text-center">同比</div>
        </div>
        {zushanProductSales.map((p,j) => (
          <div key={j} className={`${G4} ${D}`}>
            <div className="flex items-center gap-1.5"><span className="w-1.5 h-1.5 rounded-full bg-cyan-500 shrink-0"></span><span className="text-[11px] font-bold text-slate-700 truncate">{p.name}</span></div>
            <span className="text-right text-[11px] font-mono text-slate-800 font-semibold">{p.quantity.toLocaleString('en-US')}</span>
            <span className="text-right text-[11px] font-mono text-slate-800 font-semibold">{fm(p.revenue)}</span>
            <span className={`text-center text-[9px] font-bold px-1 py-0.5 rounded ${p.isUp?'bg-emerald-50 text-emerald-600':'bg-rose-50 text-rose-600'}`}>{p.trend}</span>
          </div>
        ))}
        <div className={`${G4} items-center py-1.5 mt-1 border-t border-slate-200 bg-slate-50 rounded`}>
          <span className="text-[11px] font-bold text-slate-800">小计</span>
          <span className="text-right text-[11px] font-mono text-slate-800 font-extrabold">{zushanProductSales.reduce((s,p)=>s+p.quantity,0).toLocaleString('en-US')}</span>
          <span className="text-right text-[11px] font-mono text-slate-800 font-extrabold">{fm(zushanProductSales.reduce((s,p)=>s+p.revenue,0))}</span>
          <span></span>
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
      <div className="bg-white p-4 rounded-2xl shadow-sm border border-slate-100">
        <div className="flex justify-between items-center mb-3">
          <div className="flex items-center gap-1.5"><span className="w-1.5 h-3.5 bg-emerald-600 rounded-full"></span><h3 className="text-slate-800 text-xs font-bold">自营商业收入</h3></div>
          <span className="text-[10px] text-slate-400">共 {zushanBusinessRevenue.filter(b=>b.type==='自营').length} 家商户</span>
        </div>
        <div className={`${G4B} ${H}`}>
          <div>店铺名称</div><div className="text-center">类型</div><div className="text-right">交易笔数</div><div className="text-right">交易额</div>
        </div>
        {zushanBusinessRevenue.filter(b=>b.type==='自营').map((b,j) => (
          <div key={j} className={`${G4B} items-center py-1.5 hover:bg-emerald-50/50 border-l-2 border-emerald-500 pl-2 rounded`}>
            <span className="text-[11px] font-bold text-slate-700 truncate">{b.name}</span>
            <span className="text-center text-[9px] font-bold bg-emerald-50 text-emerald-700 px-1 py-0.5 rounded">{b.type}</span>
            <span className="text-right text-[11px] font-mono text-slate-800 font-semibold">{b.transactions.toLocaleString('en-US')}</span>
            <span className="text-right text-[11px] font-mono text-slate-800 font-semibold">{fm(b.revenue)}</span>
          </div>
        ))}
        <div className="mt-3 pt-3 border-t border-slate-100 flex items-center gap-2 text-[10px] text-slate-400"><span className="w-2 h-2 rounded-sm bg-emerald-500"></span><span>自营店铺流水计入收入</span></div>
      </div>

      {/* 商业经营情况 */}
      <div className="bg-white p-4 rounded-2xl shadow-sm border border-slate-100">
        <div className="flex justify-between items-center mb-3">
          <div className="flex items-center gap-1.5"><span className="w-1.5 h-3.5 bg-blue-600 rounded-full"></span><h3 className="text-slate-800 text-xs font-bold">商业经营情况</h3></div>
          <span className="text-[10px] text-slate-400">共 {fpb.length} 家商户</span>
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
            <div className={`${G4C} ${H}`}>
              <div>商户名称</div><div className="text-right">经营流水</div><div className="text-right">流水分成</div><div className="text-center">同比</div>
            </div>
            {fpb.map((b,j) => (
              <div key={j} className={`${G4C} items-center py-1.5 border-l-2 pl-2 rounded ${pf==='mixed'?'hover:bg-purple-50/50 border-purple-500':'hover:bg-emerald-50/50 border-emerald-500'}`}>
                <span className="text-[11px] font-bold text-slate-700 truncate">{b.name}</span>
                <span className="text-right text-[11px] font-mono text-slate-800 font-semibold">{fm(b.revenue)}</span>
                <span className="text-right text-[11px] font-mono font-semibold" style={{color:pf==='mixed'?'#7c3aed':'#059669'}}>{fm(cfs(b))}</span>
                <span className={`text-center text-[9px] font-bold px-1 py-0.5 rounded ${b.isUp?'bg-emerald-50 text-emerald-600':'bg-rose-50 text-rose-600'}`}>{b.trend}</span>
              </div>
            ))}
          </>
        )}

        {pf==='fixed' && (
          <>
            <div className={`${G3C} ${H}`}>
              <div>商户名称</div><div className="text-right">租金收入</div><div className="text-center">同比</div>
            </div>
            {fpb.map((b,j) => (
              <div key={j} className={`${G3C} items-center py-1.5 hover:bg-blue-50/50 border-l-2 border-blue-500 pl-2 rounded`}>
                <span className="text-[11px] font-bold text-slate-700 truncate">{b.name}</span>
                <span className="text-right text-[11px] font-mono text-blue-700 font-semibold">{fm(b.revenue)}</span>
                <span className={`text-center text-[9px] font-bold px-1 py-0.5 rounded ${b.isUp?'bg-emerald-50 text-emerald-600':'bg-rose-50 text-rose-600'}`}>{b.trend}</span>
              </div>
            ))}
          </>
        )}

        <div className="mt-3 pt-3 border-t border-slate-100 flex items-center gap-2 text-[10px] text-slate-400"><span className="w-2 h-2 rounded-sm bg-blue-500"></span><span>联营商户流水仅作参考</span></div>
      </div>

      {userRole === 'admin' && (
        <button onClick={()=>setActiveTab('platform')} className="w-full bg-slate-200 hover:bg-slate-300 text-slate-700 py-3 rounded-xl text-xs font-bold transition-all">返回平台总览</button>
      )}
    </div>
  );
};