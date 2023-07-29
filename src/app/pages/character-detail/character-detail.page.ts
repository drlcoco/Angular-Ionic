import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Character } from 'src/app/interfaces/character';
import { RickAndMortyService } from 'src/app/services/rick-and-morty.service';

@Component({
  selector: 'app-character-detail',
  templateUrl: './character-detail.page.html',
  styleUrls: ['./character-detail.page.scss'],
})
export class CharacterDetailPage implements OnInit {

  characterId: string = "";
  character!: Character;

  constructor(private activatedRoute: ActivatedRoute,
    private rickService: RickAndMortyService) {
    this.characterId = this.activatedRoute.snapshot.paramMap.get('id') as string;
    console.log(this.characterId);
   }

  ngOnInit() {
  }

  ionViewWillEnter() {
    console.log("Cada vez que entro en la página iviewwillenter");
    this.getCharacter();
  }

  getCharacter(){
    this.rickService.getCharactersById(this.characterId).subscribe({
      next: (res: any) => {
        console.log(res);
        this.character = res;
      },
      error: (error: any) => {
      }
    });
  }

}
