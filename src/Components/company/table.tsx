import React from 'react';

interface TableProps {
  data: any[]; // Adjust the type as needed
  headings: string[];
  onApplicationDecision: (applicationId: string, decision: string) => void;
}

const Table: React.FC<TableProps> = ({ data, headings, onApplicationDecision }) => {
  return (
    <div>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white table-fixed">
          <thead>
            <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
              <th className="py-3 px-6 text-left w-10">#</th> {/* Adjust width for index column */}
              {headings.map((heading, index) => (
                <th key={index} className="py-3 px-6 text-left">
                  {heading}
                </th>
              ))}
              <th className="py-3 px-6 text-left w-32">Resume</th> {/* Adjust width for Resume column */}
              <th className="py-3 px-6 text-left w-32">Application Decision</th> {/* Adjust width for dropdown column */}
            </tr>
          </thead>
          <tbody className="text-gray-600 text-sm font-light">
            {data.map((applicant, index) => (
              <tr key={applicant._id} className="border-b border-gray-200 hover:bg-gray-100">
                {/* Index */}
                <td className="py-3 px-6 text-left">{index + 1}</td>
                {/* Name */}
                <td className="py-3 px-6 text-left">{applicant.name}</td>
                {/* Email */}
                <td className="py-3 px-6 text-left">{applicant.email}</td>
                {/* Experience */}
                <td className="py-3 px-6 text-left">{applicant.experience}</td>
                {/* Status */}
                <td className="py-3 px-6 text-left">{applicant.status}</td>
                {/* View Resume */}
                <td className="py-3 px-6 text-center">
                  <a 
                    href={`data:application/pdf;base64,${applicant.resume}`} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="text-blue-500 hover:underline"
                  >
                    View Resume
                  </a>
                </td>
                {/* Dropdown for Application Decision */}
                <td className="py-3 px-6 text-center">
                  <select
                    className="bg-gray-200 text-gray-600 py-2 px-4 rounded"
                    onChange={(e) => onApplicationDecision(applicant._id, e.target.value)}
                  >
                    <option value="">Select</option>
                    <option value="Pending">Pending</option>
                    <option value="Reviewed">Reviewed</option>
                    <option value="Shortlisted">Shortlist</option>
                    <option value="Rejected">Rejected</option>
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Table;
