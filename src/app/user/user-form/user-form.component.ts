import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Response } from 'src/app/shared/response.model';
import { User } from '../user.model';
import { UserService } from '../user.service';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss']
})
export class UserFormComponent implements OnInit {
    public loading: boolean = true;
    public errorMessage: string = "";
    public errorMessageList: string[] = [];
    public userId: number = 0;
    public user: User = new User();
    public response: Response<User> = new Response<User>(this.user);

    constructor(public userService: UserService, public route: ActivatedRoute, private router: Router) {}

    ngOnInit()
    {
        let id = this.route.snapshot.paramMap.get("id");
        this.userId = id === null ? 0 : +id;
        if(this.userId != 0) this.getUser();
        else this.loading = false;
    }

    public async getUser()
    {
        this.loading = true;

        try 
        {
            this.response = await this.userService.getUser(this.userId);
            this.user = this.response.data;
            this.user.phone = this.formatPhone();
        }
        catch(e)
        {
            console.error(e);
            this.errorMessage = e.error.title;
        }
        finally
        {
            this.loading = false;
        }
    }

    public async update()
    {
        if(!this.validFields()) return;

        this.loading = true;

        try 
        {
            this.response = await this.userService.update(this.userId, this.user.email, this.getClearPhone(), this.user.active);
            if(this.response.success) this.goBack();
        }
        catch(e)
        {
            console.error(e);
            this.errorMessage = e.error.title;
        }
        finally
        {
            this.loading = false;
        }
    }

    public async create()
    {
        if(!this.validFields()) return;

        this.user.phone = this.getClearPhone();
        
        this.loading = true;

        try 
        {
            this.response = await this.userService.create(this.user);
            if(this.response.success) this.goBack();
        }
        catch(e)
        {
            console.error(e);
            this.errorMessage = e.error.title;
        }
        finally
        {
            this.loading = false;
        }
    }

    public onKey(event: any) { 
        this.user.phone = event.target.value.replace(/[^0-9]+/g, '').replace(/(\d{3})(\d{3})(\d{4})/, "$1-$2-$3");
    }

    private validEmail(email: string) {
        const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    }

    private validFields()
    {
        let valid: boolean = true;
        this.errorMessageList = [];

        if(!this.validEmail(this.user.email)) {
            this.errorMessageList.push("Email is incorrect.");
            valid = false;
        }

        if(!this.validPhone())
        {
            this.errorMessageList.push("Phone is incorrect.");
            valid = false;
        }

        if(this.userId === 0) {
            if(this.user.firstName === "")
            {
                this.errorMessageList.push("First Name is required.");
                valid = false;
            }

            if(this.user.lastName === "")
            {
                this.errorMessageList.push("Last Name is required.");
                valid = false;
            }
        }

        if(valid) {
            this.errorMessage = "";
            this.errorMessageList = []; 
        }
        else 
        {
            this.errorMessage = 'Please check the following fields:';
        }

        return valid;
    }

    private getClearPhone()
    {
        return this.user.phone.replace(/[^0-9]+/g, '');
    }

    private formatPhone(){
        return this.user.phone.replace(/(\d{3})(\d{3})(\d{4})/, "$1-$2-$3");
    }

    private validPhone()
    {
        let number = this.getClearPhone();
        return number.length === 10;
    }

    public goBack() {
        this.router.navigate(["/users"]);
    }
}
