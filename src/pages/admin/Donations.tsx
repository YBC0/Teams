import { FC, useState } from 'react';
import { useAdmin } from '../../contexts/AdminContext';
import { Donation } from '../../types/admin';
import {
  ChevronDownIcon,
  ChevronUpIcon,
  FunnelIcon,
} from '@heroicons/react/24/outline';

const Donations: FC = () => {
  const { state: { currentLanguage } } = useAdmin();
  const [donations] = useState<Donation[]>([
    {
      id: '1',
      donorName: 'John Doe',
      isAnonymous: false,
      amount: 1000,
      currency: 'DKK',
      message: 'Keep up the good work!',
      status: 'completed',
      paymentMethod: 'credit_card',
      createdAt: '2024-03-20T10:00:00Z',
      updatedAt: '2024-03-20T10:00:00Z',
    },
    {
      id: '2',
      donorName: 'Anonymous',
      isAnonymous: true,
      amount: 500,
      currency: 'DKK',
      status: 'completed',
      paymentMethod: 'bank_transfer',
      createdAt: '2024-03-19T15:30:00Z',
      updatedAt: '2024-03-19T15:30:00Z',
    },
  ]);

  const [sortField, setSortField] = useState<keyof Donation>('createdAt');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('desc');
  const [filters, setFilters] = useState({
    status: 'all',
    paymentMethod: 'all',
    dateRange: 'all',
  });

  const handleSort = (field: keyof Donation) => {
    if (field === sortField) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString(currentLanguage === 'en' ? 'en-US' : 'da-DK', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const formatCurrency = (amount: number, currency: string) => {
    return new Intl.NumberFormat(currentLanguage === 'en' ? 'en-US' : 'da-DK', {
      style: 'currency',
      currency,
    }).format(amount);
  };

  const getStatusBadgeColor = (status: Donation['status']) => {
    switch (status) {
      case 'completed':
        return 'badge-success';
      case 'pending':
        return 'badge-warning';
      case 'failed':
        return 'badge-error';
      default:
        return 'badge-ghost';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Donations</h1>
        <button className="btn btn-primary">Export Data</button>
      </div>

      <div className="overflow-x-auto">
        <table className="table w-full">
          <thead>
            <tr>
              <th>Date</th>
              <th>Donor</th>
              <th>Amount</th>
              <th>Status</th>
              <th>Payment Method</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {donations.map(donation => (
              <tr key={donation.id}>
                <td>{formatDate(donation.createdAt)}</td>
                <td>{donation.isAnonymous ? 'Anonymous' : donation.donorName}</td>
                <td>{formatCurrency(donation.amount, donation.currency)}</td>
                <td>
                  <span className={`badge ${getStatusBadgeColor(donation.status)}`}>
                    {donation.status}
                  </span>
                </td>
                <td>{donation.paymentMethod}</td>
                <td>
                  <button className="btn btn-ghost btn-sm">View</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Donations; 