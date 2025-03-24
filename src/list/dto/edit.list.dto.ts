import { IsBoolean, IsOptional, IsString } from "class-validator";

export class EditListDto {
    @IsOptional()
    @IsString()
    title: string;

    @IsOptional()
    @IsBoolean()
    status: boolean;
}
