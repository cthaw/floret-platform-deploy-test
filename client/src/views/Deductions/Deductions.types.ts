type DeductionDocument = {
    _id: string;
    name: string;
    distributor: string;
    invoiceNumber: string;
    type: string;
    status: 'In Review' | 'Complete';
    invoiceDate: string;
    uploaded: string;
    uploadedBy: string;
    size: string;
    vendorNumber?: string | number;
    specialPayee?: string | number;
    brokerNumber?: string | number;
  };

type DeductionItem = Partial<DeductionDocument & {
    _id: string;
    customerNumber?: string;
    customerName?: string;
    customer?: {
        id?: string | number;
        name?: string;
    };
    shipDate?: string | Date;
    quantity?: number | string;
    invoicePercent?: string;
    allowance?: number;
    brand?: string;
    description?: string;
    upcNumber?: number | string;
    chargeback?: number | string;
    itemNumber?: number | string;
    amount?: number | string;
    retailer?: string;
    issueType?: string;
}>

export { DeductionDocument, DeductionItem };
