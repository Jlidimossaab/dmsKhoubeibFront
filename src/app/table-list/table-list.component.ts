import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DeleteUserComponent } from 'app/delete-user/delete-user.component';
import { EditUserComponent } from 'app/edit-user/edit-user.component';
import { User } from 'models/User';
import { UserService } from 'services/user.service';

@Component({
  selector: 'app-table-list',
  templateUrl: './table-list.component.html',
  styleUrls: ['./table-list.component.css']
})
export class TableListComponent implements OnInit {

  constructor(private userService: UserService, private dialog: MatDialog) { }

  users: User[] = [];
  displayedColumns: string[] = ['id', 'fullName', 'email', 'password', 'actions'];
  ngOnInit() {
    this.findAll();
  }

  findAll(){
    this.userService.findAll().subscribe(res =>{
      this.users = res;
    });
  }
  editUser(user){

    if(user ==null){
      user = {
        'id' : null,
        'fullName' : '',
        'password' : ''
      }
    }


    const dialogRef = this.dialog.open(EditUserComponent, {
      width: '250px',
      data: user
    });

    // Handle after the dialog is closed
    dialogRef.afterClosed().subscribe((user) => {
      user = user;
    });
  }

  deleteUser(user){
    const dialogRef = this.dialog.open(DeleteUserComponent, {
      width: '250px',
      
      data: user
    });

    // Handle after the dialog is closed
    dialogRef.afterClosed().subscribe();
    this.findAll();
  }

}
