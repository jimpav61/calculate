import { Card } from "@/components/ui/card";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

export const AdminStats = () => {
  const mockData = [
    { month: 'Jan', estimates: 65, avgMinutes: 850 },
    { month: 'Feb', estimates: 85, avgMinutes: 920 },
    { month: 'Mar', estimates: 95, avgMinutes: 1050 },
    // Add more mock data points
  ];

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-semibold mb-4">Usage Statistics</h2>
        <p className="text-gray-600">Monitor trends and pricing statistics over time.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="p-4">
          <h3 className="text-sm font-medium text-gray-500">Total Estimates</h3>
          <p className="text-3xl font-bold">245</p>
        </Card>
        <Card className="p-4">
          <h3 className="text-sm font-medium text-gray-500">Avg. Minutes/User</h3>
          <p className="text-3xl font-bold">940</p>
        </Card>
        <Card className="p-4">
          <h3 className="text-sm font-medium text-gray-500">Total Revenue</h3>
          <p className="text-3xl font-bold">$12,350</p>
        </Card>
      </div>

      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-4">Monthly Trends</h3>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={mockData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="estimates" stroke="#8884d8" name="Estimates" />
              <Line type="monotone" dataKey="avgMinutes" stroke="#82ca9d" name="Avg Minutes" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </Card>
    </div>
  );
};