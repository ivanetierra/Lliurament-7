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
  imgUrl?: string;
  notFoundUrl: string = 'https://starwars-visualguide.com/assets/img/big-placeholder.jpg';

  constructor(
    private route: ActivatedRoute,
    private starshipService: StarshipService
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.starshipService.getStarship(Number(id)).subscribe(data => {
      this.starship = data;
      this.imgUrl = this.starshipService.getStarshipImgUrl(Number(id));
    });
  }

  notFound(event: any): void {
    event.target.src = this.notFoundUrl;
  }
}
