import React from 'react';
import { renderSecondaryTable } from '../components/shared/SecondaryTable';
import { fmtRevenue, fmtInt } from '../data/groupData';

export default function SecondaryDashboard() {
  return (
    <div className="space-y-5">
      {/* 客创单元纯收入拆解大表 */}
      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6">
        <div className="flex items-center gap-2 mb-5">
          <span className="w-1.5 h-6 bg-emerald-500 rounded-full"></span>
          <span className="text-base font-black text-slate-800">客创单元纯收入拆解复盘（门票 vs 二消）</span>
          <span className="text-[11px] text-slate-400 ml-auto">红色字体 = 同比下滑需重点问责</span>
        </div>
        {renderSecondaryTable()}
      </div>

      {/* 客单价快照卡片 */}
      <div className="grid grid-cols-3 gap-4">
        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-5">
          <div className="text-[12px] text-slate-400 font-bold mb-1">祖山门票客单</div>
          <div className="text-[20px] font-black font-mono text-slate-800">¥97 <span className="text-sm text-slate-400">(本日)</span></div>
          <div className="flex gap-2 mt-2">
            <span className="text-[10px] bg-emerald-50 text-emerald-600 font-bold px-1.5 py-0.5 rounded">月度 ¥96</span>
            <span className="text-[10px] bg-emerald-50 text-emerald-600 font-bold px-1.5 py-0.5 rounded">年度 ¥70</span>
          </div>
        </div>
        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-5">
          <div className="text-[12px] text-slate-400 font-bold mb-1">滨海船票客单</div>
          <div className="text-[20px] font-black font-mono text-slate-800">¥29 <span className="text-sm text-slate-400">(本日)</span></div>
          <div className="flex gap-2 mt-2">
            <span className="text-[10px] bg-emerald-50 text-emerald-600 font-bold px-1.5 py-0.5 rounded">月度 ¥32</span>
            <span className="text-[10px] bg-emerald-50 text-emerald-600 font-bold px-1.5 py-0.5 rounded">年度 ¥36</span>
          </div>
        </div>
        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-5">
          <div className="text-[12px] text-slate-400 font-bold mb-1">小镇住宿客单</div>
          <div className="text-[20px] font-black font-mono text-slate-800">¥325 <span className="text-sm text-slate-400">(月度)</span></div>
          <div className="flex gap-2 mt-2">
            <span className="text-[10px] text-rose-600 bg-rose-50 font-bold px-1.5 py-0.5 rounded">同比 -2%</span>
            <span className="text-[10px] text-rose-600 bg-rose-50 font-bold px-1.5 py-0.5 rounded">年度 ¥255</span>
          </div>
        </div>
      </div>
    </div>
  );
}