import React from 'react';
import { IoLocationOutline, IoLayers, IoCashOutline } from 'react-icons/io5';

interface JobListProps {
  jobs: any[];
  onSelectJob: (job: any) => void;
  user: any | null;
}

const JobList: React.FC<JobListProps> = ({ jobs, onSelectJob, user }) => {
  return (
    <div className="w-full md:w-1/3 bg-white shadow-lg flex flex-col h-[calc(100vh-80px)] border border-gray-300 "> {/* Added border and margin */}
      <div className="bg-blue-600 p-3"> {/* Reduced padding */}
        <h2 className="text-lg text-center text-white font-semibold">Available Positions</h2> {/* Adjusted font size */}
      </div>
      <div className="overflow-y-auto flex-grow">
        <ul className="divide-y divide-gray-200">
          {jobs.map((job) => {
            const hasApplied = user?.jobs.includes(job._id);
            return (
              <li
                key={job._id}
                onClick={() => onSelectJob(job)}
                className="cursor-pointer hover:bg-blue-50 transition-colors duration-150 ease-in-out"
              >
                <div className="p-3"> {/* Reduced padding */}
                  <div className="flex justify-between items-center">
                    <h3 className="text-base font-medium text-blue-600">{job.title}</h3> {/* Adjusted font size */}
                    {hasApplied ? (
                      <span className="px-2 inline-flex text-xs font-semibold rounded-full bg-blue-100 text-blue-800">
                        Applied
                      </span>
                    ) : (
                      <span className="px-2 inline-flex text-xs font-semibold rounded-full bg-green-100 text-green-800">
                        Open
                      </span>
                    )}
                  </div>
                  <div className="mt-1 sm:flex sm:justify-between">
                    <div className="space-y-1">
                      <p className="flex items-center text-sm text-gray-500">
                        <IoLocationOutline className="mr-1 h-4 w-4 text-gray-400" /> {/* Reduced icon size */}
                        {job.location}
                      </p>
                      <p className="flex items-center text-sm text-gray-500">
                        <IoLayers className="mr-1 h-4 w-4 text-gray-400" />
                        {job.level}
                      </p>
                      <p className="flex items-center text-sm text-gray-500">
                        <IoCashOutline className="mr-1 h-4 w-4 text-gray-400" />
                        {job.package}
                      </p>
                    </div>
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default JobList;
