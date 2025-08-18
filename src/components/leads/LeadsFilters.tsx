import { useEffect } from 'react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from '../ui/select';

type Props = {
  search: string;
  statusFilter: string;
  sortDesc: boolean;
  onSearchChange: (val: string) => void;
  onStatusChange: (val: string) => void;
  onToggleSort: () => void;
};

export default function LeadsFilters({
  search,
  statusFilter,
  sortDesc,
  onSearchChange,
  onStatusChange,
  onToggleSort,
}: Props) {
  useEffect(() => {
    localStorage.setItem('leads_search', search);
  }, [search]);
  useEffect(() => {
    localStorage.setItem('leads_statusFilter', statusFilter);
  }, [statusFilter]);
  useEffect(() => {
    localStorage.setItem('leads_sortDesc', sortDesc ? 'desc' : 'asc');
  }, [sortDesc]);

  useEffect(() => {
    const savedSearch = localStorage.getItem('leads_search');
    if (savedSearch !== null) onSearchChange(savedSearch);
    const savedStatus = localStorage.getItem('leads_statusFilter');
    if (savedStatus !== null) onStatusChange(savedStatus);
    // const savedSort = localStorage.getItem('leads_sortDesc');
    // if (savedSort !== null) onToggleSort();
    // Only run on mount
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
      <div className="flex gap-2">
        <Input
          type="text"
          placeholder="Search by name or company..."
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
          className="px-3 py-2 border rounded w-64"
        />

        <Select value={statusFilter} onValueChange={onStatusChange}>
          <SelectTrigger className="w-48 px-3 py-2 border rounded">
            <SelectValue placeholder="All Statuses" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="All">All Statuses</SelectItem>
            <SelectItem value="New">New</SelectItem>
            <SelectItem value="Contacted">Contacted</SelectItem>
            <SelectItem value="Qualified">Qualified</SelectItem>
            <SelectItem value="Unqualified">Unqualified</SelectItem>
          </SelectContent>
        </Select>

        <Button onClick={onToggleSort} className="px-3 py-2 border rounded ">
          Sort by Score {sortDesc ? '↓' : '↑'}
        </Button>
      </div>
    </div>
  );
}
