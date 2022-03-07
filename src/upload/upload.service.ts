import { Injectable } from '@nestjs/common';
import { User } from 'src/user/user.entity';

@Injectable()
export class UploadService {
  async uploadImage(user: User, files: any) {
    return files.map((file) => {
      return { url: file.location };
    });
  }
}
