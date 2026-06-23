import React, { useState } from 'react';
import { ConfigProvider, Layout, Menu, Badge, DatePicker, Typography } from 'antd';
import { DashboardOutlined, BarChartOutlined, ShopOutlined, CalendarOutlined, FireOutlined } from '@ant-design/icons';
import dayjs from 'dayjs';

import GroupOverview from './pages/GroupOverview';
import ChannelDashboard from './pages/ChannelDashboard';
import SecondaryDashboard from './pages/SecondaryDashboard';

const { Header, Sider, Content } = Layout;
const { Text } = Typography;

export default function App() {
  const [activeMenu, setActiveMenu] = useState('review');
  const [selectedDate, setSelectedDay] = useState(dayjs('2026-06-21'));

  return (
    <ConfigProvider
      theme={{
        algorithm: window.antd?.theme?.defaultAlgorithm,
        token: {
          colorPrimary: '#2563eb',
          colorBgBase: '#f8fafc',
          colorBgContainer: '#ffffff',
          colorBorder: '#e2e8f0',
          borderRadius: 12,
          fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif'
        },
        components: { Layout: { headerBg: '#ffffff', siderBg: '#ffffff' } }
      }}
    >
      <Layout style={{ minHeight: '100vh' }}>
        <Sider width={220} className="border-r border-slate-200 shadow-sm" style={{ background: '#ffffff' }}>
          <div className="p-5 border-b border-slate-100 flex items-center gap-3">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center shadow-lg shadow-blue-500/20 shrink-0">
              <FireOutlined className="text-white text-base" />
            </div>
            <div>
              <span className="block text-xs font-black tracking-widest text-slate-800 uppercase">新朝旅游集团</span>
              <span className="block text-[8px] text-blue-600 font-extrabold tracking-widest uppercase">Decision Cockpit</span>
            </div>
          </div>
          <Menu
            mode="inline"
            selectedKeys={[activeMenu]}
            onClick={({ key }) => setActiveMenu(key)}
            style={{ background: 'transparent', border: 'none', padding: '12px 8px' }}
            items={[
              { key: 'review', icon: <DashboardOutlined style={{ fontSize: '15px' }} />, label: '集团总览' },
              { key: 'channels', icon: <BarChartOutlined style={{ fontSize: '15px' }} />, label: '渠道效益看板' },
              { key: 'secondary', icon: <ShopOutlined style={{ fontSize: '15px' }} />, label: '商户二消看板' },
            ]}
            className="font-bold text-xs"
          />
          <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-slate-100 bg-white">
            <div className="flex items-center justify-between text-[10px] text-slate-500">
              <span className="font-bold">数据状态：</span>
              <span className="text-emerald-600 font-extrabold flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping shrink-0"></span>
                ACTIVE
              </span>
            </div>
          </div>
        </Sider>

        <Layout>
          <Header className="h-16 flex items-center justify-between px-6 border-b border-slate-200 bg-white">
            <div className="flex items-center gap-3">
              <span className="text-sm font-black text-slate-800">📊 新朝旅游集团 · 经营总览</span>
              <span className="text-[10px] text-slate-400 font-medium bg-slate-100 px-2 py-1 rounded-md">
                {selectedDate.format('YYYY年M月D日')}
              </span>
            </div>
            <div className="flex items-center gap-3">
              <Badge status="processing" text={<span className="text-xs text-slate-500 font-medium">经营数据库已同步</span>} />
              <DatePicker value={selectedDate} onChange={(d) => d && setSelectedDay(d)} allowClear={false} size="small" className="text-xs font-bold" />
            </div>
          </Header>

          <Content style={{ padding: 24, overflowY: 'auto' }} className="bg-slate-50">
            {activeMenu === 'review' && <GroupOverview />}
            {activeMenu === 'channels' && <ChannelDashboard />}
            {activeMenu === 'secondary' && <SecondaryDashboard />}
          </Content>
        </Layout>
      </Layout>
    </ConfigProvider>
  );
}