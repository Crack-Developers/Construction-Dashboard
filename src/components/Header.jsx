import { Plus, Upload, Globe, Search, Bell } from 'lucide-react';
import { useDashboard } from '../context/DashboardContext';

export default function Header({ onNewProject, onUploadMedia }) {
  const { activeTab, setActiveTab, data } = useDashboard();

  const getTabTitle = () => {
    switch (activeTab) {
      case 'overview':
        return { title: 'Dashboard Overview', subtitle: 'Real-time telemetry and management metrics for GridFly' };
      case 'projects':
        return { title: 'Projects Portfolio', subtitle: 'Manage showcase builds, categories, budgets, and deliverables' };
      case 'media':
        return { title: 'Media & Asset Library', subtitle: 'High-resolution construction photos, blueprints, and hero graphics' };
      case 'content':
        return { title: 'Website Content Editor', subtitle: 'Customize hero copy, services, 4-step workflow, pricing & FAQs' };
      case 'inquiries':
        return { title: 'Quote Inquiries & Leads', subtitle: 'Client estimate requests submitted via the GridFly website' };
      case 'preview':
        return { title: 'Live Framer Website Preview', subtitle: 'Interactive live simulation of the GridFly construction portal' };
      default:
        return { title: 'GridFly CMS', subtitle: 'Administration console' };
    }
  };

  const { title, subtitle } = getTabTitle();
  const newInquiriesCount = data.inquiries?.filter(i => i.status === 'New').length || 0;

  return (
    <header className="h-18 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 px-8 flex items-center justify-between sticky top-0 z-20 backdrop-blur-md bg-white/90 dark:bg-slate-900/90 transition-colors">
      <div>
        <div className="flex items-center gap-2">
          <span className="text-xs font-mono font-medium text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-500/10 px-2 py-0.5 rounded border border-amber-200 dark:border-amber-500/20">
            [ GridFly CMS ]
          </span>
          <h1 className="text-xl font-bold tracking-tight text-slate-900 dark:text-white">
            {title}
          </h1>
        </div>
        <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5 font-mono">
          {subtitle}
        </p>
      </div>

      <div className="flex items-center gap-3">
        {/* Quick Actions */}
        <button
          onClick={onNewProject}
          className="flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs font-mono shadow-md shadow-amber-500/20 transition-all cursor-pointer active:scale-95"
        >
          <Plus className="w-4 h-4 stroke-[2.5]" />
          <span>New Project</span>
        </button>

        <button
          onClick={onUploadMedia}
          className="flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 font-semibold text-xs font-mono border border-slate-200 dark:border-slate-700 transition-colors cursor-pointer"
        >
          <Upload className="w-3.5 h-3.5 text-sky-500" />
          <span>Add Images</span>
        </button>

        {activeTab !== 'preview' && (
          <button
            onClick={() => setActiveTab('preview')}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-slate-900 hover:bg-slate-800 dark:bg-slate-800 dark:hover:bg-slate-700 text-white font-semibold text-xs font-mono transition-colors cursor-pointer"
            title="Preview live site"
          >
            <Globe className="w-3.5 h-3.5 text-emerald-400" />
            <span>View Live Site</span>
          </button>
        )}

        {/* Notifications Icon */}
        <button
          onClick={() => setActiveTab('inquiries')}
          className="relative p-2 rounded-lg text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          title={`${newInquiriesCount} new quote requests`}
        >
          <Bell className="w-4 h-4" />
          {newInquiriesCount > 0 && (
            <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-amber-500 animate-pulse"></span>
          )}
        </button>
      </div>
    </header>
  );
}
