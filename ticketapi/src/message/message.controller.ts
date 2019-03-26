import { Controller, Param, Get, Post, Body, Delete } from '@nestjs/common';
import { MessageService } from './message.service';
import { MessageDTO } from './message.dto';

@Controller('message')
export class MessageController {
    constructor(private messageService: MessageService) {}

  @Get('ticket/:id')
  showMessagesByticket(@Param('id') ticket: string) {
     // return "adem";
    return this.messageService.showByticket(ticket);
  }

  @Post('ticket/:id')
  createMessage(
    @Param('id') ticket: string,
    @Body() data: MessageDTO,
  ) {
    return this.messageService.create(ticket, data);
  }


  @Get(':id')
  showMessage(@Param('id') id: string) {
    return this.messageService.show(id);
  }

  @Delete(':id')
  destroyMessage(@Param('id') id: string) {
    return this.messageService.destroy(id);
  }
}