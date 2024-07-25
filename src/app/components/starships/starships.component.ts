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

  constructor(private starshipService: StarshipService, private router: Router) { }

  ngOnInit(): void {
    this.loading = true;
    this.starshipService.getStarships(1).subscribe(data => {
      this.starships = data.results;
      this.loading = false;
    });
  }

  loadMoreStarships() {
    if (this.loading) return;
    this.loading = true;
    this.starshipService.getNextPage().subscribe(data => {
      this.starships = [...this.starships, ...data.results];
      this.loading = false;
    });
  }

  @HostListener('window:scroll', ['$event'])
  onScroll(event: Event) {
    const pos = (document.documentElement.scrollTop || document.body.scrollTop) + window.innerHeight;
    const max = document.documentElement.scrollHeight;

    if (pos >= max - 10) {
      this.loadMoreStarships();
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
