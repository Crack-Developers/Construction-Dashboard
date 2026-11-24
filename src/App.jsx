import { useState } from 'react';
import { DashboardProvider, useDashboard } from './context/DashboardContext';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import Overview from './components/Overview';
import ProjectsManager from './components/ProjectsManager';
import ProjectModal from './components/ProjectModal';
import MediaLibrary from './components/MediaLibrary';
import UploadModal from './components/UploadModal';
import ContentEditor from './components/ContentEditor';
import InquiriesManager from './components/InquiriesManager';
import WebsitePreview from './components/WebsitePreview';
import Toast from './components/Toast';

function DashboardApp() {
  const { activeTab, toast, setToast } = useDashboard();

  // Modals state
  const [isProjectModalOpen, setIsProjectModalOpen] = useState(false);
  const [projectToEdit, setProjectToEdit] = useState(null);
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);

  const handleOpenNewProject = () => {
    setProjectToEdit(null);
    setIsProjectModalOpen(true);
  };

  const handleEditProject = (project) => {
    setProjectToEdit(project);
    setIsProjectModalOpen(true);
  };

  const handleOpenUploadMedia = () => {
    setIsUploadModalOpen(true);
  };

  return (
    <div className="flex min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 font-sans transition-colors duration-200">
      {/* CMS Sidebar */}
      <Sidebar />

      {/* Main Panel */}
      <div className="flex-1 flex flex-col min-w-0 overflow-x-hidden">
        {/* Top Header */}
        <Header 
          onNewProject={handleOpenNewProject}
          onUploadMedia={handleOpenUploadMedia}
        />

        {/* Dynamic CMS Workspace */}
        <main className="flex-1 overflow-y-auto">
          {activeTab === 'overview' && (
            <Overview 
              onNewProject={handleOpenNewProject}
              onUploadMedia={handleOpenUploadMedia}
              onEditProject={handleEditProject}
            />
          )}

          {activeTab === 'projects' && (
            <ProjectsManager 
              onNewProject={handleOpenNewProject}
              onEditProject={handleEditProject}
            />
          )}

          {activeTab === 'media' && (
            <MediaLibrary 
              onUploadMedia={handleOpenUploadMedia}
            />
          )}

          {activeTab === 'content' && (
            <ContentEditor />
          )}

          {activeTab === 'inquiries' && (
            <InquiriesManager />
          )}

          {activeTab === 'preview' && (
            <WebsitePreview />
          )}
        </main>
      </div>

      {/* Modals & Toasts */}
      <ProjectModal
        isOpen={isProjectModalOpen}
        onClose={() => setIsProjectModalOpen(false)}
        projectToEdit={projectToEdit}
      />

      <UploadModal
        isOpen={isUploadModalOpen}
        onClose={() => setIsUploadModalOpen(false)}
      />

      <Toast 
        toast={toast} 
        onClose={() => setToast(null)} 
      />
    </div>
  );
}

export default function App() {
  return (
    <DashboardProvider>
      <DashboardApp />
    </DashboardProvider>
  );
}
