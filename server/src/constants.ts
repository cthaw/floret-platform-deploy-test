import path from 'path';

export const {
  PORT = 8080,
  LOG_LEVEL = 'info',
  DEFAULT_ERROR_MESSAGE = 'Something went wrong...',
  DEFAULT_ERROR_CODE = '500',
  TEST_DEDUCTIONS_UPLOAD_BUCKET = 'test-deductions-upload',
  REGION = 'us-east-1',
  DB_URL = 'mongodb://localhost:27017',
  DB_NAME = 'floret-platform',
  TEXTRACT_SNS_TOPIC_ARN,
  TEXTRACT_ROLE_ARN,
} = process.env;

export const CLIENT_DIR = path.join(process.cwd(), '../client/dist');

export const DEDUCTION_FILE_STATUSES = ['Processing', 'In Review', 'Validated'] as const;
