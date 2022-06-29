import { uploadFile, fileExists, listFiles } from './s3';

const handleFileUpload = async ({
  fileLocation, filename, contentType, fileBuffer, upsert = false,
}: {
  fileLocation: string,
  filename: string,
  contentType: string,
  fileBuffer: Buffer,
  upsert?: boolean,
}) => {
  if (!upsert) {
    if (await fileExists(fileLocation, filename)) {
      throw new Error('File already exists');
    }
  }

  await uploadFile(fileLocation, filename, contentType, fileBuffer);

  return {
    fileLocation,
    filename,
    filesize: fileBuffer.byteLength,
  };
};

export {
  handleFileUpload, listFiles,
};
