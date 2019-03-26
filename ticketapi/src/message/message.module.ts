import { Module } from '@nestjs/common';
import { MessageController } from './message.controller';
import { MessageService } from './message.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MessageEntity } from './message.entity';
import { TicketEntity } from 'src/ticket/ticket.entity';

@Module({
  imports: [TypeOrmModule.forFeature([MessageEntity,TicketEntity])],
  controllers: [MessageController],
  providers: [MessageService]
})
export class MessageModule {}
