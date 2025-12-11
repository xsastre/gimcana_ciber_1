export interface Team {
  id: string;
  name: string;
  members: string[];
  score: number;
  currentQuestion: number;
  currentLevel: number;
  startTime: Date;
  endTime?: Date;
  questionAttempts: { [questionId: number]: number };
  hintsUsed: { [questionId: number]: boolean };
  finalChallengeCompleted: boolean;
  finalChallengeScore?: number;
}
