import { Component } from '@angular/core';
import { UserService } from 'src/app/service/user.service';
import { User } from "src/app/model/user";
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { UserFormComponent } from 'src/app/user-form/user-form.component';

@Component({
  selector: 'app-lista-usuarios',
  templateUrl: './lista-usuarios.component.html',
  styleUrls: ['./lista-usuarios.component.scss']
})
export class ListaUsuariosComponent {
  ListaUsuarios: User[] = [];
  userList!: MatTableDataSource<User>;

  columnsHeader = ["date", "name", "username", "lastname", "email", "phone", "role", "opciones"];

  constructor(private userService: UserService,
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.getUsers();
  }

  userListMethod() {
    try {
      this.userService.getUsers()
        .subscribe(item => {
          const filteredItems = item.filter(i => i.status)
          this.userList = new MatTableDataSource(filteredItems);
        });
    } catch (error) {
      console.log(error)
    }
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.userList.filter = filterValue.trim();
  }

  async getUsers() {
    try {
      this.userService.getUsers()
        .subscribe(item => {
          const filteredItems = item.filter(i => i.status)
          this.userList = new MatTableDataSource(filteredItems);
        });
    } catch (error) {
      console.log(error);
    }
  }

  openDialog() {
    const dialogRef = this.dialog.open(UserFormComponent, {
      data: null,
    });

    dialogRef.afterClosed().subscribe((result: any) => {
      console.log("The dialog was closed");
      if (result) {
        this.userListMethod();
      }
    });
  }

  editDialog(element: User) {
    const dialogRef = this.dialog.open(UserFormComponent, {
      data: element,
    });

    dialogRef.afterClosed().subscribe((result: any) => {
      console.log("The dialog was closed");
      if (result) {
        this.userListMethod();
      }
    })
  }

  deleteDialog(element: User) {
    const dialogRef = this.dialog.open(UserFormComponent, {
      data: { ...element, eliminar: true },
    });

    dialogRef.afterClosed().subscribe((result: any) => {
      console.log("The dialog was closed");
      if (result) {
        this.userListMethod();
        console.log(result)
      }
    })
  }



}
