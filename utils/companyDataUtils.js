// 通用公司数据生成工具函数

export const generateCompanyData = (totalRevVal, totalVisVal, proportion, config = {}) => {
  const {
    paidRatio = 0.85,
    receptionRatio = 0.15,
    revenueTrend = '+10.5%',
    visitorsTrend = '+8.2%',
    paidVisitorsTrend = '+9.1%',
    receptionVisitorsTrend = '+5.3%'
  } = config;

  const companyRevenue = totalRevVal * proportion;
  const companyVisitors = totalVisVal * proportion;
  const paidVisitors = Math.round(companyVisitors * paidRatio);
  const receptionVisitors = Math.round(companyVisitors * receptionRatio);
  
  const fmtNum = (n) => {
    if (n >= 1000000) return `${(n / 1000000).toFixed(2)}M`;
    if (n >= 1000) return `${(n / 1000).toFixed(2)}K`;
    return n.toFixed(2);
  };
  const fmtInt = (n) => Math.round(n).toLocaleString('en-US');
  
  return {
    revenue: fmtNum(companyRevenue),
    revenueTrend,
    visitors: fmtInt(companyVisitors),
    visitorsTrend,
    paidVisitors: fmtInt(paidVisitors),
    paidVisitorsTrend,
    receptionVisitors: fmtInt(receptionVisitors),
    receptionVisitorsTrend,
    rawRevenue: companyRevenue,
    rawVisitors: companyVisitors,
  };
};

export const generateChannelSales = (totalRevenue, totalVisitors, channelConfig) => {
  return channelConfig.map(channel => ({
    name: channel.name,
    quantity: Math.round(totalVisitors * channel.visitorRatio),
    revenue: totalRevenue * channel.revenueRatio,
    trend: channel.trend,
    isUp: channel.isUp,
    bgColor: channel.bgColor
  }));
};

export const generateRevenueStructure = (totalRevenue, structureConfig) => {
  return structureConfig.map(item => ({
    name: item.name,
    value: totalRevenue * item.ratio,
    ratio: Math.round(item.ratio * 100),
    color: item.color,
    trend: item.trend,
    isUp: item.isUp
  }));
};
