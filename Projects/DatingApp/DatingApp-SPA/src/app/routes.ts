import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ListsComponent } from './lists/lists.component';
import { MemberDetailedComponent } from './members/member-detailed/member-detailed.component';
import { MemberListComponent } from './members/member-list/member-list.component';
import { MessagesComponent } from './messages/messages.component';
import { AuthGuard } from './_guards/auth.guard';

export const appRoutes: Routes = [
{ path: '', component: HomeComponent},
{path: '',
runGuardsAndResolvers: 'always',
canActivate: [AuthGuard],
children: [
    { path: 'members', component: MemberListComponent, },
    { path: 'members/:id', component: MemberDetailedComponent, },
    { path: 'messages', component: MessagesComponent},
    { path: 'lists', component: ListsComponent}]
},
{ path: '**', redirectTo: '', pathMatch: 'full'}
];
