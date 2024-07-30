import { Component, HostListener, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { StarshipService } from '../../services/starship.service';

@Component({
  selector: 'app-starships',
  standalone: true,
  imports: [],
  templateUrl: './starships.component.html',
  styleUrl: './starships.component.scss'
})
export class StarshipsComponent implements OnInit {
  starships: any[] = [];
  loading: boolean = false;
  currentPage: number = 1;
  lastPage: number = 4;

  constructor(private starshipService: StarshipService, private router: Router) { }

  ngOnInit(): void {
    this.loadStarships();
  }

  loadStarships(): void {
    if (this.currentPage > this.lastPage) return;

    this.loading = true;
    this.starshipService.getStarships(this.currentPage).subscribe(data => {
      this.starships = [...this.starships, ...data.results];
      this.loading = false;
      this.currentPage++;
    });
  }

  @HostListener('window:scroll', ['$event'])
  onScroll(event: Event): void {
    const pos = (document.documentElement.scrollTop || document.body.scrollTop) + window.innerHeight;
    const max = document.documentElement.scrollHeight;

    if (pos >= max - 10 && !this.loading) {
      this.loadStarships();
    }
  }

  viewStarship(starship: any): void {
    const id = this.getIdFromUrl(starship.url);
    this.router.navigate(['/starship', id]);
  }

  private getIdFromUrl(url: string): number {
    const segments = url.split('/');
    return Number(segments[segments.length - 2]);
  }
}
