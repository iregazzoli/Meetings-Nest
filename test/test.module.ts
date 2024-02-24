import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppModule } from '../src/app.module';

@Module({
  imports: [
    AppModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'test-db', 
      port: 5432, // port inside the Docker container
      username: 'admin',
      password: '1234',
      database: 'meets_nest_test',
      entities: [__dirname + '/../**/*.entity{.ts,.js}'],
      synchronize: true,
      autoLoadEntities: true,
    }),
  ],
})
export class TestModule {}