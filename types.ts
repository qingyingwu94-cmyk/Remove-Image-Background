export interface ProcessedImage {
  originalUrl: string;
  processedUrl: string | null;
  mimeType: string;
}

export enum ProcessingStatus {
  IDLE = 'IDLE',
  UPLOADING = 'UPLOADING',
  PROCESSING = 'PROCESSING',
  SUCCESS = 'SUCCESS',
  ERROR = 'ERROR',
}

export interface AppState {
  status: ProcessingStatus;
  image: ProcessedImage | null;
  error: string | null;
}
