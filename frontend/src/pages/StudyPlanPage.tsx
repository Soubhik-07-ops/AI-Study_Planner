import { useLocation, useNavigate } from 'react-router-dom';
import { useStudyPlanStore } from '@/stores/study-plan-store';
import { useEffect } from 'react';
import { ArrowLeft, Youtube } from 'lucide-react';

const StudyPlanPage = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const planFromStore = useStudyPlanStore(state => state.getStudyPlan()); // Access stored study plan
    const { setStudyPlan } = useStudyPlanStore();

    useEffect(() => {
        // If a new plan is passed via location, update the store
        if (location.state?.plan && location.state?.plan.length > 0) {
            setStudyPlan(location.state.plan);
        }
    }, [location.state, setStudyPlan]);

    const plan = planFromStore.length > 0 ? planFromStore : []; // Default to store if available

    return (
        <div className="max-w-4xl mx-auto p-6 sm:p-8">
            <h1 className="text-3xl font-bold text-indigo-700 mb-8 flex items-center gap-2">
                📚 Study Plan Overview
            </h1>

            {plan.length === 0 ? (
                <div className="text-center text-red-600 text-lg mt-20">
                    ❌ No study plan found. Please go back and generate a new one.
                </div>
            ) : (
                <ul className="grid gap-6">
                    {plan.map((item: any, index: number) => (
                        <li
                            key={index}
                            className="bg-white border border-gray-200 rounded-2xl shadow-md p-6 hover:shadow-lg transition-shadow"
                        >
                            <h2 className="text-xl font-semibold text-indigo-800 mb-2">
                                📘 Module {index + 1}: {item.module}
                            </h2>
                            <div className="text-gray-700 whitespace-pre-line leading-relaxed">
                                🧠 <strong className="text-gray-900">Explanation:</strong><br />
                                {item.explanation}
                            </div>
                            <a
                                href={item.youtube}
                                target="_blank"
                                rel="noreferrer"
                                className="mt-4 inline-flex items-center gap-2 text-indigo-600 font-medium hover:text-indigo-800 transition-colors"
                            >
                                <Youtube className="h-5 w-5" />
                                Watch YouTube Playlist
                            </a>
                        </li>
                    ))}
                </ul>
            )}

            <button
                onClick={() => navigate(-1)}
                className="mt-10 inline-flex items-center gap-2 bg-indigo-600 text-white font-medium px-5 py-3 rounded-lg hover:bg-indigo-700 transition"
            >
                <ArrowLeft className="h-5 w-5" />
                Back to Form
            </button>
        </div>
    );
};

export default StudyPlanPage;
