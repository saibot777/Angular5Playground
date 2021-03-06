import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import { Subscription} from 'rxjs/Subscription';
import {Coffee} from '../core/models/coffee.model';
import {GeolocationService} from '../core/services/geolocation.service';
import {TastingRating} from '../core/models/tasting-rating.model';
import {DataService} from '../core/services/data.service';

@Component({
  selector: 'app-coffee',
  templateUrl: './coffee.component.html',
  styleUrls: ['./coffee.component.css']
})
export class CoffeeComponent implements OnInit, OnDestroy {
  routingSubscription: Subscription;
  coffee: Coffee;
  tastingEnabled = false;
  types = [
    "Espresso",
    "Americano",
    "Cappucino",
    "Frappe"
  ];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private dataService: DataService,
    private geoService: GeolocationService) { }

  ngOnInit() {
    this.coffee = new Coffee();
    this.routingSubscription =
      this.route.params.subscribe(params => {
        if (params["id"]) {
          this.dataService.get(params["id"], response => {
            this.coffee = response;
            if (this.coffee.tastingRating) {
              this.tastingEnabled = true;
            }
          });
        }
      });

    this.geoService.requestLocation(location => {
      if (location) {
        this.coffee.location.latitude = location.latitude;
        this.coffee.location.longitude = location.longitude;
      }
    });
  }

  public save() {
    this.dataService.save(this.coffee, result => {
      if (result) {
        this.router.navigate(["/"]);
      }
    });
  }

  public cancel() {
    this.router.navigate(["/"]);
  }

  public tastingRatingChanged(checked: boolean) {
    if (checked) {
      this.coffee.tastingRating = new TastingRating();
    } else {
      this.coffee.tastingRating =  null;
    }
  }

    ngOnDestroy() {
    this.routingSubscription.unsubscribe();
  }

}
