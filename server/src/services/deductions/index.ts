import { OptionalId } from 'mongodb';
import { createDeductionFile } from '../../db/dao/deductionFile';
import { DeductionFile } from '../../db/models';
import logger from '../../logger';
import { handleFileUpload } from '../storage';

const uploadDeductionFile = async (customerId: string, {
  filename, fileLocation, contentType, fileBuffer,
}:{
  filename: string, fileLocation: string, contentType: string, fileBuffer: Buffer,
}): Promise<DeductionFile | null> => {
  const uploadData: {
    filename: string,
    fileLocation: string,
    filesize: number
  } = await handleFileUpload({
    fileLocation, filename, contentType, fileBuffer,
  });

  const deductionFile: OptionalId<DeductionFile> = {
    filename: uploadData.filename,
    fileLocation: uploadData.fileLocation,
    filesize: uploadData.filesize,
    createdAt: new Date(),
    updatedAt: new Date(),
    customer: {
      id: customerId,
    },
    status: 'Processing',
  };

  try {
    const _id = await createDeductionFile(deductionFile);
    return {
      ...deductionFile,
      _id,
    };
  } catch {
    logger.error(`File ${filename} successfully uploaded to ${fileLocation}, but failed to create DB entry`);
    return null;
  }
};

export {
  uploadDeductionFile,
};
