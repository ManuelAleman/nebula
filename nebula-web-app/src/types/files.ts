export interface FileMetadataDTO {
  id: string;
  name: string;
  type: string;
  size: number;
  clerkId: string;
  isPublic: boolean;
  fileLocation: string;
  uploadedAt: string;
}
