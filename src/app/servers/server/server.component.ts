import { Component, OnInit } from '@angular/core';
import { ServersService } from '../servers.service';
import { ActivatedRoute, Params, Router, Data } from '@angular/router';

@Component({
  selector: 'app-server',
  templateUrl: './server.component.html',
  styleUrls: ['./server.component.css']
})
export class ServerComponent implements OnInit {
  server: {id: number, name: string, status: string};

  constructor(private serversService: ServersService,
              private route: ActivatedRoute,
              private router: Router) { }

  ngOnInit() {
    // *** get data using a resolver ***
    this.route.data.subscribe((data: Data) => {
      // 'server' property comes from the resolve object in the app-routing.module.ts
      // { path: ':id', component: ServerComponent, resolve: {server: ServerResolver}}
      this.server = data['server'];
    });

    // *** get data using route.snapshot.params ***
    // const id = +this.route.snapshot.params['id']; // + is use convert string to number for id
    // this.server = this.serversService.getServer(id);

    // this.route.params.subscribe((params: Params) => {
    //   this.server = this.serversService.getServer(+params['id']);
    // });
  }

  onEdit() {
    const id = +this.server.id;
    // below (commented code) is absolute path is one way to achieve this
    // this.router.navigate(['/servers', id, 'edit']);


    // below is relative path, which is elegant another way to achieve this
    // queryParamsHandling:
    // 'merge' - merge any new queryParams with old queryParams
    // ex: current route '/servers/1?allowEdit=0#loading'
    // and we want to go to '/servers/1/edit?allowEdit=0&name=viet
    // '/servers/1/edit?allowEdit=0&name=viet then use the code below by uncomment it out
    // this.router.navigate(['edit'], {relativeTo: this.route, queryParamsHandling: 'merge'});

    // 'preserve' - drop any new queryParams and keep the old queryParams
    // ex: current route '/servers/1?allowEdit=0#loading'
    // and we want to go to '/servers/1/edit' but still keep our queryParams like
    // '/servers/1/edit?allowEdit=0' then use the code below using 'preserve'
    this.router.navigate(['edit'], {relativeTo: this.route, queryParamsHandling: 'preserve'});
  }
}
