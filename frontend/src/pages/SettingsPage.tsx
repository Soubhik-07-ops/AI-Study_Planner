import {
    Settings,
    Clock,
    Bell,
    Moon,
    Sun,
    ChevronDown,
} from 'lucide-react';
import { motion } from 'framer-motion';
import { useState } from 'react';
import { fadeIn, staggerContainer } from '../utils/motion';

interface SettingsState {
    dailyStudyHours: number;
    breakInterval: number;
    theme: 'light' | 'dark';
    notifications: boolean;
    reminderTime: string;
}

const SettingsPage = () => {
    const [settings, setSettings] = useState<SettingsState>({
        dailyStudyHours: 3,
        breakInterval: 45,
        theme: 'light',
        notifications: true,
        reminderTime: '18:00',
    });

    const handleChange = (field: string, value: any) => {
        setSettings((prevSettings) => ({ ...prevSettings, [field]: value }));
    };

    return (
        <motion.div
            variants={staggerContainer()}
            initial="hidden"
            animate="show"
            className="pb-12 px-4 sm:px-6 lg:px-8"
        >
            {/* Header */}
            <motion.div variants={fadeIn('up', 0.2)} className="mb-10">
                <div className="flex items-center gap-3 mb-2">
                    <Settings className="h-6 w-6 text-indigo-600" />
                    <h1 className="text-3xl font-extrabold text-gray-900">Settings</h1>
                </div>
                <p className="text-gray-500 text-sm">
                    Tailor your StudyWise experience the way you like
                </p>
            </motion.div>

            <motion.div variants={fadeIn('up', 0.3)} className="space-y-8">
                {/* Study Preferences */}
                <Section title="Study Preferences" icon={<Clock className="text-indigo-600 h-5 w-5" />}>
                    <Slider
                        label="Daily Study Hours"
                        value={settings.dailyStudyHours}
                        min={1}
                        max={8}
                        suffix="h"
                        description="Set how many hours you'd like to study daily"
                        onChange={(val: number) => handleChange('dailyStudyHours', val)}
                    />

                    <Slider
                        label="Break Interval"
                        value={settings.breakInterval}
                        min={15}
                        max={90}
                        step={5}
                        suffix="min"
                        description={`Take a ${settings.breakInterval}-minute break after every study session`}
                        onChange={(val: number) => handleChange('breakInterval', val)}
                    />
                </Section>

                {/* Notifications */}
                <Section title="Notifications" icon={<Bell className="text-indigo-600 h-5 w-5" />}>
                    <div className="flex items-center justify-between mb-4">
                        <div>
                            <h3 className="font-medium text-gray-900">Enable Notifications</h3>
                            <p className="text-sm text-gray-500">
                                Get reminders for study sessions and exams
                            </p>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                            <input
                                type="checkbox"
                                checked={settings.notifications}
                                onChange={(e) =>
                                    handleChange('notifications', e.target.checked)
                                }
                                className="sr-only peer"
                            />
                            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
                        </label>
                    </div>

                    {settings.notifications && (
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Daily Reminder Time
                            </label>
                            <div className="relative">
                                <select
                                    value={settings.reminderTime}
                                    onChange={(e) => handleChange('reminderTime', e.target.value)}
                                    className="block w-full pl-3 pr-10 py-2 text-base border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm shadow-sm"
                                >
                                    {Array.from({ length: 24 }, (_, i) => {
                                        const hour = i < 10 ? `0${i}` : i;
                                        return [`${hour}:00`, `${hour}:30`];
                                    })
                                        .flat()
                                        .map((time) => (
                                            <option key={time} value={time}>
                                                {time}
                                            </option>
                                        ))}
                                </select>
                                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                                    <ChevronDown className="h-4 w-4 text-gray-400" />
                                </div>
                            </div>
                        </div>
                    )}
                </Section>

                {/* Appearance */}
                <Section
                    title="Appearance"
                    icon={
                        settings.theme === 'light' ? (
                            <Sun className="text-indigo-600 h-5 w-5" />
                        ) : (
                            <Moon className="text-indigo-600 h-5 w-5" />
                        )
                    }
                >
                    <div className="flex items-center gap-4">
                        <ThemeCard
                            name="Light"
                            active={settings.theme === 'light'}
                            onClick={() => handleChange('theme', 'light')}
                            previewClass="bg-white"
                        />
                        <ThemeCard
                            name="Dark"
                            active={settings.theme === 'dark'}
                            onClick={() => handleChange('theme', 'dark')}
                            previewClass="bg-gray-900"
                        />
                    </div>
                </Section>
            </motion.div>
        </motion.div>
    );
};

export default SettingsPage;

interface SectionProps {
    title: string;
    icon: JSX.Element;
    children: React.ReactNode;
}

const Section = ({ title, icon, children }: SectionProps) => (
    <div className="bg-white rounded-2xl shadow border border-gray-100 p-6">
        <div className="flex items-center gap-3 mb-6">
            {icon}
            <h2 className="text-xl font-semibold text-gray-900">{title}</h2>
        </div>
        <div className="space-y-6">{children}</div>
    </div>
);

interface SliderProps {
    label: string;
    value: number;
    min: number;
    max: number;
    step?: number;
    suffix?: string;
    description?: string;
    onChange: (value: number) => void;
}

const Slider = ({ label, value, min, max, step = 1, suffix = '', description, onChange }: SliderProps) => (
    <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">{label}</label>
        <div className="flex items-center gap-4">
            <input
                type="range"
                min={min}
                max={max}
                step={step}
                value={value}
                onChange={(e) => onChange(parseInt(e.target.value))}
                className="w-full h-2 bg-gradient-to-r from-indigo-400 to-indigo-600 rounded-lg appearance-none cursor-pointer"
            />
            <span className="text-sm font-medium text-gray-900 min-w-[40px]">
                {value}
                {suffix}
            </span>
        </div>
        {description && <p className="mt-1 text-sm text-gray-500">{description}</p>}
    </div>
);

interface ThemeCardProps {
    name: string;
    active: boolean;
    onClick: () => void;
    previewClass: string;
}

const ThemeCard = ({ name, active, onClick, previewClass }: ThemeCardProps) => (
    <button
        onClick={onClick}
        className={`flex-1 p-4 rounded-xl border transition-all duration-200 ${active
            ? 'border-indigo-500 bg-indigo-50 shadow-md'
            : 'border-gray-200 hover:border-indigo-400 hover:bg-gray-50'
            }`}
    >
        <div className="flex flex-col items-center">
            <div className={`w-full h-24 rounded border mb-2 ${previewClass}`}></div>
            <span className="font-medium text-gray-800">{name}</span>
        </div>
    </button>
);
