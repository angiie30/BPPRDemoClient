import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Response } from 'src/app/shared/response.model';
import { User } from '../user.model';
import { UserService } from '../user.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {
    public term: string = "";
    public loading: boolean = true;
    public userList: User[] = [];
    public response: Response<User[]> = new Response<User[]>(this.userList);

    constructor(public userService: UserService, private router: Router) {}

    ngOnInit()
    {
        this.getUsers();
    }

    public async getUsers()
    {
        this.loading = true;

        try 
        {
            this.response = await this.userService.getUsers();
            this.response.data.forEach(user => {
                user.phone = user.phone.replace(/(\d{3})(\d{3})(\d{4})/, "$1-$2-$3");
            })
            this.userList = this.response.data;
            console.log(this.response);
        }
        catch(e)
        {
            console.error(e);
        }
        finally
        {
            this.loading = false;
        }
    }

    public goDetail(id: number) {
        this.router.navigate(["/users", id]);
    }

    public goForm() {
        this.router.navigate(["/users/add"]);
    }
}
