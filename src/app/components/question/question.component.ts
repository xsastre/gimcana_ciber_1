import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatRadioModule } from '@angular/material/radio';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { GameService } from '../../services/game.service';
import { Question } from '../../models/question.model';
import { Team } from '../../models/team.model';

@Component({
  selector: 'app-hint-dialog',
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatDialogModule, MatIconModule],
  template: `
    <h2 mat-dialog-title>
      <mat-icon>lightbulb</mat-icon>
      Pista
    </h2>
    <mat-dialog-content>
      <p>{{ hint }}</p>
      <div class="warning">
        <mat-icon>warning</mat-icon>
        <span>Utilitzar la pista reduirà els punts de 100 a 50 si encertes a la primera.</span>
      </div>
    </mat-dialog-content>
    <mat-dialog-actions>
      <button mat-button mat-dialog-close>Tancar</button>
    </mat-dialog-actions>
  `,
  styles: [`
    mat-dialog-content {
      min-width: 400px;
      padding: 20px;
      
      p {
        font-size: 1.1rem;
        line-height: 1.6;
        margin-bottom: 20px;
      }
      
      .warning {
        display: flex;
        align-items: center;
        gap: 10px;
        padding: 10px;
        background-color: #fff3cd;
        border-radius: 4px;
        
        mat-icon {
          color: #856404;
        }
        
        span {
          color: #856404;
          font-size: 0.9rem;
        }
      }
    }
    
    h2 {
      display: flex;
      align-items: center;
      gap: 10px;
      
      mat-icon {
        color: #ffc107;
      }
    }
  `]
})
export class HintDialogComponent {
  hint = '';
}

@Component({
  selector: 'app-question',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    MatCardModule,
    MatIconModule,
    MatRadioModule,
    MatProgressBarModule,
    MatDialogModule,
    MatSnackBarModule
  ],
  templateUrl: './question.component.html',
  styleUrl: './question.component.scss'
})
export class QuestionComponent implements OnInit {
  currentQuestion: Question | null = null;
  currentTeam: Team | null = null;
  selectedOption: number = -1;
  showExplanation = false;
  isCorrect = false;
  pointsEarned = 0;

  constructor(
    private gameService: GameService,
    private router: Router,
    private dialog: MatDialog,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.currentTeam = this.gameService.getCurrentTeam();
    
    if (!this.currentTeam) {
      this.router.navigate(['/']);
      return;
    }

    // Check if all questions are completed
    if (this.currentTeam.currentQuestion > 9) {
      this.router.navigate(['/final-challenge']);
      return;
    }

    this.currentQuestion = this.gameService.getQuestionById(this.currentTeam.currentQuestion) || null;
  }

  get progress(): number {
    if (!this.currentTeam) return 0;
    return (this.currentTeam.currentQuestion - 1) / 9 * 100;
  }

  get hasUsedHint(): boolean {
    if (!this.currentQuestion) return false;
    return this.gameService.hasUsedHint(this.currentQuestion.id);
  }

  showHint(): void {
    if (!this.currentQuestion) return;
    
    const dialogRef = this.dialog.open(HintDialogComponent);
    const instance = dialogRef.componentInstance;
    instance.hint = this.currentQuestion.hint;
    
    this.gameService.useHint(this.currentQuestion.id);
  }

  submitAnswer(): void {
    if (this.selectedOption === -1) {
      this.snackBar.open('Si us plau, selecciona una resposta', 'Tancar', { duration: 2000 });
      return;
    }

    if (!this.currentQuestion) return;

    const result = this.gameService.answerQuestion(
      this.currentQuestion.id,
      this.selectedOption,
      this.hasUsedHint
    );

    this.isCorrect = result.correct;
    this.pointsEarned = result.points;
    this.showExplanation = true;

    // Reload team data
    this.currentTeam = this.gameService.getCurrentTeam();
  }

  continue(): void {
    if (!this.currentTeam) return;

    if (this.isCorrect) {
      // Check if level is completed
      const questionsInLevel = this.gameService.getQuestionsByLevel(this.currentTeam.currentLevel - 1);
      const isLevelComplete = questionsInLevel.length > 0 && 
        this.currentQuestion?.id === Math.max(...questionsInLevel.map(q => q.id));

      if (isLevelComplete && this.currentTeam.currentLevel <= 3) {
        this.router.navigate(['/level-complete']);
      } else if (this.currentTeam.currentQuestion > 9) {
        this.router.navigate(['/final-challenge']);
      } else {
        // Reload the component with the next question
        this.selectedOption = -1;
        this.showExplanation = false;
        this.ngOnInit();
      }
    } else {
      // Try again
      this.selectedOption = -1;
      this.showExplanation = false;
    }
  }

  exitGame(): void {
    if (confirm('Segur que vols sortir del joc? El progrés es guardarà.')) {
      this.router.navigate(['/']);
    }
  }
}
