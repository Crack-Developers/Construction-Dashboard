import { 
  LayoutDashboard, 
  FolderKanban, 
  Image, 
  FileEdit, 
  Inbox, 
  Globe, 
  Sun, 
  Moon, 
  HardHat, 
  ArrowUpRight, 
  Download, 
  Upload, 
  RotateCcw,
  Sparkles
} from 'lucide-react';
import { useDashboard } from '../context/DashboardContext';

export default function Sidebar() {
  const { 
    activeTab, 
    setActiveTab, 
    theme, 
    toggleTheme, 
    data, 
    exportDataJSON, 
    importDataJSON, 
    resetToDefaults 
  } = useDashboard();

  const navItems = [
    {
      id: 'overview',
      label: 'Overview',
      icon: LayoutDashboard,
      badge: null
    },
    {
      id: 'projects',
      label: 'Projects',
      icon: FolderKanban,
      badge: data.projects?.length || 0,
      highlight: true
    },
    {
      id: 'media',
      label: 'Media Library',
      icon: Image,
      badge: data.media?.length || 0
    },
    {
      id: 'content',
      label: 'Website Content',
      icon: FileEdit,
      badge: null
    },
    {
      id: 'inquiries',
      label: 'Quote Inquiries',
      icon: Inbox,
      badge: data.inquiries?.filter(i => i.status === 'New').length || 0,
      badgeColor: 'bg-amber-500 text-slate-900'
    },
    {
      id: 'preview',
      label: 'Live Site Preview',
      icon: Globe,
      badge: 'Live',
      badgeColor: 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
    }
  ];

  const handleImportClick = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'application/json';
    input.onchange = (e) => {
      const file = e.target.files[0];
      if (file) importDataJSON(file);
    };
    input.click();
  };

  return (
    <aside className="w-64 bg-slate-950 text-slate-200 border-r border-slate-800/80 flex flex-col h-screen sticky top-0 shrink-0 select-none">
      {/* Brand Header */}
      <div className="p-5 border-b border-slate-800/80">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center text-slate-950 font-black shadow-lg shadow-amber-500/20">
              <HardHat className="w-5 h-5 text-slate-950" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-extrabold text-base tracking-tight text-white font-mono">GRIDFLY</span>
                <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-amber-500/10 text-amber-400 border border-amber-500/20">
                  CMS
                </span>
              </div>
              <p className="text-[11px] text-slate-400 font-mono tracking-wider">ADMIN CONSOLE</p>
            </div>
          </div>
        </div>

        {/* Framing & Sync Status */}
        <div className="mt-3.5 px-3 py-2 bg-slate-900/90 rounded-lg border border-slate-800 flex items-center justify-between text-xs">
          <div className="flex items-center gap-2">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <span className="text-slate-300 font-mono text-[11px]">Framer Live Synced</span>
          </div>
          <a
            href="https://gridfly.framer.website/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-amber-400 hover:text-amber-300 transition-colors flex items-center gap-0.5 text-[11px] font-mono"
            title="Open original Framer template"
          >
            Visit <ArrowUpRight className="w-3 h-3" />
          </a>
        </div>
      </div>

      {/* Main Navigation */}
      <nav className="flex-1 p-3 space-y-1 overflow-y-auto">
        <div className="px-3 pt-2 pb-1 text-[10px] font-mono uppercase tracking-wider text-slate-400">
          Management
        </div>

        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;

          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-lg text-sm font-medium transition-all duration-150 ${
                isActive
                  ? 'bg-amber-500 text-slate-950 font-semibold shadow-md shadow-amber-500/20'
                  : 'text-slate-300 hover:bg-slate-900 hover:text-white'
              }`}
            >
              <div className="flex items-center gap-3">
                <Icon className={`w-4 h-4 ${isActive ? 'text-slate-950' : 'text-slate-400'}`} />
                <span>{item.label}</span>
              </div>

              {item.badge !== null && item.badge !== undefined && (
                <span
                  className={`text-[11px] font-mono px-2 py-0.5 rounded-full ${
                    item.badgeColor || (isActive ? 'bg-slate-950 text-amber-400 font-bold' : 'bg-slate-800 text-slate-300')
                  }`}
                >
                  {item.badge}
                </span>
              )}
            </button>
          );
        })}
      </nav>

      {/* Backup, Tools & Theme Footer */}
      <div className="p-3 border-t border-slate-800/80 space-y-2 bg-slate-950/60">
        <div className="flex items-center justify-between px-1">
          <span className="text-[11px] font-mono text-slate-400 uppercase tracking-wider">Data Sync</span>
          <button
            onClick={toggleTheme}
            className="p-1.5 text-slate-400 hover:text-white hover:bg-slate-900 rounded-md transition-colors"
            title={`Switch to ${theme === 'dark' ? 'Light' : 'Dark'} mode`}
          >
            {theme === 'dark' ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-slate-300" />}
          </button>
        </div>

        <div className="grid grid-cols-2 gap-1.5 text-xs font-mono">
          <button
            onClick={exportDataJSON}
            className="flex items-center justify-center gap-1.5 py-1.5 px-2 bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white rounded border border-slate-800 transition-colors"
            title="Export all data to JSON"
          >
            <Download className="w-3 h-3 text-amber-400" /> Export
          </button>
          <button
            onClick={handleImportClick}
            className="flex items-center justify-center gap-1.5 py-1.5 px-2 bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white rounded border border-slate-800 transition-colors"
            title="Import data from JSON backup"
          >
            <Upload className="w-3 h-3 text-sky-400" /> Import
          </button>
        </div>

        <button
          onClick={resetToDefaults}
          className="w-full flex items-center justify-center gap-1.5 py-1 text-[11px] text-slate-400 hover:text-rose-400 transition-colors font-mono"
        >
          <RotateCcw className="w-3 h-3" /> Reset Template Data
        </button>

        <div className="pt-2 border-t border-slate-900 text-center">
          <p className="text-[10px] text-slate-400 font-mono">
            GridFly Framer CMS v2.4 • Built to Last
          </p>
        </div>
      </div>
    </aside>
  );
}
