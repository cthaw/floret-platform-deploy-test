import {
  TextractClient,
  AnalyzeDocumentCommand,
  StartDocumentAnalysisCommand,
  GetDocumentAnalysisCommand,
  AnalyzeExpenseCommand,
  StartExpenseAnalysisCommand,
  GetExpenseAnalysisCommand,
} from '@aws-sdk/client-textract';
import {
  ApiAnalyzeExpenseResponse,
  ApiResponsePage,
  ApiResponsePages,
  TextractDocument,
  TextractExpense,
} from 'amazon-textract-response-parser';
import { TEXTRACT_SNS_TOPIC_ARN, TEXTRACT_ROLE_ARN } from '../../constants';
import {
  getExpenseFields, getForms, getSummaryFields, getTables,
} from './helpers';

const textract = new TextractClient({});

const composeS3Object = (Bucket: string, Name: string) => ({ S3Object: { Bucket, Name } });

const composeDocumentOutput = (doc: TextractDocument) => ({
  forms: getForms(doc),
  tables: getTables(doc),
});

const composeExpenseOutput = (exp: TextractExpense) => ({
  summary: getSummaryFields(exp),
  expense: getExpenseFields(exp),
});

/**
 * API for synchoronous textract processing.
 * File must be single page.
 */
const analyzeDocument = async (bucket: string, filename: string) => {
  const params = {
    Document: composeS3Object(bucket, filename),
    FeatureTypes: ['TABLES', 'FORMS'],
  };

  const command = new AnalyzeDocumentCommand(params);
  const response = await textract.send(command);
  const doc = new TextractDocument(response as ApiResponsePage);
  return composeDocumentOutput(doc);
};

/**
 * API for asynchoronous textract processing.
 * Required for multi-page input files
 */
const startDocumentAnalysis = async (bucket: string, filename: string) => {
  const params = {
    DocumentLocation: composeS3Object(bucket, filename),
    FeatureTypes: ['TABLES', 'FORMS'],
    NotificationChannel: {
      RoleArn: TEXTRACT_ROLE_ARN,
      SNSTopicArn: TEXTRACT_SNS_TOPIC_ARN,
    },
  };

  const command = new StartDocumentAnalysisCommand(params);
  const { JobId } = await textract.send(command);
  return JobId;
};

/**
 * API for retrieving result of a previously started async document analysis job
 */
const getDocumentAnalysis = async (jobId: string) => {
  let NextToken;
  const responses = [];

  // TODO: validate how big these results can get
  while (NextToken || !responses.length) {
    const command: GetDocumentAnalysisCommand = new GetDocumentAnalysisCommand({
      JobId: jobId,
      NextToken,
    });

    // eslint-disable-next-line no-await-in-loop
    const response = await textract.send(command);
    responses.push(response);

    ({ NextToken } = response);
  }

  const doc = new TextractDocument(responses as ApiResponsePages);
  return composeDocumentOutput(doc);
};

const analyzeExpense = async (bucket: string, filename: string) => {
  const params = { Document: composeS3Object(bucket, filename) };
  const command = new AnalyzeExpenseCommand(params);
  const response = await textract.send(command);
  const exp = new TextractExpense(response as ApiAnalyzeExpenseResponse);
  return composeExpenseOutput(exp);
};

const startExpenseAnalysis = async (bucket: string, filename: string) => {
  const params = { DocumentLocation: composeS3Object(bucket, filename) };
  const command = new StartExpenseAnalysisCommand(params);
  const { JobId: jobId } = await textract.send(command);
  return { jobId };
};

const getExpenseAnalysis = async (JobId: string) => {
  const command = new GetExpenseAnalysisCommand({ JobId });
  const response = await textract.send(command);
  const exp = new TextractExpense(response as ApiAnalyzeExpenseResponse);
  return composeExpenseOutput(exp);
};

export {
  analyzeExpense,
  analyzeDocument,
  startExpenseAnalysis,
  startDocumentAnalysis,
  getDocumentAnalysis,
  getExpenseAnalysis,
};
