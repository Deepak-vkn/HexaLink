import React from 'react';

interface JobListProps {
  jobs: any[];
  onSelectJob: (job: any) => void;
  user: any | null;
}

const JobList: React.FC<JobListProps> = ({ jobs, onSelectJob, user }) => {
  return (
    <div className="w-full md:w-1/3 p-4 border-r border-gray-300 bg-white shadow-lg flex flex-col h-[calc(100vh-80px)]">
      <div className="bg-gray-800 p-4 rounded-t-lg">
        <h2 className="text-lg md:text-xl text-center text-white font-semibold">Available Jobs</h2>
      </div>
      <ul className="mt-4 overflow-y-auto flex-grow">
        {jobs.map((job) => {
          const hasApplied = user?.jobs.includes(job._id);
          return (
            <li
              key={job._id}
              onClick={() => onSelectJob(job)}
              className="cursor-pointer p-3 md:p-4 border mb-4 rounded-lg hover:bg-gray-100"
            >
              <h3 className="font-bold text-base md:text-lg">{job.title}</h3>
              <p className="text-xs md:text-sm text-gray-500">Place: {job.location}</p>
              <p className="text-xs md:text-sm text-gray-500">Level: {job.level}</p>
              {hasApplied ? (
                <p className="text-red-600 font-normal mt-2">Applied</p>
              ) : (
                <p className="text-green-600 font-normal mt-2">Apply</p>
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default JobList;
