import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { GameService } from '../../services/game.service';
import { Team } from '../../models/team.model';
import { FinalChallengeAnswer } from '../../models/game-state.model';
import { FINAL_CHALLENGE_CASE } from '../../data/questions.data';

@Component({
  selector: 'app-final-challenge',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatButtonModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatSnackBarModule
  ],
  templateUrl: './final-challenge.component.html',
  styleUrl: './final-challenge.component.scss'
})
export class FinalChallengeComponent implements OnInit {
  currentTeam: Team | null = null;
  caseData = FINAL_CHALLENGE_CASE;
  showResult = false;
  scoreEarned = 0;

  answers: FinalChallengeAnswer = {
    penalRisks: '',
    violatedNorms: '',
    immediateMeasures: '',
    sgcpStructure: '',
    responsibilityAnalysis: ''
  };

  constructor(
    private gameService: GameService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.currentTeam = this.gameService.getCurrentTeam();
    
    if (!this.currentTeam) {
      this.router.navigate(['/']);
      return;
    }

    // Check if already completed
    if (this.currentTeam.finalChallengeCompleted) {
      this.router.navigate(['/ranking']);
    }
  }

  submitChallenge(): void {
    // Validate answers
    if (!this.answers.penalRisks.trim() || !this.answers.violatedNorms.trim() ||
        !this.answers.immediateMeasures.trim() || !this.answers.sgcpStructure.trim() ||
        !this.answers.responsibilityAnalysis.trim()) {
      this.snackBar.open('Si us plau, respon totes les preguntes', 'Tancar', { duration: 3000 });
      return;
    }

    // Submit and get score
    this.scoreEarned = this.gameService.submitFinalChallenge(this.answers);
    this.showResult = true;
    this.currentTeam = this.gameService.getCurrentTeam();
  }

  goToRanking(): void {
    this.router.navigate(['/ranking']);
  }
}
