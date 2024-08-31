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
  const [sortBy, setSortBy] = useState<'active' | 'inactive' | 'all'>('all'); // New state for sorting

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
        
      const response = await fetchJobs(company?._id as string, sortBy); // Pass sortBy as a parameter
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
  }, [company, sortBy]); // Re-fetch jobs when company ID or sortBy changes

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

        <div className="flex-1 ml-64 p-2">
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

          <div className="flex flex-wrap justify-start mt-8">
            {loading && <p>Loading...</p>}
            {error && <p className="text-red-500">{error}</p>}
            {jobs.length > 0 ? (
              jobs.map((job) => (
                <div
                  key={job._id}
                  className="w-80 h-75 max-w-sm rounded-lg overflow-hidden shadow-lg m-4 bg-white"
                >
                  <div className="px-6 py-4 bg-gray-100 h-24 flex flex-col">
                    <div className="font-bold text-xl mb-2 text-gray-800 truncate">{job.title}</div>
                    <p className="text-gray-600 text-sm font-semibold">{job.package} LPA</p>
                  </div>
                  <div className="px-6 py-4 flex-1">
                    <div className="mt-4">
                      <div className="flex mb-2 items-center">
                        <p className="text-gray-800 font-semibold flex-shrink-0">Applications:</p>
                        <p className="text-gray-600 text-sm flex-grow ml-2">{job.applications}</p>
                      </div>
                      <div className="flex mb-2 items-center">
                        <p className="text-gray-800 font-semibold flex-shrink-0">Package:</p>
                        <p className="text-gray-600 text-sm flex-grow ml-2">{job.package} LPA</p>
                      </div>
                      <div className="flex mb-2 items-center">
                        <p className="text-gray-800 font-semibold flex-shrink-0">Level:</p>
                        <p className="text-gray-600 text-sm flex-grow ml-2">{job.level}</p>
                      </div>
                    </div>
                  </div>

                  <div className="px-6 pt-4 pb-2 flex flex-wrap gap-2">
                    <span className={`inline-block rounded-full px-3 py-1 text-sm font-semibold ${getStatusClass(job.status)}`}>
                      {job.status}
                    </span>
                    <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700">
                      Expires: {new Date(job.expires).toLocaleDateString()}
                    </span>
                  </div>
                  <div className="px-6 pt-4 pb-2 flex justify-between">
                    <button
                      className="bg-gray-800 text-white px-3 py-1 rounded-lg hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-300"
                      onClick={() => handleViewJob(job)}
                    >
                      View
                    </button>
                    <button
                      className="bg-gray-400 text-white px-3 py-1 rounded-lg hover:bg-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-300"
                      onClick={() => handleEditJob(job)}
                    >
                      Edit
                    </button>
                  </div>
                </div>
              ))
            ) : (
              !loading && <p>No jobs found.</p>
            )}
          </div>
        </div>
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onSave={handleSaveJob}
        job={selectedJob}
        editMode={editMode}
        viewMode={viewMode}
      />
    </>
  );
};

export default CompanyJobs;
