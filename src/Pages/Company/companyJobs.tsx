import { FC, useState, useEffect } from 'react';
import CompanyNav from '../../Components/company/companyNav';
import Modal from '../../Components/company/modal';
import { useSelector } from 'react-redux';
import { RootState } from '../../Store/store';
import { saveJob, fetchJobs, updateJob } from '../../api/company/post';
import toastr from 'toastr';
import 'toastr/build/toastr.min.css';

const CompanyJobs: FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const company = useSelector((state: RootState) => state.company.companyInfo);
  const [jobs, setJobs] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedJob, setSelectedJob] = useState<any>(null);
  const [editMode, setEditMode] = useState(false);
  const [viewMode, setViewMode] = useState(false);
  const [sortBy, setSortBy] = useState<'active' | 'inactive' | 'all'>('all'); 
console.log(error,loading)
  const handleOpenModal = () => {
    setIsModalOpen(true);
    setViewMode(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditMode(false);
    setSelectedJob(null);
    setViewMode(false);
  };

  const handleViewJob = (job: any) => {
    setSelectedJob(job);
    setIsModalOpen(true);
  };

  const handleEditJob = (job: any) => {
    setSelectedJob(job);
    setEditMode(true);
    setIsModalOpen(true);
  };

  const fetchAvailableJobs = async () => {
    setLoading(true);
    try {
        
      const response = await fetchJobs(company?._id as string, sortBy); 
      if (response.success) {
        setJobs(response.jobs);
      } else {
        setError(response.message);
      }
    } catch (err) {
      console.error('Error fetching jobs:', err);
      setError('An error occurred while fetching jobs.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (company?._id) {
      fetchAvailableJobs();
    }
  }, [company, sortBy]); 

  const handleSaveJob = async (data: any) => {
    try {
      const companyId = company?._id;

      if (!companyId) {
        throw new Error('Company ID is missing');
      }
      const payload = { ...data, companyId };
      let response;

      if (editMode && selectedJob?._id) {
        response = await updateJob(selectedJob._id, payload);
        if (response.success) {
          toastr.success('Job updated successfully!');
        } else {
          toastr.error(response.message);
        }
      } else {
        response = await saveJob(payload);
        if (response.success) {
          toastr.success('Job created successfully!');
        } else {
          toastr.error(response.message);
        }
      }

      fetchAvailableJobs();
      handleCloseModal();
    } catch (error) {
      console.error('Error saving job:', error);
    }
  };

  const getStatusClass = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-200 text-green-700';
      case 'inactive':
        return 'bg-red-200 text-red-700';
      default:
        return 'bg-gray-200 text-gray-700';
    }
  };

  return (
    <>
      <div className="flex min-h-screen">
        <CompanyNav title={'Jobs'} />

        <div className="flex-1 ">
          <div className="flex justify-end items-center mt-16 space-x-4">
            <button
              data-modal-hide="static-modal"
              type="button"
              className="text-white bg-gray-800 hover:bg-gray-600 focus:ring-4 focus:outline-none focus:ring-blue-200 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              onClick={handleOpenModal}
            >
              Create Job
            </button>

            <div className="relative">
              <input
                type="search"
                className="block w-full rounded-lg border border-gray-300 bg-gray-50 px-4 py-2 pr-10 leading-5 text-gray-900 placeholder-gray-500"
                placeholder="Search"
                aria-label="Search"
              />
              <button
                type="button"
                className="absolute right-0 top-0 m-1 flex h-full w-10 items-center justify-center text-gray-500 hover:text-gray-900"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="w-5 h-5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M21 21l-5.197-5.197M16.5 16.5A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
                  />
                </svg>
              </button>
            </div>

            <select
              onChange={(e) => setSortBy(e.target.value as 'active' | 'inactive' | 'all')}
              className="px-4 py-2 border border-gray-300 rounded-lg"
            >
              <option value="all">All Jobs</option>
              <option value="active">Active Jobs</option>
              <option value="inactive">Inactive Jobs</option>
            </select>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {jobs.map((job) => (
              <div key={job._id} className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-200">
                <div className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <h2 className="text-xl font-semibold text-gray-800 truncate">{job.title}</h2>
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusClass(job.status)}`}>
                      {job.status}
                    </span>
                  </div>
                  
                  <div className="space-y-2 mb-4">
                    <div className="flex items-center text-sm text-gray-600">
                      <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                      </svg>
                      <span>{job.level}</span>
                    </div>
                    <div className="flex items-center text-sm text-gray-600">
                      <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                      </svg>
                      <span>{job.package} LPA</span>
                    </div>
                    <div className="flex items-center text-sm text-gray-600">
                      <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path>
                      </svg>
                      <span>{job.applications} Applications</span>
                    </div>
                    <div className="flex items-center text-sm text-gray-600">
                      <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                      </svg>
                      <span>Expires: {new Date(job.expires).toLocaleDateString()}</span>
                    </div>
                  </div>

                  <div className="flex justify-between items-center mt-4">
                    <button
                      onClick={() => handleViewJob(job)}
                      className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition duration-300 ease-in-out"
                    >
                      View Details
                    </button>
                    <button
                      onClick={() => handleEditJob(job)}
                      className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 transition duration-300 ease-in-out"
                    >
                      Edit
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>
      </div>

      <Modal
  isOpen={isModalOpen}
  onClose={handleCloseModal}
  onSaveChanges={handleSaveJob}
  jobDetails={selectedJob}
  editMode={editMode}
  viewMode={viewMode}
  fields={['title', 'location', 'description', 'package', 'expires', 'opening', 'status', 'skill', 'experience', 'level']} // Example of fields
/>

    </>
  );
};

export default CompanyJobs;
