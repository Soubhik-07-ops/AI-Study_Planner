export interface Subject {
  id: string;
  name: string;
  difficulty: number;
  performance: number[];
  topics: Topic[];
}

export interface Topic {
  id: string;
  name: string;
  duration: number;
  resources: Resource[];
}

export interface Resource {
  id: string;
  title: string;
  type: 'youtube' | 'document' | 'notes';
  url: string;
  uploadedBy: string;
  hash?: string;
}

export interface StudyPlan {
  id: string;
  examId: string;
  dailyHours: number;
  schedule: StudySession[];
}

export interface StudySession {
  id: string;
  topicId: string;
  duration: number;
  type: 'study' | 'break' | 'revision';
  startTime: string;
  endTime: string;
}