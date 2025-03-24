import { IsBoolean, IsNotEmpty, IsOptional, IsString } from "class-validator";

export class EditListItemDto {
    @IsOptional()
    @IsString()
    itemName: string;
    
    @IsOptional()
    @IsBoolean()
    itemStatus: boolean;
}