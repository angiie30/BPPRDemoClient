import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BaseService } from '../shared/base.service';
import { Response } from '../shared/response.model';
import { User } from './user.model';

@Injectable()
export class UserService extends BaseService {
	constructor(protected http: HttpClient) {
		super('Users', http);
	}

	getUsers(): Promise<Response<User[]>> {
		return this.get<User[]>('/');
	}

	getUser(id: number): Promise<Response<User>> {
		return this.get<User>(`/${id}`, {});
	}

	update(id: number, email: string, phone: string, active: boolean): Promise<Response<User>> {
		return this.patch<User>(`/${id}`, { Email: email, Phone: phone, Active: active });
	}

	create(user: User): Promise<Response<User>> {
		return this.post<User>(`/`, user);
	}
}
