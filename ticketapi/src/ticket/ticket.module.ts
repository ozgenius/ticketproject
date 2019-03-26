import { Module, MulterModule } from '@nestjs/common';
import { TicketController } from './ticket.controller';
import { TicketService } from './ticket.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TicketEntity } from './ticket.entity';

@Module({
  imports: [  MulterModule.register({
    dest: "./uploads"
  }),TypeOrmModule.forFeature([TicketEntity])],
  controllers: [TicketController],
  providers: [TicketService]
})
export class TicketModule {}
