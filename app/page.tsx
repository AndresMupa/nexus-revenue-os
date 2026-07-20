"use client";

import {
  Activity,
  ArrowUpRight,
  Bell,
  Bot,
  Check,
  ChevronDown,
  CircleDollarSign,
  Clock3,
  Command,
  Gauge,
  LayoutDashboard,
  Menu,
  MessageSquareText,
  Search,
  Settings2,
  Sparkles,
  Target,
  TrendingUp,
  TriangleAlert,
  Users,
  WandSparkles,
  X,
  Zap,
} from "lucide-react";
import { useMemo, useState } from "react";

type Deal = {
  id: number;
  company: string;
  initials: string;
  contact: string;
  value: number;
  stage: "Discovery" | "Proposal" | "Negotiation";
  probability: number;
  score: number;
  age: number;
  lastTouch: string;
  signal: string;
  color: string;
};

const seedDeals: Deal[] = [
  { id: 1, company: "Orbita Logistics", initials: "OL", contact: "Laura Gómez", value: 48200, stage: "Negotiation", probability: 78, score: 91, age: 18, lastTouch: "2h", signal: "Pricing page viewed 3×", color: "cyan" },
  { id: 2, company: "Nova Health", initials: "NH", contact: "Mateo Ríos", value: 36500, stage: "Proposal", probability: 64, score: 82, age: 11, lastTouch: "1d", signal: "Champion shared proposal", color: "violet" },
  { id: 3, company: "Kubo Retail", initials: "KR", contact: "Sara Peña", value: 21900, stage: "Discovery", probability: 45, score: 73, age: 7, lastTouch: "4h", signal: "New stakeholder added", color: "amber" },
  { id: 4, company: "Aster Finance", initials: "AF", contact: "Juan Cruz", value: 58200, stage: "Negotiation", probability: 52, score: 61, age: 29, lastTouch: "6d", signal: "No reply after security review", color: "rose" },
  { id: 5, company: "Páramo Energy", initials: "PE", contact: "Ana Torres", value: 27400, stage: "Proposal", probability: 38, score: 58, age: 24, lastTouch: "5d", signal: "Decision date moved", color: "green" },
  { id: 6, company: "Lumen Studio", initials: "LS", contact: "Nicolás Vera", value: 12800, stage: "Discovery", probability: 31, score: 67, age: 5, lastTouch: "3h", signal: "High email engagement", color: "blue" },
];

const money = (value: number) =>
  new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(value);

export default function RevenueWorkspace() {
  const [deals, setDeals] = useState(seedDeals);
  const [selected, setSelected] = useState<Deal>(seedDeals[0]);
  const [query, setQuery] = useState("");
  const [assistantOpen, setAssistantOpen] = useState(true);
  const [mobileNav, setMobileNav] = useState(false);
  const [toast, setToast] = useState("");

  const filteredDeals = useMemo(
    () => deals.filter((deal) => `${deal.company} ${deal.contact}`.toLowerCase().includes(query.toLowerCase())),
    [deals, query],
  );

  const pipeline = useMemo(() => deals.reduce((sum, deal) => sum + deal.value, 0), [deals]);
  const weighted = useMemo(() => deals.reduce((sum, deal) => sum + deal.value * (deal.probability / 100), 0), [deals]);

  const actOnDeal = () => {
    setDeals((current) => current.map((deal) => deal.id === selected.id ? { ...deal, score: Math.min(99, deal.score + 4), lastTouch: "now", signal: "Executive follow-up scheduled" } : deal));
    setSelected((deal) => ({ ...deal, score: Math.min(99, deal.score + 4), lastTouch: "now", signal: "Executive follow-up scheduled" }));
    setToast("Action queued · executive follow-up scheduled");
    window.setTimeout(() => setToast(""), 2800);
  };

  return (
    <main className="app-shell">
      {toast && <div className="toast"><Check size={16} /> {toast}</div>}

      <aside className={`sidebar ${mobileNav ? "sidebar-open" : ""}`}>
        <div className="brand"><div className="brand-mark"><Zap size={19} fill="currentColor" /></div><span>NEXUS</span><em>OS</em></div>
        <button className="mobile-close" onClick={() => setMobileNav(false)} aria-label="Close navigation"><X /></button>
        <nav>
          <p className="nav-label">Workspace</p>
          <a className="nav-item active"><LayoutDashboard size={18} /> Revenue command</a>
          <a className="nav-item"><Target size={18} /> Pipeline <span>24</span></a>
          <a className="nav-item"><Users size={18} /> Accounts</a>
          <a className="nav-item"><MessageSquareText size={18} /> Conversations <i>6</i></a>
          <p className="nav-label">Intelligence</p>
          <a className="nav-item"><Bot size={18} /> Nexus agent <span className="live-dot" /></a>
          <a className="nav-item"><Gauge size={18} /> Forecast</a>
          <a className="nav-item"><Activity size={18} /> Signals</a>
        </nav>
        <div className="sidebar-card">
          <div className="pulse-icon"><Sparkles size={16} /></div>
          <strong>Pipeline pulse</strong>
          <p>3 deals need attention before Friday.</p>
          <button onClick={() => setAssistantOpen(true)}>Review now <ArrowUpRight size={14} /></button>
        </div>
        <div className="user-row"><div className="avatar">AM</div><div><strong>Andrés Muñoz</strong><small>Revenue lead</small></div><Settings2 size={17} /></div>
      </aside>

      <section className="workspace">
        <header className="topbar">
          <button className="menu-button" onClick={() => setMobileNav(true)} aria-label="Open navigation"><Menu /></button>
          <div><p className="eyebrow">MONDAY, JUL 20</p><h1>Revenue command</h1></div>
          <div className="topbar-actions">
            <label className="search"><Search size={17} /><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search deals, accounts…" /><kbd>⌘ K</kbd></label>
            <button className="icon-button" aria-label="Notifications"><Bell size={18} /><span /></button>
            <button className="primary-button" onClick={() => setToast("Demo deal workspace created")}><span>＋</span> New deal</button>
          </div>
        </header>

        <div className="content">
          <section className="hero-row">
            <div>
              <div className="status-line"><span className="status-dot" /> Live forecast · updated 2 min ago</div>
              <h2>Your pipeline is <span>stronger</span> than last week.</h2>
              <p>Nexus found $74.6K in recoverable revenue and prioritized the three actions most likely to move it.</p>
            </div>
            <button className="agent-button" onClick={() => setAssistantOpen(!assistantOpen)}><WandSparkles size={17} /> Ask Nexus <Command size={14} /></button>
          </section>

          <section className="metric-grid">
            <Metric label="Open pipeline" value={money(pipeline)} delta="+12.4%" icon={<CircleDollarSign />} spark={[25,30,28,42,38,56,62]} />
            <Metric label="Weighted forecast" value={money(weighted)} delta="+8.1%" icon={<TrendingUp />} spark={[18,22,35,31,45,47,60]} />
            <Metric label="Win probability" value="61.8%" delta="+4.2 pts" icon={<Target />} spark={[22,20,34,41,38,49,54]} />
            <Metric label="At-risk revenue" value="$85.6K" delta="2 deals" icon={<TriangleAlert />} spark={[56,48,51,43,34,37,26]} risk />
          </section>

          <div className="main-grid">
            <section className="panel pipeline-panel">
              <div className="panel-head"><div><p className="eyebrow">DEAL FLOW</p><h3>Pipeline intelligence</h3></div><button className="ghost-button">This quarter <ChevronDown size={14} /></button></div>
              <div className="stage-row">
                {(["Discovery", "Proposal", "Negotiation"] as Deal["stage"][]).map((stage) => {
                  const stageDeals = filteredDeals.filter((deal) => deal.stage === stage);
                  const total = stageDeals.reduce((sum, deal) => sum + deal.value, 0);
                  return <div className="stage" key={stage}>
                    <div className="stage-head"><div><span className={`stage-dot ${stage.toLowerCase()}`} />{stage}</div><strong>{money(total)}</strong><small>{stageDeals.length}</small></div>
                    <div className="deal-list">
                      {stageDeals.map((deal) => <button className={`deal-card ${selected.id === deal.id ? "selected" : ""}`} key={deal.id} onClick={() => { setSelected(deal); setAssistantOpen(true); }}>
                        <div className="deal-top"><span className={`company-avatar ${deal.color}`}>{deal.initials}</span><div><strong>{deal.company}</strong><small>{deal.contact}</small></div><b>{deal.score}</b></div>
                        <div className="deal-value"><strong>{money(deal.value)}</strong><span>{deal.probability}% likely</span></div>
                        <div className="progress"><i style={{ width: `${deal.probability}%` }} /></div>
                        <div className="deal-meta"><span><Clock3 size={12} /> {deal.lastTouch}</span><span>{deal.age} days</span></div>
                      </button>)}
                    </div>
                  </div>;
                })}
              </div>
            </section>

            <aside className={`panel intelligence-panel ${assistantOpen ? "" : "collapsed"}`}>
              <div className="panel-head"><div><p className="eyebrow"><span className="status-dot" /> NEXUS AGENT</p><h3>Next best action</h3></div><button className="icon-button bare" onClick={() => setAssistantOpen(false)} aria-label="Close assistant"><X size={17} /></button></div>
              <div className="focus-account"><span className={`company-avatar ${selected.color}`}>{selected.initials}</span><div><strong>{selected.company}</strong><small>{selected.stage} · {money(selected.value)}</small></div><div className="health"><span>{selected.score}</span>/100</div></div>
              <div className="recommendation">
                <div className="recommendation-icon"><Sparkles size={17} /></div>
                <p className="eyebrow">RECOMMENDED NOW</p>
                <h4>Bring the economic buyer into a 20-minute value review.</h4>
                <p>The champion is active, but finance has not joined the deal. Similar deals close 23% faster after an executive value review.</p>
                <button className="action-button" onClick={actOnDeal}>Prepare outreach <ArrowUpRight size={15} /></button>
              </div>
              <div className="signals">
                <div className="signal-title"><strong>Why this action</strong><span>Explainable score</span></div>
                <Signal label={selected.signal} impact="+12" tone="positive" />
                <Signal label={`${selected.age} days in ${selected.stage}`} impact="−7" tone="negative" />
                <Signal label="2 stakeholders engaged this week" impact="+8" tone="positive" />
              </div>
              <div className="guardrail"><div><Bot size={17} /><span><strong>Human-in-the-loop</strong><small>Nexus drafts. You approve.</small></span></div><span className="toggle on"><i /></span></div>
            </aside>
          </div>

          <section className="bottom-grid">
            <div className="panel forecast-card"><div className="panel-head"><div><p className="eyebrow">FORECAST CONFIDENCE</p><h3>On track for $428K</h3></div><span className="confidence">84% confidence</span></div><div className="forecast-chart"><div className="goal-line"><span>$500K goal</span></div><div className="area one" /><div className="area two" /><div className="chart-labels"><span>W1</span><span>W2</span><span>W3</span><span>W4</span><span>W5</span><span>W6</span></div></div></div>
            <div className="panel activity-card"><div className="panel-head"><div><p className="eyebrow">LIVE SIGNALS</p><h3>Momentum feed</h3></div><span className="live-pill">LIVE</span></div><SignalRow icon="OL" title="Orbita viewed pricing" detail="3 visits · 12 min ago" color="cyan" /><SignalRow icon="NH" title="Proposal shared internally" detail="Nova Health · 41 min ago" color="violet" /><SignalRow icon="KR" title="New stakeholder detected" detail="Kubo Retail · 2h ago" color="amber" /></div>
          </section>
        </div>
      </section>
    </main>
  );
}

function Metric({ label, value, delta, icon, spark, risk = false }: { label: string; value: string; delta: string; icon: React.ReactNode; spark: number[]; risk?: boolean }) {
  return <article className="metric-card"><div className="metric-heading"><span>{icon}</span><p>{label}</p><em className={risk ? "risk" : ""}>{delta}</em></div><strong>{value}</strong><div className="spark">{spark.map((height, index) => <i key={index} style={{ height: `${height}%` }} />)}</div></article>;
}

function Signal({ label, impact, tone }: { label: string; impact: string; tone: string }) {
  return <div className="signal"><span className={`signal-bullet ${tone}`} /><p>{label}</p><strong className={tone}>{impact}</strong></div>;
}

function SignalRow({ icon, title, detail, color }: { icon: string; title: string; detail: string; color: string }) {
  return <div className="signal-row"><span className={`company-avatar ${color}`}>{icon}</span><div><strong>{title}</strong><small>{detail}</small></div><ArrowUpRight size={15} /></div>;
}
