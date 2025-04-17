import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Brain,
  BarChart,
  TrendingUp,
  ArrowLeft,
  BookOpen,
  Trophy,
  Target,
} from 'lucide-react';
import { useStudyPlanStore } from '@/stores/study-plan-store';
import { Exam } from '@/types/study-plan';

// Remove local interface definitions

interface SubjectAnalysis {
  predictedDifficulty: number;
  personalDifficulty: number;
  analysis: string;
  recommendations: string[];
  strengths: string[];
  weaknesses: string[];
}


const SubjectDifficultyPage: React.FC = () => {
  const navigate = useNavigate();
  const [subject, setSubject] = useState('');
  const [previousMarks, setPreviousMarks] = useState<string[]>(['']);
  const [analysis, setAnalysis] = useState<SubjectAnalysis | null>(null);
  const [loading, setLoading] = useState(false);
  const [selectedTopics, setSelectedTopics] = useState<string[]>([]);
  const [existingExam, setExistingExam] = useState<Exam | null>(null);

  const {
    addExam,
    updateExamBySubject,
    getExamBySubject,
  } = useStudyPlanStore();

  const commonTopics: Record<string, string[]> = {
    Mathematics: ['Algebra', 'Calculus', 'Geometry', 'Statistics', 'Trigonometry'],
    Physics: ['Mechanics', 'Thermodynamics', 'Electromagnetism', 'Optics', 'Modern Physics'],
    Chemistry: ['Organic Chemistry', 'Inorganic Chemistry', 'Physical Chemistry', 'Analytical Chemistry'],
    Biology: ['Cell Biology', 'Genetics', 'Ecology', 'Evolution', 'Physiology'],
    'Computer Science': ['Programming', 'Data Structures', 'Algorithms', 'Database Systems', 'Operating Systems'],
  };

  useEffect(() => {
    if (subject) {
      const exam = getExamBySubject(subject);
      setExistingExam(exam || null);

      if (exam?.analysis) {
        setAnalysis({
          predictedDifficulty: exam.analysis.predictedDifficulty,
          personalDifficulty: exam.analysis.personalDifficulty,
          analysis: `Previously analyzed as ${getDifficultyLabel(exam.analysis.personalDifficulty)}`,
          recommendations: exam.analysis.recommendations,
          strengths: exam.analysis.strengths,
          weaknesses: exam.analysis.weaknesses,
        });
      } else {
        setAnalysis(null); // Clear if no analysis exists
      }
    }
  }, [subject, getExamBySubject]);

  const addMarkField = () => {
    setPreviousMarks([...previousMarks, '']);
  };

  const updateMark = (index: number, value: string) => {
    const newMarks = [...previousMarks];
    newMarks[index] = value;
    setPreviousMarks(newMarks);
  };

  const removeMark = (index: number) => {
    const newMarks = previousMarks.filter((_, i) => i !== index);
    setPreviousMarks(newMarks);
  };

  const toggleTopic = (topic: string) => {
    setSelectedTopics(prev =>
      prev.includes(topic) ? prev.filter(t => t !== topic) : [...prev, topic]
    );
  };

  const calculatePersonalDifficulty = (marks: number[]): number => {
    if (marks.length === 0) return 0;
    const avg = marks.reduce((a, b) => a + b, 0) / marks.length;
    if (avg >= 85) return 1; // Easy
    if (avg >= 70) return 2; // Moderate
    if (avg >= 55) return 3; // Hard
    return 4; // Very Hard
  };

  const getDifficultyLabel = (level: number): string => {
    switch (level) {
      case 1:
        return 'Easy';
      case 2:
        return 'Moderate';
      case 3:
        return 'Hard';
      case 4:
        return 'Very Hard';
      default:
        return 'Unknown';
    }
  };

  const analyzeStrengthsWeaknesses = (marks: number[]): { strengths: string[]; weaknesses: string[] } => {
    const avg = marks.reduce((a, b) => a + b, 0) / marks.length;
    const strengths: string[] = [];
    const weaknesses: string[] = [];

    if (avg >= 80) {
      strengths.push('Consistent high performance', 'Strong grasp of fundamental concepts');
    }
    if (marks.every(mark => mark >= 60)) {
      strengths.push('Reliable performance across tests');
    }
    if (marks.some(mark => mark < 60)) {
      weaknesses.push('Inconsistent performance in some tests');
    }
    if (avg < 65) {
      weaknesses.push('Need to strengthen core concepts', 'Consider additional practice and revision');
    }

    return { strengths, weaknesses };
  };

  const saveAnalysisToStore = () => {
    if (!subject || !analysis) return;

    const examData: Partial<Exam> = {
      subject,
      date: existingExam?.date || new Date().toISOString().split('T')[0],
      difficulty: getDifficultyLabel(analysis.personalDifficulty).toLowerCase() as 'easy' | 'medium' | 'hard',
      priority: existingExam?.priority || 1,
      analysis: {
        ...analysis,
        // Ensure all SubjectAnalysis fields are included
        analysis: analysis.analysis
      }
    };

    if (existingExam) {
      updateExamBySubject(subject, examData);
    } else {
      addExam({
        ...examData,
        id: crypto.randomUUID() // Add missing required field
      } as Exam);
    }
  };
  const analyzeSubject = async () => {
    setLoading(true);
    try {
      const predictedDifficulty = Math.floor(Math.random() * 4) + 1;
      const validMarks = previousMarks
        .map(mark => parseInt(mark))
        .filter(mark => !isNaN(mark) && mark >= 0 && mark <= 100);

      const personalDifficulty = calculatePersonalDifficulty(validMarks);
      const { strengths, weaknesses } = analyzeStrengthsWeaknesses(validMarks);

      const recommendations = [
        'Create a structured study schedule',
        'Focus on understanding core concepts',
        'Practice with past exam questions',
        'Use active recall techniques',
        'Join study groups for collaborative learning',
      ];

      const newAnalysis: SubjectAnalysis = {
        predictedDifficulty,
        personalDifficulty,
        analysis: `Based on analysis, ${subject} is ${getDifficultyLabel(personalDifficulty)} for you`,
        recommendations,
        strengths,
        weaknesses,
      };

      setAnalysis(newAnalysis);
      saveAnalysisToStore();
    } catch (error) {
      console.error('Error analyzing subject:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="flex items-center mb-6">
        <button
          onClick={() => navigate('/')}
          className="flex items-center text-indigo-600 hover:text-indigo-800"
        >
          <ArrowLeft className="mr-2" />
          Back to Dashboard
        </button>
      </div>

      <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
        <Brain className="text-indigo-600" /> Subject Difficulty Analysis
      </h2>

      <div className="mb-4">
        <label className="block font-medium mb-1">Select Subject</label>
        <select
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
          className="w-full border rounded-lg px-4 py-2"
        >
          <option value="">-- Choose Subject --</option>
          {Object.keys(commonTopics).map(sub => (
            <option key={sub} value={sub}>
              {sub}
            </option>
          ))}
        </select>
      </div>

      {subject && (
        <div className="mb-4">
          <label className="block font-medium mb-1">Previous Marks</label>
          {previousMarks.map((mark, index) => (
            <div key={index} className="flex gap-2 mb-2">
              <input
                type="number"
                value={mark}
                onChange={(e) => updateMark(index, e.target.value)}
                className="w-full border rounded-lg px-4 py-2"
              />
              <button
                onClick={() => removeMark(index)}
                className="text-red-500 hover:underline"
              >
                Remove
              </button>
            </div>
          ))}
          <button onClick={addMarkField} className="text-indigo-600 hover:underline">
            + Add Mark
          </button>
        </div>
      )}

      {subject && commonTopics[subject] && (
        <div className="mb-4">
          <label className="block font-medium mb-1">Select Topics</label>
          <div className="flex flex-wrap gap-2">
            {commonTopics[subject].map(topic => (
              <button
                key={topic}
                onClick={() => toggleTopic(topic)}
                className={`px-4 py-2 rounded-lg border ${selectedTopics.includes(topic)
                  ? 'bg-indigo-600 text-white'
                  : 'bg-white text-gray-700'
                  }`}
              >
                {topic}
              </button>
            ))}
          </div>
        </div>
      )}

      <div className="flex justify-center gap-4 mt-6">
        <button
          onClick={analyzeSubject}
          disabled={!subject || loading}
          className={`px-8 py-3 text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 disabled:opacity-50 ${loading ? 'animate-pulse' : ''
            }`}
        >
          {loading ? 'Analyzing...' : 'Analyze Subject'}
        </button>

        {existingExam && (
          <button
            onClick={() => navigate(`/exams/${existingExam.id}`)}
            className="px-8 py-3 text-indigo-600 border border-indigo-600 rounded-lg hover:bg-indigo-50"
          >
            View Exam Details
          </button>
        )}
      </div>

      {analysis && (
        <div className="mt-8 border rounded-lg p-6 shadow-sm bg-gray-50">
          <h3 className="text-xl font-semibold mb-2">Analysis Summary</h3>
          <p className="mb-2">{analysis.analysis}</p>

          <h4 className="font-semibold mt-4">Strengths</h4>
          <ul className="list-disc list-inside">
            {analysis.strengths.map((item, i) => (
              <li key={i}>{item}</li>
            ))}
          </ul>

          <h4 className="font-semibold mt-4">Weaknesses</h4>
          <ul className="list-disc list-inside">
            {analysis.weaknesses.map((item, i) => (
              <li key={i}>{item}</li>
            ))}
          </ul>

          <h4 className="font-semibold mt-4">Recommendations</h4>
          <ul className="list-disc list-inside">
            {analysis.recommendations.map((item, i) => (
              <li key={i}>{item}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default SubjectDifficultyPage;
