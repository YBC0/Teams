import { FC, Fragment } from 'react';
import { Menu, Transition } from '@headlessui/react';
import { useAdmin } from '../../contexts/AdminContext';
import { Language } from '../../types/common';
import {
  SunIcon,
  MoonIcon,
  BellIcon,
  UserCircleIcon,
} from '@heroicons/react/24/outline';

const AdminTopBar: FC = () => {
  const { state, dispatch } = useAdmin();
  const { currentUser, currentLanguage, isDarkMode } = state;

  const handleLanguageChange = (language: Language) => {
    dispatch({ type: 'SET_LANGUAGE', payload: language });
  };

  const handleDarkModeToggle = () => {
    dispatch({ type: 'TOGGLE_DARK_MODE' });
  };

  return (
    <header className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
      <div className="flex items-center justify-between h-16 px-6">
        {/* Left side */}
        <div className="flex items-center">
          <h1 className="text-xl font-semibold text-gray-900 dark:text-white">
            Team SEA Admin
          </h1>
        </div>

        {/* Right side */}
        <div className="flex items-center space-x-4">
          {/* Language Switcher */}
          <div className="flex items-center space-x-2">
            <button
              onClick={() => handleLanguageChange('en')}
              className={`px-2 py-1 text-sm font-medium rounded-md ${
                currentLanguage === 'en'
                  ? 'bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-200'
                  : 'text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700'
              }`}
            >
              🇬🇧 EN
            </button>
            <button
              onClick={() => handleLanguageChange('da')}
              className={`px-2 py-1 text-sm font-medium rounded-md ${
                currentLanguage === 'da'
                  ? 'bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-200'
                  : 'text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700'
              }`}
            >
              🇩🇰 DA
            </button>
          </div>

          {/* Dark Mode Toggle */}
          <button
            onClick={handleDarkModeToggle}
            className="p-2 text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-md"
          >
            {isDarkMode ? (
              <SunIcon className="h-6 w-6" />
            ) : (
              <MoonIcon className="h-6 w-6" />
            )}
          </button>

          {/* Notifications */}
          <button className="p-2 text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-md">
            <BellIcon className="h-6 w-6" />
          </button>

          {/* User Menu */}
          <Menu as="div" className="relative">
            <Menu.Button className="flex items-center space-x-2 p-2 text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-md">
              {currentUser?.avatar ? (
                <img
                  src={currentUser.avatar}
                  alt={currentUser.name}
                  className="h-8 w-8 rounded-full"
                />
              ) : (
                <UserCircleIcon className="h-8 w-8" />
              )}
              <span className="text-sm font-medium">
                {currentUser?.name || 'Guest'}
              </span>
            </Menu.Button>

            <Transition
              as={Fragment}
              enter="transition ease-out duration-100"
              enterFrom="transform opacity-0 scale-95"
              enterTo="transform opacity-100 scale-100"
              leave="transition ease-in duration-75"
              leaveFrom="transform opacity-100 scale-100"
              leaveTo="transform opacity-0 scale-95"
            >
              <Menu.Items className="absolute right-0 mt-2 w-48 origin-top-right rounded-md bg-white dark:bg-gray-800 py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                <Menu.Item>
                  {({ active }) => (
                    <a
                      href="/adminsea/profile"
                      className={`${
                        active
                          ? 'bg-gray-100 dark:bg-gray-700'
                          : ''
                      } block px-4 py-2 text-sm text-gray-700 dark:text-gray-300`}
                    >
                      Your Profile
                    </a>
                  )}
                </Menu.Item>
                <Menu.Item>
                  {({ active }) => (
                    <a
                      href="/adminsea/settings"
                      className={`${
                        active
                          ? 'bg-gray-100 dark:bg-gray-700'
                          : ''
                      } block px-4 py-2 text-sm text-gray-700 dark:text-gray-300`}
                    >
                      Settings
                    </a>
                  )}
                </Menu.Item>
                <Menu.Item>
                  {({ active }) => (
                    <button
                      onClick={() => {
                        // Handle logout
                      }}
                      className={`${
                        active
                          ? 'bg-gray-100 dark:bg-gray-700'
                          : ''
                      } block w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-300`}
                    >
                      Sign out
                    </button>
                  )}
                </Menu.Item>
              </Menu.Items>
            </Transition>
          </Menu>
        </div>
      </div>
    </header>
  );
};

export default AdminTopBar; 