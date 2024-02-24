import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppModule } from '../src/app.module';

@Module({
  imports: [
    AppModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5433,
      username: 'admin',
      password: '1234',
      database: 'meets_nest_test',
      autoLoadEntities: true,
      synchronize: true,
    }),
  ],
})
export class TestModule {}