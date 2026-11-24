import { useState, useMemo } from 'react';
import { 
  FolderKanban, 
  Plus, 
  Search, 
  Filter, 
  Star, 
  MoreVertical, 
  Edit3, 
  Trash2, 
  Copy, 
  MapPin, 
  Clock, 
  DollarSign, 
  Maximize2, 
  CheckCircle, 
  Layers, 
  LayoutGrid, 
  Table as TableIcon,
  Sparkles,
  ExternalLink,
  Eye
} from 'lucide-react';
import { useDashboard } from '../context/DashboardContext';

export default function ProjectsManager({ onNewProject, onEditProject }) {
  const { 
    data, 
    deleteProject, 
    toggleFeaturedProject, 
    duplicateProject,
    setActiveTab 
  } = useDashboard();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedStatus, setSelectedStatus] = useState('All');
  const [featuredOnly, setFeaturedOnly] = useState(false);
  const [viewMode, setViewMode] = useState('grid'); // 'grid' | 'table'

  const categories = [
    'All',
    'Modern Home',
    'Whole Home',
    'Kitchen Remodel',
    'Bathroom Remodel',
    'Additions',
    'Commercial'
  ];

  const filteredProjects = useMemo(() => {
    return data.projects.filter(p => {
      const matchesSearch = 
        p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (p.deliverables && p.deliverables.some(d => d.toLowerCase().includes(searchQuery.toLowerCase())));

      const matchesCategory = selectedCategory === 'All' || p.category === selectedCategory;
      const matchesStatus = selectedStatus === 'All' || p.status === selectedStatus;
      const matchesFeatured = !featuredOnly || p.featured;

      return matchesSearch && matchesCategory && matchesStatus && matchesFeatured;
    });
  }, [data.projects, searchQuery, selectedCategory, selectedStatus, featuredOnly]);

  const featuredCount = data.projects.filter(p => p.featured).length;

  return (
    <div className="p-8 space-y-6 max-w-7xl mx-auto">
      {/* Header Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2.5">
            <h2 className="text-2xl font-black tracking-tight text-slate-900 dark:text-white font-mono">
              PROJECTS PORTFOLIO
            </h2>
            <span className="text-xs font-mono font-bold px-2 py-0.5 rounded bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20">
              {filteredProjects.length} / {data.projects.length} Total
            </span>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Create, edit, showcase, and structure construction projects for GridFly's showcase grid.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          {/* View toggle */}
          <div className="flex items-center bg-slate-100 dark:bg-slate-800 p-1 rounded-lg border border-slate-200 dark:border-slate-700">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-1.5 rounded-md transition-colors ${
                viewMode === 'grid' 
                  ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-sm' 
                  : 'text-slate-400 hover:text-slate-700 dark:hover:text-white'
              }`}
              title="Card Grid View"
            >
              <LayoutGrid className="w-4 h-4" />
            </button>
            <button
              onClick={() => setViewMode('table')}
              className={`p-1.5 rounded-md transition-colors ${
                viewMode === 'table' 
                  ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-sm' 
                  : 'text-slate-400 hover:text-slate-700 dark:hover:text-white'
              }`}
              title="Table View"
            >
              <TableIcon className="w-4 h-4" />
            </button>
          </div>

          <button
            onClick={onNewProject}
            className="flex items-center gap-2 px-4 py-2.5 rounded-lg bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs font-mono shadow-md shadow-amber-500/20 transition-all cursor-pointer"
          >
            <Plus className="w-4 h-4 stroke-[2.5]" />
            <span>Add Construction Project</span>
          </button>
        </div>
      </div>

      {/* Filter and Search Toolbar */}
      <div className="bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-200 dark:border-slate-800 space-y-3.5 shadow-sm">
        <div className="flex flex-col sm:flex-row items-center gap-3">
          {/* Search */}
          <div className="relative flex-1 w-full">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by project name, location (e.g. Orinda, CA), or materials..."
              className="w-full pl-9 pr-4 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white text-xs font-mono focus:ring-2 focus:ring-amber-500 focus:outline-none"
            />
          </div>

          {/* Status selector */}
          <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            className="w-full sm:w-44 px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white text-xs font-mono focus:ring-2 focus:ring-amber-500 focus:outline-none"
          >
            <option value="All">All Statuses</option>
            <option value="Completed">Completed</option>
            <option value="In Progress">In Progress</option>
            <option value="Planning">Planning</option>
          </select>

          {/* Featured Filter Toggle */}
          <button
            onClick={() => setFeaturedOnly(!featuredOnly)}
            className={`w-full sm:w-auto flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg text-xs font-mono font-semibold transition-all border ${
              featuredOnly
                ? 'bg-amber-500 text-slate-950 border-amber-500 shadow-sm'
                : 'bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:border-amber-500'
            }`}
          >
            <Star className={`w-3.5 h-3.5 ${featuredOnly ? 'fill-slate-950 text-slate-950' : 'text-amber-500'}`} />
            <span>Featured on GridFly ({featuredCount}/4)</span>
          </button>
        </div>

        {/* Category Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 pt-1 scrollbar-none">
          <span className="text-[11px] font-mono text-slate-400 uppercase tracking-wider mr-1 shrink-0">
            Category:
          </span>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1 rounded-md text-xs font-mono whitespace-nowrap transition-colors ${
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

      {/* Projects Display: Card Grid View */}
      {viewMode === 'grid' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map((project, idx) => (
            <div
              key={project.id}
              className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between group"
            >
              <div>
                {/* Image & Badges */}
                <div className="relative aspect-[16/10] overflow-hidden bg-slate-950">
                  <img
                    src={project.coverImage || 'https://framerusercontent.com/images/105zO15MKPqahxW0hkKzQ2UbeU.png'}
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  
                  {/* Top overlay badges */}
                  <div className="absolute top-3 left-3 flex items-center gap-1.5">
                    <span className="text-[11px] font-mono font-bold px-2 py-0.5 rounded bg-slate-950/80 text-amber-400 backdrop-blur-md">
                      {project.category}
                    </span>
                    {project.featured && (
                      <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-amber-500 text-slate-950 flex items-center gap-1 shadow">
                        <Star className="w-3 h-3 fill-slate-950" />
                        [ 01-04 ]
                      </span>
                    )}
                  </div>

                  <div className="absolute top-3 right-3 flex items-center gap-1.5">
                    <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded backdrop-blur-md ${
                      project.status === 'Completed'
                        ? 'bg-emerald-500/90 text-white'
                        : project.status === 'In Progress'
                        ? 'bg-amber-500/90 text-slate-950'
                        : 'bg-sky-500/90 text-white'
                    }`}>
                      {project.status}
                    </span>
                  </div>

                  {/* Photo count indicator */}
                  <div className="absolute bottom-2.5 right-2.5 text-[10px] font-mono px-2 py-0.5 rounded bg-slate-950/70 text-slate-300 backdrop-blur-md flex items-center gap-1">
                    <Layers className="w-3 h-3" />
                    <span>{project.gallery?.length || 1} photos</span>
                  </div>
                </div>

                {/* Body Content */}
                <div className="p-5 space-y-3.5">
                  <div>
                    <h3 className="font-extrabold text-base text-slate-900 dark:text-white group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors">
                      {project.title}
                    </h3>
                    <div className="flex items-center gap-2 text-xs font-mono text-slate-500 dark:text-slate-400 mt-1">
                      <MapPin className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                      <span>{project.location}</span>
                      <span>•</span>
                      <span>{project.timeline}</span>
                    </div>
                  </div>

                  <p className="text-xs text-slate-600 dark:text-slate-300 line-clamp-2 leading-relaxed">
                    {project.description || 'Custom construction build engineered with precision craftsmanship and modern materials.'}
                  </p>

                  {/* Specs Matrix */}
                  <div className="grid grid-cols-3 gap-2 p-2.5 rounded-lg bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800 text-xs font-mono">
                    <div>
                      <span className="text-[9px] uppercase tracking-wider text-slate-400 block">Budget</span>
                      <span className="font-bold text-slate-800 dark:text-slate-200 truncate block">{project.budget}</span>
                    </div>
                    <div>
                      <span className="text-[9px] uppercase tracking-wider text-slate-400 block">Timeline</span>
                      <span className="font-bold text-slate-800 dark:text-slate-200 truncate block">{project.duration || '6-Week'}</span>
                    </div>
                    <div>
                      <span className="text-[9px] uppercase tracking-wider text-slate-400 block">Area</span>
                      <span className="font-bold text-slate-800 dark:text-slate-200 truncate block">{project.area || '2.4K sq.ft.'}</span>
                    </div>
                  </div>

                  {/* Highlights/Deliverables */}
                  {project.deliverables && project.deliverables.length > 0 && (
                    <div className="space-y-1">
                      <span className="text-[9px] font-mono uppercase tracking-wider text-slate-400">Key Deliverables</span>
                      <div className="flex flex-wrap gap-1">
                        {project.deliverables.slice(0, 2).map((d, i) => (
                          <span
                            key={i}
                            className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 truncate max-w-[200px]"
                          >
                            ✓ {d}
                          </span>
                        ))}
                        {project.deliverables.length > 2 && (
                          <span className="text-[10px] font-mono px-1.5 py-0.5 rounded text-slate-400">
                            +{project.deliverables.length - 2} more
                          </span>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Action Buttons Footer */}
              <div className="p-4 border-t border-slate-100 dark:border-slate-800/80 bg-slate-50/50 dark:bg-slate-900/50 flex items-center justify-between gap-2">
                <div className="flex items-center gap-1.5">
                  <button
                    onClick={() => toggleFeaturedProject(project.id)}
                    className={`p-2 rounded-lg transition-colors ${
                      project.featured
                        ? 'bg-amber-500/10 text-amber-500 border border-amber-500/30'
                        : 'text-slate-400 hover:text-amber-500 hover:bg-slate-100 dark:hover:bg-slate-800'
                    }`}
                    title={project.featured ? 'Featured on GridFly homepage' : 'Mark as featured'}
                  >
                    <Star className={`w-4 h-4 ${project.featured ? 'fill-amber-500' : ''}`} />
                  </button>

                  <button
                    onClick={() => duplicateProject(project.id)}
                    className="p-2 text-slate-400 hover:text-sky-500 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors"
                    title="Duplicate project"
                  >
                    <Copy className="w-4 h-4" />
                  </button>

                  <button
                    onClick={() => {
                      if (window.confirm(`Delete project "${project.title}"?`)) {
                        deleteProject(project.id);
                      }
                    }}
                    className="p-2 text-slate-400 hover:text-rose-500 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors"
                    title="Delete project"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>

                <button
                  onClick={() => onEditProject(project)}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 dark:bg-slate-800 dark:hover:bg-slate-700 text-white font-mono text-xs font-semibold transition-colors cursor-pointer"
                >
                  <Edit3 className="w-3.5 h-3.5 text-amber-400" />
                  <span>Edit Project</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Table View Mode */}
      {viewMode === 'table' && (
        <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950/60 text-[11px] font-mono text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                  <th className="py-3 px-4">Project</th>
                  <th className="py-3 px-4">Category</th>
                  <th className="py-3 px-4">Location</th>
                  <th className="py-3 px-4">Budget</th>
                  <th className="py-3 px-4">Duration</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4 text-center">Featured</th>
                  <th className="py-3 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800 text-xs font-mono">
                {filteredProjects.map((project) => (
                  <tr key={project.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-3">
                        <img
                          src={project.coverImage}
                          alt={project.title}
                          className="w-12 h-9 object-cover rounded-md border border-slate-200 dark:border-slate-700 shrink-0"
                        />
                        <div>
                          <p className="font-bold text-slate-900 dark:text-white line-clamp-1">
                            {project.title}
                          </p>
                          <span className="text-[10px] text-slate-400">{project.id}</span>
                        </div>
                      </div>
                    </td>
                    <td className="py-3 px-4 text-slate-600 dark:text-slate-300">
                      {project.category}
                    </td>
                    <td className="py-3 px-4 text-slate-600 dark:text-slate-300">
                      {project.location}
                    </td>
                    <td className="py-3 px-4 font-bold text-slate-800 dark:text-slate-200">
                      {project.budget}
                    </td>
                    <td className="py-3 px-4 text-slate-600 dark:text-slate-300">
                      {project.duration || '6-Week'}
                    </td>
                    <td className="py-3 px-4">
                      <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                        project.status === 'Completed'
                          ? 'bg-emerald-500/10 text-emerald-500 border border-emerald-500/20'
                          : 'bg-amber-500/10 text-amber-500 border border-amber-500/20'
                      }`}>
                        {project.status}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-center">
                      <button
                        onClick={() => toggleFeaturedProject(project.id)}
                        className={`p-1.5 rounded-md transition-colors ${
                          project.featured ? 'text-amber-500 bg-amber-50 dark:bg-amber-500/10' : 'text-slate-300 hover:text-amber-500'
                        }`}
                      >
                        <Star className={`w-4 h-4 ${project.featured ? 'fill-amber-500' : ''}`} />
                      </button>
                    </td>
                    <td className="py-3 px-4 text-right">
                      <div className="flex items-center justify-end gap-1">
                        <button
                          onClick={() => onEditProject(project)}
                          className="p-1.5 text-slate-400 hover:text-slate-900 dark:hover:text-white"
                          title="Edit"
                        >
                          <Edit3 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => duplicateProject(project.id)}
                          className="p-1.5 text-slate-400 hover:text-sky-500"
                          title="Duplicate"
                        >
                          <Copy className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => {
                            if (window.confirm(`Delete project "${project.title}"?`)) {
                              deleteProject(project.id);
                            }
                          }}
                          className="p-1.5 text-slate-400 hover:text-rose-500"
                          title="Delete"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Empty State */}
      {filteredProjects.length === 0 && (
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-12 text-center space-y-4">
          <div className="w-12 h-12 rounded-xl bg-amber-500/10 text-amber-500 flex items-center justify-center mx-auto">
            <FolderKanban className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-base font-bold text-slate-900 dark:text-white">
              No matching construction projects found
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 max-w-sm mx-auto">
              Try adjusting your search query, clearing category filters, or click below to publish a new project.
            </p>
          </div>
          <button
            onClick={onNewProject}
            className="px-4 py-2 rounded-lg bg-amber-500 text-slate-950 font-bold text-xs font-mono inline-flex items-center gap-2"
          >
            <Plus className="w-4 h-4" />
            <span>Create New Project</span>
          </button>
        </div>
      )}
    </div>
  );
}
