import { useState, useMemo, useEffect } from 'react';
import LeadDetailDrawer from './components/leads/LeadDetailDrawer';
import { useLeads } from './hooks/useLeads';
import LeadsFilters from './components/leads/LeadsFilters';
import LeadsTable from './components/leads/LeadsTable';
import { ThemeToggle } from './components/theme/toggleTheme';
import OpportunitiesTable from './components/opportunities/OpportunitiesTable';
import type { Opportunity } from './types/leads';

function App() {
  const { leads, isLoading, setLeads, error } = useLeads(2000);

  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [sortDesc, setSortDesc] = useState(true);

  // Restore persisted filter state from localStorage on mount
  useEffect(() => {
    const savedSearch = localStorage.getItem('leads_search');
    if (savedSearch !== null) setSearch(savedSearch);
    const savedStatus = localStorage.getItem('leads_statusFilter');
    if (savedStatus !== null) setStatusFilter(savedStatus);
    const savedSort = localStorage.getItem('leads_sortDesc');
    if (savedSort !== null) setSortDesc(savedSort === 'desc');
  }, []);
  const [selectedLead, setSelectedLead] = useState<
    import('./types/leads').Lead | null
  >(null);
  const [opportunities, setOpportunities] = useState<Opportunity[]>([]);

  const filteredLeads = useMemo(() => {
    return leads
      .filter((lead) =>
        [lead.name.toLowerCase(), lead.company.toLowerCase()].some((val) =>
          val.includes(search.toLowerCase())
        )
      )
      .filter((lead) =>
        statusFilter === 'All' ? true : lead.status === statusFilter
      )
      .sort((a, b) => (sortDesc ? b.score - a.score : a.score - b.score));
  }, [leads, search, statusFilter, sortDesc]);

  const handleRowClick = (lead: import('./types/leads').Lead) => {
    setSelectedLead(lead);
  };

  const handleDrawerClose = () => {
    setSelectedLead(null);
  };

  // Save lead edits
  const handleLeadSave = (updatedLead: import('./types/leads').Lead) => {
    setLeads((prevLeads) =>
      prevLeads.map((lead) => (lead.id === updatedLead.id ? updatedLead : lead))
    );
    setSelectedLead(null);
  };

  // Convert lead to opportunity
  const handleLeadConvert = (lead: import('./types/leads').Lead) => {
    const newOpportunity: Opportunity = {
      id: Date.now(),
      name: lead.name,
      stage: 'Prospecting',
      amount: lead.score * 1000, // Example of conversion for amount (origin of value not specified in documentation)
      accountName: lead.company,
    };
    setOpportunities((prev) => [...prev, newOpportunity]);
    setSelectedLead(null);
  };

  if (isLoading) return <div className="p-4">Loading...</div>;
  if (error)
    return (
      <div role="alert" className="p-4 text-red-600">
        {error}
      </div>
    );
  if (leads.length === 0) return <div className="p-4">No leads found</div>;

  return (
    <div className="container mx-auto p-4 space-y-4">
      <div className="flex justify-end">
        <ThemeToggle />
      </div>
      <LeadsFilters
        search={search}
        statusFilter={statusFilter}
        sortDesc={sortDesc}
        onSearchChange={setSearch}
        onStatusChange={setStatusFilter}
        onToggleSort={() => setSortDesc(!sortDesc)}
      />
      <LeadsTable
        leads={filteredLeads}
        total={leads.length}
        onRowClick={handleRowClick}
      />
      <LeadDetailDrawer
        lead={selectedLead}
        onClose={handleDrawerClose}
        onSave={handleLeadSave}
        onConvert={handleLeadConvert}
      />
      <OpportunitiesTable opportunities={opportunities} />
    </div>
  );
}

export default App;
