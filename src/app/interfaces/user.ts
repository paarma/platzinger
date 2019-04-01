/**
 * Una interface es similar a una clase de POO
 * los atrubutos marcados con "?" indica que pueden ser opcionales.
 */
export interface User {
	nick: string;
	subnick?: string;
	age?:number;
	email:string;
	friend:boolean;
	uid: any;
	status?: string;
	avatar?: string;
	friends?: any;
}