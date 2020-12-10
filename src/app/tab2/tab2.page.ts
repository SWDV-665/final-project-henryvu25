import { Component } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { StoriesService } from '../stories.service'
import { SocialSharing } from '@ionic-native/social-sharing/ngx';
import { Plot } from "./plot"

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {

  public plots: Plot[] = [];

  constructor(public alertController: AlertController, public dataService: StoriesService, public socialSharing: SocialSharing) {
    this.loadPlots();
    this.dataService.dataChanged$.subscribe((dataChanged: boolean) => {
      this.loadPlots();})
  }

  //calls getPlots() from our dataService and then stores in our plots array
  loadPlots(){
    console.log("load")
    this.dataService.getPlots().subscribe(
      (res: Plot[]) => this.plots = res
    );
  }

  shareIdea(plot){

    let subject = "Check out my story idea!"

    let message = "Story Title: " + plot.title + "\nScene Name: " + plot.sceneName + "\nStory Element: " + plot.element + "\nDescription: " + plot.description;

    console.log("Shared: ",subject,message)
    
    this.socialSharing.share(subject, message).then(() => {
      // Success!
      console.log("Shared: ",subject,message)
    }).catch((err) => {
      console.error(err.message)
    });
  }

  async addPlotPrompt() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Add Plot',
      inputs: [
        {
          name: 'title',
          type: 'text',
          placeholder: 'Story title plot belongs to'
        },
        {
          name: 'element',
          type: 'text',
          placeholder: 'Exposition, Rising Action, Climax, Falling Action, Resolution'
        },
        {
          name: 'sceneName',
          type: 'text',
          placeholder: 'Scene Name'
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
          handler: plot => {
            console.log('Confirm Add');
            this.dataService.addPlot(plot)
          }
        }
      ]
    });

    await alert.present();
  }

  async editPlotPrompt(plot, index) {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Edit Plot',
      inputs: [
        {
          name: 'title',
          type: 'text',
          value: plot.title
        },
        {
          name: 'element',
          type: 'text',
          value: plot.element
        },
        {
          name: 'sceneName',
          type: 'text',
          value: plot.sceneName
        },
        // multiline input.
        {
          name: 'description',
          type: 'textarea',
          value: plot.description
        }
      ],
      buttons: [
        {
          text: 'Save Changes',
          handler: update => {
            console.log('Confirm Add');
            this.dataService.editPlot(update, plot._id)
          }
        },
        {
          text: 'Delete',
          handler: () => {
            this.dataService.removePlot(plot._id)
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