export type Client = {
  id: number;
  title?: string;
  titleId: number;
  firstName: string;
  lastName: string;
  dateOfBirth: Date;
  documentType: string;
  documentTypeId: number;
  maritalStatus?: string,
  maritalStatusId: number,
  identityNumber: string;
  ethnicity: string,
  ethnicityId: number,
  age?: number;
  passport: string;
  gender: string;
  genderId: number;
  phoneNumber: string;
  email: string;
  emergencyContactName: string;
  emergencyContactNumber: string;
  streetName: string;
  suburb: string;
  city: string;
  postalCode: string;
  status: string;
  statusId?: number;
  burialSociety: string;
  burialSocietyId?: number;
  referenceNumber: string;
  consent: boolean;
  createdDate: Date;
  createdByUserId: number;
  modifiedDate?: Date;
  modifiedByUserId?: number;
}

export type Gender = {
  id: number;
  name: string
}

export type DocumentType = {
  id: number;
  name: string;
  description: string;
  groupCode: string;
  isActive: boolean;
}

export type BurialSociety = {
  id: number;
  name: string;
  contactPerson: string;
  phoneNumber: string;
  email: string;
  createdDate: Date;
}

export type Status = {
  id: number;
  name: string;
  description: string;
  groupCode: string;
  isActive: boolean
}

export type Title = {
  id: number;
  name: string;
  description: string;
}

export type EthnicityGroup = {
  id: number;
  name: string;
  description: string;
}

export type MaritalStatus = {
  id: number;
  name: string;
  description: string;
}

export type FamilyMember = {
  id: number;
  firstName: string;
  lastName: string;
  dateOfBirth: Date;
  age: number;
  phoneNumber: string;
  email: string;
  isBeneficiary: boolean;
  createdDate: Date;
  createdByUserId: number;
  modifiedDate: Date;
  modifiedByUserId: number;
  clientId: number;
  client: string,
  gender: string,
  relationship: string,
  status: string;
}

export type PaymentHistory = {
  id: number,
  paymentDate: string,
  totalAmountPaid: number,
  referenceNumber: string,
  description: string,
  createdDate: string,
  createdByUserId: number,
  modifiedDate: Date,
  modifiedByUserId: number,
  client: string,
  paymentMethod: string,
  status: string
}
