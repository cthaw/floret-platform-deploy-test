import { Router } from 'express';
import deductionFileRouter from './deductionFiles';
import errorHandler from '../../middleware/error';

const apiRouter = Router();

apiRouter.use('/deduction-files', deductionFileRouter);

apiRouter.use(errorHandler);

export default apiRouter;
