import { Component } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { StoriesService } from '../stories.service'
import { SocialSharing } from '@ionic-native/social-sharing/ngx';
import { Character } from "./character"

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  public characters: Character[] = [];

  constructor(public alertController: AlertController, public dataService: StoriesService, public socialSharing: SocialSharing) { 
    this.loadCharacters();
    this.dataService.dataChanged$.subscribe((dataChanged: boolean) => {
      this.loadCharacters();})
  }

   //calls getCharacters() from our dataService and then stores in our characters array
   loadCharacters() {
    console.log("load")
    this.dataService.getCharacters().subscribe(
      (res: Character[]) => this.characters = res
    );
  }

  shareIdea(character){

    let subject = "Check out my story idea!"

    let message = "Story Title: " + character.title + "\nCharacter Name: " + character.name + "\nRace: " + character.race + "\nDescription: " + character.description;

    console.log("Shared: ",subject,message)

    this.socialSharing.share(subject, message).then(() => {
      // Success!
      console.log("Shared: ",subject,message)
    }).catch((err) => {
      console.error(err.message)
    });
  }

  async addCharacterPrompt() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Add Character',
      inputs: [
        {
          name: 'title',
          type: 'text',
          placeholder: 'Story title character belongs to'
        },
        {
          name: 'name',
          type: 'text',
          placeholder: 'Character name'
        },
        {
          name: 'race',
          type: 'text',
          placeholder: 'Character race'
        },
        // multiline input.
        {
          name: 'description',
          type: 'textarea',
          placeholder: 'Description'
        }
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log('Confirm Cancel');
          }
        }, {
          text: 'Add',
          handler: character => {
            console.log('Confirm Add');
            this.dataService.addCharacter(character)
          }
        }
      ]
    });

    await alert.present();
  }

  async editCharacterPrompt(character, index) {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Edit Character',
      inputs: [
        {
          name: 'title',
          type: 'text',
          value: character.title
        },
        {
          name: 'name',
          type: 'text',
          value: character.name
        },
        {
          name: 'race',
          type: 'text',
          value: character.race
        },
        // multiline input.
        {
          name: 'description',
          type: 'textarea',
          value: character.description
        }
      ],
      buttons: [
        {
          text: 'Save Changes',
          handler: update => {
            console.log('Confirm Edit');
            this.dataService.editCharacter(update, character._id)
          }
        },
        {
          text: 'Delete',
          handler: () => {
            this.dataService.removeCharacter(character._id)
          }
        },
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log('Confirm Cancel');
          }
        }
      ]
    });

    await alert.present();
  }

}
