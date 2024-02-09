import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    AuthModule, 
    UserModule,  
    TypeOrmModule.forRoot({
    type: 'postgres',
    host: 'localhost', 
    port: 5432, 
    username: 'admin',
    password: '1234',
    database: 'meets_nest',
    entities: [], 
    synchronize: true,
  })
  ],
  controllers: [AppController],
})
export class AppModule {}
