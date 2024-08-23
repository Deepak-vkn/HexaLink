import React from 'react';

interface JobDetailsProps {
  job: any | null;
}

const JobDetails: React.FC<JobDetailsProps> = ({ job }) => {
  if (!job) {
    return (
      <div className="w-2/3 p-8 bg-white shadow-lg flex items-center justify-center h-[calc(100vh-80px)]">
        <h2 className="text-xl font-semibold text-gray-700">Select a job to view details</h2>
      </div>
    );
  }

  // Convert the expires date string to a Date object
  const expiresDate = job.expires ? new Date(job.expires) : null;
  const isValidDate = expiresDate && !isNaN(expiresDate.getTime());

  return (
    <div className="w-2/3 p-8 bg-white shadow-lg h-[calc(100vh-80px)] flex flex-col justify-between">
      <div>
        <h2 className="text-2xl font-bold mb-4 text-gray-800">{job.title}</h2>
        <p className="text-md mb-4 text-gray-500">{job.location}</p>
        {job.package && <p className="text-md mb-2 text-gray-700">Package: ${job.package}</p>}
        {isValidDate && <p className="text-md mb-2 text-gray-700">Expires: {expiresDate.toLocaleDateString()}</p>}
        {job.applications !== undefined && <p className="text-md mb-2 text-gray-700">Applications: {job.applications}</p>}
        {job.skill && <p className="text-md mb-2 text-gray-700">Skills: {job.skill.join(', ')}</p>}
        {job.experience && <p className="text-md mb-2 text-gray-700">Experience: {job.experience}</p>}
        {job.posted && <p className="text-md mb-2 text-gray-700">Posted: {new Date(job.posted).toLocaleDateString()}</p>}
        {job.level && <p className="text-md mb-2 text-gray-700">Level: {job.level}</p>}
        <p className="text-md mt-4 text-gray-700">{job.description}</p>
      </div>
      <div className="mt-8 flex justify-between">
        <button className="px-6 py-2 bg-blue-600 text-white font-semibold rounded hover:bg-blue-700">
          Apply
        </button>
        <button className="px-6 py-2 bg-gray-600 text-white font-semibold rounded hover:bg-gray-700">
          Save
        </button>
      </div>
    </div>
  );
};

export default JobDetails;
