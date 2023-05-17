import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { NewUserDto } from 'src/user/dto/newuser.dto';
import { UserService } from 'src/user/user.service';
import * as bcrypt from 'bcrypt';
import { ExistingUserDto } from 'src/user/dto/existing.user';
import { User } from 'src/user/user.schema';
import { UserDetails } from 'src/user/user.details';


@Injectable()
export class AuthService {
    constructor (
        private userService : UserService,
        private jwtService : JwtService    
    ) {}
    
    async validateUser (email : string, password : string) : Promise<User> {
        const user = await this.userService.findByEmail(email);
        if (!user) {
            return null;
        }

        const PasswordMatch = await bcrypt.compare(password, user.password);
        if (!PasswordMatch) {
            return null;
        }
        return user;
    }

    async register (user : NewUserDto) : Promise <UserDetails> {
        const { name, email, password } = user;
        const hashedPassword = await bcrypt.hash(password, parseInt(process.env.SALT));

        const newUser = await this.userService.create(name, email, hashedPassword);
        return this.userService.getUserDetail(newUser);
    }

    async login(user : ExistingUserDto) : Promise<{ token : string }> {
        const jwt = await this.jwtService.signAsync ({ user });
        return { token : jwt };
    }   
}