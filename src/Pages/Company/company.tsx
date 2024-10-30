'use client'

import  { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import { Users, Briefcase } from 'lucide-react'
import { companyDashBoard } from '../../api/company/get'
import CompanyNav from '../../Components/company/companyNav'
import { RootState } from '../../Store/store'

export default function Company() {
  const company = useSelector((state: RootState) => state.company.companyInfo)

  const [dashboardData, setDashboardData] = useState({
    totalJobCount: 0,
    activeJobCount: 0,
    totalApplicationCount: 0,
    latestJobs: [],
    latestApplications: [],
    monthlyStats: []
  })

  useEffect(() => {
    const getDashboardData = async () => {
      try {
        if(company){
          const response = await companyDashBoard(company._id)
          setDashboardData(response)
        }
     
      } catch (err) {
        console.error("Failed to fetch dashboard data", err)
      }
    }

    getDashboardData()
  }, [company?._id])

  return (
    <div className="min-h-screen bg-gray-100">
      <CompanyNav title="Home" />
      <div className="p-6 lg:p-8 space-y-8">
        <h1 className="text-3xl font-bold text-gray-900">Company Dashboard</h1>
        
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <StatsCard icon={Briefcase} title="Total Jobs" value={dashboardData.totalJobCount} color="blue" />
          <StatsCard icon={Briefcase} title="Active Jobs" value={dashboardData.activeJobCount} color="green" />
          <StatsCard icon={Users} title="Total Applications" value={dashboardData.totalApplicationCount} color="purple" />
        </div>

        {/* Chart */}
        <div className="bg-white rounded-xl shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4 text-gray-800">Application Growth Overview</h2>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={dashboardData.monthlyStats}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis dataKey="month" stroke="#6b7280" />
                <YAxis stroke="#6b7280" />
                <Tooltip contentStyle={{ backgroundColor: 'white', borderRadius: '0.375rem', boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)' }} />
                <Line type="monotone" dataKey="jobCount" stroke="#3b82f6" strokeWidth={2} name="Jobs Posted" />
                <Line type="monotone" dataKey="applicationCount" stroke="#8b5cf6" strokeWidth={2} name="Applications" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Latest Jobs and Applications */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <DataList 
            title="Latest Jobs" 
            data={dashboardData.latestJobs} 
            renderItem={(job:any) => (
              <>
                <p className="font-medium text-gray-900">{job.title}</p>
                <p className="text-sm text-gray-600">Created: {new Date(job.posted).toLocaleDateString()}</p>
              </>
            )}
            emptyMessage="No recent jobs added."
          />
          <DataList 
            title="Latest Applications" 
            data={dashboardData.latestApplications} 
            renderItem={(application:any) => (
              <>
                <div>
                  <p className="font-medium text-gray-900">{application.name}</p>
                  <p className="text-sm text-gray-600">Applied for: {application.jobDetails.title}</p>
                </div>
                <span className="text-sm text-gray-500">{new Date(application.appliedDate).toLocaleDateString()}</span>
              </>
            )}
            emptyMessage="No recent applications submitted."
          />
        </div>
      </div>
    </div>
  )
}

function StatsCard({
  icon: Icon,
  title,
  value,
  color,
}: {
  icon: any;   // Accepts any type for icon
  title: any;  // Accepts any type for title
  value: any;  // Accepts any type for value
  color: any;  // Accepts any type for color
}) {
  const colorClasses: { [key: string]: string } = { // Define colorClasses with index signature
    blue: 'bg-blue-100 text-blue-600',
    green: 'bg-green-100 text-green-600',
    purple: 'bg-purple-100 text-purple-600',
  };


  return (
    <div className="bg-white rounded-xl shadow-md p-6">
      <div className="flex items-center">
        <div className={`p-3 rounded-full ${colorClasses[color]}`}>
          <Icon className="w-8 h-8" />
        </div>
        <div className="ml-4">
          <p className="text-sm font-medium text-gray-600">{title}</p>
          <h3 className="text-2xl font-bold text-gray-900">{value}</h3>
        </div>
      </div>
    </div>
  )
}

function DataList({
  title,
  data,
  renderItem,
  emptyMessage,
}: {
  title: any;            // Accepts any type for title
  data: any[];          // Accepts an array of any type for data
  renderItem: (item: any) => React.ReactNode; // Function that takes an item of any type and returns a React node
  emptyMessage: any;     // Accepts any type for emptyMessage
}) {
  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden">
      <div className="p-6 border-b border-gray-200">
        <h2 className="text-xl font-semibold text-gray-800">{title}</h2>
      </div>
      <div className="p-6">
        {data.length > 0 ? (
          <div className="space-y-4">
            {data.map((item:any, index:number) => (
              <div key={item._id || index} className="flex justify-between items-center">
                {renderItem(item)}
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-500">{emptyMessage}</p>
        )}
      </div>
    </div>
  )
}