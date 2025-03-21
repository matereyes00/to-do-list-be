import { IsEmail, IsNotEmpty } from "class-validator";

export class AuthSignUpDto {
    userId: number;
    @IsEmail()
    email: string;
    @IsNotEmpty() 
    username: string;
    @IsNotEmpty()
    password: string;
}
