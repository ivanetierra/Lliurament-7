import { Component, OnInit } from '@angular/core';
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

  constructor(private StarshipService: StarshipService) {}

  ngOnInit(): void {
    this.StarshipService.getStarships().subscribe((data: any) => {
      this.starships = data.results;
    });
  }
}
