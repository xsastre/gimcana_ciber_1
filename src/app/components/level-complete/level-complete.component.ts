import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { GameService } from '../../services/game.service';
import { Team } from '../../models/team.model';

@Component({
  selector: 'app-level-complete',
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatCardModule, MatIconModule],
  templateUrl: './level-complete.component.html',
  styleUrl: './level-complete.component.scss'
})
export class LevelCompleteComponent implements OnInit {
  currentTeam: Team | null = null;
  completedLevel = 1;

  constructor(
    private gameService: GameService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.currentTeam = this.gameService.getCurrentTeam();
    
    if (!this.currentTeam) {
      this.router.navigate(['/']);
      return;
    }

    this.completedLevel = this.currentTeam.currentLevel - 1;
  }

  get levelTitle(): string {
    const titles = [
      'ELS FONAMENTS',
      'CASOS COMPLEXOS',
      'DILEMES REALS'
    ];
    return titles[this.completedLevel - 1] || '';
  }

  get levelDescription(): string {
    const descriptions = [
      'Has superat els conceptes bàsics de delictes informàtics i compliance penal!',
      'Excellent! Ara domines casos més complexos de RGPD i sistemes de denúncies.',
      'Impressionant! Has completat tots els nivells de la gimcana!'
    ];
    return descriptions[this.completedLevel - 1] || '';
  }

  get nextLevelTitle(): string {
    const titles = [
      'CASOS COMPLEXOS',
      'DILEMES REALS',
      'DESAFIAMENT FINAL'
    ];
    return titles[this.completedLevel - 1] || '';
  }

  continue(): void {
    if (this.currentTeam && this.currentTeam.currentQuestion > 9) {
      this.router.navigate(['/final-challenge']);
    } else {
      this.router.navigate(['/game']);
    }
  }
}
