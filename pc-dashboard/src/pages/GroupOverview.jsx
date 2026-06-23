import React from 'react';
import { Tag } from 'antd';
import {
  DollarOutlined, TeamOutlined, CarryOutOutlined, RocketOutlined,
  ArrowUpOutlined, ArrowDownOutlined, AlertOutlined
} from '@ant-design/icons';
import {
  GROUP_DATA, fmtRevenue, fmtInt, fmtGrowth, dimLabel, companies
} from '../data/groupData';
import { renderSecondaryTable } from '../components/shared/SecondaryTable';

// ===== 三时段集团效益面板 =====
export const DimensionPanel = ({ dim }) => {
  const labelMap = { day: '📅 集团本日概况', month: '📆 集团本月累计', year: '🗓️ 集团本年累计' };
  const s = GROUP_DATA.summary;
  const rev = s.revenue[dim];
  const vis = s.visitors[dim];
  const avgPx = vis.v > 0 ? Math.round(rev.v / vis.v) : 0;
  const paid = Math.round(vis.v * 0.85);
  const recep = Math.round(vis.v * 0.15);

  const metrics = [
    { icon: <DollarOutlined />, label: '总收入', value: fmtRevenue(rev.v), growth: rev.g, color: 'emerald' },
    { icon: <TeamOutlined />, label: '总客流（人次）', value: fmtInt(vis.v), growth: vis.g, color: 'blue' },
    { icon: <CarryOutOutlined />, label: '客单价', value: `¥${fmtInt(avgPx)}`, growth: null, color: 'indigo' },
    { icon: <RocketOutlined />, label: '收费客流（人次）', value: fmtInt(paid), growth: rev.g, color: 'purple' },
    { icon: <ArrowUpOutlined />, label: '接待客流（人次）', value: fmtInt(recep), growth: vis.g, color: 'amber' },
  ];

  const colorDot = { emerald: 'bg-emerald-500', blue: 'bg-blue-500', indigo: 'bg-indigo-500', purple: 'bg-purple-500', amber: 'bg-amber-500' };

  return (
    <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-5">
      <div className="flex items-center gap-2 mb-4 pb-3 border-b border-slate-100">
        <span className="text-sm font-extrabold text-slate-800">{labelMap[dim]}</span>
        <span className="text-[11px] text-slate-400 ml-auto">2026 vs 2025</span>
      </div>
      {metrics.map((m, i) => {
        const isNeg = m.growth !== null && m.growth < 0;
        return (
          <div key={i} className="flex items-center justify-between py-3 border-b border-slate-50 last:border-0">
            <div className="flex items-center gap-3 min-w-0">
              <span className={`w-2 h-2 rounded-full shrink-0 ${colorDot[m.color] || 'bg-slate-400'}`}></span>
              <span className="text-[13px] font-semibold text-slate-600 truncate">{m.label}</span>
            </div>
            <div className="flex items-center gap-2 shrink-0">
              <span className="text-[16px] font-black tracking-tight font-mono text-slate-800">{m.value}</span>
              {m.growth !== null && (
                <span className={`inline-flex items-center px-1.5 py-0.5 rounded text-[11px] font-bold ${isNeg ? 'bg-rose-50 text-rose-600' : 'bg-emerald-50 text-emerald-600'}`}>
                  {isNeg ? <ArrowDownOutlined className="text-[10px] mr-0.5" /> : <ArrowUpOutlined className="text-[10px] mr-0.5" />}
                  {fmtGrowth(m.growth)}
                </span>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
};

// ===== 子公司卡片 =====
const CompanyCard = ({ company }) => {
  const dim = 'day';
  const rev = company.revenue[dim];
  const vis = company.visitors[dim];
  const revNeg = rev.g < 0;
  const visNeg = vis.g < 0;
  const hasIssue = revNeg || visNeg;

  return (
    <div className={`bg-white rounded-2xl border-2 shadow-sm ${hasIssue ? 'border-red-200 bg-red-50/30' : 'border-slate-100'}`}>
      <div className={`px-4 py-3 flex items-center justify-between border-b ${hasIssue ? 'border-red-100' : 'border-slate-100'}`}>
        <div className="flex items-center gap-2">
          <span className="text-lg">{company.icon}</span>
          <span className="text-sm font-black text-slate-800">{company.name}</span>
        </div>
        {revNeg && (
          <Tag color="red" className="text-[9px] font-black border-red-200 bg-red-50 text-red-600 m-0">
            <AlertOutlined className="mr-0.5" />⚠️ 需关注
          </Tag>
        )}
      </div>
      <div className="p-3 space-y-3">
        <div className={`p-4 rounded-xl ${revNeg ? 'bg-red-50/80 ring-1 ring-red-200' : 'bg-slate-50'}`}>
          <div className="flex items-center justify-between mb-2">
            <span className="text-slate-400 text-[12px] font-bold">总收入（元）</span>
            <DollarOutlined className={revNeg ? 'text-red-400' : 'text-emerald-500'} />
          </div>
          <div className="flex items-center justify-between">
            <span className="text-slate-800 text-[18px] font-black tracking-tight font-mono">{fmtRevenue(rev.v)}</span>
            <span className={`inline-flex items-center px-2 py-1 rounded-full text-[11px] font-bold ${revNeg ? 'bg-rose-50 text-rose-600' : 'bg-emerald-50 text-emerald-600'}`}>
              {revNeg ? <ArrowDownOutlined className="text-[10px] mr-0.5" /> : <ArrowUpOutlined className="text-[10px] mr-0.5" />}
              同比 {fmtGrowth(rev.g)}
            </span>
          </div>
          <div className="mt-1.5 text-[12px] text-slate-400">去年: {fmtRevenue(rev.l)}</div>
        </div>
        <div className={`p-4 rounded-xl ${visNeg ? 'bg-red-50/80 ring-1 ring-red-200' : 'bg-slate-50'}`}>
          <div className="flex items-center justify-between mb-2">
            <span className="text-slate-400 text-[12px] font-bold">总客流（人次）</span>
            <TeamOutlined className={visNeg ? 'text-red-400' : 'text-blue-500'} />
          </div>
          <div className="flex items-center justify-between">
            <span className="text-slate-800 text-[18px] font-black tracking-tight font-mono">{fmtInt(vis.v)}</span>
            <span className={`inline-flex items-center px-2 py-1 rounded-full text-[11px] font-bold ${visNeg ? 'bg-rose-50 text-rose-600' : 'bg-emerald-50 text-emerald-600'}`}>
              {visNeg ? <ArrowDownOutlined className="text-[10px] mr-0.5" /> : <ArrowUpOutlined className="text-[10px] mr-0.5" />}
              同比 {fmtGrowth(vis.g)}
            </span>
          </div>
          <div className="mt-1.5 text-[12px] text-slate-400">去年: {fmtInt(vis.l)}</div>
        </div>
        <div className="flex gap-2">
          {['day', 'month', 'year'].map(d => {
            const g = company.revenue[d].g;
            return (
              <div key={d} className={`flex-1 text-center py-1.5 rounded text-[11px] font-bold ${g < 0 ? 'bg-red-50 text-red-500' : 'bg-emerald-50 text-emerald-600'}`}>
                {d === 'day' ? '日' : d === 'month' ? '月' : '年'}同比 {g >= 0 ? '+' : ''}{g}%
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

// ===== 多维度对比表 =====
const ComparisonTable = () => (
  <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6">
    <div className="flex items-center gap-2 mb-5">
      <span className="w-1.5 h-6 bg-indigo-500 rounded-full"></span>
      <span className="text-base font-black text-slate-800">多维度经营对比一览</span>
    </div>
    <div className="overflow-x-auto">
      <table className="w-full text-[13px]">
        <thead>
          <tr className="border-b border-slate-100">
            <th className="text-left py-3 pr-5 font-bold text-slate-400 text-[12px] uppercase">景区</th>
            <th className="text-right px-3 py-3 font-bold text-slate-400 text-[12px] uppercase">本日收入</th>
            <th className="text-right px-3 py-3 font-bold text-slate-400 text-[12px] uppercase">日同比</th>
            <th className="text-right px-3 py-3 font-bold text-slate-400 text-[12px] uppercase">本月收入</th>
            <th className="text-right px-3 py-3 font-bold text-slate-400 text-[12px] uppercase">月同比</th>
            <th className="text-right px-3 py-3 font-bold text-slate-400 text-[12px] uppercase">本年收入</th>
            <th className="text-right px-3 py-3 font-bold text-slate-400 text-[12px] uppercase">年同比</th>
            <th className="text-right pl-3 py-3 font-bold text-slate-400 text-[12px] uppercase">趋势</th>
          </tr>
        </thead>
        <tbody>
          {companies.map(c => {
            const dRev = c.revenue.day, mRev = c.revenue.month, yRev = c.revenue.year;
            return (
              <tr key={c.name} className="border-b border-slate-50 hover:bg-slate-50">
                <td className="py-3.5 pr-5 font-bold text-slate-700"><span className="mr-2">{c.icon}</span>{c.name}</td>
                <td className="text-right px-3 py-3.5 font-mono font-extrabold text-slate-800">{fmtRevenue(dRev.v)}</td>
                <td className={`text-right px-3 py-3.5 font-mono font-extrabold ${dRev.g < 0 ? 'text-red-500' : 'text-emerald-600'}`}>{fmtGrowth(dRev.g)}</td>
                <td className="text-right px-3 py-3.5 font-mono font-extrabold text-slate-800">{fmtRevenue(mRev.v)}</td>
                <td className={`text-right px-3 py-3.5 font-mono font-extrabold ${mRev.g < 0 ? 'text-red-500' : 'text-emerald-600'}`}>{fmtGrowth(mRev.g)}</td>
                <td className="text-right px-3 py-3.5 font-mono font-extrabold text-slate-800">{fmtRevenue(yRev.v)}</td>
                <td className={`text-right px-3 py-3.5 font-mono font-extrabold ${yRev.g < 0 ? 'text-red-500' : 'text-emerald-600'}`}>{fmtGrowth(yRev.g)}</td>
                <td className="text-right pl-3 py-3.5">
                  <div className="flex gap-1.5 justify-end">
                    {[dRev.g, mRev.g, yRev.g].map((g, i) => (
                      <span key={i} className={`inline-block w-2.5 h-2.5 rounded-full ${g < 0 ? 'bg-red-400' : 'bg-emerald-400'}`}></span>
                    ))}
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  </div>
);


// ===== 集团经营概况表（与SecondaryTable同风格） =====
const GroupSummaryTable = () => {
  const sm = GROUP_DATA.summary;
  const rows = [
    { label: '总收入（元）', day26: sm.revenue.day.v, day25: sm.revenue.day.l || Math.round(sm.revenue.day.v / (1 + sm.revenue.day.g / 100)), dayG: sm.revenue.day.g, month26: sm.revenue.month.v, month25: sm.revenue.month.l || Math.round(sm.revenue.month.v / (1 + sm.revenue.month.g / 100)), monthG: sm.revenue.month.g, year26: sm.revenue.year.v, year25: sm.revenue.year.l || Math.round(sm.revenue.year.v / (1 + sm.revenue.year.g / 100)), yearG: sm.revenue.year.g },
    { label: '总客流（人次）', day26: sm.visitors.day.v, day25: sm.visitors.day.l || Math.round(sm.visitors.day.v / (1 + sm.visitors.day.g / 100)), dayG: sm.visitors.day.g, month26: sm.visitors.month.v, month25: sm.visitors.month.l || Math.round(sm.visitors.month.v / (1 + sm.visitors.month.g / 100)), monthG: sm.visitors.month.g, year26: sm.visitors.year.v, year25: sm.visitors.year.l || Math.round(sm.visitors.year.v / (1 + sm.visitors.year.g / 100)), yearG: sm.visitors.year.g },
    { label: '客单价（元）', day26: Math.round(sm.revenue.day.v / sm.visitors.day.v), day25: Math.round((sm.revenue.day.l || Math.round(sm.revenue.day.v / (1 + sm.revenue.day.g / 100))) / (sm.visitors.day.l || Math.round(sm.visitors.day.v / (1 + sm.visitors.day.g / 100)))), dayG: Math.round(((sm.revenue.day.v / sm.visitors.day.v) / ((sm.revenue.day.l || Math.round(sm.revenue.day.v / (1 + sm.revenue.day.g / 100))) / (sm.visitors.day.l || Math.round(sm.visitors.day.v / (1 + sm.visitors.day.g / 100)))) - 1) * 100), month26: Math.round(sm.revenue.month.v / sm.visitors.month.v), month25: Math.round((sm.revenue.month.l || Math.round(sm.revenue.month.v / (1 + sm.revenue.month.g / 100))) / (sm.visitors.month.l || Math.round(sm.visitors.month.v / (1 + sm.visitors.month.g / 100)))), monthG: Math.round(((sm.revenue.month.v / sm.visitors.month.v) / ((sm.revenue.month.l || Math.round(sm.revenue.month.v / (1 + sm.revenue.month.g / 100))) / (sm.visitors.month.l || Math.round(sm.visitors.month.v / (1 + sm.visitors.month.g / 100)))) - 1) * 100), year26: Math.round(sm.revenue.year.v / sm.visitors.year.v), year25: Math.round((sm.revenue.year.l || Math.round(sm.revenue.year.v / (1 + sm.revenue.year.g / 100))) / (sm.visitors.year.l || Math.round(sm.visitors.year.v / (1 + sm.visitors.year.g / 100)))), yearG: Math.round(((sm.revenue.year.v / sm.visitors.year.v) / ((sm.revenue.year.l || Math.round(sm.revenue.year.v / (1 + sm.revenue.year.g / 100))) / (sm.visitors.year.l || Math.round(sm.visitors.year.v / (1 + sm.visitors.year.g / 100)))) - 1) * 100) },
    { label: '收费客流（人次）', day26: Math.round(sm.visitors.day.v * 0.85), day25: Math.round((sm.visitors.day.l || Math.round(sm.visitors.day.v / (1 + sm.visitors.day.g / 100))) * 0.85), dayG: sm.visitors.day.g, month26: Math.round(sm.visitors.month.v * 0.85), month25: Math.round((sm.visitors.month.l || Math.round(sm.visitors.month.v / (1 + sm.visitors.month.g / 100))) * 0.85), monthG: sm.visitors.month.g, year26: Math.round(sm.visitors.year.v * 0.85), year25: Math.round((sm.visitors.year.l || Math.round(sm.visitors.year.v / (1 + sm.visitors.year.g / 100))) * 0.85), yearG: sm.visitors.year.g },
    { label: '接待客流（人次）', day26: Math.round(sm.visitors.day.v * 0.15), day25: Math.round((sm.visitors.day.l || Math.round(sm.visitors.day.v / (1 + sm.visitors.day.g / 100))) * 0.15), dayG: sm.visitors.day.g, month26: Math.round(sm.visitors.month.v * 0.15), month25: Math.round((sm.visitors.month.l || Math.round(sm.visitors.month.v / (1 + sm.visitors.month.g / 100))) * 0.15), monthG: sm.visitors.month.g, year26: Math.round(sm.visitors.year.v * 0.15), year25: Math.round((sm.visitors.year.l || Math.round(sm.visitors.year.v / (1 + sm.visitors.year.g / 100))) * 0.15), yearG: sm.visitors.year.g },
  ];

  const cellStyle = (val) => ({
    color: val < 0 ? '#E34D59' : '#10b981',
    fontWeight: val < 0 ? 800 : 700,
    fontFamily: 'monospace',
    fontSize: 12,
  });

  return (
    <table className="w-full text-[13px]">
      <thead>
        <tr className="border-b-2 border-slate-200 bg-slate-50">
          <th className="text-left py-3 pr-5 font-bold text-slate-500 text-[12px]">集团指标</th>
          <th className="text-center px-2 py-3 font-bold text-slate-500 text-[12px]" colSpan={3}>本日</th>
          <th className="text-center px-2 py-3 font-bold text-slate-500 text-[12px]" colSpan={3}>月度累计</th>
          <th className="text-center px-2 py-3 font-bold text-slate-500 text-[12px]" colSpan={3}>年度累计</th>
        </tr>
        <tr className="border-b border-slate-100 bg-slate-50/80">
          <th></th>
          <th className="text-right px-1 py-2 font-bold text-slate-400 text-[10px]">2026</th>
          <th className="text-right px-1 py-2 font-bold text-slate-400 text-[10px]">2025</th>
          <th className="text-right px-1 py-2 font-bold text-slate-400 text-[10px]">同比</th>
          <th className="text-right px-1 py-2 font-bold text-slate-400 text-[10px]">2026</th>
          <th className="text-right px-1 py-2 font-bold text-slate-400 text-[10px]">2025</th>
          <th className="text-right px-1 py-2 font-bold text-slate-400 text-[10px]">同比</th>
          <th className="text-right px-1 py-2 font-bold text-slate-400 text-[10px]">2026</th>
          <th className="text-right px-1 py-2 font-bold text-slate-400 text-[10px]">2025</th>
          <th className="text-right px-1 py-2 font-bold text-slate-400 text-[10px]">同比</th>
        </tr>
      </thead>
      <tbody>
        {rows.map((r, i) => (
          <tr key={i} className="border-b border-slate-50 hover:bg-slate-50">
            <td className="py-2.5 pr-5 font-bold text-slate-700 text-[12px]">{r.label}</td>
            <td className="text-right px-1 py-2.5 font-mono font-bold text-slate-800">{r.label.includes('收入') ? fmtRevenue(r.day26) : fmtInt(r.day26)}</td>
            <td className="text-right px-1 py-2.5 font-mono font-bold text-slate-500">{r.label.includes('收入') ? fmtRevenue(r.day25) : fmtInt(r.day25)}</td>
            <td className="text-right px-1 py-2.5 font-mono" style={cellStyle(r.dayG)}>{fmtGrowth(r.dayG)}</td>
            <td className="text-right px-1 py-2.5 font-mono font-bold text-slate-800">{r.label.includes('收入') ? fmtRevenue(r.month26) : fmtInt(r.month26)}</td>
            <td className="text-right px-1 py-2.5 font-mono font-bold text-slate-500">{r.label.includes('收入') ? fmtRevenue(r.month25) : fmtInt(r.month25)}</td>
            <td className="text-right px-1 py-2.5 font-mono" style={cellStyle(r.monthG)}>{fmtGrowth(r.monthG)}</td>
            <td className="text-right px-1 py-2.5 font-mono font-bold text-slate-800">{r.label.includes('收入') ? fmtRevenue(r.year26) : fmtInt(r.year26)}</td>
            <td className="text-right px-1 py-2.5 font-mono font-bold text-slate-500">{r.label.includes('收入') ? fmtRevenue(r.year25) : fmtInt(r.year25)}</td>
            <td className="text-right px-1 py-2.5 font-mono" style={cellStyle(r.yearG)}>{fmtGrowth(r.yearG)}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

// ===== 主页面 =====
export default function GroupOverview() {
  return (
    <div className="space-y-5">
      {/* ROW 1: 集团多维效益矩阵 */}
      <div className="grid grid-cols-3 gap-4">
        <DimensionPanel dim="day" />
        <DimensionPanel dim="month" />
        <DimensionPanel dim="year" />
      </div>

      {/* ROW 1.5: 集团经营概况表 */}
      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6">
        <div className="flex items-center gap-2 mb-5">
          <span className="w-1.5 h-6 bg-blue-500 rounded-full"></span>
          <span className="text-base font-black text-slate-800">集团经营概况</span>
          <span className="text-[11px] text-slate-400 ml-auto">红色字体 = 同比下滑需重点问责</span>
        </div>
        <GroupSummaryTable />
      </div>

      {/* ROW 2: 客创单元收入概览 */}
      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6">
        <div className="flex items-center gap-2 mb-5">
          <span className="w-1.5 h-6 bg-emerald-500 rounded-full"></span>
          <span className="text-base font-black text-slate-800">客创单元收入概览</span>
          <span className="text-[11px] text-slate-400 ml-auto">红色字体 = 同比下滑需重点问责</span>
        </div>
        {renderSecondaryTable()}
      </div>

      {/* ROW 3: 子公司卡片 */}
      <div className="grid grid-cols-3 gap-4">
        {companies.map(c => <CompanyCard key={c.name} company={c} />)}
      </div>

      {/* ROW 4: 对比表 */}
      <ComparisonTable />
    </div>
  );
}