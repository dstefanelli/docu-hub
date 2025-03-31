export interface Document {
  ID: string;
  Title: string;
  Version: string;
  CreatedAt: string;
  UpdatedAt: string;
  Attachments: string[];
  Contributors: Contributor[];
}

export interface Contributor {
  ID: string;
  Name: string;
}
