import React from 'react';
import { Tag } from 'antd';
import { AlertOutlined } from '@ant-design/icons';
import * as echarts from 'echarts';

import { EChartsWrapper } from '../components/EChartsWrapper';
import {
  GROUP_DATA, fmtRevenue, fmtInt, fmtGrowth
} from '../data/groupData';

// ===== 量价双轴对比图 =====
const ChannelChart = () => {
  const categories = ['祖山景区', '滨海游船', '天女小镇'];
  const visGrowth = [GROUP_DATA.zushan.visitors.year.g, GROUP_DATA.binhai.visitors.year.g, GROUP_DATA.xiaozhen.visitors.year.g];
  const calcTicketPrice = (c) => c.revenue.year.v / c.visitors.year.v;
  const priceThis = [GROUP_DATA.zushan, GROUP_DATA.binhai, GROUP_DATA.xiaozhen].map(c => calcTicketPrice(c));
  const priceLast = [
    (GROUP_DATA.zushan.revenue.year.l || 139058) / (GROUP_DATA.zushan.visitors.year.l || 98227),
    (GROUP_DATA.binhai.revenue.year.l || 5606462) / (GROUP_DATA.binhai.visitors.year.l || 83932),
    (GROUP_DATA.xiaozhen.revenue.year.l || 4564191) / (GROUP_DATA.xiaozhen.visitors.year.l || 23452),
  ];
  const priceGrowth = priceThis.map((p, i) => Math.round(((p - priceLast[i]) / priceLast[i]) * 100));
  const divergence = visGrowth.map((v, i) => (v > 0 && priceGrowth[i] < 0) || (v < 0 && priceGrowth[i] > 0));

  return (
    <EChartsWrapper
      option={{
        backgroundColor: 'transparent',
        tooltip: {
          trigger: 'axis',
          axisPointer: { type: 'cross' },
          formatter: (params) => {
            const idx = params[0].dataIndex;
            const name = categories[idx];
            const isDiv = divergence[idx];
            let html = `<div class="font-bold text-slate-800 text-xs">${name}</div>`;
            params.forEach(p => {
              html += `<div class="flex justify-between text-[11px] mt-1"><span>${p.seriesName}</span><span class="font-bold font-mono">${p.value}%</span></div>`;
            });
            if (isDiv) html += `<div class="text-amber-600 font-bold text-[10px] mt-1">⚠️ 量价背离</div>`;
            return html;
          }
        },
        legend: {
          data: ['客流同比增长', '客单价同比增长'],
          textStyle: { color: '#64748b', fontWeight: 'bold', fontSize: 12 },
          top: 0, right: '4%',
        },
        grid: { left: '8%', right: '8%', bottom: '10%', top: '14%' },
        xAxis: {
          type: 'category', data: categories,
          axisLabel: { color: '#334155', fontSize: 13, fontWeight: 'bold' },
          axisLine: { lineStyle: { color: '#e2e8f0' } },
        },
        yAxis: {
          type: 'value', name: '同比增减率 (%)',
          nameTextStyle: { color: '#64748b', fontSize: 11, fontWeight: 'bold' },
          splitLine: { lineStyle: { color: 'rgba(148,163,184,0.12)', type: 'dashed' } },
          axisLabel: { color: '#475569', fontSize: 11, fontWeight: 'bold', formatter: '{value}%' },
        },
        series: [
          {
            name: '客流同比增长', type: 'bar', barWidth: 28,
            data: visGrowth,
            itemStyle: { color: (p) => p.value < 0 ? '#E34D59' : '#10b981', borderRadius: [6, 6, 0, 0] },
            label: { show: true, position: 'top', formatter: (p) => `${p.value >= 0 ? '+' : ''}${p.value}%`, color: (p) => p.value < 0 ? '#E34D59' : '#059669', fontWeight: 900, fontSize: 12 },
          },
          {
            name: '客单价同比增长', type: 'bar', barWidth: 28,
            data: priceGrowth,
            itemStyle: { color: (p) => p.value < 0 ? '#E34D59' : '#3b82f6', borderRadius: [6, 6, 0, 0] },
            label: { show: true, position: 'bottom', formatter: (p) => `${p.value >= 0 ? '+' : ''}${p.value}%`, color: (p) => p.value < 0 ? '#E34D59' : '#2563eb', fontWeight: 900, fontSize: 12 },
            markPoint: {
              data: divergence.map((d, i) => d ? { coord: [i, priceGrowth[i]], symbol: 'pin', symbolSize: 40, itemStyle: { color: '#F59E0B' } } : null).filter(Boolean),
            },
          },
        ],
      }}
      style={{ height: 320, width: '100%' }}
    />
  );
};

// ===== 渠道收入拆解表 =====
const ChannelRevenueTable = () => {
  const rows = [
    { key: '1', scenic: '祖山景区', icon: '🏔️', channel: '团队', plan: 180000, actual: 215840, rate: 119.9, visitors: 3228, price: 67, priceYoY: -16 },
    { key: '2', scenic: '祖山景区', icon: '🏔️', channel: 'OTA', plan: 85000, actual: 95010, rate: 111.8, visitors: 1202, price: 79, priceYoY: -8 },
    { key: '3', scenic: '祖山景区', icon: '🏔️', channel: '新媒体', plan: 120000, actual: 267460, rate: 222.9, visitors: 1976, price: 135, priceYoY: 5 },
    { key: '4', scenic: '祖山景区', icon: '🏔️', channel: '小程序', plan: 30000, actual: 121480, rate: 404.9, visitors: 994, price: 122, priceYoY: 18 },
    { key: '5', scenic: '祖山景区', icon: '🏔️', channel: '散客', plan: 220000, actual: 177330, rate: 80.6, visitors: 2928, price: 61, priceYoY: -22 },
    { key: '6', scenic: '滨海游船', icon: '🚢', channel: '团队', plan: 200000, actual: 141070, rate: 70.5, visitors: 3778, price: 37, priceYoY: -42 },
    { key: '7', scenic: '滨海游船', icon: '🚢', channel: 'OTA', plan: 80000, actual: 5290, rate: 6.6, visitors: 529, price: 10, priceYoY: -87 },
    { key: '8', scenic: '滨海游船', icon: '🚢', channel: '分销', plan: 90000, actual: 60030, rate: 66.7, visitors: 6003, price: 10, priceYoY: -35 },
    { key: '9', scenic: '滨海游船', icon: '🚢', channel: '新媒体', plan: 40000, actual: 2530, rate: 6.3, visitors: 253, price: 10, priceYoY: -58 },
    { key: '10', scenic: '天女小镇', icon: '🏘️', channel: '住宿', plan: 320000, actual: 172847, rate: 54.0, visitors: 532, price: 325, priceYoY: -2 },
    { key: '11', scenic: '天女小镇', icon: '🏘️', channel: '餐饮', plan: 280000, actual: 184211, rate: 65.8, visitors: 3091, price: 60, priceYoY: -26 },
    { key: '12', scenic: '天女小镇', icon: '🏘️', channel: '停车场', plan: 60000, actual: 33410, rate: 55.7, visitors: null, price: null, priceYoY: null },
  ];

  return (
    <table className="w-full text-[13px]">
      <thead>
        <tr className="border-b border-slate-200 bg-slate-50">
          <th className="text-left py-3 pr-3 font-bold text-slate-500 text-[12px]">景区</th>
          <th className="text-left py-3 pr-3 font-bold text-slate-500 text-[12px]">渠道</th>
          <th className="text-right px-3 py-3 font-bold text-slate-500 text-[12px]">5月计划收入</th>
          <th className="text-right px-3 py-3 font-bold text-slate-500 text-[12px]">5月实际收入</th>
          <th className="text-right px-3 py-3 font-bold text-slate-500 text-[12px]">计划完成比</th>
          <th className="text-right px-3 py-3 font-bold text-slate-500 text-[12px]">实际客流量</th>
          <th className="text-right px-3 py-3 font-bold text-slate-500 text-[12px]">实际客单价</th>
          <th className="text-right pl-3 py-3 font-bold text-slate-500 text-[12px]">客单价同比</th>
        </tr>
      </thead>
      <tbody>
        {rows.map(r => (
          <tr key={r.key} className="border-b border-slate-50 hover:bg-slate-50">
            <td className="py-3 pr-3 font-bold text-slate-700"><span className="mr-1.5">{r.icon}</span>{r.scenic}</td>
            <td className="py-3 pr-3 text-slate-600">{r.channel}</td>
            <td className="text-right px-3 py-3 font-mono font-bold text-slate-800">{fmtRevenue(r.plan)}</td>
            <td className="text-right px-3 py-3 font-mono font-bold text-slate-800">{fmtRevenue(r.actual)}</td>
            <td className={`text-right px-3 py-3 font-mono font-bold ${r.rate < 100 ? 'text-rose-600' : 'text-emerald-600'}`}>{r.rate}%</td>
            <td className="text-right px-3 py-3 font-mono font-bold text-slate-800">{r.visitors !== null ? fmtInt(r.visitors) : '--'}</td>
            <td className="text-right px-3 py-3 font-mono font-bold text-slate-800">{r.price !== null ? `¥${r.price}` : '--'}</td>
            <td className={`text-right pl-3 py-3 font-mono font-extrabold ${r.priceYoY !== null && r.priceYoY < 0 ? 'text-[#E34D59]' : 'text-emerald-600'}`}>
              {r.priceYoY !== null ? fmtGrowth(r.priceYoY) : '--'}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

// ===== 主页面 =====
export default function ChannelDashboard() {
  return (
    <div className="space-y-5">
      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6">
        <div className="flex items-center justify-between mb-5">
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-6 bg-indigo-500 rounded-full"></span>
            <span className="text-base font-black text-slate-800">渠道量价双轴对比 — 客流同比 vs 客单价同比</span>
          </div>
          <Tag color="warning" className="text-[11px] font-bold border-amber-200 bg-amber-50 text-amber-700">
            <AlertOutlined className="mr-1" />量价背离预警
          </Tag>
        </div>
        <ChannelChart />
        <div className="mt-4 bg-amber-50/60 border border-amber-200 rounded-xl p-3 flex items-start gap-2">
          <Tag color="warning" className="shrink-0 mt-0.5 text-[10px] font-bold">⚠️ 诊断</Tag>
          <span className="text-[12px] text-slate-700 leading-relaxed">
            <b>祖山景区</b>客流量同比增长 <span className="text-emerald-600 font-bold">+13%</span>，但客单价同比下降 <span className="text-red-500 font-bold">-16%</span>，呈现<b>增量不增收</b>的量价背离趋势。
            建议调整渠道票种结构，提升高附加值产品渗透率。
          </span>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6">
        <div className="flex items-center gap-2 mb-5">
          <span className="w-1.5 h-6 bg-indigo-500 rounded-full"></span>
          <span className="text-base font-black text-slate-800">景区 × 渠道多维收入拆解</span>
        </div>
        <div className="overflow-x-auto">
          <ChannelRevenueTable />
        </div>
      </div>
    </div>
  );
}