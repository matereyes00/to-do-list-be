import { IsBoolean, IsNotEmpty, IsOptional } from "class-validator";

export class CreateListItemDto {
    @IsNotEmpty()
    itemName: string;
    
    @IsBoolean()
    @IsOptional()
    itemStatus: boolean = false;
    
    @IsNotEmpty()
    listId: number;
}