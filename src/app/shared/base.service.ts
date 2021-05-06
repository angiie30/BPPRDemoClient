import { Inject, Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment } from '../../environments/environment';
// Models
import { IResponse } from "./response.model";

@Injectable()
export class BaseService {
  private urlBase: string = environment.apiUrl;

  constructor(
    @Inject(String) private routePrefix: string,
    protected http: HttpClient
  ) {}

  protected get<T>(endpoint: string, params?: any) {
    return this.http
      .get<IResponse<T>>(`${this.urlBase}api/${this.routePrefix}${endpoint}`, {
        params: params,
      })
      .toPromise();
  }

  protected post<T>(endpoint: string, body: any) {
    return this.http
      .post<IResponse<T>>(`${this.urlBase}api/${this.routePrefix}${endpoint}`, body)
      .toPromise();
  }

  protected put<T>(endpoint: string, body: any) {
    return this.http
      .put<IResponse<T>>(`${this.urlBase}api/${this.routePrefix}${endpoint}`, body)
      .toPromise();
  }

  protected patch<T>(endpoint: string, body: any) {
    return this.http
      .patch<IResponse<T>>(`${this.urlBase}api/${this.routePrefix}${endpoint}`, body)
      .toPromise();
  }

  protected delete<T>(endpoint: string, params?: any) {
    return this.http
      .delete<IResponse<T>>(`${this.urlBase}api/${this.routePrefix}${endpoint}`, {
        params: params,
      })
      .toPromise();
  }
}
