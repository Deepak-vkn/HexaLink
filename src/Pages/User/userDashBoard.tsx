'use client'

import { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts'
import { Users, Briefcase, Mail, Check, X, User } from 'lucide-react'
import { userDashBoard } from '../../api/user/get'

export default function UserDashboard() {
  const user = useSelector((state: any) => state.user.userInfo)
  const [dashboardData, setDashboardData] = useState({
    totalApplicationsCount: 0,
    totalPostsCount: 0,
    totalFollowersCount: 0,
    totalFollowingCount: 0,
    top5RecentFollowers: [],
    monthlyStats: [],
    applications: [],
    shortlistedApplicationsCount: 0,
    rejectedApplicationsCount: 0,
  })

  useEffect(() => {
    const getDashboardData = async () => {
      try {
        const response = await userDashBoard(user._id)
        setDashboardData(response)
      } catch (err) {
        console.error("Failed to fetch dashboard data", err)
      }
    }

    getDashboardData()
  }, [user._id])

  const getStatusColor = (status) => {
    switch (status) {
      case 'Shortlisted':
        return 'bg-green-500 text-white'
      case 'Rejected':
        return 'bg-red-500 text-white'
      default:
        return 'bg-blue-500 text-white'
    }
  }

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        <h1 className="text-4xl font-bold text-gray-900">User Dashboard</h1>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          <StatsCard icon={Mail} title="Total Posts" value={dashboardData.totalPostsCount} />
          <StatsCard icon={Users} title="Followers" value={dashboardData.totalFollowersCount} />
          <StatsCard icon={Users} title="Following" value={dashboardData.totalFollowingCount} />
          <StatsCard icon={Briefcase} title="Total Applications" value={dashboardData.totalApplicationsCount} />
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-semibold mb-4">Recent Followers</h2>
            <div className="flex space-x-4">
              {dashboardData.top5RecentFollowers.map((follower) => (
                <div key={follower.id} className="flex flex-col items-center">
                  <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden">
                    {follower.id.image ? (
                      <img src={follower.id.image} alt={follower.id.name} className="w-full h-full object-cover" />
                    ) : (
                      <User className="w-6 h-6 text-gray-600" />
                    )}
                  </div>
                  <p className="text-sm mt-2 text-center">{follower.id.name}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-semibold mb-4">Application Status</h2>
            <div className="grid grid-cols-3 gap-4">
              <StatsCard
                icon={Briefcase}
                title="Total"
                value={dashboardData.totalApplicationsCount}
                className="bg-blue-100"
              />
              <StatsCard
                icon={Check}
                title="Shortlisted"
                value={dashboardData.shortlistedApplicationsCount}
                className="bg-green-100"
              />
              <StatsCard
                icon={X}
                title="Rejected"
                value={dashboardData.rejectedApplicationsCount}
                className="bg-red-100"
              />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-semibold mb-4">Monthly Stats</h2>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={dashboardData.monthlyStats}>
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="followerCount" stroke="#2563eb" name="Followers" strokeWidth={2} />
                <Line type="monotone" dataKey="postCount" stroke="#10b981" name="Posts" strokeWidth={2} />
                <Line type="monotone" dataKey="followingCount" stroke="#f59e0b" name="Following" strokeWidth={2} />
                <Line type="monotone" dataKey="applicationCount" stroke="#ef4444" name="Applications" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-semibold mb-4">Recent Applications</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Job Name
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Applied Date
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Experience
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {dashboardData.applications.map((application) => (
                  <tr key={application._id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {application.jobId.title}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {new Date(application.appliedDate).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {application.jobId.package} (LPA)
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(application.status)}`}>
                        {application.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}

function StatsCard({ icon: Icon, title, value, className = '' }) {
  return (
    <div className={`bg-white rounded-lg shadow-md p-6 ${className}`}>
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-600">{title}</p>
          <p className="text-3xl font-semibold text-gray-900">{value}</p>
        </div>
        <div className="p-3 bg-blue-500 rounded-full">
          <Icon className="w-6 h-6 text-white" />
        </div>
      </div>
    </div>
  )
}