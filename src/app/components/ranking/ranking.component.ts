import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { TeamService } from '../../services/team.service';
import { GameService } from '../../services/game.service';
import { Team } from '../../models/team.model';

@Component({
  selector: 'app-ranking',
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatCardModule, MatIconModule, MatTableModule],
  templateUrl: './ranking.component.html',
  styleUrl: './ranking.component.scss'
})
export class RankingComponent implements OnInit {
  teams: Team[] = [];
  currentTeam: Team | null = null;
  displayedColumns: string[] = ['position', 'name', 'score', 'questions', 'time'];

  constructor(
    private teamService: TeamService,
    private gameService: GameService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.currentTeam = this.gameService.getCurrentTeam();
    this.loadRanking();
  }

  loadRanking(): void {
    this.teams = this.teamService.getRanking();
  }

  getTimeTaken(team: Team): string {
    if (!team.endTime) {
      return 'En progrés';
    }

    const start = new Date(team.startTime).getTime();
    const end = new Date(team.endTime).getTime();
    const diffMs = end - start;
    
    const minutes = Math.floor(diffMs / 60000);
    const seconds = Math.floor((diffMs % 60000) / 1000);
    
    return `${minutes}m ${seconds}s`;
  }

  getMedalIcon(position: number): string {
    switch (position) {
      case 1: return 'looks_one';
      case 2: return 'looks_two';
      case 3: return 'looks_3';
      default: return '';
    }
  }

  getMedalClass(position: number): string {
    switch (position) {
      case 1: return 'gold';
      case 2: return 'silver';
      case 3: return 'bronze';
      default: return '';
    }
  }

  isCurrentTeam(team: Team): boolean {
    return this.currentTeam?.id === team.id;
  }

  goHome(): void {
    this.router.navigate(['/']);
  }

  continueGame(): void {
    if (this.currentTeam) {
      if (this.currentTeam.finalChallengeCompleted) {
        // Game is complete, stay on ranking
        return;
      } else if (this.currentTeam.currentQuestion > 9) {
        this.router.navigate(['/final-challenge']);
      } else {
        this.router.navigate(['/game']);
      }
    }
  }
}
