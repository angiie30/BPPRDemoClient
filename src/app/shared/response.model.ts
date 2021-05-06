import { typeWithParameters } from "@angular/compiler/src/render3/util";

export interface IResponse<T> {
    success: boolean;
    data: T;
    message: string;
  }
  
  export class Response<T> implements IResponse<T> {
    success: boolean = true;
    data: T;
    message: string = '';

    constructor(TCreator: { new (): T; }) {
        this.data = new TCreator();
    }
  }
  