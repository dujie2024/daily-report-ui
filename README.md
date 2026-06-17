# 新朝旅游移动驾驶舱项目

## 项目结构

本项目已按公司模块化重构，便于后续维护和同步更新。

### 📁 目录结构

```
运营日报 UI 设计/
├── App.jsx                          # 主应用文件（数据逻辑 + 路由）
├── main.jsx                         # 应用入口
├── index.html                       # HTML模板
├── index.css                        # 全局样式
├── components/                      # 公司组件目录
│   ├── ZushanCompany.jsx           # 祖山景区组件
│   ├── XiaozhenCompany.jsx         # 天女小镇组件
│   ├── HaishangyouCompany.jsx      # 海上游公司组件
│   └── LangtaoshaCompany.jsx       # 浪淘沙公司组件
├── data/                            # 数据配置目录
│   └── companyConfigs.js           # 公司数据配置（海上游、浪淘沙）
├── utils/                           # 工具函数目录
│   └── companyDataUtils.js         # 通用数据生成工具
└── package.json                     # 项目依赖
```

### 🏢 公司模块

#### 1. **祖山景区** (43.83%)
- **主要业态**: 门票（门车索）、商业收入、其他收入
- **特色项目**: 
  - 大庙文创（自营）
  - 索道上站超市（第三方）
  - 幽谷禅堂（自营）
  - 小鹿餐厅（自营）
  - 咖啡（自营）
  - 自助售卖机
  - 抵账收入
- **组件**: `components/ZushanCompany.jsx`

#### 2. **天女小镇** (22.05%)
- **主要业态**: 住宿、餐饮、乐园、滑雪场
- **特色项目**:
  - 天女汤泉温泉康养（住宿）
  - 山谷民宿（住宿）
  - 小镇主题餐厅（餐饮）
  - 特色小吃街（餐饮）
  - 儿童乐园（乐园）
  - 水上乐园（乐园）
  - 滑雪场（滑雪）
  - 停车场（其他）
- **组件**: `components/XiaozhenCompany.jsx`

#### 3. **海上游公司** (8.25%) ⭐ 新增
- **主要业态**: 游船、快艇、娱乐项目
- **特色项目**:
  - 观光游船（游船）
  - 豪华游轮（游船）
  - 快艇观光（快艇）
  - 快艇冲浪（快艇）
  - 海上摩托（娱乐）
  - 帆船体验（娱乐）
  - 其他项目
- **组件**: `components/HaishangyouCompany.jsx`
- **配置**: `data/companyConfigs.js` - `haishangyouConfig`

#### 4. **浪淘沙公司** (9.45%) ⭐ 新增
- **主要业态**: 海滩、娱乐、餐饮
- **特色项目**:
  - 海滩门票（海滩）
  - 沙滩椅租赁（海滩）
  - 沙滩排球（娱乐）
  - 水上乐园（娱乐）
  - 海滩餐厅（餐饮）
  - 饮品小吃（餐饮）
  - 其他项目
- **组件**: `components/LangtaoshaCompany.jsx`
- **配置**: `data/companyConfigs.js` - `langtaoshaConfig`

### 📊 数据流程

```
App.jsx (主文件)
├── 平台总数据计算 (getDynamicStats)
├── 各公司数据生成
│   ├── 祖山景区 (getZushanData)
│   ├── 天女小镇 (getXiaozhenData)
│   ├── 海上游 (getHaishangyouData) ⭐
│   └── 浪淘沙 (getLangtaoshaData) ⭐
└── 传递给对应组件渲染
```

### 🔧 如何添加新公司

1. **创建组件文件** `components/NewCompany.jsx`
   - 复制现有公司组件作为模板
   - 修改公司名称和业态类型

2. **配置数据** `data/companyConfigs.js`
   ```javascript
   export const newCompanyConfig = {
     proportion: 0.05,  // 占平台总量的比例
     paidRatio: 0.85,
     receptionRatio: 0.15,
     channelConfig: [...],
     revenueStructure: [...],
     businessRevenue: (totalRevenue) => [...]
   };
   ```

3. **在App.jsx中集成**
   - 导入组件和配置
   - 添加数据生成函数
   - 添加路由渲染
   - 添加底部导航按钮

4. **更新比例** 确保所有公司的 `proportion` 总和 ≤ 1.0

### 🎨 组件统一结构

每个公司组件包含以下标准模块：

1. **头部信息卡** - 公司名称
2. **KPI数据网格** (2×2) - 总收入、总客流、收费客流、接待客流
3. **各渠道销售表格** - 5个销售渠道数据
4. **收入结构分析表格** - 各业态收入占比
5. **业态/项目收入情况表格** - 详细的业务单元数据
6. **返回按钮** (仅管理员可见)

### 🚀 开发命令

```bash
# 安装依赖
npm install

# 启动开发服务器
npm run dev

# 构建生产版本
npm run build
```

### 📝 维护建议

1. **数据同步**: 所有公司数据基于平台总数据自动计算，修改比例配置即可调整
2. **样式统一**: 使用Tailwind CSS，保持各公司组件样式一致
3. **组件复用**: 新增公司时复制现有组件，减少重复代码
4. **配置化**: 业态配置、渠道配置都在 `data/companyConfigs.js` 中集中管理

### 🎯 下一步优化建议

- [ ] 将祖山和天女小镇的数据配置也移到 `companyConfigs.js`
- [ ] 创建通用的表格组件，减少重复代码
- [ ] 添加数据导出功能
- [ ] 添加图表可视化（ECharts）
- [ ] 支持多语言切换

---

**技术栈**: React 18 + Vite + Tailwind CSS + Lucide Icons  
**版本**: v2.3.0-Production  
**技术支持**: 北京华景乐游科技股份有限公司
