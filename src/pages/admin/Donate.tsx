import { FC, useState } from 'react';
import { useAdmin } from '../../contexts/AdminContext';
import { Language } from '../../types/common';

interface Campaign {
  id: string;
  title: {
    [key in Language]: string;
  };
  description: {
    [key in Language]: string;
  };
  goal: number;
  current: number;
  currency: string;
  status: 'active' | 'completed' | 'upcoming';
  startDate: string;
  endDate?: string;
  image?: string;
}

const Donate: FC = () => {
  const { state } = useAdmin();
  const [campaigns] = useState<Campaign[]>([
    {
      id: '1',
      title: {
        en: 'Ocean Cleanup 2024',
        da: 'Havrensning 2024',
      },
      description: {
        en: 'Help us clean up the oceans and protect marine life',
        da: 'Hjælp os med at rense havene og beskytte havlivet',
      },
      goal: 50000,
      current: 32500,
      currency: 'EUR',
      status: 'active',
      startDate: '2024-01-01',
      image: '/images/campaigns/ocean-cleanup.jpg',
    },
    {
      id: '2',
      title: {
        en: 'Marine Education Program',
        da: 'Marin Uddannelsesprogram',
      },
      description: {
        en: 'Support our educational initiatives for marine conservation',
        da: 'Støt vores uddannelsesinitiativer for havbevarelse',
      },
      goal: 25000,
      current: 25000,
      currency: 'EUR',
      status: 'completed',
      startDate: '2023-09-01',
      endDate: '2024-02-28',
    },
  ]);

  const getStatusBadgeColor = (status: Campaign['status']) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
      case 'completed':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200';
      case 'upcoming':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200';
    }
  };

  const formatCurrency = (amount: number, currency: string) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency,
    }).format(amount);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">
          Donation Campaigns
        </h1>
        <button
          type="button"
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          Create Campaign
        </button>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {campaigns.map((campaign) => (
          <div
            key={campaign.id}
            className="bg-white dark:bg-gray-800 shadow rounded-lg overflow-hidden"
          >
            {campaign.image && (
              <div className="aspect-w-16 aspect-h-9">
                <img
                  src={campaign.image}
                  alt={campaign.title[state.currentLanguage]}
                  className="object-cover"
                />
              </div>
            )}
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                  {campaign.title[state.currentLanguage]}
                </h3>
                <span
                  className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusBadgeColor(
                    campaign.status
                  )}`}
                >
                  {campaign.status.charAt(0).toUpperCase() + campaign.status.slice(1)}
                </span>
              </div>
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
                {campaign.description[state.currentLanguage]}
              </p>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-gray-500 dark:text-gray-400">Progress</span>
                    <span className="text-gray-900 dark:text-white">
                      {formatCurrency(campaign.current, campaign.currency)} /{' '}
                      {formatCurrency(campaign.goal, campaign.currency)}
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2 dark:bg-gray-700">
                    <div
                      className="bg-blue-600 h-2 rounded-full"
                      style={{
                        width: `${(campaign.current / campaign.goal) * 100}%`,
                      }}
                    ></div>
                  </div>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500 dark:text-gray-400">Start Date</span>
                  <span className="text-gray-900 dark:text-white">
                    {formatDate(campaign.startDate)}
                  </span>
                </div>
                {campaign.endDate && (
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500 dark:text-gray-400">End Date</span>
                    <span className="text-gray-900 dark:text-white">
                      {formatDate(campaign.endDate)}
                    </span>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Donate; 