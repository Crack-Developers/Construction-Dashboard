import { useState } from 'react';
import { X, Upload, Link as LinkIcon, Image as ImageIcon, Sparkles, Check } from 'lucide-react';
import { useDashboard } from '../context/DashboardContext';

export default function UploadModal({ isOpen, onClose }) {
  const { addMedia, data } = useDashboard();

  const [mode, setMode] = useState('file'); // 'file' | 'url'
  const [form, setForm] = useState({
    title: '',
    category: 'Projects',
    url: '',
    assignedTo: 'General',
    tags: 'construction, architecture, gridfly'
  });
  const [previewUrl, setPreviewUrl] = useState('');
  const [fileDetails, setFileDetails] = useState({ size: '1.2 MB', format: 'PNG', dimensions: '1920 x 1080' });
  const [dragActive, setDragActive] = useState(false);

  if (!isOpen) return null;

  const categories = ['Projects', 'Blueprints', 'Hero & Banners', 'Team', 'Before & After'];

  const handleFile = (file) => {
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (e) => {
      const result = e.target.result;
      setPreviewUrl(result);
      setForm(prev => ({
        ...prev,
        title: prev.title || file.name.replace(/\.[^/.]+$/, ''),
        url: result
      }));
      setFileDetails({
        size: `${(file.size / (1024 * 1024)).toFixed(1)} MB`,
        format: file.type.split('/')[1]?.toUpperCase() || 'PNG',
        dimensions: '1920 x 1080'
      });
    };
    reader.readAsDataURL(file);
  };

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.url && !previewUrl) return;

    addMedia({
      title: form.title || 'GridFly Asset',
      category: form.category,
      url: form.url || previewUrl,
      assignedTo: form.assignedTo,
      dimensions: fileDetails.dimensions,
      size: fileDetails.size,
      format: fileDetails.format,
      tags: form.tags.split(',').map(t => t.trim()).filter(Boolean)
    });

    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl w-full max-w-xl shadow-2xl flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="p-5 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between bg-slate-50 dark:bg-slate-950/60">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-sky-500/10 text-sky-500 flex items-center justify-center">
              <Upload className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-slate-900 dark:text-white">
                Upload Media Asset
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400 font-mono">
                Add photos, site elevations, blueprints or crew portraits
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-700 dark:hover:text-white rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 space-y-5">
          {/* Upload Method Switch */}
          <div className="flex rounded-lg bg-slate-100 dark:bg-slate-800 p-1 text-xs font-mono">
            <button
              type="button"
              onClick={() => setMode('file')}
              className={`flex-1 py-1.5 rounded-md flex items-center justify-center gap-2 transition-colors ${
                mode === 'file' ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white font-bold shadow-sm' : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <Upload className="w-3.5 h-3.5" />
              <span>Upload Local File</span>
            </button>
            <button
              type="button"
              onClick={() => setMode('url')}
              className={`flex-1 py-1.5 rounded-md flex items-center justify-center gap-2 transition-colors ${
                mode === 'url' ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white font-bold shadow-sm' : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <LinkIcon className="w-3.5 h-3.5" />
              <span>Import via URL</span>
            </button>
          </div>

          {mode === 'file' ? (
            <div
              onDragEnter={handleDrag}
              onDragLeave={handleDrag}
              onDragOver={handleDrag}
              onDrop={handleDrop}
              className={`border-2 border-dashed rounded-xl p-8 text-center transition-colors cursor-pointer ${
                dragActive 
                  ? 'border-amber-500 bg-amber-500/5' 
                  : 'border-slate-300 dark:border-slate-700 hover:border-amber-500/60 bg-slate-50/50 dark:bg-slate-800/30'
              }`}
              onClick={() => document.getElementById('media-file-input').click()}
            >
              <input
                id="media-file-input"
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e) => handleFile(e.target.files[0])}
              />
              {previewUrl ? (
                <div className="space-y-3">
                  <div className="w-40 aspect-[16/10] mx-auto rounded-lg overflow-hidden border border-slate-300 dark:border-slate-700 shadow-md">
                    <img src={previewUrl} alt="Preview" className="w-full h-full object-cover" />
                  </div>
                  <p className="text-xs font-mono text-emerald-600 dark:text-emerald-400 font-bold flex items-center justify-center gap-1">
                    <Check className="w-3.5 h-3.5" /> Photo Loaded Ready to Add
                  </p>
                  <p className="text-[11px] font-mono text-slate-400">Click to change file</p>
                </div>
              ) : (
                <div className="space-y-2">
                  <div className="w-12 h-12 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-400 flex items-center justify-center mx-auto">
                    <ImageIcon className="w-6 h-6" />
                  </div>
                  <div>
                    <p className="text-xs font-mono font-bold text-slate-800 dark:text-slate-200">
                      Drag and drop image here, or browse computer
                    </p>
                    <p className="text-[11px] font-mono text-slate-400 mt-0.5">
                      Supports JPG, PNG, WEBP, AVIF (up to 15MB)
                    </p>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="space-y-2">
              <label className="text-xs font-mono font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
                Image Web URL *
              </label>
              <input
                type="url"
                required
                value={form.url}
                onChange={(e) => {
                  setForm(prev => ({ ...prev, url: e.target.value }));
                  setPreviewUrl(e.target.value);
                }}
                placeholder="https://framerusercontent.com/images/..."
                className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white text-xs font-mono focus:ring-2 focus:ring-amber-500 focus:outline-none"
              />
              {previewUrl && (
                <div className="w-32 aspect-[16/10] mt-2 rounded-lg overflow-hidden border border-slate-200 dark:border-slate-700">
                  <img src={previewUrl} alt="URL Preview" className="w-full h-full object-cover" />
                </div>
              )}
            </div>
          )}

          {/* Metadata Fields */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1.5 col-span-2">
              <label className="text-xs font-mono font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
                Asset Title *
              </label>
              <input
                type="text"
                required
                value={form.title}
                onChange={(e) => setForm(prev => ({ ...prev, title: e.target.value }))}
                placeholder="e.g. Modern Home Cantilever Balcony"
                className="w-full px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white text-xs font-mono focus:ring-2 focus:ring-amber-500 focus:outline-none"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-mono font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
                Category
              </label>
              <select
                value={form.category}
                onChange={(e) => setForm(prev => ({ ...prev, category: e.target.value }))}
                className="w-full px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white text-xs font-mono focus:ring-2 focus:ring-amber-500 focus:outline-none"
              >
                {categories.map(c => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-mono font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
                Assign to Project
              </label>
              <select
                value={form.assignedTo}
                onChange={(e) => setForm(prev => ({ ...prev, assignedTo: e.target.value }))}
                className="w-full px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white text-xs font-mono focus:ring-2 focus:ring-amber-500 focus:outline-none"
              >
                <option value="General">General / Unassigned</option>
                {data.projects.map(p => (
                  <option key={p.id} value={p.title}>{p.title}</option>
                ))}
              </select>
            </div>

            <div className="space-y-1.5 col-span-2">
              <label className="text-xs font-mono font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
                Tags (comma separated)
              </label>
              <input
                type="text"
                value={form.tags}
                onChange={(e) => setForm(prev => ({ ...prev, tags: e.target.value }))}
                placeholder="architecture, interior, quartz, kitchen"
                className="w-full px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white text-xs font-mono focus:ring-2 focus:ring-amber-500 focus:outline-none"
              />
            </div>
          </div>

          {/* Modal Footer */}
          <div className="pt-4 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-xs font-mono text-slate-500 hover:text-slate-900 dark:hover:text-white"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={!previewUrl && !form.url}
              className="px-6 py-2.5 rounded-lg bg-amber-500 hover:bg-amber-400 disabled:opacity-50 text-slate-950 font-bold text-xs font-mono shadow-md shadow-amber-500/20 transition-all cursor-pointer"
            >
              Add to Library
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
