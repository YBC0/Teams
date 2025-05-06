import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { AccessibleButton } from '@/components/ui/accessible-button';

interface NavItem {
  label: string;
  href: string;
  children?: {
    label: string;
    href: string;
    description?: string;
  }[];
}

const NAV_ITEMS: NavItem[] = [
  {
    label: 'About',
    href: '/about',
    children: [
      {
        label: 'Our Mission',
        href: '/mission',
        description: 'Learn about our goals and values',
      },
      {
        label: 'Our Team',
        href: '/team',
        description: 'Meet the people behind Sea Hope',
      },
      {
        label: 'Partners',
        href: '/partners',
        description: 'Organizations we work with',
      },
      {
        label: 'Impact',
        href: '/impact',
        description: 'See how we make a difference',
      },
    ],
  },
  {
    label: 'Get Involved',
    href: '/get-involved',
    children: [
      {
        label: 'Donate',
        href: '/donate',
        description: 'Support our mission',
      },
      {
        label: 'Volunteer',
        href: '/volunteer',
        description: 'Join our team of volunteers',
      },
      {
        label: 'Fundraise',
        href: '/fundraise',
        description: 'Start your own campaign',
      },
      {
        label: 'Partner With Us',
        href: '/partners',
        description: 'Collaborate with Sea Hope',
      },
    ],
  },
  {
    label: 'Projects',
    href: '/projects',
    children: [
      {
        label: 'Current Projects',
        href: '/projects/current',
        description: 'See our ongoing initiatives',
      },
      {
        label: 'Completed Projects',
        href: '/projects/completed',
        description: 'View our past successes',
      },
      {
        label: 'Project Map',
        href: '/projects/map',
        description: 'Explore our global impact',
      },
    ],
  },
  {
    label: 'Resources',
    href: '/resources',
    children: [
      {
        label: 'Blog',
        href: '/blog',
        description: 'Latest news and stories',
      },
      {
        label: 'Reports',
        href: '/reports',
        description: 'Annual reports and updates',
      },
      {
        label: 'Press',
        href: '/press',
        description: 'Media coverage and releases',
      },
      {
        label: 'FAQs',
        href: '/faqs',
        description: 'Common questions answered',
      },
    ],
  },
  {
    label: 'Contact',
    href: '/contact',
  },
];

export const Header: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
    setOpenDropdown(null);
  }, [location]);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
    setOpenDropdown(null);
  };

  const toggleDropdown = (label: string) => {
    setOpenDropdown(openDropdown === label ? null : label);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white shadow-md' : 'bg-transparent'
      }`}
    >
      <div className="container mx-auto px-4">
        <nav aria-label="Main navigation" className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link to="/" className="flex-shrink-0">
            <img
              src={isScrolled ? '/images/logo.png' : '/images/logo-white.png'}
              alt="Sea Hope"
              className="h-12"
            />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-8">
            {NAV_ITEMS.map((item) => (
              <div key={item.label} className="relative group">
                <button
                  className={`px-2 py-1 text-${
                    isScrolled ? 'gray-900' : 'white'
                  } hover:text-primary transition-colors`}
                  onClick={() => toggleDropdown(item.label)}
                  onMouseEnter={() => item.children && setOpenDropdown(item.label)}
                  onMouseLeave={() => item.children && setOpenDropdown(null)}
                >
                  {item.label}
                </button>

                {item.children && openDropdown === item.label && (
                  <div
                    className="absolute top-full left-0 w-64 bg-white rounded-lg shadow-lg py-4 mt-2"
                    onMouseEnter={() => setOpenDropdown(item.label)}
                    onMouseLeave={() => setOpenDropdown(null)}
                  >
                    {item.children.map((child) => (
                      <Link
                        key={child.href}
                        to={child.href}
                        className="block px-4 py-2 hover:bg-gray-50"
                      >
                        <div className="font-medium text-gray-900">
                          {child.label}
                        </div>
                        {child.description && (
                          <div className="text-sm text-gray-600">
                            {child.description}
                          </div>
                        )}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Desktop CTA */}
          <div className="hidden lg:flex items-center gap-4">
            <AccessibleButton
              href="/donate"
              className="bg-primary text-white hover:bg-primary/90"
            >
              Donate Now
            </AccessibleButton>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden p-2"
            onClick={toggleMobileMenu}
            aria-label="Toggle menu"
          >
            <svg
              className={`w-6 h-6 ${isScrolled ? 'text-gray-900' : 'text-white'}`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {isMobileMenuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </nav>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden bg-white">
            <div className="py-4">
              {NAV_ITEMS.map((item) => (
                <div key={item.label}>
                  <button
                    className="w-full px-4 py-2 flex items-center justify-between text-gray-900"
                    onClick={() => toggleDropdown(item.label)}
                  >
                    {item.label}
                    {item.children && (
                      <svg
                        className={`w-4 h-4 transition-transform ${
                          openDropdown === item.label ? 'rotate-180' : ''
                        }`}
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M19 9l-7 7-7-7"
                        />
                      </svg>
                    )}
                  </button>

                  {item.children && openDropdown === item.label && (
                    <div className="bg-gray-50 py-2">
                      {item.children.map((child) => (
                        <Link
                          key={child.href}
                          to={child.href}
                          className="block px-8 py-2"
                        >
                          <div className="font-medium text-gray-900">
                            {child.label}
                          </div>
                          {child.description && (
                            <div className="text-sm text-gray-600">
                              {child.description}
                            </div>
                          )}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}

              <div className="px-4 py-4">
                <AccessibleButton
                  href="/donate"
                  fullWidth
                  className="bg-primary text-white hover:bg-primary/90"
                >
                  Donate Now
                </AccessibleButton>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}; 