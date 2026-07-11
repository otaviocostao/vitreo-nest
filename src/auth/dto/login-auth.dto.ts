import { IsBoolean, IsEmail, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class LoginAuthDto {
  @ApiProperty({ example: 'user@example.com', description: 'The email of the user' })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({ example: 'strongpassword123', description: 'The password of the user' })
  @IsString()
  @IsNotEmpty()
  password: string;

  @ApiPropertyOptional({ example: false, description: 'Whether to remember the user session (extends token expiration)' })
  @IsBoolean()
  @IsOptional()
  rememberMe?: boolean;
}
