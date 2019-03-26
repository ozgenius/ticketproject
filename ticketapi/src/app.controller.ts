import { Controller, Get, Post, UseInterceptors, UploadedFile, FileInterceptor, UploadedFiles, FilesInterceptor } from '@nestjs/common';
import { AppService } from './app.service';
import { diskStorage } from 'multer'
import { extname } from 'path'

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
  @Get("adem")
  getHellom(): string {
    return this.appService.getHello();
  }

  @Post()
  @UseInterceptors(FileInterceptor('image'))
  uploadFiled(@UploadedFile() file) {
    console.log(file);
    console.log("adem")
  }
  @Post('upload')
  @UseInterceptors(FileInterceptor('file', {
    storage: diskStorage({
      destination: './uploads'
      , filename: (req, file, cb) => {
        // Generating a 32 random chars long string
        const randomName = Array(32).fill(null).map(() => (Math.round(Math.random() * 16)).toString(16)).join('')
        //Calling the callback passing the random name generated with the original extension name
        cb(null, `${randomName}${extname(file.originalname)}`)
      }
    })
  }))
  async upload( @UploadedFile() file) {
    console.log(file)
  }

}
