import { useState } from 'react';
import { 
  Image as ImageIcon, 
  Upload, 
  Search, 
  Trash2, 
  Copy, 
  ExternalLink, 
  Tag, 
  Check, 
  Maximize2,
  FolderKanban,
  X
} from 'lucide-react';
import { useDashboard } from '../context/DashboardContext';

export default function MediaLibrary({ onUploadMedia }) {
  const { data, deleteMedia, showToast } = useDashboard();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [copiedId, setCopiedId] = useState(null);
  const [inspectImage, setInspectImage] = useState(null);

  const categories = ['All', 'Projects', 'Blueprints', 'Hero & Banners', 'Team', 'Before & After'];

  const filteredMedia = data.media.filter(item => {
    const matchesSearch = 
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (item.tags && item.tags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()))) ||
      (item.assignedTo && item.assignedTo.toLowerCase().includes(searchQuery.toLowerCase()));

    const matchesCategory = selectedCategory === 'All' || item.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  const handleCopyUrl = (item) => {
    navigator.clipboard.writeText(item.url);
    setCopiedId(item.id);
    showToast(`URL copied: "${item.title}"`);
    setTimeout(() => {
      setCopiedId(null);
    }, 2000);
  };

  return (
    <div className="p-8 space-y-6 max-w-7xl mx-auto">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2.5">
            <h2 className="text-2xl font-black tracking-tight text-slate-900 dark:text-white font-mono">
              MEDIA & ASSET LIBRARY
            </h2>
            <span className="text-xs font-mono font-bold px-2 py-0.5 rounded bg-sky-500/10 text-sky-600 dark:text-sky-400 border border-sky-500/20">
              {filteredMedia.length} Assets
            </span>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Manage high-definition project photography, architectural site plans, team portraits, and Framer hero graphics.
          </p>
        </div>

        <button
          onClick={onUploadMedia}
          className="flex items-center gap-2 px-4 py-2.5 rounded-lg bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs font-mono shadow-md shadow-amber-500/20 transition-all cursor-pointer"
        >
          <Upload className="w-4 h-4 stroke-[2.5]" />
          <span>Upload Image / Blueprint</span>
        </button>
      </div>

      {/* Toolbar */}
      <div className="bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-200 dark:border-slate-800 space-y-3.5 shadow-sm">
        <div className="relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search assets by title, tags (e.g. kitchen, pool), or assigned project..."
            className="w-full pl-9 pr-4 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white text-xs font-mono focus:ring-2 focus:ring-amber-500 focus:outline-none"
          />
        </div>

        {/* Categories */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1">
          <span className="text-[11px] font-mono text-slate-400 uppercase tracking-wider mr-1">
            Category:
          </span>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1 rounded-md text-xs font-mono transition-colors whitespace-nowrap ${
                selectedCategory === cat
                  ? 'bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900 font-bold'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Grid of Images */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
        {filteredMedia.map((item) => (
          <div
            key={item.id}
            className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all group flex flex-col justify-between"
          >
            <div>
              {/* Image Preview Container */}
              <div className="relative aspect-[16/11] bg-slate-950 overflow-hidden cursor-pointer" onClick={() => setInspectImage(item)}>
                <img
                  src={item.url}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />

                {/* Top badges */}
                <div className="absolute top-2.5 left-2.5">
                  <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-slate-950/80 text-white backdrop-blur-md">
                    {item.category}
                  </span>
                </div>

                <div className="absolute top-2.5 right-2.5">
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-950/80 text-amber-400 backdrop-blur-md">
                    {item.format}
                  </span>
                </div>

                {/* Zoom overlay */}
                <div className="absolute inset-0 bg-slate-950/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <span className="p-2 rounded-full bg-slate-900/80 text-white text-xs font-mono flex items-center gap-1.5 shadow-lg">
                    <Maximize2 className="w-3.5 h-3.5" /> Inspect Photo
                  </span>
                </div>
              </div>

              {/* Info Body */}
              <div className="p-3.5 space-y-2">
                <h4 className="font-bold text-xs text-slate-900 dark:text-white line-clamp-1" title={item.title}>
                  {item.title}
                </h4>

                <div className="flex items-center justify-between text-[10px] font-mono text-slate-400">
                  <span>{item.dimensions}</span>
                  <span>{item.size}</span>
                </div>

                {item.assignedTo && item.assignedTo !== 'General' && (
                  <div className="flex items-center gap-1 text-[10px] font-mono text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-500/10 px-2 py-1 rounded truncate">
                    <FolderKanban className="w-3 h-3 shrink-0" />
                    <span className="truncate">{item.assignedTo}</span>
                  </div>
                )}

                {item.tags && item.tags.length > 0 && (
                  <div className="flex flex-wrap gap-1 pt-1">
                    {item.tags.slice(0, 3).map((t, idx) => (
                      <span key={idx} className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-500">
                        #{t}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Quick Actions Footer */}
            <div className="p-2.5 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between bg-slate-50/50 dark:bg-slate-900/50">
              <button
                onClick={() => handleCopyUrl(item)}
                className={`flex items-center gap-1 text-[11px] font-mono px-2 py-1 rounded transition-colors ${
                  copiedId === item.id 
                    ? 'text-emerald-500 bg-emerald-50 dark:bg-emerald-500/10 font-bold' 
                    : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'
                }`}
                title="Copy direct URL"
              >
                {copiedId === item.id ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                <span>{copiedId === item.id ? 'Copied' : 'Copy URL'}</span>
              </button>

              <button
                onClick={() => {
                  if (window.confirm(`Delete image "${item.title}"?`)) {
                    deleteMedia(item.id);
                  }
                }}
                className="p-1.5 text-slate-400 hover:text-rose-500 rounded transition-colors"
                title="Delete asset"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Lightbox / Inspector Modal */}
      {inspectImage && (
        <div 
          className="fixed inset-0 z-50 bg-slate-950/85 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in"
          onClick={() => setInspectImage(null)}
        >
          <div 
            className="bg-slate-900 border border-slate-800 rounded-2xl max-w-4xl w-full overflow-hidden shadow-2xl flex flex-col md:flex-row"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Main Image View */}
            <div className="flex-1 bg-black flex items-center justify-center min-h-[350px] p-2 relative">
              <img
                src={inspectImage.url}
                alt={inspectImage.title}
                className="max-h-[75vh] w-auto object-contain rounded"
              />
            </div>

            {/* Inspector Details Sidebar */}
            <div className="w-full md:w-80 p-6 space-y-5 bg-slate-900 border-t md:border-t-0 md:border-l border-slate-800 text-white flex flex-col justify-between">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-amber-500 text-slate-950 font-bold uppercase">
                    {inspectImage.category}
                  </span>
                  <button
                    onClick={() => setInspectImage(null)}
                    className="p-1 text-slate-400 hover:text-white rounded"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <div>
                  <h3 className="text-base font-bold text-white">{inspectImage.title}</h3>
                  <p className="text-xs text-slate-400 font-mono mt-0.5">Asset ID: {inspectImage.id}</p>
                </div>

                <div className="space-y-2 p-3 rounded-lg bg-slate-950 border border-slate-800 text-xs font-mono">
                  <div className="flex justify-between text-slate-400">
                    <span>Resolution</span>
                    <span className="text-white font-bold">{inspectImage.dimensions}</span>
                  </div>
                  <div className="flex justify-between text-slate-400">
                    <span>File Size</span>
                    <span className="text-white font-bold">{inspectImage.size}</span>
                  </div>
                  <div className="flex justify-between text-slate-400">
                    <span>Format</span>
                    <span className="text-white font-bold">{inspectImage.format}</span>
                  </div>
                  <div className="flex justify-between text-slate-400">
                    <span>Assigned Project</span>
                    <span className="text-amber-400 font-bold truncate max-w-[140px]">{inspectImage.assignedTo}</span>
                  </div>
                </div>

                {inspectImage.tags && (
                  <div className="space-y-1.5">
                    <span className="text-[10px] font-mono text-slate-400 uppercase">Tags</span>
                    <div className="flex flex-wrap gap-1">
                      {inspectImage.tags.map((t, idx) => (
                        <span key={idx} className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-800 text-slate-300">
                          #{t}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              <div className="space-y-2 pt-4 border-t border-slate-800">
                <button
                  onClick={() => handleCopyUrl(inspectImage)}
                  className="w-full py-2.5 rounded-lg bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs font-mono flex items-center justify-center gap-2 cursor-pointer shadow-md shadow-amber-500/20"
                >
                  <Copy className="w-3.5 h-3.5" />
                  <span>Copy Image URL</span>
                </button>
                <a
                  href={inspectImage.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-mono flex items-center justify-center gap-2"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                  <span>Open Full Size</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
