import React, { useEffect, useState } from 'react';
import { useAuth } from '../../hooks/useAuth';
import { useFirestore } from '../../hooks/useFirestore';
import { ApplicationFormData } from '../../types';
import { Button } from '../common/Button';
import { ApplicationCard } from './ApplicationCard';
import { LogOut, Search, Filter } from 'lucide-react';

export const AdminDashboard: React.FC = () => {
  const { user, logout } = useAuth();
  const { getAllApplications } = useFirestore();

  const [applications, setApplications] = useState<
    (ApplicationFormData & { id: string })[]
  >([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState<
    'all' | 'pending' | 'completed'
  >('pending');

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        const data = await getAllApplications();
        setApplications(data as (ApplicationFormData & { id: string })[]);
      } catch (error) {
        console.error('Error fetching applications:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchApplications();
  }, []);

  const filteredApplications = applications.filter((app) => {
    const matchesSearch =
      app.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      app.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      app.passportNumber.includes(searchTerm.toUpperCase());

    const matchesStatus =
      filterStatus === 'all' || app.paymentStatus === filterStatus;

    return matchesSearch && matchesStatus;
  });

  const handleLogout = async () => {
    await logout();
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading applications...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              Admin Dashboard
            </h1>
            <p className="text-sm text-gray-500">
              Logged in as: {user?.email}
            </p>
          </div>
          <Button
            variant="secondary"
            onClick={handleLogout}
            className="flex items-center gap-2"
          >
            <LogOut className="w-4 h-4" />
            Logout
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Filters */}
        <div className="bg-white rounded-lg p-4 mb-6 shadow-sm border border-gray-100">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search by name, email, or passport..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Status Filter */}
            <div className="flex items-center gap-2">
              <Filter className="w-5 h-5 text-gray-400" />
              <select
                value={filterStatus}
                onChange={(e) =>
                  setFilterStatus(e.target.value as 'all' | 'pending' | 'completed')
                }
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">All Applications</option>
                <option value="pending">Pending Payment</option>
                <option value="completed">Payment Completed</option>
              </select>
            </div>

            {/* Count */}
            <div className="flex items-center justify-end">
              <p className="text-sm text-gray-600">
                <span className="font-semibold text-gray-900">
                  {filteredApplications.length}
                </span>{' '}
                application{filteredApplications.length !== 1 ? 's' : ''}
              </p>
            </div>
          </div>
        </div>

        {/* Applications Grid */}
        {filteredApplications.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500">No applications found</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {filteredApplications.map((app) => (
              <ApplicationCard key={app.id} application={app} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
