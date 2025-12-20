import { Module, forwardRef } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../database/typeorm/user.entity';
import { TicketsModule } from '../tickets/tickets.module';
import { FavoriteEvent } from 'src/database/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([User, FavoriteEvent]), forwardRef(() => TicketsModule)],
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule {}
