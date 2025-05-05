
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X, Globe } from "lucide-react";

// Language detection
const getLanguage = () => {
  if (typeof window === 'undefined') return 'en';
  const browserLang = navigator.language.toLowerCase();
  return browserLang.includes('da') ? 'da' : 'en';
};

const Journey = () => {
  const [language, setLanguage] = useState('en');
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    setLanguage(getLanguage());
  }, []);

  const toggleLanguage = () => {
    setLanguage(prev => prev === 'da' ? 'en' : 'da');
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // Text content based on language
  const content = {
    nav: {
      home: language === 'da' ? 'Hjem' : 'Home',
      impact: language === 'da' ? 'Vores aftryk' : 'Our Impact',
      donate: language === 'da' ? 'Doner' : 'Donate',
      about: language === 'da' ? 'Om os' : 'About us',
      journey: language === 'da' ? 'Min rejse' : 'My Journey',
      contact: language === 'da' ? 'Kontakt' : 'Contact'
    },
    page: {
      title: language === 'da' ? 'Min rejse' : 'My Journey',
      subtitle: language === 'da' 
        ? 'Fra content creator til at gøre en forskel'
        : 'From content creator to making a difference',
      intro: language === 'da'
        ? 'Jeg startede som content creator på TikTok. Men jeg ville gøre mere. Team SEA er mit kald til at gøre verden bedre – og det gør vi sammen.'
        : 'I started as a content creator on TikTok. But I wanted to do more. Team SEA is my way of making the world better – and we do it together.',
      storyTitle: language === 'da' ? 'Min historie' : 'My story'
    }
  };

  // Journey milestones
  const milestones = [
    {
      year: '2020',
      title: language === 'da' ? 'Begyndelsen på TikTok' : 'The Beginning on TikTok',
      description: language === 'da'
        ? 'Jeg begyndte at lave indhold på TikTok for sjov, uden at vide, at det ville føre til noget større.'
        : 'I started creating content on TikTok for fun, not knowing it would lead to something bigger.',
      image: 'https://images.unsplash.com/photo-1611262588019-db6cc2032da3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
    },
    {
      year: '2021',
      title: language === 'da' ? 'Voksende følgerskare' : 'Growing Following',
      description: language === 'da'
        ? 'Med en voksende platform begyndte jeg at indse, at jeg kunne bruge min stemme til mere end bare underholdning.'
        : 'With a growing platform, I began to realize I could use my voice for more than just entertainment.',
      image: 'https://images.unsplash.com/photo-1611605698335-8b1569810432?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
    },
    {
      year: '2022',
      title: language === 'da' ? 'Inspirerende rejse' : 'Inspiring Journey',
      description: language === 'da'
        ? 'En rejse til Afrika åbnede mine øjne for de reelle udfordringer, mange mennesker står over for med adgang til rent drikkevand.'
        : 'A trip to Africa opened my eyes to the real challenges many people face with access to clean drinking water.',
      image: 'https://images.unsplash.com/photo-1541123437800-1bb1317badc2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
    },
    {
      year: '2023',
      title: language === 'da' ? 'Fødslen af Team SEA' : 'Birth of Team SEA',
      description: language === 'da'
        ? 'Jeg besluttede at gøre noget ved det og startede Team SEA med en mission om at bygge brønde og give rent vand til dem, der har brug for det mest.'
        : 'I decided to do something about it and started Team SEA with a mission to build wells and provide clean water to those who need it most.',
      image: 'https://images.unsplash.com/photo-1576177129452-69ec381730f7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
    }
  ];

  return (
    <div className="min-h-screen flex flex-col">
      {/* Navigation */}
      <header className="bg-white shadow-sm sticky top-0 z-50">
        <div className="container-custom">
          <nav className="flex justify-between items-center py-4">
            <Link to="/" className="flex items-center space-x-2">
              <span className="text-xl font-bold text-primary">Team SEA</span>
            </Link>
            
            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-1">
              <Link to="/" className="nav-link">{content.nav.home}</Link>
              <Link to="/impact" className="nav-link">{content.nav.impact}</Link>
              <Link to="/donate" className="nav-link">{content.nav.donate}</Link>
              <Link to="/about" className="nav-link">{content.nav.about}</Link>
              <Link to="/journey" className="nav-link-active">{content.nav.journey}</Link>
              <Link to="/contact" className="nav-link">{content.nav.contact}</Link>
              <button 
                onClick={toggleLanguage}
                className="ml-4 p-2 rounded-full hover:bg-gray-100 transition-colors"
                aria-label={language === 'da' ? 'Switch to English' : 'Skift til dansk'}
              >
                <Globe className="w-5 h-5" />
              </button>
            </div>
            
            {/* Mobile Navigation Toggle */}
            <div className="md:hidden flex items-center">
              <button 
                onClick={toggleLanguage}
                className="p-2 mr-2 rounded-full hover:bg-gray-100 transition-colors"
                aria-label={language === 'da' ? 'Switch to English' : 'Skift til dansk'}
              >
                <Globe className="w-5 h-5" />
              </button>
              <button
                onClick={toggleMenu}
                className="p-2 rounded-full hover:bg-gray-100 transition-colors"
                aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
              >
                {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </nav>
          
          {/* Mobile Menu */}
          {isMenuOpen && (
            <div className="md:hidden py-4 border-t animate-fade-in">
              <div className="flex flex-col space-y-3">
                <Link to="/" className="nav-link">{content.nav.home}</Link>
                <Link to="/impact" className="nav-link">{content.nav.impact}</Link>
                <Link to="/donate" className="nav-link">{content.nav.donate}</Link>
                <Link to="/about" className="nav-link">{content.nav.about}</Link>
                <Link to="/journey" className="nav-link-active">{content.nav.journey}</Link>
                <Link to="/contact" className="nav-link">{content.nav.contact}</Link>
              </div>
            </div>
          )}
        </div>
      </header>

      {/* Page Header */}
      <section className="pt-16 pb-12 bg-blue-500 text-white">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">{content.page.title}</h1>
            <p className="text-xl">{content.page.subtitle}</p>
          </div>
        </div>
      </section>

      {/* Introduction Section */}
      <section className="py-16">
        <div className="container-custom">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="animate-slide-up">
              <h2 className="section-title">{content.page.storyTitle}</h2>
              <p className="text-lg mb-6">{content.page.intro}</p>
              <p className="text-lg">
                {language === 'da'
                  ? 'Det, der begyndte som en simpel TikTok-konto, udviklede sig til en platform med potentiale til at påvirke virkelige forandringer. Jeg så muligheden for at gøre mere end blot at underholde – jeg så en chance for at gøre en forskel.'
                  : 'What started as a simple TikTok account evolved into a platform with the potential to impact real change. I saw the opportunity to do more than just entertain – I saw a chance to make a difference.'}
              </p>
            </div>
            <div className="rounded-xl overflow-hidden shadow-lg animate-slide-up">
              <img 
                src="https://images.unsplash.com/photo-1611605698323-b1e99cfd37ea?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
                alt={language === 'da' ? 'Content creator' : 'Content creator'} 
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Journey Timeline Section */}
      <section className="py-16 bg-gray-50">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h2 className="section-title">{language === 'da' ? 'Min rejse' : 'My Journey'}</h2>
          </div>
          
          <div className="space-y-12">
            {milestones.map((milestone, index) => (
              <div key={index} className={`flex flex-col ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'} gap-8 items-center animate-slide-up`} style={{ animationDelay: `${index * 0.1}s` }}>
                <div className="md:w-1/2">
                  <div className="bg-white rounded-xl overflow-hidden shadow-md">
                    <img 
                      src={milestone.image} 
                      alt={milestone.title} 
                      className="w-full h-64 object-cover"
                    />
                  </div>
                </div>
                <div className="md:w-1/2">
                  <div className="bg-white p-8 rounded-xl shadow-sm">
                    <div className="text-primary font-bold text-xl mb-2">{milestone.year}</div>
                    <h3 className="text-xl font-semibold mb-3">{milestone.title}</h3>
                    <p className="text-gray-600">{milestone.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <div className="mt-16 text-center">
            <p className="text-lg mb-8">
              {language === 'da'
                ? 'Og dette er bare begyndelsen. Med din støtte kan vi fortsætte med at vokse og nå endnu flere mennesker i nød.'
                : 'And this is just the beginning. With your support, we can continue to grow and reach even more people in need.'}
            </p>
            <Link to="/donate" className="btn-primary">
              {language === 'da' ? 'Bliv en del af rejsen' : 'Be part of the journey'}
            </Link>
          </div>
        </div>
      </section>

      {/* Inspiration Section */}
      <section className="py-16">
        <div className="container-custom">
          <div className="bg-white p-8 md:p-12 rounded-xl shadow-md">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div>
                <h2 className="section-title">{language === 'da' ? 'Min inspiration' : 'My Inspiration'}</h2>
                <p className="text-lg mb-4">
                  {language === 'da'
                    ? 'Da jeg besøgte landsbyer i Afrika og så børn drikke muddervand, vidste jeg, at jeg måtte gøre noget. Adgang til rent vand er ikke bare en luksus – det er et spørgsmål om liv eller død.'
                    : 'When I visited villages in Africa and saw children drinking muddy water, I knew I had to do something. Access to clean water isn't just a luxury – it's a matter of life or death.'}
                </p>
                <p className="text-lg">
                  {language === 'da'
                    ? 'Min platform gav mig ikke bare et publikum, men et fællesskab af mennesker, der ønsker at gøre en forskel. Sammen kan vi skabe virkelige forandringer i verden.'
                    : 'My platform gave me not just an audience, but a community of people who want to make a difference. Together, we can create real change in the world.'}
                </p>
              </div>
              <div className="rounded-xl overflow-hidden">
                <img 
                  src="https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
                  alt={language === 'da' ? 'Inspiration' : 'Inspiration'} 
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-blue-900 text-white py-12 mt-auto">
        <div className="container-custom">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div>
              <h3 className="text-xl font-semibold mb-4">Team SEA</h3>
              <p className="mb-4 text-blue-100">
                {language === 'da'
                  ? 'Sammen gør vi en forskel, én donation ad gangen.'
                  : 'Together we make a difference, one donation at a time.'}
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-4">
                {language === 'da' ? 'Hurtige links' : 'Quick links'}
              </h3>
              <ul className="space-y-2">
                <li><Link to="/" className="text-blue-100 hover:text-white transition-colors">{content.nav.home}</Link></li>
                <li><Link to="/impact" className="text-blue-100 hover:text-white transition-colors">{content.nav.impact}</Link></li>
                <li><Link to="/donate" className="text-blue-100 hover:text-white transition-colors">{content.nav.donate}</Link></li>
                <li><Link to="/about" className="text-blue-100 hover:text-white transition-colors">{content.nav.about}</Link></li>
                <li><Link to="/journey" className="text-blue-100 hover:text-white transition-colors">{content.nav.journey}</Link></li>
                <li><Link to="/contact" className="text-blue-100 hover:text-white transition-colors">{content.nav.contact}</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-4">
                {language === 'da' ? 'Følg os' : 'Follow us'}
              </h3>
              <div className="flex space-x-4">
                <a href="https://facebook.com/" target="_blank" rel="noopener noreferrer" className="text-blue-100 hover:text-white transition-colors">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" />
                  </svg>
                </a>
                <a href="https://instagram.com/" target="_blank" rel="noopener noreferrer" className="text-blue-100 hover:text-white transition-colors">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" />
                  </svg>
                </a>
                <a href="https://tiktok.com/" target="_blank" rel="noopener noreferrer" className="text-blue-100 hover:text-white transition-colors">
                  <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12.53.02C13.84 0 15.14.01 16.44 0c.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
          <div className="border-t border-blue-800 mt-8 pt-8 text-center text-blue-200">
            <p>&copy; {new Date().getFullYear()} Team SEA. {language === 'da' ? 'Alle rettigheder forbeholdes.' : 'All rights reserved.'}</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Journey;
