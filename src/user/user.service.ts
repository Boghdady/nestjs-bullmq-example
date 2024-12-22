import { InjectQueue } from '@nestjs/bullmq';
import { Injectable } from '@nestjs/common';
import { Queue } from 'bullmq';
import { uploadToS3 } from 'src/utils/s3.utils';

@Injectable()
export class UserService {
  constructor(@InjectQueue("fileUploadQueue") private readonly fileUploadQueue: Queue) {}

  async uploadFile(file) {
    console.log({ file });
    const { originalname } = file;

    await this.fileUploadQueue.add('uploadFile', {
      file,
      bucket: process.env.S3_BUCKET,
      name: originalname,
      mimetype: file.mimetype,
    },{
      delay: 5000
    });
    console.log("job added to queue");

    // return await uploadToS3(
    //   file.buffer,
    //   process.env.S3_BUCKET,
    //   originalname,
    //   file.mimetype,
    // );
  }
}
