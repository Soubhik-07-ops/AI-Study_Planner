import { Calendar, Clock, BookOpen, Plus, ChevronRight, Flag, Check } from 'lucide-react';
import { motion } from 'framer-motion';
import { useState } from 'react';
import ExamForm from '../components/exams/ExamForm';
import { fadeIn, staggerContainer } from '../utils/motion';

const ExamsPage = () => {
    const [showExamForm, setShowExamForm] = useState(false);
    const [exams, setExams] = useState([
        {
            id: '1',
            subject: 'Advanced Calculus',
            date: new Date(Date.now() + 7 * 86400000),
            difficulty: 'hard',
            priority: 1
        },
        {
            id: '2',
            subject: 'Quantum Physics',
            date: new Date(Date.now() + 14 * 86400000),
            difficulty: 'medium',
            priority: 2
        }
    ]);

    const handleAddExam = (newExam: any) => {
        setExams([...exams, { ...newExam, id: `${exams.length + 1}` }]);
        setShowExamForm(false);
    };

    const getDifficultyColor = (difficulty: string) => {
        switch (difficulty) {
            case 'easy': return 'bg-emerald-100 text-emerald-600';
            case 'medium': return 'bg-amber-100 text-amber-600';
            case 'hard': return 'bg-red-100 text-red-600';
            default: return 'bg-gray-100 text-gray-600';
        }
    };

    return (
        <motion.div
            variants={staggerContainer()}
            initial="hidden"
            animate="show"
            className="pb-12"
        >
            <motion.div
                variants={fadeIn('up', 0.2)}
                className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4"
            >
                <div>
                    <h1 className="text-3xl font-bold text-gray-900">My Exams</h1>
                    <p className="text-gray-500">
                        {exams.length} upcoming exams • {exams.filter(e => new Date(e.date) < new Date()).length} completed
                    </p>
                </div>
                <button
                    onClick={() => setShowExamForm(true)}
                    className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg transition-colors"
                >
                    <Plus className="h-4 w-4" />
                    Add Exam
                </button>
            </motion.div>

            <motion.div variants={fadeIn('up', 0.3)} className="space-y-4">
                {exams.length === 0 ? (
                    <motion.div
                        variants={fadeIn('up', 0.4)}
                        className="text-center py-16 bg-white rounded-xl shadow-sm border border-gray-100"
                    >
                        <div className="mx-auto w-20 h-20 bg-indigo-50 rounded-full flex items-center justify-center mb-4">
                            <Calendar className="h-8 w-8 text-indigo-400" />
                        </div>
                        <h3 className="text-lg font-medium text-gray-700 mb-2">No exams scheduled yet</h3>
                        <p className="text-gray-500 max-w-md mx-auto mb-6">
                            Add your exams to create a personalized study plan and get reminders
                        </p>
                        <button
                            onClick={() => setShowExamForm(true)}
                            className="inline-flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg transition-colors"
                        >
                            <Plus className="h-4 w-4" />
                            Schedule Your First Exam
                        </button>
                    </motion.div>
                ) : (
                    exams.map((exam, index) => (
                        <motion.div
                            key={exam.id}
                            variants={fadeIn('up', index * 0.1 + 0.4)}
                            className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 hover:shadow-md transition-shadow"
                        >
                            <div className="flex justify-between items-start">
                                <div className="flex items-start gap-4">
                                    <div className="p-3 bg-indigo-100 text-indigo-600 rounded-lg">
                                        <BookOpen className="h-5 w-5" />
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-gray-900">{exam.subject}</h3>
                                        <div className="flex items-center gap-4 mt-2">
                                            <div className="flex items-center gap-1 text-sm text-gray-500">
                                                <Calendar className="h-4 w-4" />
                                                <span>{exam.date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                                            </div>
                                            <div className="flex items-center gap-1 text-sm">
                                                <span className={`px-2 py-1 rounded-full text-xs ${getDifficultyColor(exam.difficulty)}`}>
                                                    {exam.difficulty}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex items-center gap-2">
                                    <button className="p-2 text-gray-400 hover:text-gray-600 rounded-full hover:bg-gray-100">
                                        <Flag className="h-4 w-4" />
                                    </button>
                                    <button className="p-2 text-gray-400 hover:text-gray-600 rounded-full hover:bg-gray-100">
                                        <ChevronRight className="h-4 w-4" />
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    ))
                )}
            </motion.div>

            {/* Exam Form Modal */}
            {showExamForm && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="bg-white rounded-xl shadow-xl p-6 w-full max-w-md"
                    >
                        <ExamForm
                            onSubmit={handleAddExam}
                            onCancel={() => setShowExamForm(false)}
                        />
                    </motion.div>
                </div>
            )}
        </motion.div>
    );
};

export default ExamsPage;