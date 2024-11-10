export type Client = {
  id: number;
  title: string;
  firstName: string;
  lastName: string;
  dateOfBirth: Date;
  documentType: string;
  maritalStatus: string,
  identityNumber: string;
  ethnicity: string,
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

export type ClientTitle = {
  id: number;
  name: string;
  ddescription: string;
}

export type EthnicityGroup = {
  id: number;
  name: string;
  ddescription: string;
}

export type MaritalStatus = {
  id: number;
  name: string;
  ddescription: string;
}
