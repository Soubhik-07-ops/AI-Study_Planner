import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Calendar, Clock, BarChart, BookOpen, Plus, ChevronRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { Tab } from '@headlessui/react';
import { toast } from 'react-hot-toast';
import { useStudyPlanStore } from '@/stores/study-plan-store';
import ExamForm from '../components/exams/ExamForm';
import ExamCountdown from '../components/exams/ExamCountdown';
import { fadeIn } from '../utils/motion';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Area } from 'recharts';
import React from 'react';

const DashboardPage = () => {
  const [showExamForm, setShowExamForm] = useState(false);
  const { exams, addExam, plan, deleteExam } = useStudyPlanStore();
  const navigate = useNavigate();

  const studyModules = React.useMemo(() => {
    return plan?.[0]?.explanation?.split('\n').filter((line: string) => line.trim() !== '') || [];
  }, [plan]);

  const sampleProgressData = React.useMemo(() => {
    return Array.from({ length: 5 }).map((_, index) => ({
      name: `Module ${index + 1}`,
      studyHoursPerDay: Math.floor(Math.random() * 6) + 2
    }));
  }, []);

  const stats = React.useMemo(() => [
    { label: 'Upcoming Exams', value: exams.length, color: 'text-indigo-600' },
    { label: "Today's Sessions", value: studyModules.length || 0, color: 'text-emerald-600' },
    { label: 'Study Hours', value: `${studyModules.length * 1.5}h`, color: 'text-amber-600' },
  ], [exams.length, studyModules.length]);

  const handleAddExam = async (examData: any) => {
    try {
      await addExam(examData);
      toast.success('Exam added successfully!');
      setShowExamForm(false);
    } catch (error) {
      toast.error('Failed to add exam');
      console.error('Error adding exam:', error);
    }
  };

  const handleDeleteExam = (examId: string) => {
    deleteExam(examId);
    toast.success('Exam deleted successfully!');
  };

  const features = [
    {
      icon: Calendar,
      title: 'Exam Tracking',
      description: 'Stay on top of your upcoming exams with smart reminders',
      color: 'bg-indigo-100 text-indigo-600',
      onClick: () => setShowExamForm(true)
    },
    {
      icon: BarChart,
      title: 'Progress Analytics',
      description: 'Track your performance and identify weak areas',
      color: 'bg-emerald-100 text-emerald-600',
      onClick: () => navigate('/progress')
    },
    {
      icon: Clock,
      title: 'Study Plans',
      description: 'Personalized schedules based on your syllabus',
      color: 'bg-amber-100 text-amber-600',
      onClick: () => navigate('/plan')
    },
    {
      icon: BookOpen,
      title: 'Resources',
      description: 'Curated study materials and video tutorials',
      color: 'bg-blue-100 text-blue-600',
      onClick: () => navigate('/resources')
    }
  ];

  const upcomingExams = exams.filter((exam) => !exam.isAdded);

  return (
    <div className="pb-12 space-y-10 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Hero Section */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center py-10 sm:py-14 bg-gradient-to-r from-indigo-500 to-blue-600 rounded-xl text-white px-4"
      >
        <h1 className="text-3xl sm:text-4xl font-bold mb-2">Welcome to StudyWise</h1>
        <p className="text-base sm:text-lg opacity-90">Your AI-powered study companion for exam success</p>
      </motion.section>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
        {stats.map((stat, i) => (
          <motion.div
            key={stat.label}
            variants={fadeIn('right', 0.2 + i * 0.1)}
            initial="hidden"
            animate="show"
            className="bg-gradient-to-r from-indigo-500 to-blue-600 rounded-xl shadow-xl p-4 sm:p-5 flex items-center justify-center transition-transform transform hover:scale-105 hover:shadow-2xl hover:rotate-2 hover:bg-indigo-700"
          >
            <div className="text-center">
              <div className="flex justify-center mb-2 sm:mb-4">
                {i === 0 && <Calendar className="h-8 w-8 sm:h-12 sm:w-12 text-white transition-transform transform hover:scale-125" />}
                {i === 1 && <BookOpen className="h-8 w-8 sm:h-12 sm:w-12 text-white transition-transform transform hover:scale-125" />}
                {i === 2 && <Clock className="h-8 w-8 sm:h-12 sm:w-12 text-white transition-transform transform hover:scale-125" />}
              </div>
              <p className="text-white text-xs sm:text-sm mb-1 sm:mb-2">{stat.label}</p>
              <p className={`text-2xl sm:text-3xl font-bold text-white`}>{stat.value}</p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Quick Access Cards */}
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        <h2 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6 text-gray-800">Quick Access</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              variants={fadeIn('up', index * 0.1)}
              initial="hidden"
              animate="show"
              whileHover={{ y: -5 }}
              onClick={feature.onClick}
              className={`p-4 sm:p-6 rounded-xl cursor-pointer border bg-white hover:shadow-xl transition-all transform hover:scale-105`}
            >
              <div className={`p-2 sm:p-3 rounded-full w-fit mb-3 sm:mb-4 ${feature.color}`}>
                <feature.icon className="h-5 w-5 sm:h-6 sm:w-6" />
              </div>
              <h3 className="text-base sm:text-lg font-semibold mb-1 sm:mb-2 text-gray-800">{feature.title}</h3>
              <p className="text-gray-600 text-xs sm:text-sm">{feature.description}</p>
              <div className="mt-3 sm:mt-4 flex items-center text-xs sm:text-sm font-medium text-gray-500">
                Go to feature <ChevronRight className="h-3 w-3 sm:h-4 sm:w-4 ml-1" />
              </div>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* Analytics with Chart */}
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="bg-white rounded-xl shadow-xl p-4 sm:p-6 border border-gray-100"
      >
        <h2 className="text-lg sm:text-xl font-bold text-gray-800 mb-3 sm:mb-4">Analytics Overview</h2>
        <Tab.Group>
          <Tab.List className="flex space-x-2 sm:space-x-4 border-b mb-3 sm:mb-4 overflow-x-auto">
            {['Study Hours', 'Sessions', 'Focus Time'].map((category) => (
              <Tab
                key={category}
                className={({ selected }) =>
                  `py-1 px-2 sm:py-2 sm:px-4 text-xs sm:text-sm font-medium whitespace-nowrap ${selected ? 'border-b-2 border-indigo-500 text-indigo-600' : 'text-gray-500'}`
                }
              >
                {category}
              </Tab>
            ))}
          </Tab.List>
          <Tab.Panels>
            <Tab.Panel>
              <div className="h-64 sm:h-80 lg:h-96">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={sampleProgressData}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip
                      contentStyle={{ backgroundColor: 'rgba(255, 255, 255, 0.9)', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)' }}
                      labelStyle={{ fontWeight: 'bold', color: '#4b5563' }}
                      itemStyle={{ color: '#6366f1' }}
                    />
                    <Line
                      type="monotone"
                      dataKey="studyHoursPerDay"
                      stroke="#6366f1"
                      strokeWidth={3}
                      dot={{ stroke: '#6366f1', strokeWidth: 2, fill: '#ffffff' }}
                      activeDot={{ r: 6 }}
                      isAnimationActive={true}
                    />
                    <defs>
                      <linearGradient id="gradient1" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="#6366f1" stopOpacity={0.4} />
                        <stop offset="100%" stopColor="#6366f1" stopOpacity={0.1} />
                      </linearGradient>
                    </defs>
                    <Area type="monotone" dataKey="studyHoursPerDay" stroke="#6366f1" fill="url(#gradient1)" />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </Tab.Panel>
            <Tab.Panel>
              <p className="text-gray-500">Session analysis based on module-wise tracking.</p>
            </Tab.Panel>
            <Tab.Panel>
              <p className="text-gray-500">Focus time insights coming soon.</p>
            </Tab.Panel>
          </Tab.Panels>
        </Tab.Group>
      </motion.section>

      {/* Upcoming Exams */}
      <motion.section
        variants={fadeIn('up', 0.5)}
        initial="hidden"
        animate="show"
        className="bg-white rounded-xl shadow-xl p-4 sm:p-6 border"
      >
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 sm:mb-6 gap-3">
          <h2 className="text-xl sm:text-2xl font-bold text-gray-800">Upcoming Exams</h2>
          <button
            onClick={() => setShowExamForm(true)}
            className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-3 py-1.5 sm:px-4 sm:py-2 rounded-lg transition-colors text-sm sm:text-base"
          >
            <Plus className="h-3 w-3 sm:h-4 sm:w-4" />
            Add Exam
          </button>
        </div>

        {upcomingExams.length === 0 ? (
          <div className="text-center py-8 sm:py-12">
            <div className="mx-auto w-16 h-16 sm:w-24 sm:h-24 bg-indigo-50 rounded-full flex items-center justify-center mb-3 sm:mb-4">
              <Calendar className="h-6 w-6 sm:h-10 sm:w-10 text-indigo-400" />
            </div>
            <h3 className="text-base sm:text-lg font-medium text-gray-700 mb-1 sm:mb-2">No exams scheduled</h3>
            <p className="text-gray-500 mb-3 sm:mb-4 text-sm sm:text-base">Add your first exam to get started</p>
            <button
              onClick={() => setShowExamForm(true)}
              className="text-indigo-600 hover:text-indigo-800 font-medium text-xs sm:text-sm"
            >
              Schedule an exam
            </button>
          </div>
        ) : (
          <div className="space-y-3 sm:space-y-4">
            {upcomingExams.slice(0, 3).map((exam) => (
              <ExamCountdown
                key={exam.id}
                exam={exam}
                onDelete={() => handleDeleteExam(exam.id)}
              />
            ))}
            {upcomingExams.length > 3 && (
              <button
                onClick={() => navigate('/exams')}
                className="w-full py-2 sm:py-3 text-indigo-600 hover:text-indigo-800 font-medium text-xs sm:text-sm border border-dashed border-gray-300 rounded-lg hover:border-indigo-300 transition-colors"
              >
                View all {upcomingExams.length} exams
              </button>
            )}
          </div>
        )}
      </motion.section>

      {/* Module Breakdown with Explanations */}
      {plan && plan[0] && (
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, type: "spring", stiffness: 120 }}
          className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-500 rounded-xl shadow-2xl p-6 sm:p-8 border border-transparent hover:scale-[1.02] transition-transform duration-300 ease-in-out"
        >
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white mb-4 sm:mb-6 text-center tracking-wide drop-shadow-lg">
            Module-Wise Plan
          </h2>
          <p className="text-white text-sm sm:text-base md:text-lg whitespace-pre-line mb-4 sm:mb-6 leading-relaxed opacity-90">
            {plan[0].explanation}
          </p>
          <a
            href={plan[0].youtube}
            target="_blank"
            className="inline-block text-indigo-100 font-semibold text-sm sm:text-base md:text-lg underline transition-all transform hover:text-indigo-300 hover:scale-105 hover:translate-x-2 hover:shadow-xl"
            rel="noreferrer"
          >
            Watch Playlist
          </a>
        </motion.section>
      )}

      {/* Modal for adding Exam */}
      {showExamForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-xl shadow-xl p-4 sm:p-6 w-full max-w-md mx-4"
          >
            <ExamForm
              onSubmit={handleAddExam}
              onCancel={() => setShowExamForm(false)}
            />
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default DashboardPage;