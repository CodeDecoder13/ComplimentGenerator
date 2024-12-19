import Link from 'next/link';
import { useState, useEffect } from 'react';
import ContactModal from './ContactModal';
import ComingSoonModal from './ComingSoonModal';

interface SidebarItem {
  title: string;
  icon: string;
  path: string;
  isModal?: boolean;
  modalType?: 'contact' | 'comingSoon';
}

const sidebarItems: SidebarItem[] = [
  { title: 'Home', icon: '🏠', path: '/' },
  { title: 'Contact Me', icon: '📧', path: '/contact', isModal: true, modalType: 'contact' },
  { title: 'More Apps', icon: '📱', path: '/apps', isModal: true, modalType: 'comingSoon' },
];

export default function Sidebar() {
  const [isCollapsed, setIsCollapsed] = useState(true);
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);
  const [isComingSoonModalOpen, setIsComingSoonModalOpen] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsCollapsed(false);
      } else {
        setIsCollapsed(true);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleItemClick = (item: SidebarItem, e: React.MouseEvent) => {
    if (item.isModal) {
      e.preventDefault();
      if (item.modalType === 'contact') {
        setIsContactModalOpen(true);
      } else if (item.modalType === 'comingSoon') {
        setIsComingSoonModalOpen(true);
      }
    }
    // Close sidebar on mobile after clicking
    if (window.innerWidth < 768) {
      setIsCollapsed(true);
    }
  };

  return (
    <>
      {/* Mobile Menu Button - Always visible on mobile */}
      <button
        onClick={() => setIsCollapsed(!isCollapsed)}
        className="fixed top-4 left-4 z-50 bg-purple-500 text-white p-2 rounded-full shadow-lg
                   hover:bg-purple-600 transition-colors md:hidden"
      >
        {isCollapsed ? '☰' : '×'}
      </button>

      {/* Sidebar */}
      <div
        className={`fixed left-0 top-0 h-full bg-white/80 dark:bg-gray-800/80 backdrop-blur-md 
                   shadow-xl transition-all duration-300 z-40
                   ${isCollapsed ? 'w-0 md:w-16' : 'w-64'}
                   ${isCollapsed ? '-translate-x-full md:translate-x-0' : 'translate-x-0'}`}
      >
        {/* Desktop Toggle Button */}
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="absolute -right-3 top-8 bg-purple-500 text-white p-1 rounded-full shadow-lg
                     hover:bg-purple-600 transition-colors
                     hidden md:block"
        >
          {isCollapsed ? '→' : '←'}
        </button>

        <div className={`p-4 space-y-2 ${isCollapsed ? 'md:visible invisible' : 'visible'}`}>
          <div className={`mb-8 overflow-hidden ${isCollapsed ? 'text-center' : ''}`}>
            <h2 className="text-xl font-bold bg-gradient-to-r from-pink-500 to-purple-500 
                          bg-clip-text text-transparent truncate pt-8 md:pt-0">
              {isCollapsed ? '🌟' : 'Compliment Generator'}
            </h2>
          </div>

          <nav className="space-y-2">
            {sidebarItems.map((item) => (
              <Link
                key={item.title}
                href={item.path}
                onClick={(e) => handleItemClick(item, e)}
                className={`flex items-center gap-3 p-3 rounded-lg hover:bg-purple-100 dark:hover:bg-purple-900/30
                           transition-colors group relative ${
                             isCollapsed ? 'justify-center' : ''
                           }`}
              >
                <span className="text-xl">{item.icon}</span>
                {isCollapsed ? (
                  <span className="absolute left-full ml-2 px-2 py-1 bg-purple-500 text-white text-sm
                                  rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                    {item.title}
                  </span>
                ) : (
                  <span className="text-gray-700 dark:text-gray-200">{item.title}</span>
                )}
              </Link>
            ))}
          </nav>
        </div>
      </div>

      {/* Mobile Backdrop */}
      {!isCollapsed && (
        <div
          className="fixed inset-0 bg-black/20 backdrop-blur-sm z-30 md:hidden"
          onClick={() => setIsCollapsed(true)}
        />
      )}

      <ContactModal 
        isOpen={isContactModalOpen} 
        onClose={() => setIsContactModalOpen(false)} 
      />
      <ComingSoonModal 
        isOpen={isComingSoonModalOpen} 
        onClose={() => setIsComingSoonModalOpen(false)} 
      />
    </>
  );
} 