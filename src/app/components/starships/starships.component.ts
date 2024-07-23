import { Component, OnInit } from '@angular/core';
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

  constructor(private starshipService: StarshipService, private router: Router) { }

  ngOnInit(): void {
    this.starshipService.getStarships().subscribe(data => {
      this.starships = data.results;
    });
  }

  viewStarship(starship: any): void {
    const urlSegments = starship.url.split('/');
    const id = urlSegments[urlSegments.length - 2];
    this.router.navigate(['/starship', id]);
  }
}
