export type Client = {
  id: number;
  firstName: string;
  lastName: string;
  title: string | null;
  titleId: number;
  dateOfBirth: string;
  age: number;
  documentType: string | null;
  documentTypeId: number;
  identityNumber: string | null;
  passport: string | null;
  ethnicity: string | null;
  ethnicityId: number;
  gender: string | null;
  genderId: number;
  maritalStatus: string | null;
  maritalStatusId: number;
  phoneNumber: string;
  altNumber: string | null;
  email: string | null;
  emergencyContactName: string;
  emergencyContactNumber: string | null;
  streetName: string;
  suburb: string;
  city: string;
  postalCode: string;
  status: string;
  statusId: number;
  branchId: number;
  referenceNumber: string;
  burialSociety: string;
  burialSocietyId: number | null;
  consent: boolean;
  createdDate: string;
  branch: string;
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
  id: number;
  paymentDate: string;
  totalAmountPaid: number;
  referenceNumber: string;
  description: string;
  createdDate: string;
  createdByUserId: number;
  modifiedDate: Date;
  modifiedByUserId: number;
  client: string;
  paymentMethod: string;
  status: string;
}

export type Branch = {
  id: number;
  name: string;
  streetName: string;
  suburb: string;
  city: string;
  code: string;
  provinceId: number;
  contactPersonId: number;
  province: string | null;
  contactPerson: string | null;
}
