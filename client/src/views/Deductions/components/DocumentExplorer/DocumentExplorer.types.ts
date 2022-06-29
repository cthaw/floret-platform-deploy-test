import { DataTableHeader } from 'vuetify';
import { DeductionDocument } from '../../Deductions.types';

interface DocumentExplorerProps {
  items: DeductionDocument[];
  moreActions: {
    name: string;
    onClick: (item: DeductionDocument) => void;
    icon?: string;
    class?: string;
  }[];
}

interface DocumentExplorerData {
  search: string;
  selectedItems: DeductionDocument[];
  selectedDistributorFilters: DeductionDocument['distributor'][];
  selectedStatusFilters: DeductionDocument['status'][];
  selectedTypeFilters: DeductionDocument['type'][];
}

type DocumentExplorerMethods = {}

interface DocumentExplorerComputed {
  headers: DataTableHeader[];
  distributorFilters: DeductionDocument['distributor'][];
  statusFilters: DeductionDocument['status'][];
  typeFilters: DeductionDocument['type'][];
}

export {
  DocumentExplorerComputed, DocumentExplorerData, DocumentExplorerProps, DocumentExplorerMethods,
};
