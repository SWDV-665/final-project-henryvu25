import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Subject } from 'rxjs';
import { Character } from "./tab1/character"
import { Plot } from "./tab2/plot"
import { Place } from "./tab3/place"


@Injectable({
  providedIn: 'root'
})
export class StoriesService {


  characters = []

  plots = []

  places = []

  dataChanged$: Observable<boolean>;

  private dataChangedSubject: Subject<boolean>;

  baseUrl = "http://localhost:8080";

  constructor(public http: HttpClient) {
    console.log("hello starting...");

    this.dataChangedSubject = new Subject<boolean>();
 
    this.dataChanged$ = this.dataChangedSubject.asObservable();
  }

  //The CRUD methods below use httpClient to send requests to server


  //character operations
  // addCharacter(character){
  //   this.characters.push(character)
  // }
  // editCharacter(character, index){
  //   this.characters[index] = character
  // }
  // removeCharacter(index){
  //   this.characters.splice(index, 1)
  // }
  getCharacters() {
    console.log("getCharacters")
    return this.http.get(this.baseUrl + '/api/characters')
  }
  addCharacter(character) {
    console.log("adding " + character.name)
    return this.http.post(this.baseUrl + '/api/characters/', character).subscribe((res: Character[]) => {
      this.characters = res;
      this.dataChangedSubject.next(true);
    });
  }
  editCharacter(character, id) {
    console.log("editing...")
    return this.http.put(this.baseUrl + '/api/characters/' + id, character).subscribe((res: Character[]) => {
      this.characters = res;
      this.dataChangedSubject.next(true);
    });
  }
  removeCharacter(id) {
    console.log("deleting..")
    return this.http.delete(this.baseUrl + '/api/characters/' + id).subscribe((res: Character[]) => {
      this.characters = res;
      this.dataChangedSubject.next(true);
    });
  }


  //plot operations
  // addPlot(plot){
  //   this.plots.push(plot)
  // }
  // editPlot(plot, index){
  //   this.plots[index] = plot
  // }
  // removePlot(index){
  //   this.plots.splice(index, 1)
  // }
  getPlots() {
    console.log("getPlots")
    return this.http.get(this.baseUrl + '/api/plots')
  }
  addPlot(plot) {
    console.log("adding " + plot.sceneName)
    return this.http.post(this.baseUrl + '/api/plots/', plot).subscribe((res: Plot[]) => {
      this.plots = res;
      this.dataChangedSubject.next(true);
    });
  }
  editPlot(plot, id) {
    console.log("editing...")
    return this.http.put(this.baseUrl + '/api/plots/' + id, plot).subscribe((res: Plot[]) => {
      this.plots = res;
      this.dataChangedSubject.next(true);
    });
  }
  removePlot(id) {
    console.log("deleting..")
    return this.http.delete(this.baseUrl + '/api/plots/' + id).subscribe((res: Plot[]) => {
      this.plots = res;
      this.dataChangedSubject.next(true);
    });
  }

  //place operations
  // addPlace(place){
  //   this.places.push(place)
  // }
  // editPlace(place, index){
  //   this.places[index] = place
  // }
  // removePlace(index){
  //   this.places.splice(index, 1)
  // }
  getPlaces() {
    console.log("getPlaces")
    return this.http.get(this.baseUrl + '/api/places')
  }
  addPlace(place) {
    console.log("adding " + place.name)
    return this.http.post(this.baseUrl + '/api/places/', place).subscribe((res: Place[]) => {
      this.places = res;
      this.dataChangedSubject.next(true);
    });
  }
  editPlace(place, id) {
    console.log("editing...")
    return this.http.put(this.baseUrl + '/api/places/' + id, place).subscribe((res: Place[]) => {
      this.places = res;
      this.dataChangedSubject.next(true);
    });
  }
  removePlace(id) {
    console.log("deleting..")
    return this.http.delete(this.baseUrl + '/api/places/' + id).subscribe((res: Place[]) => {
      this.places = res;
      this.dataChangedSubject.next(true);
    });
  }
}
