import { Injectable, Post, UseInterceptors, FileInterceptor, UploadedFile } from '@nestjs/common';

@Injectable()
export class SharedService {
    constructor() {}
    
    @Post()
    @UseInterceptors(FileInterceptor('image'))
    uploadFiled(@UploadedFile() file) {
      console.log(file);
      console.log("adem")
    }
    
}