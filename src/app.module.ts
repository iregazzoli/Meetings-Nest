import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './users/user.entity';

@Module({
  imports: [
    AuthModule, 
    UsersModule,  
    TypeOrmModule.forRoot({
    type: 'postgres',
    host: 'dev-db', 
    port: 5432, 
    username: 'admin',
    password: '1234',
    database: 'meets_nest',
    entities: [User], 
    synchronize: true,
    autoLoadEntities: true,
    })
  ],
  controllers: [AppController],
})
export class AppModule {}
