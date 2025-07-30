import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { TicketsModule } from './tickets/tickets.module';
import { EventsModule } from './events/events.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import entities from './users/typeorm';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [UsersModule, AuthModule, TicketsModule, EventsModule,
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'nestjsuser',
      password: 'MyR00tPassw0rd',
      database: 'lombardiaEventsDB',
      entities,
      synchronize: false,
      autoLoadEntities: true,
    })],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
