import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { motion } from 'framer-motion';

ChartJS.register(ArcElement, Tooltip, Legend);

const ProgressChart = () => {
    const data = {
        labels: ['Completed', 'Remaining'],
        datasets: [
            {
                data: [75, 25],
                backgroundColor: ['#4f46e5', '#e5e7eb'],
                borderWidth: 0,
            },
        ],
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white p-6 rounded-xl shadow-sm border border-gray-100"
        >
            <h3 className="font-medium text-gray-900 mb-4">Weekly Progress</h3>
            <div className="h-64">
                <Doughnut
                    data={data}
                    options={{
                        cutout: '70%',
                        plugins: {
                            legend: {
                                position: 'bottom',
                                labels: {
                                    usePointStyle: true,
                                    padding: 20,
                                },
                            },
                        },
                    }}
                />
            </div>
            <div className="mt-4 grid grid-cols-2 gap-4">
                <div className="text-center">
                    <p className="text-2xl font-bold text-indigo-600">75%</p>
                    <p className="text-sm text-gray-500">Completion</p>
                </div>
                <div className="text-center">
                    <p className="text-2xl font-bold text-gray-600">12h</p>
                    <p className="text-sm text-gray-500">Studied</p>
                </div>
            </div>
        </motion.div>
    );
};

export default ProgressChart;