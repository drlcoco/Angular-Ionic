import { Component, OnInit } from '@angular/core';
import { Character } from 'src/app/interfaces/character';
import { RickAndMortyService } from 'src/app/services/rick-and-morty.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit{

  character: Character = {
    id: 0,
    name: '',
    status: '',
    species: '',
    type: '',
    gender: '',
    image: '',
    created: ''
  }

  characters: Character[] = [];
  params = {} as any;

  constructor(private rickService: RickAndMortyService) { }

  ngOnInit() {
    this.params.page = 0;
    this.getCharacters()
  }

  getCharacters(event?:any){
    this.params.page += 1;
    this.rickService.getCharacters(this.params).subscribe({
      next: (res: any) => {
        this.characters.push(...res.results);
        console.log(res);
        if(event) event.target.complete();
      },
      error: (error: any) => {
        if(event) event.target.complete();
      }
    });
  }

  searchCharacters(){
    this.params.page = 1;
    this.rickService.getCharacters(this.params).subscribe({
      next: (res: any) => {
        this.characters = res.results;
        console.log(res);
      },
      error: (error: any) => {
      }
    });
  }

}
