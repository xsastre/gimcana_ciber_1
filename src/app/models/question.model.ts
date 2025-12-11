export interface QuestionOption {
  text: string;
  isCorrect: boolean;
}

export interface Question {
  id: number;
  level: number;
  title: string;
  situation: string;
  question: string;
  options: QuestionOption[];
  hint: string;
  explanation: string;
}
