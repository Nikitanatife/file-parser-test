import {
  Controller,
  HttpCode,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { AppService } from './app.service';

@Controller('/')
@UseInterceptors(FileInterceptor('file', {}))
export class AppController {
  constructor(private readonly _appService: AppService) {}
  @Post('/upload')
  @HttpCode(201)
  async uploadFile(@UploadedFile() file: Express.Multer.File) {
    return this._appService.processUploadedFile(file);
  }
}
