import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MeetModule } from './meets/meet.module';


@Module({
  imports: [
    AuthModule, 
    UsersModule,
    MeetModule,  
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.POSTGRES_HOST, 
      port: parseInt(process.env.POSTGRES_DEFAULT_PORT), 
      username: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.POSTGRES_DEFAULT_DB,
      entities: [__dirname + '/../**/*.entity{.ts,.js}'],
      synchronize: true,
      autoLoadEntities: true,
      migrations: ['../migrations/*.ts'],
    }), MeetModule
  ],
  controllers: [AppController],
})
export class AppModule {}