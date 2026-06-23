// ============================================================
// REAL DATA FROM PDF 2026年秦皇岛旅游港6月21日营收日报
// ============================================================
export const GROUP_DATA = {
  summary: {
    revenue: { day: { v: 169255, g: -5 }, month: { v: 2381983, g: -25 }, year: { v: 15462204, g: -16 } },
    visitors: { day: { v: 2835, g: -8 }, month: { v: 28701, g: -25 }, year: { v: 156089, g: -14 } },
  },
  zushan: {
    name: '祖山景区', icon: '🏔️',
    revenue: { day: { v: 98758, g: 47, l: 67015 }, month: { v: 1132289, g: -13, l: 13072788 }, year: { v: 7565969, g: -7, l: 139058 } },
    visitors: { day: { v: 1312, g: 48, l: 889 }, month: { v: 13565, g: -10, l: 15074 }, year: { v: 110961, g: 13, l: 98227 } },
  },
  binhai: {
    name: '滨海游船', icon: '🚢',
    revenue: { day: { v: 52787, g: -41, l: 89004 }, month: { v: 718704, g: -46, l: 1319779 }, year: { v: 2605468, g: -54, l: 5606462 } },
    visitors: { day: { v: 1523, g: -31, l: 2201 }, month: { v: 15136, g: -35, l: 23335 }, year: { v: 45128, g: -46, l: 83932 } },
  },
  xiaozhen: {
    name: '天女小镇', icon: '🏘️',
    revenue: { day: { v: 17710, g: -20, l: 22101 }, month: { v: 530990, g: -4, l: 554683 }, year: { v: 5290766, g: 16, l: 4564191 } },
    visitors: { day: { v: 79, g: -48, l: 151 }, month: { v: 3091, g: -2, l: 3156 }, year: { v: 29788, g: 27, l: 23452 } },
  },
};

// ============================================================
// FORMAT HELPERS
// ============================================================
export const fmtRevenue = (v) => {
  if (!v) return '0';
  if (v >= 1000000) return `${(v / 1000000).toFixed(2)}M`;
  if (v >= 1000) return `${(v / 1000).toFixed(2)}K`;
  return v.toFixed(2);
};

export const fmtInt = (v) => {
  if (!v && v !== 0) return '0';
  return Math.round(v).toLocaleString('en-US');
};

export const fmtGrowth = (v) => {
  if (v === null || v === undefined) return '--';
  return `${v >= 0 ? '+' : ''}${v}%`;
};

export const dimLabel = { day: '本日', month: '本月', year: '本年' };

export const companies = [GROUP_DATA.zushan, GROUP_DATA.binhai, GROUP_DATA.xiaozhen];