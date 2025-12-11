import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Team } from '../models/team.model';
import { Question } from '../models/question.model';
import { GameState, FinalChallengeAnswer } from '../models/game-state.model';
import { TeamService } from './team.service';
import { StorageService } from './storage.service';
import { QUESTIONS } from '../data/questions.data';

@Injectable({
  providedIn: 'root'
})
export class GameService {
  private gameState: GameState;
  private currentTeamSubject = new BehaviorSubject<Team | null>(null);
  public currentTeam$ = this.currentTeamSubject.asObservable();

  constructor(
    private teamService: TeamService,
    private storageService: StorageService
  ) {
    this.gameState = this.storageService.getGameState();
    if (this.gameState.currentTeamId) {
      const team = this.teamService.getTeam(this.gameState.currentTeamId);
      if (team) {
        this.currentTeamSubject.next(team);
      }
    }
  }

  setCurrentTeam(teamId: string): void {
    const team = this.teamService.getTeam(teamId);
    if (team) {
      this.gameState.currentTeamId = teamId;
      this.storageService.saveGameState(this.gameState);
      this.currentTeamSubject.next(team);
    }
  }

  getCurrentTeam(): Team | null {
    return this.currentTeamSubject.value;
  }

  getQuestions(): Question[] {
    return QUESTIONS;
  }

  getQuestionById(id: number): Question | undefined {
    return QUESTIONS.find(q => q.id === id);
  }

  getQuestionsByLevel(level: number): Question[] {
    return QUESTIONS.filter(q => q.level === level);
  }

  answerQuestion(questionId: number, selectedOptionIndex: number, usedHint: boolean): { correct: boolean; points: number } {
    const team = this.getCurrentTeam();
    if (!team) {
      return { correct: false, points: 0 };
    }

    const question = this.getQuestionById(questionId);
    if (!question) {
      return { correct: false, points: 0 };
    }

    // Track attempt
    if (!team.questionAttempts[questionId]) {
      team.questionAttempts[questionId] = 0;
    }
    team.questionAttempts[questionId]++;

    const isCorrect = question.options[selectedOptionIndex].isCorrect;
    let points = 0;

    if (isCorrect) {
      // First attempt without hint: 100 points
      // First attempt with hint: 50 points
      if (team.questionAttempts[questionId] === 1) {
        points = usedHint ? 50 : 100;
      }
      
      // Move to next question
      team.currentQuestion++;
      
      // Check if level is complete
      const currentLevelQuestions = this.getQuestionsByLevel(team.currentLevel);
      const lastQuestionInLevel = Math.max(...currentLevelQuestions.map(q => q.id));
      
      if (questionId === lastQuestionInLevel && team.currentLevel < 3) {
        team.currentLevel++;
      }
    }

    team.score += points;
    this.teamService.updateTeam(team);
    this.currentTeamSubject.next(team);

    return { correct: isCorrect, points };
  }

  useHint(questionId: number): void {
    const team = this.getCurrentTeam();
    if (team) {
      team.hintsUsed[questionId] = true;
      this.teamService.updateTeam(team);
      this.currentTeamSubject.next(team);
    }
  }

  hasUsedHint(questionId: number): boolean {
    const team = this.getCurrentTeam();
    return team ? (team.hintsUsed[questionId] || false) : false;
  }

  submitFinalChallenge(answers: FinalChallengeAnswer): number {
    const team = this.getCurrentTeam();
    if (!team) {
      return 0;
    }

    // Score the final challenge (simple scoring based on answer length and completeness)
    let score = 0;
    
    // Each field worth up to 20 points
    if (answers.penalRisks.length > 100) score += 20;
    else if (answers.penalRisks.length > 50) score += 10;
    
    if (answers.violatedNorms.length > 100) score += 20;
    else if (answers.violatedNorms.length > 50) score += 10;
    
    if (answers.immediateMeasures.length > 100) score += 20;
    else if (answers.immediateMeasures.length > 50) score += 10;
    
    if (answers.sgcpStructure.length > 100) score += 20;
    else if (answers.sgcpStructure.length > 50) score += 10;
    
    if (answers.responsibilityAnalysis.length > 100) score += 20;
    else if (answers.responsibilityAnalysis.length > 50) score += 10;

    team.finalChallengeCompleted = true;
    team.finalChallengeScore = score;
    team.score += score;
    team.endTime = new Date();

    this.teamService.updateTeam(team);
    this.currentTeamSubject.next(team);

    return score;
  }

  isGameCompleted(): boolean {
    const team = this.getCurrentTeam();
    return team ? team.finalChallengeCompleted : false;
  }

  setTeacherMode(enabled: boolean): void {
    this.gameState.isTeacherMode = enabled;
    this.storageService.saveGameState(this.gameState);
  }

  isTeacherMode(): boolean {
    return this.gameState.isTeacherMode;
  }

  resetGame(): void {
    this.teamService.deleteAllTeams();
    this.storageService.clearAll();
    this.gameState = { currentTeamId: null, isTeacherMode: false };
    this.currentTeamSubject.next(null);
  }

  logout(): void {
    this.gameState.currentTeamId = null;
    this.gameState.isTeacherMode = false;
    this.storageService.saveGameState(this.gameState);
    this.currentTeamSubject.next(null);
  }
}
