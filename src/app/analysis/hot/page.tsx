import Link from "next/link";
import { HotAnalysisVisuals } from "@/components/hot-analysis-visuals";
import { DISCIPLINE_OPTIONS } from "@/lib/disciplines";
import { getHomeInsights } from "@/lib/home-insights";
import { SOURCE_LABELS } from "@/lib/source-labels";
import type { ProjectSource } from "@/types/project";

const insightSources: Array<{ value: "all" | ProjectSource; label: string }> = [
  { value: "all", label: "全部来源" },
  { value: "moe", label: SOURCE_LABELS.moe },
  { value: "npopss", label: SOURCE_LABELS.npopss }
];

const rangeOptions = [1, 2, 3, 5, 8];

interface HotAnalysisPageProps {
  searchParams?: Promise<Record<string, string | string[] | undefined>>;
}

function takeFirst(value?: string | string[]) {
  return Array.isArray(value) ? value[0] : value;
}

function buildProjectsLink(source: string, title?: string, year?: number, discipline?: string) {
  const search = new URLSearchParams();

  if (title) {
    search.set("title", title);
  }

  if (year) {
    search.set("year", String(year));
  }

  if (discipline) {
    search.set("discipline", discipline);
  }

  if (source && source !== "all") {
    search.set("source", source);
  }

  return `/projects?${search.toString()}`;
}

export default async function HotAnalysisPage({ searchParams }: HotAnalysisPageProps) {
  const params = (await searchParams) ?? {};
  const source = takeFirst(params.source) ?? "all";
  const hotDiscipline = takeFirst(params.hotDiscipline) ?? "";
  const hotYears = Number(takeFirst(params.hotYears) ?? "5");
  const hotKeyword = takeFirst(params.hotKeyword) ?? "";

  const insights = await getHomeInsights({
    source,
    hotDiscipline,
    hotWindowYears: hotYears,
    hotKeyword
  });

  return (
    <main className="page-shell page-shell--wide page-shell--results">
      <section className="search-workbench analysis-workbench">
        <div className="search-workbench__top">
          <div>
            <h1>热点分析</h1>
            <p>按来源、学科分类、分析时段和关键词筛选，结果以热力图和年度主题分布形式展示。</p>
          </div>
          <Link className="search-workbench__back" href="/">
            返回首页
          </Link>
        </div>

        <form action="/analysis/hot" className="analysis-filter analysis-filter--page">
          <label className="field">
            <span>来源</span>
            <select defaultValue={insights.filterSource} name="source">
              {insightSources.map((item) => (
                <option key={item.value} value={item.value}>
                  {item.label}
                </option>
              ))}
            </select>
          </label>

          <label className="field">
            <span>学科分类</span>
            <select defaultValue={insights.hot.discipline} name="hotDiscipline">
              <option value="">全部学科</option>
              {DISCIPLINE_OPTIONS.map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </select>
          </label>

          <label className="field">
            <span>分析时段</span>
            <select defaultValue={String(insights.hot.windowYears)} name="hotYears">
              {rangeOptions.map((item) => (
                <option key={`hot-${item}`} value={item}>
                  近 {item} 年
                </option>
              ))}
            </select>
          </label>

          <label className="field">
            <span>关键词</span>
            <input
              defaultValue={insights.hot.keyword}
              name="hotKeyword"
              placeholder="输入主题词聚焦热点图谱"
              type="text"
            />
          </label>

          <button className="primary-button" type="submit">
            检索热点图谱
          </button>
        </form>
      </section>

      <section className="analysis-panel analysis-panel--page">
        <div className="analysis-caption analysis-caption--page">
          当前范围：{insights.sourceLabel} / {insights.hot.discipline || "全部学科"} / 近{" "}
          {insights.hot.rangeLabel}
          {insights.hot.keyword ? ` / 关键词：${insights.hot.keyword}` : ""}
        </div>
        <HotAnalysisVisuals filterSource={insights.filterSource} hot={insights.hot} />
      </section>
    </main>
  );
}
