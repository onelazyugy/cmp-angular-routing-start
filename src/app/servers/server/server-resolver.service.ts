import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { ServersService } from '../servers.service';
import { Injectable } from '@angular/core';

interface Server {
    id: number;
    name: string;
    status: string;
}

// this service allow you to pass dynamic data when you navigate to a route
// in this case, '/servers/:id' uses this with 'resolve' property defined
// { path: ':id', component: ServerComponent, resolve: {server: ServerResolver}}
// angular will run this service everytime any route that define a 'resolve' property
@Injectable()
export class ServerResolver implements Resolve<Server> {
    constructor(private serversService: ServersService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Server> | Promise<Server> | Server {
        return this.serversService.getServer(+route.params['id']);
    }
}
