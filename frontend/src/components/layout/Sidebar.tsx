import { Home, Calendar, Book, BarChart, Settings, LogOut } from 'lucide-react';
import { motion } from 'framer-motion';
import { NavLink } from 'react-router-dom';

const Sidebar = () => {
    const navItems = [
        { icon: Home, label: 'Dashboard', path: '/' },
        { icon: Calendar, label: 'Study Plan', path: '/plan' },
        { icon: Book, label: 'Exams', path: '/exams' },
        { icon: BarChart, label: 'Progress', path: '/progress' },
        { icon: Settings, label: 'Settings', path: '/settings' }
    ];

    return (
        <motion.div
            initial={{ x: -300 }}
            animate={{ x: 0 }}
            transition={{ type: 'spring', stiffness: 100 }}
            className="w-64 h-screen bg-white shadow-lg fixed flex flex-col"
        >
            <div className="p-6 border-b border-gray-100">
                <h1 className="text-2xl font-bold text-indigo-600">StudyWise</h1>
                <p className="text-sm text-gray-500">Your study companion</p>
            </div>

            <nav className="flex-1 p-4 space-y-2">
                {navItems.map((item, index) => (
                    <NavLink
                        key={item.label}
                        to={item.path}
                        className={({ isActive }) =>
                            `flex items-center p-3 rounded-lg transition-colors ${isActive ?
                                'bg-indigo-50 text-indigo-600' :
                                'text-gray-600 hover:bg-gray-50'}`
                        }
                    >
                        <item.icon className="h-5 w-5 mr-3" />
                        <span>{item.label}</span>
                    </NavLink>
                ))}
            </nav>

            <div className="p-4 border-t border-gray-100">
                <button className="flex items-center w-full p-3 text-gray-600 hover:bg-gray-50 rounded-lg transition-colors">
                    <LogOut className="h-5 w-5 mr-3" />
                    <span>Logout</span>
                </button>
            </div>
        </motion.div>
    );
};

export default Sidebar;