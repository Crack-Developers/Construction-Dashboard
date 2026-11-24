import { useState } from 'react';
import { 
  Laptop, 
  Tablet, 
  Smartphone, 
  ExternalLink, 
  Phone, 
  Check, 
  ChevronRight, 
  Star, 
  MapPin, 
  Clock, 
  DollarSign, 
  HardHat, 
  ShieldCheck, 
  ArrowRight,
  Maximize2,
  X,
  Send,
  Sparkles
} from 'lucide-react';
import { useDashboard } from '../context/DashboardContext';

export default function WebsitePreview() {
  const { data, showToast, setActiveTab } = useDashboard();

  const [viewport, setViewport] = useState('desktop'); // 'desktop' | 'tablet' | 'mobile'
  const [selectedProject, setSelectedProject] = useState(null);
  const [activeFaq, setActiveFaq] = useState(null);

  // Form state for interactive quote request
  const [quoteForm, setQuoteForm] = useState({
    name: '',
    email: '',
    phone: '',
    service: 'Renovations & Remodeling',
    budget: '$10K+',
    message: ''
  });

  const featuredProjects = data.projects.filter(p => p.featured);
  const displayProjects = featuredProjects.length > 0 ? featuredProjects : data.projects.slice(0, 4);

  const handleQuoteSubmit = (e) => {
    e.preventDefault();
    if (!quoteForm.name || !quoteForm.phone) return;

    // Simulate inquiry submission into dashboard
    const newInquiry = {
      id: `inq-${Date.now()}`,
      clientName: quoteForm.name,
      email: quoteForm.email || 'client@example.com',
      phone: quoteForm.phone,
      service: quoteForm.service,
      budget: quoteForm.budget,
      targetDate: 'Next Month',
      address: 'Bay Area, CA',
      message: quoteForm.message || 'Interested in consultation.',
      status: 'New',
      date: new Date().toISOString().split('T')[0]
    };

    data.inquiries.unshift(newInquiry);
    showToast(`Lead received from ${quoteForm.name}! Added to Quote Inquiries.`);
    setQuoteForm({
      name: '',
      email: '',
      phone: '',
      service: 'Renovations & Remodeling',
      budget: '$10K+',
      message: ''
    });
  };

  const getViewportWidth = () => {
    switch (viewport) {
      case 'mobile': return 'max-w-[390px]';
      case 'tablet': return 'max-w-[768px]';
      default: return 'max-w-6xl';
    }
  };

  return (
    <div className="bg-slate-900 min-h-screen p-4 sm:p-8 flex flex-col items-center">
      {/* Top Device Bar */}
      <div className="w-full max-w-6xl flex items-center justify-between bg-slate-950 border border-slate-800 rounded-xl p-3 mb-6 shadow-xl">
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 rounded-full bg-rose-500"></span>
          <span className="w-3 h-3 rounded-full bg-amber-500"></span>
          <span className="w-3 h-3 rounded-full bg-emerald-500"></span>
          <span className="text-xs font-mono text-slate-400 ml-2 hidden sm:inline">
            https://gridfly.framer.website/ (Live Dynamic Simulation)
          </span>
        </div>

        {/* Viewport switchers */}
        <div className="flex items-center bg-slate-900 p-1 rounded-lg border border-slate-800">
          <button
            onClick={() => setViewport('desktop')}
            className={`p-1.5 rounded transition-colors ${
              viewport === 'desktop' ? 'bg-amber-500 text-slate-950 font-bold' : 'text-slate-400 hover:text-white'
            }`}
            title="Desktop View (1200px)"
          >
            <Laptop className="w-4 h-4" />
          </button>
          <button
            onClick={() => setViewport('tablet')}
            className={`p-1.5 rounded transition-colors ${
              viewport === 'tablet' ? 'bg-amber-500 text-slate-950 font-bold' : 'text-slate-400 hover:text-white'
            }`}
            title="Tablet View (768px)"
          >
            <Tablet className="w-4 h-4" />
          </button>
          <button
            onClick={() => setViewport('mobile')}
            className={`p-1.5 rounded transition-colors ${
              viewport === 'mobile' ? 'bg-amber-500 text-slate-950 font-bold' : 'text-slate-400 hover:text-white'
            }`}
            title="Mobile View (375px)"
          >
            <Smartphone className="w-4 h-4" />
          </button>
        </div>

        <button
          onClick={() => setActiveTab('projects')}
          className="text-xs font-mono text-amber-400 hover:text-amber-300 flex items-center gap-1 font-bold"
        >
          <span>Back to CMS</span>
        </button>
      </div>

      {/* Frame Container simulating GridFly Framer site */}
      <div className={`w-full ${getViewportWidth()} transition-all duration-300 bg-[#f4f5fc] text-slate-900 rounded-2xl shadow-2xl overflow-hidden border border-slate-800 font-sans`}>
        {/* Top Announcement */}
        {data.siteSettings.bannerAnnouncement && (
          <div className="bg-slate-950 text-white text-[11px] font-mono py-2 px-4 text-center border-b border-slate-800 flex items-center justify-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse"></span>
            <span>{data.siteSettings.bannerAnnouncement}</span>
          </div>
        )}

        {/* Navigation Bar */}
        <header className="sticky top-0 z-30 bg-white/90 backdrop-blur-md border-b border-slate-200/80 px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-md bg-slate-950 text-amber-400 flex items-center justify-center">
              <HardHat className="w-4 h-4" />
            </div>
            <span className="font-extrabold text-lg tracking-tight font-mono text-slate-950">
              {data.siteSettings.siteName}
            </span>
          </div>

          <nav className="hidden md:flex items-center gap-6 text-xs font-mono font-medium text-slate-600">
            <a href="#about" className="hover:text-slate-950 transition-colors">About Us</a>
            <a href="#services" className="hover:text-slate-950 transition-colors">Services</a>
            <a href="#workflow" className="hover:text-slate-950 transition-colors">Workflow</a>
            <a href="#projects" className="hover:text-slate-950 transition-colors font-bold text-amber-600">Projects.</a>
            <a href="#pricing" className="hover:text-slate-950 transition-colors">Pricing</a>
            <a href="#contact" className="hover:text-slate-950 transition-colors">Contact</a>
          </nav>

          <div className="flex items-center gap-3">
            <a
              href={`tel:${data.siteSettings.primaryPhone}`}
              className="hidden sm:flex items-center gap-1.5 text-xs font-mono text-slate-800 font-semibold"
            >
              <Phone className="w-3.5 h-3.5 text-amber-500" />
              <span>{data.siteSettings.primaryPhone}</span>
            </a>
            <a
              href="#contact"
              className="px-3.5 py-1.5 rounded-lg bg-slate-950 text-white hover:bg-slate-800 text-xs font-mono font-bold transition-colors"
            >
              {data.siteSettings.ctaText}
            </a>
          </div>
        </header>

        {/* HERO SECTION */}
        <section className="px-6 py-16 md:py-24 text-center max-w-4xl mx-auto space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-200/80 border border-slate-300 text-xs font-mono font-semibold text-slate-700">
            <ShieldCheck className="w-3.5 h-3.5 text-amber-600" />
            <span>{data.siteSettings.heroBadge}</span>
          </div>

          <h1 className="text-4xl sm:text-6xl font-black tracking-tight text-slate-950 leading-none">
            {data.siteSettings.tagline}
          </h1>

          <p className="text-base sm:text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed">
            {data.siteSettings.subtagline}
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
            <a
              href="#contact"
              className="px-6 py-3 rounded-xl bg-slate-950 hover:bg-slate-800 text-white font-mono text-xs font-bold shadow-xl transition-all"
            >
              {data.siteSettings.ctaText} →
            </a>
            <a
              href="#projects"
              className="px-6 py-3 rounded-xl bg-white hover:bg-slate-100 text-slate-950 border border-slate-300 font-mono text-xs font-bold transition-all"
            >
              Explore Portfolio
            </a>
          </div>

          {/* Trust Badges */}
          <div className="pt-8 flex flex-wrap items-center justify-center gap-6 text-xs font-mono text-slate-500">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
              <span>Licensed & Insured ({data.siteSettings.licenseNumber})</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-amber-500"></span>
              <span>Quality Work Guaranteed</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-sky-500"></span>
              <span>5-Star Rated Service</span>
            </div>
          </div>
        </section>

        {/* HERO IMAGE SHOWCASE */}
        <section className="px-6 pb-16">
          <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-slate-300 aspect-[16/9] bg-slate-900">
            <img
              src={displayProjects[0]?.coverImage || 'https://framerusercontent.com/images/105zO15MKPqahxW0hkKzQ2UbeU.png'}
              alt="GridFly Architecture"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent flex flex-col justify-end p-6 text-white">
              <span className="text-xs font-mono text-amber-400 uppercase font-bold">Featured Architectural Build</span>
              <h3 className="text-xl sm:text-2xl font-black">{displayProjects[0]?.title}</h3>
              <p className="text-xs text-slate-300 font-mono mt-0.5">{displayProjects[0]?.location} • {displayProjects[0]?.budget}</p>
            </div>
          </div>
        </section>

        {/* SERVICES SECTION */}
        <section id="services" className="px-6 py-16 bg-white border-y border-slate-200">
          <div className="max-w-5xl mx-auto space-y-10">
            <div className="text-center space-y-2">
              <span className="text-xs font-mono font-bold text-amber-600 uppercase tracking-wider">
                [ Built Right. Delivered On Time ]
              </span>
              <h2 className="text-3xl font-black text-slate-950">
                Services & What We Build
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {data.services.map((srv) => (
                <div
                  key={srv.id}
                  className="p-6 rounded-2xl border border-slate-200 bg-slate-50 hover:border-slate-400 transition-colors space-y-3"
                >
                  <h3 className="text-lg font-bold text-slate-950">{srv.title}</h3>
                  <p className="text-xs font-mono text-amber-600 font-semibold">{srv.tagline}</p>
                  <p className="text-xs text-slate-600 leading-relaxed">{srv.description}</p>
                  <div className="pt-2 space-y-1">
                    {srv.deliverables.map((d, i) => (
                      <div key={i} className="flex items-center gap-2 text-xs font-mono text-slate-700">
                        <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                        <span>{d}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 4-STEP PROCESS [ 01 - 04 ] */}
        <section id="workflow" className="px-6 py-16 bg-[#f4f5fc]">
          <div className="max-w-5xl mx-auto space-y-10">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
              <div>
                <span className="text-xs font-mono font-bold text-amber-600">
                  [ How We Work ]
                </span>
                <h2 className="text-3xl font-black text-slate-950 mt-1">
                  Our 4-Step Process
                </h2>
              </div>
              <span className="text-xs font-mono text-slate-500">
                Proven quality. Trusted by thousands.
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {data.processSteps.map((step) => (
                <div
                  key={step.step}
                  className="bg-white p-5 rounded-2xl border border-slate-200 space-y-3 shadow-sm"
                >
                  <span className="text-3xl font-black font-mono text-slate-950">
                    {step.step}
                  </span>
                  <h4 className="font-bold text-sm text-slate-950">{step.title}</h4>
                  <p className="text-xs text-slate-600 leading-relaxed">{step.summary}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* MAIN PROJECTS SHOWCASE [ 01 - 04 ] (HIGHLIGHT OF GRIDFLY) */}
        <section id="projects" className="px-6 py-16 bg-white border-y border-slate-200">
          <div className="max-w-5xl mx-auto space-y-8">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-mono font-bold text-amber-600">
                    [ 01 - 04 ]
                  </span>
                  <span className="text-xs font-mono text-slate-500">Proven Results</span>
                </div>
                <h2 className="text-3xl font-black text-slate-950 mt-1">
                  Projects.
                </h2>
              </div>

              <div className="text-xs font-mono text-slate-500">
                Showing {displayProjects.length} featured construction builds
              </div>
            </div>

            {/* Grid of Projects */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {displayProjects.map((project, idx) => (
                <div
                  key={project.id}
                  onClick={() => setSelectedProject(project)}
                  className="group bg-slate-50 rounded-2xl border border-slate-200 overflow-hidden cursor-pointer hover:shadow-xl transition-all flex flex-col justify-between"
                >
                  <div>
                    {/* Cover Photo */}
                    <div className="relative aspect-[16/10] overflow-hidden bg-slate-900">
                      <img
                        src={project.coverImage}
                        alt={project.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute top-3 left-3 flex items-center gap-1.5">
                        <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-slate-950/80 text-amber-400 backdrop-blur-md">
                          0{idx + 1}
                        </span>
                        <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-950/80 text-white backdrop-blur-md">
                          {project.category}
                        </span>
                      </div>
                      <div className="absolute top-3 right-3">
                        <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-emerald-500 text-white">
                          {project.status}
                        </span>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-5 space-y-3">
                      <div>
                        <h3 className="font-extrabold text-base text-slate-950 group-hover:text-amber-600 transition-colors">
                          {project.title}
                        </h3>
                        <div className="flex items-center gap-2 text-xs font-mono text-slate-500 mt-0.5">
                          <MapPin className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                          <span>{project.location}</span>
                          <span>•</span>
                          <span>{project.timeline}</span>
                        </div>
                      </div>

                      <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                        {project.description}
                      </p>

                      <div className="grid grid-cols-2 gap-2 p-2.5 bg-white rounded-xl border border-slate-200 text-xs font-mono">
                        <div>
                          <span className="text-[9px] uppercase text-slate-400 block">Budget Range</span>
                          <span className="font-bold text-slate-900">{project.budget}</span>
                        </div>
                        <div>
                          <span className="text-[9px] uppercase text-slate-400 block">Duration</span>
                          <span className="font-bold text-slate-900">{project.duration}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="p-4 border-t border-slate-200 flex items-center justify-between text-xs font-mono font-bold text-amber-600">
                    <span>View Project Specs</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* METRICS & KEY STATS */}
        <section className="px-6 py-12 bg-slate-950 text-white">
          <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            {data.stats.slice(0, 4).map((s) => (
              <div key={s.id} className="space-y-1">
                <span className="text-3xl sm:text-4xl font-black font-mono text-amber-400">
                  {s.value}
                </span>
                <p className="text-xs font-bold text-white">{s.label}</p>
                <p className="text-[10px] text-slate-400 font-mono">{s.detail}</p>
              </div>
            ))}
          </div>
        </section>

        {/* PRICING PLANS */}
        <section id="pricing" className="px-6 py-16 bg-white">
          <div className="max-w-4xl mx-auto space-y-10">
            <div className="text-center space-y-2">
              <span className="text-xs font-mono font-bold text-amber-600 uppercase">
                [ Clear Pricing ]
              </span>
              <h2 className="text-3xl font-black text-slate-950">
                Pricing.
              </h2>
              <p className="text-xs text-slate-500 max-w-lg mx-auto">
                Built around your scope, timeline, and materials with clear estimates before work begins.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {data.pricing.map((plan) => (
                <div
                  key={plan.id}
                  className={`p-6 rounded-2xl border ${
                    plan.popular ? 'border-amber-500 bg-amber-50/20 shadow-lg' : 'border-slate-200 bg-slate-50'
                  } space-y-5 flex flex-col justify-between`}
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <h3 className="text-xl font-extrabold text-slate-950">{plan.name}</h3>
                      {plan.popular && (
                        <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-amber-500 text-slate-950">
                          Popular
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-slate-600">{plan.tagline}</p>
                    <div className="space-y-2 pt-2">
                      {plan.features.map((feat, i) => (
                        <div key={i} className="flex items-center gap-2 text-xs font-mono text-slate-700">
                          <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                          <span>{feat}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <a
                    href="#contact"
                    className="w-full py-2.5 rounded-xl bg-slate-950 hover:bg-slate-800 text-white font-mono text-xs font-bold text-center block transition-colors mt-4"
                  >
                    {plan.ctaText}
                  </a>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* TESTIMONIALS */}
        <section className="px-6 py-16 bg-[#f4f5fc] border-t border-slate-200">
          <div className="max-w-4xl mx-auto space-y-8">
            <div className="text-center space-y-2">
              <span className="text-xs font-mono font-bold text-amber-600">
                [ {data.siteSettings.trustRating} ]
              </span>
              <h2 className="text-3xl font-black text-slate-950">
                Testimonials
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {data.testimonials.map((test) => (
                <div key={test.id} className="p-5 bg-white rounded-2xl border border-slate-200 space-y-3 shadow-sm">
                  <p className="text-xs text-slate-700 leading-relaxed italic">
                    "{test.content}"
                  </p>
                  <div className="flex items-center gap-3 pt-2 border-t border-slate-100">
                    <img src={test.avatar} alt={test.name} className="w-9 h-9 rounded-full object-cover" />
                    <div>
                      <p className="font-bold text-xs text-slate-950">{test.name}</p>
                      <p className="text-[10px] font-mono text-slate-400">{test.handle} • {test.role}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* SERVICE AREAS MAP */}
        <section className="px-6 py-12 bg-white border-t border-slate-200 text-center">
          <div className="max-w-3xl mx-auto space-y-4">
            <span className="text-xs font-mono font-bold text-amber-600 uppercase">
              Areas We Build
            </span>
            <h3 className="text-2xl font-black text-slate-950">
              Proudly Serving the Bay Area
            </h3>
            <p className="text-xs text-slate-500 font-mono">
              Local crews • Local knowledge • Faster results
            </p>
            <div className="flex flex-wrap justify-center gap-2 pt-2">
              {data.serviceAreas.map(city => (
                <span key={city} className="px-3 py-1 bg-slate-100 rounded-lg text-xs font-mono text-slate-700 border border-slate-200">
                  {city}
                </span>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ ACCORDION */}
        <section className="px-6 py-16 bg-[#f4f5fc] border-t border-slate-200">
          <div className="max-w-2xl mx-auto space-y-6">
            <div className="text-center space-y-1">
              <span className="text-xs font-mono font-bold text-amber-600 uppercase">Help Center</span>
              <h2 className="text-2xl font-black text-slate-950">FAQ.</h2>
            </div>

            <div className="space-y-2">
              {data.faqs.map((faq) => {
                const isOpen = activeFaq === faq.id;
                return (
                  <div key={faq.id} className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm">
                    <button
                      onClick={() => setActiveFaq(isOpen ? null : faq.id)}
                      className="w-full p-4 text-left font-bold text-xs text-slate-950 flex items-center justify-between"
                    >
                      <span>{faq.question}</span>
                      <ChevronRight className={`w-4 h-4 text-slate-400 transition-transform ${isOpen ? 'rotate-90' : ''}`} />
                    </button>
                    {isOpen && (
                      <div className="p-4 pt-0 text-xs text-slate-600 leading-relaxed border-t border-slate-100 font-sans">
                        {faq.answer}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* CONTACT & FREE ESTIMATE FORM */}
        <section id="contact" className="px-6 py-16 bg-white border-t border-slate-200">
          <div className="max-w-xl mx-auto space-y-6 text-center">
            <span className="text-xs font-mono font-bold text-amber-600 uppercase">Contact</span>
            <h2 className="text-3xl font-black text-slate-950">
              Ready to Start Your Project?
            </h2>
            <p className="text-xs text-slate-600">
              Tell us about your build and receive a free consultation and estimate.
            </p>

            <form onSubmit={handleQuoteSubmit} className="bg-slate-50 p-6 rounded-2xl border border-slate-200 text-left space-y-4">
              <div className="space-y-1">
                <label className="text-[11px] font-mono uppercase text-slate-500">Your Full Name *</label>
                <input
                  type="text"
                  required
                  value={quoteForm.name}
                  onChange={(e) => setQuoteForm({ ...quoteForm, name: e.target.value })}
                  placeholder="e.g. David Henderson"
                  className="w-full px-3 py-2 rounded-lg border border-slate-300 bg-white text-xs font-mono focus:outline-none focus:ring-1 focus:ring-amber-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-[11px] font-mono uppercase text-slate-500">Phone Number *</label>
                  <input
                    type="tel"
                    required
                    value={quoteForm.phone}
                    onChange={(e) => setQuoteForm({ ...quoteForm, phone: e.target.value })}
                    placeholder="(415) 555-0198"
                    className="w-full px-3 py-2 rounded-lg border border-slate-300 bg-white text-xs font-mono focus:outline-none focus:ring-1 focus:ring-amber-500"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[11px] font-mono uppercase text-slate-500">Email Address</label>
                  <input
                    type="email"
                    value={quoteForm.email}
                    onChange={(e) => setQuoteForm({ ...quoteForm, email: e.target.value })}
                    placeholder="name@email.com"
                    className="w-full px-3 py-2 rounded-lg border border-slate-300 bg-white text-xs font-mono focus:outline-none focus:ring-1 focus:ring-amber-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-[11px] font-mono uppercase text-slate-500">Service</label>
                  <select
                    value={quoteForm.service}
                    onChange={(e) => setQuoteForm({ ...quoteForm, service: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg border border-slate-300 bg-white text-xs font-mono"
                  >
                    <option value="Renovations & Remodeling">Renovations & Remodeling</option>
                    <option value="General Construction">General Construction</option>
                    <option value="Planning & Preconstruction">Planning & Preconstruction</option>
                    <option value="New Builds">New Builds</option>
                  </select>
                </div>
                <div className="space-y-1">
                  <label className="text-[11px] font-mono uppercase text-slate-500">Budget Range</label>
                  <select
                    value={quoteForm.budget}
                    onChange={(e) => setQuoteForm({ ...quoteForm, budget: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg border border-slate-300 bg-white text-xs font-mono"
                  >
                    <option value="$1K-$5K">$1K - $5K</option>
                    <option value="$5K-$10K">$5K - $10K</option>
                    <option value="$10K+">$10K+</option>
                  </select>
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-[11px] font-mono uppercase text-slate-500">Project Details</label>
                <textarea
                  rows={2}
                  value={quoteForm.message}
                  onChange={(e) => setQuoteForm({ ...quoteForm, message: e.target.value })}
                  placeholder="Tell us about your property, desired timeline, or architectural plans..."
                  className="w-full px-3 py-2 rounded-lg border border-slate-300 bg-white text-xs"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 rounded-xl bg-slate-950 hover:bg-slate-800 text-white font-mono text-xs font-bold transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer"
              >
                <Send className="w-3.5 h-3.5 text-amber-400" />
                <span>Submit Estimate Request</span>
              </button>
            </form>
          </div>
        </section>

        {/* FOOTER */}
        <footer className="bg-slate-950 text-slate-400 px-6 py-12 text-xs font-mono border-t border-slate-800 text-center space-y-3">
          <p className="text-white font-bold">{data.siteSettings.siteName} • {data.siteSettings.tagline}</p>
          <p>{data.siteSettings.address} • {data.siteSettings.licenseNumber}</p>
          <p className="text-slate-400">© 2026 GridFly Construction Portal. All rights reserved.</p>
        </footer>
      </div>

      {/* Project Detail Modal inside Preview */}
      {selectedProject && (
        <div 
          className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in"
          onClick={() => setSelectedProject(null)}
        >
          <div 
            className="bg-white rounded-2xl max-w-2xl w-full overflow-hidden shadow-2xl space-y-4"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative aspect-[16/10] bg-slate-900">
              <img src={selectedProject.coverImage} alt={selectedProject.title} className="w-full h-full object-cover" />
              <button
                onClick={() => setSelectedProject(null)}
                className="absolute top-3 right-3 p-1.5 rounded-full bg-slate-950/70 text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 space-y-4">
              <div>
                <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-amber-500/20 text-amber-700">
                  {selectedProject.category}
                </span>
                <h3 className="text-2xl font-black text-slate-950 mt-1">{selectedProject.title}</h3>
                <p className="text-xs font-mono text-slate-500">{selectedProject.location} • {selectedProject.timeline}</p>
              </div>

              <p className="text-xs text-slate-700 leading-relaxed">
                {selectedProject.description}
              </p>

              <div className="grid grid-cols-3 gap-2 p-3 bg-slate-50 rounded-xl border border-slate-200 text-xs font-mono">
                <div>
                  <span className="text-[9px] uppercase text-slate-400 block">Budget</span>
                  <span className="font-bold text-slate-900">{selectedProject.budget}</span>
                </div>
                <div>
                  <span className="text-[9px] uppercase text-slate-400 block">Duration</span>
                  <span className="font-bold text-slate-900">{selectedProject.duration}</span>
                </div>
                <div>
                  <span className="text-[9px] uppercase text-slate-400 block">Area</span>
                  <span className="font-bold text-slate-900">{selectedProject.area}</span>
                </div>
              </div>

              {selectedProject.deliverables && (
                <div className="space-y-1">
                  <span className="text-[10px] font-mono uppercase text-slate-400 block">Deliverables</span>
                  <div className="space-y-1">
                    {selectedProject.deliverables.map((d, i) => (
                      <div key={i} className="flex items-center gap-1.5 text-xs font-mono text-slate-700">
                        <Check className="w-3.5 h-3.5 text-emerald-600" />
                        <span>{d}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
