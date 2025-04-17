import { useState, useEffect, useRef } from 'react';
import { Play, Pause, RotateCcw } from 'lucide-react';
import { motion } from 'framer-motion';

const SessionTimer = ({ initialMinutes = 25 }: { initialMinutes?: number }) => {
    const [timeLeft, setTimeLeft] = useState(initialMinutes * 60);
    const [isActive, setIsActive] = useState(false);
    const timerRef = useRef<NodeJS.Timeout>();

    useEffect(() => {
        if (isActive && timeLeft > 0) {
            timerRef.current = setInterval(() => {
                setTimeLeft((prev) => prev - 1);
            }, 1000);
        } else if (timeLeft === 0) {
            clearInterval(timerRef.current);
        }
        return () => clearInterval(timerRef.current);
    }, [isActive, timeLeft]);

    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;

    const toggleTimer = () => {
        setIsActive(!isActive);
    };

    const resetTimer = () => {
        setIsActive(false);
        setTimeLeft(initialMinutes * 60);
    };

    return (
        <motion.div
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            className="bg-indigo-600 text-white p-6 rounded-xl shadow-lg"
        >
            <div className="text-center mb-6">
                <h3 className="text-lg font-medium mb-1">Study Session</h3>
                <p className="text-indigo-200">Focus on your current task</p>
            </div>

            <div className="text-5xl font-bold text-center mb-8">
                {minutes.toString().padStart(2, '0')}:{seconds.toString().padStart(2, '0')}
            </div>

            <div className="flex justify-center space-x-4">
                <motion.button
                    whileTap={{ scale: 0.95 }}
                    onClick={toggleTimer}
                    className="p-3 bg-white text-indigo-600 rounded-full shadow-md"
                >
                    {isActive ? <Pause className="h-6 w-6" /> : <Play className="h-6 w-6" />}
                </motion.button>
                <button
                    onClick={resetTimer}
                    className="p-3 text-indigo-200 hover:text-white"
                >
                    <RotateCcw className="h-6 w-6" />
                </button>
            </div>
        </motion.div>
    );
};

export default SessionTimer;