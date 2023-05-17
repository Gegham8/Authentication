import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
  ConfigModule.forRoot({ envFilePath : 'src/.env', isGlobal: true }), 
  MongooseModule.forRoot(process.env.MONGO_URL),
  UserModule,
  AuthModule
],
  controllers : [],
  providers : [],
})

export class AppModule {}
 