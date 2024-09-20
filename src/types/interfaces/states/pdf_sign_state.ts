import { EventStatus } from "../../enums/status";

export interface PdfSignState {
  status: EventStatus;
  pdf: File | null;
  signature: string | null;
  error: string;
}