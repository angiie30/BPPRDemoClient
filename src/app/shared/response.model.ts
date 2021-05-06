export interface IResponse<T> {
	success: boolean;
	data: T;
	message: string;
}

export class Response<T> implements IResponse<T> {
	success: boolean = true;
	data: T;
	message: string = '';

	constructor(data: T) {
		this.data = data;
	}
}
