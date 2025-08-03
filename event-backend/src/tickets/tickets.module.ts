import { Module, forwardRef } from '@nestjs/common';
import { TicketsController } from './tickets.controller';
import { TicketsService } from './tickets.service';
import { UsersModule } from 'src/users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Ticket } from 'src/database/typeorm/ticket.entity';
import { EventsModule } from 'src/events/events.module';

@Module({
  imports: [forwardRef(() => UsersModule), TypeOrmModule.forFeature([Ticket]), EventsModule],
  controllers: [TicketsController],
  providers: [TicketsService],
  exports: [TicketsService]
})
export class TicketsModule {}
