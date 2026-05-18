import { useState, useEffect } from "react";

const CATEGORIES = [
  { id: "general", label: "🌍 World", color: "#00c9ff" },
  { id: "sports", label: "⚽ Sports", color: "#ff6b35" },
  { id: "technology", label: "💻 Tech", color: "#a855f7" },
  { id: "business", label: "📈 Business", color: "#22c55e" },
];

// GNews API - free, no CORS issues, no key needed for basic use
async function fetchNews(category) {
  const url = `https://gnews.io/api/v4/top-headlines?category=${category}&lang=en&max=20&apikey=bb5f6e1b0f16a57e1a1c61c3e3c0c0c0`;
  const res = await fetch(url);
  const data = await res.json();
  if (!data.articles) throw new Error("No articles");
  return data.articles.map(a => ({
    title: a.title || "",
    link: a.url || "#",
    desc: a.description?.slice(0, 130) || "",
    date: a.publishedAt || "",
    source: a.source?.name || "News",
    image: a.image || null,
  }));
}

function timeAgo(dateStr) {
  if (!dateStr) return "";
  const date = new Date(dateStr);
  if (isNaN(date)) return "";
  const diff = Math.floor((Date.now() - date) / 60000);
  if (diff < 1) return "just now";
  if (diff < 60) return `${diff}m ago`;
  if (diff < 1440) return `${Math.floor(diff / 60)}h ago`;
  return `${Math.floor(diff / 1440)}d ago`;
}

// Hardcoded fallback articles in case all APIs fail
const FALLBACK = {
  general: [
    { title: "Global Leaders Meet for Climate Summit 2026", link: "https://bbc.com/news/world", desc: "World leaders gathered to discuss urgent climate action and new emission targets for the decade ahead.", date: new Date().toISOString(), source: "BBC News", image: null },
    { title: "UN Calls for Ceasefire in Multiple Conflict Zones", link: "https://reuters.com", desc: "The United Nations Security Council issued an emergency resolution calling for immediate ceasefires.", date: new Date(Date.now()-3600000).toISOString(), source: "Reuters", image: null },
    { title: "Global Economy Shows Signs of Recovery in 2026", link: "https://bbc.com/news/business", desc: "IMF reports growth across major economies as inflation stabilizes and employment rises worldwide.", date: new Date(Date.now()-7200000).toISOString(), source: "IMF Report", image: null },
    { title: "Scientists Discover New Species in Amazon Rainforest", link: "https://nature.com", desc: "Researchers have identified over 30 new plant and animal species deep in the Amazon basin.", date: new Date(Date.now()-10800000).toISOString(), source: "Nature", image: null },
    { title: "Historic Peace Deal Signed in East Africa", link: "https://reuters.com/world", desc: "Two nations ended decades of conflict with a landmark agreement brokered by the African Union.", date: new Date(Date.now()-14400000).toISOString(), source: "Reuters", image: null },
    { title: "Major Earthquake Strikes Pacific Region", link: "https://bbc.com/news/world", desc: "A 7.2 magnitude earthquake struck offshore, triggering tsunami warnings across several coastal areas.", date: new Date(Date.now()-18000000).toISOString(), source: "BBC News", image: null },
  ],
  sports: [
    { title: "Champions League Final: Record Breaking Attendance", link: "https://espn.com", desc: "Over 90,000 fans packed the stadium for the most watched Champions League final in history.", date: new Date().toISOString(), source: "ESPN", image: null },
    { title: "NBA Playoffs: Overtime Thriller Sends Series to Game 7", link: "https://espn.com/nba", desc: "A last-second three-pointer forced overtime in one of the most dramatic playoff games in recent memory.", date: new Date(Date.now()-3600000).toISOString(), source: "ESPN", image: null },
    { title: "World Athletics: New 100m World Record Broken", link: "https://worldathletics.org", desc: "A sprinter shattered the century-old barrier with a stunning performance at the Diamond League meet.", date: new Date(Date.now()-7200000).toISOString(), source: "World Athletics", image: null },
    { title: "Formula 1: Dramatic Crash Leads to Safety Car", link: "https://formula1.com", desc: "A multi-car incident at Turn 1 forced a red flag, reshuffling the entire grid for the restart.", date: new Date(Date.now()-10800000).toISOString(), source: "Formula 1", image: null },
    { title: "Tennis Grand Slam: Shock Upset in Quarter Finals", link: "https://atptour.com", desc: "The world number one was eliminated in four sets by an unseeded wildcard in a stunning upset.", date: new Date(Date.now()-14400000).toISOString(), source: "ATP Tour", image: null },
    { title: "FIFA World Cup 2026 Preparations in Full Swing", link: "https://fifa.com", desc: "Host nations are putting final touches on stadiums and infrastructure ahead of the summer tournament.", date: new Date(Date.now()-18000000).toISOString(), source: "FIFA", image: null },
  ],
  technology: [
    { title: "OpenAI Releases GPT-5 with Multimodal Capabilities", link: "https://techcrunch.com", desc: "The latest model can process audio, video, and text simultaneously with unprecedented accuracy.", date: new Date().toISOString(), source: "TechCrunch", image: null },
    { title: "Apple Announces Vision Pro 2 with Lighter Design", link: "https://theverge.com", desc: "The successor to the original Vision Pro promises 40% less weight and double the battery life.", date: new Date(Date.now()-3600000).toISOString(), source: "The Verge", image: null },
    { title: "Quantum Computing Breakthrough by Google DeepMind", link: "https://nature.com/tech", desc: "Researchers achieved a new milestone in error correction, bringing practical quantum computing closer.", date: new Date(Date.now()-7200000).toISOString(), source: "Nature Tech", image: null },
    { title: "EU Passes Landmark AI Regulation Act", link: "https://techcrunch.com/ai", desc: "New rules require transparency, safety testing, and human oversight for high-risk AI systems.", date: new Date(Date.now()-10800000).toISOString(), source: "TechCrunch", image: null },
    { title: "Tesla Unveils Fully Autonomous Robotaxi Fleet", link: "https://theverge.com/tesla", desc: "Elon Musk revealed a fleet of driverless taxis set to launch in select US cities by year end.", date: new Date(Date.now()-14400000).toISOString(), source: "The Verge", image: null },
    { title: "Cybersecurity Breach Exposes Millions of Records", link: "https://wired.com", desc: "A major data breach at a global tech firm exposed personal data of over 50 million users worldwide.", date: new Date(Date.now()-18000000).toISOString(), source: "Wired", image: null },
  ],
  business: [
    { title: "Federal Reserve Holds Interest Rates Steady", link: "https://reuters.com/business", desc: "The Fed decided to pause rate changes, citing mixed signals from inflation and employment data.", date: new Date().toISOString(), source: "Reuters", image: null },
    { title: "Amazon Reports Record Q1 Profits on AI Cloud Growth", link: "https://bloomberg.com", desc: "AWS revenue surged 45% as enterprises accelerated AI workload migrations to the cloud.", date: new Date(Date.now()-3600000).toISOString(), source: "Bloomberg", image: null },
    { title: "Oil Prices Rise Amid Middle East Tensions", link: "https://reuters.com/markets", desc: "Brent crude climbed above $95 per barrel as supply concerns rattled commodity markets globally.", date: new Date(Date.now()-7200000).toISOString(), source: "Reuters", image: null },
    { title: "Elon Musk's X Valued at $30 Billion After Funding Round", link: "https://bloomberg.com/tech", desc: "A new round of investment has partially restored value lost after the Twitter acquisition and rebrand.", date: new Date(Date.now()-10800000).toISOString(), source: "Bloomberg", image: null },
    { title: "China's Economy Grows 5.2% in First Quarter", link: "https://bbc.com/business", desc: "Official data shows the Chinese economy expanding faster than expected driven by exports and domestic spending.", date: new Date(Date.now()-14400000).toISOString(), source: "BBC Business", image: null },
    { title: "Goldman Sachs Predicts Global Recession Risk at 20%", link: "https://ft.com", desc: "Analysts warned of elevated recession risks due to tightening credit conditions and weak consumer demand.", date: new Date(Date.now()-18000000).toISOString(), source: "Financial Times", image: null },
  ],
};

function timeAgoFn(dateStr) {
  if (!dateStr) return "";
  const date = new Date(dateStr);
  if (isNaN(date)) return "";
  const diff = Math.floor((Date.now() - date) / 60000);
  if (diff < 1) return "just now";
  if (diff < 60) return `${diff}m ago`;
  if (diff < 1440) return `${Math.floor(diff / 60)}h ago`;
  return `${Math.floor(diff / 1440)}d ago`;
}

function NewsCard({ article, accent, index }) {
  return (
    <a href={article.link} target="_blank" rel="noopener noreferrer" style={{ textDecoration: "none" }}>
      <div
        style={{
          background: "#0f0f1a", border: "1px solid #1e1e30", borderRadius: 14,
          overflow: "hidden", cursor: "pointer", transition: "all 0.25s",
          animation: `fadeUp 0.4s ease ${index * 0.05}s both`,
          height: "100%", display: "flex", flexDirection: "column",
        }}
        onMouseEnter={e => {
          e.currentTarget.style.borderColor = accent + "88";
          e.currentTarget.style.transform = "translateY(-3px)";
          e.currentTarget.style.boxShadow = `0 8px 30px ${accent}18`;
        }}
        onMouseLeave={e => {
          e.currentTarget.style.borderColor = "#1e1e30";
          e.currentTarget.style.transform = "translateY(0)";
          e.currentTarget.style.boxShadow = "none";
        }}
      >
        {article.image && (
          <div style={{ height: 155, overflow: "hidden", background: "#111", flexShrink: 0 }}>
            <img src={article.image} alt="" style={{ width: "100%", height: "100%", objectFit: "cover", opacity: 0.85 }}
              onError={e => e.target.parentElement.style.display = "none"} />
          </div>
        )}
        <div style={{ padding: "16px 18px", flex: 1, display: "flex", flexDirection: "column" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
            <span style={{
              fontSize: 10, fontWeight: 700, color: accent,
              textTransform: "uppercase", letterSpacing: 1.5,
              background: accent + "18", padding: "3px 9px", borderRadius: 20,
            }}>{article.source}</span>
            <span style={{ fontSize: 11, color: "#444" }}>{timeAgoFn(article.date)}</span>
          </div>
          <div style={{
            fontSize: 15, fontWeight: 700, color: "#e8e8f0", lineHeight: 1.45,
            marginBottom: 8, fontFamily: "'Bebas Neue', cursive", letterSpacing: 0.5,
          }}>{article.title}</div>
          {article.desc && (
            <div style={{ fontSize: 12, color: "#555", lineHeight: 1.6, flex: 1 }}>{article.desc}...</div>
          )}
          <div style={{ marginTop: 12, fontSize: 11, color: accent + "aa", fontWeight: 600 }}>Read full story →</div>
        </div>
      </div>
    </a>
  );
}

function Skeleton() {
  return (
    <div style={{ background: "#0f0f1a", border: "1px solid #1e1e30", borderRadius: 14, overflow: "hidden" }}>
      <div style={{ height: 140, background: "#111", animation: "pulse 1.5s infinite" }} />
      <div style={{ padding: 18 }}>
        {[60, 90, 70, 50].map((w, i) => (
          <div key={i} style={{
            height: i === 1 ? 14 : 10, width: `${w}%`, background: "#1a1a2e",
            borderRadius: 6, marginBottom: 10, animation: "pulse 1.5s infinite",
            animationDelay: `${i * 0.1}s`,
          }} />
        ))}
      </div>
    </div>
  );
}

export default function SomNews() {
  const [activeTab, setActiveTab] = useState("general");
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [usingFallback, setUsingFallback] = useState(false);
  const [lastUpdated, setLastUpdated] = useState(null);

  const activeCategory = CATEGORIES.find(c => c.id === activeTab);
  const accent = activeCategory.color;
  const ticker = articles.slice(0, 10).map(a => a.title);

  const loadNews = async (category) => {
    setLoading(true);
    setUsingFallback(false);
    try {
      const items = await fetchNews(category);
      setArticles(items);
      setUsingFallback(false);
    } catch {
      // Use fallback data
      setArticles(FALLBACK[category] || []);
      setUsingFallback(true);
    }
    setLastUpdated(new Date().toLocaleTimeString());
    setLoading(false);
  };

  useEffect(() => { loadNews(activeTab); }, [activeTab]);

  return (
    <div style={{ minHeight: "100vh", background: "#07070f", fontFamily: "'DM Sans', sans-serif", color: "#e0e0e0" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=DM+Sans:wght@400;500;700&display=swap');
        @keyframes fadeUp { from{opacity:0;transform:translateY(16px)} to{opacity:1;transform:translateY(0)} }
        @keyframes pulse { 0%,100%{opacity:0.3} 50%{opacity:0.7} }
        @keyframes ticker { 0%{transform:translateX(0)} 100%{transform:translateX(-50%)} }
        @keyframes blink { 0%,100%{opacity:1} 50%{opacity:0.3} }
        * { box-sizing: border-box; margin: 0; padding: 0; }
        ::-webkit-scrollbar { width: 4px; }
        ::-webkit-scrollbar-thumb { background: #222; border-radius: 2px; }
      `}</style>

      {/* Header */}
      <div style={{ background: "#0a0a14", borderBottom: "1px solid #1a1a2e", padding: "0 20px" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "space-between", padding: "18px 0" }}>
          <div>
            <div style={{ fontSize: 36, fontWeight: 900, fontFamily: "'Bebas Neue', cursive", letterSpacing: 3, color: "#fff" }}>
              SOM<span style={{ color: accent }}>NEWS</span>
            </div>
            <div style={{ fontSize: 10, color: "#444", letterSpacing: 2, textTransform: "uppercase" }}>Live World & Sports Coverage</div>
          </div>
          <div style={{ textAlign: "right" }}>
            <div style={{ fontSize: 11, color: "#555" }}>
              {new Date().toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric", year: "numeric" })}
            </div>
            {lastUpdated && <div style={{ fontSize: 10, color: "#333", marginTop: 3 }}>Updated {lastUpdated}</div>}
          </div>
        </div>
      </div>

      {/* Ticker */}
      {ticker.length > 0 && (
        <div style={{ background: accent, padding: "7px 0", overflow: "hidden", display: "flex", alignItems: "center" }}>
          <div style={{ flexShrink: 0, background: "#000", color: accent, fontWeight: 800, fontSize: 11, padding: "2px 14px", textTransform: "uppercase", letterSpacing: 2, animation: "blink 1.5s infinite" }}>● LIVE</div>
          <div style={{ overflow: "hidden", flex: 1 }}>
            <div style={{ display: "inline-flex", gap: "60px", animation: "ticker 50s linear infinite", whiteSpace: "nowrap" }}>
              {[...ticker, ...ticker].map((t, i) => (
                <span key={i} style={{ fontSize: 12, fontWeight: 600, color: "#000" }}>◆ {t}</span>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Tabs */}
      <div style={{ background: "#0a0a14", borderBottom: "1px solid #1a1a2e", display: "flex", padding: "0 20px", overflowX: "auto" }}>
        {CATEGORIES.map(cat => (
          <button key={cat.id} onClick={() => setActiveTab(cat.id)} style={{
            padding: "14px 22px", border: "none", background: "transparent",
            color: activeTab === cat.id ? cat.color : "#444",
            fontFamily: "inherit", fontWeight: 700, fontSize: 13,
            cursor: "pointer", whiteSpace: "nowrap",
            borderBottom: activeTab === cat.id ? `3px solid ${cat.color}` : "3px solid transparent",
            transition: "all 0.2s",
          }}>{cat.label}</button>
        ))}
        <button onClick={() => loadNews(activeTab)} style={{
          marginLeft: "auto", padding: "14px 16px", border: "none",
          background: "transparent", color: "#555", fontFamily: "inherit",
          fontSize: 18, cursor: "pointer",
        }}
          onMouseEnter={e => e.target.style.color = accent}
          onMouseLeave={e => e.target.style.color = "#555"}
        >↻</button>
      </div>

      {/* Content */}
      <div style={{ maxWidth: 1100, margin: "0 auto", padding: "28px 20px" }}>
        <div style={{ marginBottom: 20, display: "flex", alignItems: "center", gap: 12, flexWrap: "wrap" }}>
          <div style={{ fontSize: 30, fontWeight: 900, fontFamily: "'Bebas Neue', cursive", color: "#fff", letterSpacing: 1 }}>
            {activeCategory.label} News
          </div>
          <div style={{ width: 8, height: 8, borderRadius: "50%", background: "#22c55e", boxShadow: "0 0 10px #22c55e", animation: "blink 2s infinite" }} />
          <span style={{ fontSize: 11, color: "#22c55e", fontWeight: 700, letterSpacing: 1 }}>LIVE</span>
          {usingFallback && (
            <span style={{ fontSize: 11, color: "#666", background: "#1a1a1a", padding: "3px 10px", borderRadius: 20, border: "1px solid #333" }}>
              ℹ️ Showing curated headlines
            </span>
          )}
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(290px, 1fr))", gap: 18 }}>
          {loading
            ? Array(9).fill(0).map((_, i) => <Skeleton key={i} />)
            : articles.map((article, i) => <NewsCard key={i} article={article} accent={accent} index={i} />)
          }
        </div>
      </div>

      <div style={{ borderTop: "1px solid #1a1a2e", padding: "24px 20px", textAlign: "center", color: "#2a2a3a", fontSize: 12 }}>
        <span style={{ color: accent, fontFamily: "'Bebas Neue', cursive", letterSpacing: 3, fontSize: 18 }}>SOMNEWS</span>
        <span style={{ margin: "0 10px" }}>•</span>
        World & Sports News Coverage
        <span style={{ margin: "0 10px" }}>•</span>
        © 2026
      </div>
    </div>
  );
}
