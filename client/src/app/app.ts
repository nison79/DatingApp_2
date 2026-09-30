import { Component, inject, OnInit, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';

interface Member {
  id: string;
  displayName: string;
  email: string;
}

@Component({
  selector: 'app-root',
  imports: [],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App implements OnInit {
  private http = inject(HttpClient);
  protected readonly title = signal('Dating App');
  protected members = signal<Member[]>([]);

  ngOnInit(): void {
    this.http.get<Member[]>('https://localhost:5001/api/members').subscribe({
      next: (response) => this.members.set(response),
      error: (err) => console.error(err),
      complete: () => console.log('Request complete'),
    });
  }
}
