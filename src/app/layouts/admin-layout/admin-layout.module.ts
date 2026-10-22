import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AdminLayoutRoutes } from './admin-layout.routing';
import { DashboardComponent } from '../../dashboard/dashboard.component';
import { TableListComponent } from '../../table-list/table-list.component';
import { TypographyComponent } from '../../typography/typography.component';

import { NotificationsComponent } from '../../notifications/notifications.component';
import { UpgradeComponent } from '../../upgrade/upgrade.component';
import {MatButtonModule} from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';
import {MatRippleModule} from '@angular/material/core';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatSelectModule} from '@angular/material/select';
import { TreeDocsComponent } from 'app/tree-docs/tree-docs.component';
import { LoginComponent } from 'app/login/login.component';
import { PasswordDialogComponent } from 'app/password-dialog/password-dialog.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatTableModule } from '@angular/material/table';
import { EditUserComponent } from 'app/edit-user/edit-user.component';
import { DeleteUserComponent } from 'app/delete-user/delete-user.component';
import { MatIconModule } from '@angular/material/icon';


@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(AdminLayoutRoutes),
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatRippleModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    MatTooltipModule,
    MatFormFieldModule,
    MatInputModule,
    MatDialogModule,
    MatTableModule,
    MatIconModule,
    ReactiveFormsModule
  ],
  declarations: [
    PasswordDialogComponent,
    EditUserComponent,
    DeleteUserComponent,
    LoginComponent,
    TreeDocsComponent,
    DashboardComponent,
    TableListComponent,
    TypographyComponent,
    NotificationsComponent,
    UpgradeComponent,
  ],
  entryComponents: [PasswordDialogComponent] 
})

export class AdminLayoutModule {}
