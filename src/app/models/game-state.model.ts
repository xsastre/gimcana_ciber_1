export interface GameState {
  currentTeamId: string | null;
  isTeacherMode: boolean;
}

export interface FinalChallengeAnswer {
  penalRisks: string;
  violatedNorms: string;
  immediateMeasures: string;
  sgcpStructure: string;
  responsibilityAnalysis: string;
}
