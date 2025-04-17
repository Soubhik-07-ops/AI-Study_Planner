import { Calendar, BookOpen, Flag, FilePlus, Loader2 } from 'lucide-react';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useStudyPlanStore } from '@/stores/study-plan-store';

interface ExamFormProps {
  onSubmit: (formData: FormData) => void;
  onCancel: () => void;
}

type DifficultyLevel = 'easy' | 'medium' | 'hard';

const ExamForm = ({ onSubmit, onCancel }: ExamFormProps) => {
  const [examData, setExamData] = useState<{
    subject: string;
    date: string;
    difficulty: DifficultyLevel;
    priority: number;
  }>({
    subject: '',
    date: '',
    difficulty: 'medium',
    priority: 1,
  });

  const [syllabus, setSyllabus] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const navigate = useNavigate();
  const addExam = useStudyPlanStore((state) => state.addExam);

  const handleChange = (field: keyof typeof examData, value: string) => {
    setExamData({ ...examData, [field]: value });
  };

  const handleSyllabusChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setSyllabus(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const formData = new FormData();
    formData.append('subject', examData.subject);
    formData.append('date', examData.date);
    formData.append('difficulty', examData.difficulty);
    if (syllabus) formData.append('syllabus', syllabus);

    try {
      const response = await fetch('http://127.0.0.1:5000/generate-plan', {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.missing_modules
          ? `Modules not matched: ${data.missing_modules.join(', ')}`
          : data.error || 'Failed to generate plan');
        return;
      }

      addExam({
        subject: examData.subject,
        date: examData.date,
        difficulty: examData.difficulty,
        priority: examData.priority,
      });

      navigate('/study-plan', { state: { plan: data.plan } });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong!');
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.form
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      onSubmit={handleSubmit}
      className="max-w-2xl mx-auto bg-white shadow-lg rounded-2xl p-8 space-y-8 border border-gray-100"
    >
      <h2 className="text-2xl font-bold text-indigo-700 mb-4">📘 Add a New Exam</h2>

      {/* Subject */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Subject</label>
        <div className="relative">
          <BookOpen className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
          <input
            type="text"
            value={examData.subject}
            onChange={(e) => handleChange('subject', e.target.value)}
            className="pl-10 pr-3 py-2 w-full rounded-md border border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 shadow-sm"
            placeholder="e.g. Advanced Calculus"
            required
          />
        </div>
      </div>

      {/* Exam Date */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Exam Date</label>
        <div className="relative">
          <Calendar className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
          <input
            type="date"
            value={examData.date}
            onChange={(e) => handleChange('date', e.target.value)}
            className="pl-10 pr-3 py-2 w-full rounded-md border border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 shadow-sm"
            required
            min={new Date().toISOString().split('T')[0]}
          />
        </div>
      </div>

      {/* Difficulty */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Difficulty</label>
        <div className="grid grid-cols-3 gap-3">
          {['easy', 'medium', 'hard'].map((level) => (
            <button
              key={level}
              type="button"
              onClick={() => handleChange('difficulty', level)}
              className={`py-2 px-4 rounded-md text-sm font-medium flex items-center justify-center gap-2 border transition 
                ${examData.difficulty === level
                  ? 'bg-indigo-100 text-indigo-700 border-indigo-300'
                  : 'bg-gray-50 text-gray-700 border-gray-200 hover:bg-gray-100'
                }`}
            >
              <Flag className="h-4 w-4" />
              <span className="capitalize">{level}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Syllabus Upload */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Upload Syllabus</label>
        <div className="relative">
          <input
            type="file"
            accept=".pdf,.docx"
            onChange={handleSyllabusChange}
            className="block w-full rounded-md border border-gray-300 py-2 px-3 text-sm text-gray-700 bg-gray-50 file:mr-4 file:py-1 file:px-2 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-indigo-100 file:text-indigo-700 hover:file:bg-indigo-200"
            required
          />
          {syllabus && (
            <p className="mt-2 text-xs text-gray-600">
              <FilePlus className="inline-block h-4 w-4 mr-1" />
              {syllabus.name}
            </p>
          )}
        </div>
      </div>

      {/* Buttons */}
      <div className="flex justify-end gap-3 pt-4">
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={loading}
          className="px-5 py-2 rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 flex items-center gap-2"
        >
          {loading && <Loader2 className="animate-spin h-4 w-4" />}
          {loading ? 'Generating...' : 'Save Exam'}
        </button>
      </div>

      {/* Error Display */}
      {error && (
        <div className="text-sm text-red-500 mt-3 border border-red-200 bg-red-50 rounded-md p-2">
          ⚠️ {error}
        </div>
      )}
    </motion.form>
  );
};

export default ExamForm;
