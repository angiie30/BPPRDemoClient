import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BaseService } from "../shared/base.service";
import { Response } from "../shared/response.model";
import { User } from "./user.model";

@Injectable()
export class UserService extends BaseService {

    constructor(protected http: HttpClient) {
      super("Users", http);
    }
  
    getUsers(): Promise<Response<User[]>> {
      return this.get<User[]>( "/");
    }
}
