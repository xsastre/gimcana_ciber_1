import { Injectable } from '@angular/core';
import { Team } from '../models/team.model';
import { StorageService } from './storage.service';

@Injectable({
  providedIn: 'root'
})
export class TeamService {
  private teams: Team[] = [];

  constructor(private storageService: StorageService) {
    this.loadTeams();
  }

  private loadTeams(): void {
    this.teams = this.storageService.getTeams();
  }

  private saveTeams(): void {
    this.storageService.saveTeams(this.teams);
  }

  createTeam(name: string, members: string[]): Team {
    const team: Team = {
      id: this.generateId(),
      name,
      members,
      score: 0,
      currentQuestion: 1,
      currentLevel: 1,
      startTime: new Date(),
      questionAttempts: {},
      hintsUsed: {},
      finalChallengeCompleted: false
    };
    this.teams.push(team);
    this.saveTeams();
    return team;
  }

  getTeam(id: string): Team | undefined {
    return this.teams.find(t => t.id === id);
  }

  getAllTeams(): Team[] {
    return [...this.teams];
  }

  updateTeam(team: Team): void {
    const index = this.teams.findIndex(t => t.id === team.id);
    if (index !== -1) {
      this.teams[index] = team;
      this.saveTeams();
    }
  }

  deleteAllTeams(): void {
    this.teams = [];
    this.saveTeams();
  }

  private generateId(): string {
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
  }

  getRanking(): Team[] {
    return [...this.teams].sort((a, b) => {
      // First by score
      if (b.score !== a.score) {
        return b.score - a.score;
      }
      // Then by time (faster is better)
      const aTime = a.endTime ? a.endTime.getTime() - a.startTime.getTime() : Infinity;
      const bTime = b.endTime ? b.endTime.getTime() - b.startTime.getTime() : Infinity;
      return aTime - bTime;
    });
  }
}
