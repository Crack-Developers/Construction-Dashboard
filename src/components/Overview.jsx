import { 
  FolderKanban, 
  Image, 
  Inbox, 
  CheckCircle, 
  ArrowUpRight, 
  Clock, 
  Sparkles, 
  Star, 
  Plus, 
  ExternalLink,
  ShieldCheck,
  TrendingUp,
  MapPin,
  DollarSign
} from 'lucide-react';
import { useDashboard } from '../context/DashboardContext';

export default function Overview({ onNewProject, onUploadMedia, onEditProject }) {
  const { data, setActiveTab, toggleFeaturedProject } = useDashboard();

  const totalProjects = data.projects?.length || 0;
  const featuredProjects = data.projects?.filter(p => p.featured) || [];
  const inProgressProjects = data.projects?.filter(p => p.status === 'In Progress') || [];
  const totalMedia = data.media?.length || 0;
  const newInquiries = data.inquiries?.filter(i => i.status === 'New') || [];

  return (
    <div className="p-8 space-y-8 max-w-7xl mx-auto">
      {/* Top Banner Notice */}
      <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 text-white rounded-2xl p-6 border border-slate-700/80 shadow-xl relative overflow-hidden">
        <div className="absolute right-0 top-0 bottom-0 w-1/3 opacity-10 bg-[radial-gradient(#f59e0b_1px,transparent_1px)] [background-size:16px_16px]"></div>
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1.5">
            <div className="flex items-center gap-2">
              <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-amber-500/20 text-amber-400 border border-amber-500/30">
                ACTIVE PRODUCTION CMS
              </span>
              <span className="text-xs font-mono text-slate-400">
                Target: https://gridfly.framer.website/
              </span>
            </div>
            <h2 className="text-2xl font-black tracking-tight text-white">
              {data.siteSettings.siteName} — {data.siteSettings.tagline}
            </h2>
            <p className="text-sm text-slate-300 max-w-2xl">
              {data.siteSettings.subtagline}
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={() => setActiveTab('preview')}
              className="px-4 py-2.5 rounded-lg bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs font-mono flex items-center gap-2 shadow-lg shadow-amber-500/20 transition-all cursor-pointer"
            >
              <ExternalLink className="w-4 h-4" />
              <span>Simulate Website</span>
            </button>
            <button
              onClick={onNewProject}
              className="px-4 py-2.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-white font-semibold text-xs font-mono border border-slate-700 flex items-center gap-2 transition-colors cursor-pointer"
            >
              <Plus className="w-4 h-4 text-amber-400" />
              <span>Add Project</span>
            </button>
          </div>
        </div>
      </div>

      {/* Primary Metrics Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-5 shadow-sm space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">
              Total Projects
            </span>
            <div className="w-8 h-8 rounded-lg bg-amber-500/10 text-amber-500 flex items-center justify-center">
              <FolderKanban className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-baseline justify-between">
            <span className="text-3xl font-black text-slate-900 dark:text-white font-mono">
              {totalProjects}
            </span>
            <span className="text-xs font-mono text-emerald-600 dark:text-emerald-400 font-semibold">
              {inProgressProjects.length} In Progress
            </span>
          </div>
          <div className="pt-2 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 font-mono">
            <span>Featured on site:</span>
            <span className="font-bold text-amber-600 dark:text-amber-400">
              {featuredProjects.length} / 4 slots
            </span>
          </div>
        </div>

        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-5 shadow-sm space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">
              Media Assets
            </span>
            <div className="w-8 h-8 rounded-lg bg-sky-500/10 text-sky-500 flex items-center justify-center">
              <Image className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-baseline justify-between">
            <span className="text-3xl font-black text-slate-900 dark:text-white font-mono">
              {totalMedia}
            </span>
            <span className="text-xs font-mono text-slate-400">
              High-res photos
            </span>
          </div>
          <div className="pt-2 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 font-mono">
            <span>Includes Blueprints:</span>
            <span className="font-bold text-sky-600 dark:text-sky-400">
              {data.media?.filter(m => m.category === 'Blueprints').length || 0} files
            </span>
          </div>
        </div>

        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-5 shadow-sm space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">
              Estimate Leads
            </span>
            <div className="w-8 h-8 rounded-lg bg-emerald-500/10 text-emerald-500 flex items-center justify-center">
              <Inbox className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-baseline justify-between">
            <span className="text-3xl font-black text-slate-900 dark:text-white font-mono">
              {data.inquiries?.length || 0}
            </span>
            <span className="text-xs font-mono text-amber-500 font-semibold">
              {newInquiries.length} New Requests
            </span>
          </div>
          <div className="pt-2 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 font-mono">
            <span>Latest budget request:</span>
            <span className="font-bold text-emerald-600 dark:text-emerald-400">$10K+</span>
          </div>
        </div>

        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-5 shadow-sm space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">
              On-Time Delivery
            </span>
            <div className="w-8 h-8 rounded-lg bg-indigo-500/10 text-indigo-500 flex items-center justify-center">
              <Clock className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-baseline justify-between">
            <span className="text-3xl font-black text-slate-900 dark:text-white font-mono">
              98%
            </span>
            <span className="text-xs font-mono text-indigo-500 font-semibold">
              Industry Leading
            </span>
          </div>
          <div className="pt-2 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 font-mono">
            <span>Kitchen Avg Timeline:</span>
            <span className="font-bold text-indigo-600 dark:text-indigo-400">6-Week</span>
          </div>
        </div>
      </div>

      {/* Featured Projects Showcase (GridFly [ 01 - 04 ]) */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono font-bold text-amber-600 dark:text-amber-400">
                [ 01 - 04 ]
              </span>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                Featured on GridFly Homepage
              </h3>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              These projects are displayed in the main GridFly portfolio showcase
            </p>
          </div>

          <button
            onClick={() => setActiveTab('projects')}
            className="text-xs font-mono font-semibold text-amber-600 dark:text-amber-400 hover:underline flex items-center gap-1"
          >
            Manage All Projects ({totalProjects}) <ArrowUpRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {featuredProjects.slice(0, 4).map((project, idx) => (
            <div
              key={project.id}
              className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow group flex flex-col justify-between"
            >
              <div>
                {/* Image container */}
                <div className="relative aspect-[16/10] overflow-hidden bg-slate-100 dark:bg-slate-800">
                  <img
                    src={project.coverImage}
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-2.5 left-2.5 flex items-center gap-1.5">
                    <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-slate-950/80 text-amber-400 backdrop-blur-md">
                      0{idx + 1}
                    </span>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-950/80 text-white backdrop-blur-md">
                      {project.category}
                    </span>
                  </div>
                  <div className="absolute top-2.5 right-2.5">
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/90 text-white font-semibold shadow">
                      {project.status}
                    </span>
                  </div>
                </div>

                {/* Details */}
                <div className="p-4 space-y-2.5">
                  <div>
                    <h4 className="font-bold text-sm text-slate-900 dark:text-white line-clamp-1">
                      {project.title}
                    </h4>
                    <div className="flex items-center gap-1 text-xs text-slate-500 dark:text-slate-400 font-mono mt-0.5">
                      <MapPin className="w-3 h-3 text-amber-500 shrink-0" />
                      <span>{project.location}</span>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-2 text-[11px] font-mono bg-slate-50 dark:bg-slate-800/60 p-2 rounded-lg border border-slate-100 dark:border-slate-800">
                    <div>
                      <span className="text-slate-400 block text-[9px] uppercase">Budget</span>
                      <span className="font-bold text-slate-700 dark:text-slate-200">{project.budget}</span>
                    </div>
                    <div>
                      <span className="text-slate-400 block text-[9px] uppercase">Timeline</span>
                      <span className="font-bold text-slate-700 dark:text-slate-200">{project.duration || '6 Weeks'}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Actions Footer */}
              <div className="px-4 pb-4 pt-1 flex items-center justify-between border-t border-slate-100 dark:border-slate-800">
                <button
                  onClick={() => onEditProject(project)}
                  className="text-xs font-mono font-semibold text-amber-600 dark:text-amber-400 hover:text-amber-500 transition-colors cursor-pointer"
                >
                  Edit Project
                </button>
                <button
                  onClick={() => toggleFeaturedProject(project.id)}
                  className="text-xs font-mono text-slate-400 hover:text-slate-600 dark:hover:text-slate-300"
                  title="Remove from featured slots"
                >
                  Unfeature
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Two Column Section: Recent Inquiries & Quick Media Assets */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Inquiries */}
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-5 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Inbox className="w-4 h-4 text-amber-500" />
              <h3 className="font-bold text-base text-slate-900 dark:text-white">
                Recent Quote Inquiries
              </h3>
            </div>
            <button
              onClick={() => setActiveTab('inquiries')}
              className="text-xs font-mono font-semibold text-amber-600 dark:text-amber-400 hover:underline"
            >
              View All
            </button>
          </div>

          <div className="space-y-3">
            {data.inquiries?.slice(0, 3).map((inq) => (
              <div
                key={inq.id}
                className="p-3.5 rounded-lg bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-800 flex items-start justify-between gap-3"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-xs text-slate-900 dark:text-white">
                      {inq.clientName}
                    </span>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20 font-medium">
                      {inq.service}
                    </span>
                  </div>
                  <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-1">
                    "{inq.message}"
                  </p>
                  <div className="text-[10px] font-mono text-slate-400 flex items-center gap-3">
                    <span>Budget: <strong className="text-slate-700 dark:text-slate-300">{inq.budget}</strong></span>
                    <span>•</span>
                    <span>{inq.phone}</span>
                  </div>
                </div>

                <span className={`text-[10px] font-mono px-2 py-0.5 rounded font-semibold ${
                  inq.status === 'New' 
                    ? 'bg-amber-500 text-slate-950' 
                    : 'bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300'
                }`}>
                  {inq.status}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Media Assets Quick Tray */}
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-5 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Image className="w-4 h-4 text-sky-500" />
              <h3 className="font-bold text-base text-slate-900 dark:text-white">
                Latest Media Library Assets
              </h3>
            </div>
            <button
              onClick={() => setActiveTab('media')}
              className="text-xs font-mono font-semibold text-sky-600 dark:text-sky-400 hover:underline"
            >
              Open Gallery
            </button>
          </div>

          <div className="grid grid-cols-4 gap-3">
            {data.media?.slice(0, 4).map((med) => (
              <div
                key={med.id}
                className="group relative aspect-square rounded-lg overflow-hidden bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700"
              >
                <img
                  src={med.url}
                  alt={med.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-slate-950/70 opacity-0 group-hover:opacity-100 transition-opacity p-2 flex flex-col justify-end text-white">
                  <p className="text-[10px] font-bold truncate">{med.title}</p>
                  <p className="text-[8px] font-mono text-slate-300">{med.format} • {med.size}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="pt-2 flex items-center justify-between text-xs font-mono">
            <span className="text-slate-500 dark:text-slate-400">
              Need to add more high-res photos?
            </span>
            <button
              onClick={onUploadMedia}
              className="text-amber-600 dark:text-amber-400 hover:underline font-semibold flex items-center gap-1"
            >
              <Plus className="w-3.5 h-3.5" /> Upload Photo
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
