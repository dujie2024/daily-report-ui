import React from 'react';
import { GROUP_DATA, fmtInt, fmtGrowth } from '../../data/groupData';

// 客创单元纯收入拆解大表（多级行合并）
export const renderSecondaryTable = () => {
  const rows = [
    // 山居单元
    { unit: '山居单元', unitRowSpan: 5, metric: '祖山总客流（人次）', metricRowSpan: 1, label: '祖山接待量', d26: 1312, d25: 889, dG: 48, m26: 13565, m25: 15074, mG: -10, y26: 110961, y25: 98227, yG: 13 },
    { unit: '', unitRowSpan: 0, metric: '门票实际客单价（元）', metricRowSpan: 1, label: '门票客单', d26: 97, d25: 106, dG: -8, m26: 96, m25: 96, mG: 0, y26: 70, y25: 84, yG: -16 },
    { unit: '', unitRowSpan: 0, metric: '小镇住宿间夜数', metricRowSpan: 1, label: '客房住宿量（间）', d26: 0, d25: 29, dG: -100, m26: 532, m25: 672, mG: -21, y26: 4043, y25: 4043, yG: 0 },
    { unit: '', unitRowSpan: 0, metric: '住宿实际客单价（元）', metricRowSpan: 1, label: '住宿客单', d26: 0, d25: 295, dG: -100, m26: 325, m25: 332, mG: -2, y26: 255, y25: 305, yG: -17 },
    { unit: '', unitRowSpan: 0, metric: '含税收入合计', metricRowSpan: 1, label: '含税收入', d26: 169255, d25: 178121, dG: -5, m26: 2381983, m25: 3181740, mG: -25, y26: 15462204, y25: 18309710, yG: -16 },
    // 滨海单元
    { unit: '滨海单元', unitRowSpan: 3, metric: '游船总客流（人次）', metricRowSpan: 1, label: '游船接待量', d26: 1523, d25: 2201, dG: -31, m26: 15136, m25: 23335, mG: -35, y26: 45128, y25: 83932, yG: -46 },
    { unit: '', unitRowSpan: 0, metric: '船票实际客单价（元）', metricRowSpan: 1, label: '船票客单', d26: 29, d25: 31, dG: -9, m26: 32, m25: 33, mG: -3, y26: 36, y25: 42, yG: -14 },
    { unit: '', unitRowSpan: 0, metric: '含税收入合计', metricRowSpan: 1, label: '游船收入', d26: 51536, d25: 79467, dG: -35, m26: 563858, m25: 954118, mG: -41, y26: 1915234, y25: 3982729, yG: -52 },
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
          <th className="text-left py-3 pr-3 font-bold text-slate-500 text-[12px]">经营单元</th>
          <th className="text-left py-3 pr-3 font-bold text-slate-500 text-[12px]">指标分类</th>
          <th className="text-left py-3 pr-3 font-bold text-slate-500 text-[12px]">明细</th>
          <th className="text-center px-2 py-3 font-bold text-slate-500 text-[12px]" colSpan={3}>本日</th>
          <th className="text-center px-2 py-3 font-bold text-slate-500 text-[12px]" colSpan={3}>月度累计</th>
          <th className="text-center px-2 py-3 font-bold text-slate-500 text-[12px]" colSpan={3}>年度累计</th>
        </tr>
        <tr className="border-b border-slate-100 bg-slate-50/80">
          <th></th><th></th><th></th>
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
            <td className="py-2.5 pr-3 font-bold text-slate-700" style={r.unitRowSpan > 0 ? {} : { display: 'none' }} rowSpan={r.unitRowSpan || 1}>
              {r.unit || ''}
            </td>
            <td className="py-2.5 pr-3 font-semibold text-blue-600 text-[12px]" style={r.metricRowSpan > 0 ? {} : { display: 'none' }} rowSpan={r.metricRowSpan || 1}>
              {r.metric || ''}
            </td>
            <td className="py-2.5 pr-3 text-slate-700">{r.label}</td>
            <td className="text-right px-1 py-2.5 font-mono font-bold text-slate-800">{fmtInt(r.d26)}</td>
            <td className="text-right px-1 py-2.5 font-mono font-bold text-slate-500">{fmtInt(r.d25)}</td>
            <td className="text-right px-1 py-2.5 font-mono" style={cellStyle(r.dG)}>{fmtGrowth(r.dG)}</td>
            <td className="text-right px-1 py-2.5 font-mono font-bold text-slate-800">{fmtInt(r.m26)}</td>
            <td className="text-right px-1 py-2.5 font-mono font-bold text-slate-500">{fmtInt(r.m25)}</td>
            <td className="text-right px-1 py-2.5 font-mono" style={cellStyle(r.mG)}>{fmtGrowth(r.mG)}</td>
            <td className="text-right px-1 py-2.5 font-mono font-bold text-slate-800">{fmtInt(r.y26)}</td>
            <td className="text-right px-1 py-2.5 font-mono font-bold text-slate-500">{fmtInt(r.y25)}</td>
            <td className="text-right px-1 py-2.5 font-mono" style={cellStyle(r.yG)}>{fmtGrowth(r.yG)}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};