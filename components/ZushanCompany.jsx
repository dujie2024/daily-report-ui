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

  const fmNum = (v) => {
    if (!v) return '0';
    return v.toString().replace(/\B(?=(\d{3})+(?!\n))/g, ",");
  };

  return (
    <div className="space-y-4">
      {/* 第一排：总收入、总客流 */}
      <div className="grid grid-cols-2 gap-3">
        {/* 总收入 */}
        <div className="bg-white p-3 rounded-2xl shadow-sm border border-slate-100 flex flex-col justify-between">
          <div className="flex items-center justify-between mb-1">
            <span className="text-slate-400 text-[10px] font-bold">总收入 (元)</span>
            <div className="w-5 h-5 rounded-full bg-emerald-50 text-emerald-500 flex items-center justify-center">
              <DollarSign className="w-3 h-3" />
            </div>
          </div>
          <div className="flex items-baseline justify-between gap-1">
            <span className="text-slate-800 text-base font-black tracking-tight font-mono">{zushanData.revenue}</span>
            <span className="inline-flex items-center px-1.5 py-0.5 rounded-full text-[9px] font-bold bg-emerald-50 text-emerald-600 whitespace-nowrap">
              <TrendingUp className="w-2.5 h-2.5 mr-0.5" />
              {zushanData.revenueTrend}
            </span>
          </div>
        </div>

        {/* 总客流 */}
        <div className="bg-white p-3 rounded-2xl shadow-sm border border-slate-100 flex flex-col justify-between">
          <div className="flex items-center justify-between mb-1">
            <span className="text-slate-400 text-[10px] font-bold">总客流 (人次)</span>
            <div className="w-5 h-5 rounded-full bg-blue-50 text-blue-500 flex items-center justify-center">
              <Users className="w-3 h-3" />
            </div>
          </div>
          <div className="flex items-baseline justify-between gap-1">
            <span className="text-slate-800 text-base font-black tracking-tight font-mono">{zushanData.visitors}</span>
            <span className="inline-flex items-center px-1.5 py-0.5 rounded-full text-[9px] font-bold bg-emerald-50 text-emerald-600 whitespace-nowrap">
              <TrendingUp className="w-2.5 h-2.5 mr-0.5" />
              {zushanData.visitorsTrend}
            </span>
          </div>
        </div>
      </div>

      {/* 第二排：客单价、收费客流、接待客流 */}
      <div className="flex gap-2 w-full">
        {/* 卡片1: 客单价 */}
        <div className="flex-1 bg-white p-2 rounded-xl shadow-sm border border-slate-100 flex flex-col justify-between h-[62px]">
          <div className="flex items-center gap-1">
            <div className="w-3.5 h-3.5 rounded-full bg-indigo-50 text-indigo-500 flex items-center justify-center shrink-0">
              <DollarSign className="w-2 h-2" />
            </div>
            <span className="text-slate-400 text-[10px] font-bold truncate">客单价</span>
          </div>
          <div className="flex items-baseline justify-between gap-1">
            <span className="text-slate-800 text-sm font-black font-mono truncate">{zushanProductPrice.ticketPrice}</span>
            <span className="inline-flex items-center text-[9px] font-bold text-emerald-600 bg-emerald-50 px-1 py-0.5 rounded shrink-0">
              <TrendingUp className="w-2 h-2 mr-0.5" />
              {zushanProductPrice.trend}
            </span>
          </div>
        </div>

        {/* 卡片2: 收费客流 */}
        <div className="flex-1 bg-white p-2 rounded-xl shadow-sm border border-slate-100 flex flex-col justify-between h-[62px]">
          <div className="flex items-center gap-1">
            <div className="w-3.5 h-3.5 rounded-full bg-indigo-50 text-indigo-500 flex items-center justify-center shrink-0">
              <Activity className="w-2 h-2" />
            </div>
            <span className="text-slate-400 text-[10px] font-bold truncate">收费客流 (人次)</span>
          </div>
          <div className="mt-auto">
            <span className="text-slate-800 text-sm font-black font-mono truncate">{zushanData.paidVisitors}</span>
          </div>
        </div>

        {/* 卡片3: 接待客流 */}
        <div className="flex-1 bg-white p-2 rounded-xl shadow-sm border border-slate-100 flex flex-col justify-between h-[62px]">
          <div className="flex items-center gap-1">
            <div className="w-3.5 h-3.5 rounded-full bg-purple-50 text-purple-500 flex items-center justify-center shrink-0">
              <UserCheck className="w-2 h-2" />
            </div>
            <span className="text-slate-400 text-[10px] font-bold truncate">接待客流 (人次)</span>
          </div>
          <div className="mt-auto">
            <span className="text-slate-800 text-sm font-black font-mono truncate">{zushanData.receptionVisitors}</span>
          </div>
        </div>
      </div>

      {/* 计划达成 */}
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
        <div className="flex items-center w-full text-[10px] text-slate-400 font-bold mb-1 pb-1.5 border-b border-slate-100 whitespace-nowrap">
          <div style={{ width: '35%' }} className="text-left">业态</div>
          <div style={{ width: '40%' }} className="text-right pr-4">收入金额</div>
          <div style={{ width: '25%' }} className="text-center">同比</div>
        </div>
        {zushanRevenueStructure.map((d,j) => (
          <div key={j} className="flex items-center w-full text-[11px] py-1.5 hover:bg-slate-50 rounded whitespace-nowrap overflow-hidden">
            <div style={{ width: '35%' }} className="text-left flex items-center gap-1 min-w-0">
              <span className="w-1.5 h-1.5 rounded-full shrink-0" style={{backgroundColor:d.color}}></span>
              <span className="text-slate-700 font-medium truncate">{d.name}</span>
            </div>
            <div style={{ width: '40%' }} className="text-right font-semibold text-slate-800 font-mono truncate pr-4">{fm(d.value)}</div>
            <div style={{ width: '25%' }} className="flex justify-center items-center min-w-0">
              <span className={`inline-block text-center px-1 py-0.5 rounded text-[10px] font-bold truncate ${d.isUp ? 'bg-emerald-50 text-emerald-600' : 'bg-rose-50 text-rose-600'}`}>{d.trend}</span>
            </div>
          </div>
        ))}
        <div className="flex items-center w-full text-[11px] mt-1 border-t border-slate-100 bg-slate-50 py-1.5 rounded whitespace-nowrap">
          <div style={{ width: '35%' }} className="text-left font-bold text-slate-800 pl-1">小计</div>
          <div style={{ width: '40%' }} className="text-right font-extrabold text-slate-800 font-mono pr-4">{fm(zushanRevenueStructure.reduce((s,d)=>s+d.value,0))}</div>
          <div style={{ width: '25%' }}></div>
        </div>
      </div>

      {/* === 渠道销售情况 === */}
      <div className="bg-white p-3.5 rounded-2xl shadow-sm border border-slate-100">
        <div className="flex items-center gap-1.5 mb-2">
          <span className="w-1 h-3.5 bg-blue-600 rounded-full shrink-0"></span>
          <h3 className="text-slate-800 text-xs font-bold">渠道销售情况（{dl}）</h3>
        </div>
        <div className="flex items-center w-full text-[10px] text-slate-400 font-bold mb-1 pb-1.5 border-b border-slate-100 whitespace-nowrap">
          <div style={{ width: '35%' }} className="text-left">渠道</div>
          <div style={{ width: '15%' }} className="text-right">人次</div>
          <div style={{ width: '30%' }} className="text-right pr-4">销售收入</div>
          <div style={{ width: '20%' }} className="text-center">同比</div>
        </div>
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
        <div className="flex items-center w-full text-[11px] mt-1 border-t border-slate-100 bg-slate-50 py-1.5 rounded whitespace-nowrap">
          <div style={{ width: '35%' }} className="text-left font-bold text-slate-800 pl-1">小计</div>
          <div style={{ width: '15%' }} className="text-right font-extrabold text-slate-800 font-mono">{zushanChannelSales.reduce((s,c)=>s+c.quantity,0).toLocaleString('en-US')}</div>
          <div style={{ width: '30%' }} className="text-right font-extrabold text-slate-800 font-mono pr-4">{fm(zushanChannelSales.reduce((s,c)=>s+c.revenue,0))}</div>
          <div style={{ width: '20%' }}></div>
        </div>
      </div>

      {/* === 产品销售情况 === */}
      <div className="bg-white p-3.5 rounded-2xl shadow-sm border border-slate-100">
        <div className="flex items-center gap-1.5 mb-2">
          <span className="w-1 h-3.5 bg-cyan-600 rounded-full shrink-0"></span>
          <h3 className="text-slate-800 text-xs font-bold">产品销售情况（{dl}）</h3>
        </div>
        <div className="flex items-center w-full text-[10px] text-slate-400 font-bold mb-1 pb-1.5 border-b border-slate-100 whitespace-nowrap">
          <div style={{ width: '35%' }} className="text-left">产品名称</div>
          <div style={{ width: '15%' }} className="text-right">销售数量</div>
          <div style={{ width: '30%' }} className="text-right pr-4">销售收入</div>
          <div style={{ width: '20%' }} className="text-center">同比</div>
        </div>
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
        <div className="flex items-center w-full text-[11px] mt-1 border-t border-slate-100 bg-slate-50 py-1.5 rounded whitespace-nowrap">
          <div style={{ width: '35%' }} className="text-left font-bold text-slate-800 pl-1">小计</div>
          <div style={{ width: '15%' }} className="text-right font-extrabold text-slate-800 font-mono">{zushanProductSales.reduce((s,p)=>s+p.quantity,0).toLocaleString('en-US')}</div>
          <div style={{ width: '30%' }} className="text-right font-extrabold text-slate-800 font-mono pr-4">{fm(zushanProductSales.reduce((s,p)=>s+p.revenue,0))}</div>
          <div style={{ width: '20%' }}></div>
        </div>
      </div>

      {/* 自营商业收入 */}
      <div className="bg-white p-3.5 rounded-2xl shadow-sm border border-slate-100">
        <div className="flex items-center gap-1.5 mb-2">
          <span className="w-1.5 h-3.5 bg-emerald-600 rounded-full shrink-0"></span>
          <h3 className="text-slate-800 text-xs font-bold">自营商业收入</h3>
          <span className="text-[10px] text-slate-400 ml-auto">共 {zushanBusinessRevenue.filter(b=>b.type==='自营').length} 家商户</span>
        </div>
        <div className="flex items-center w-full text-[10px] text-slate-400 font-bold mb-1 pb-1.5 border-b border-slate-100 whitespace-nowrap">
          <div style={{ width: '40%' }} className="text-left">店铺名称</div>
          <div style={{ width: '20%' }} className="text-center">类型</div>
          <div style={{ width: '18%' }} className="text-right">交易笔数</div>
          <div style={{ width: '22%' }} className="text-right pr-4">交易额</div>
        </div>
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
            <div className="flex items-center w-full text-[10px] text-slate-400 font-bold mb-1 pb-1.5 border-b border-slate-100 whitespace-nowrap">
              <div style={{ width: '40%' }} className="text-left">商户名称</div>
              <div style={{ width: '30%' }} className="text-right">经营流水</div>
              <div style={{ width: '30%' }} className="text-right pr-4">流水分成</div>
            </div>
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
            <div className="flex items-center w-full text-[10px] text-slate-400 font-bold mb-1 pb-1.5 border-b border-slate-100 whitespace-nowrap">
              <div style={{ width: '55%' }} className="text-left">商户名称</div>
              <div style={{ width: '45%' }} className="text-right pr-4">租金收入</div>
            </div>
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