import { Module, MulterModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule} from '@nestjs/typeorm';
import { TicketModule } from './ticket/ticket.module';
import { SharedModule } from './shared/shared.module';
import { MessageModule } from './message/message.module';

@Module({
  imports: [TypeOrmModule.forRoot(), 
    MulterModule.register({
      dest: "./uploads"
    }),
    TicketModule,
    MessageModule,
    SharedModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
