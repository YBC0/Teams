import { FC } from 'react';
import { useAdmin } from '../../contexts/AdminContext';
import {
  ChartBarIcon,
  UsersIcon,
  PhotoIcon,
  DocumentTextIcon,
  CurrencyDollarIcon,
} from '@heroicons/react/24/outline';

const Dashboard: FC = () => {
  const { state } = useAdmin();

  const stats = [
    { name: 'Total Donations', value: '€12,345', icon: CurrencyDollarIcon },
    { name: 'Active Users', value: '245', icon: UsersIcon },
    { name: 'Media Files', value: '1,234', icon: PhotoIcon },
    { name: 'Content Pages', value: '12', icon: DocumentTextIcon },
  ];

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6">
        Dashboard
      </h1>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <div
            key={stat.name}
            className="bg-white dark:bg-gray-800 overflow-hidden shadow rounded-lg"
          >
            <div className="p-5">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <stat.icon
                    className="h-6 w-6 text-gray-400"
                    aria-hidden="true"
                  />
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 dark:text-gray-400 truncate">
                      {stat.name}
                    </dt>
                    <dd>
                      <div className="text-lg font-medium text-gray-900 dark:text-white">
                        {stat.value}
                      </div>
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard; 