import { useState } from 'react';
import { 
  FileEdit, 
  Settings, 
  Layers, 
  GitCommit, 
  DollarSign, 
  MessageSquare, 
  MapPin, 
  HelpCircle, 
  Save, 
  Plus, 
  Trash2, 
  Check, 
  Sparkles,
  Phone,
  Mail,
  Shield,
  Clock
} from 'lucide-react';
import { useDashboard } from '../context/DashboardContext';

export default function ContentEditor() {
  const { 
    data, 
    updateSiteSettings, 
    updateService, 
    updateProcessStep, 
    updatePricingPlan, 
    updateTestimonial,
    addTestimonial,
    deleteTestimonial,
    updateServiceAreas,
    updateFaq,
    addFaq,
    deleteFaq
  } = useDashboard();

  const [activeSection, setActiveSection] = useState('hero'); // 'hero' | 'services' | 'process' | 'pricing' | 'testimonials' | 'areas' | 'faq'
  const [siteForm, setSiteForm] = useState({ ...data.siteSettings });
  const [newCity, setNewCity] = useState('');

  const sections = [
    { id: 'hero', label: 'Hero & Company', icon: Settings },
    { id: 'services', label: 'Services (4)', icon: Layers },
    { id: 'process', label: 'Workflow (01-04)', icon: GitCommit },
    { id: 'pricing', label: 'Pricing Plans', icon: DollarSign },
    { id: 'testimonials', label: 'Testimonials', icon: MessageSquare },
    { id: 'areas', label: 'Service Areas', icon: MapPin },
    { id: 'faq', label: 'FAQ', icon: HelpCircle }
  ];

  const handleSaveSiteSettings = (e) => {
    e.preventDefault();
    updateSiteSettings(siteForm);
  };

  const handleAddCity = () => {
    if (!newCity.trim()) return;
    if (!data.serviceAreas.includes(newCity.trim())) {
      updateServiceAreas([...data.serviceAreas, newCity.trim()]);
    }
    setNewCity('');
  };

  const handleRemoveCity = (city) => {
    updateServiceAreas(data.serviceAreas.filter(c => c !== city));
  };

  return (
    <div className="p-8 space-y-6 max-w-7xl mx-auto">
      {/* Header */}
      <div>
        <div className="flex items-center gap-2.5">
          <h2 className="text-2xl font-black tracking-tight text-slate-900 dark:text-white font-mono">
            WEBSITE CONTENT EDITOR
          </h2>
          <span className="text-xs font-mono font-bold px-2 py-0.5 rounded bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20">
            Framer Live Content
          </span>
        </div>
        <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
          Directly update copy, services, step-by-step workflows, testimonials, pricing, and company contact details.
        </p>
      </div>

      {/* Section Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 border-b border-slate-200 dark:border-slate-800 scrollbar-none">
        {sections.map(s => {
          const Icon = s.icon;
          const isActive = activeSection === s.id;
          return (
            <button
              key={s.id}
              onClick={() => setActiveSection(s.id)}
              className={`flex items-center gap-2 px-4 py-2.5 text-xs font-mono font-semibold rounded-t-lg transition-all border-b-2 whitespace-nowrap cursor-pointer ${
                isActive
                  ? 'border-amber-500 text-amber-600 dark:text-amber-400 bg-amber-50/50 dark:bg-amber-500/10'
                  : 'border-transparent text-slate-500 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              <span>{s.label}</span>
            </button>
          );
        })}
      </div>

      {/* SECTION: HERO & GENERAL SETTINGS */}
      {activeSection === 'hero' && (
        <form onSubmit={handleSaveSiteSettings} className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 space-y-6 shadow-sm">
          <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-slate-800">
            <div>
              <h3 className="font-bold text-base text-slate-900 dark:text-white">
                Hero Section & Branding
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Primary headline, hero subtext, and call-to-actions shown on GridFly
              </p>
            </div>
            <button
              type="submit"
              className="flex items-center gap-2 px-4 py-2 rounded-lg bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs font-mono shadow-md shadow-amber-500/20 transition-all cursor-pointer"
            >
              <Save className="w-4 h-4" />
              <span>Save Changes</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="space-y-1.5">
              <label className="text-xs font-mono font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
                Brand / Company Name
              </label>
              <input
                type="text"
                value={siteForm.siteName}
                onChange={(e) => setSiteForm({ ...siteForm, siteName: e.target.value })}
                className="w-full px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white text-xs font-mono focus:ring-2 focus:ring-amber-500 focus:outline-none"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-mono font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
                Main Hero Headline
              </label>
              <input
                type="text"
                value={siteForm.tagline}
                onChange={(e) => setSiteForm({ ...siteForm, tagline: e.target.value })}
                placeholder="e.g. Built To Last"
                className="w-full px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white text-xs font-mono font-bold focus:ring-2 focus:ring-amber-500 focus:outline-none"
              />
            </div>

            <div className="space-y-1.5 md:col-span-2">
              <label className="text-xs font-mono font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
                Hero Subheadline / Value Proposition
              </label>
              <textarea
                rows={2}
                value={siteForm.subtagline}
                onChange={(e) => setSiteForm({ ...siteForm, subtagline: e.target.value })}
                className="w-full px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white text-xs focus:ring-2 focus:ring-amber-500 focus:outline-none"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-mono font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
                Primary CTA Button Label
              </label>
              <input
                type="text"
                value={siteForm.ctaText}
                onChange={(e) => setSiteForm({ ...siteForm, ctaText: e.target.value })}
                className="w-full px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white text-xs font-mono focus:ring-2 focus:ring-amber-500 focus:outline-none"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-mono font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
                Top Announcement Bar
              </label>
              <input
                type="text"
                value={siteForm.bannerAnnouncement}
                onChange={(e) => setSiteForm({ ...siteForm, bannerAnnouncement: e.target.value })}
                className="w-full px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white text-xs font-mono focus:ring-2 focus:ring-amber-500 focus:outline-none"
              />
            </div>
          </div>

          <div className="pt-4 border-t border-slate-100 dark:border-slate-800 space-y-4">
            <h4 className="font-bold text-sm text-slate-900 dark:text-white">
              Company Contact & Licensing
            </h4>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-1.5">
                <label className="text-xs font-mono font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
                  Primary Phone
                </label>
                <input
                  type="text"
                  value={siteForm.primaryPhone}
                  onChange={(e) => setSiteForm({ ...siteForm, primaryPhone: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white text-xs font-mono focus:ring-2 focus:ring-amber-500 focus:outline-none"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-mono font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
                  Direct Line
                </label>
                <input
                  type="text"
                  value={siteForm.secondaryPhone}
                  onChange={(e) => setSiteForm({ ...siteForm, secondaryPhone: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white text-xs font-mono focus:ring-2 focus:ring-amber-500 focus:outline-none"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-mono font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
                  License Number
                </label>
                <input
                  type="text"
                  value={siteForm.licenseNumber}
                  onChange={(e) => setSiteForm({ ...siteForm, licenseNumber: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white text-xs font-mono focus:ring-2 focus:ring-amber-500 focus:outline-none"
                />
              </div>

              <div className="space-y-1.5 md:col-span-2">
                <label className="text-xs font-mono font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
                  Office Address
                </label>
                <input
                  type="text"
                  value={siteForm.address}
                  onChange={(e) => setSiteForm({ ...siteForm, address: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white text-xs font-mono focus:ring-2 focus:ring-amber-500 focus:outline-none"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-mono font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
                  Contact Email
                </label>
                <input
                  type="email"
                  value={siteForm.email}
                  onChange={(e) => setSiteForm({ ...siteForm, email: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white text-xs font-mono focus:ring-2 focus:ring-amber-500 focus:outline-none"
                />
              </div>
            </div>
          </div>
        </form>
      )}

      {/* SECTION: SERVICES */}
      {activeSection === 'services' && (
        <div className="space-y-5">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-base text-slate-900 dark:text-white">
              GridFly Core Services ({data.services.length})
            </h3>
            <span className="text-xs font-mono text-slate-400">
              Changes reflect immediately on the site preview
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {data.services.map((srv) => (
              <div
                key={srv.id}
                className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-5 space-y-4 shadow-sm"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono font-bold text-amber-500">
                      [ {srv.id} ]
                    </span>
                    <input
                      type="text"
                      value={srv.title}
                      onChange={(e) => updateService(srv.id, { title: e.target.value })}
                      className="font-bold text-base text-slate-900 dark:text-white bg-transparent border-b border-transparent hover:border-slate-300 dark:hover:border-slate-700 focus:border-amber-500 focus:outline-none"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-[10px] font-mono uppercase text-slate-400">Tagline</label>
                  <input
                    type="text"
                    value={srv.tagline}
                    onChange={(e) => updateService(srv.id, { tagline: e.target.value })}
                    className="w-full px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-800 dark:text-slate-200 text-xs focus:ring-2 focus:ring-amber-500 focus:outline-none"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-[10px] font-mono uppercase text-slate-400">Description</label>
                  <textarea
                    rows={2}
                    value={srv.description}
                    onChange={(e) => updateService(srv.id, { description: e.target.value })}
                    className="w-full px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-800 dark:text-slate-200 text-xs focus:ring-2 focus:ring-amber-500 focus:outline-none"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-[10px] font-mono uppercase text-slate-400">Deliverables</label>
                  <div className="space-y-1">
                    {srv.deliverables.map((d, idx) => (
                      <div key={idx} className="flex items-center gap-1.5 text-xs font-mono">
                        <Check className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                        <span className="text-slate-700 dark:text-slate-300">{d}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* SECTION: 4-STEP PROCESS */}
      {activeSection === 'process' && (
        <div className="space-y-5">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-bold text-base text-slate-900 dark:text-white">
                Our 4-Step Process [ 01 - 04 ]
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                The structured workflow shown on the GridFly homepage
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {data.processSteps.map((step) => (
              <div
                key={step.step}
                className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-5 space-y-3 shadow-sm"
              >
                <div className="flex items-center justify-between">
                  <span className="text-2xl font-black font-mono text-amber-500">
                    {step.step}
                  </span>
                  <span className="text-[10px] font-mono text-slate-400 uppercase">Phase</span>
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] font-mono uppercase text-slate-400">Title</label>
                  <input
                    type="text"
                    value={step.title}
                    onChange={(e) => updateProcessStep(step.step, { title: e.target.value })}
                    className="w-full px-2.5 py-1.5 font-bold text-sm rounded border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-amber-500"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] font-mono uppercase text-slate-400">Summary</label>
                  <textarea
                    rows={3}
                    value={step.summary}
                    onChange={(e) => updateProcessStep(step.step, { summary: e.target.value })}
                    className="w-full px-2.5 py-1.5 text-xs rounded border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-300 focus:outline-none focus:ring-1 focus:ring-amber-500"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* SECTION: PRICING PLANS */}
      {activeSection === 'pricing' && (
        <div className="space-y-5">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-base text-slate-900 dark:text-white">
              Pricing Packages ("Essential" & "Renovation")
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {data.pricing.map((plan) => (
              <div
                key={plan.id}
                className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 space-y-4 shadow-sm"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <input
                      type="text"
                      value={plan.name}
                      onChange={(e) => updatePricingPlan(plan.id, { name: e.target.value })}
                      className="font-extrabold text-lg text-slate-900 dark:text-white bg-transparent border-b border-transparent hover:border-slate-300 focus:border-amber-500 focus:outline-none"
                    />
                    {plan.popular && (
                      <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-amber-500 text-slate-950">
                        Popular
                      </span>
                    )}
                  </div>
                  <span className="text-xs font-mono text-slate-400">{plan.cadence}</span>
                </div>

                <input
                  type="text"
                  value={plan.tagline}
                  onChange={(e) => updatePricingPlan(plan.id, { tagline: e.target.value })}
                  className="w-full px-3 py-1.5 text-xs rounded border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-600 dark:text-slate-300"
                />

                <div className="space-y-2 pt-2">
                  <span className="text-[10px] font-mono uppercase text-slate-400">Included Features</span>
                  <div className="space-y-1.5">
                    {plan.features.map((feat, i) => (
                      <div key={i} className="flex items-center gap-2 text-xs font-mono text-slate-700 dark:text-slate-300">
                        <Check className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-2">
                  <label className="text-[10px] font-mono uppercase text-slate-400 block mb-1">Button CTA Text</label>
                  <input
                    type="text"
                    value={plan.ctaText}
                    onChange={(e) => updatePricingPlan(plan.id, { ctaText: e.target.value })}
                    className="w-full px-3 py-2 text-xs font-mono font-bold rounded-lg border border-slate-300 dark:border-slate-700 bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* SECTION: TESTIMONIALS */}
      {activeSection === 'testimonials' && (
        <div className="space-y-5">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-bold text-base text-slate-900 dark:text-white">
                Client Reviews & Testimonials ({data.testimonials.length})
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Display verified client feedback with handles and ratings
              </p>
            </div>
            <button
              onClick={() => addTestimonial({ name: 'New Client', handle: '@client', content: 'Remarkable craftsmanship and timely delivery.' })}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-amber-500 text-slate-950 font-bold text-xs font-mono shadow-sm cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add Review</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {data.testimonials.map((test) => (
              <div
                key={test.id}
                className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-5 space-y-3 shadow-sm flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <img src={test.avatar} alt={test.name} className="w-10 h-10 rounded-full object-cover border border-slate-200 dark:border-slate-700" />
                      <div>
                        <input
                          type="text"
                          value={test.name}
                          onChange={(e) => updateTestimonial(test.id, { name: e.target.value })}
                          className="font-bold text-sm text-slate-900 dark:text-white bg-transparent border-b border-transparent hover:border-slate-300 focus:outline-none"
                        />
                        <input
                          type="text"
                          value={test.handle}
                          onChange={(e) => updateTestimonial(test.id, { handle: e.target.value })}
                          className="text-xs font-mono text-slate-400 block bg-transparent focus:outline-none"
                        />
                      </div>
                    </div>
                    <button
                      onClick={() => deleteTestimonial(test.id)}
                      className="p-1 text-slate-400 hover:text-rose-500"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>

                  <textarea
                    rows={3}
                    value={test.content}
                    onChange={(e) => updateTestimonial(test.id, { content: e.target.value })}
                    className="w-full px-3 py-2 text-xs rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-300 focus:ring-1 focus:ring-amber-500 focus:outline-none"
                  />
                </div>

                <div className="pt-2 text-xs text-amber-500 font-mono">
                  ★★★★★ (5.0 Rating)
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* SECTION: SERVICE AREAS */}
      {activeSection === 'areas' && (
        <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-6 space-y-4 shadow-sm">
          <div>
            <h3 className="font-bold text-base text-slate-900 dark:text-white">
              Areas We Build (Bay Area Service Locations)
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              Municipalities and regions featured in GridFly's coverage map
            </p>
          </div>

          <div className="flex gap-2 max-w-md">
            <input
              type="text"
              value={newCity}
              onChange={(e) => setNewCity(e.target.value)}
              onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); handleAddCity(); } }}
              placeholder="e.g. San Jose, Los Gatos, Tiburon"
              className="flex-1 px-3 py-2 text-xs font-mono rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-amber-500"
            />
            <button
              type="button"
              onClick={handleAddCity}
              className="px-4 py-2 rounded-lg bg-amber-500 text-slate-950 font-bold text-xs font-mono"
            >
              Add City
            </button>
          </div>

          <div className="flex flex-wrap gap-2 pt-2">
            {data.serviceAreas.map((city) => (
              <span
                key={city}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 text-xs font-mono border border-slate-200 dark:border-slate-700"
              >
                <MapPin className="w-3 h-3 text-amber-500" />
                <span>{city}</span>
                <button
                  type="button"
                  onClick={() => handleRemoveCity(city)}
                  className="text-slate-400 hover:text-red-500 ml-1"
                >
                  <Trash2 className="w-3 h-3" />
                </button>
              </span>
            ))}
          </div>
        </div>
      )}

      {/* SECTION: FAQ */}
      {activeSection === 'faq' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-base text-slate-900 dark:text-white">
              Frequently Asked Questions ({data.faqs.length})
            </h3>
            <button
              onClick={() => addFaq({ question: 'New Question', answer: 'Clear and detailed answer for prospective clients.' })}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-amber-500 text-slate-950 font-bold text-xs font-mono shadow-sm cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add FAQ</span>
            </button>
          </div>

          <div className="space-y-3">
            {data.faqs.map((faq) => (
              <div
                key={faq.id}
                className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-5 space-y-3 shadow-sm"
              >
                <div className="flex items-center justify-between gap-3">
                  <input
                    type="text"
                    value={faq.question}
                    onChange={(e) => updateFaq(faq.id, { question: e.target.value })}
                    className="flex-1 font-bold text-sm text-slate-900 dark:text-white bg-transparent border-b border-transparent hover:border-slate-300 focus:outline-none focus:border-amber-500"
                  />
                  <button
                    onClick={() => deleteFaq(faq.id)}
                    className="p-1 text-slate-400 hover:text-rose-500"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
                <textarea
                  rows={2}
                  value={faq.answer}
                  onChange={(e) => updateFaq(faq.id, { answer: e.target.value })}
                  className="w-full px-3 py-2 text-xs rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-300 focus:outline-none focus:ring-1 focus:ring-amber-500"
                />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
