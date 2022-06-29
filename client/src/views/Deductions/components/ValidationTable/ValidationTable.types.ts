import { get, has } from 'lodash';
import { DataTableHeader } from 'vuetify';
import { CommonHeaders } from '../../constants';
import { DeductionDocument, DeductionItem } from '../../Deductions.types';

interface ValidationTableProps {
  items: DeductionItem[];
}

interface ValidationTableData {
  selectedItems: DeductionItem[];
  CommonHeaders: typeof CommonHeaders;
  showCalendar: boolean;
  selectedCalendarDate: string;
  activeLabel: string;
  activeIndex: number;
  updatedItems: DeductionItem[];
}

interface ValidationTableComputed {
  headers: DataTableHeader[];
}

interface ValidationTableMethods {
  get: typeof get;
  has: typeof has;
  openCalendar: (date: string, label: string, index: number) => void;
  saveCalendarDate: () => void;
}

export {
  ValidationTableComputed,
  ValidationTableMethods,
  ValidationTableData,
  ValidationTableProps,
  DeductionDocument,
};
