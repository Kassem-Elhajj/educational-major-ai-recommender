export interface User{
    id?: string,
    username: string,
    email?: string,
    hashed_password: string,
    createdAt?: Date
}

// types.ts
export interface SurveyData {
  grades: { [key: string]: number };
  selectedRoute: string;
  answers: string[];
  selectedMethod: string; // 'AI' or 'Rule-based'
}

export interface MajorRecommendation {
  major: string;
  reason: string;
}

export interface Result {
  id: number;
  userId: string;
  resulttxt: string;
  type: string; // 'AI' or 'Survey'
  createdAt?: Date;
  updatedAt?: Date;
}