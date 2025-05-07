import { FC } from 'react';
import { NavLink } from 'react-router-dom';
import { useAdmin } from '../../contexts/AdminContext';
import {
  HomeIcon,
  ChartBarIcon,
  FolderIcon,
  HeartIcon,
  UserGroupIcon,
  ClockIcon,
  PhotoIcon,
  UsersIcon,
  Cog6ToothIcon,
  ClipboardDocumentListIcon,
} from '@heroicons/react/24/outline';

const navigation = [
  { name: 'Dashboard', href: '/adminsea', icon: HomeIcon },
  { name: 'Homepage', href: '/adminsea/pages/home', icon: HomeIcon },
  { name: 'Impact', href: '/adminsea/pages/impact', icon: ChartBarIcon },
  { name: 'Projects', href: '/adminsea/pages/projects', icon: FolderIcon },
  { name: 'Donate', href: '/adminsea/pages/donate', icon: HeartIcon },
  { name: 'About', href: '/adminsea/pages/about', icon: UserGroupIcon },
  { name: 'Journey', href: '/adminsea/pages/journey', icon: ClockIcon },
  { name: 'Contact', href: '/adminsea/pages/contact', icon: UserGroupIcon },
  { name: 'Donations', href: '/adminsea/donations', icon: HeartIcon },
  { name: 'Media Library', href: '/adminsea/media', icon: PhotoIcon },
  { name: 'Users', href: '/adminsea/users', icon: UsersIcon },
  { name: 'Settings', href: '/adminsea/settings', icon: Cog6ToothIcon },
  { name: 'Activity Log', href: '/adminsea/activity', icon: ClipboardDocumentListIcon },
];

const AdminSidebar: FC = () => {
  const { state, dispatch } = useAdmin();
  const { isSidebarCollapsed } = state;

  return (
    <div
      className={`bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 transition-all duration-300 ${
        isSidebarCollapsed ? 'w-20' : 'w-64'
      }`}
    >
      <div className="flex flex-col h-full">
        {/* Logo */}
        <div className="flex items-center justify-center h-16 border-b border-gray-200 dark:border-gray-700">
          <img
            src="/logo.svg"
            alt="Team SEA"
            className={`h-8 transition-all duration-300 ${
              isSidebarCollapsed ? 'w-8' : 'w-32'
            }`}
          />
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-2 py-4 space-y-1 overflow-y-auto">
          {navigation.map((item) => (
            <NavLink
              key={item.name}
              to={item.href}
              className={({ isActive }) =>
                `group flex items-center px-2 py-2 text-sm font-medium rounded-md ${
                  isActive
                    ? 'bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-200'
                    : 'text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700'
                }`
              }
            >
              <item.icon
                className="mr-3 h-6 w-6 flex-shrink-0"
                aria-hidden="true"
              />
              {!isSidebarCollapsed && <span>{item.name}</span>}
            </NavLink>
          ))}
        </nav>

        {/* Collapse Button */}
        <div className="p-4 border-t border-gray-200 dark:border-gray-700">
          <button
            onClick={() => dispatch({ type: 'TOGGLE_SIDEBAR' })}
            className="w-full flex items-center justify-center px-2 py-2 text-sm font-medium text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-md"
          >
            {isSidebarCollapsed ? (
              <svg
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 5l7 7-7 7M5 5l7 7-7 7"
                />
              </svg>
            ) : (
              <svg
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M11 19l-7-7 7-7m8 14l-7-7 7-7"
                />
              </svg>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminSidebar; 