import { Component } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { StoriesService } from '../stories.service'
import { SocialSharing } from '@ionic-native/social-sharing/ngx';
import { Place } from "./place"

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {

  public places: Place[] = [];

  constructor(public alertController: AlertController, public dataService: StoriesService, public socialSharing: SocialSharing) {
    this.loadPlaces();
    this.dataService.dataChanged$.subscribe((dataChanged: boolean) => {
      this.loadPlaces();})
  }

   //calls getPlaces() from our dataService and then stores in our places array
   loadPlaces() {
    console.log("load")
    this.dataService.getPlaces().subscribe(
      (res: Place[]) => this.places = res
    );
  }

  shareIdea(place){

    let subject = "Check out my story idea!"

    let message = "Story Title: " + place.title + "\nPlace Name: " + place.name + "\nLocale: " + place.locale + "\nDescription: " + place.description;

    console.log("Shared: ",subject,message)
    
    this.socialSharing.share(subject, message).then(() => {
      // Success!
      console.log("Shared: ",subject,message)
    }).catch((err) => {
      console.error(err.message)
    });
  }

  async addPlacePrompt() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Add Place',
      inputs: [
        {
          name: 'title',
          type: 'text',
          placeholder: 'Story title place belongs to'
        },
        {
          name: 'locale',
          type: 'text',
          placeholder: 'Locale (city, forest, cave..)'
        },
        {
          name: 'name',
          type: 'text',
          placeholder: 'Name of place'
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
          handler: place => {
            console.log('Confirm Add');
            this.dataService.addPlace(place)
          }
        }
      ]
    });

    await alert.present();
  }

  async editPlacePrompt(place, index) {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Edit Place',
      inputs: [
        {
          name: 'title',
          type: 'text',
          value: place.title
        },
        {
          name: 'locale',
          type: 'text',
          value: place.locale
        },
        {
          name: 'name',
          type: 'text',
          value: place.name
        },
        // multiline input.
        {
          name: 'description',
          type: 'textarea',
          value: place.description
        }
      ],
      buttons: [
        {
          text: 'Save Changes',
          handler: update => {
            console.log('Confirm Add');
            this.dataService.editPlace(update, place._id)
          }
        },
        {
          text: 'Delete',
          handler: () => {
            this.dataService.removePlace(place._id)
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