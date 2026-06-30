import React, { useState, useEffect } from 'react';
import {
  Database, Brain, TrendingUp, Terminal, Cpu, LineChart,
  Mail, Phone, MapPin, ExternalLink, X, CheckCircle,
  Calendar, ChevronRight, Menu, Code, Sparkles, Award,
  ArrowUpRight, Zap,
} from 'lucide-react';

const Linkedin = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
    strokeLinecap="round" strokeLinejoin="round" className={props.className} {...props}>
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect width="4" height="12" x="2" y="9" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

interface Project {
  id: string; title: string; client: string;
  category: 'Hospitality' | 'Manufacturing' | 'Supply Chain';
  summary: string; problem: string; solution: string;
  impact: string[]; tech: string[];
}
interface Experience {
  id: string; role: string; company: string; location?: string;
  period: string; isCurrent: boolean; highlights: string[];
}

function App() {
  const [activeSection, setActiveSection] = useState('home');
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('All');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [formErrors, setFormErrors] = useState({ name: '', email: '', message: '' });
  const [formSubmitting, setFormSubmitting] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);

  useEffect(() => {
    const handle = () => {
      const sections = ['home', 'about', 'skills', 'projects', 'experience', 'contact'];
      const y = window.scrollY + 200;
      for (const s of sections) {
        const el = document.getElementById(s);
        if (el && y >= el.offsetTop && y < el.offsetTop + el.offsetHeight) {
          setActiveSection(s); break;
        }
      }
    };
    window.addEventListener('scroll', handle);
    return () => window.removeEventListener('scroll', handle);
  }, []);

  const projects: Project[] = [
    {
      id: 'p1', title: 'Guest Loyalty Segmentation & Personalisation Engine',
      client: 'Accor S.A.', category: 'Hospitality',
      summary: 'K-Means + RFM clustering on loyalty data across 5,000+ global properties to identify high-value, at-risk, and dormant guest cohorts for targeted campaigns.',
      problem: 'With 5,000+ global properties, manual loyalty data analysis was impossible — campaign conversions were flat and retention spend was poorly targeted.',
      solution: 'Built an automated RFM feature-engineering pipeline + K-Means clustering engine in Python/scikit-learn. Segment outputs were piped directly into Salesforce CRM and Power BI dashboards for campaign activation.',
      impact: ['Segmented guests across 5,000+ properties into actionable cohorts.', 'Improved repeat booking rates for high-value targeted cohorts.', 'Integrated segment tags directly into global CRM systems.', 'Enabled marketing team to run personalised retention email sequences.'],
      tech: ['Python', 'K-Means', 'RFM Analysis', 'scikit-learn', 'SQL', 'Power BI', 'CRM Integration'],
    },
    {
      id: 'p2', title: 'Dynamic Room Rate Forecasting for Revenue Optimisation',
      client: 'Accor S.A.', category: 'Hospitality',
      summary: 'LSTM deep learning pipeline forecasting hotel occupancy and optimal room pricing across European and Asia-Pacific properties, reducing manual forecasting effort by 40%.',
      problem: 'Seasonal surges, competitor pricing shifts and local events made manual pricing inaccurate and labor-intensive for revenue managers.',
      solution: 'TensorFlow LSTM pipeline ingesting booking history, event calendars, competitor rate feeds and weather data. Automated weekly reports surfaced directly to revenue teams.',
      impact: ['Reduced manual forecasting effort by ~40%.', 'Deployed across European and APAC properties.', 'Dynamic pricing recommendations updated weekly.', 'Executive-level automated reporting pipeline.'],
      tech: ['Python', 'LSTM', 'TensorFlow', 'Time-series', 'SQL', 'Power BI', 'Pandas'],
    },
    {
      id: 'p3', title: 'Predictive Maintenance Model for Manufacturing Equipment',
      client: 'Bosch Global Software', category: 'Manufacturing',
      summary: 'Random Forest + Gradient Boosting classifier on sensor telemetry data achieving 91% precision in failure prediction — flagging at-risk equipment 48hrs in advance.',
      problem: 'Unplanned equipment failures caused high maintenance costs and production downtime on Bosch assembly lines.',
      solution: 'ML classifier on high-frequency sensor telemetry with engineered time-series features (rolling averages, variance, spectral properties) to detect wear signatures.',
      impact: ['91% precision in predicting equipment failures.', 'Flagged at-risk machinery 48 hours before breakdown.', 'Significant reduction in unplanned manufacturing downtime.', 'Integrated with industrial IoT alarm systems.'],
      tech: ['Python', 'Random Forest', 'Gradient Boosting', 'Time-series', 'Pandas', 'SQL', 'Scipy'],
    },
    {
      id: 'p4', title: 'EDI Data Quality & Anomaly Detection Pipeline',
      client: 'Bosch Global Software', category: 'Manufacturing',
      summary: 'Isolation Forest + rule-based XSD validation pipeline detecting anomalies across 20+ EDI endpoints, reducing manual data quality audits by 60%.',
      problem: 'Incoming EDI messages with schema discrepancies, duplicates, and corrupted payloads were silently polluting downstream analytics.',
      solution: 'Automated Python pipeline combining Isolation Forest behavioral anomaly detection with structural XSD validation across 20+ integration endpoints.',
      impact: ['Reduced manual data quality audits by 60%.', 'Near-real-time flagging of malformed records.', 'Modular validators extendable to new partner schemas.', 'Improved upstream reliability for analytics teams.'],
      tech: ['Python', 'Isolation Forest', 'scikit-learn', 'SQL', 'XSD Validation', 'JSON Schema'],
    },
    {
      id: 'p5', title: 'Logistics Delay Analysis & Root Cause Detection',
      client: 'Hewlett Packard Enterprise', category: 'Supply Chain',
      summary: 'Python analytics workflow replacing manual Excel tracking — surfacing recurring shipment delay patterns by carrier, region, and product category.',
      problem: 'Logistics relied on manual Excel reviews to track delays, making systematic cross-carrier patterns nearly invisible.',
      solution: 'Automated data cleaning, aggregation, and EDA pipeline with Matplotlib/Seaborn trend visualizations replacing the spreadsheet workflow.',
      impact: ['Automated recurring delay tracking that replaced manual Excel work.', 'Uncovered delay patterns by carrier, region, and product line.', 'Equipped managers with data-backed SLA renegotiation findings.', 'Rapid root-cause tracing for critical order escalations.'],
      tech: ['Python', 'Pandas', 'NumPy', 'Matplotlib', 'Seaborn', 'EDA'],
    },
  ];

  const experiences: Experience[] = [
    {
      id: 'e1', role: 'Associate IT Consultant', company: 'ITC Infotech · Client: Accor S.A.',
      location: 'Bengaluru, India', period: 'Jul 2024 – Present', isCurrent: true,
      highlights: [
        "Developed guest segmentation model (K-Means + RFM) on Accor's ALL loyalty programme across 5,000+ properties.",
        'Built LSTM time-series pipeline for hotel occupancy forecasting, incorporating seasonal trends, local events, and competitor pricing.',
        'Integrated segmentation outputs into CRM dashboards via Power BI enabling targeted retention campaigns.',
        'Automated weekly revenue forecasting reports — reducing manual effort by ~40%.',
      ],
    },
    {
      id: 'e2', role: 'SEO Analyst (Freelance)', company: 'Alice Blue',
      location: 'Remote', period: 'Nov 2023 – Jul 2024', isCurrent: false,
      highlights: [
        'Drove 110% increase in organic traffic through data-driven content strategy and URL optimisation.',
        'Leveraged Moz and SEMrush across 100+ published articles for keyword research and performance tracking.',
        'Achieved top-10 Google rankings for 50+ articles via end-to-end analytics pipelines.',
      ],
    },
    {
      id: 'e3', role: 'Data Science Specialist', company: 'Bosch Global Software (via Klaus IT Solutions)',
      location: 'Bengaluru, India', period: 'Mar 2022 – Oct 2023', isCurrent: false,
      highlights: [
        'Predictive maintenance classifier (RF + Gradient Boosting) achieving 91% precision on sensor telemetry.',
        'Time-series feature engineering flagging at-risk equipment 48hrs in advance.',
        'Anomaly detection pipeline reducing manual quality checks by 60%.',
        'EDA and feature engineering on large-scale manufacturing and supply chain datasets.',
      ],
    },
    {
      id: 'e4', role: 'Data Analyst', company: 'Hewlett Packard Enterprise (via Bhilwara Technology)',
      location: 'Bengaluru, India', period: 'Apr 2020 – Dec 2021', isCurrent: false,
      highlights: [
        'Python (Pandas, NumPy) pipelines to clean, merge, and standardise shipment and order data.',
        'EDA to identify delay patterns by carrier, region, and product category.',
        'Matplotlib/Seaborn visualizations replacing manual Excel review.',
        'Presented root cause findings to supply chain teams, supporting faster SLA resolution.',
      ],
    },
    {
      id: 'e5', role: 'Technical Support Analyst', company: 'Hewlett Packard Enterprise (via Bhilwara Technology)',
      location: 'Bengaluru, India', period: 'Mar 2019 – Apr 2020', isCurrent: false,
      highlights: [
        'Coordinated across supply chain, logistics, and client teams to identify root causes and drive resolution.',
        'Maintained structured issue tracking contributing to process improvement initiatives.',
      ],
    },
  ];

  const skills = [
    {
      category: 'Languages', icon: <Code className="w-5 h-5 text-[#E07A5F]" />,
      items: [{ name: 'Python', level: 95 }, { name: 'SQL', level: 90 }, { name: 'R', level: 75 }]
    },
    {
      category: 'ML / AI & Data Science', icon: <Brain className="w-5 h-5 text-[#E07A5F]" />,
      items: [{ name: 'scikit-learn', level: 92 }, { name: 'TensorFlow / Keras', level: 85 }, { name: 'Pandas & NumPy', level: 95 }, { name: 'Time-series & LSTM', level: 88 }, { name: 'Matplotlib & Seaborn', level: 90 }, { name: 'Clustering & RFM', level: 92 }]
    },
    {
      category: 'Data & Business Intelligence', icon: <LineChart className="w-5 h-5 text-[#E07A5F]" />,
      items: [{ name: 'Power BI', level: 88 }, { name: 'Advanced Excel', level: 92 }, { name: 'SEMrush & Moz', level: 80 }]
    },
    {
      category: 'Tools & Frameworks', icon: <Terminal className="w-5 h-5 text-[#E07A5F]" />,
      items: [{ name: 'Git & GitHub', level: 88 }, { name: 'Visual Studio', level: 85 }, { name: 'Agile / Scrum', level: 90 }]
    },
  ];

  const filtered = activeTab === 'All' ? projects : projects.filter(p => p.category === activeTab);

  const catBadge = (cat: string) => {
    if (cat === 'Hospitality') return 'bg-[#E07A5F]/20 border border-[#E07A5F]/45 text-[#F2A488]';
    if (cat === 'Manufacturing') return 'bg-[#F2CC8F]/20 border border-[#F2CC8F]/45 text-[#F2CC8F]';
    return 'bg-[#81B29A]/20 border border-[#81B29A]/45 text-[#9FC9B3]';
  };

  const validate = () => {
    const e = { name: '', email: '', message: '' };
    let ok = true;
    if (!formData.name.trim()) { e.name = 'Name is required'; ok = false; }
    if (!formData.email.trim()) { e.email = 'Email is required'; ok = false; }
    else if (!/\S+@\S+\.\S+/.test(formData.email)) { e.email = 'Valid email required'; ok = false; }
    if (!formData.message.trim()) { e.message = 'Message is required'; ok = false; }
    setFormErrors(e);
    return ok;
  };

  const handleInput = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(p => ({ ...p, [name]: value }));
    if (formErrors[name as keyof typeof formErrors])
      setFormErrors(p => ({ ...p, [name]: '' }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      setFormSubmitting(true);
      setTimeout(() => {
        setFormSubmitting(false);
        setFormSubmitted(true);
        setFormData({ name: '', email: '', message: '' });
      }, 1500);
    }
  };

  return (
    <div className="relative min-h-screen font-sans bg-white text-[#3D405B] selection:bg-[#E07A5F]/20 selection:text-[#E07A5F]">

      {/* ── BACKGROUND GRADIENT MESH ── */}
      <div className="absolute top-0 left-1/3 w-[700px] h-[700px] rounded-full blur-[160px] pointer-events-none -translate-y-1/2 animate-pulse-slow"
        style={{ background: 'radial-gradient(circle, rgba(224,122,95,0.10) 0%, transparent 70%)' }} />
      <div className="absolute top-1/2 right-0 w-[500px] h-[500px] rounded-full blur-[140px] pointer-events-none animate-pulse-slow"
        style={{ animationDelay: '-4s', background: 'radial-gradient(circle, rgba(61,64,91,0.06) 0%, transparent 70%)' }} />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full blur-[120px] pointer-events-none animate-pulse-slow"
        style={{ animationDelay: '-8s', background: 'radial-gradient(circle, rgba(242,204,143,0.14) 0%, transparent 70%)' }} />

      {/* ── NAVBAR ── */}
      <header className="sticky top-0 z-40 w-full border-b border-[#3D405B]/10"
        style={{ background: 'rgba(255, 255, 255, 0.85)', backdropFilter: 'blur(20px)' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 sm:h-20 flex items-center justify-between">

          <a href="#home" className="flex items-center gap-3 group">
            <div className="relative flex items-center justify-center w-10 h-10 rounded-xl shadow-lg group-hover:scale-105 transition-all"
              style={{ background: 'linear-gradient(135deg, #E07A5F, #F2CC8F)' }}>
              <Database className="w-5 h-5 text-white" />
              <div className="absolute -inset-0.5 rounded-xl blur-sm opacity-0 group-hover:opacity-40 transition-opacity"
                style={{ background: 'linear-gradient(135deg, #E07A5F, #F2CC8F)' }} />
            </div>
            <div>
              <p className="font-display font-bold text-lg text-[#3D405B] leading-none tracking-tight">Vivekanand Dhavali</p>
              <p className="text-[10px] text-[#E07A5F] font-semibold tracking-widest uppercase mt-0.5">Data Scientist</p>
            </div>
          </a>

          <nav className="hidden md:flex items-center gap-1 p-1.5 rounded-full border border-[#3D405B]/10"
            style={{ background: 'rgba(244,241,222,0.60)' }}>
            {['home', 'about', 'skills', 'projects', 'experience', 'contact'].map(s => (
              <a key={s} href={`#${s}`}
                className={`px-4 py-2 rounded-full text-sm font-medium capitalize tracking-wide transition-all ${activeSection === s
                  ? 'opal-tab shadow-md'
                  : 'text-[#6B6F8C] hover:text-[#3D405B] hover:bg-[#3D405B]/5'
                  }`}>{s}</a>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <a href="#contact"
              className="hidden lg:flex items-center gap-2 px-5 py-2 rounded-xl text-sm font-semibold border border-[#E07A5F]/30 text-[#E07A5F] hover:bg-[#E07A5F]/10 hover:border-[#E07A5F]/60 transition-all">
              Let's Talk <Sparkles className="w-3.5 h-3.5" />
            </a>
            <button onClick={() => setMenuOpen(!menuOpen)}
              className="md:hidden p-2 rounded-xl text-[#6B6F8C] hover:text-[#3D405B] border border-[#3D405B]/15 hover:bg-[#3D405B]/5 transition-all"
              aria-label="Toggle menu">
              <Menu className="w-6 h-6" />
            </button>
          </div>
        </div>

        {menuOpen && (
          <div className="md:hidden absolute w-full left-0 border-t border-[#3D405B]/10 shadow-2xl"
            style={{ background: 'rgba(244, 241, 222, 0.97)', backdropFilter: 'blur(20px)' }}>
            <div className="px-3 pt-2 pb-4 space-y-1">
              {['home', 'about', 'skills', 'projects', 'experience', 'contact'].map(s => (
                <a key={s} href={`#${s}`} onClick={() => setMenuOpen(false)}
                  className={`block px-4 py-3 rounded-xl text-base font-medium capitalize transition-all ${activeSection === s
                    ? 'text-[#E07A5F] bg-[#E07A5F]/8 border-l-2 border-[#E07A5F] pl-3 font-bold'
                    : 'text-[#6B6F8C] hover:text-[#3D405B] hover:bg-[#3D405B]/5'
                    }`}>{s}</a>
              ))}
              <div className="pt-2 px-1">
                <a href="#contact" onClick={() => setMenuOpen(false)}
                  className="btn-primary w-full flex items-center justify-center gap-2 py-3 rounded-xl text-sm">
                  Let's Talk
                </a>
              </div>
            </div>
          </div>
        )}
      </header>

      {/* ── HERO ── */}
      <section id="home" className="relative min-h-[calc(100vh-80px)] flex items-center pt-8 pb-20 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">

            {/* Left */}
            <div className="lg:col-span-7">

              {/* Available badge */}
              <div className="inline-flex items-center gap-2 mb-8 px-4 py-2 rounded-full border border-[#E07A5F]/30 bg-[#E07A5F]/8">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#E07A5F] opacity-60" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-[#E07A5F]" />
                </span>
                <span className="text-xs font-semibold text-[#E07A5F] uppercase tracking-widest">Available · Bengaluru, India</span>
              </div>

              {/* Headline */}
              <h1 className="font-display font-black tracking-tight text-[#3D405B] leading-[0.92] mb-6">
                <span className="block text-5xl sm:text-6xl lg:text-7xl xl:text-[88px]">Data</span>
                <span className="block text-5xl sm:text-6xl lg:text-7xl xl:text-[88px] gradient-text-primary">Scientist</span>
                <span className="block text-3xl sm:text-4xl lg:text-5xl xl:text-6xl text-[#6B6F8C] font-bold mt-3">
                  & BI Analyst
                </span>
              </h1>

              <p className="text-base sm:text-lg text-[#6B6F8C] max-w-xl mb-10 leading-relaxed">
                Turning raw enterprise data into precision-engineered models for global hospitality,
                manufacturing IoT, and supply chain ecosystems.
                <span className="text-[#3D405B] font-semibold"> 6+ years.</span>
              </p>

              {/* CTAs */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mb-14">
                <a href="#projects"
                  className="btn-primary inline-flex items-center gap-2.5 px-8 py-4 rounded-xl text-base font-bold text-white">
                  View Case Studies
                  <ArrowUpRight className="w-5 h-5" />
                </a>
                <a href="#contact"
                  className="inline-flex items-center gap-2 px-8 py-4 rounded-xl text-base font-semibold text-[#3D405B] border border-[#3D405B]/20 hover:border-[#E07A5F]/50 hover:text-[#E07A5F] hover:bg-[#E07A5F]/5 transition-all">
                  Get in Touch
                </a>
              </div>

              {/* Stat row */}
              <div className="grid grid-cols-3 gap-0 pt-10 border-t border-[#3D405B]/12">
                {[
                  { num: '6+', label: 'Years\nExperience' },
                  { num: '5K+', label: 'Properties\nEnabled' },
                  { num: '91%', label: 'Model\nPrecision' },
                ].map((s, i) => (
                  <div key={i} className={i > 0 ? 'pl-6 sm:pl-10 border-l border-[#3D405B]/12' : ''}>
                    <p className="font-display text-3xl sm:text-4xl font-black text-shimmer leading-none">{s.num}</p>
                    <p className="text-[10px] sm:text-xs text-[#6B6F8C] font-semibold uppercase tracking-wider mt-2 whitespace-pre-line leading-tight">{s.label}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Right — visual */}
            <div className="lg:col-span-5 flex justify-center items-center">
              <div className="relative w-72 h-72 sm:w-80 sm:h-80 lg:w-96 lg:h-96">

                {/* Glow ring */}
                <div className="absolute -inset-4 rounded-full blur-3xl animate-pulse-slow"
                  style={{ background: 'radial-gradient(circle, rgba(224,122,95,0.16) 0%, transparent 70%)' }} />

                {/* Orbit rings */}
                <div className="absolute inset-0 rounded-full border border-dashed border-[#3D405B]/15 animate-[spin_60s_linear_infinite]" />
                <div className="absolute inset-6 rounded-full border border-[#3D405B]/10" />

                {/* Floating badges */}
                <div className="absolute top-2 -left-8 z-10 animate-float">
                  <div className="glass-panel px-3.5 py-2.5 rounded-2xl shadow-xl">
                    <div className="flex items-center gap-2">
                      <div className="p-1.5 rounded-lg bg-[#E07A5F]/20">
                        <TrendingUp className="w-4 h-4 text-[#F2A488]" />
                      </div>
                      <div>
                        <p className="text-[9px] text-white/55 font-bold uppercase tracking-wider">Segment</p>
                        <p className="text-xs font-bold text-white mt-0.5">RFM + K-Means</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="absolute -bottom-2 -right-8 z-10 animate-float-delayed">
                  <div className="glass-panel px-3.5 py-2.5 rounded-2xl shadow-xl">
                    <div className="flex items-center gap-2">
                      <div className="p-1.5 rounded-lg bg-[#81B29A]/20">
                        <Zap className="w-4 h-4 text-[#9FC9B3]" />
                      </div>
                      <div>
                        <p className="text-[9px] text-white/55 font-bold uppercase tracking-wider">Precision</p>
                        <p className="text-xs font-bold text-white mt-0.5">91% RF Model</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Profile image */}
                <div className="absolute inset-8 rounded-full overflow-hidden border border-[#3D405B]/15"
                  style={{ background: '#F4F1DE' }}>
                  <img src="/vivek.png" alt="Vivekanand Dhavali"
                    className="w-full h-full object-cover rounded-full"
                    onError={e => { (e.target as HTMLImageElement).style.display = 'none'; }} />
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ── ABOUT ── */}
      <section id="about" className="py-20 sm:py-28 border-y border-[#3D405B]/10 relative"
        style={{ background: 'rgba(244,241,222,0.45)' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-14">
            <div>
              <p className="text-xs text-[#E07A5F] font-bold uppercase tracking-widest mb-3">About</p>
              <h2 className="font-display text-4xl sm:text-5xl font-black text-[#3D405B] leading-tight">
                Professional<br />Narrative
              </h2>
            </div>
            <p className="text-[#6B6F8C] text-sm sm:text-base max-w-xs sm:text-right leading-relaxed">
              Translating complex data into decisions that move the business.
            </p>
          </div>

          {/* Bento Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">

            {/* Large bio card */}
            <div className="sm:col-span-2 glass-panel p-8 rounded-3xl border-white/10 gradient-border">
              <h3 className="font-display text-xl font-bold text-white mb-4">Bridging Data & Operations</h3>
              <p className="text-white/85 text-sm sm:text-base leading-relaxed mb-4">
                Results-oriented Data Scientist with 6+ years of cross-functional experience spanning hospitality,
                manufacturing, and supply chain analytics. Currently at <span className="text-[#F2A488] font-semibold">ITC Infotech</span> serving
                global hospitality leader <span className="text-[#F2A488] font-semibold">Accor S.A.</span>
              </p>
              <p className="text-white/65 text-sm leading-relaxed">
                My edge: bridging deep ML expertise with business fluency — reducing reporting cycles,
                surfacing model outputs to non-technical executives, and building pipelines that keep working
                long after the project ends.
              </p>
            </div>

            {/* Current role card */}
            <div className="glass-panel p-6 rounded-3xl border-white/10 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#81B29A] opacity-60" />
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-[#81B29A]" />
                  </span>
                  <span className="text-[10px] font-bold text-[#9FC9B3] uppercase tracking-widest">Currently Active</span>
                </div>
                <p className="text-xs text-white/55 uppercase tracking-wider font-semibold mb-1">Role</p>
                <p className="font-display text-base font-bold text-white">Associate IT Consultant</p>
                <p className="text-sm text-[#F2A488] font-semibold mt-1">ITC Infotech · Accor S.A.</p>
              </div>
              <div className="mt-6 pt-5 border-t border-white/15">
                <p className="text-[10px] text-white/55 uppercase tracking-wider font-semibold">Since</p>
                <p className="text-sm text-white font-bold mt-0.5">July 2024</p>
              </div>
            </div>

            {/* Domain card */}
            <div className="glass-panel p-6 rounded-3xl border-white/10">
              <Award className="w-7 h-7 text-[#F2A488] mb-4" />
              <p className="text-xs text-white/55 uppercase tracking-wider font-semibold mb-2">Focus Domains</p>
              <div className="flex flex-wrap gap-2 mt-3">
                {['Hospitality Analytics', 'Predictive Maintenance', 'Loyalty Segmentation', 'Time-series Forecast', 'Anomaly Detection'].map(d => (
                  <span key={d} className="px-2.5 py-1 rounded-lg text-[11px] font-semibold bg-[#E07A5F]/20 border border-[#E07A5F]/40 text-[#F2A488]">{d}</span>
                ))}
              </div>
            </div>

            {/* Stack card */}
            <div className="glass-panel p-6 rounded-3xl border-white/10">
              <Cpu className="w-7 h-7 text-[#F2A488] mb-4" />
              <p className="text-xs text-white/55 uppercase tracking-wider font-semibold mb-2">Core Stack</p>
              <div className="flex flex-wrap gap-2 mt-3">
                {['Python', 'SQL', 'TensorFlow', 'scikit-learn', 'Power BI', 'Pandas'].map(t => (
                  <span key={t} className="px-2.5 py-1 rounded-lg text-[11px] font-semibold bg-white/10 border border-white/20 text-white/85">{t}</span>
                ))}
              </div>
            </div>

            {/* Education */}
            <div className="glass-panel p-6 rounded-3xl border-white/10">
              <Brain className="w-7 h-7 text-[#F2A488] mb-4" />
              <p className="text-xs text-white/55 uppercase tracking-wider font-semibold mb-2">Education</p>
              <p className="font-display text-sm font-bold text-white mt-2">Bachelor of Commerce</p>
              <p className="text-xs text-white/70 mt-1 leading-relaxed">Jain College of BBA BCA & Commerce, Belgaum · 2018</p>
            </div>

          </div>
        </div>
      </section>

      {/* ── SKILLS ── */}
      <section id="skills" className="py-20 sm:py-28 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-14">
            <div>
              <p className="text-xs text-[#E07A5F] font-bold uppercase tracking-widest mb-3">Expertise</p>
              <h2 className="font-display text-4xl sm:text-5xl font-black text-[#3D405B] leading-tight">
                Technical<br />Competence
              </h2>
            </div>
            <p className="text-[#6B6F8C] text-sm max-w-xs sm:text-right leading-relaxed">
              Algorithms, pipelines, and analytical interfaces deployed in production.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {skills.map((cat, i) => (
              <div key={i} className="glass-panel glass-panel-hover p-6 sm:p-8 rounded-3xl border-white/10 gradient-border">
                <div className="flex items-center gap-3.5 mb-7">
                  <div className="p-3 rounded-xl bg-[#E07A5F]/20 border border-[#E07A5F]/35 flex items-center justify-center">
                    {cat.icon}
                  </div>
                  <h3 className="font-display text-lg font-bold text-white">{cat.category}</h3>
                </div>
                <div className="space-y-4">
                  {cat.items.map((skill, j) => (
                    <div key={j} className="group/skill">
                      <div className="flex justify-between text-sm font-medium mb-2">
                        <span className="text-white/80 group-hover/skill:text-white transition-colors">{skill.name}</span>
                        <span className="text-white/55 group-hover/skill:text-[#F2A488] transition-colors">{skill.level}%</span>
                      </div>
                      <div className="w-full h-1.5 rounded-full bg-white/15 overflow-hidden">
                        <div className="h-full rounded-full transition-all duration-1000"
                          style={{ width: `${skill.level}%`, background: 'linear-gradient(90deg, #E07A5F, #F2CC8F)' }} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PROJECTS ── */}
      <section id="projects" className="py-20 sm:py-28 border-y border-[#3D405B]/10 relative"
        style={{ background: 'rgba(244,241,222,0.45)' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-12">
            <div>
              <p className="text-xs text-[#E07A5F] font-bold uppercase tracking-widest mb-3">Work</p>
              <h2 className="font-display text-4xl sm:text-5xl font-black text-[#3D405B] leading-tight">
                Featured<br />Case Studies
              </h2>
            </div>
            <p className="text-[#6B6F8C] text-sm max-w-xs sm:text-right leading-relaxed">
              Production ML systems built for enterprise clients.
            </p>
          </div>

          {/* Filter tabs */}
          <div className="flex items-center gap-2 mb-10 p-1.5 rounded-2xl border border-[#3D405B]/10 w-fit"
            style={{ background: 'rgba(244,241,222,0.60)' }}>
            {['All', 'Hospitality', 'Manufacturing', 'Supply Chain'].map(tab => (
              <button key={tab} onClick={() => setActiveTab(tab)}
                className={`px-4 sm:px-5 py-2 rounded-xl text-xs sm:text-sm font-semibold tracking-wide transition-all ${activeTab === tab ? 'opal-tab shadow-md' : 'text-[#6B6F8C] hover:text-[#3D405B]'
                  }`}>{tab}</button>
            ))}
          </div>

          {/* Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {filtered.map(proj => (
              <div key={proj.id} onClick={() => setSelectedProject(proj)}
                className="glass-panel glass-panel-hover p-6 rounded-3xl border-white/10 flex flex-col justify-between cursor-pointer group gradient-border">
                <div>
                  <div className="flex items-start justify-between mb-4">
                    <span className={`px-2.5 py-1 rounded-lg text-[10px] font-bold uppercase tracking-wider ${catBadge(proj.category)}`}>
                      {proj.category}
                    </span>
                    <span className="text-white/30 group-hover:text-[#F2A488] transition-colors mt-0.5">
                      <ArrowUpRight className="w-4 h-4" />
                    </span>
                  </div>
                  <h3 className="font-display text-base sm:text-lg font-bold text-white mb-1.5 leading-snug group-hover:text-[#F2A488] transition-colors">
                    {proj.title}
                  </h3>
                  <p className="text-[10px] text-white/50 font-bold tracking-widest uppercase mb-4">{proj.client}</p>
                  <p className="text-sm text-white/70 leading-relaxed">{proj.summary}</p>
                </div>
                <div className="flex flex-wrap gap-1.5 mt-6 pt-5 border-t border-white/15">
                  {proj.tech.slice(0, 3).map((t, i) => (
                    <span key={i} className="px-2 py-0.5 rounded-md bg-white/10 border border-white/15 text-[10px] text-white/70">{t}</span>
                  ))}
                  {proj.tech.length > 3 && (
                    <span className="px-2 py-0.5 rounded-md bg-[#E07A5F]/20 border border-[#E07A5F]/40 text-[10px] text-[#F2A488] font-bold">+{proj.tech.length - 3}</span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PROJECT MODAL ── */}
      {selectedProject && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4"
          style={{ background: 'rgba(61, 64, 91, 0.45)', backdropFilter: 'blur(20px)' }}
          onClick={() => setSelectedProject(null)}>
          <div className="relative w-full max-w-3xl max-h-[88vh] overflow-y-auto glass-panel border-white/10 rounded-3xl p-6 sm:p-8 shadow-2xl"
            onClick={e => e.stopPropagation()}>
            <button onClick={() => setSelectedProject(null)}
              className="absolute top-4 right-4 p-2 rounded-xl text-white/60 hover:text-white border border-white/20 hover:bg-white/10 transition-all">
              <X className="w-5 h-5" />
            </button>

            <div className="mb-6">
              <span className={`inline-block px-2.5 py-1 rounded-lg text-[10px] font-bold uppercase tracking-wider mb-3 ${catBadge(selectedProject.category)}`}>
                {selectedProject.category}
              </span>
              <h3 className="font-display text-xl sm:text-2xl font-extrabold text-white leading-tight">
                {selectedProject.title}
              </h3>
              <p className="text-xs text-[#F2A488] font-bold tracking-widest uppercase mt-2">{selectedProject.client}</p>
            </div>

            <div className="space-y-6 border-t border-white/15 pt-6">
              {[
                { label: 'The Challenge', text: selectedProject.problem, dot: 'bg-[#E07A5F]' },
                { label: 'Technical Solution', text: selectedProject.solution, dot: 'bg-[#E07A5F]' },
              ].map((item, i) => (
                <div key={i}>
                  <h4 className="text-xs font-bold text-white/55 uppercase tracking-widest mb-2.5 flex items-center gap-2">
                    <div className={`w-1.5 h-1.5 rounded-full ${item.dot}`} />
                    {item.label}
                  </h4>
                  <p className="text-sm text-white/85 leading-relaxed pl-3.5">{item.text}</p>
                </div>
              ))}

              <div>
                <h4 className="text-xs font-bold text-white/55 uppercase tracking-widest mb-3 flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#81B29A]" />
                  Measurable Impact
                </h4>
                <ul className="space-y-2.5 pl-3.5">
                  {selectedProject.impact.map((item, i) => (
                    <li key={i} className="flex items-start gap-2.5 text-sm text-white/85">
                      <CheckCircle className="w-4 h-4 text-[#9FC9B3] mt-0.5 flex-shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h4 className="text-xs font-bold text-white/55 uppercase tracking-widest mb-3">Technologies</h4>
                <div className="flex flex-wrap gap-2">
                  {selectedProject.tech.map((t, i) => (
                    <span key={i} className="px-3 py-1 rounded-lg bg-white/10 border border-white/20 text-xs text-white/80 font-semibold">{t}</span>
                  ))}
                </div>
              </div>
            </div>

            <div className="mt-8 pt-5 border-t border-white/15 flex justify-end">
              <button onClick={() => setSelectedProject(null)}
                className="px-6 py-2.5 rounded-xl text-sm font-semibold text-white/60 hover:text-white border border-white/20 hover:border-[#F2A488]/40 hover:bg-white/10 transition-all">
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ── EXPERIENCE ── */}
      <section id="experience" className="py-20 sm:py-28 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-14">
            <div>
              <p className="text-xs text-[#E07A5F] font-bold uppercase tracking-widest mb-3">History</p>
              <h2 className="font-display text-4xl sm:text-5xl font-black text-[#3D405B] leading-tight">
                Career<br />Timeline
              </h2>
            </div>
            <p className="text-[#6B6F8C] text-sm max-w-xs sm:text-right leading-relaxed">6+ years across global enterprise clients.</p>
          </div>

          <div className="relative border-l border-[#3D405B]/15 max-w-3xl mx-auto pl-6 sm:pl-8 space-y-10">
            {experiences.map(exp => (
              <div key={exp.id} className="relative group/t">
                <div className={`absolute -left-[31px] sm:-left-[39px] top-2 w-4 h-4 rounded-full border-2 ${exp.isCurrent
                  ? 'bg-[#E07A5F] border-[#F2CC8F] animate-pulse shadow-lg'
                  : 'bg-[#F4F1DE] border-[#3D405B]/30 group-hover/t:border-[#E07A5F]/60 transition-colors'
                  }`}
                  style={exp.isCurrent ? { boxShadow: '0 0 12px rgba(224,122,95,0.5)' } : {}} />

                <div className="glass-panel p-6 rounded-3xl border-white/10 group-hover/t:border-[#F2A488]/40 transition-all gradient-border">
                  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 mb-5">
                    <div>
                      <h3 className="font-display text-lg font-bold text-white group-hover/t:text-[#F2A488] transition-colors leading-tight">
                        {exp.role}
                      </h3>
                      <p className="text-sm text-white/80 font-semibold mt-0.5">{exp.company}</p>
                      {exp.location && (
                        <div className="flex items-center gap-1 mt-1.5 text-[11px] text-white/55 font-semibold">
                          <MapPin className="w-3 h-3" />{exp.location}
                        </div>
                      )}
                    </div>
                    <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#E07A5F]/20 border border-[#E07A5F]/40 text-xs text-[#F2A488] font-semibold whitespace-nowrap self-start">
                      <Calendar className="w-3 h-3" />{exp.period}
                    </div>
                  </div>
                  <ul className="space-y-2.5">
                    {exp.highlights.map((h, i) => (
                      <li key={i} className="flex items-start gap-2.5 text-sm text-white/75 leading-relaxed">
                        <div className="mt-1.5 flex-shrink-0 w-1.5 h-1.5 rounded-full bg-[#F2A488]/70" />
                        <span>{h}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CONTACT ── */}
      <section id="contact" className="py-20 sm:py-28 border-t border-[#3D405B]/10 relative"
        style={{ background: 'rgba(244,241,222,0.40)' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-14">
            <div>
              <p className="text-xs text-[#E07A5F] font-bold uppercase tracking-widest mb-3">Contact</p>
              <h2 className="font-display text-4xl sm:text-5xl font-black text-[#3D405B] leading-tight">
                Let's Build<br />Something
              </h2>
            </div>
            <p className="text-[#6B6F8C] text-sm max-w-xs sm:text-right leading-relaxed">
              Open to consulting, full-time, and project-based opportunities.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 max-w-5xl mx-auto">

            {/* Info */}
            <div className="lg:col-span-5 space-y-4">
              {[
                { icon: <Mail className="w-5 h-5" />, label: 'Email', value: 'Vivekdhavali123@gmail.com', href: 'mailto:Vivekdhavali123@gmail.com', color: 'text-[#F2A488] bg-[#E07A5F]/20' },
                { icon: <Phone className="w-5 h-5" />, label: 'Phone', value: '+91 9731297187', href: 'tel:+919731297187', color: 'text-[#F2CC8F] bg-[#F2CC8F]/20' },
                { icon: <MapPin className="w-5 h-5" />, label: 'Location', value: 'Bengaluru, India', href: '#', color: 'text-[#9FC9B3] bg-[#81B29A]/20' },
              ].map((item, i) => (
                <a key={i} href={item.href}
                  className="flex items-center gap-4 p-5 rounded-2xl glass-panel border-white/10 hover:border-[#F2A488]/40 transition-all group gradient-border">
                  <div className={`p-3 rounded-xl flex-shrink-0 flex items-center justify-center ${item.color} group-hover:scale-105 transition-transform`}>
                    {item.icon}
                  </div>
                  <div className="overflow-hidden">
                    <p className="text-[10px] text-white/55 font-bold uppercase tracking-widest">{item.label}</p>
                    <p className="text-sm font-bold text-white mt-1 truncate">{item.value}</p>
                  </div>
                </a>
              ))}

              <div className="p-5 rounded-2xl glass-panel border-white/10">
                <p className="text-[10px] text-white/55 font-bold uppercase tracking-widest mb-3">Connect</p>
                <a href="https://linkedin.com/in/vivekdhavali/" target="_blank" rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border border-white/20 text-sm font-semibold text-white/80 hover:text-[#F2A488] hover:border-[#F2A488]/50 transition-all">
                  <Linkedin className="w-4 h-4 text-[#F2A488]" />
                  LinkedIn Profile
                </a>
              </div>
            </div>

            {/* Form */}
            <div className="lg:col-span-7">
              <div className="glass-panel p-6 sm:p-8 rounded-3xl border-white/10 gradient-border">
                <h3 className="font-display text-xl font-bold text-white mb-6">Send a Message</h3>
                <form onSubmit={handleSubmit} className="space-y-5">
                  {[
                    { id: 'name', label: 'Full Name', type: 'text', placeholder: 'e.g. John Doe' },
                    { id: 'email', label: 'Email Address', type: 'email', placeholder: 'e.g. john@example.com' },
                  ].map(f => (
                    <div key={f.id}>
                      <label htmlFor={f.id} className="block text-[10px] text-white/55 font-bold uppercase tracking-widest mb-2">{f.label}</label>
                      <input type={f.type} id={f.id} name={f.id}
                        value={formData[f.id as keyof typeof formData]}
                        onChange={handleInput}
                        className={`w-full px-4 py-3.5 rounded-xl text-sm text-white placeholder-white/40 focus:outline-none focus:ring-1 transition-all ${formErrors[f.id as keyof typeof formErrors]
                          ? 'bg-red-500/15 border border-red-400/50 focus:ring-red-400'
                          : 'bg-white/10 border border-white/20 focus:border-[#F2A488]/60 focus:ring-[#F2A488]/30'
                          }`}
                        placeholder={f.placeholder} />
                      {formErrors[f.id as keyof typeof formErrors] && (
                        <p className="text-xs text-red-300 font-semibold mt-1.5">{formErrors[f.id as keyof typeof formErrors]}</p>
                      )}
                    </div>
                  ))}
                  <div>
                    <label htmlFor="message" className="block text-[10px] text-white/55 font-bold uppercase tracking-widest mb-2">Message</label>
                    <textarea id="message" name="message" rows={4}
                      value={formData.message} onChange={handleInput}
                      className={`w-full px-4 py-3.5 rounded-xl text-sm text-white placeholder-white/40 focus:outline-none focus:ring-1 transition-all resize-none ${formErrors.message
                        ? 'bg-red-500/15 border border-red-400/50 focus:ring-red-400'
                        : 'bg-white/10 border border-white/20 focus:border-[#F2A488]/60 focus:ring-[#F2A488]/30'
                        }`}
                      placeholder="What would you like to discuss?" />
                    {formErrors.message && <p className="text-xs text-red-300 font-semibold mt-1.5">{formErrors.message}</p>}
                  </div>
                  <button type="submit" disabled={formSubmitting}
                    className="btn-primary w-full py-4 rounded-xl text-base font-bold text-white flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed">
                    {formSubmitting ? (
                      <><div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" /><span>Sending...</span></>
                    ) : (
                      <><span>Send Message</span><ChevronRight className="w-4 h-4" /></>
                    )}
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── SUCCESS MODAL ── */}
      {formSubmitted && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4"
          style={{ background: 'rgba(61,64,91,0.45)', backdropFilter: 'blur(20px)' }}>
          <div className="glass-panel border-white/10 rounded-3xl p-8 max-w-sm w-full text-center shadow-2xl">
            <div className="w-16 h-16 rounded-full border border-[#81B29A]/50 bg-[#81B29A]/20 flex items-center justify-center mx-auto mb-5 text-[#9FC9B3]">
              <CheckCircle className="w-8 h-8" />
            </div>
            <h3 className="font-display text-xl font-bold text-white mb-2">Message Sent!</h3>
            <p className="text-sm text-white/75 leading-relaxed mb-6">
              Thank you for reaching out. Vivekanand will review your message and respond shortly.
            </p>
            <button onClick={() => setFormSubmitted(false)}
              className="btn-primary w-full py-3 rounded-xl text-sm font-bold text-white">
              Back to Portfolio
            </button>
          </div>
        </div>
      )}

      {/* ── FOOTER ── */}
      <footer className="border-t border-[#3D405B]/10 py-12 text-center"
        style={{ background: 'rgba(244,241,222,0.55)' }}>
        <div className="max-w-7xl mx-auto px-4 space-y-2">
          <p className="text-xs text-[#6B6F8C] font-semibold tracking-widest">
            © {new Date().getFullYear()} Vivekanand Dhavali · All rights reserved
          </p>
          <p className="text-xs text-[#8A8FA3] font-semibold">React · TypeScript · Tailwind CSS v4</p>
        </div>
      </footer>

    </div>
  );
}

export default App;
