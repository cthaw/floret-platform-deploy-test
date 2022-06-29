import { TextractDocument, TextractExpense } from 'amazon-textract-response-parser';

// Helper method for extracting forms
const getForms = (doc: TextractDocument) => doc.listPages()
  .map(
    (page) => page.form.listFields().map((field) => ({
      key: field.key.text,
      value: field.value?.text,
      confidence: field.confidence,
    })),
  );

// Helper method for extracting tables
const getTables = (doc: TextractDocument) => doc.listPages()
  .map(
    (page, i) => page.listTables()
      .map((table) => table.listRows()
        .map((row) => row.listCells().map((cell) => ({
          page: i,
          value: cell.text,
          confidence: cell.confidence,
          polyBounds: cell.geometry.polygon.map((({ x, y }) => ({ x, y }))),
        })))),
  );

const getSummaryFields = (exp: TextractExpense) => exp.listDocs()
  .map(
    (page) => page.listSummaryFields()
      .map((value) => ({
        page: value.pageNumber,
        value: value.label?.text,
        confidence: value.label?.confidence,
      })),
  );

const getExpenseFields = (exp: TextractExpense) => exp.listDocs()
  .map(
    (page) => page.listLineItemGroups()
      .map((group) => group.listLineItems()
        .map((lineItem) => lineItem.listFields()
          .map((field) => ({
            page: field.pageNumber,
            value: field.value?.text,
            confidence: field.value.confidence,
          })))),
  );

export {
  getForms,
  getTables,
  getSummaryFields,
  getExpenseFields,
};
