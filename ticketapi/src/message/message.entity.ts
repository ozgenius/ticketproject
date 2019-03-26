import {
    Entity,
    PrimaryGeneratedColumn,
    CreateDateColumn,
    Column,
    ManyToOne,
    JoinTable,
  } from 'typeorm';
  
  import { TicketEntity } from '../ticket/ticket.entity';
  
  @Entity('messages')
  export class MessageEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;
  
    @CreateDateColumn()
    created: Date;
  
    @Column('text')
    message: String;

    @Column('text')
    author: String;
  
    @ManyToOne(type => TicketEntity, ticket => ticket.messages)
    ticket: TicketEntity;
  }