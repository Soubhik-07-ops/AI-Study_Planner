import { create } from 'zustand';
import { persist } from 'zustand/middleware';

import { Exam } from '@/types/study-plan';

interface StudySession {
    id: string;
    examId: string;
    date: string;
    startTime: string;
    endTime: string;
    duration: number;
    completed: boolean;
    subject: string;
}

interface StudyPlanState {
    exams: Exam[];
    sessions: StudySession[];
    plan: any[];
    addExam: (exam: Omit<Exam, 'id'>) => void;
    updateExam: (id: string, updates: Partial<Exam>) => void;
    updateExamBySubject: (subject: string, updates: Partial<Exam>) => void;
    deleteExam: (id: string) => void;
    generateSessions: () => void;
    toggleSessionCompletion: (sessionId: string) => void;
    getTodaySessions: () => StudySession[];
    getExamBySubject: (subject: string) => Exam | undefined;
    setStudyPlan: (plan: any[]) => void;
    getStudyPlan: () => any[]; // Add this getter to retrieve the stored plan
}

export const useStudyPlanStore = create<StudyPlanState>()(
    persist(
        (set, get) => ({
            exams: [],
            sessions: [],
            plan: [], // Initial state for plan

            addExam: (exam) =>
                set((state) => ({
                    exams: [...state.exams, { ...exam, id: crypto.randomUUID() }],
                })),

            updateExam: (id, updates) =>
                set((state) => ({
                    exams: state.exams.map((exam) =>
                        exam.id === id ? { ...exam, ...updates } : exam
                    ),
                })),

            updateExamBySubject: (subject, updates) =>
                set((state) => ({
                    exams: state.exams.map((exam) =>
                        exam.subject.toLowerCase() === subject.toLowerCase()
                            ? { ...exam, ...updates }
                            : exam
                    ),
                })),

            deleteExam: (id) =>
                set((state) => ({
                    exams: state.exams.filter((exam) => exam.id !== id),
                    plan: [], // Reset the plan when an exam is deleted
                    sessions: state.sessions.filter((session) => session.examId !== id), // Also remove related sessions
                })),

            generateSessions: () => {
                const { exams } = get();
                const sessions: StudySession[] = [];

                exams.forEach((exam) => {
                    for (let i = 0; i < 3; i++) {
                        sessions.push({
                            id: crypto.randomUUID(),
                            examId: exam.id,
                            date: new Date(Date.now() + i * 86400000).toISOString().split('T')[0],
                            startTime: '09:00',
                            endTime: '11:00',
                            duration: 2,
                            completed: false,
                            subject: exam.subject,
                        });
                    }
                });

                set({ sessions });
            },

            toggleSessionCompletion: (sessionId) =>
                set((state) => ({
                    sessions: state.sessions.map((session) =>
                        session.id === sessionId
                            ? { ...session, completed: !session.completed }
                            : session
                    ),
                })),

            getTodaySessions: () => {
                const today = new Date().toISOString().split('T')[0];
                return get().sessions.filter((session) => session.date === today);
            },

            getExamBySubject: (subject) => {
                return get().exams.find(
                    (exam) => exam.subject.toLowerCase() === subject.toLowerCase()
                );
            },

            setStudyPlan: (plan) => set({ plan }), // Store the plan

            getStudyPlan: () => get().plan, // Retrieve the stored plan
        }),
        {
            name: 'study-plan-storage', // Store this in localStorage with the key 'study-plan-storage'
            partialize: (state) => ({ exams: state.exams, plan: state.plan }), // Persist only exams and plan
        }
    )
);
