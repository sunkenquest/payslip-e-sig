import { EventStatus } from "../../enums/status";

export interface PdfSignState {
  status: EventStatus;
  pdf: File | null;
  signedPdf: String;
  signature: string | null;
  error: string;
}