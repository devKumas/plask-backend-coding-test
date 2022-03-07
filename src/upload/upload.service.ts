import { Injectable } from '@nestjs/common';

@Injectable()
export class UploadService {
  uploadImage(files: any) {
    return files.map(({ location }) => {
      return { location };
    });
  }
}
