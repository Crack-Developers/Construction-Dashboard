import { useState, useEffect } from 'react';
import { 
  X, 
  Upload, 
  Image as ImageIcon, 
  Plus, 
  Trash2, 
  Sparkles, 
  MapPin, 
  DollarSign, 
  Clock, 
  Maximize2, 
  Check, 
  Eye,
  Star
} from 'lucide-react';
import { useDashboard } from '../context/DashboardContext';

export default function ProjectModal({ isOpen, onClose, projectToEdit }) {
  const { addProject, updateProject, data, addMedia } = useDashboard();

  const [form, setForm] = useState({
    title: '',
    slug: '',
    category: 'Modern Home',
    location: '',
    timeline: '',
    duration: '6 Weeks',
    budget: '$150K - $250K',
    area: '2,500 sq.ft.',
    status: 'In Progress',
    featured: false,
    coverImage: '',
    gallery: [],
    description: '',
    scope: '',
    deliverables: ['Custom structural engineering', 'High-end artisan finishes']
  });

  const [newDeliverable, setNewDeliverable] = useState('');
  const [showMediaPicker, setShowMediaPicker] = useState(false);
  const [activeTab, setActiveTab] = useState('details'); // 'details' | 'media' | 'preview'

  const categories = [
    'Modern Home',
    'Whole Home',
    'Kitchen Remodel',
    'Bathroom Remodel',
    'Additions',
    'Commercial',
    'New Builds'
  ];

  const statuses = ['In Progress', 'Completed', 'Planning'];

  useEffect(() => {
    if (projectToEdit) {
      setForm({
        ...projectToEdit,
        deliverables: projectToEdit.deliverables || []
      });
    } else {
      setForm({
        title: '',
        slug: '',
        category: 'Modern Home',
        location: 'San Francisco, CA',
        timeline: 'Jul 2024 – Sep 2024',
        duration: '8 Weeks',
        budget: '$250K - $350K',
        area: '2,800 sq.ft.',
        status: 'In Progress',
        featured: false,
        coverImage: data.media[0]?.url || 'https://framerusercontent.com/images/105zO15MKPqahxW0hkKzQ2UbeU.png',
        gallery: [data.media[0]?.url || 'https://framerusercontent.com/images/105zO15MKPqahxW0hkKzQ2UbeU.png'],
        description: '',
        scope: '',
        deliverables: ['High-efficiency building envelope', 'Custom architectural cabinetry']
      });
    }
  }, [projectToEdit, isOpen]);

  if (!isOpen) return null;

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleAddDeliverable = () => {
    if (!newDeliverable.trim()) return;
    setForm(prev => ({
      ...prev,
      deliverables: [...prev.deliverables, newDeliverable.trim()]
    }));
    setNewDeliverable('');
  };

  const handleRemoveDeliverable = (idx) => {
    setForm(prev => ({
      ...prev,
      deliverables: prev.deliverables.filter((_, i) => i !== idx)
    }));
  };

  const handleSelectCover = (url) => {
    setForm(prev => ({
      ...prev,
      coverImage: url,
      gallery: prev.gallery.includes(url) ? prev.gallery : [url, ...prev.gallery]
    }));
    setShowMediaPicker(false);
  };

  const handleAddGalleryImage = (url) => {
    if (!form.gallery.includes(url)) {
      setForm(prev => ({
        ...prev,
        gallery: [...prev.gallery, url]
      }));
    }
  };

  const handleRemoveGalleryImage = (url) => {
    setForm(prev => ({
      ...prev,
      gallery: prev.gallery.filter(img => img !== url),
      coverImage: prev.coverImage === url ? (prev.gallery[0] || '') : prev.coverImage
    }));
  };

  const handleLocalImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (uploadEvent) => {
        const base64Url = uploadEvent.target.result;
        // Save to media library as well
        addMedia({
          title: file.name.replace(/\.[^/.]+$/, ''),
          url: base64Url,
          size: `${(file.size / (1024 * 1024)).toFixed(1)} MB`,
          format: file.type.split('/')[1]?.toUpperCase() || 'PNG',
          category: 'Projects',
          assignedTo: form.title || 'New Project'
        });
        handleSelectCover(base64Url);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.title.trim()) return;

    if (projectToEdit) {
      updateProject(projectToEdit.id, form);
    } else {
      addProject(form);
    }
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl w-full max-w-4xl max-h-[90vh] shadow-2xl flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        {/* Modal Header */}
        <div className="p-5 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between bg-slate-50 dark:bg-slate-950/60">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-amber-500/10 text-amber-500 flex items-center justify-center">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-slate-900 dark:text-white">
                {projectToEdit ? 'Edit Construction Project' : 'Add New Construction Project'}
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400 font-mono">
                {projectToEdit ? `Updating ID: ${projectToEdit.id}` : 'Create a showcase item for GridFly'}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {/* Tab navigation inside modal */}
            <div className="flex items-center bg-slate-200 dark:bg-slate-800 p-1 rounded-lg text-xs font-mono">
              <button
                type="button"
                onClick={() => setActiveTab('details')}
                className={`px-3 py-1 rounded-md transition-colors ${
                  activeTab === 'details' ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white font-bold shadow-sm' : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                Project Details
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('media')}
                className={`px-3 py-1 rounded-md transition-colors ${
                  activeTab === 'media' ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white font-bold shadow-sm' : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                Photos ({form.gallery?.length || 0})
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('preview')}
                className={`px-3 py-1 rounded-md transition-colors ${
                  activeTab === 'preview' ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white font-bold shadow-sm' : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                Card Preview
              </button>
            </div>

            <button
              onClick={onClose}
              className="p-2 text-slate-400 hover:text-slate-700 dark:hover:text-white rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors ml-2"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Body */}
        <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-6 space-y-6">
          {activeTab === 'details' && (
            <div className="space-y-6">
              {/* Basic Meta */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1.5 md:col-span-2">
                  <label className="text-xs font-mono font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
                    Project Title *
                  </label>
                  <input
                    type="text"
                    name="title"
                    required
                    value={form.title}
                    onChange={handleChange}
                    placeholder="e.g. Modern Home in Orinda"
                    className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white text-sm focus:ring-2 focus:ring-amber-500 focus:outline-none"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-mono font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
                    Category *
                  </label>
                  <select
                    name="category"
                    value={form.category}
                    onChange={handleChange}
                    className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white text-sm focus:ring-2 focus:ring-amber-500 focus:outline-none"
                  >
                    {categories.map(c => (
                      <option key={c} value={c}>{c}</option>
                    ))}
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-mono font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
                    Status *
                  </label>
                  <select
                    name="status"
                    value={form.status}
                    onChange={handleChange}
                    className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white text-sm focus:ring-2 focus:ring-amber-500 focus:outline-none"
                  >
                    {statuses.map(s => (
                      <option key={s} value={s}>{s}</option>
                    ))}
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-mono font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
                    Location *
                  </label>
                  <div className="relative">
                    <MapPin className="w-4 h-4 text-amber-500 absolute left-3 top-3" />
                    <input
                      type="text"
                      name="location"
                      required
                      value={form.location}
                      onChange={handleChange}
                      placeholder="e.g. Orinda, CA"
                      className="w-full pl-9 pr-3.5 py-2.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white text-sm focus:ring-2 focus:ring-amber-500 focus:outline-none"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-mono font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
                    Budget Range *
                  </label>
                  <div className="relative">
                    <DollarSign className="w-4 h-4 text-emerald-500 absolute left-3 top-3" />
                    <input
                      type="text"
                      name="budget"
                      required
                      value={form.budget}
                      onChange={handleChange}
                      placeholder="e.g. $350K - $480K"
                      className="w-full pl-9 pr-3.5 py-2.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white text-sm focus:ring-2 focus:ring-amber-500 focus:outline-none"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-mono font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
                    Timeline / Dates
                  </label>
                  <div className="relative">
                    <Clock className="w-4 h-4 text-sky-500 absolute left-3 top-3" />
                    <input
                      type="text"
                      name="timeline"
                      value={form.timeline}
                      onChange={handleChange}
                      placeholder="e.g. Jul 2024 – Sep 2024"
                      className="w-full pl-9 pr-3.5 py-2.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white text-sm focus:ring-2 focus:ring-amber-500 focus:outline-none"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-mono font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
                    Duration
                  </label>
                  <input
                    type="text"
                    name="duration"
                    value={form.duration}
                    onChange={handleChange}
                    placeholder="e.g. 6-Week, 10 Weeks"
                    className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white text-sm focus:ring-2 focus:ring-amber-500 focus:outline-none"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-mono font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
                    Square Footage / Area
                  </label>
                  <div className="relative">
                    <Maximize2 className="w-4 h-4 text-purple-500 absolute left-3 top-3" />
                    <input
                      type="text"
                      name="area"
                      value={form.area}
                      onChange={handleChange}
                      placeholder="e.g. 3,400 sq.ft."
                      className="w-full pl-9 pr-3.5 py-2.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white text-sm focus:ring-2 focus:ring-amber-500 focus:outline-none"
                    />
                  </div>
                </div>

                {/* Featured Checkbox */}
                <div className="flex items-center space-x-3 p-3.5 rounded-lg bg-amber-500/10 border border-amber-500/30">
                  <input
                    type="checkbox"
                    id="featured"
                    name="featured"
                    checked={form.featured}
                    onChange={handleChange}
                    className="w-4 h-4 text-amber-500 rounded border-slate-300 focus:ring-amber-400 cursor-pointer"
                  />
                  <label htmlFor="featured" className="text-xs font-mono text-slate-800 dark:text-slate-200 cursor-pointer">
                    <strong className="text-amber-600 dark:text-amber-400">Featured on GridFly Homepage</strong> — display in [ 01 - 04 ] portfolio grid
                  </label>
                </div>
              </div>

              {/* Description & Scope */}
              <div className="space-y-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-mono font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
                    Project Story / Description
                  </label>
                  <textarea
                    rows={3}
                    name="description"
                    value={form.description}
                    onChange={handleChange}
                    placeholder="Describe architectural challenges, craftsmanship, client requirements, and structural features..."
                    className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white text-sm focus:ring-2 focus:ring-amber-500 focus:outline-none"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-mono font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
                    Scope of Work
                  </label>
                  <input
                    type="text"
                    name="scope"
                    value={form.scope}
                    onChange={handleChange}
                    placeholder="e.g. Complete demolition, structural retrofitting, architectural glazing, custom millwork."
                    className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white text-sm focus:ring-2 focus:ring-amber-500 focus:outline-none"
                  />
                </div>
              </div>

              {/* Deliverables List */}
              <div className="space-y-2">
                <label className="text-xs font-mono font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
                  Key Deliverables / Specs ({form.deliverables.length})
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={newDeliverable}
                    onChange={(e) => setNewDeliverable(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        e.preventDefault();
                        handleAddDeliverable();
                      }
                    }}
                    placeholder="e.g. Seamless quartzite waterfall island"
                    className="flex-1 px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white text-xs focus:ring-2 focus:ring-amber-500 focus:outline-none"
                  />
                  <button
                    type="button"
                    onClick={handleAddDeliverable}
                    className="px-3 py-2 rounded-lg bg-slate-900 hover:bg-slate-800 dark:bg-slate-800 dark:hover:bg-slate-700 text-white text-xs font-mono font-bold cursor-pointer"
                  >
                    Add
                  </button>
                </div>

                <div className="flex flex-wrap gap-2 pt-1">
                  {form.deliverables.map((d, idx) => (
                    <span
                      key={idx}
                      className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 text-xs font-mono border border-slate-200 dark:border-slate-700"
                    >
                      <Check className="w-3 h-3 text-emerald-500" />
                      <span>{d}</span>
                      <button
                        type="button"
                        onClick={() => handleRemoveDeliverable(idx)}
                        className="text-slate-400 hover:text-red-500 ml-1"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </span>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'media' && (
            <div className="space-y-6">
              {/* Cover Image Picker */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-mono font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
                    Primary Cover Photo
                  </label>
                  <div className="flex items-center gap-2">
                    <label className="cursor-pointer text-xs font-mono text-amber-600 dark:text-amber-400 hover:underline flex items-center gap-1">
                      <Upload className="w-3.5 h-3.5" />
                      <span>Upload from Device</span>
                      <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={handleLocalImageUpload}
                      />
                    </label>
                    <button
                      type="button"
                      onClick={() => setShowMediaPicker(!showMediaPicker)}
                      className="text-xs font-mono text-sky-600 dark:text-sky-400 hover:underline flex items-center gap-1"
                    >
                      <ImageIcon className="w-3.5 h-3.5" />
                      <span>{showMediaPicker ? 'Hide Library' : 'Choose from Library'}</span>
                    </button>
                  </div>
                </div>

                <div className="flex gap-4 items-center">
                  <div className="w-48 aspect-[16/10] rounded-xl overflow-hidden bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shrink-0 relative group">
                    {form.coverImage ? (
                      <img src={form.coverImage} alt="Cover" className="w-full h-full object-cover" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-slate-400 text-xs font-mono">
                        No Cover Set
                      </div>
                    )}
                    <span className="absolute bottom-2 left-2 text-[9px] font-mono px-2 py-0.5 rounded bg-slate-950/80 text-amber-400 font-bold backdrop-blur-md">
                      COVER
                    </span>
                  </div>

                  <div className="flex-1 space-y-2">
                    <input
                      type="url"
                      name="coverImage"
                      value={form.coverImage}
                      onChange={handleChange}
                      placeholder="Paste image URL (https://...)"
                      className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white text-xs font-mono focus:ring-2 focus:ring-amber-500 focus:outline-none"
                    />
                    <p className="text-[11px] text-slate-500 font-mono">
                      High-resolution PNG or WebP recommended (at least 1400x1000px).
                    </p>
                  </div>
                </div>

                {/* Media Library Drawer */}
                {showMediaPicker && (
                  <div className="p-4 bg-slate-50 dark:bg-slate-950 rounded-xl border border-slate-200 dark:border-slate-800 space-y-3">
                    <p className="text-xs font-mono font-bold text-slate-600 dark:text-slate-400">
                      Select photo from GridFly Media Assets:
                    </p>
                    <div className="grid grid-cols-4 sm:grid-cols-6 gap-2 max-h-48 overflow-y-auto p-1">
                      {data.media?.map(med => (
                        <button
                          key={med.id}
                          type="button"
                          onClick={() => handleSelectCover(med.url)}
                          className={`aspect-square rounded-lg overflow-hidden border-2 transition-all relative group ${
                            form.coverImage === med.url ? 'border-amber-500 scale-95 ring-2 ring-amber-500/20' : 'border-transparent hover:border-slate-400'
                          }`}
                        >
                          <img src={med.url} alt={med.title} className="w-full h-full object-cover" />
                          {form.coverImage === med.url && (
                            <span className="absolute inset-0 bg-amber-500/30 flex items-center justify-center">
                              <Check className="w-4 h-4 text-white drop-shadow" />
                            </span>
                          )}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Gallery List */}
              <div className="space-y-3 pt-3 border-t border-slate-200 dark:border-slate-800">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-mono font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
                    Project Gallery Photos ({form.gallery?.length || 0})
                  </label>
                  <button
                    type="button"
                    onClick={() => {
                      const sample = data.media[Math.floor(Math.random() * data.media.length)]?.url;
                      if (sample) handleAddGalleryImage(sample);
                    }}
                    className="text-xs font-mono text-amber-600 dark:text-amber-400 hover:underline"
                  >
                    + Add from Library
                  </button>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {form.gallery?.map((imgUrl, i) => (
                    <div key={i} className="aspect-[16/10] rounded-lg overflow-hidden border border-slate-200 dark:border-slate-700 relative group bg-slate-100 dark:bg-slate-800">
                      <img src={imgUrl} alt={`Gallery ${i}`} className="w-full h-full object-cover" />
                      <div className="absolute inset-0 bg-slate-950/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                        {form.coverImage !== imgUrl && (
                          <button
                            type="button"
                            onClick={() => handleSelectCover(imgUrl)}
                            className="p-1.5 rounded bg-amber-500 hover:bg-amber-400 text-slate-950 text-[10px] font-mono font-bold"
                            title="Set as cover image"
                          >
                            Set Cover
                          </button>
                        )}
                        <button
                          type="button"
                          onClick={() => handleRemoveGalleryImage(imgUrl)}
                          className="p-1.5 rounded bg-rose-600 hover:bg-rose-500 text-white"
                          title="Remove image"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'preview' && (
            <div className="space-y-4">
              <p className="text-xs font-mono text-slate-500">
                Real-time preview of how this project card appears on the GridFly homepage:
              </p>

              <div className="max-w-md mx-auto bg-white dark:bg-slate-950 rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-2xl">
                <div className="relative aspect-[16/10] overflow-hidden bg-slate-900">
                  <img
                    src={form.coverImage || 'https://framerusercontent.com/images/105zO15MKPqahxW0hkKzQ2UbeU.png'}
                    alt={form.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-3 left-3 flex items-center gap-2">
                    <span className="text-xs font-mono font-bold px-2.5 py-1 rounded bg-slate-950/90 text-amber-400 backdrop-blur-md">
                      [ {form.featured ? '01' : 'PROJECT'} ]
                    </span>
                    <span className="text-xs font-mono px-2 py-0.5 rounded bg-slate-950/80 text-white backdrop-blur-md">
                      {form.category}
                    </span>
                  </div>
                  <div className="absolute top-3 right-3">
                    <span className="text-[11px] font-mono font-semibold px-2.5 py-1 rounded bg-emerald-500 text-white shadow">
                      {form.status}
                    </span>
                  </div>
                </div>

                <div className="p-6 space-y-4">
                  <div>
                    <h3 className="text-xl font-black text-slate-900 dark:text-white">
                      {form.title || 'Untitled Project'}
                    </h3>
                    <div className="flex items-center gap-2 text-xs font-mono text-slate-500 dark:text-slate-400 mt-1">
                      <MapPin className="w-3.5 h-3.5 text-amber-500" />
                      <span>{form.location || 'Location Pending'}</span>
                      <span>•</span>
                      <span>{form.timeline || '2024'}</span>
                    </div>
                  </div>

                  <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                    {form.description || 'Full-scale architectural build engineered with premium materials.'}
                  </p>

                  <div className="grid grid-cols-2 gap-2 p-3 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-800 text-xs font-mono">
                    <div>
                      <span className="text-slate-400 block text-[10px] uppercase">Budget</span>
                      <span className="font-bold text-slate-800 dark:text-slate-200">{form.budget}</span>
                    </div>
                    <div>
                      <span className="text-slate-400 block text-[10px] uppercase">Timeline</span>
                      <span className="font-bold text-slate-800 dark:text-slate-200">{form.duration}</span>
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <span className="text-[10px] font-mono uppercase text-slate-400 block">Deliverables</span>
                    <div className="flex flex-wrap gap-1.5">
                      {form.deliverables.slice(0, 3).map((d, i) => (
                        <span key={i} className="text-[11px] font-mono px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
                          ✓ {d}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Modal Footer */}
          <div className="p-4 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between bg-slate-50 dark:bg-slate-950/60 -mx-6 -mb-6 mt-6">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-xs font-mono font-medium text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="px-6 py-2.5 rounded-lg bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs font-mono shadow-md shadow-amber-500/20 transition-all cursor-pointer"
            >
              {projectToEdit ? 'Save Project Changes' : 'Publish Project'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
