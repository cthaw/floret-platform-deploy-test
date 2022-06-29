import { get, has } from 'lodash';
import { CommonHeaders } from '../../constants';
import { DeductionDocument } from '../../Deductions.types';

interface ValidationFormProps {
  document: Partial<DeductionDocument>;
}

interface ValidationFormComputed {
  formattedDocument: Partial<DeductionDocument>;
}

interface ValidationFormData {
  CommonHeaders: typeof CommonHeaders;
  showCalendar: boolean;
  selectedCalendarDate: string;
  activeLabel: string;
}

interface ValidationFormMethods {
  get: typeof get;
  has: typeof has;
  openCalendar: (date: string, label: string, index?: number) => void;
  saveCalendarDate: () => void;
}

export {
  ValidationFormComputed, ValidationFormProps, ValidationFormData, ValidationFormMethods,
};
