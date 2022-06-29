import {
  S3Client, PutObjectCommand, ListObjectsV2Command, HeadObjectCommand, S3ServiceException,
} from '@aws-sdk/client-s3';
import logger from '../../logger';
import { REGION } from '../../constants';

const s3Client = new S3Client({ region: REGION });

const fileExists = async (bucket: string, filename: string) => {
  try {
    await s3Client.send(new HeadObjectCommand({
      Bucket: bucket,
      Key: filename,
    }));
    return true;
  } catch (e: unknown) {
    if (e instanceof S3ServiceException) {
      if (e.$metadata.httpStatusCode === 404) {
        return false;
      }
    }

    throw e;
  }
};

const listFiles = async (bucket: string) => {
  const listFilesParams = new ListObjectsV2Command({
    Bucket: bucket,
  });
  const output = await s3Client.send(listFilesParams);
  const sourceKeys = output.Contents?.map(({ Key }) => Key);
  return sourceKeys;
};

const uploadFile = async (
  bucket: string,
  filename: string,
  fileContentType: string,
  fileBuffer: Buffer,
) => {
  const createFileParams = {
    Bucket: bucket,
    Key: filename,
    Body: fileBuffer,
    contentType: fileContentType,
  };

  const results = await s3Client.send(new PutObjectCommand(createFileParams));
  logger.info(`Successfully wrote ${filename} to S3 bucket ${bucket}`);
  return results;
};

export {
  fileExists,
  listFiles,
  uploadFile,
};
