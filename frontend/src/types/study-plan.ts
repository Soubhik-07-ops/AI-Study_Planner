
export interface SubjectAnalysis {
    predictedDifficulty: number;
    personalDifficulty: number;
    analysis: string;
    recommendations: string[];
    strengths: string[];
    weaknesses: string[];
}

export interface Exam {
    id: string;
    subject: string;
    date: string;
    difficulty: number | 'easy' | 'medium' | 'hard'; // both allowed
    priority?: number;
    preferredStudyTime?: string;
    analysis?: SubjectAnalysis;
    isAdded?: boolean;
}



