import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Calculator, Info, FileText, PenTool as Tool, User, MessageSquare } from 'lucide-react';
import { useAdminStore } from '../store/adminStore';
import { motion, AnimatePresence } from 'framer-motion';
import logo from '/logo.png'; // Import logo directly

export default function Navbar() {
  const location = useLocation();
  const { isAuthenticated, logout } = useAdminStore();

  const isActive = (path: string) => location.pathname === path;

  const navItems = [
    { path: '/calculator/advanced', label: 'Calculator', icon: Calculator },
    { path: '/about', label: 'About', icon: Info },
    { path: '/factors', label: 'Factors', icon: FileText },
    { path: '/tools', label: 'Tools', icon: Tool },
    { path: '/contact', label: 'Contact', icon: MessageSquare },
  ];

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="fixed top-0 left-0 right-0 bg-white/70 backdrop-blur-md shadow-lg z-50 glass-effect"
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center space-x-2">
            <img src={logo} alt="Construction Cost Calculator" className="w-12 h-12 object-contain" />
            <span className="text-xl font-bold text-[#1B8B6A]">
              Construction Cost Calculator
            </span>
          </Link>

          <div className="hidden md:flex items-center space-x-4">
            <AnimatePresence mode="wait">
              {navItems.map((item) => {
                const Icon = item.icon;
                return (
                  <motion.div
                    key={item.path}
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 20 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Link
                      to={item.path}
                      className="flex items-center space-x-1 px-4 py-2 rounded-lg transition-all duration-300"
                      style={{
                        backgroundColor: isActive(item.path) ? '#1B8B6A' : 'transparent',
                        color: isActive(item.path) ? '#ffffff' : '#1B8B6A'
                      }}
                    >
                      <Icon className="w-4 h-4" />
                      <span>{item.label}</span>
                    </Link>
                  </motion.div>
                );
              })}
            </AnimatePresence>

            {isAuthenticated ? (
              <div className="flex items-center space-x-4">
                <Link
                  to="/admin"
                  className="flex items-center space-x-1 px-4 py-2 rounded-lg transition-all duration-300"
                  style={{
                    backgroundColor: isActive('/admin') ? '#1B8B6A' : 'transparent',
                    color: isActive('/admin') ? '#ffffff' : '#1B8B6A'
                  }}
                >
                  <User className="w-4 h-4" />
                  <span>Admin</span>
                </Link>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={logout}
                  className="px-4 py-2 rounded-lg transition-colors text-[#1B8B6A]"
                >
                  Logout
                </motion.button>
              </div>
            ) : (
              <Link
                to="/login"
                className="flex items-center space-x-1 px-4 py-2 rounded-lg transition-colors text-[#1B8B6A]"
              >
                <User className="w-4 h-4" />
                <span>Login</span>
              </Link>
            )}
          </div>
        </div>
      </div>
    </motion.nav>
  );
}