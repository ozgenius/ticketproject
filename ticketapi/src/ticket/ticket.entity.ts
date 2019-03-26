import {
    Entity,
    PrimaryGeneratedColumn,
    CreateDateColumn,
    Column,
    ManyToOne,
    UpdateDateColumn,
    ManyToMany,
    JoinTable,
    OneToMany,
  } from 'typeorm';
import { MessageEntity } from 'src/message/message.entity';
  
  
  @Entity('tickets')
  export class TicketEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;
  
    @CreateDateColumn()
    created: Date;
  
    @UpdateDateColumn()
    updated: Date;
  
    @Column('text')
    ticket: string;
  
    @Column('text')
    content: string;

    @Column('text')
    file: string;

    @Column('int')
    status: number;

    @OneToMany(type => MessageEntity, message => message.ticket, { cascade: true })
    messages: MessageEntity[];
  }