import type { Lead } from '../../types/leads';
import LeadsTableRow from './LeadsTableRow';

type Props = {
  leads: Lead[];
  total: number;
  onRowClick?: (lead: Lead) => void;
};

export default function LeadsTable({ leads, total, onRowClick }: Props) {
  return (
    <div className="overflow-x-auto max-h-[500px] overflow-y-auto border rounded-lg">
      <table className="bg-white dark:bg-gray-900 rounded-lg shadow min-w-[800px] w-full">
        <caption className="p-2 text-sm text-gray-600 dark:text-gray-400">
          Manage and triage your leads.
        </caption>
        <thead className="bg-gray-100 dark:bg-gray-800">
          <tr>
            <th className="px-4 py-2 text-left w-[60px]">ID</th>
            <th className="px-4 py-2 text-left">Name</th>
            <th className="px-4 py-2 text-left">Company</th>
            <th className="px-4 py-2 text-left">Email</th>
            <th className="px-4 py-2 text-left">Source</th>
            <th className="px-4 py-2 text-right">Score</th>
            <th className="px-4 py-2 text-left">Status</th>
          </tr>
        </thead>
        <tbody>
          {leads.map((lead) => (
            <LeadsTableRow key={lead.id} lead={lead} onRowClick={onRowClick} />
          ))}
        </tbody>
        <tfoot>
          <tr>
            <td colSpan={7} className="px-4 py-2 text-sm font-medium">
              Showing {leads.length} of {total} leads
            </td>
          </tr>
        </tfoot>
      </table>
    </div>
  );
}
