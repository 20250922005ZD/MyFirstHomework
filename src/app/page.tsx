import Link from "next/link";
import { SearchForm } from "@/components/search-form";

const checklist = [
  "支持教育部与国家社科基金真实来源检索",
  "支持课题名称、学科分类、工作单位、来源、立项年份组合筛选",
  "支持列表检索、热点图谱、前沿词云等多种结果浏览方式"
];

export default async function HomePage() {
  return (
    <main className="page-shell page-shell--wide page-shell--dashboard">
      <section className="hero-banner">
        <div className="hero-banner__content">
          <span className="eyebrow">Research Navigator</span>
          <h1>基金课题项目查询</h1>
          <p className="lead">
            面向科研工作者的基金项目统一检索台。首页只负责输入检索条件，
            具体结果会进入独立子页面展示，便于做列表、图谱和词云等多种形式分析。
          </p>
          <SearchForm />
        </div>
      </section>

      <section className="overview-strip">
        {checklist.map((item) => (
          <div key={item} className="overview-strip__item">
            {item}
          </div>
        ))}
      </section>

      <section className="portal-grid">
        <Link className="portal-card" href="/projects">
          <span className="portal-card__eyebrow">List Search</span>
          <h2>项目检索结果页</h2>
          <p>进入标准检索列表页，适合对比课题名称、负责人、单位、来源和年份。</p>
          <strong>进入检索结果</strong>
        </Link>

        <Link className="portal-card portal-card--hot" href="/analysis/hot">
          <span className="portal-card__eyebrow">Hot Analysis</span>
          <h2>热点分析</h2>
          <p>按学科、时段、关键词生成热点热力图与年度主题分布，单独在子页面查看。</p>
          <strong>进入热点分析</strong>
        </Link>

        <Link className="portal-card portal-card--frontier" href="/analysis/frontier">
          <span className="portal-card__eyebrow">Frontier Discovery</span>
          <h2>前沿发现</h2>
          <p>按学科、时段、关键词生成词云与关键词共现网络图，单独在子页面查看。</p>
          <strong>进入前沿发现</strong>
        </Link>
      </section>
    </main>
  );
}
