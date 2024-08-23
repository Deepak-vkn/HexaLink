import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../Store/store';
import Navbar from '../../Components/user/navbar';
import JobList from '../../Components/user/jobList';
import JobDetails from '../../Components/user/jobDetails';
import { fetchJobs } from '../../api/user/get';


const Jobs: React.FC = () => {
  const user = useSelector((state: RootState) => state.user.userInfo);

  const [jobs, setJobs] = useState<any[]>([]);
  const [selectedJob, setSelectedJob] = useState<any | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchJobData = async () => {
      try {
        setLoading(true);
        const response = await fetchJobs();
        if (response.success) {
          setJobs(response.jobs);
        } else {
          setError(response.message);
        }
      } catch (error) {
        setError('Failed to fetch jobs');
      } finally {
        setLoading(false);
      }
    };

    fetchJobData();
  }, []);

  const handleSelectJob = (job: any) => {
    console.log('selected job is',job)
    setSelectedJob(job);
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="flex flex-col h-screen">
      <Navbar user={user} />
      <div className="flex flex-grow">
        <JobList jobs={jobs} onSelectJob={handleSelectJob} />
        <JobDetails job={selectedJob} />
      </div>
    </div>
  );
};

export default Jobs;
