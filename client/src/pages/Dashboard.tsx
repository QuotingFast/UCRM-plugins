import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { TrendingUp, Users, Building2, DollarSign } from 'lucide-react';

const Dashboard: React.FC = () => {
  // Mock data for demonstration
  const stats = [
    { name: 'Total Deals', value: '23', change: '+12%', icon: DollarSign, color: 'blue' },
    { name: 'Companies', value: '156', change: '+8%', icon: Building2, color: 'green' },
    { name: 'Contacts', value: '342', change: '+23%', icon: Users, color: 'purple' },
    { name: 'Revenue', value: '$45,231', change: '+15%', icon: TrendingUp, color: 'yellow' },
  ];

  const monthlyData = [
    { month: 'Jan', revenue: 4000, deals: 12 },
    { month: 'Feb', revenue: 3000, deals: 15 },
    { month: 'Mar', revenue: 5000, deals: 18 },
    { month: 'Apr', revenue: 4500, deals: 20 },
    { month: 'May', revenue: 6000, deals: 25 },
    { month: 'Jun', revenue: 5500, deals: 23 },
  ];

  const dealStageData = [
    { name: 'Prospecting', value: 35, color: '#3B82F6' },
    { name: 'Qualification', value: 25, color: '#10B981' },
    { name: 'Proposal', value: 20, color: '#F59E0B' },
    { name: 'Negotiation', value: 15, color: '#EF4444' },
    { name: 'Closed Won', value: 5, color: '#8B5CF6' },
  ];

  const getStatColor = (color: string) => {
    const colors = {
      blue: 'bg-blue-500',
      green: 'bg-green-500',
      purple: 'bg-purple-500',
      yellow: 'bg-yellow-500',
    };
    return colors[color as keyof typeof colors] || 'bg-gray-500';
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-600">Welcome back! Here's what's happening with your CRM.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <div key={stat.name} className="card">
              <div className="flex items-center">
                <div className={`p-3 rounded-lg ${getStatColor(stat.color)}`}>
                  <Icon className="h-6 w-6 text-white" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">{stat.name}</p>
                  <div className="flex items-center">
                    <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                    <span className="ml-2 text-sm font-medium text-green-600">{stat.change}</span>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Revenue Chart */}
        <div className="card">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Monthly Revenue</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={monthlyData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="revenue" fill="#3B82F6" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Deal Stages Pie Chart */}
        <div className="card">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Deal Stages</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={dealStageData}
                cx="50%"
                cy="50%"
                outerRadius={80}
                dataKey="value"
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
              >
                {dealStageData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="card">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h3>
        <div className="space-y-4">
          {[
            { action: 'New lead created', details: 'John Doe from ABC Corp', time: '2 hours ago' },
            { action: 'Deal updated', details: 'Moved "Enterprise Contract" to Negotiation', time: '4 hours ago' },
            { action: 'Task completed', details: 'Follow up call with Jane Smith', time: '6 hours ago' },
            { action: 'New company added', details: 'TechStart Solutions', time: '1 day ago' },
            { action: 'Meeting scheduled', details: 'Product demo with XYZ Corp', time: '2 days ago' },
          ].map((activity, index) => (
            <div key={index} className="flex items-center py-3 border-b border-gray-200 last:border-b-0">
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-900">{activity.action}</p>
                <p className="text-sm text-gray-600">{activity.details}</p>
              </div>
              <span className="text-xs text-gray-500">{activity.time}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;