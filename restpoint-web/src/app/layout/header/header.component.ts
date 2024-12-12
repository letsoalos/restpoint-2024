import { Component, inject } from '@angular/core';
import { MatButton } from '@angular/material/button';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { BusyService } from '../../core/services/busy.service';
import { MatProgressBar } from '@angular/material/progress-bar';
import { AccountService } from '../../core/services/account.service';
import { MatMenu, MatMenuItem, MatMenuTrigger } from '@angular/material/menu';
import { MatDivider } from '@angular/material/divider';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    MatButton,
    RouterLink,
    RouterLinkActive,
    MatProgressBar,
    MatIcon,
    MatMenuTrigger,
    MatMenu,
    MatDivider,
    MatMenuItem
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  busyService = inject(BusyService);
  accountService = inject(AccountService);
  private router = inject(Router);

  logout() {
    this.accountService.logout().subscribe({
      next: () => {
        console.log('current user', this.accountService.currentUser);
        this.accountService.currentUser.set(null);
        this.router.navigateByUrl('/');
      }
    })
  }

}
