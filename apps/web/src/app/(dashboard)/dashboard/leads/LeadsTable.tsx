import { getLeads } from "@/data/leads";

export default async function LeadsTable() {
  const leads = await getLeads();
  return (
    <table className="min-w-full border rounded-xl">
      <thead>
        <tr className="bg-muted">
          <th className="px-4 py-2">ID</th>
          <th className="px-4 py-2">Name</th>
          <th className="px-4 py-2">Email</th>
          <th className="px-4 py-2">Phone</th>
          <th className="px-4 py-2">Source</th>
          <th className="px-4 py-2">Status</th>
          <th className="px-4 py-2">Created</th>
        </tr>
      </thead>
      <tbody>
        {leads?.map((lead: any) => (
          <tr key={lead.id} className="border-b">
            <td className="px-4 py-2">{lead.id}</td>
            <td className="px-4 py-2">{lead.name}</td>
            <td className="px-4 py-2">{lead.email}</td>
            <td className="px-4 py-2">{lead.phone}</td>
            <td className="px-4 py-2">{lead.source}</td>
            <td className="px-4 py-2">{lead.status}</td>
            <td className="px-4 py-2">{lead.created_at}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
