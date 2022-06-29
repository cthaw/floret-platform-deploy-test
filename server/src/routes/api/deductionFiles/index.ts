import {
  Router, Request, Response, NextFunction,
} from 'express';
import busboy from 'busboy';
import { TEST_DEDUCTIONS_UPLOAD_BUCKET } from '../../../constants';
import {
  getDocumentAnalysis,
  getExpenseAnalysis,
  startDocumentAnalysis,
  startExpenseAnalysis,
} from '../../../services/textract';
import { uploadDeductionFile } from '../../../services/deductions';
import { listFiles } from '../../../services/storage';
import logger from '../../../logger';

const deductionFileRouter = Router();

deductionFileRouter.get('/test', (req: Request, res: Response) => {
  const jobId: string = req.query.jobId as string;

  getDocumentAnalysis(jobId)
    .then((result) => {
      res.send(result);
    });
});

deductionFileRouter.post('/', (req: Request, res: Response, next: NextFunction) => {
  const bb = busboy({ headers: req.headers });
  const customerId = '62a15945afe964e89470cf67'; // TODO: get customerId from context
  bb.on('file', (name, file, info) => {
    const chunks:any[] = [];
    const { filename, mimeType: contentType } = info;
    file.on('data', (data) => {
      chunks.push(data);
    });
    file.on('close', () => {
      const fileLocation: string = TEST_DEDUCTIONS_UPLOAD_BUCKET;
      const fileBuffer:Buffer = Buffer.concat(chunks);
      uploadDeductionFile(customerId, {
        fileLocation, filename, contentType, fileBuffer,
      })
        .then((response) => {
          res.send(response);

          // TODO: handle elsewhere?
          startDocumentAnalysis(fileLocation, filename)
            .then((jobId) => {
              logger.info(`Initiated Textract processing: Job Id ${jobId}`, response);
            })
            .catch((error) => {
              logger.error('Error initiating Textract processing', { ...response, error });
            });
        })
        .catch(next);
    });
  });
  req.pipe(bb);
});

deductionFileRouter.get('/', (req: Request, res: Response, next: NextFunction) => {
  listFiles(TEST_DEDUCTIONS_UPLOAD_BUCKET)
    .then((response) => {
      res.send(response);
    })
    .catch(next);
});

deductionFileRouter.get('/analysis', (req: Request, res: Response) => {
  const jobId: string = req.query.jobId as string;
  getExpenseAnalysis(jobId)
    .then((result) => res.send(result));
});

deductionFileRouter.post('/analysis', (req: Request, res: Response) => {
  const { bucket = TEST_DEDUCTIONS_UPLOAD_BUCKET, filename } = req.body;
  startExpenseAnalysis(bucket, filename)
    .then((result) => res.send(result));
});

export default deductionFileRouter;
