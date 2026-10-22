import { Routes } from '@angular/router';

import { DashboardComponent } from '../../dashboard/dashboard.component';
import { TableListComponent } from '../../table-list/table-list.component';
import { TypographyComponent } from '../../typography/typography.component';
import { NotificationsComponent } from '../../notifications/notifications.component';
import { UpgradeComponent } from '../../upgrade/upgrade.component';
import { LoginComponent } from 'app/login/login.component';
import { AuthGuard } from '../../auth.guard'; // Import the AuthGuard

export const AdminLayoutRoutes: Routes = [
    { path: 'login', component: LoginComponent },
    { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] }, // Protect the Dashboard route
    { path: 'table-list', component: TableListComponent, canActivate: [AuthGuard] }, // Protect Table List route
    { path: 'typography', component: TypographyComponent, canActivate: [AuthGuard] }, // Protect Typography route
    { path: 'notifications', component: NotificationsComponent, canActivate: [AuthGuard] }, // Protect Notifications route
    { path: 'upgrade', component: UpgradeComponent, canActivate: [AuthGuard] }, // Protect Upgrade route
];
