import React, { useState } from "react";
import { motion } from "framer-motion";
import { Search, Mail, Play, Menu, ArrowRight, Mic, Users, Building2, MessageSquare, Calendar, Tag, Headphones, Share2 } from "lucide-react";

const PAGES = [
  "Home",
  "Episodes",
  "Episode Detail",
  "Contact Us",
  "Suggest a Guest",
  "Sponsor the Show",
  "About",
];

const colors = {
  navy: "#082E68",
  deep: "#021B43",
  orange: "#F05A1A",
  gold: "#FF9F18",
  blue: "#0A4DA2",
  ink: "#0B1833",
  paper: "#F8F4EC",
};

function Logo({ compact = false }) {
  return (
    <div className="flex items-center gap-2">
      <div className="relative h-9 w-12 rounded-full overflow-hidden bg-gradient-to-br from-orange-400 to-orange-600">
        <div className="absolute bottom-0 left-0 h-5 w-full bg-blue-800 rounded-t-[100%]" />
        <div className="absolute bottom-2 left-3 h-4 w-7 rotate-[-8deg] bg-white/90 clip-mountain" />
      </div>
      {!compact && (
        <div className="leading-none font-bold tracking-wide">
          <div className="text-[#0A4DA2]">Colorado</div>
          <div className="text-[#F05A1A]">Tech People</div>
        </div>
      )}
    </div>
  );
}

function DesktopFrame({ children, title }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white shadow-sm overflow-hidden">
      <div className="flex items-center justify-between border-b bg-slate-50 px-4 py-2 text-xs text-slate-500">
        <span className="font-semibold">Desktop / {title}</span>
        <span>1440px concept wireframe</span>
      </div>
      <div className="bg-[#fbfaf7] min-h-[620px] text-[#0B1833]">{children}</div>
    </div>
  );
}

function MobileFrame({ children, title }) {
  return (
    <div className="mx-auto w-[360px] rounded-[2rem] border-[10px] border-slate-900 bg-white shadow-xl overflow-hidden">
      <div className="bg-slate-900 text-center text-[10px] text-white/60 py-1">Mobile / {title}</div>
      <div className="bg-[#fbfaf7] min-h-[680px] text-[#0B1833]">{children}</div>
    </div>
  );
}

function DesktopHeader() {
  return (
    <header className="h-20 px-10 bg-white/90 border-b flex items-center justify-between">
      <Logo />
      <nav className="flex gap-10 text-sm font-medium">
        <span>Episodes⌄</span><span>About</span><span>Community</span><span>Subscribe</span>
      </nav>
      <button className="rounded-full bg-[#F05A1A] text-white px-6 py-3 text-sm font-semibold flex gap-2 items-center"><Mail size={15}/> Subscribe</button>
    </header>
  );
}

function MobileHeader() {
  return (
    <header className="h-16 px-4 bg-white border-b flex items-center justify-between">
      <Logo compact />
      <button className="p-2 rounded-full border"><Menu size={20}/></button>
    </header>
  );
}

function Footer({ mobile = false }) {
  if (mobile) {
    return <footer className="p-5 bg-white border-t space-y-4 text-xs"><Logo/><p className="text-slate-600">Elevating the stories and people building a better future through technology in Colorado.</p><div className="grid grid-cols-2 gap-3"><span>Episodes</span><span>About</span><span>Suggest a Guest</span><span>Sponsor</span><span>Contact</span><span>Privacy</span></div></footer>;
  }
  return <footer className="px-10 py-8 bg-white border-t grid grid-cols-4 gap-8 text-sm"><div><Logo/><p className="mt-3 text-slate-600">Elevating the stories and people building a better future through technology in Colorado.</p></div><div><b>Explore</b><p className="mt-3">Episodes<br/>About<br/>Newsletter</p></div><div><b>Connect</b><p className="mt-3">Suggest a Guest<br/>Sponsor the Show<br/>Contact</p></div><div><b>Listen On</b><p className="mt-3">Apple Podcasts<br/>Spotify<br/>YouTube<br/>RSS Feed</p></div></footer>;
}

function EpisodeCard({ i = 1 }) {
  const names = ["Leading Through Change with Empathy", "Product Market Fit is a Moving Target", "Building Financial Inclusion Tech", "Hardware Is Hard — But Worth It"];
  return (
    <article className="rounded-xl bg-white border shadow-sm overflow-hidden">
      <div className="h-32 bg-gradient-to-br from-slate-200 to-blue-100 relative">
        <span className="absolute top-3 left-3 rounded-md bg-[#082E68] text-white text-xs px-2 py-1">S4 E{i + 3}</span>
        <button className="absolute right-3 bottom-3 h-10 w-10 rounded-full bg-white shadow flex items-center justify-center"><Play size={16} fill="currentColor"/></button>
      </div>
      <div className="p-4">
        <p className="text-xs text-slate-500">Apr {9 + i * 7}, 2024</p>
        <h3 className="font-serif text-lg font-bold leading-tight mt-1">{names[i % names.length]}</h3>
        <p className="text-xs mt-2 text-slate-600">Guest Name · Founder, Colorado Startup</p>
        <p className="text-sm mt-3 text-slate-700">A concise episode excerpt with the core topic and why listeners should care.</p>
      </div>
    </article>
  );
}

function SubscribeBand({ mobile = false }) {
  return (
    <section className={`${mobile ? "p-5" : "mx-10 my-8 p-6"} rounded-xl bg-white border relative overflow-hidden`}>
      <div className={`${mobile ? "space-y-4" : "flex items-center justify-between gap-8"}`}>
        <div className="flex items-center gap-4">
          <div className="h-14 w-14 rounded-xl bg-blue-50 flex items-center justify-center text-[#0A4DA2]"><Mail/></div>
          <div><h3 className="font-serif text-2xl font-bold">Never Miss an Episode</h3><p className="text-sm text-slate-600">Get new episodes, show notes, and Colorado tech stories delivered to your inbox.</p></div>
        </div>
        <div className={`${mobile ? "space-y-3" : "flex gap-3 min-w-[420px]"}`}><input className="border rounded-lg px-4 py-3 w-full" placeholder="Enter your email address"/><button className="bg-[#F05A1A] text-white rounded-lg px-6 py-3 font-semibold w-full md:w-auto">Subscribe</button></div>
      </div>
    </section>
  );
}

function HomeDesktop() {
  return <><DesktopHeader/><main><section className="px-10 pt-14 pb-10 grid grid-cols-2 gap-8 bg-gradient-to-r from-[#fbfaf7] to-blue-50"><div><h1 className="font-serif text-6xl font-bold leading-[1.02]">Stories, insights, and voices shaping <span className="text-[#F05A1A]">Colorado tech.</span></h1><p className="mt-6 text-lg max-w-xl text-slate-700">Conversations with founders, operators, builders, and innovators across Colorado.</p><div className="mt-8 flex gap-4"><button className="rounded-full bg-[#F05A1A] text-white px-7 py-3 font-semibold">▶ Listen Now</button><button className="rounded-full border border-[#082E68] text-[#082E68] px-7 py-3 font-semibold">Browse Episodes</button></div></div><div className="rounded-2xl min-h-80 bg-[linear-gradient(160deg,#dbeafe,#ffffff_40%,#082e68)] flex items-center justify-center"><Logo/><span className="absolute"></span></div></section><section className="mx-10 -mt-4 p-8 rounded-2xl bg-[#082E68] text-white shadow-xl grid grid-cols-[220px_1fr] gap-8"><div className="h-56 rounded-lg bg-gradient-to-br from-orange-100 to-blue-900"/><div><div className="flex justify-between"><span className="text-[#FF9F18] text-sm font-bold tracking-widest">FEATURED EPISODE</span><span className="border rounded-full px-4 py-1 text-sm">May 14, 2024 · S4 E7</span></div><h2 className="font-serif text-4xl font-bold mt-4 max-w-2xl">Scaling with Soul: Building JetFuel from Day One</h2><p className="mt-3">Evan Frank · Co-founder & CEO, JetFuel</p><p className="mt-4 max-w-3xl text-blue-100">Featured episode summary with Riverside/player embed and core takeaway.</p><div className="mt-8 flex items-center gap-5"><button className="h-14 w-14 rounded-full bg-[#F05A1A] flex items-center justify-center"><Play fill="white"/></button><div className="h-1 bg-white/30 rounded w-full"><div className="h-1 bg-white rounded w-1/3"/></div><span>48:37</span></div></div></section><section className="px-10 py-10"><div className="flex justify-between items-center mb-5"><h2 className="font-serif text-3xl font-bold">Recent Episodes</h2><a className="text-[#082E68] font-semibold">View all episodes →</a></div><div className="grid grid-cols-4 gap-6">{[0,1,2,3].map(i=><EpisodeCard key={i} i={i}/>)}</div></section><section className="px-10 grid grid-cols-2 gap-6"><InfoPanel/><StatsPanel/></section><SubscribeBand/><Footer/></main></>;
}

function HomeMobile() {
  return <><MobileHeader/><main><section className="p-5 bg-gradient-to-b from-blue-50 to-[#fbfaf7]"><h1 className="font-serif text-4xl font-bold leading-tight">Stories shaping <span className="text-[#F05A1A]">Colorado tech.</span></h1><p className="mt-4 text-sm text-slate-700">Conversations with founders, operators, builders, and innovators across Colorado.</p><div className="mt-5 grid grid-cols-2 gap-3"><button className="rounded-full bg-[#F05A1A] text-white py-3 font-semibold text-sm">Listen</button><button className="rounded-full border border-[#082E68] text-[#082E68] py-3 font-semibold text-sm">Episodes</button></div></section><section className="m-4 p-4 rounded-2xl bg-[#082E68] text-white"><div className="h-36 rounded-lg bg-gradient-to-br from-orange-100 to-blue-900"/><p className="text-[#FF9F18] text-xs font-bold mt-4">FEATURED EPISODE</p><h2 className="font-serif text-2xl font-bold mt-2">Scaling with Soul: Building JetFuel from Day One</h2><p className="text-sm mt-2 text-blue-100">Evan Frank · Co-founder & CEO</p><button className="mt-4 h-12 w-12 rounded-full bg-[#F05A1A] flex items-center justify-center"><Play fill="white"/></button></section><section className="p-4"><h2 className="font-serif text-2xl font-bold mb-4">Recent Episodes</h2><div className="space-y-4">{[0,1,2].map(i=><EpisodeCard key={i} i={i}/>)}</div></section><InfoPanel mobile/><StatsPanel mobile/><SubscribeBand mobile/><Footer mobile/></main></>;
}

function InfoPanel({ mobile=false }) { return <div className={`${mobile?"m-4 p-5":"p-8"} rounded-xl bg-white border`}><h2 className="font-serif text-3xl font-bold">About the Podcast</h2><div className="h-1 w-12 bg-[#F05A1A] mt-3 mb-5"/><p className="text-slate-700">Colorado Tech People is a show about the people behind the progress.</p><div className={`${mobile?"grid-cols-1":"grid-cols-3"} grid gap-4 mt-6 text-center text-sm`}><Mini icon={<Users/>} title="Real People"/><Mini icon={<Mic/>} title="Real Conversations"/><Mini icon={<Building2/>} title="Real Colorado"/></div><button className="mt-6 border border-[#082E68] rounded-lg px-5 py-3 text-[#082E68] font-semibold">Learn More About the Show</button></div> }
function StatsPanel({ mobile=false }) { return <div className={`${mobile?"m-4 p-5":"p-8"} rounded-xl bg-[#082E68] text-white`}><h2 className="font-serif text-3xl font-bold">Rooted in Colorado. Connected Everywhere.</h2><p className="mt-4 text-blue-100">From the Front Range to the Western Slope, amplifying the people and organizations making Colorado a great place to build.</p><div className="grid grid-cols-3 gap-4 mt-8 text-center"><b className="text-3xl">100+</b><b className="text-3xl">60+</b><b className="text-3xl">1</b><span>Conversations</span><span>Cities</span><span>Community</span></div></div> }
function Mini({icon,title}) { return <div><div className="mx-auto h-12 w-12 rounded-full border border-[#0A4DA2] flex items-center justify-center text-[#0A4DA2]">{icon}</div><b className="block mt-2">{title}</b></div> }

function EpisodesDesktop() { return <><DesktopHeader/><main className="px-10 py-10"><PageHero title="Episodes" text="Browse conversations with Colorado founders, operators, builders, and innovators."/><div className="mt-8 p-4 bg-white border rounded-xl flex gap-4"><div className="relative flex-1"><Search className="absolute left-3 top-3 text-slate-400" size={18}/><input className="border rounded-lg pl-10 pr-4 py-3 w-full" placeholder="Search by title, guest, or topic"/></div><select className="border rounded-lg px-4"><option>All topics</option></select><select className="border rounded-lg px-4"><option>Newest first</option></select></div><div className="mt-8 grid grid-cols-3 gap-6">{Array.from({length:9}).map((_,i)=><EpisodeCard key={i} i={i}/>)}</div><button className="mx-auto block mt-10 border rounded-full px-8 py-3 font-semibold">Load more episodes</button></main><SubscribeBand/><Footer/></> }
function EpisodesMobile() { return <><MobileHeader/><main className="p-4"><PageHero title="Episodes" text="Browse conversations with Colorado tech people." mobile/><div className="mt-5 space-y-3"><input className="border rounded-lg px-4 py-3 w-full" placeholder="Search episodes"/><select className="border rounded-lg px-4 py-3 w-full"><option>All topics</option></select></div><div className="mt-5 space-y-4">{Array.from({length:6}).map((_,i)=><EpisodeCard key={i} i={i}/>)}</div><button className="mt-6 w-full border rounded-full py-3 font-semibold">Load more</button></main><SubscribeBand mobile/><Footer mobile/></> }

function EpisodeDetailDesktop() { return <><DesktopHeader/><main><section className="px-10 py-10 grid grid-cols-[1fr_360px] gap-10"><article><div className="text-sm text-[#F05A1A] font-bold">S4 E7 · May 14, 2024</div><h1 className="font-serif text-6xl font-bold leading-tight mt-3">Scaling with Soul: Building JetFuel from Day One</h1><p className="mt-5 text-xl text-slate-700">A focused summary designed for SEO and readability before the visitor presses play.</p><div className="mt-8 rounded-2xl bg-[#082E68] text-white p-6"><div className="flex items-center gap-5"><button className="h-14 w-14 rounded-full bg-[#F05A1A] flex items-center justify-center"><Play fill="white"/></button><div className="flex-1 h-1 rounded bg-white/30"><div className="w-1/4 bg-white h-1 rounded"/></div><span>48:37</span></div><div className="mt-5 flex gap-3 text-sm"><button className="border border-white/30 rounded-full px-4 py-2">Apple</button><button className="border border-white/30 rounded-full px-4 py-2">Spotify</button><button className="border border-white/30 rounded-full px-4 py-2">YouTube</button></div></div><ContentBlock title="Episode Summary"/><ContentBlock title="Key Topics" chips/><ContentBlock title="Show Notes"/><ContentBlock title="Links Mentioned"/><ContentBlock title="Transcript" long/></article><aside className="space-y-5"><div className="rounded-xl bg-white border p-5"><div className="h-52 rounded-lg bg-blue-100"/><h3 className="font-serif text-2xl font-bold mt-4">Guest Name</h3><p className="text-sm text-slate-600">Founder & CEO, Company</p><p className="mt-3 text-sm">Short guest bio and contextual credibility.</p></div><button className="w-full rounded-lg bg-[#F05A1A] text-white py-3 font-semibold">Subscribe for updates</button><div className="rounded-xl bg-white border p-5"><h3 className="font-bold flex gap-2"><Share2 size={18}/> Share this episode</h3><p className="mt-3 text-sm text-slate-600">Social sharing links and OG preview.</p></div></aside></section><section className="px-10 pb-10"><h2 className="font-serif text-3xl font-bold mb-5">Related Episodes</h2><div className="grid grid-cols-3 gap-6">{[0,1,2].map(i=><EpisodeCard key={i} i={i}/>)}</div></section></main><Footer/></> }
function EpisodeDetailMobile() { return <><MobileHeader/><main className="p-4"><div className="text-xs text-[#F05A1A] font-bold">S4 E7 · May 14, 2024</div><h1 className="font-serif text-4xl font-bold leading-tight mt-2">Scaling with Soul: Building JetFuel from Day One</h1><p className="mt-4 text-slate-700">SEO-friendly summary before the player.</p><div className="mt-5 rounded-2xl bg-[#082E68] text-white p-5"><button className="h-12 w-12 rounded-full bg-[#F05A1A] flex items-center justify-center"><Play fill="white"/></button><div className="mt-4 h-1 rounded bg-white/30"><div className="w-1/4 h-1 bg-white rounded"/></div><div className="mt-4 grid grid-cols-3 gap-2 text-xs"><button className="border rounded-full py-2">Apple</button><button className="border rounded-full py-2">Spotify</button><button className="border rounded-full py-2">YouTube</button></div></div><div className="mt-5 rounded-xl bg-white border p-5"><h3 className="font-serif text-2xl font-bold">Guest Name</h3><p className="text-sm text-slate-600">Founder & CEO, Company</p></div><ContentBlock title="Episode Summary"/><ContentBlock title="Key Topics" chips/><ContentBlock title="Show Notes"/><ContentBlock title="Transcript" long/><h2 className="font-serif text-2xl font-bold my-4">Related Episodes</h2><EpisodeCard i={2}/></main><SubscribeBand mobile/><Footer mobile/></> }

function FormDesktop({ type }) { const map={"Contact Us":["Name","Email","Inquiry type","Subject","Message"],"Suggest a Guest":["Your name","Your email","Suggested guest name","Guest title/company","Guest website or LinkedIn","Suggested topic","Why would this guest be a good fit?"],"Sponsor the Show":["Name","Work email","Company name","Company website","Sponsorship interest","Budget range","Desired timeline","Message"]}; return <><DesktopHeader/><main className="px-10 py-10 grid grid-cols-[0.85fr_1.15fr] gap-10"><div><PageHero title={type} text={formIntro(type)}/><div className="mt-8 rounded-xl bg-[#082E68] text-white p-8"><h2 className="font-serif text-3xl font-bold">What happens next?</h2><p className="mt-4 text-blue-100">Your submission is routed to the podcast managers by email. We’ll review and follow up if there’s a fit.</p></div></div><form className="bg-white border rounded-2xl p-8 shadow-sm space-y-4">{map[type].map((f,i)=><label key={f} className="block text-sm font-semibold">{f}{i<2 && <span className="text-[#F05A1A]"> *</span>}<div className={`${f.includes("Message")||f.includes("fit")?"h-28":"h-12"} mt-2 rounded-lg border bg-slate-50`}/></label>)}<label className="flex gap-3 text-sm"><input type="checkbox"/> I consent to being contacted about this submission.</label><button className="rounded-lg bg-[#F05A1A] text-white px-7 py-3 font-semibold">Submit</button><p className="text-xs text-slate-500">Includes validation, spam protection, success and error states.</p></form></main><SubscribeBand/><Footer/></> }
function FormMobile({ type }) { const map={"Contact Us":["Name","Email","Subject","Message"],"Suggest a Guest":["Your name","Your email","Suggested guest name","Suggested topic","Why this guest?"],"Sponsor the Show":["Name","Work email","Company name","Sponsorship interest","Message"]}; return <><MobileHeader/><main className="p-4"><PageHero title={type} text={formIntro(type)} mobile/><form className="mt-5 bg-white border rounded-2xl p-5 space-y-4">{map[type].map((f,i)=><label key={f} className="block text-sm font-semibold">{f}{i<2 && <span className="text-[#F05A1A]"> *</span>}<div className={`${f.includes("Message")||f.includes("Why")?"h-28":"h-12"} mt-2 rounded-lg border bg-slate-50`}/></label>)}<label className="flex gap-3 text-sm"><input type="checkbox"/> I consent to being contacted.</label><button className="w-full rounded-lg bg-[#F05A1A] text-white py-3 font-semibold">Submit</button></form></main><Footer mobile/></> }
function formIntro(type){ if(type==="Suggest a Guest") return "Know a founder, operator, investor, builder, or community leader with a story worth sharing? Suggest them for the show."; if(type==="Sponsor the Show") return "Reach a thoughtful audience of Colorado tech leaders, founders, builders, and community members."; return "Have a question, partnership idea, press request, or general note? Send us a message." }

function AboutDesktop(){ return <><DesktopHeader/><main><section className="px-10 py-12 grid grid-cols-2 gap-10 items-center"><div><PageHero title="About Colorado Tech People" text="An editorial podcast spotlighting the people behind Colorado’s technology ecosystem — their stories, lessons, struggles, and wins."/><div className="mt-8 flex gap-4"><button className="bg-[#F05A1A] text-white rounded-full px-7 py-3 font-semibold">Listen to Latest</button><button className="border border-[#082E68] text-[#082E68] rounded-full px-7 py-3 font-semibold">Suggest a Guest</button></div></div><div className="h-80 rounded-2xl bg-gradient-to-br from-orange-100 via-blue-50 to-[#082E68]"/></section><section className="px-10 py-8 grid grid-cols-3 gap-6"><Value icon={<Users/>} title="Real People"/><Value icon={<Mic/>} title="Real Conversations"/><Value icon={<Building2/>} title="Real Colorado"/></section><section className="mx-10 my-8 rounded-2xl bg-white border p-8 grid grid-cols-2 gap-8"><div><h2 className="font-serif text-3xl font-bold">Our editorial lens</h2><p className="mt-4 text-slate-700">We focus on grounded conversations with founders, operators, investors, engineers, designers, and community builders.</p></div><div className="space-y-3 text-sm"><p>• Honest lessons, not press-release stories</p><p>• Colorado ecosystem perspective</p><p>• Practical insights for builders</p><p>• Human, credible, and accessible tone</p></div></section></main><SubscribeBand/><Footer/></>}
function AboutMobile(){ return <><MobileHeader/><main className="p-4"><PageHero title="About Colorado Tech People" text="An editorial podcast spotlighting the people behind Colorado’s technology ecosystem." mobile/><div className="mt-5 h-52 rounded-2xl bg-gradient-to-br from-orange-100 via-blue-50 to-[#082E68]"/><div className="mt-5 space-y-4"><Value icon={<Users/>} title="Real People"/><Value icon={<Mic/>} title="Real Conversations"/><Value icon={<Building2/>} title="Real Colorado"/></div><div className="mt-5 rounded-2xl bg-white border p-5"><h2 className="font-serif text-2xl font-bold">Our editorial lens</h2><p className="mt-3 text-sm text-slate-700">Grounded conversations with Colorado founders, operators, builders, and community leaders.</p></div></main><SubscribeBand mobile/><Footer mobile/></>}

function PageHero({ title, text, mobile=false }) { return <section className={`${mobile?"":""}`}><div className="text-sm text-[#F05A1A] font-bold tracking-widest">COLORADO TECH PEOPLE</div><h1 className={`font-serif ${mobile?"text-4xl":"text-6xl"} font-bold leading-tight mt-2`}>{title}</h1><p className={`${mobile?"text-base":"text-xl"} mt-4 text-slate-700 max-w-3xl`}>{text}</p></section> }
function ContentBlock({title,chips,long}) { return <section className="mt-8 rounded-xl bg-white border p-6"><h2 className="font-serif text-3xl font-bold">{title}</h2>{chips?<div className="mt-4 flex flex-wrap gap-2">{["Founder story","Colorado startups","Leadership","Product","Community"].map(x=><span key={x} className="rounded-full bg-blue-50 text-[#082E68] px-3 py-1 text-sm">{x}</span>)}</div>:<div className="mt-4 space-y-3 text-slate-700"><p className="h-3 bg-slate-100 rounded w-full"/><p className="h-3 bg-slate-100 rounded w-11/12"/><p className="h-3 bg-slate-100 rounded w-4/5"/>{long && <><p className="h-3 bg-slate-100 rounded w-full"/><p className="h-3 bg-slate-100 rounded w-10/12"/></>}</div>}</section> }
function Value({icon,title}) { return <div className="rounded-xl bg-white border p-6"><div className="h-12 w-12 rounded-full border border-[#0A4DA2] flex items-center justify-center text-[#0A4DA2]">{icon}</div><h3 className="font-serif text-2xl font-bold mt-4">{title}</h3><p className="mt-2 text-sm text-slate-600">Short supporting copy explaining this design/content pillar.</p></div> }

function renderDesktop(page){ if(page==="Home") return <HomeDesktop/>; if(page==="Episodes") return <EpisodesDesktop/>; if(page==="Episode Detail") return <EpisodeDetailDesktop/>; if(["Contact Us","Suggest a Guest","Sponsor the Show"].includes(page)) return <FormDesktop type={page}/>; return <AboutDesktop/> }
function renderMobile(page){ if(page==="Home") return <HomeMobile/>; if(page==="Episodes") return <EpisodesMobile/>; if(page==="Episode Detail") return <EpisodeDetailMobile/>; if(["Contact Us","Suggest a Guest","Sponsor the Show"].includes(page)) return <FormMobile type={page}/>; return <AboutMobile/> }

export default function PodcastWireframes() {
  const [page, setPage] = useState("Home");
  const [mode, setMode] = useState("Both");
  return (
    <div className="min-h-screen bg-slate-100 p-6 text-slate-900">
      <style>{`.clip-mountain{clip-path:polygon(0 100%,40% 20%,58% 55%,72% 35%,100% 100%);} .font-serif{font-family: Georgia, 'Times New Roman', serif;}`}</style>
      <div className="mx-auto max-w-[1600px]">
        <div className="mb-6 rounded-2xl bg-white border shadow-sm p-5 flex flex-wrap items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold">Colorado Tech People Website Wireframes</h1>
            <p className="text-sm text-slate-600 mt-1">Responsive desktop and mobile concepts based on the provided homepage visual direction and PRD content requirements.</p>
          </div>
          <div className="flex gap-2">
            {['Both','Desktop','Mobile'].map(m=><button key={m} onClick={()=>setMode(m)} className={`rounded-full px-4 py-2 text-sm font-semibold ${mode===m?'bg-slate-900 text-white':'bg-slate-100'}`}>{m}</button>)}
          </div>
        </div>
        <div className="mb-6 flex flex-wrap gap-2">
          {PAGES.map(p=><button key={p} onClick={()=>setPage(p)} className={`rounded-full px-4 py-2 text-sm font-semibold border ${page===p?'bg-[#082E68] text-white border-[#082E68]':'bg-white border-slate-200'}`}>{p}</button>)}
        </div>
        <motion.div key={page+mode} initial={{opacity:0,y:10}} animate={{opacity:1,y:0}} transition={{duration:.2}} className={`${mode==='Both'?'grid grid-cols-[minmax(760px,1fr)_400px] gap-6 items-start':'block'}`}>
          {(mode==='Both'||mode==='Desktop') && <DesktopFrame title={page}>{renderDesktop(page)}</DesktopFrame>}
          {(mode==='Both'||mode==='Mobile') && <MobileFrame title={page}>{renderMobile(page)}</MobileFrame>}
        </motion.div>
      </div>
    </div>
  );
}
