import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from './user.schema';
import { Model } from 'mongoose';
import { UserDetails } from './user.details';

@Injectable()
export class UserService {
    constructor(
        @InjectModel(User.name) private readonly userModel : 
        Model<UserDocument>,
    ) {}

    getUserDetail (user : UserDocument) : UserDetails {
        return {
            _id : user._id,
            name : user.name,
            email : user.email,
        }
    }

    async findByEmail (email : string) : Promise<User> {
        return await this.userModel.findOne({ email });
    }

    async create(
            name : string,
            email : string,
            hashedpassword : string
        ) : Promise<UserDocument> {
        const newUser = await this.userModel.create({ 
            name,
            email,
            password : hashedpassword, 
        });
        return await newUser.save();
    }

}
