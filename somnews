<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8"/>
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>SomNews</title>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap" rel="stylesheet"/>
  <style>
    *,*::before,*::after{box-sizing:border-box;margin:0;padding:0;}
    body{background:#111318;color:#fff;font-family:'Inter',sans-serif;min-height:100vh;max-width:430px;margin:0 auto;}
    a{text-decoration:none;color:inherit;}
    ::-webkit-scrollbar{display:none;}

    @keyframes fadeUp{from{opacity:0;transform:translateY(12px)}to{opacity:1;transform:translateY(0)}}
    @keyframes pulse{0%,100%{opacity:0.4}50%{opacity:1}}
    @keyframes shimmer{0%{background-position:-400px 0}100%{background-position:400px 0}}

    /* TOP BAR */
    #topbar{padding:52px 20px 0;display:flex;justify-content:space-between;align-items:flex-start;}
    #greeting{font-size:26px;font-weight:800;line-height:1.2;}
    #greeting span{color:#aaa;font-size:13px;font-weight:400;display:block;margin-top:4px;}
    #topbar-icons{display:flex;gap:12px;margin-top:6px;}
    .icon-btn{width:38px;height:38px;border-radius:50%;background:#1e2028;border:none;cursor:pointer;display:flex;align-items:center;justify-content:center;font-size:16px;}

    /* SEARCH */
    #search-wrap{padding:16px 20px 0;}
    #search-box{width:100%;background:#1e2028;border:none;border-radius:14px;padding:12px 16px 12px 42px;color:#fff;font-family:inherit;font-size:14px;position:relative;}
    #search-box::placeholder{color:#555;}
    #search-container{position:relative;}
    #search-icon{position:absolute;left:14px;top:50%;transform:translateY(-50%);font-size:15px;color:#555;pointer-events:none;}

    /* TOPICS */
    #topics-section{padding:24px 20px 0;}
    .section-header{display:flex;justify-content:space-between;align-items:center;margin-bottom:14px;}
    .section-title{font-size:16px;font-weight:700;}
    .see-more{font-size:12px;color:#888;cursor:pointer;}
    #topics-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:10px;}
    .topic-card{background:#1e2028;border-radius:16px;padding:14px 8px;display:flex;flex-direction:column;align-items:center;gap:8px;cursor:pointer;transition:all 0.2s;border:2px solid transparent;}
    .topic-card.active{border-color:#fff;}
    .topic-card:hover{background:#252830;}
    .topic-icon{width:46px;height:46px;border-radius:12px;display:flex;align-items:center;justify-content:center;font-size:22px;}
    .topic-label{font-size:11px;font-weight:600;color:#ccc;text-align:center;}

    /* HOTTEST NEWS */
    #hot-section{padding:24px 20px 0;}
    #hot-scroll{display:flex;gap:14px;overflow-x:auto;padding-bottom:4px;}
    .hot-card{flex-shrink:0;width:200px;border-radius:16px;overflow:hidden;position:relative;cursor:pointer;transition:transform 0.2s;}
    .hot-card:hover{transform:scale(1.02);}
    .hot-img{width:100%;height:130px;object-fit:cover;display:block;background:#1e2028;}
    .hot-overlay{position:absolute;inset:0;background:linear-gradient(to top,rgba(0,0,0,0.85) 0%,rgba(0,0,0,0.1) 60%);}
    .hot-tag{position:absolute;top:10px;left:10px;font-size:9px;font-weight:700;padding:3px 8px;border-radius:20px;text-transform:uppercase;letter-spacing:1px;}
    .hot-title{position:absolute;bottom:10px;left:10px;right:10px;font-size:12px;font-weight:700;line-height:1.4;}
    .hot-meta{position:absolute;bottom:-22px;left:10px;right:10px;font-size:10px;color:#888;display:flex;justify-content:space-between;}

    /* NEWS LIST */
    #news-section{padding:24px 20px 100px;}
    .news-item{display:flex;gap:14px;margin-bottom:18px;cursor:pointer;animation:fadeUp 0.4s ease both;}
    .news-item:hover .news-thumb{opacity:0.8;}
    .news-thumb{flex-shrink:0;width:90px;height:90px;border-radius:14px;object-fit:cover;background:#1e2028;}
    .news-thumb-placeholder{flex-shrink:0;width:90px;height:90px;border-radius:14px;background:#1e2028;display:flex;align-items:center;justify-content:center;font-size:28px;}
    .news-info{flex:1;display:flex;flex-direction:column;justify-content:space-between;}
    .news-tag{font-size:10px;font-weight:700;text-transform:uppercase;letter-spacing:1px;margin-bottom:4px;}
    .news-title{font-size:14px;font-weight:700;line-height:1.4;color:#f0f0f0;display:-webkit-box;-webkit-line-clamp:3;-webkit-box-orient:vertical;overflow:hidden;}
    .news-meta{display:flex;align-items:center;gap:8px;margin-top:8px;}
    .news-source{font-size:11px;color:#888;}
    .news-dot{width:3px;height:3px;border-radius:50%;background:#555;}
    .news-time{font-size:11px;color:#888;}

    /* BOTTOM NAV */
    #bottomnav{position:fixed;bottom:0;left:50%;transform:translateX(-50%);width:100%;max-width:430px;background:#1a1d24;border-top:1px solid #252830;display:flex;justify-content:space-around;padding:12px 0 24px;}
    .nav-item{display:flex;flex-direction:column;align-items:center;gap:4px;cursor:pointer;opacity:0.4;transition:opacity 0.2s;}
    .nav-item.active{opacity:1;}
    .nav-icon{font-size:20px;}
    .nav-label{font-size:10px;font-weight:600;}

    /* SKELETON */
    .skel{background:linear-gradient(90deg,#1e2028 25%,#252830 50%,#1e2028 75%);background-size:400px 100%;animation:shimmer 1.5s infinite;border-radius:10px;}

    /* DETAIL VIEW */
    #detail-view{display:none;position:fixed;inset:0;background:#111318;z-index:100;overflow-y:auto;max-width:430px;left:50%;transform:translateX(-50%);}
    #detail-view.open{display:block;}
    #detail-img{width:100%;height:240px;object-fit:cover;}
    #detail-back{position:absolute;top:52px;left:20px;width:36px;height:36px;background:rgba(0,0,0,0.6);border-radius:50%;display:flex;align-items:center;justify-content:center;cursor:pointer;font-size:18px;border:none;color:#fff;}
    #detail-body{padding:20px;}
    #detail-tag{font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:1.5px;margin-bottom:10px;}
    #detail-title{font-size:22px;font-weight:800;line-height:1.3;margin-bottom:12px;}
    #detail-meta{display:flex;align-items:center;gap:8px;margin-bottom:16px;}
    #detail-source{font-size:12px;color:#888;}
    #detail-desc{font-size:15px;color:#aaa;line-height:1.7;margin-bottom:20px;}
    #detail-link{display:inline-block;background:#fff;color:#111;font-weight:700;font-size:14px;padding:14px 28px;border-radius:14px;text-align:center;width:100%;}
  </style>
</head>
<body>

<!-- TOP BAR -->
<div id="topbar">
  <div id="greeting">
    Good Morning
    <span>Your daily dose of news.</span>
  </div>
  <div id="topbar-icons">
    <button class="icon-btn">🔔</button>
    <button class="icon-btn">🔖</button>
  </div>
</div>

<!-- SEARCH -->
<div id="search-wrap">
  <div id="search-container">
    <span id="search-icon">🔍</span>
    <input id="search-box" type="text" placeholder='Search "Sports"'/>
  </div>
</div>

<!-- TOPICS -->
<div id="topics-section">
  <div class="section-header">
    <div class="section-title">Topics</div>
    <div class="see-more">See more</div>
  </div>
  <div id="topics-grid">
    <div class="topic-card active" data-cat="general">
      <div class="topic-icon" style="background:#1a3a5c;">🌍</div>
      <div class="topic-label">World</div>
    </div>
    <div class="topic-card" data-cat="sports">
      <div class="topic-icon" style="background:#3a1a1a;">⚽</div>
      <div class="topic-label">Sports</div>
    </div>
    <div class="topic-card" data-cat="business">
      <div class="topic-icon" style="background:#1a3a1a;">📈</div>
      <div class="topic-label">Business</div>
    </div>
    <div class="topic-card" data-cat="politics">
      <div class="topic-icon" style="background:#3a2a1a;">🏛️</div>
      <div class="topic-label">Politics</div>
    </div>
    <div class="topic-card" data-cat="technology">
      <div class="topic-icon" style="background:#2a1a3a;">💻</div>
      <div class="topic-label">Tech</div>
    </div>
    <div class="topic-card" data-cat="health">
      <div class="topic-icon" style="background:#1a3a2a;">🏥</div>
      <div class="topic-label">Health</div>
    </div>
    <div class="topic-card" data-cat="science">
      <div class="topic-icon" style="background:#1a2a3a;">🔬</div>
      <div class="topic-label">Science</div>
    </div>
    <div class="topic-card" data-cat="entertainment">
      <div class="topic-icon" style="background:#3a1a3a;">🎬</div>
      <div class="topic-label">Culture</div>
    </div>
  </div>
</div>

<!-- HOTTEST NEWS -->
<div id="hot-section">
  <div class="section-header">
    <div class="section-title">Hottest News</div>
    <div class="see-more">See more</div>
  </div>
  <div id="hot-scroll"></div>
</div>

<!-- NEWS LIST -->
<div id="news-section">
  <div class="section-header">
    <div class="section-title" id="news-list-title">Latest News</div>
  </div>
  <div id="news-list"></div>
</div>

<!-- BOTTOM NAV -->
<div id="bottomnav">
  <div class="nav-item active"><div class="nav-icon">🏠</div><div class="nav-label">Home</div></div>
  <div class="nav-item"><div class="nav-icon">🔍</div><div class="nav-label">Search</div></div>
  <div class="nav-item"><div class="nav-icon">🔖</div><div class="nav-label">Saved</div></div>
  <div class="nav-item"><div class="nav-icon">❤️</div><div class="nav-label">Liked</div></div>
  <div class="nav-item"><div class="nav-icon">👤</div><div class="nav-label">Profile</div></div>
</div>

<!-- DETAIL VIEW -->
<div id="detail-view">
  <img id="detail-img" src="" alt=""/>
  <button id="detail-back">←</button>
  <div id="detail-body">
    <div id="detail-tag"></div>
    <div id="detail-title"></div>
    <div id="detail-meta">
      <span id="detail-source"></span>
      <div class="news-dot"></div>
      <span id="detail-time"></span>
    </div>
    <div id="detail-desc"></div>
    <a id="detail-link" href="#" target="_blank">Read Full Article →</a>
  </div>
</div>

<script>
const COLORS = {
  general:"#4a9eff", sports:"#ff5e5e", business:"#4aff9e",
  politics:"#ffb84a", technology:"#b84aff", health:"#4affd4",
  science:"#4a8fff", entertainment:"#ff4acd"
};

const FALLBACK = {
  general:[
    {title:"Global Leaders Meet for Climate Summit 2026",link:"https://bbc.com/news/world",desc:"World leaders gathered to discuss urgent climate action and new emission targets for the decade ahead.",date:new Date().toISOString(),source:"BBC News",image:null},
    {title:"UN Calls for Ceasefire in Multiple Conflict Zones",link:"https://reuters.com",desc:"The United Nations Security Council issued an emergency resolution calling for immediate ceasefires.",date:new Date(Date.now()-3600000).toISOString(),source:"Reuters",image:null},
    {title:"Global Economy Shows Signs of Recovery in 2026",link:"https://bbc.com/news/business",desc:"IMF reports growth across major economies as inflation stabilizes and employment rises worldwide.",date:new Date(Date.now()-7200000).toISOString(),source:"IMF Report",image:null},
    {title:"Scientists Discover New Species in Amazon Rainforest",link:"https://nature.com",desc:"Researchers identified over 30 new plant and animal species deep in the Amazon basin.",date:new Date(Date.now()-10800000).toISOString(),source:"Nature",image:null},
    {title:"Historic Peace Deal Signed in East Africa",link:"https://reuters.com/world",desc:"Two nations ended decades of conflict with a landmark agreement brokered by the African Union.",date:new Date(Date.now()-14400000).toISOString(),source:"Reuters",image:null},
    {title:"Major Earthquake Strikes Pacific Region",link:"https://bbc.com/news/world",desc:"A 7.2 magnitude earthquake struck offshore, triggering tsunami warnings across several coastal areas.",date:new Date(Date.now()-18000000).toISOString(),source:"BBC News",image:null},
  ],
  sports:[
    {title:"Champions League Final: Record Breaking Attendance",link:"https://espn.com",desc:"Over 90,000 fans packed the stadium for the most watched Champions League final in history.",date:new Date().toISOString(),source:"ESPN",image:null},
    {title:"NBA Playoffs: Overtime Thriller Sends Series to Game 7",link:"https://espn.com/nba",desc:"A last-second three-pointer forced overtime in one of the most dramatic playoff games in recent memory.",date:new Date(Date.now()-3600000).toISOString(),source:"ESPN",image:null},
    {title:"World Athletics: New 100m World Record Broken",link:"https://worldathletics.org",desc:"A sprinter shattered the 100m record with a stunning performance at the Diamond League meet.",date:new Date(Date.now()-7200000).toISOString(),source:"World Athletics",image:null},
    {title:"Formula 1: Dramatic Crash Leads to Safety Car",link:"https://formula1.com",desc:"A multi-car incident at Turn 1 forced a red flag, reshuffling the entire grid for the restart.",date:new Date(Date.now()-10800000).toISOString(),source:"Formula 1",image:null},
    {title:"Tennis Grand Slam: Shock Upset in Quarter Finals",link:"https://atptour.com",desc:"The world number one was eliminated in four sets by an unseeded wildcard in a stunning upset.",date:new Date(Date.now()-14400000).toISOString(),source:"ATP Tour",image:null},
    {title:"FIFA World Cup 2026 Preparations in Full Swing",link:"https://fifa.com",desc:"Host nations are putting final touches on stadiums and infrastructure ahead of the summer tournament.",date:new Date(Date.now()-18000000).toISOString(),source:"FIFA",image:null},
  ],
  technology:[
    {title:"OpenAI Releases GPT-5 with Multimodal Capabilities",link:"https://techcrunch.com",desc:"The latest model can process audio, video, and text simultaneously with unprecedented accuracy.",date:new Date().toISOString(),source:"TechCrunch",image:null},
    {title:"Apple Announces Vision Pro 2 with Lighter Design",link:"https://theverge.com",desc:"The successor to the original Vision Pro promises 40% less weight and double the battery life.",date:new Date(Date.now()-3600000).toISOString(),source:"The Verge",image:null},
    {title:"Quantum Computing Breakthrough by Google DeepMind",link:"https://nature.com",desc:"Researchers achieved a new milestone in error correction, bringing practical quantum computing closer.",date:new Date(Date.now()-7200000).toISOString(),source:"Nature Tech",image:null},
    {title:"EU Passes Landmark AI Regulation Act",link:"https://techcrunch.com",desc:"New rules require transparency, safety testing, and human oversight for high-risk AI systems.",date:new Date(Date.now()-10800000).toISOString(),source:"TechCrunch",image:null},
    {title:"Tesla Unveils Fully Autonomous Robotaxi Fleet",link:"https://theverge.com",desc:"Elon Musk revealed a fleet of driverless taxis set to launch in select US cities by year end.",date:new Date(Date.now()-14400000).toISOString(),source:"The Verge",image:null},
    {title:"Cybersecurity Breach Exposes Millions of Records",link:"https://wired.com",desc:"A major data breach at a global tech firm exposed personal data of over 50 million users worldwide.",date:new Date(Date.now()-18000000).toISOString(),source:"Wired",image:null},
  ],
  business:[
    {title:"Federal Reserve Holds Interest Rates Steady",link:"https://reuters.com/business",desc:"The Fed decided to pause rate changes, citing mixed signals from inflation and employment data.",date:new Date().toISOString(),source:"Reuters",image:null},
    {title:"Amazon Reports Record Q1 Profits on AI Cloud Growth",link:"https://bloomberg.com",desc:"AWS revenue surged 45% as enterprises accelerated AI workload migrations to the cloud.",date:new Date(Date.now()-3600000).toISOString(),source:"Bloomberg",image:null},
    {title:"Oil Prices Rise Amid Middle East Tensions",link:"https://reuters.com",desc:"Brent crude climbed above $95 per barrel as supply concerns rattled commodity markets globally.",date:new Date(Date.now()-7200000).toISOString(),source:"Reuters",image:null},
    {title:"Goldman Sachs Predicts Global Recession Risk at 20%",link:"https://ft.com",desc:"Analysts warned of elevated recession risks due to tightening credit conditions and weak consumer demand.",date:new Date(Date.now()-18000000).toISOString(),source:"Financial Times",image:null},
  ],
};

function timeAgo(d){
  if(!d)return"";const t=new Date(d);if(isNaN(t))return"";
  const diff=Math.floor((Date.now()-t)/60000);
  if(diff<1)return"just now";if(diff<60)return diff+"m ago";
  if(diff<1440)return Math.floor(diff/60)+"h ago";return Math.floor(diff/1440)+"d ago";
}

function getGreeting(){
  const h=new Date().getHours();
  if(h<12)return"Good Morning";if(h<17)return"Good Afternoon";return"Good Evening";
}
document.getElementById('greeting').innerHTML=getGreeting()+'<span>Your daily dose of news.</span>';

let currentCat="general";
let allArticles=[];

function openDetail(a,cat){
  const color=COLORS[cat]||"#4a9eff";
  const dv=document.getElementById('detail-view');
  const img=document.getElementById('detail-img');
  if(a.image){img.src=a.image;img.style.display='block';}
  else{img.style.display='none';}
  document.getElementById('detail-tag').textContent=cat.toUpperCase();
  document.getElementById('detail-tag').style.color=color;
  document.getElementById('detail-title').textContent=a.title;
  document.getElementById('detail-source').textContent=a.source;
  document.getElementById('detail-time').textContent=timeAgo(a.date);
  document.getElementById('detail-desc').textContent=a.desc||"Tap below to read the full article.";
  document.getElementById('detail-link').href=a.link;
  dv.classList.add('open');
  dv.scrollTop=0;
}
document.getElementById('detail-back').onclick=()=>document.getElementById('detail-view').classList.remove('open');

function renderHot(articles,cat){
  const color=COLORS[cat]||"#4a9eff";
  const hot=articles.slice(0,5);
  document.getElementById('hot-scroll').innerHTML=hot.map(a=>`
    <div class="hot-card" onclick="openDetail(${JSON.stringify(a).replace(/"/g,'&quot;')},'${cat}')">
      ${a.image?`<img class="hot-img" src="${a.image}" onerror="this.style.display='none'" alt=""/>`:`<div class="hot-img" style="display:flex;align-items:center;justify-content:center;font-size:36px;">${cat==='sports'?'⚽':cat==='technology'?'💻':cat==='business'?'📈':'🌍'}</div>`}
      <div class="hot-overlay"></div>
      <div class="hot-tag" style="background:${color};color:#000;">${cat}</div>
      <div class="hot-title">${a.title}</div>
    </div>
  `).join('');
}

function renderList(articles,cat){
  const color=COLORS[cat]||"#4a9eff";
  const list=articles.slice(5);
  document.getElementById('news-list-title').textContent='Latest News';
  document.getElementById('news-list').innerHTML=list.map((a,i)=>`
    <div class="news-item" style="animation-delay:${i*0.06}s" onclick="openDetail(${JSON.stringify(a).replace(/"/g,'&quot;')},'${cat}')">
      ${a.image
        ?`<img class="news-thumb" src="${a.image}" onerror="this.outerHTML='<div class=news-thumb-placeholder>${cat==='sports'?'⚽':cat==='technology'?'💻':cat==='business'?'📈':'🌍'}</div>'" alt=""/>`
        :`<div class="news-thumb-placeholder">${cat==='sports'?'⚽':cat==='technology'?'💻':cat==='business'?'📈':'🌍'}</div>`
      }
      <div class="news-info">
        <div class="news-tag" style="color:${color};">${a.source}</div>
        <div class="news-title">${a.title}</div>
        <div class="news-meta">
          <span class="news-source">${a.source}</span>
          <div class="news-dot"></div>
          <span class="news-time">${timeAgo(a.date)}</span>
        </div>
      </div>
    </div>
  `).join('');
}

function renderSkeletons(){
  document.getElementById('hot-scroll').innerHTML=Array(4).fill(`
    <div style="flex-shrink:0;width:200px;border-radius:16px;overflow:hidden;">
      <div class="skel" style="height:130px;"></div>
    </div>`).join('');
  document.getElementById('news-list').innerHTML=Array(5).fill(`
    <div style="display:flex;gap:14px;margin-bottom:18px;">
      <div class="skel" style="width:90px;height:90px;border-radius:14px;flex-shrink:0;"></div>
      <div style="flex:1;">
        <div class="skel" style="height:10px;width:40%;margin-bottom:8px;"></div>
        <div class="skel" style="height:13px;width:90%;margin-bottom:6px;"></div>
        <div class="skel" style="height:13px;width:70%;margin-bottom:6px;"></div>
        <div class="skel" style="height:10px;width:50%;"></div>
      </div>
    </div>`).join('');
}

async function loadNews(cat){
  currentCat=cat;
  renderSkeletons();
  try{
    const url=`https://gnews.io/api/v4/top-headlines?category=${cat}&lang=en&max=20&apikey=bb5f6e1b0f16a57e1a1c61c3e3c0c0c0`;
    const res=await fetch(url);
    const data=await res.json();
    if(!data.articles||!data.articles.length)throw new Error('no articles');
    allArticles=data.articles.map(a=>({title:a.title||'',link:a.url||'#',desc:(a.description||'').slice(0,200),date:a.publishedAt||'',source:a.source?.name||'News',image:a.image||null}));
  }catch{
    allArticles=FALLBACK[cat]||FALLBACK.general;
  }
  renderHot(allArticles,cat);
  renderList(allArticles,cat);
}

// Topic switching
document.querySelectorAll('.topic-card').forEach(card=>{
  card.addEventListener('click',()=>{
    document.querySelectorAll('.topic-card').forEach(c=>c.classList.remove('active'));
    card.classList.add('active');
    loadNews(card.dataset.cat);
  });
});

// Search filter
document.getElementById('search-box').addEventListener('input',e=>{
  const q=e.target.value.toLowerCase();
  if(!q){renderHot(allArticles,currentCat);renderList(allArticles,currentCat);return;}
  const filtered=allArticles.filter(a=>a.title.toLowerCase().includes(q)||a.source.toLowerCase().includes(q));
  renderHot(filtered,currentCat);renderList(filtered,currentCat);
});

loadNews('general');
</script>
</body>
</html>
