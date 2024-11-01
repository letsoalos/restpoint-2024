export type Client = {
  id: number;
  firstName: string;
  lastName: string;
  dateOfBirth: Date;
  documentType: string;
  identityNumber: string;
  age: number;
  passport: string;
  gender: string;
  phoneNumber: string;
  email: string;
  emergencyContactName: string;
  emergencyContactNumber: string;
  streetName: string;
  suburb: string;
  city: string;
  postalCode: string;
  status: string;
  burialSociety: string;
  referenceNumber: string;
  consent: boolean;
  createdDate: Date;
  createdByUserId: number;
  modifiedDate: Date;
  modifiedByUserId?: number;
}

