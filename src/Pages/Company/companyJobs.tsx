import { FC, useState, useEffect } from 'react';
import CompanyNav from '../../Components/company/companyNav';
import Modal from '../../Components/company/modal';
import { useSelector } from 'react-redux';
import { RootState } from '../../Store/store';
import { saveJob, fetchJobs } from '../../api/company/post';
import toastr from 'toastr';
import 'toastr/build/toastr.min.css';

const CompanyJobs: FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const company = useSelector((state: RootState) => state.company.companyInfo);
  const [jobs, setJobs] = useState<any[]>([]); // Adjust the type based on your job data
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedJob, setSelectedJob] = useState<any>(null); // Adjust the type based on your job data


  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);

  const handleViewJob = (job: any) => {
    setSelectedJob(job);
    setIsModalOpen(true);
  };
  
  const fetchAvailableJobs = async () => {
    setLoading(true);
    try {
      const response = await fetchJobs(company?._id as string);
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
  }, [company]);

  const handleSaveJob = async (data: any) => {
    try {
      const companyId = company?._id;

      if (!companyId) {
        throw new Error('Company ID is missing');
      }

      const payload = { ...data, companyId };

      const response = await saveJob(payload);

      if (response.success) {
        toastr.success(response.message);
        fetchAvailableJobs(); // Refresh the jobs list after saving a new job
      } else {
        toastr.error(response.message);
      }

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
        <button
          data-modal-hide="static-modal"
          type="button"
          className="fixed top-16 right-4 text-white bg-gray-800 hover:bg-gray-600 focus:ring-4 focus:outline-none focus:ring-blue-200 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          onClick={handleOpenModal}
        >
          Create Job
        </button>

        <div className="flex-1 ml-64 p-2">
          <div className="flex flex-wrap justify-start mt-20">
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
    className="bg-gray-400 text-white px-3 py-1 rounded-lg hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-300"
  >
    Edit
  </button>
</div>

                </div>
              ))
            ) : (
              <p>No jobs available.</p>
            )}
          </div>
        </div>
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onSaveChanges={handleSaveJob}
        fields={[
          'Title',
          'location',
          'description',
          'package',
          'expires',
          'opening',
          'status',
          'skill',
          'experience',
          'level'
        ]}
        jobDetails={selectedJob}
      />
    </>
  );
};

export default CompanyJobs;
