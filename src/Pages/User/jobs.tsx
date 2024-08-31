import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../Store/store';
import Navbar from '../../Components/user/navbar';
import JobList from '../../Components/user/jobList';
import JobDetails from '../../Components/user/jobDetails';
import { fetchJobs } from '../../api/user/get';
import { applyJob } from '../../api/user/post';
import toastr from 'toastr';
import 'toastr/build/toastr.min.css';

const Jobs: React.FC = () => {
  const user = useSelector((state: RootState) => state.user.userInfo);

  const [jobs, setJobs] = useState<any[]>([]);
  const [selectedJob, setSelectedJob] = useState<any | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [isJobApplyOpen, setIsJobApplyOpen] = useState<boolean>(false);
  const [applicationData, setApplicationData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    resume: null as File | null,
    experience: '' 
  });

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
    setSelectedJob(job);
  };

  const handleApplyClick = () => {
    setIsJobApplyOpen(true);
  };

  const closeJobApply = () => {
    setIsJobApplyOpen(false);
    setSelectedJob(null);
    setApplicationData({
      name: user?.name || '',
      email: user?.email || '',
      resume: null,
      experience: '' 
    });
  };

  const handleJobApplication = async (event: React.FormEvent) => {
    event.preventDefault();
  

    if (!applicationData.name || !applicationData.email || !applicationData.resume || !applicationData.experience) {
      alert('Please fill out all fields and upload a resume.');
      return;
    }
    
    const formData = new FormData();
    formData.append('userId', user?._id || '');
    formData.append('name', applicationData.name);
    formData.append('email', applicationData.email);
    formData.append('experience', applicationData.experience);
    formData.append('file', applicationData.resume!); 
    formData.append('jobId', selectedJob?._id); 
  
    try {

      const response = await applyJob(formData);
  
     
      if (response.success) {
        toastr.success(response.message);
        closeJobApply(); 
      } else {
        toastr.error(response.message);
      }
    } catch (error) {
      console.error('Error submitting application:', error);
      toastr.error('Error submitting application:');
    }
  };
  
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setApplicationData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files ? event.target.files[0] : null;
    setApplicationData(prevData => ({
      ...prevData,
      resume: file
    }));
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="flex flex-col h-screen">
      <Navbar user={user} />
      <div className="flex flex-grow">
        <JobList jobs={jobs} onSelectJob={handleSelectJob} user={user}/>


        <JobDetails job={selectedJob} onApplyClick={handleApplyClick} user={user} />
        
      </div>

      {/* Modal */}
      {isJobApplyOpen && selectedJob && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-8 rounded-md shadow-lg max-w-md w-full">
            <h2 className="text-xl font-medium text-gray-800 mb-4">Apply for {selectedJob.title}</h2>
            <form onSubmit={handleJobApplication}>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2" htmlFor="name">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={applicationData.name}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border-0 border-b-2 border-gray-300 focus:border-b-2 focus:border-blue-500 focus:outline-none transition duration-200 ease-in-out"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2" htmlFor="email">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={applicationData.email}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border-0 border-b-2 border-gray-300 focus:border-b-2 focus:border-blue-500 focus:outline-none transition duration-200 ease-in-out"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2" htmlFor="experience">
                  Experience
                </label>
                <input
                  type="text"
                  id="experience"
                  name="experience"
                  value={applicationData.experience}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border-0 border-b-2 border-gray-300 focus:border-b-2 focus:border-blue-500 focus:outline-none transition duration-200 ease-in-out"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2" htmlFor="resume">
                  Upload Resume (PDF)
                </label>
                <input
                  type="file"
                  id="resume"
                  name="resume"
                  accept=".pdf"
                  onChange={handleFileChange}
                  className="w-full"
                  required
                />
              </div>
              <div className="flex justify-end space-x-4">
                <button
                  type="button"
                  className="px-4 py-2 bg-gray-400 text-white rounded-md hover:bg-gray-300"
                  onClick={closeJobApply}
                >
                  Close
                </button>
                <button
                  type="submit"
                   className="px-4 py-2 bg-gray-800 text-white rounded-md hover:bg-gray-400"
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Jobs;
