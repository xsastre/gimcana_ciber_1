import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { TeamService } from '../../services/team.service';
import { GameService } from '../../services/game.service';

@Component({
  selector: 'app-team-registration',
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
  templateUrl: './team-registration.component.html',
  styleUrl: './team-registration.component.scss'
})
export class TeamRegistrationComponent {
  teamName = '';
  members: string[] = ['', '', '', ''];

  constructor(
    private teamService: TeamService,
    private gameService: GameService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {}

  // Forçar que el camp perdi el focus després de cada lletra
  onKeyUp(event: KeyboardEvent): void {
    const target = event.target as HTMLInputElement;
    if (target) {
      target.blur();
    }
  }

  onSubmit(): void {
    // Validate team name
    if (!this.teamName.trim()) {
      this.snackBar.open('El nom de l\'equip és obligatori', 'Tancar', { duration: 3000 });
      return;
    }

    // Validate members (at least 3)
    const validMembers = this.members.filter(m => m.trim().length > 0);
    if (validMembers.length < 3) {
      this.snackBar.open('L\'equip ha de tenir entre 3 i 4 membres', 'Tancar', { duration: 3000 });
      return;
    }

    // Create team
    const team = this.teamService.createTeam(this.teamName.trim(), validMembers);
    this.gameService.setCurrentTeam(team.id);

    this.snackBar.open('Equip registrat amb èxit!', 'Tancar', { duration: 2000 });
    
    // Navigate to game
    setTimeout(() => {
      this.router.navigate(['/game']);
    }, 500);
  }

  goBack(): void {
    this.router.navigate(['/']);
  }
}
