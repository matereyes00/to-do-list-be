import { IsNotEmpty, IsString } from "class-validator";

export class AuthDtoResult {
    @IsString()
    accessToken: string;
    @IsNotEmpty()
    userId: number;
    @IsNotEmpty()
    username: string;
    @IsString()
    refreshToken: string;
}
