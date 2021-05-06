import { Component, OnInit } from '@angular/core';
import { Response } from 'src/app/shared/response.model';
import { User } from '../user.model';
import { UserService } from '../user.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {
    public loading: boolean = true;
    public userList: User[] = [];
    public response: Response<User[]> = new Response<User[]>(this.userList);

    constructor(public userService: UserService) {}

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
}
