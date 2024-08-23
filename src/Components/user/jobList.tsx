import React from 'react';



interface JobListProps {
  jobs: any[];
  onSelectJob: (job: any) => void;
}

const JobList: React.FC<JobListProps> = ({ jobs, onSelectJob }) => {
  return (
    <div className="w-1/3 p-4 border-r border-gray-300 bg-white shadow-lg flex flex-col h-[calc(100vh-80px)]">
      <div className="bg-gray-800 p-4 rounded-t-lg">
        <h2 className="text-xl text-center text-white font-semibold">Available Jobs</h2>
      </div>
      <ul className="mt-4 overflow-y-auto flex-grow">
      {jobs.map((job, index) => (
  <li
    key={`${job.title}-${job.location}-${index}`}  // Create a unique key
    onClick={() => onSelectJob(job)}
    className="cursor-pointer p-4 border mb-4 rounded-lg hover:bg-gray-100"
  >
    <h3 className="font-bold text-lg">{job.title}</h3>
    <p className="text-sm text-gray-600">{job.company}</p>
    <p className="text-sm text-gray-500">{job.location}</p>
  </li>
))}

      </ul>
    </div>
  );
};

export default JobList;
