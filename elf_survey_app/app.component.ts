import { Component } from '@angular/core';
import { Router, Event, NavigationStart, NavigationEnd, NavigationError} from '@angular/router';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  currentRoute: string;
  progressValue:number;

  constructor(private router: Router){
    this.currentRoute = "";
    this.router.events.subscribe((event: Event) => {
        if (event instanceof NavigationStart) {
            // Show loading indicator
            console.log('Route change detected');
        }

        if (event instanceof NavigationEnd) {
            // Hide loading indicator
            this.currentRoute = event.url;
              console.log(event);
              if (this.currentRoute == '/') {
                this.progressValue = 0;
              } else if (this.currentRoute == '/select') {
                this.progressValue = 30;
              } else if ( this.currentRoute == '/SMC') {
                this.progressValue = 60;
              } else if (this.currentRoute == '/KUMC') {
                this.progressValue = 60;
              } else if (this.currentRoute == '/survey') {
                this.progressValue = 90;
              }

        }

        if (event instanceof NavigationError) {
            // Hide loading indicator

            // Present error to user
            console.log(event.error);
        }
    });

  }



}
