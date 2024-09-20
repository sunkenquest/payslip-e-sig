import { EventStatus } from "../../enums/status";

export interface SignatureState {
  status: EventStatus;
  base64Image: string | null;
  error: string;
}
