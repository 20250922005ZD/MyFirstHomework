# 基金课题项目查询工具

面向科研工作者的基金课题项目统一检索工具。当前版本聚焦“教育部人文社科项目 + 国家社科基金项目”两类公开来源，支持按课题名称、学科分类、工作单位、来源、立项年份进行组合检索，并以列表方式展示结果，方便横向对比。

## 项目目标

- 把分散在不同网站的基金课题项目信息统一到一个检索入口
- 降低逐站点检索、重复筛选、重复比对的成本
- 为后续继续接入更多省部级以上公开项目数据库预留结构

## 当前已实现

- 首页统一检索入口
- 检索页组合筛选
- `课题名称` 输入式检索
- `学科分类` 下拉筛选
- `工作单位` 输入式检索
- `来源` 下拉筛选
- `立项年份` 下拉筛选
- 列表化结果展示，便于对比
- 教育部项目本地快照查询
- 国家社科基金实时查询接入
- 查询结果直接展示核心字段，不再依赖单独详情页

## 当前数据来源

- 教育部人文社会科学研究项目
- 国家社科基金项目数据库
  - 实时查询地址：[https://fz.people.com.cn/skygb/sk/index.php/index/seach/](https://fz.people.com.cn/skygb/sk/index.php/index/seach/)

说明：

- `source=moe` 主要走本地标准化快照
- `source=npopss` 走远程实时查询

## 技术栈

- 前端：Next.js 16 + React 19 + TypeScript
- 服务端：Next.js App Router + Route Handlers
- 抓取与解析：Cheerio、Playwright、pdf-parse、xlsx
- 数据层：Prisma + PostgreSQL
- 无数据库兜底：本地 JSON 快照

## 目录说明

```text
.
├─ README.md
├─ design.md
├─ acceptance.md
├─ step-1.md ~ step-8.md
├─ data/
├─ prisma/
├─ scripts/
└─ src/
   ├─ app/
   ├─ components/
   ├─ crawlers/
   ├─ lib/
   └─ types/
```

## 本地运行

安装依赖：

```bash
npm install
```

启动开发环境：

```bash
npm run dev
```

生产构建：

```bash
npm run build
```

类型检查：

```bash
npm run typecheck
```

Windows PowerShell 下如果遇到命令执行策略或别名问题，可使用：

```bash
npm.cmd run dev
npm.cmd run build
npm.cmd run typecheck
```

## 抓取脚本

```bash
npm run crawl:moe
npm run crawl:nsfc
npm run crawl:npopss
npm run crawl
```

说明：

- 当前项目既支持抓取脚本沉淀本地数据，也支持部分来源实时查询
- 第一版更强调“先跑通检索链路”，不是完整的大规模全网抓取平台

## 检索参数

当前检索页支持以下字段：

- 课题名称
- 学科分类
- 工作单位
- 来源
- 立项年份

其中：

- 来源和立项年份为稳定筛选项
- 学科分类使用固定下拉项
- 检索结果以表格/列表方式呈现，适合多项目并排比对

## 项目文档

- 详细设计：[design.md](C:\Users\admin\Documents\yangjingjing\design.md)
- 验收标准：[acceptance.md](C:\Users\admin\Documents\yangjingjing\acceptance.md)
- 开发拆解：
  - [step-1.md](C:\Users\admin\Documents\yangjingjing\step-1.md)
  - [step-2.md](C:\Users\admin\Documents\yangjingjing\step-2.md)
  - [step-3.md](C:\Users\admin\Documents\yangjingjing\step-3.md)
  - [step-4.md](C:\Users\admin\Documents\yangjingjing\step-4.md)
  - [step-5.md](C:\Users\admin\Documents\yangjingjing\step-5.md)
  - [step-6.md](C:\Users\admin\Documents\yangjingjing\step-6.md)
  - [step-7.md](C:\Users\admin\Documents\yangjingjing\step-7.md)
  - [step-8.md](C:\Users\admin\Documents\yangjingjing\step-8.md)

## 当前状态

- Web 页面已经可以本地运行
- `/projects` 页面支持组合检索与结果浏览
- 国家社科基金来源已接入到统一检索页面
- 后续可继续完善分页、更多数据源接入、结果导出与对比分析能力

## 暂不包含

- 登录注册
- 支付会员
- 后台管理系统
- 复杂权限系统
- 全量自动调度抓取平台
- 全站全文检索与智能推荐
