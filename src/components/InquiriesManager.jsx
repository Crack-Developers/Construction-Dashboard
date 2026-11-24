import { useState } from 'react';
import { 
  Inbox, 
  Search, 
  Trash2, 
  Phone, 
  Mail, 
  MapPin, 
  Clock, 
  DollarSign, 
  Calendar,
  CheckCircle2,
  ExternalLink,
  MessageSquare
} from 'lucide-react';
import { useDashboard } from '../context/DashboardContext';

export default function InquiriesManager() {
  const { data, updateInquiryStatus, deleteInquiry } = useDashboard();

  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [selectedInquiry, setSelectedInquiry] = useState(null);

  const statuses = ['All', 'New', 'Contacted', 'In Review', 'Quoted', 'Closed'];

  const filteredInquiries = data.inquiries.filter(inq => {
    const matchesSearch = 
      inq.clientName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      inq.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      inq.service.toLowerCase().includes(searchQuery.toLowerCase()) ||
      inq.message.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesStatus = statusFilter === 'All' || inq.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  return (
    <div className="p-8 space-y-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2.5">
            <h2 className="text-2xl font-black tracking-tight text-slate-900 dark:text-white font-mono">
              QUOTE REQUESTS & LEADS
            </h2>
            <span className="text-xs font-mono font-bold px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
              {filteredInquiries.length} Inquiries
            </span>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Client inquiries received from the GridFly "Get Free Estimate" web form.
          </p>
        </div>
      </div>

      {/* Filter Toolbar */}
      <div className="bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row items-center gap-3 shadow-sm">
        <div className="relative flex-1 w-full">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search leads by name, email, service, or message..."
            className="w-full pl-9 pr-4 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white text-xs font-mono focus:ring-2 focus:ring-amber-500 focus:outline-none"
          />
        </div>

        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="w-full sm:w-48 px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white text-xs font-mono focus:ring-2 focus:ring-amber-500 focus:outline-none"
        >
          {statuses.map(s => (
            <option key={s} value={s}>{s === 'All' ? 'All Statuses' : s}</option>
          ))}
        </select>
      </div>

      {/* Leads Table */}
      <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950/60 text-[11px] font-mono text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                <th className="py-3 px-4">Client Name</th>
                <th className="py-3 px-4">Requested Service</th>
                <th className="py-3 px-4">Budget</th>
                <th className="py-3 px-4">Timeline</th>
                <th className="py-3 px-4">Date Submitted</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800 text-xs font-mono">
              {filteredInquiries.map((inq) => (
                <tr key={inq.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                  <td className="py-3.5 px-4">
                    <div>
                      <p className="font-bold text-slate-900 dark:text-white">
                        {inq.clientName}
                      </p>
                      <p className="text-[11px] text-slate-400 font-mono">
                        {inq.email} • {inq.phone}
                      </p>
                    </div>
                  </td>
                  <td className="py-3.5 px-4">
                    <span className="px-2 py-0.5 rounded bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20 font-medium">
                      {inq.service}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 font-bold text-slate-800 dark:text-slate-200">
                    {inq.budget}
                  </td>
                  <td className="py-3.5 px-4 text-slate-600 dark:text-slate-300">
                    {inq.targetDate || 'Next Month'}
                  </td>
                  <td className="py-3.5 px-4 text-slate-400">
                    {inq.date}
                  </td>
                  <td className="py-3.5 px-4">
                    <select
                      value={inq.status}
                      onChange={(e) => updateInquiryStatus(inq.id, e.target.value)}
                      className={`text-[10px] font-mono font-bold px-2 py-1 rounded border ${
                        inq.status === 'New'
                          ? 'bg-amber-500 text-slate-950 border-amber-500'
                          : inq.status === 'Contacted'
                          ? 'bg-sky-500/10 text-sky-500 border-sky-500/20'
                          : inq.status === 'Quoted'
                          ? 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20'
                          : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 border-slate-200 dark:border-slate-700'
                      }`}
                    >
                      <option value="New">New</option>
                      <option value="Contacted">Contacted</option>
                      <option value="In Review">In Review</option>
                      <option value="Quoted">Quoted</option>
                      <option value="Closed">Closed</option>
                    </select>
                  </td>
                  <td className="py-3.5 px-4 text-right">
                    <div className="flex items-center justify-end gap-1.5">
                      <button
                        onClick={() => setSelectedInquiry(inq)}
                        className="px-2.5 py-1 rounded bg-slate-900 hover:bg-slate-800 dark:bg-slate-800 dark:hover:bg-slate-700 text-white text-[11px]"
                      >
                        Details
                      </button>
                      <button
                        onClick={() => {
                          if (window.confirm(`Delete inquiry from ${inq.clientName}?`)) {
                            deleteInquiry(inq.id);
                          }
                        }}
                        className="p-1.5 text-slate-400 hover:text-rose-500"
                        title="Delete inquiry"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Inquiry Detail Modal */}
      {selectedInquiry && (
        <div 
          className="fixed inset-0 z-50 bg-slate-950/75 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in"
          onClick={() => setSelectedInquiry(null)}
        >
          <div 
            className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl max-w-lg w-full p-6 space-y-5 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
              <div>
                <h3 className="font-bold text-base text-slate-900 dark:text-white">
                  Estimate Request Details
                </h3>
                <span className="text-xs font-mono text-slate-400">ID: {selectedInquiry.id}</span>
              </div>
              <span className="text-xs font-mono px-2 py-0.5 rounded bg-amber-500 text-slate-950 font-bold">
                {selectedInquiry.status}
              </span>
            </div>

            <div className="space-y-3 text-xs font-mono">
              <div className="p-3 bg-slate-50 dark:bg-slate-800/60 rounded-lg space-y-1.5">
                <div className="flex justify-between">
                  <span className="text-slate-400">Client:</span>
                  <span className="font-bold text-slate-900 dark:text-white">{selectedInquiry.clientName}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Phone:</span>
                  <a href={`tel:${selectedInquiry.phone}`} className="text-amber-600 dark:text-amber-400 hover:underline">
                    {selectedInquiry.phone}
                  </a>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Email:</span>
                  <a href={`mailto:${selectedInquiry.email}`} className="text-sky-600 dark:text-sky-400 hover:underline">
                    {selectedInquiry.email}
                  </a>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Address / City:</span>
                  <span className="text-slate-700 dark:text-slate-300">{selectedInquiry.address || 'Bay Area, CA'}</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2 p-3 bg-slate-50 dark:bg-slate-800/60 rounded-lg">
                <div>
                  <span className="text-slate-400 block text-[10px] uppercase">Service</span>
                  <span className="font-bold text-slate-800 dark:text-slate-200">{selectedInquiry.service}</span>
                </div>
                <div>
                  <span className="text-slate-400 block text-[10px] uppercase">Budget</span>
                  <span className="font-bold text-emerald-600 dark:text-emerald-400">{selectedInquiry.budget}</span>
                </div>
              </div>

              <div className="space-y-1">
                <span className="text-slate-400 block text-[10px] uppercase">Client Message:</span>
                <p className="p-3 bg-slate-100 dark:bg-slate-800 rounded-lg text-slate-800 dark:text-slate-200 leading-relaxed font-sans text-xs">
                  "{selectedInquiry.message}"
                </p>
              </div>
            </div>

            <div className="flex items-center justify-between pt-2">
              <a
                href={`tel:${selectedInquiry.phone}`}
                className="px-4 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-mono text-xs font-bold flex items-center gap-1.5"
              >
                <Phone className="w-3.5 h-3.5" /> Call Client
              </a>

              <a
                href={`mailto:${selectedInquiry.email}?subject=Regarding your construction inquiry on GridFly`}
                className="px-4 py-2 rounded-lg bg-amber-500 hover:bg-amber-400 text-slate-950 font-mono text-xs font-bold flex items-center gap-1.5"
              >
                <Mail className="w-3.5 h-3.5" /> Send Quote Email
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
