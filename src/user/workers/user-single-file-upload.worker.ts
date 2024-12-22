import { Processor, Process, OnQueueActive, OnQueueCompleted } from "@nestjs/bull";
import { Job } from "bullmq";
import { uploadToS3 } from "src/utils/s3.utils";

@Processor({ name: 'fileUploadQueue' }) // queue name
export class UserSingleFileUploadWorker {
    @Process("uploadFile") // job name
    async handleFileUpload(job: Job){
        console.log(job.data)
        const { buffer, bucket, originalname, mimeTime } = job.data;
        await uploadToS3(buffer, bucket, originalname, mimeTime);
    }

    @OnQueueActive()
    onActive(job: Job){
        console.log(`Processing job ${job.id}...`);
    }

    @OnQueueCompleted()
    onCompleted(job: Job){
        console.log(`Job ${job.id} completed`);
    }
}