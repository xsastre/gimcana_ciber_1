import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';
import { MatTabsModule } from '@angular/material/tabs';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { TeamService } from '../../services/team.service';
import { GameService } from '../../services/game.service';
import { Team } from '../../models/team.model';
import { QUESTIONS } from '../../data/questions.data';

@Component({
  selector: 'app-confirm-dialog',
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatDialogModule, MatIconModule],
  template: `
    <h2 mat-dialog-title>Confirmar Reset</h2>
    <mat-dialog-content>
      <p>Estàs segur que vols esborrar TOTES les dades i reiniciar el joc?</p>
      <p><strong>Aquesta acció no es pot desfer.</strong></p>
    </mat-dialog-content>
    <mat-dialog-actions>
      <button mat-button mat-dialog-close>Cancel·lar</button>
      <button mat-raised-button color="warn" [mat-dialog-close]="true">
        <mat-icon>delete_forever</mat-icon>
        Esborrar Tot
      </button>
    </mat-dialog-actions>
  `,
  styles: [`
    mat-dialog-content {
      min-width: 400px;
      padding: 20px;
      
      p {
        font-size: 1.1rem;
        margin-bottom: 15px;
        
        strong {
          color: #d32f2f;
        }
      }
    }
    
    mat-dialog-actions {
      justify-content: flex-end;
      padding: 10px;
      gap: 10px;
    }
  `]
})
export class ConfirmDialogComponent {}

@Component({
  selector: 'app-teacher-mode',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatButtonModule,
    MatCardModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatTableModule,
    MatTabsModule,
    MatExpansionModule,
    MatSnackBarModule,
    MatDialogModule
  ],
  templateUrl: './teacher-mode.component.html',
  styleUrl: './teacher-mode.component.scss'
})
export class TeacherModeComponent implements OnInit {
  isAuthenticated = false;
  password = '';
  readonly TEACHER_PASSWORD = 'docent2024';
  
  teams: Team[] = [];
  questions = QUESTIONS;
  displayedColumns: string[] = ['name', 'score', 'level', 'question', 'completed'];

  constructor(
    private teamService: TeamService,
    private gameService: GameService,
    private router: Router,
    private snackBar: MatSnackBar,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    // Check if already in teacher mode
    if (this.gameService.isTeacherMode()) {
      this.isAuthenticated = true;
      this.loadTeams();
    }
  }

  login(): void {
    if (this.password === this.TEACHER_PASSWORD) {
      this.isAuthenticated = true;
      this.gameService.setTeacherMode(true);
      this.loadTeams();
      this.snackBar.open('Autenticació correcta', 'Tancar', { duration: 2000 });
    } else {
      this.snackBar.open('Contrasenya incorrecta', 'Tancar', { duration: 3000 });
    }
  }

  loadTeams(): void {
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

  getCorrectAnswer(questionId: number): string {
    const question = this.questions.find(q => q.id === questionId);
    if (!question) return '';
    
    const correctOption = question.options.find(o => o.isCorrect);
    const index = question.options.indexOf(correctOption!);
    return `${['A', 'B', 'C', 'D'][index]}) ${correctOption?.text || ''}`;
  }

  resetGame(): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent);
    
    dialogRef.afterClosed().subscribe(result => {
      if (result === true) {
        this.gameService.resetGame();
        this.loadTeams();
        this.snackBar.open('Joc reiniciat correctament', 'Tancar', { duration: 2000 });
      }
    });
  }

  logout(): void {
    this.gameService.setTeacherMode(false);
    this.router.navigate(['/']);
  }

  goHome(): void {
    this.router.navigate(['/']);
  }
}
