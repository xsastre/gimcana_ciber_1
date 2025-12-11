import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { TeamRegistrationComponent } from './components/team-registration/team-registration.component';
import { GameComponent } from './components/game/game.component';
import { QuestionComponent } from './components/question/question.component';
import { LevelCompleteComponent } from './components/level-complete/level-complete.component';
import { FinalChallengeComponent } from './components/final-challenge/final-challenge.component';
import { RankingComponent } from './components/ranking/ranking.component';
import { TeacherModeComponent } from './components/teacher-mode/teacher-mode.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'register', component: TeamRegistrationComponent },
  { path: 'game', component: GameComponent },
  { path: 'question', component: QuestionComponent },
  { path: 'level-complete', component: LevelCompleteComponent },
  { path: 'final-challenge', component: FinalChallengeComponent },
  { path: 'ranking', component: RankingComponent },
  { path: 'teacher', component: TeacherModeComponent },
  { path: '**', redirectTo: '' }
];
