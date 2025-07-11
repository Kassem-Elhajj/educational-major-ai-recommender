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
}
