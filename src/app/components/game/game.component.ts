import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GameService } from '../../services/game.service';

@Component({
  selector: 'app-game',
  standalone: true,
  imports: [],
  template: ''
})
export class GameComponent implements OnInit {
  constructor(
    private gameService: GameService,
    private router: Router
  ) {}

  ngOnInit(): void {
    const team = this.gameService.getCurrentTeam();
    
    if (!team) {
      this.router.navigate(['/']);
      return;
    }

    // Redirect to the appropriate component
    if (team.currentQuestion > 9) {
      this.router.navigate(['/final-challenge']);
    } else {
      this.router.navigate(['/question']);
    }
  }
}
