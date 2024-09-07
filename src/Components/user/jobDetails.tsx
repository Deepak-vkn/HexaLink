import React, { useState } from 'react';

interface JobDetailsProps {
  job: any | null;
  onApplyClick: () => void;
  user: any | null;
}

const JobDetails: React.FC<JobDetailsProps> = ({ job, onApplyClick, user }) => {
  const [isDescriptionExpanded, setIsDescriptionExpanded] = useState(false);

  const handleApplyClick = () => {
    onApplyClick();
  };
  if (!job) {
    return (
      <div className="w-full max-w-3xl mx-auto p-8 bg-white shadow-lg flex items-center justify-center h-[calc(100vh-80px)] border border-gray-300 rounded-lg">
        <h2 className="text-2xl font-bold text-gray-800">Select a job to view details</h2>
      </div>
    );
  }

  const hasApplied = user?.jobs.includes(job._id);
  const expiresDate = job.expires ? new Date(job.expires) : null;
  const isValidDate = expiresDate && !isNaN(expiresDate.getTime());
  const isExpired = expiresDate && expiresDate < new Date();
  return (
    <div className="w-full max-w-3xl mx-auto bg-white shadow-lg border border-gray-300 rounded-lg overflow-hidden">
      <div className="p-8">
        <h2 className="text-2xl font-bold mb-2 text-gray-900">Position :  {job.title}</h2>
        <p className="text-lg text-blue-600 mb-4">{job.location}</p>
        <div className="flex flex-wrap gap-4 mb-6">
          {job.package && (
            <span className="inline-flex items-center text-sm text-gray-600">
              <svg className="w-5 h-5 mr-2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
             Package:  {job.package} LPA
            </span>
          )}
          {job.posted && (
            <span className="inline-flex items-center text-sm text-gray-600">
              <svg className="w-5 h-5 mr-2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
              Posted: {new Date(job.posted).toLocaleDateString()}
            </span>
          )}
          {isValidDate && (
            <span className="inline-flex items-center text-sm text-gray-600">
              <svg className="w-5 h-5 mr-2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
              Expires: {expiresDate.toLocaleDateString()}
            </span>
          )}
        </div>

        {job.skill && (
          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-2 text-gray-800">Skills</h3>
            <div className="flex flex-wrap gap-2">
              {job.skill.map((skill: string, index: number) => (
                <span key={index} className="bg-blue-100 text-blue-800 text-sm font-medium px-2.5 py-0.5 rounded">
                  {skill}
                </span>
              ))}
            </div>
          </div>
        )}

        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-2 text-gray-800">Job Details</h3>
          <div className="grid grid-cols-2 gap-4">
            {job.experience && (
              <div className="flex items-center">
                <svg className="w-5 h-5 mr-2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                <span className="text-sm text-gray-600">Expirence Required: {job.experience} years</span>  
              </div> 
            )}
            {job.level && (
              <div className="flex items-center">
                <svg className="w-5 h-5 mr-2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" /></svg>
                <span className="text-sm text-gray-600">Level: {job.level}</span>
              </div>
            )}
            {job.applications !== undefined && (
              <div className="flex items-center">
                <svg className="w-5 h-5 mr-2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" /></svg>
                <span className="text-sm text-gray-600">Applicants: {job.applications} </span>
              </div>
            )}
          </div>
        </div>

        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-2 text-gray-800">About the job</h3>
          <p className={`text-gray-600 ${isDescriptionExpanded ? '' : 'line-clamp-3'}`}>
            {job.description}
          </p>
          {job.description.length > 150 && (
            <button
              onClick={() => setIsDescriptionExpanded(!isDescriptionExpanded)}
              className="mt-2 text-blue-600 hover:text-blue-800 font-semibold"
            >
              {isDescriptionExpanded ? 'Show less' : 'Show more'}
            </button>
          )}
        </div>
      </div>

      <div className="bg-gray-50 px-8 py-4 flex justify-between items-center border-t border-gray-200">
        <button
          className={`px-6 py-2 font-semibold rounded-full ${
            isExpired || hasApplied
              ? 'bg-gray-300 text-gray-600 cursor-not-allowed'
              : 'bg-blue-600 text-white hover:bg-blue-700'
          }`}
          onClick={handleApplyClick}
          disabled={isExpired || hasApplied}
        >
          {isExpired ? 'Expired' : hasApplied ? 'Applied' : 'Apply now'}
        </button>
        <button className="px-6 py-2 bg-white text-blue-600 font-semibold rounded-full border border-blue-600 hover:bg-blue-50">
          Save
        </button>
      </div>
    </div>
  );
};

export default JobDetails;