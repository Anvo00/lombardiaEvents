import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { TicketsModule } from './tickets/tickets.module';
import { EventsModule } from './events/events.module';

@Module({
  imports: [UsersModule, AuthModule, TicketsModule, EventsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
