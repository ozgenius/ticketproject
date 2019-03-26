import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TicketEntity } from 'src/ticket/ticket.entity';
import { Repository } from 'typeorm';
import { MessageDTO } from './message.dto';
import { MessageEntity } from './message.entity';

@Injectable()
export class MessageService {
    constructor(
        @InjectRepository(MessageEntity)
        private messageRepository: Repository<MessageEntity>,
        @InjectRepository(TicketEntity)
        private ticketRepository: Repository<TicketEntity>
      ) {}
    
      private toResponseObject(message: MessageEntity) {
        return {
          ...message,
          author: message.author,
        };
      }
    
      async showByticket(ticketId: string) {
        const messages = await this.messageRepository.find({
          where: { ticket: { id: ticketId } },
          relations: ['ticket']
        });
        return messages.map(message => this.toResponseObject(message));
      }
    
      async show(id: string) {
        const message = await this.messageRepository.findOne({
          where: { id },
          relations: ['ticket'],
        });
        return this.toResponseObject(message);
      }
    
      async create(ticketId: string, data: MessageDTO) {
        const ticket = await this.ticketRepository.findOne({ where: { id: ticketId } });
        const message = await this.messageRepository.create({
          ...data,
          ticket,
        });
        await this.messageRepository.save(message);
        console.log(message);
        return this.toResponseObject(message);
      }
    
      async destroy(id: string) {
        const message = await this.messageRepository.findOne({
          where: { id },
          relations: ['ticket'],
        });
    
        await this.messageRepository.remove(message);
        return this.toResponseObject(message);
      }
    }
