import {
  Controller,
  Post,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import { ApiCreatedResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { UploadResponseDto } from './dto/upload.dto';
import { UploadService } from './upload.service';

@ApiTags('파일')
@Controller('uploads')
export class UploadController {
  constructor(private readonly uploadService: UploadService) {}

  @ApiOperation({
    summary: '파일 업로드',
    description: '파일을 업로드 합니다.',
  })
  @ApiCreatedResponse({ description: '성공', type: [UploadResponseDto] })
  @Post('')
  @UseInterceptors(FilesInterceptor('files', 10))
  uploadFile(@UploadedFiles() files: any) {
    return this.uploadService.uploadImage(files);
  }
}
