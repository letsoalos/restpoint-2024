export type User = {
  firstName: string;
  lastName: string;
  email: string;
  address: Address;
}

export type Address = {
  streetName: string;
  suburb: string;
  city: string;
  postalCode: string;
}
