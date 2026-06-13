export interface Journal{ 
    id:string;
    title:string;
    subtitle:string;
    created:string;
    favorite:boolean;
    locked:boolean;
    password?:string;
}