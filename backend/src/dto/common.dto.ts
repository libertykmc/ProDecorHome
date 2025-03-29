import { ApiProperty
 } from "@nestjs/swagger";
 import { IsUUID } from "class-validator";
 import { Expose, Type } from "class-transformer";

 export class IdDto {
    @ApiProperty({type: String, format:'uuid'})
    @IsUUID(4)
    @Expose()
    @Type(() => String)
    readonly id!: string
 }

 

