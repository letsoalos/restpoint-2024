import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClientService } from '../../../core/services/client.service';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Client } from '../../../shared/models/client';
import { MatCardModule } from '@angular/material/card';
import { MatButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'app-view-client',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatButton,
    MatIcon,
    RouterLink
  ],
  templateUrl: './view-client.component.html',
  styleUrl: './view-client.component.scss'
})
export class ViewClientComponent implements OnInit {
  private clientService = inject(ClientService);
  private activatedRoute = inject(ActivatedRoute);
  client?: Client;

  ngOnInit(): void {
    this.loadClient();
  }

  loadClient() {
    const id = this.activatedRoute.snapshot.paramMap.get('id');
    if (!id) return;
    this.clientService.getClient(+id).subscribe({
      next: client => this.client = client,
      error: error => console.log(error)
    })
  }

}
