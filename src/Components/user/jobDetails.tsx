import React, { useState } from 'react';

interface JobDetailsProps {
  job: any | null;
  onApplyClick: () => void;
  user: any | null;
}

const JobDetails: React.FC<JobDetailsProps> = ({ job, onApplyClick, user }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleApplyClick = () => {
    onApplyClick();
  };

  if (!job) {
    return (
      <div className="w-2/3 p-8 bg-white shadow-lg flex items-center justify-center h-[calc(100vh-80px)] border border-gray-300">
        <h2 className="text-2xl font-bold text-gray-800">Select a job to view details</h2>
      </div>
    );
  }

  // Check if the user has applied for the job
  const hasApplied = user?.jobs.includes(job._id);

  // Convert the expires date string to a Date object
  const expiresDate = job.expires ? new Date(job.expires) : null;
  const isValidDate = expiresDate && !isNaN(expiresDate.getTime());
  const isExpired = expiresDate && expiresDate < new Date();

  return (
    <div className="w-2/3 p-8 bg-white shadow-lg flex flex-col justify-between border border-gray-300 h-[calc(100vh-80px)]">
      <div>
        <h2 className="text-3xl font-semibold mb-4 text-gray-900">{job.title}</h2>
        <p className="text-lg font-semibold mb-4 text-gray-600">{job.location}</p>
        {job.package && (
          <p className="text-md mb-2 text-gray-700">
            <span className="font-semibold text-gray-800">Package:</span> {job.package} LPA
          </p>
        )}
        {job.posted && (
          <p className="text-md mb-2 text-gray-700">
            <span className="font-semibold text-gray-800">Posted:</span> {new Date(job.posted).toLocaleDateString()}
          </p>
        )}
        {isValidDate && (
          <p className="text-md mb-2 text-gray-700">
            <span className="font-semibold text-gray-800">Expires:</span> {expiresDate.toLocaleDateString()}
          </p>
        )}
        {!isValidDate && (
          <p className="text-md mb-2 text-gray-700">
            <span className="font-semibold text-gray-800">Expires:</span> N/A
          </p>
        )}
        {job.skill && (
          <p className="text-md mb-2 text-gray-700">
            <span className="font-semibold text-gray-800">Skills:</span> {job.skill.join(', ')}
          </p>
        )}
        {job.experience && (
          <p className="text-md mb-2 text-gray-700">
            <span className="font-semibold text-gray-800">Experience:</span> {job.experience}
          </p>
        )}
        {job.level && (
          <p className="text-md mb-2 text-gray-700">
            <span className="font-semibold text-gray-800">Level:</span> {job.level}
          </p>
        )}
        {job.applications !== undefined && (
          <p className="text-md mb-2 text-gray-700">
            <span className="font-semibold text-gray-800">Applications:</span> {job.applications}
          </p>
        )}
        <p className="text-md mt-4 text-gray-700">
          <span className="font-semibold text-gray-800">About the job:</span> {job.description}
        </p>
      </div>
      <div className="mt-8 flex justify-between">
        <button
          className={`px-6 py-2 font-semibold rounded ${
            isExpired
              ? 'bg-gray-300 text-gray-600 cursor-not-allowed'
              : hasApplied
              ? 'bg-gray-300 text-gray-600 cursor-not-allowed'
              : 'bg-gray-800 text-white hover:bg-gray-700'
          }`}
          onClick={handleApplyClick}
          disabled={isExpired || hasApplied}
        >
          {isExpired ? 'Expired' : hasApplied ? 'Applied' : 'Apply'}
        </button>
        <button className="px-6 py-2 bg-gray-600 text-white font-semibold rounded hover:bg-gray-700">
          Save
        </button>
      </div>
    </div>
  );
};

export default JobDetails;
