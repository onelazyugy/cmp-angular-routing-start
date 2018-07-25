import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { UsersComponent } from './users/users.component';
import { ServersComponent } from './servers/servers.component';
import { UserComponent } from './users/user/user.component';
import { EditServerComponent } from './servers/edit-server/edit-server.component';
import { ServerComponent } from './servers/server/server.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { AuthGuard } from './auth-guard.service';
import { CanDeactivateGuard } from './servers/edit-server/can-deactivate-guard.service';
import { ErrorPageComponent } from './error-page/error-page.component';
import { ServerResolver } from './servers/server/server-resolver.service';

const appRoutes: Routes = [
    { path: '', component: HomeComponent },
    // /users route has 1 children
    // a new <router-outlet></router-outlet> is defined inside users.component.html
    { path: 'users', component: UsersComponent, children: [
      { path: ':id/:name', component: UserComponent },
    ] },
    // 2 child routes nested under /servers
    // a new <router-outlet></router-outlet> is defined inside servers.component.html
    // use AuthGuard to protect this route and its child route
    {
      path: 'servers',
      // - 'canActive' can be use if you want to protect /servers route and all its child
      // canActivate: [AuthGuard],
      // - 'canActivateChild' can be use to protect only child routes from '/servers' route and NOT protecting '/servers' route
      canActivateChild: [AuthGuard],
      component: ServersComponent,
      children: [
      // passing dynamic data to this component when calling '/servers/:id' using a resolver
      { path: ':id', component: ServerComponent, resolve: {server: ServerResolver}},
      // make sure if user accidentially leave the route, do something
      // by using 'canDeactivate'. Angular will run this 'CanDeactivateGuard' when user leave this route
      { path: ':id/edit', component: EditServerComponent, canDeactivate: [CanDeactivateGuard] }
    ] },
    // redirect route
    // { path: 'not-found', component: PageNotFoundComponent },
    { path: 'not-found', component: ErrorPageComponent, data: {message: 'Page not found!'} },
    // ** means catch all path you don't know and redirect to '/not-found' route
    // this route has to the last one
    { path: '**', redirectTo: '/not-found' }
  ];

@NgModule({
    imports: [
        // use 'useHash' to enable # (hash mode routing) in the URL for old browser
        // localhost:4200/#/users
        // the # inform the web server that the web server should only care about the part before the hash tag
        // all of the part after # will be ignore by the web server
        // RouterModule.forRoot(appRoutes, {useHash: true})

        // this give a clean URL but you have to configure your web server
        RouterModule.forRoot(appRoutes)
    ],
    exports: [RouterModule]
})
export class AppRoutingModule {

}
