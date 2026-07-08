import React, { useState, useEffect } from 'react';
import {
  Database,
  Brain,
  TrendingUp,
  Terminal,
  LineChart,
  Mail,
  Phone,
  MapPin,
  X,
  CheckCircle,
  Calendar,
  Menu,
  Code,
  Briefcase,
  ArrowUpRight
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
  id: string;
  title: string;
  client: string;
  category: 'Hospitality' | 'Manufacturing' | 'Supply Chain';
  summary: string;
  problem: string;
  solution: string;
  impact: string[];
  tech: string[];
}

interface Experience {
  id: string;
  role: string;
  company: string;
  location?: string;
  period: string;
  isCurrent: boolean;
  highlights: string[];
}

export default function App() {
  const [loading, setLoading] = useState<boolean>(true);
  const [loaderPhase, setLoaderPhase] = useState<number>(0);
  const [currentPage, setCurrentPage] = useState<string>('home');
  const [isTransitioning, setIsTransitioning] = useState<boolean>(false);
  const [menuOpen, setMenuOpen] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<string>('All');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [formErrors, setFormErrors] = useState({ name: '', email: '', message: '' });
  const [formSubmitting, setFormSubmitting] = useState<boolean>(false);
  const [formSubmitted, setFormSubmitted] = useState<boolean>(false);

  useEffect(() => {
    const t1 = setTimeout(() => setLoaderPhase(1), 400);
    const t2 = setTimeout(() => setLoaderPhase(2), 900);
    const t3 = setTimeout(() => setLoaderPhase(3), 1600);
    const t4 = setTimeout(() => setLoaderPhase(4), 2100);
    const t5 = setTimeout(() => setLoading(false), 2600);
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); clearTimeout(t4); clearTimeout(t5); };
  }, []);

  const navigateToPage = (pageName: string) => {
    if (pageName === currentPage || isTransitioning) return;
    setIsTransitioning(true);
    setMenuOpen(false);
    setTimeout(() => {
      setCurrentPage(pageName);
      setIsTransitioning(false);
      window.scrollTo({ top: 0, behavior: 'instant' as any });
    }, 300);
  };

  const projectsData: Project[] = [
    {
      id: 'p1',
      title: 'Guest Loyalty Segmentation & Personalisation Engine',
      client: 'Accor S.A.',
      category: 'Hospitality',
      summary: 'K-Means + RFM clustering on loyalty data across 5,000+ global properties to identify high-value, at-risk, and dormant guest cohorts for targeted retention campaigns.',
      problem: 'With 5,000+ global properties, manual loyalty data analysis was impossible — campaign conversions were flat and retention spend was poorly targeted.',
      solution: 'Built an automated RFM feature-engineering pipeline + K-Means clustering engine in Python/scikit-learn. Segment outputs were piped directly into Salesforce CRM and Power BI dashboards.',
      impact: [
        'Segmented guests across 5,000+ properties into actionable cohorts.',
        'Improved repeat booking rates for high-value targeted cohorts.',
        'Integrated segment tags directly into global CRM systems.',
        'Enabled marketing team to run personalised retention email sequences.'
      ],
      tech: ['Python', 'K-Means', 'RFM Analysis', 'scikit-learn', 'SQL', 'Power BI', 'CRM Integration']
    },
    {
      id: 'p2',
      title: 'Dynamic Room Rate Forecasting for Revenue Optimisation',
      client: 'Accor S.A.',
      category: 'Hospitality',
      summary: 'LSTM deep learning pipeline forecasting hotel occupancy and optimal room pricing across European and Asia-Pacific properties, reducing manual forecasting effort by 40%.',
      problem: 'Seasonal surges, competitor pricing shifts and local events made manual pricing inaccurate and labor-intensive for revenue managers.',
      solution: 'TensorFlow LSTM pipeline ingesting booking history, event calendars, competitor rate feeds and weather data. Automated weekly reports surfaced directly to revenue teams.',
      impact: [
        'Reduced manual forecasting effort by ~40%.',
        'Deployed across European and APAC properties.',
        'Dynamic pricing recommendations updated weekly.',
        'Executive-level automated reporting pipeline.'
      ],
      tech: ['Python', 'LSTM', 'TensorFlow', 'Time-series', 'SQL', 'Power BI', 'Pandas']
    },
    {
      id: 'p3',
      title: 'Predictive Maintenance Model for Manufacturing Equipment',
      client: 'Bosch Global Software',
      category: 'Manufacturing',
      summary: 'Random Forest + Gradient Boosting classifier on sensor telemetry data achieving 91% precision in failure prediction — flagging at-risk equipment 48hrs in advance.',
      problem: 'Unplanned equipment failures caused high maintenance costs and production downtime on Bosch assembly lines.',
      solution: 'ML classifier on high-frequency sensor telemetry with engineered time-series features (rolling averages, variance, spectral properties) to detect wear signatures.',
      impact: [
        '91% precision in predicting equipment failures.',
        'Flagged at-risk machinery 48 hours before breakdown.',
        'Significant reduction in unplanned manufacturing downtime.',
        'Integrated with industrial IoT alarm systems.'
      ],
      tech: ['Python', 'Random Forest', 'Gradient Boosting', 'Time-series', 'Pandas', 'SQL', 'Scipy']
    },
    {
      id: 'p4',
      title: 'EDI Data Quality & Anomaly Detection Pipeline',
      client: 'Bosch Global Software',
      category: 'Manufacturing',
      summary: 'Isolation Forest + rule-based XSD validation pipeline detecting anomalies across 20+ EDI endpoints, reducing manual data quality audits by 60%.',
      problem: 'Incoming EDI messages with schema discrepancies, duplicates, and corrupted payloads were silently polluting downstream analytics.',
      solution: 'Automated Python pipeline combining Isolation Forest behavioral anomaly detection with structural XSD validation across 20+ integration endpoints.',
      impact: [
        'Reduced manual data quality audits by 60%.',
        'Near-real-time flagging of malformed records.',
        'Modular validators extendable to new partner schemas.',
        'Improved upstream reliability for downstream analytics teams.'
      ],
      tech: ['Python', 'Isolation Forest', 'scikit-learn', 'SQL', 'XSD Validation', 'JSON Schema']
    },
    {
      id: 'p5',
      title: 'Logistics Delay Analysis & Root Cause Detection',
      client: 'Hewlett Packard Enterprise',
      category: 'Supply Chain',
      summary: 'Python analytics workflow replacing manual Excel tracking — surfacing recurring shipment delay patterns by carrier, region, and product category.',
      problem: 'Logistics relied on manual Excel reviews to track delays, making systematic cross-carrier patterns nearly invisible.',
      solution: 'Automated data cleaning, aggregation, and EDA pipeline with Matplotlib/Seaborn trend visualizations replacing the spreadsheet workflow.',
      impact: [
        'Automated recurring delay tracking that replaced manual Excel work.',
        'Uncovered delay patterns by carrier, region, and product line.',
        'Equipped managers with data-backed SLA renegotiation findings.',
        'Rapid root-cause tracing for critical order escalations.'
      ],
      tech: ['Python', 'Pandas', 'NumPy', 'Matplotlib', 'Seaborn', 'EDA']
    }
  ];

  const experienceData: Experience[] = [
    {
      id: 'e1',
      role: 'Associate IT Consultant',
      company: 'ITC Infotech · Client: Accor S.A.',
      location: 'Bengaluru, India',
      period: 'Jul 2024 – Present',
      isCurrent: true,
      highlights: [
        "Developed guest segmentation model (K-Means + RFM) on Accor's ALL loyalty programme across 5,000+ properties.",
        'Built LSTM time-series pipeline for hotel occupancy forecasting, incorporating seasonal trends, local events, and competitor pricing.',
        'Integrated segmentation outputs into CRM dashboards via Power BI enabling targeted retention campaigns.',
        'Automated weekly revenue forecasting reports — reducing manual effort by ~40%.'
      ]
    },
    {
      id: 'e2',
      role: 'SEO Analyst (Freelance)',
      company: 'Alice Blue',
      location: 'Remote',
      period: 'Nov 2023 – Jul 2024',
      isCurrent: false,
      highlights: [
        'Drove 110% increase in organic traffic through data-driven content strategy and URL optimisation.',
        'Leveraged Moz and SEMrush across 100+ published articles for keyword research and performance tracking.',
        'Achieved top-10 Google rankings for 50+ articles via end-to-end analytics pipelines.'
      ]
    },
    {
      id: 'e3',
      role: 'Data Science Specialist',
      company: 'Bosch Global Software (via Klaus IT Solutions)',
      location: 'Bengaluru, India',
      period: 'Mar 2022 – Oct 2023',
      isCurrent: false,
      highlights: [
        'Predictive maintenance classifier (RF + Gradient Boosting) achieving 91% precision on sensor telemetry.',
        'Time-series feature engineering flagging at-risk equipment 48hrs in advance.',
        'Anomaly detection pipeline reducing manual quality checks by 60%.',
        'Performed exploratory data analysis and feature engineering on large-scale datasets using Python, Pandas, and SQL.'
      ]
    },
    {
      id: 'e4',
      role: 'Data Analyst',
      company: 'Hewlett Packard Enterprise (via Bhilwara Technology)',
      location: 'Bengaluru, India',
      period: 'Apr 2020 – Dec 2021',
      isCurrent: false,
      highlights: [
        'Used Python (Pandas, NumPy) to clean, merge, and standardise shipment and order data.',
        'Performed exploratory data analysis to identify delay patterns by carrier, region, and product category.',
        'Visualized trends using Matplotlib/Seaborn to highlight top contributing factors behind delays.',
        'Presented data-backed root cause findings to logistics teams, supporting faster SLA resolution.'
      ]
    },
    {
      id: 'e5',
      role: 'Technical Support Analyst',
      company: 'Hewlett Packard Enterprise (via Bhilwara Technology)',
      location: 'Bengaluru, India',
      period: 'Mar 2019 – Apr 2020',
      isCurrent: false,
      highlights: [
        'Coordinated across supply chain, logistics, and client teams to identify root causes and drive resolution.',
        'Maintained structured issue tracking contributing to process improvement initiatives.'
      ]
    }
  ];

  const skillsData = [
    {
      category: 'Core Languages',
      icon: <Code className="w-5 h-5 text-[#111111]" />,
      items: ['Python', 'SQL', 'R']
    },
    {
      category: 'ML & Data Science',
      icon: <Brain className="w-5 h-5 text-[#111111]" />,
      items: ['Pandas & NumPy', 'scikit-learn', 'Clustering & RFM', 'Time-series & LSTM', 'Matplotlib & Seaborn', 'TensorFlow / Keras']
    },
    {
      category: 'Data & BI',
      icon: <LineChart className="w-5 h-5 text-[#111111]" />,
      items: ['Advanced Excel', 'Power BI', 'SEMrush & Moz']
    },
    {
      category: 'Tools & Frameworks',
      icon: <Terminal className="w-5 h-5 text-[#111111]" />,
      items: ['Agile / Scrum', 'Git & GitHub', 'Visual Studio']
    }
  ];

  const filteredProjects = activeTab === 'All'
    ? projectsData
    : projectsData.filter(proj => proj.category === activeTab);

  const validateForm = () => {
    let errors = { name: '', email: '', message: '' };
    let isValid = true;
    if (!formData.name.trim()) { errors.name = 'Name is required'; isValid = false; }
    if (!formData.email.trim()) { errors.email = 'Email is required'; isValid = false; }
    else if (!/\S+@\S+\.\S+/.test(formData.email)) { errors.email = 'Valid email required'; isValid = false; }
    if (!formData.message.trim()) { errors.message = 'Message is required'; isValid = false; }
    setFormErrors(errors);
    return isValid;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (formErrors[name as keyof typeof formErrors]) {
      setFormErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      setFormSubmitting(true);
      setTimeout(() => {
        setFormSubmitting(false);
        setFormSubmitted(true);
        setFormData({ name: '', email: '', message: '' });
      }, 1500);
    }
  };

  const renderHome = () => (
    <div className="space-y-12 animate-page-enter max-w-6xl mx-auto pt-8">
      {/* Hero Section */}
      <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
        <div className="flex-1 space-y-6 text-center lg:text-left">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-[#D8CFC5] bg-white shadow-sm">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#9A0002] opacity-40"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#9A0002]"></span>
            </span>
            <span className="text-[10px] font-bold text-[#111111] uppercase tracking-widest">Available · Bengaluru, India</span>
          </div>
          <h1 className="font-display text-5xl sm:text-6xl lg:text-7xl font-black text-[#111111] leading-[1.05] tracking-tight">
            Vivekanand <span className="text-[#3F3F3F]">Dhavali</span>
          </h1>
          <h2 className="text-xl sm:text-2xl font-bold text-[#111111] font-display">
            Data Scientist & Business Intelligence Architect
          </h2>
          <p className="text-base sm:text-lg text-[#3F3F3F] leading-relaxed max-w-2xl mx-auto lg:mx-0">
            Specializing in Hospitality & E-commerce Analytics. I construct custom predictive architectures, automated data anomaly controls, and interactive intelligence panels that turn raw enterprise files into strategic outcomes.
          </p>
          <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 pt-4">
            <button
              onClick={() => navigateToPage('projects')}
              className="px-7 py-3.5 rounded-lg bg-[#9A0002] text-white text-sm font-semibold hover:-translate-y-0.5 hover:shadow-lg hover:bg-[#7A0002] transition-all duration-300 flex items-center gap-2"
            >
              View My Work
              <ArrowUpRight className="w-4 h-4" />
            </button>
            <a
              href="/resume.pdf" target="_blank"
              className="px-7 py-3.5 rounded-lg bg-white border border-[#D8CFC5] text-[#111111] text-sm font-semibold hover:border-[#9A0002] hover:bg-[#FAF7F4] hover:text-[#9A0002] transition-all duration-300"
            >
              Download Resume
            </a>
          </div>
        </div>
        <div className="w-64 h-64 sm:w-80 sm:h-80 lg:w-[400px] lg:h-[400px] relative flex-shrink-0">
          <div className="absolute inset-0 bg-[#D8CFC5] rounded-full blur-3xl opacity-30 animate-pulse"></div>
          <div className="relative w-full h-full rounded-full border-4 border-[#FFFFFF] bg-white shadow-xl overflow-hidden">
            <img src="/vivek.png" alt="Vivekanand Dhavali" className="w-full h-full object-cover grayscale-[10%] hover:grayscale-0 transition-all duration-700 hover:scale-105" 
                 onError={(e) => { (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=600" }} />
          </div>
        </div>
      </div>

      {/* Metrics Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-10">
        {[
          { label: 'Years Experience', value: '5+', icon: <Briefcase className="w-6 h-6" /> },
          { label: 'Global Properties', value: '5K+', icon: <Database className="w-6 h-6" /> },
          { label: 'Model Precision', value: '91%', icon: <TrendingUp className="w-6 h-6" /> }
        ].map((stat, i) => (
          <div key={i} className="bg-white border border-[#D8CFC5] rounded-2xl p-6 shadow-sm hover:shadow-md hover:border-[#9A0002] group transition-all flex items-center gap-5">
            <div className="p-3 bg-[#FAF7F4] border border-[#EBE5DF] rounded-xl text-[#9A0002] group-hover:bg-[#9A0002] group-hover:text-white transition-colors">{stat.icon}</div>
            <div>
              <p className="font-display text-3xl font-black text-[#111111]">{stat.value}</p>
              <p className="text-xs font-bold text-[#6B6B6B] uppercase tracking-wider mt-1">{stat.label}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderAbout = () => (
    <div className="space-y-12 animate-page-enter max-w-5xl mx-auto">
      <div className="bg-white border border-[#D8CFC5] rounded-3xl p-8 sm:p-12 shadow-sm hover:shadow-md hover:border-black/5 transition-shadow">
        <h3 className="font-display text-3xl font-black text-[#111111] mb-6">About Me</h3>
        <div className="space-y-6 text-[#3F3F3F] text-lg leading-relaxed">
          <p>
            I am a results-oriented Data Scientist with over 5 years of experience delivering machine learning models, analytics systems, and database interfaces in large-scale environments. My primary focus lies in the hospitality and e-commerce spaces, where customer loyalty models directly affect bottom-line revenues.
          </p>
          <p>
            Before consulting, I spent years in technical support, order-management analytics, and supply-chain logistics. This coordination background allows me to communicate easily with engineering squads and commercial executives alike, ensuring that analytical systems are robust and aligned with business objectives.
          </p>
        </div>
      </div>

      <div>
        <h3 className="font-display text-2xl font-black text-[#111111] mb-8 text-center">Technical Expertise</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {skillsData.map((group, idx) => (
            <div key={idx} className="bg-white border border-[#D8CFC5] rounded-2xl p-8 shadow-sm hover:border-[#9A0002] transition-colors group">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2.5 bg-[#FAF7F4] border border-[#EBE5DF] rounded-xl group-hover:bg-[#9A0002] text-[#9A0002] group-hover:text-white transition-colors">{group.icon}</div>
                <h4 className="font-display text-lg font-bold text-[#111111]">{group.category}</h4>
              </div>
              <div className="flex flex-wrap gap-2.5">
                {group.items.map((skill, sIdx) => (
                  <span key={sIdx} className="px-4 py-2 rounded-lg bg-[#FAF7F4] border border-[#D8CFC5] text-sm font-semibold text-[#111111] hover:bg-white hover:border-[#9A0002] transition-colors cursor-default">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderProjects = () => (
    <div className="animate-page-enter max-w-6xl mx-auto">
      <div className="flex justify-center mb-10">
        <div className="flex flex-wrap items-center justify-center gap-2 p-1.5 bg-white rounded-xl border border-[#D8CFC5] shadow-sm">
          {['All', 'Hospitality', 'Manufacturing', 'Supply Chain'].map((tab) => (
            <button
              key={tab} onClick={() => setActiveTab(tab)}
              className={`px-5 py-2.5 rounded-lg text-sm font-bold transition-all ${activeTab === tab ? 'bg-[#9A0002] text-white shadow-md' : 'text-[#6B6B6B] hover:text-[#9A0002] hover:bg-[#FAF7F4]'}`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProjects.map((proj) => (
          <div key={proj.id} onClick={() => setSelectedProject(proj)}
            className="bg-white rounded-2xl border border-[#D8CFC5] p-8 flex flex-col justify-between cursor-pointer hover:border-[#9A0002] hover:-translate-y-1 hover:shadow-lg transition-all duration-300 group"
          >
            <div>
              <div className="flex items-center justify-between mb-6">
                <span className="px-3 py-1.5 rounded-md bg-[#FAF7F4] border border-[#D8CFC5] text-[10px] font-bold text-[#111111] uppercase tracking-wider">
                  {proj.category}
                </span>
                <div className="p-2 bg-[#FAF7F4] rounded-full group-hover:bg-[#9A0002] transition-colors">
                  <ArrowUpRight className="w-4 h-4 text-[#9A0002] group-hover:text-white transition-colors" />
                </div>
              </div>
              <h3 className="font-display text-xl font-black text-[#111111] mb-2 leading-snug group-hover:text-[#9A0002] transition-colors">{proj.title}</h3>
              <p className="text-xs font-bold text-[#6B6B6B] uppercase tracking-wider mb-4">{proj.client}</p>
              <p className="text-sm text-[#3F3F3F] leading-relaxed line-clamp-4">{proj.summary}</p>
            </div>
            <div className="flex flex-wrap gap-2 mt-8 pt-6 border-t border-[#D8CFC5]">
              {proj.tech.slice(0, 3).map((t, idx) => (
                <span key={idx} className="px-2.5 py-1 rounded border border-[#D8CFC5] bg-[#FAF7F4] text-[10px] font-bold text-[#3F3F3F] group-hover:border-[#9A0002]/30 transition-colors">
                  {t}
                </span>
              ))}
              {proj.tech.length > 3 && (
                <span className="px-2.5 py-1 rounded border border-[#D8CFC5] bg-white text-[10px] font-bold text-[#111111] group-hover:border-[#9A0002]/30 transition-colors">
                  +{proj.tech.length - 3}
                </span>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderExperience = () => (
    <div className="max-w-4xl mx-auto space-y-8 animate-page-enter relative before:absolute before:inset-y-0 before:left-[31px] sm:before:left-[43px] before:w-px before:bg-[#D8CFC5]">
      {experienceData.map((exp) => (
        <div key={exp.id} className="relative pl-16 sm:pl-24 group">
          <div className={`absolute left-[24px] sm:left-[36px] top-8 w-4 h-4 rounded-full border-2 bg-[#EFE6DD] transition-all duration-300 ${exp.isCurrent ? 'border-[#9A0002] scale-125' : 'border-[#D8CFC5] group-hover:border-[#9A0002]'}`}></div>
          <div className="bg-white border border-[#D8CFC5] rounded-3xl p-6 sm:p-8 shadow-sm hover:shadow-md hover:border-[#9A0002] transition-all">
            <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 mb-6">
              <div>
                <h3 className="font-display text-xl font-black text-[#111111] group-hover:text-[#9A0002] transition-colors">{exp.role}</h3>
                <p className="text-base font-bold text-[#3F3F3F] mt-1">{exp.company}</p>
                {exp.location && (
                  <p className="text-xs font-semibold text-[#6B6B6B] mt-2 flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5" /> {exp.location}
                  </p>
                )}
              </div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#FAF7F4] border border-[#D8CFC5] text-xs font-bold text-[#111111] group-hover:border-[#9A0002]/30 transition-colors">
                <Calendar className="w-3.5 h-3.5 text-[#9A0002]" /> {exp.period}
              </div>
            </div>
            <ul className="space-y-3">
              {exp.highlights.map((highlight, idx) => (
                <li key={idx} className="flex items-start gap-3 text-sm text-[#3F3F3F] leading-relaxed">
                  <div className="mt-2 flex-shrink-0 w-1.5 h-1.5 rounded-full bg-[#9A0002]/80"></div>
                  <span>{highlight}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      ))}
    </div>
  );

  const renderContact = () => (
    <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 animate-page-enter">
      <div className="space-y-8">
        <div className="bg-white rounded-3xl border border-[#D8CFC5] p-8 shadow-sm">
          <h3 className="font-display text-4xl font-black text-[#111111] mb-4">Let's Connect</h3>
          <p className="text-[#3F3F3F] mb-8 text-lg">Whether you have a specific project in mind or just want to explore possibilities, I'm ready to talk.</p>
          <div className="space-y-4">
            {[
              { icon: <Mail className="w-5 h-5" />, label: 'Email', value: 'Vivekdhavali123@gmail.com', href: 'mailto:Vivekdhavali123@gmail.com' },
              { icon: <Phone className="w-5 h-5" />, label: 'Phone', value: '+91 9731297187', href: 'tel:+919731297187' },
              { icon: <MapPin className="w-5 h-5" />, label: 'Location', value: 'Bengaluru, India', href: undefined }
            ].map((contact, i) => (
              <a key={i} href={contact.href} className={`flex items-center gap-5 p-5 rounded-2xl bg-[#FAF7F4] border border-[#D8CFC5] ${contact.href ? 'hover:border-[#9A0002] hover:bg-white hover:shadow-sm' : ''} transition-all group`}>
                <div className="text-[#9A0002] bg-white p-3 rounded-xl border border-[#D8CFC5] group-hover:bg-[#9A0002] group-hover:text-white transition-colors">{contact.icon}</div>
                <div>
                  <p className="text-xs font-bold text-[#6B6B6B] uppercase tracking-wider">{contact.label}</p>
                  <p className="text-sm font-semibold text-[#111111]">{contact.value}</p>
                </div>
              </a>
            ))}
          </div>
        </div>
      </div>
      <div className="bg-white rounded-3xl border border-[#D8CFC5] p-8 shadow-sm">
        <form onSubmit={handleFormSubmit} className="space-y-6">
          <div>
            <label className="block text-xs font-bold text-[#111111] uppercase tracking-wider mb-2">Your Name</label>
            <input type="text" name="name" value={formData.name} onChange={handleInputChange}
              className={`w-full px-4 py-3.5 rounded-xl bg-[#FAF7F4] border focus:outline-none focus:ring-1 focus:bg-white transition-all ${formErrors.name ? 'border-red-500' : 'border-[#D8CFC5] focus:border-[#9A0002] focus:ring-[#9A0002]'}`}
              placeholder="Jane Doe" />
            {formErrors.name && <p className="text-xs text-red-500 mt-1.5 font-semibold">{formErrors.name}</p>}
          </div>
          <div>
            <label className="block text-xs font-bold text-[#111111] uppercase tracking-wider mb-2">Email Address</label>
            <input type="email" name="email" value={formData.email} onChange={handleInputChange}
              className={`w-full px-4 py-3.5 rounded-xl bg-[#FAF7F4] border focus:outline-none focus:ring-1 focus:bg-white transition-all ${formErrors.email ? 'border-red-500' : 'border-[#D8CFC5] focus:border-[#9A0002] focus:ring-[#9A0002]'}`}
              placeholder="jane@example.com" />
            {formErrors.email && <p className="text-xs text-red-500 mt-1.5 font-semibold">{formErrors.email}</p>}
          </div>
          <div>
            <label className="block text-xs font-bold text-[#111111] uppercase tracking-wider mb-2">Message</label>
            <textarea name="message" value={formData.message} onChange={handleInputChange} rows={5}
              className={`w-full px-4 py-3.5 rounded-xl bg-[#FAF7F4] border focus:outline-none focus:ring-1 focus:bg-white transition-all resize-none ${formErrors.message ? 'border-red-500' : 'border-[#D8CFC5] focus:border-[#9A0002] focus:ring-[#9A0002]'}`}
              placeholder="How can we work together?" />
            {formErrors.message && <p className="text-xs text-red-500 mt-1.5 font-semibold">{formErrors.message}</p>}
          </div>
          <button type="submit" disabled={formSubmitting}
            className="w-full px-6 py-4 rounded-xl bg-[#9A0002] text-white text-sm font-bold hover:-translate-y-0.5 hover:bg-[#7A0002] hover:shadow-lg hover:shadow-[#9A0002]/20 transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2">
            {formSubmitting ? 'Sending...' : 'Send Message'}
          </button>
        </form>
      </div>
    </div>
  );

  if (loading) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#EFE6DD] transition-opacity duration-500" style={{ opacity: loaderPhase === 4 ? 0 : 1 }}>
        <div className="text-center space-y-6">
          <div className="relative w-24 h-24 mx-auto overflow-hidden">
            <div className={`absolute inset-0 flex items-center justify-center transition-all duration-700 ${loaderPhase >= 1 ? 'opacity-100 scale-100' : 'opacity-0 scale-50'}`}>
              <span className="font-display font-black text-6xl text-[#9A0002]">VD</span>
            </div>
          </div>
          <div className="h-12 overflow-hidden">
            <h1 className={`font-display font-black text-4xl tracking-tight text-[#111111] transition-transform duration-700 ${loaderPhase >= 2 ? 'translate-y-0' : 'translate-y-full'}`}>
              Vivekanand Dhavali
            </h1>
          </div>
          <div className="h-6 overflow-hidden">
            <p className={`text-sm font-bold tracking-widest uppercase text-[#9A0002] transition-transform duration-700 delay-100 ${loaderPhase >= 3 ? 'translate-y-0' : 'translate-y-full'}`}>
              Data Scientist
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#EFE6DD] text-[#111111] font-sans selection:bg-[#9A0002]/20 selection:text-[#9A0002]">
      {/* Header */}
      <header className="sticky top-0 z-40 w-full bg-[#EFE6DD]/90 backdrop-blur-md border-b border-[#D8CFC5]">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-3 cursor-pointer group" onClick={() => navigateToPage('home')}>
            <div className="w-10 h-10 rounded-xl bg-[#9A0002] text-white flex items-center justify-center font-display font-black text-lg group-hover:scale-105 transition-transform shadow-md">
              VD
            </div>
            <div>
              <p className="font-display font-bold text-[#111111] leading-none group-hover:text-[#9A0002] transition-colors">Vivekanand</p>
              <p className="text-[10px] font-bold text-[#6B6B6B] uppercase tracking-widest mt-1">Portfolio</p>
            </div>
          </div>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-2 p-1.5 bg-white rounded-xl border border-[#D8CFC5] shadow-sm">
            {[
              { id: 'home', label: 'Home' },
              { id: 'about', label: 'About' },
              { id: 'projects', label: 'Projects' },
              { id: 'experience', label: 'Experience' },
              { id: 'contact', label: 'Contact' }
            ].map(p => (
              <button key={p.id} onClick={() => navigateToPage(p.id)}
                className={`px-5 py-2 rounded-lg text-sm font-bold transition-all ${currentPage === p.id ? 'bg-[#9A0002] text-white shadow-md' : 'text-[#6B6B6B] hover:text-[#9A0002] hover:bg-[#FAF7F4]'}`}
              >
                {p.label}
              </button>
            ))}
          </nav>

          {/* Social Icons & Mobile Menu */}
          <div className="flex items-center gap-3">
            <a href="https://linkedin.com/in/vivekdhavali/" target="_blank" rel="noreferrer" className="hidden sm:flex items-center justify-center w-10 h-10 rounded-xl border border-[#D8CFC5] bg-white text-[#111111] hover:bg-[#9A0002] hover:text-white hover:border-[#9A0002] transition-all shadow-sm">
              <Linkedin className="w-4 h-4" />
            </a>
            <button className="md:hidden w-10 h-10 flex items-center justify-center rounded-xl border border-[#D8CFC5] bg-white text-[#111111] shadow-sm" onClick={() => setMenuOpen(!menuOpen)}>
              {menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu Dropdown */}
      {menuOpen && (
        <div className="md:hidden fixed inset-0 z-30 pt-20 bg-[#EFE6DD]/95 backdrop-blur-lg">
          <div className="p-6 space-y-3">
            {[
              { id: 'home', label: 'Home' },
              { id: 'about', label: 'About & Skills' },
              { id: 'projects', label: 'Projects' },
              { id: 'experience', label: 'Experience' },
              { id: 'contact', label: 'Contact' }
            ].map(p => (
              <button key={p.id} onClick={() => navigateToPage(p.id)}
                className={`w-full text-left px-6 py-4 rounded-2xl text-lg font-display font-bold transition-all border ${currentPage === p.id ? 'bg-[#9A0002] text-white border-[#9A0002] shadow-md' : 'bg-white text-[#111111] border-[#D8CFC5] hover:border-[#9A0002] hover:text-[#9A0002]'}`}>
                {p.label}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Main Content Area */}
      <main className={`max-w-7xl mx-auto px-6 py-12 transition-opacity duration-300 ${isTransitioning ? 'opacity-0' : 'opacity-100'}`}>
        {currentPage === 'home' && renderHome()}
        {currentPage === 'about' && renderAbout()}
        {currentPage === 'projects' && renderProjects()}
        {currentPage === 'experience' && renderExperience()}
        {currentPage === 'contact' && renderContact()}
      </main>

      {/* Project Detail Modal */}
      {selectedProject && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#111111]/60 backdrop-blur-sm" onClick={() => setSelectedProject(null)}>
          <div className="bg-white rounded-3xl max-w-3xl w-full max-h-[90vh] overflow-y-auto shadow-2xl" onClick={e => e.stopPropagation()}>
            <div className="sticky top-0 bg-white/95 backdrop-blur border-b border-[#D8CFC5] p-6 flex items-center justify-between z-10">
              <span className="px-3 py-1.5 rounded-md bg-[#FAF7F4] border border-[#D8CFC5] text-[10px] font-bold text-[#111111] uppercase tracking-wider">
                {selectedProject.category}
              </span>
              <button onClick={() => setSelectedProject(null)} className="p-2 rounded-full hover:bg-[#FAF7F4] hover:text-[#9A0002] hover:scale-105 text-[#111111] transition-all">
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-8 space-y-8">
              <div>
                <h2 className="font-display text-3xl font-black text-[#111111] mb-2 leading-tight">{selectedProject.title}</h2>
                <p className="text-xs font-bold text-[#9A0002] uppercase tracking-wider">Client: {selectedProject.client}</p>
              </div>
              <div className="space-y-8 text-[#3F3F3F] leading-relaxed">
                <div>
                  <h4 className="text-xs font-bold text-[#111111] uppercase tracking-wider mb-3">The Challenge</h4>
                  <p>{selectedProject.problem}</p>
                </div>
                <div>
                  <h4 className="text-xs font-bold text-[#111111] uppercase tracking-wider mb-3">The Solution</h4>
                  <p>{selectedProject.solution}</p>
                </div>
                <div className="bg-[#FAF7F4] rounded-2xl p-6 border border-[#D8CFC5]">
                  <h4 className="text-xs font-bold text-[#111111] uppercase tracking-wider mb-4">Business Impact</h4>
                  <ul className="space-y-3">
                    {selectedProject.impact.map((imp, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <CheckCircle className="w-5 h-5 text-[#9A0002] flex-shrink-0" />
                        <span className="font-medium text-[#111111]">{imp}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              <div className="pt-8 border-t border-[#D8CFC5]">
                <h4 className="text-xs font-bold text-[#111111] uppercase tracking-wider mb-4">Technologies Used</h4>
                <div className="flex flex-wrap gap-2">
                  {selectedProject.tech.map((t, i) => (
                    <span key={i} className="px-3 py-1.5 rounded-lg border border-[#D8CFC5] bg-white text-xs font-bold text-[#111111]">
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Success Modal */}
      {formSubmitted && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#111111]/60 backdrop-blur-sm">
          <div className="bg-white rounded-3xl p-8 max-w-sm w-full text-center shadow-2xl">
            <div className="w-16 h-16 rounded-full bg-[#FAF7F4] border border-[#D8CFC5] flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="w-8 h-8 text-[#9A0002]" />
            </div>
            <h3 className="font-display text-2xl font-black text-[#111111] mb-2">Message Sent</h3>
            <p className="text-[#3F3F3F] mb-8">Thank you for reaching out. I will get back to you shortly.</p>
            <button onClick={() => setFormSubmitted(false)} className="w-full px-6 py-3.5 rounded-xl bg-[#9A0002] text-white font-bold hover:scale-[1.02] hover:bg-[#7A0002] transition-all">
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
