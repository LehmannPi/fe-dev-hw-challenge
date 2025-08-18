import type { Lead } from '../../types/leads';

type Props = {
  lead: Lead;
  onRowClick?: (lead: Lead) => void;
};

export default function LeadsTableRow({ lead, onRowClick }: Props) {
  return (
    <tr
      className="hover:bg-gray-50 dark:hover:bg-gray-800 cursor-pointer"
      onClick={onRowClick ? () => onRowClick(lead) : undefined}
    >
      <td className="px-4 py-2 font-medium">{lead.id}</td>
      <td className="px-4 py-2">{lead.name}</td>
      <td className="px-4 py-2">{lead.company}</td>
      <td className="px-4 py-2">
        <a
          href={`mailto:${lead.email}`}
          className="text-blue-600 dark:text-blue-400 underline"
        >
          {lead.email}
        </a>
      </td>
      <td className="px-4 py-2">{lead.source}</td>
      <td className="px-4 py-2 text-right font-semibold">{lead.score}</td>
      <td className="px-4 py-2">
        <span
          className={`px-2 py-1 rounded text-sm ${
            lead.status === 'New'
              ? 'bg-blue-100 text-blue-800 dark:bg-blue-800 dark:text-blue-100'
              : lead.status === 'Contacted'
              ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-800 dark:text-yellow-100'
              : lead.status === 'Qualified'
              ? 'bg-green-100 text-green-800 dark:bg-green-800 dark:text-green-100'
              : 'bg-gray-200 text-gray-800 dark:bg-gray-700 dark:text-gray-200'
          }`}
        >
          {lead.status}
        </span>
      </td>
    </tr>
  );
}
