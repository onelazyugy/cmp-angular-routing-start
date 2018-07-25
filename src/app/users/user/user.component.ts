import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Subscription } from 'rxjs'; // reactive extension using Observables

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit, OnDestroy {
  user: {id: number, name: string};
  paramsSubscription: Subscription;

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    // snapshot will only run the first time when the route open such as
    // /users/1/max
    this.user = {
      id: this.route.snapshot.params['id'],
      name: this.route.snapshot.params['name']
    };
    // you are currently on /users/1/max and on that same page, you click on a link
    // that will go to /users/3/anna, the below code will update the page
    // to show the new user
    this.paramsSubscription = this.route.params.subscribe((params: Params) => {
     this.user.id = params['id'],
     this.user.name = params['name'];
    });
  }

  // you don't have to do this, angular does it for you behind the scene
  ngOnDestroy() {
    this.paramsSubscription.unsubscribe();
  }
}
