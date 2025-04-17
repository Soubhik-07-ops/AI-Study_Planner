import { BookOpen, LayoutDashboard, NotebookText, Library, Settings } from 'lucide-react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="bg-gradient-to-r from-indigo-600 to-blue-600 shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo and Brand */}
          <Link to="/" className="flex items-center space-x-2 text-white">
            <BookOpen className="h-7 w-7" />
            <span className="text-2xl font-bold tracking-wider">StudyWise</span>
          </Link>

          {/* Nav Links */}
          <div className="flex space-x-8 items-center text-white text-base font-medium">
            <Link to="/" className="flex items-center space-x-1 hover:text-yellow-200 transition duration-200">
              <LayoutDashboard className="w-5 h-5" />
              <span>Dashboard</span>
            </Link>

            <Link to="/study-plan" className="flex items-center space-x-1 hover:text-yellow-200 transition duration-200">
              <NotebookText className="w-5 h-5" />
              <span>Study Plans</span>
            </Link>

            <button className="flex items-center space-x-1 hover:text-yellow-200 transition duration-200">
              <Library className="w-5 h-5" />
              <span>Resources</span>
            </button>

            <Link to="/settings" className="flex items-center space-x-1 hover:text-yellow-200 transition duration-200">
              <Settings className="w-5 h-5" />
              <span>Settings</span>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
