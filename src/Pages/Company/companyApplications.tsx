import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../Store/store'; 
import { fetchApplications, updateApplicationStatus } from '../../api/company/get';
import { fetchJobs } from '../../api/company/post';
import Table from '../../Components/company/table';
import CompanyNav from '../../Components/company/companyNav'; 
import Loading from '../../Components/loading';

const CompanyApplications = () => {
    const company = useSelector((state: RootState) => state.company.companyInfo);
    const [applications, setApplications] = useState<any[]>([]);
    const [jobs, setJobs] = useState<any[]>([]);
    const [filteredApplications, setFilteredApplications] = useState<any[]>([]);
    const [selectedJob, setSelectedJob] = useState<string | null>(null);
    const [selectedStatus, setSelectedStatus] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [loadingTable, setLoadingTable] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const jobsResponse = await fetchJobs(company?._id as string, 'all');
                if (jobsResponse.success) {
                    setJobs(jobsResponse.jobs || []);
                } else {
                    setError(jobsResponse.message);
                }
                const response = await fetchApplications(company?._id as string);
                if (response.success) {
                    setApplications(response.applications || []);
                    setFilteredApplications(response.applications || []);
                } else {
                    setError(response.message);
                }
            } catch (err) {
                console.error('Error fetching data:', err);
                setError('An error occurred while fetching data.');
            } finally {
                setLoading(false);
                setLoadingTable(false);
            }
        };

        if (company?._id) {
            fetchData();
        }
    }, [company?._id]);

    useEffect(() => {
        setLoadingTable(true);
        const filteredByJob = filterApplicationsByJob(applications, selectedJob);
        const filtered = filteredByJob.filter((app) => {
            const matchesStatus = !selectedStatus || app.status === selectedStatus;
            return matchesStatus;
        });
        setFilteredApplications(filtered);
        setLoadingTable(false);
    }, [applications, selectedJob, selectedStatus]);

    const filterApplicationsByJob = (applications: any[], selectedJob: string | null) => {
        return applications.filter((app) => {
            const matchesJob = !selectedJob || String(app.jobId) === String(selectedJob);
            return matchesJob;
        });
    };

    const handleApplicationDecision = async (applicationId: string, decision: string) => {
        console.log(`Decision for application with ID ${applicationId}: ${decision}`);
        const response = await updateApplicationStatus(applicationId, decision);

        if (response.success) {
            setApplications((prevApplications) =>
                prevApplications.map((app) =>
                    app._id === applicationId ? { ...app, status: decision } : app
                )
            );
        } else {
            alert(response.message);
        }
    };

    if (loading) return <Loading />;
    if (error) return <div>Error: {error}</div>;

    const tableHeadings = ['Name', 'Email', 'Experience', 'Status'];

    return (
        <div className="flex min-h-screen">
            <CompanyNav title="Applications" /> 
            <div className="flex-1 ">
                <h1 className="text-2xl font-semibold mb-4">Company Applications</h1>

                <div className="flex mb-4 space-x-4">
                    <div className="flex-shrink-0">
                        <label htmlFor="jobFilter" className="block text-sm font-medium text-gray-700">Filter by Job</label>
                        <select
                            id="jobFilter"
                            value={selectedJob || ''}
                            onChange={(e) => setSelectedJob(e.target.value || null)}
                            className="mt-1 block rounded-lg border border-gray-300 bg-gray-50 px-4 py-2"
                        >
                            <option value="">All Jobs</option>
                            {jobs.map((job) => (
                                <option key={job._id} value={job._id}>{job.title}</option>
                            ))}
                        </select>
                    </div>

                    <div className="flex-shrink-0 ml-4">
                        <label htmlFor="statusFilter" className="block text-sm font-medium text-gray-700">Filter by Status</label>
                        <select
                            id="statusFilter"
                            value={selectedStatus || ''}
                            onChange={(e) => setSelectedStatus(e.target.value || null)}
                            className="mt-1 block rounded-lg border border-gray-300 bg-gray-50 px-4 py-2"
                        >
                            <option value="">All Statuses</option>
                            <option value="Shortlisted">Shortlisted</option>
                            <option value="Reviewed">Reviewed</option>
                            <option value="Rejected">Rejected</option>
                            {/* Add other statuses as needed */}
                        </select>
                    </div>
                </div>

                {loadingTable ? (
                    <Loading /> 
                ) : filteredApplications.length === 0 ? (
                    <p>No applications found.</p>
                ) : (
                    <Table
                        data={filteredApplications}
                        headings={tableHeadings}
                        onApplicationDecision={handleApplicationDecision}
                    />
                )}
            </div>
        </div>
    );
};

export default CompanyApplications;
