import { Body, Controller, HttpCode, HttpStatus, Post, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { AuthService } from './auth.service';
import { NewUserDto } from 'src/user/dto/newuser.dto';
import { ExistingUserDto } from 'src/user/dto/existing.user';
import { UserDetails } from 'src/user/user.details';
import { LocalGuard } from './guards/loacl.guard';
import { ExistingUserGuard } from './guards/existing.user.guard';

@Controller('auth')
export class AuthController {
    constructor (private authService: AuthService) {}
    
    @Post('register')
    @UsePipes(new ValidationPipe())
    @UseGuards(ExistingUserGuard)
    async register (@Body() user : NewUserDto) : Promise<UserDetails | any> {
        return this.authService.register(user);
    }

    @Post('login')
    @UseGuards(LocalGuard)
    @HttpCode(HttpStatus.OK)
    login (@Body() user : ExistingUserDto) : Promise<{ token: string }> {
        return this.authService.login(user);
    }
}
