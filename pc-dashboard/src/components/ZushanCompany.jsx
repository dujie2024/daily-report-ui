import { useState } from 'react';
import { DollarSign, Users, Activity, UserCheck, TrendingUp, Sparkles, Percent, Calendar } from 'lucide-react';

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

  const handleContractView = (contractInfo) => {
    if (window.triggerAlert) {
      window.triggerAlert(contractInfo);
    }
  };

  return (
    <div className="space-y-6 text-slate-800">
      {/* 顶部标题与快速筛选 */}
      <div className="flex items-center justify-between border-b border-slate-100 pb-4">
        <div>
          <h2 className="text-xl font-black text-slate-900 flex items-center gap-2">
            <span className="w-1.5 h-6 bg-blue-600 rounded-full"></span>
            祖山景区 运营决策中心
          </h2>
          <p className="text-xs text-slate-500 mt-1">实时汇总门票、客流、主营及联营商户经营绩效</p>
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

      {/* KPI 卡片组 - PC 宽屏 5 列排版 */}
      <div className="grid grid-cols-5 gap-4">
        {/* 总收入 */}
        <div className="bg-gradient-to-br from-emerald-50 to-teal-50/30 p-4 rounded-2xl border border-emerald-100 shadow-sm flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-emerald-800 text-xs font-bold">总收入 (元)</span>
            <div className="w-7 h-7 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center">
              <DollarSign className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-4">
            <div className="text-2xl font-black text-slate-800 font-mono tracking-tight">{zushanData.revenue}</div>
            <div className="flex items-center gap-1 text-[10px] text-emerald-600 font-bold mt-1">
              <TrendingUp className="w-3 h-3" />
              <span>{zushanData.revenueTrend} 同比增幅</span>
            </div>
          </div>
        </div>

        {/* 总客流 */}
        <div className="bg-gradient-to-br from-blue-50 to-indigo-50/30 p-4 rounded-2xl border border-blue-100 shadow-sm flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-blue-800 text-xs font-bold">总客流 (人次)</span>
            <div className="w-7 h-7 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center">
              <Users className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-4">
            <div className="text-2xl font-black text-slate-800 font-mono tracking-tight">{zushanData.visitors}</div>
            <div className="flex items-center gap-1 text-[10px] text-emerald-600 font-bold mt-1">
              <TrendingUp className="w-3 h-3" />
              <span>{zushanData.visitorsTrend} 同比增幅</span>
            </div>
          </div>
        </div>

        {/* 客单价 */}
        <div className="bg-gradient-to-br from-amber-50 to-orange-50/30 p-4 rounded-2xl border border-amber-100 shadow-sm flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-amber-800 text-xs font-bold">客单价 (元/人)</span>
            <div className="w-7 h-7 rounded-full bg-amber-100 text-amber-600 flex items-center justify-center">
              <Sparkles className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-4">
            <div className="text-2xl font-black text-slate-800 font-mono tracking-tight">{zushanProductPrice.ticketPrice}</div>
            <div className="flex items-center gap-1 text-[10px] text-emerald-600 font-bold mt-1">
              <TrendingUp className="w-3 h-3" />
              <span>{zushanProductPrice.trend} 同比增幅</span>
            </div>
          </div>
        </div>

        {/* 收费客流 */}
        <div className="bg-white p-4 rounded-2xl border border-slate-100 shadow-sm flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-slate-500 text-xs font-bold">收费客流 (人次)</span>
            <div className="w-7 h-7 rounded-full bg-slate-50 text-indigo-500 flex items-center justify-center">
              <Activity className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-4">
            <div className="text-2xl font-black text-slate-800 font-mono tracking-tight">{zushanData.paidVisitors}</div>
            <span className="text-[10px] text-slate-400 font-bold mt-1 block">购票入园人次</span>
          </div>
        </div>

        {/* 接待客流 */}
        <div className="bg-white p-4 rounded-2xl border border-slate-100 shadow-sm flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-slate-500 text-xs font-bold">接待客流 (人次)</span>
            <div className="w-7 h-7 rounded-full bg-slate-50 text-purple-500 flex items-center justify-center">
              <UserCheck className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-4">
            <div className="text-2xl font-black text-slate-800 font-mono tracking-tight">{zushanData.receptionVisitors}</div>
            <span className="text-[10px] text-slate-400 font-bold mt-1 block">免票/合作接待人次</span>
          </div>
        </div>
      </div>

      {/* PC 端双栏排版 */}
      <div className="grid grid-cols-12 gap-6">
        {/* 左侧栏：主营业态收入 + 渠道与产品 (7/12) */}
        <div className="col-span-7 space-y-6">
          
          {/* 主营业态收入 */}
          <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm">
            <div className="flex items-center gap-2 mb-4 border-b border-slate-50 pb-3">
              <span className="w-1.5 h-4 bg-purple-600 rounded-full"></span>
              <h3 className="text-sm font-black text-slate-800">主营业态收入结构（{dl}）</h3>
            </div>
            
            <div className="grid grid-cols-12 gap-1 px-2 text-xs font-bold text-slate-400 border-b border-slate-100 pb-2 mb-2">
              <div className="col-span-5 text-left">主营业态</div>
              <div className="col-span-4 text-right pr-4">收入金额 (元)</div>
              <div className="col-span-3 text-center">同比变动</div>
            </div>

            <div className="space-y-1">
              {zushanRevenueStructure.map((d, j) => (
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
              <div className="col-span-5 font-black text-slate-800 pl-2">主营收入小计</div>
              <div className="col-span-4 text-right font-black text-slate-900 font-mono pr-4">
                {fm(zushanRevenueStructure.reduce((s, d) => s + d.value, 0))}
              </div>
              <div className="col-span-3"></div>
            </div>
          </div>

          {/* 渠道销售与产品销售 并排显示 */}
          <div className="grid grid-cols-2 gap-6">
            
            {/* 渠道销售情况 */}
            <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm">
              <div className="flex items-center gap-2 mb-4 border-b border-slate-50 pb-3">
                <span className="w-1.5 h-4 bg-blue-600 rounded-full"></span>
                <h3 className="text-sm font-black text-slate-800">渠道销售分析（{dl}）</h3>
              </div>

              <div className="flex justify-between text-xs font-bold text-slate-400 border-b border-slate-100 pb-2 mb-2 px-1">
                <span>销售渠道</span>
                <span>人次</span>
                <span className="pr-4">销售收入</span>
              </div>

              <div className="space-y-1">
                {zushanChannelSales.map((d, j) => (
                  <div key={j} className="flex justify-between items-center text-xs py-2 hover:bg-slate-50 rounded-lg px-1 transition-all">
                    <div className="flex items-center gap-1.5 min-w-0">
                      <span className={`w-2 h-2 rounded-full shrink-0 ${d.bgColor}`}></span>
                      <span className="text-slate-700 font-semibold truncate">{d.name}</span>
                    </div>
                    <span className="font-semibold text-slate-600 font-mono">{d.quantity.toLocaleString('en-US')}</span>
                    <span className="font-extrabold text-slate-800 font-mono pr-4">{fm(d.revenue)}</span>
                  </div>
                ))}
              </div>
              
              <div className="flex justify-between text-xs font-black text-slate-900 border-t border-slate-100 mt-3 pt-3 px-1 bg-slate-50 p-2 rounded-lg">
                <span>合计</span>
                <span className="font-mono">{zushanChannelSales.reduce((s, c) => s + c.quantity, 0).toLocaleString('en-US')}</span>
                <span className="font-mono pr-4">{fm(zushanChannelSales.reduce((s, c) => s + c.revenue, 0))}</span>
              </div>
            </div>

            {/* 产品销售情况 */}
            <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm">
              <div className="flex items-center gap-2 mb-4 border-b border-slate-50 pb-3">
                <span className="w-1.5 h-4 bg-cyan-600 rounded-full"></span>
                <h3 className="text-sm font-black text-slate-800">主要产品销售（{dl}）</h3>
              </div>

              <div className="flex justify-between text-xs font-bold text-slate-400 border-b border-slate-100 pb-2 mb-2 px-1">
                <span>产品名称</span>
                <span>销售数</span>
                <span className="pr-4">产品收入</span>
              </div>

              <div className="space-y-1">
                {zushanProductSales.map((p, j) => (
                  <div key={j} className="flex justify-between items-center text-xs py-2 hover:bg-slate-50 rounded-lg px-1 transition-all">
                    <div className="flex items-center gap-1.5 min-w-0">
                      <span className="w-2 h-2 rounded-full bg-cyan-500"></span>
                      <span className="text-slate-700 font-semibold truncate">{p.name}</span>
                    </div>
                    <span className="font-semibold text-slate-600 font-mono">{p.quantity.toLocaleString('en-US')}</span>
                    <span className="font-extrabold text-slate-800 font-mono pr-4">{fm(p.revenue)}</span>
                  </div>
                ))}
              </div>

              <div className="flex justify-between text-xs font-black text-slate-900 border-t border-slate-100 mt-3 pt-3 px-1 bg-slate-50 p-2 rounded-lg">
                <span>合计</span>
                <span className="font-mono">{zushanProductSales.reduce((s, p) => s + p.quantity, 0).toLocaleString('en-US')}</span>
                <span className="font-mono pr-4">{fm(zushanProductSales.reduce((s, p) => s + p.revenue, 0))}</span>
              </div>
            </div>

          </div>

        </div>

        {/* 右侧栏：计划达成、自营商业、联营商业情况 (5/12) */}
        <div className="col-span-5 space-y-6">

          {/* 计划达成 */}
          <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm">
            <div className="flex items-center gap-1.5 mb-3">
              <span className="w-1.5 h-4 bg-blue-600 rounded-full"></span>
              <h3 className="text-sm font-black text-slate-800">{dimension === 'year' ? '年度计划达成情况' : '月度计划达成情况'}</h3>
            </div>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between bg-slate-50 p-3 rounded-xl border border-slate-100">
                <span className="text-slate-500 text-xs font-bold">{dimension === 'year' ? '年度创值计划（6月）' : '月度创值计划（6月）'}</span>
                <span className="text-slate-800 font-black font-mono text-base">{Math.round(zushanData.rawRevenue * 1.15).toLocaleString('en-US')} 元</span>
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
                    <span className="font-semibold">实际收入完成率</span>
                    <span className="text-emerald-600 font-bold">{((zushanData.rawRevenue / (zushanData.rawRevenue * 1.15)) * 100).toFixed(1)}%</span>
                  </div>
                  <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                    <div className="bg-emerald-500 h-full rounded-full" style={{ width: `${((zushanData.rawRevenue / (zushanData.rawRevenue * 1.15)) * 100).toFixed(1)}%` }}></div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* 自营商业收入 */}
          <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm">
            <div className="flex items-center gap-1.5 mb-3 border-b border-slate-50 pb-3">
              <span className="w-1.5 h-4 bg-emerald-600 rounded-full"></span>
              <h3 className="text-sm font-black text-slate-800">自营商业运营监测</h3>
              <span className="text-[10px] text-slate-400 ml-auto bg-emerald-50 text-emerald-700 px-2 py-0.5 rounded-full font-bold">共 {zushanBusinessRevenue.filter(b => b.type === '自营').length} 家商户</span>
            </div>

            <div className="flex justify-between text-xs font-bold text-slate-400 border-b border-slate-100 pb-2 mb-2 px-1">
              <span>店铺名称</span>
              <span>交易笔数</span>
              <span className="pr-4">交易额 (元)</span>
            </div>

            <div className="space-y-1">
              {zushanBusinessRevenue.filter(b => b.type === '自营').map((b, j) => (
                <div key={j} className="flex justify-between items-center text-xs py-2 hover:bg-emerald-50/20 border-l-2 border-emerald-500 pl-2 rounded-lg transition-all">
                  <span className="text-slate-700 font-semibold truncate">{b.name}</span>
                  <span className="font-semibold text-slate-600 font-mono">{b.transactions.toLocaleString('en-US')}</span>
                  <span className="font-extrabold text-slate-800 font-mono pr-4">{fm(b.revenue)}</span>
                </div>
              ))}
            </div>

            <div className="flex justify-between text-xs font-black text-slate-900 border-t border-slate-100 mt-3 pt-3 px-2 bg-slate-50 p-2 rounded-lg">
              <span>自营合计</span>
              <span className="font-mono">{zushanBusinessRevenue.filter(b => b.type === '自营').reduce((s, b) => s + b.transactions, 0).toLocaleString('en-US')}</span>
              <span className="font-mono pr-4">{fm(zushanBusinessRevenue.filter(b => b.type === '自营').reduce((s, b) => s + b.revenue, 0))}</span>
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
          <span>联营商户经营流水数据源自商户收银机共享接口，仅作分成参考，不直接计入景区主营收入账目。</span>
        </div>
      </div>

      {/* 备注说明 */}
      <div className="bg-amber-50/50 p-4 rounded-2xl border border-amber-200 text-slate-700">
        <h3 className="text-xs font-black text-amber-800 flex items-center gap-1.5">
          <span className="w-1.5 h-3.5 bg-amber-600 rounded-full"></span>
          经营事项备注
        </h3>
        <div className="mt-2 space-y-1.5 text-xs">
          <p><span className="font-bold text-amber-700">特殊财务口径：</span>端午假期滨海总收入包含一次性预售浪淘沙号观光游船船票 2,000 张合计 11.00 万元，以及一卡通预充值分摊 8.00 万元。</p>
          <p><span className="font-bold text-amber-700">客流量对账口径：</span>景区总客流量及游船票务收入，未包含上述一次性大客户团购滨海船票的 2,000 人次及对应划转款项。</p>
        </div>
      </div>
    </div>
  );
};
