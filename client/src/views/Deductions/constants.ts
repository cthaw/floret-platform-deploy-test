export const CommonHeaders = {
  _id: {
    text: 'id #',
    disabled: true,
  },
  name: {
    text: 'Name',
    value: 'name',
  },
  distributor: {
    text: 'Distributor',
    value: 'distributor',
    filterable: true,
    suggestions: ['KeHe', 'UNFI'],
  },
  invoiceDate: {
    text: 'Invoice Date',
    value: 'invoiceDate',
    date: true,
    open: false,
  },
  status: {
    text: 'Status',
    value: 'status',
    filterable: true,
    disabled: true,
  },
  type: {
    text: 'Type',
    value: 'type',
    filterable: true,
    suggestions: ['Spoilage', 'Free Fills', 'Other'],
  },
  uploaded: {
    text: 'Uploaded',
    value: 'uploaded',
    disabled: true,
  },
  uploadedBy: {
    text: 'Uploaded by',
    value: 'uploadedBy',
    suggestions: ['Tim', 'Mark', 'Sandra'],
  },
  size: {
    text: 'Size',
    value: 'size',
    disabled: true,
  },
  retailer: {
    text: 'Retailer',
    value: 'retailer',
    suggestions: ['Home Depot', 'Walgreens', 'CVS'],
  },
  issueType: {
    text: 'Issue Type',
    value: 'issueType',
    suggestions: ['Spoilage', 'Free Fills'],
  },
  amount: {
    text: 'Amount',
    value: 'amount',
  },
  invoicePercent: {
    text: '% Invoice',
    value: 'invoicePercent',
  },
};
