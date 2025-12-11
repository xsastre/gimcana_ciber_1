import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  private readonly TEAMS_KEY = 'gimcana_teams';
  private readonly GAME_STATE_KEY = 'gimcana_game_state';

  constructor() { }

  // Teams management
  saveTeams(teams: any[]): void {
    localStorage.setItem(this.TEAMS_KEY, JSON.stringify(teams));
  }

  getTeams(): any[] {
    const teamsJson = localStorage.getItem(this.TEAMS_KEY);
    return teamsJson ? JSON.parse(teamsJson) : [];
  }

  // Game state management
  saveGameState(state: any): void {
    localStorage.setItem(this.GAME_STATE_KEY, JSON.stringify(state));
  }

  getGameState(): any {
    const stateJson = localStorage.getItem(this.GAME_STATE_KEY);
    return stateJson ? JSON.parse(stateJson) : { currentTeamId: null, isTeacherMode: false };
  }

  // Clear all data (for teacher mode reset)
  clearAll(): void {
    localStorage.removeItem(this.TEAMS_KEY);
    localStorage.removeItem(this.GAME_STATE_KEY);
  }
}
