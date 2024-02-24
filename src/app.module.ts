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
      host: process.env.POSTGRES_HOST, 
      port: parseInt(process.env.POSTGRES_DEFAULT_PORT), 
      username: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.POSTGRES_DEFAULT_DB,
      entities: [User], 
      synchronize: true,
      autoLoadEntities: true,
      migrations: ['../migrations/*.ts'],
    })
  ],
  controllers: [AppController],
})
export class AppModule {}