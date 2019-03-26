import { Controller, Get, Post, Put, Delete, Body, Param, UseInterceptors, FileInterceptor, UploadedFile, Res } from '@nestjs/common';
import { TicketService } from './ticket.service';
import { TicketDTO } from './ticket.dto';

@Controller('ticket')
export class TicketController {
    constructor(private ticketService:TicketService){

    }

    @Get()
    getAllTickets(){
        return this.ticketService.showAll();
    }

    @Post()
    @UseInterceptors(FileInterceptor('file'))
    createTicket(@Body() data:TicketDTO, @UploadedFile() file){
        console.log(file);
        data.file=(file != undefined) ? file.filename:'yok';
        return this.ticketService.create(data);
    }

    @Post('adem')
    @UseInterceptors(FileInterceptor('file'))
    createTickett(@UploadedFile() file){
        console.log(file)
    }

    @Get(':imgpath')
    seeUploadedFile(@Param('imgpath') image, @Res() res) {
      return res.sendFile(image, { root: 'uploads' });
    }

    @Get(':id')
    readTicket(@Param('id') id: string){
       return this.ticketService.read(id);
    }

    @Put(':id')
    updateTicket(@Param('id') id:string, @Body() data:Partial<TicketDTO>){
        return this.ticketService.update(id,data);
    }

    @Delete(':id')
    destroyTicket(@Param('id') id:string){
        return this.ticketService.delete(id);
    }
}

