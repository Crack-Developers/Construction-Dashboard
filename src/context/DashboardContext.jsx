import { createContext, useContext, useState, useEffect } from 'react';
import { INITIAL_DATA } from '../data/initialData';

const DashboardContext = createContext(null);
const STORAGE_KEY = 'gridfly_dashboard_data_v2';

export function DashboardProvider({ children }) {
  // Main data state
  const [data, setData] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        // Ensure all top-level keys exist in case of schema update
        return { ...INITIAL_DATA, ...parsed };
      }
    } catch (e) {
      console.error('Failed to load saved dashboard data:', e);
    }
    return INITIAL_DATA;
  });

  // UI state
  const [activeTab, setActiveTab] = useState('projects'); // 'overview' | 'projects' | 'media' | 'content' | 'inquiries' | 'preview'
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('gridfly_theme') || 'light';
  });
  const [toast, setToast] = useState(null);

  // Sync data to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    } catch (e) {
      console.error('Failed to save to localStorage:', e);
    }
  }, [data]);

  // Sync theme
  useEffect(() => {
    localStorage.setItem('gridfly_theme', theme);
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  const showToast = (message, type = 'success') => {
    setToast({ message, type, id: Date.now() });
    setTimeout(() => {
      setToast(null);
    }, 3500);
  };

  const toggleTheme = () => {
    setTheme(prev => (prev === 'light' ? 'dark' : 'light'));
  };

  // ==========================================
  // PROJECT ACTIONS (PRIMARY FOCUS)
  // ==========================================
  const addProject = (newProject) => {
    const id = `proj-${Date.now()}`;
    const slug = (newProject.title || 'untitled-project')
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');

    const projectWithDefaults = {
      id,
      slug,
      title: 'Untitled Project',
      category: 'Residential',
      location: 'San Francisco, CA',
      timeline: '2024',
      duration: '8 Weeks',
      budget: '$150K - $250K',
      area: '2,000 sq.ft.',
      featured: false,
      status: 'In Progress',
      coverImage: newProject.coverImage || INITIAL_DATA.media[0]?.url || '',
      gallery: newProject.gallery && newProject.gallery.length > 0 ? newProject.gallery : [newProject.coverImage || INITIAL_DATA.media[0]?.url || ''],
      description: '',
      scope: '',
      deliverables: [],
      ...newProject
    };

    setData(prev => ({
      ...prev,
      projects: [projectWithDefaults, ...prev.projects]
    }));
    showToast(`Project "${projectWithDefaults.title}" created successfully.`);
    return projectWithDefaults;
  };

  const updateProject = (id, updatedFields) => {
    setData(prev => ({
      ...prev,
      projects: prev.projects.map(p => p.id === id ? { ...p, ...updatedFields } : p)
    }));
    showToast('Project updated successfully.');
  };

  const deleteProject = (id) => {
    const target = data.projects.find(p => p.id === id);
    if (!target) return;
    setData(prev => ({
      ...prev,
      projects: prev.projects.filter(p => p.id !== id)
    }));
    showToast(`Project "${target.title}" deleted.`, 'info');
  };

  const toggleFeaturedProject = (id) => {
    setData(prev => ({
      ...prev,
      projects: prev.projects.map(p => {
        if (p.id === id) {
          const nextFeatured = !p.featured;
          showToast(`Project marked as ${nextFeatured ? 'Featured on GridFly' : 'Standard'}.`);
          return { ...p, featured: nextFeatured };
        }
        return p;
      })
    }));
  };

  const duplicateProject = (id) => {
    const original = data.projects.find(p => p.id === id);
    if (!original) return;
    const duplicated = {
      ...original,
      id: `proj-${Date.now()}`,
      title: `${original.title} (Copy)`,
      featured: false
    };
    setData(prev => ({
      ...prev,
      projects: [duplicated, ...prev.projects]
    }));
    showToast(`Project duplicated as "${duplicated.title}".`);
  };

  // ==========================================
  // MEDIA ACTIONS
  // ==========================================
  const addMedia = (mediaItem) => {
    const newMedia = {
      id: `med-${Date.now()}`,
      title: mediaItem.title || 'Uploaded Image',
      category: mediaItem.category || 'Projects',
      url: mediaItem.url,
      dimensions: mediaItem.dimensions || '1920 x 1080',
      size: mediaItem.size || '1.2 MB',
      format: mediaItem.format || 'PNG',
      tags: mediaItem.tags || ['upload', 'gridfly'],
      assignedTo: mediaItem.assignedTo || 'Unassigned',
      uploadedAt: new Date().toISOString().split('T')[0],
      ...mediaItem
    };

    setData(prev => ({
      ...prev,
      media: [newMedia, ...prev.media]
    }));
    showToast('Image added to media library.');
    return newMedia;
  };

  const deleteMedia = (id) => {
    setData(prev => ({
      ...prev,
      media: prev.media.filter(m => m.id !== id)
    }));
    showToast('Image removed from media library.', 'info');
  };

  const updateMedia = (id, fields) => {
    setData(prev => ({
      ...prev,
      media: prev.media.map(m => m.id === id ? { ...m, ...fields } : m)
    }));
    showToast('Media details updated.');
  };

  // ==========================================
  // CONTENT & SITE SETTINGS ACTIONS
  // ==========================================
  const updateSiteSettings = (fields) => {
    setData(prev => ({
      ...prev,
      siteSettings: { ...prev.siteSettings, ...fields }
    }));
    showToast('Website settings & hero copy updated.');
  };

  const updateService = (id, fields) => {
    setData(prev => ({
      ...prev,
      services: prev.services.map(s => s.id === id ? { ...s, ...fields } : s)
    }));
    showToast('Service details updated.');
  };

  const addService = (newService) => {
    const s = {
      id: `srv-${Date.now()}`,
      title: 'New Service',
      tagline: 'Service tagline',
      description: 'Service description',
      icon: 'Hammer',
      deliverables: ['Custom service deliverable'],
      ...newService
    };
    setData(prev => ({
      ...prev,
      services: [...prev.services, s]
    }));
    showToast('New service added.');
  };

  const deleteService = (id) => {
    setData(prev => ({
      ...prev,
      services: prev.services.filter(s => s.id !== id)
    }));
    showToast('Service deleted.', 'info');
  };

  const updateProcessStep = (stepNumber, fields) => {
    setData(prev => ({
      ...prev,
      processSteps: prev.processSteps.map(step => step.step === stepNumber ? { ...step, ...fields } : step)
    }));
    showToast(`Step ${stepNumber} updated.`);
  };

  const updatePricingPlan = (id, fields) => {
    setData(prev => ({
      ...prev,
      pricing: prev.pricing.map(p => p.id === id ? { ...p, ...fields } : p)
    }));
    showToast('Pricing plan updated.');
  };

  const updateTestimonial = (id, fields) => {
    setData(prev => ({
      ...prev,
      testimonials: prev.testimonials.map(t => t.id === id ? { ...t, ...fields } : t)
    }));
    showToast('Testimonial updated.');
  };

  const addTestimonial = (testimonial) => {
    const item = {
      id: `test-${Date.now()}`,
      name: 'Client Name',
      handle: '@client',
      role: 'Property Owner',
      rating: 5,
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&h=200&q=80',
      content: 'Outstanding construction quality and on-time delivery.',
      ...testimonial
    };
    setData(prev => ({
      ...prev,
      testimonials: [...prev.testimonials, item]
    }));
    showToast('Testimonial added.');
  };

  const deleteTestimonial = (id) => {
    setData(prev => ({
      ...prev,
      testimonials: prev.testimonials.filter(t => t.id !== id)
    }));
    showToast('Testimonial deleted.', 'info');
  };

  const updateServiceAreas = (areas) => {
    setData(prev => ({
      ...prev,
      serviceAreas: areas
    }));
    showToast('Service areas updated.');
  };

  const updateFaq = (id, fields) => {
    setData(prev => ({
      ...prev,
      faqs: prev.faqs.map(f => f.id === id ? { ...f, ...fields } : f)
    }));
    showToast('FAQ updated.');
  };

  const addFaq = (faq) => {
    const item = {
      id: `faq-${Date.now()}`,
      question: 'Frequently Asked Question',
      answer: 'Detailed clear response for clients.',
      ...faq
    };
    setData(prev => ({
      ...prev,
      faqs: [...prev.faqs, item]
    }));
    showToast('FAQ item added.');
  };

  const deleteFaq = (id) => {
    setData(prev => ({
      ...prev,
      faqs: prev.faqs.filter(f => f.id !== id)
    }));
    showToast('FAQ item deleted.', 'info');
  };

  const updateStat = (id, fields) => {
    setData(prev => ({
      ...prev,
      stats: prev.stats.map(s => s.id === id ? { ...s, ...fields } : s)
    }));
    showToast('Statistic counter updated.');
  };

  // ==========================================
  // INQUIRIES ACTIONS
  // ==========================================
  const updateInquiryStatus = (id, status) => {
    setData(prev => ({
      ...prev,
      inquiries: prev.inquiries.map(inq => inq.id === id ? { ...inq, status } : inq)
    }));
    showToast(`Inquiry marked as ${status}.`);
  };

  const deleteInquiry = (id) => {
    setData(prev => ({
      ...prev,
      inquiries: prev.inquiries.filter(inq => inq.id !== id)
    }));
    showToast('Inquiry removed.', 'info');
  };

  // ==========================================
  // BACKUP & RESTORE
  // ==========================================
  const resetToDefaults = () => {
    if (window.confirm('Reset all dashboard projects and website content back to original GridFly defaults?')) {
      setData(INITIAL_DATA);
      showToast('All data reset to GridFly template defaults.', 'info');
    }
  };

  const exportDataJSON = () => {
    const jsonStr = JSON.stringify(data, null, 2);
    const blob = new Blob([jsonStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `gridfly-dashboard-export-${new Date().toISOString().split('T')[0]}.json`;
    link.click();
    URL.revokeObjectURL(url);
    showToast('Dashboard data exported as JSON.');
  };

  const importDataJSON = (file) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const imported = JSON.parse(e.target.result);
        if (imported.projects && imported.siteSettings) {
          setData(imported);
          showToast('Data imported successfully!');
        } else {
          showToast('Invalid data format. Please select a valid GridFly export file.', 'error');
        }
      } catch (err) {
        showToast('Error parsing JSON file.', 'error');
      }
    };
    reader.readAsText(file);
  };

  return (
    <DashboardContext.Provider value={{
      data,
      activeTab,
      setActiveTab,
      theme,
      toggleTheme,
      toast,
      showToast,
      // Project handlers
      addProject,
      updateProject,
      deleteProject,
      toggleFeaturedProject,
      duplicateProject,
      // Media handlers
      addMedia,
      deleteMedia,
      updateMedia,
      // Content handlers
      updateSiteSettings,
      updateService,
      addService,
      deleteService,
      updateProcessStep,
      updatePricingPlan,
      updateTestimonial,
      addTestimonial,
      deleteTestimonial,
      updateServiceAreas,
      updateFaq,
      addFaq,
      deleteFaq,
      updateStat,
      // Inquiries handlers
      updateInquiryStatus,
      deleteInquiry,
      // Maintenance
      resetToDefaults,
      exportDataJSON,
      importDataJSON
    }}>
      {children}
    </DashboardContext.Provider>
  );
}

export const useDashboard = () => {
  const context = useContext(DashboardContext);
  if (!context) {
    throw new Error('useDashboard must be used within a DashboardProvider');
  }
  return context;
};
