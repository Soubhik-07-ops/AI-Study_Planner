import { Clock, BookOpen, Trash, CalendarDays } from 'lucide-react';
import { Exam } from '@/types/study-plan';
import { calculateDaysRemaining } from '../../utils/date-utils';

interface ExamCountdownProps {
  exam: Exam;
  onViewDetails?: () => void;
  onDelete?: () => void;
}

const ExamCountdown = ({ exam, onViewDetails, onDelete }: ExamCountdownProps) => {
  const daysRemaining = calculateDaysRemaining(exam.date);

  const badgeColor =
    daysRemaining <= 7
      ? 'bg-red-100 text-red-700 border-red-200'
      : daysRemaining <= 14
        ? 'bg-amber-100 text-amber-700 border-amber-200'
        : 'bg-green-100 text-green-700 border-green-200';

  return (
    <div
      onClick={onViewDetails}
      className="group border rounded-2xl p-5 shadow-sm hover:shadow-lg transition-shadow bg-white cursor-pointer relative overflow-hidden"
    >
      {/* Top row: Subject and Date */}
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="font-semibold text-xl text-gray-900 tracking-tight">{exam.subject}</h3>
          <div className="flex items-center gap-1 text-sm text-gray-500 mt-1">
            <CalendarDays className="h-4 w-4" />
            <span>{new Date(exam.date).toLocaleDateString()}</span>
          </div>
        </div>
        <span
          className={`flex items-center gap-1 px-3 py-1 rounded-full border text-xs font-medium ${badgeColor}`}
        >
          ⏳ {daysRemaining} {daysRemaining === 1 ? 'day' : 'days'} left
        </span>
      </div>

      {/* Details section */}
      <div className="flex items-center justify-between text-sm text-gray-600">
        <div className="flex items-center gap-2">
          <BookOpen className="h-4 w-4 text-indigo-500" />
          <span className="font-medium">Difficulty:</span>
          <span className="capitalize">{exam.difficulty}</span>
        </div>
        <div className="flex items-center gap-2">
          <Clock className="h-4 w-4 text-indigo-500" />
          <span>{exam.preferredStudyTime || 'Anytime'}</span>
        </div>
      </div>

      {/* Delete Button */}
      {onDelete && (
        <button
          onClick={(e) => {
            e.stopPropagation(); // prevent triggering onViewDetails
            onDelete();
          }}
          className="absolute top-3 right-3 text-red-500 hover:text-red-700 transition-opacity opacity-0 group-hover:opacity-100"
          title="Delete Exam"
        >
          <Trash className="h-5 w-5" />
        </button>
      )}
    </div>
  );
};

export default ExamCountdown;
