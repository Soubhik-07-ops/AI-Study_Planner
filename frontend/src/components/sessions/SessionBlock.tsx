import { Clock, CheckCircle, Circle } from 'lucide-react';
import { motion } from 'framer-motion';

interface SessionBlockProps {
    subject: string;
    duration: number;
    completed: boolean;
    timeRange: string;
    onToggleComplete: () => void;
}

const SessionBlock = ({
    subject,
    duration,
    completed,
    timeRange,
    onToggleComplete,
}: SessionBlockProps) => {
    return (
        <motion.div
            whileHover={{ scale: 1.02 }}
            className={`p-4 rounded-lg border ${completed ? 'border-emerald-100 bg-emerald-50' : 'border-gray-100 bg-white'} shadow-sm`}
        >
            <div className="flex justify-between items-start">
                <div>
                    <h3 className="font-medium text-gray-900">{subject}</h3>
                    <div className="flex items-center mt-2 space-x-4">
                        <div className="flex items-center text-sm text-gray-500">
                            <Clock className="h-4 w-4 mr-1" />
                            <span>{duration}h</span>
                        </div>
                        <div className="text-sm text-gray-500">{timeRange}</div>
                    </div>
                </div>
                <button
                    onClick={onToggleComplete}
                    className={`p-2 rounded-full ${completed ? 'text-emerald-600 hover:bg-emerald-100' : 'text-gray-400 hover:bg-gray-100'}`}
                >
                    {completed ? <CheckCircle className="h-5 w-5" /> : <Circle className="h-5 w-5" />}
                </button>
            </div>
        </motion.div>
    );
};

export default SessionBlock;