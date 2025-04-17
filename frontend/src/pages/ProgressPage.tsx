import { BarChart, Calendar, BookOpen, Award, ChevronDown, ChevronUp } from 'lucide-react';
import { motion } from 'framer-motion';
import { useState } from 'react';
import { fadeIn, staggerContainer } from '../utils/motion';
import { Doughnut, Bar } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement);

const ProgressPage = () => {
    const [expandedSection, setExpandedSection] = useState<string | null>('overview');

    const toggleSection = (section: string) => {
        setExpandedSection(expandedSection === section ? null : section);
    };

    const progressData = {
        overallCompletion: 68,
        subjects: [
            { name: 'Mathematics', completion: 75, hoursStudied: 12 },
            { name: 'Physics', completion: 60, hoursStudied: 8 },
            { name: 'Chemistry', completion: 45, hoursStudied: 6 }
        ],
        weeklyTrend: [5, 8, 6, 7, 9, 10, 4] // Hours per day last week
    };

    const doughnutData = {
        labels: ['Completed', 'Remaining'],
        datasets: [
            {
                data: [progressData.overallCompletion, 100 - progressData.overallCompletion],
                backgroundColor: ['#4f46e5', '#e5e7eb'],
                borderWidth: 0
            }
        ]
    };

    const barData = {
        labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
        datasets: [
            {
                label: 'Study Hours',
                data: progressData.weeklyTrend,
                backgroundColor: '#4f46e5'
            }
        ]
    };

    return (
        <motion.div
            variants={staggerContainer()}
            initial="hidden"
            animate="show"
            className="pb-12"
        >
            <motion.div variants={fadeIn('up', 0.2)} className="mb-8">
                <h1 className="text-3xl font-bold text-gray-900">Study Progress</h1>
                <p className="text-gray-500">Track your learning journey and performance</p>
            </motion.div>

            {/* Overview Card */}
            <motion.div
                variants={fadeIn('up', 0.3)}
                className="bg-white rounded-xl shadow-sm border border-gray-100 mb-6 overflow-hidden"
            >
                <div
                    className="flex justify-between items-center p-4 cursor-pointer hover:bg-gray-50 transition-colors"
                    onClick={() => toggleSection('overview')}
                >
                    <div className="flex items-center gap-3">
                        <div className="p-2 bg-indigo-100 text-indigo-600 rounded-lg">
                            <BarChart className="h-5 w-5" />
                        </div>
                        <h2 className="font-medium text-gray-900">Overview</h2>
                    </div>
                    {expandedSection === 'overview' ? (
                        <ChevronUp className="h-5 w-5 text-gray-400" />
                    ) : (
                        <ChevronDown className="h-5 w-5 text-gray-400" />
                    )}
                </div>

                {expandedSection === 'overview' && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        transition={{ duration: 0.3 }}
                        className="px-4 pb-4"
                    >
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                            <div className="bg-indigo-50 rounded-lg p-4">
                                <h3 className="text-sm font-medium text-indigo-800 mb-2">Overall Completion</h3>
                                <div className="flex items-end gap-2">
                                    <span className="text-3xl font-bold text-indigo-600">{progressData.overallCompletion}%</span>
                                </div>
                                <div className="mt-4 h-2 bg-indigo-100 rounded-full">
                                    <div
                                        className="h-2 bg-indigo-600 rounded-full"
                                        style={{ width: `${progressData.overallCompletion}%` }}
                                    ></div>
                                </div>
                            </div>

                            <div className="bg-emerald-50 rounded-lg p-4">
                                <h3 className="text-sm font-medium text-emerald-800 mb-2">Total Study Hours</h3>
                                <div className="flex items-end gap-2">
                                    <span className="text-3xl font-bold text-emerald-600">
                                        {progressData.subjects.reduce((sum, s) => sum + s.hoursStudied, 0)}
                                    </span>
                                    <span className="text-sm text-emerald-500">hours</span>
                                </div>
                                <p className="mt-2 text-sm text-emerald-700">+12% from last week</p>
                            </div>

                            <div className="bg-amber-50 rounded-lg p-4">
                                <h3 className="text-sm font-medium text-amber-800 mb-2">Most Studied</h3>
                                <div className="flex items-center gap-2">
                                    <span className="text-xl font-bold text-amber-600">Mathematics</span>
                                    <span className="text-sm bg-amber-100 text-amber-800 px-2 py-1 rounded-full">75%</span>
                                </div>
                                <p className="mt-2 text-sm text-amber-700">12 hours this week</p>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="bg-white border border-gray-100 rounded-lg p-4">
                                <h3 className="font-medium text-gray-900 mb-4">Completion Rate</h3>
                                <div className="h-64">
                                    <Doughnut
                                        data={doughnutData}
                                        options={{
                                            cutout: '70%',
                                            plugins: {
                                                legend: { position: 'bottom' }
                                            }
                                        }}
                                    />
                                </div>
                            </div>

                            <div className="bg-white border border-gray-100 rounded-lg p-4">
                                <h3 className="font-medium text-gray-900 mb-4">Weekly Study Trend</h3>
                                <div className="h-64">
                                    <Bar
                                        data={barData}
                                        options={{
                                            responsive: true,
                                            scales: {
                                                y: {
                                                    beginAtZero: true
                                                }
                                            }
                                        }}
                                    />
                                </div>
                            </div>
                        </div>
                    </motion.div>
                )}
            </motion.div>

            {/* Subjects Progress */}
            <motion.div
                variants={fadeIn('up', 0.4)}
                className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden"
            >
                <div
                    className="flex justify-between items-center p-4 cursor-pointer hover:bg-gray-50 transition-colors"
                    onClick={() => toggleSection('subjects')}
                >
                    <div className="flex items-center gap-3">
                        <div className="p-2 bg-indigo-100 text-indigo-600 rounded-lg">
                            <BookOpen className="h-5 w-5" />
                        </div>
                        <h2 className="font-medium text-gray-900">Subjects Progress</h2>
                    </div>
                    {expandedSection === 'subjects' ? (
                        <ChevronUp className="h-5 w-5 text-gray-400" />
                    ) : (
                        <ChevronDown className="h-5 w-5 text-gray-400" />
                    )}
                </div>

                {expandedSection === 'subjects' && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        transition={{ duration: 0.3 }}
                        className="px-4 pb-4"
                    >
                        <div className="space-y-4">
                            {progressData.subjects.map((subject, index) => (
                                <div key={index} className="border-b border-gray-100 pb-4 last:border-0 last:pb-0">
                                    <div className="flex justify-between items-center mb-2">
                                        <h3 className="font-medium text-gray-900">{subject.name}</h3>
                                        <span className="text-sm font-medium text-indigo-600">{subject.completion}%</span>
                                    </div>
                                    <div className="h-2 bg-gray-100 rounded-full mb-2">
                                        <div
                                            className="h-2 bg-indigo-600 rounded-full"
                                            style={{ width: `${subject.completion}%` }}
                                        ></div>
                                    </div>
                                    <div className="flex justify-between text-sm text-gray-500">
                                        <span>{subject.hoursStudied} hours studied</span>
                                        <span>{Math.round(subject.hoursStudied / subject.completion * 100)} hours remaining</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </motion.div>
                )}
            </motion.div>
        </motion.div>
    );
};

export default ProgressPage;