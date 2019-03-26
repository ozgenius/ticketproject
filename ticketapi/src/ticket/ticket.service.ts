import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TicketEntity } from './ticket.entity';
import { Repository } from 'typeorm';
import { TicketDTO } from './ticket.dto';

@Injectable()
export class TicketService {
    constructor(@InjectRepository(TicketEntity) private ticketRepository : Repository<TicketEntity>){

    }

    async showAll() {
        return await this.ticketRepository.find();
    }

    async create(data:TicketDTO){
        console.log(data);
        const ticket = await this.ticketRepository.create(data);
        await this.ticketRepository.save(ticket);
        return ticket;
    }
    async read(id:string){
        return await this.ticketRepository.findOne({ where : {id}});
    }
    async update(id:string, data:Partial<TicketDTO>){
        await this.ticketRepository.update({id}, data);
        return await this.ticketRepository.findOne({id});
    }
    async delete(id:string){
        await this.ticketRepository.delete({id});
        return {deleted:true};
    }
}
