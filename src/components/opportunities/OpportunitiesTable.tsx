import type { Opportunity } from '../../types/leads';

type Props = {
  opportunities: Opportunity[];
};

export default function OpportunitiesTable({ opportunities }: Props) {
  return (
    <div className="overflow-x-auto max-h-[500px] overflow-y-auto border rounded-lg">
      <table className="bg-white dark:bg-gray-900 rounded-lg shadow min-w-[600px] w-full">
        <caption className="p-2 text-sm text-gray-600 dark:text-gray-400">
          Opportunities
        </caption>
        <thead className="bg-gray-100 dark:bg-gray-800">
          <tr>
            <th className="px-4 py-2 text-left w-[60px]">ID</th>
            <th className="px-4 py-2 text-left">Name</th>
            <th className="px-4 py-2 text-left">Stage</th>
            <th className="px-4 py-2 text-right">Amount</th>
            <th className="px-4 py-2 text-left">Account Name</th>
          </tr>
        </thead>
        <tbody>
          {opportunities.map((opp) => (
            <tr
              key={opp.id}
              className="hover:bg-gray-50 dark:hover:bg-gray-800"
            >
              <td className="px-4 py-2 font-medium">{opp.id}</td>
              <td className="px-4 py-2">{opp.name}</td>
              <td className="px-4 py-2">{opp.stage}</td>
              <td className="px-4 py-2 text-right">{opp.amount ?? '-'}</td>
              <td className="px-4 py-2">{opp.accountName}</td>
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr>
            <td colSpan={5} className="px-4 py-2 text-sm font-medium">
              Showing {opportunities.length} opportunities
            </td>
          </tr>
        </tfoot>
      </table>
    </div>
  );
}
