'use client'

import  { useState, useEffect } from 'react'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import { Users, Building2, Briefcase } from 'lucide-react'
import { adminDashBoard } from '../../api/admin/get'
import AdminNav from "../../Components/admin/adminNav"

export default function AdminDashboard() {
  const [dashboardData, setDashboardData] = useState({
    userCount: 0,
    companyCount: 0,
    activeJobCount: 0,
    recentUsers: [],
    recentCompanies: [],
    monthlyStats: [],
    companiesByJobCount: []
  })

  useEffect(() => {
    const getDashboardData = async () => {
      try {
        const response = await adminDashBoard()
        setDashboardData(response)
      } catch (err) {
        console.error("Failed to fetch dashboard data", err)
      }
    }

    getDashboardData()
  }, [])

  return (
    <div className="min-h-screen bg-gray-100">
      <AdminNav />
      <div className="p-6 lg:p-8 space-y-8">
        <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
        
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <StatsCard icon={Users} title="Total Users" value={dashboardData.userCount} color="blue" />
          <StatsCard icon={Building2} title="Companies" value={dashboardData.companyCount} color="green" />
          <StatsCard icon={Briefcase} title="Active Jobs" value={dashboardData.activeJobCount} color="purple" />
        </div>

        {/* Chart */}
        <div className="bg-white rounded-xl shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4 text-gray-800">Growth Overview</h2>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={dashboardData.monthlyStats}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis dataKey="month" stroke="#6b7280" />
                <YAxis stroke="#6b7280" />
                <Tooltip contentStyle={{ backgroundColor: 'white', borderRadius: '0.375rem', boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)' }} />
                <Line type="monotone" dataKey="userCount" stroke="#3b82f6" strokeWidth={2} name="Users" />
                <Line type="monotone" dataKey="companyCount" stroke="#10b981" strokeWidth={2} name="Companies" />
                <Line type="monotone" dataKey="jobCount" stroke="#8b5cf6" strokeWidth={2} name="Jobs" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Recent Users, Companies, and Best Contributors */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <DataList title="Recent Users" data={dashboardData.recentUsers} />
          <DataList title="Recent Companies" data={dashboardData.recentCompanies} />
          <DataList 
            title="Best Contributors" 
            data={dashboardData.companiesByJobCount} 
            valueKey="jobCount" 
            valuePrefix="Jobs Posted: "
          />
        </div>
      </div>
    </div>
  )
}

function StatsCard({ icon: Icon, title, value, color }: { 
  icon: any; 
  title: any; 
  value: any; 
  color: any; 
}) {
  const colorClasses: { [key: string]: string } = {
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
  valueKey = 'joinedAt',
  valuePrefix = '',
}: {
  title: any;          // Accepts any type for title
  data: any[];        // Accepts an array of any type for data
  valueKey?: any;     // Accepts any type for valueKey (optional)
  valuePrefix?: any;  // Accepts any type for valuePrefix (optional)
}) {
  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden">
      <div className="p-6 border-b border-gray-200">
        <h2 className="text-xl font-semibold text-gray-800">{title}</h2>
      </div>
      <div className="p-6">
        <div className="space-y-4">
          {data.map((item:any) => (
            <div key={item.id} className="flex justify-between items-center">
              <div>
                <p className="font-medium text-gray-900">{item.name?item.name:item.company?.name}</p>
                <p className="text-sm text-gray-600">{item.email}</p>
              </div>
              <span className="text-sm text-gray-500">
                {valuePrefix}{item[valueKey]}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}