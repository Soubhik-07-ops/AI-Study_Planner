import { Clock, ChevronRight } from 'lucide-react';
import { motion } from 'framer-motion';
import SessionBlock from './SessionBlock';

const TodaySessions = () => {
    const sessions = [
        { id: '1', subject: 'Mathematics', duration: 2, completed: true, timeRange: '09:00 - 11:00' },
        { id: '2', subject: 'Physics', duration: 1.5, completed: false, timeRange: '14:00 - 15:30' },
        { id: '3', subject: 'Chemistry', duration: 1, completed: false, timeRange: '16:00 - 17:00' },
    ];

    const toggleComplete = (id: string) => {
        console.log(`Toggled session ${id}`);
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
            className="bg-gradient-to-br from-white via-slate-50 to-slate-100 p-6 rounded-2xl shadow-lg border border-gray-100"
        >
            {/* Header */}
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-semibold text-gray-900 tracking-tight">
                    Today’s Sessions
                </h2>
                <button className="flex items-center gap-1 text-sm font-medium text-indigo-600 hover:text-indigo-800 transition">
                    View all <ChevronRight className="h-4 w-4" />
                </button>
            </div>

            {/* Session List */}
            <div className="space-y-4">
                {sessions.length === 0 ? (
                    <div className="text-center py-10">
                        <Clock className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                        <p className="text-gray-500 text-base">You have no sessions scheduled today. Chill or add one!</p>
                    </div>
                ) : (
                    sessions.map((session, i) => (
                        <motion.div
                            key={session.id}
                            initial={{ opacity: 0, y: 8 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.1 }}
                        >
                            <SessionBlock
                                subject={session.subject}
                                duration={session.duration}
                                completed={session.completed}
                                timeRange={session.timeRange}
                                onToggleComplete={() => toggleComplete(session.id)}
                            />
                        </motion.div>
                    ))
                )}
            </div>
        </motion.div>
    );
};

export default TodaySessions;
