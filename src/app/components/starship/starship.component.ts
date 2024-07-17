import { Component, OnInit } from '@angular/core';
import { StarshipService } from '../../services/starship.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-starship',
  standalone: true,
  imports: [],
  templateUrl: './starship.component.html',
  styleUrl: './starship.component.scss'
})
export class StarshipComponent implements OnInit {
  starship: any;

  constructor(
    private route: ActivatedRoute,
    private starshipService: StarshipService
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.starshipService.getStarship(Number(id)).subscribe(data => {
      this.starship = data;
    });
  }
}
