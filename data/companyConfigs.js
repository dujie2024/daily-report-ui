// 各公司数据配置

// 海上游公司配置
export const haishangyouConfig = {
  proportion: 0.0825, // 占平台总量的8.25%
  paidRatio: 0.92,
  receptionRatio: 0.08,
  revenueTrend: '+14.5%',
  visitorsTrend: '+11.2%',
  paidVisitorsTrend: '+12.8%',
  receptionVisitorsTrend: '+6.5%',
  
  channelConfig: [
    { name: '团队', visitorRatio: 0.42, revenueRatio: 0.45, trend: '+16.2%', isUp: true, bgColor: 'bg-blue-50' },
    { name: '分销', visitorRatio: 0.25, revenueRatio: 0.28, trend: '+13.5%', isUp: true, bgColor: 'bg-emerald-50' },
    { name: 'OTA', visitorRatio: 0.20, revenueRatio: 0.18, trend: '+10.8%', isUp: true, bgColor: 'bg-amber-50' },
    { name: '新媒体及小程序', visitorRatio: 0.08, revenueRatio: 0.06, trend: '+20.3%', isUp: true, bgColor: 'bg-purple-50' },
    { name: '散客', visitorRatio: 0.05, revenueRatio: 0.03, trend: '+2.1%', isUp: true, bgColor: 'bg-rose-50' },
  ],
  
  revenueStructure: [
    { name: '票务收入', ratio: 0.58, color: '#3b82f6', trend: '+16.5%', isUp: true },
    { name: '二销商品收入', ratio: 0.22, color: '#10b981', trend: '+18.8%', isUp: true },
    { name: '甲板观光收入', ratio: 0.12, color: '#f59e0b', trend: '+12.3%', isUp: true },
    { name: '其他收入', ratio: 0.08, color: '#64748b', trend: '+8.5%', isUp: true },
  ],
  
  businessRevenue: (totalRevenue) => [
    { name: '观光游船', type: '游船', transactions: 1245, revenue: totalRevenue * 0.35, trend: '+16.5%', isUp: true, category: 'cruise' },
    { name: '豪华游轮', type: '游船', transactions: 456, revenue: totalRevenue * 0.17, trend: '+14.2%', isUp: true, category: 'cruise' },
    { name: '快艇观光', type: '快艇', transactions: 856, revenue: totalRevenue * 0.18, trend: '+19.8%', isUp: true, category: 'speedboat' },
    { name: '快艇冲浪', type: '快艇', transactions: 645, revenue: totalRevenue * 0.10, trend: '+16.5%', isUp: true, category: 'speedboat' },
    { name: '海上摩托', type: '娱乐', transactions: 1123, revenue: totalRevenue * 0.10, trend: '+12.3%', isUp: true, category: 'entertainment' },
    { name: '帆船体验', type: '娱乐', transactions: 345, revenue: totalRevenue * 0.05, trend: '+8.5%', isUp: true, category: 'entertainment' },
    { name: '其他项目', type: '其他', transactions: 567, revenue: totalRevenue * 0.05, trend: '+6.3%', isUp: true, category: 'other' },
  ]
};

// 浪淘沙公司配置
export const langtaoshaConfig = {
  proportion: 0.0945, // 占平台总量的9.45%
  paidRatio: 0.88,
  receptionRatio: 0.12,
  revenueTrend: '+11.8%',
  visitorsTrend: '+9.5%',
  paidVisitorsTrend: '+10.2%',
  receptionVisitorsTrend: '+7.1%',
  
  channelConfig: [
    { name: '团队', visitorRatio: 0.38, revenueRatio: 0.40, trend: '+13.5%', isUp: true, bgColor: 'bg-blue-50' },
    { name: '分销', visitorRatio: 0.22, revenueRatio: 0.24, trend: '+11.2%', isUp: true, bgColor: 'bg-emerald-50' },
    { name: 'OTA', visitorRatio: 0.25, revenueRatio: 0.23, trend: '+9.8%', isUp: true, bgColor: 'bg-amber-50' },
    { name: '新媒体及小程序', visitorRatio: 0.10, revenueRatio: 0.09, trend: '+18.5%', isUp: true, bgColor: 'bg-purple-50' },
    { name: '散客', visitorRatio: 0.05, revenueRatio: 0.04, trend: '+3.2%', isUp: true, bgColor: 'bg-rose-50' },
  ],
  
  revenueStructure: [
    { name: '固定租金', ratio: 0.42, color: '#3b82f6', trend: '+8.5%', isUp: true },
    { name: '流水分成', ratio: 0.35, color: '#10b981', trend: '+15.2%', isUp: true },
    { name: '流水超额分成', ratio: 0.18, color: '#f59e0b', trend: '+22.8%', isUp: true },
    { name: '其他收入', ratio: 0.05, color: '#64748b', trend: '+6.3%', isUp: true },
  ],
  
  businessRevenue: (totalRevenue) => [
    // 联营-固定租金（12家）
    { name: '套圈', type: '联营', rentMode: '固定租金', baseRent: '1万', transactions: 856, revenue: 10000, trend: '+5.2%', isUp: true },
    { name: '超市', type: '联营', rentMode: '固定租金', baseRent: '11万', transactions: 1890, revenue: 110000, trend: '+8.2%', isUp: true },
    { name: '椰子摊位', type: '联营', rentMode: '固定租金', baseRent: '1万', transactions: 1456, revenue: 10000, trend: '+6.8%', isUp: true },
    { name: '充电宝', type: '联营', rentMode: '固定租金', baseRent: '3千', transactions: 2890, revenue: 3000, trend: '+15.2%', isUp: true },
    { name: '食堂', type: '联营', rentMode: '固定租金', baseRent: '1万', transactions: 567, revenue: 10000, trend: '+3.5%', isUp: true },
    { name: '沙滩娱乐', type: '联营', rentMode: '固定租金', baseRent: '3.5万', transactions: 2234, revenue: 35000, trend: '+22.5%', isUp: true },
    { name: '烤冷面', type: '联营', rentMode: '固定租金', baseRent: '3.8万', transactions: 1678, revenue: 38000, trend: '+12.8%', isUp: true },
    { name: '大鱿鱼', type: '联营', rentMode: '固定租金', baseRent: '3.5万', transactions: 1890, revenue: 35000, trend: '+16.5%', isUp: true },
    { name: '章鱼小丸子', type: '联营', rentMode: '固定租金', baseRent: '6万', transactions: 1234, revenue: 60000, trend: '+14.2%', isUp: true },
    { name: '酒吧', type: '联营', rentMode: '固定租金', baseRent: '10万', transactions: 2345, revenue: 100000, trend: '+28.5%', isUp: true },
    { name: '水果捞', type: '联营', rentMode: '固定租金', baseRent: '2万', transactions: 1567, revenue: 20000, trend: '+8.5%', isUp: true },
    { name: '公共沙滩超市', type: '联营', rentMode: '固定租金', baseRent: '10万', transactions: 2567, revenue: 100000, trend: '+6.5%', isUp: true },
    
    // 联营-直接分成（3家）
    { name: '海景露台餐厅', type: '联营', rentMode: '直接分成', shareRate: '梯度23%-8%', transactions: 2156, revenue: 425000, trend: '+22.3%', isUp: true },
    { name: '寄存柜', type: '联营', rentMode: '直接分成', shareRate: '100%', transactions: 3456, revenue: 45000, trend: '+12.3%', isUp: true },
    { name: '沙滩躺椅', type: '联营', rentMode: '直接分成', shareRate: '30%', transactions: 4567, revenue: 95000, trend: '+32.8%', isUp: true },
    
    // 联营-保底+流水（12家）
    { name: '山海宴外租', type: '联营', rentMode: '保底+流水', baseRent: '50万', shareRate: '6%-8%', transactions: 1245, revenue: 580000, trend: '+18.5%', isUp: true },
    { name: '汉堡店', type: '联营', rentMode: '保底+流水', baseRent: '15万', shareRate: '20%-24%', transactions: 1856, revenue: 185000, trend: '+15.7%', isUp: true },
    { name: '凯文潮咖啡', type: '联营', rentMode: '保底+流水', baseRent: '10万', shareRate: '20%-24%', transactions: 1678, revenue: 125000, trend: '+12.4%', isUp: true },
    { name: '沪上阿姨', type: '联营', rentMode: '保底+流水', baseRent: '4-6万', shareRate: '15%', transactions: 945, revenue: 68000, trend: '+25.6%', isUp: true },
    { name: '淋浴', type: '联营', rentMode: '保底+流水', baseRent: '1万', shareRate: '15%-17%', transactions: 2345, revenue: 15000, trend: '+8.9%', isUp: true },
    { name: '哈根达斯', type: '联营', rentMode: '保底+流水', baseRent: '4万', shareRate: '20%', transactions: 1234, revenue: 58000, trend: '+28.5%', isUp: true },
    { name: '文创', type: '联营', rentMode: '保底+流水', baseRent: '2万', shareRate: '15%', transactions: 1123, revenue: 28000, trend: '+18.9%', isUp: true },
    { name: '红妆茶语', type: '联营', rentMode: '保底+流水', baseRent: '6万', shareRate: '30%', transactions: 1456, revenue: 75000, trend: '+25.3%', isUp: true },
    { name: '旅拍', type: '联营', rentMode: '保底+流水', baseRent: '6万', shareRate: '15%', transactions: 456, revenue: 72000, trend: '+35.8%', isUp: true },
    { name: '面皮肉夹馍', type: '联营', rentMode: '保底+流水', baseRent: '2万', shareRate: '20%', transactions: 1234, revenue: 25000, trend: '+12.3%', isUp: true },
    { name: '薯格薯条', type: '联营', rentMode: '保底+流水', baseRent: '2万', shareRate: '25%', transactions: 1456, revenue: 28000, trend: '+18.5%', isUp: true },
    { name: '炒饭', type: '联营', rentMode: '保底+流水', baseRent: '2万', shareRate: '25%', transactions: 1123, revenue: 26000, trend: '+15.2%', isUp: true },
  ]
};
