import { faker } from "@faker-js/faker";

export interface UserData {
  firstName: string;
  lastName: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  phone: string;
  ssn: string;
  username: string;
  password: string;
  confirmPassword: string;
}

export class TestDataHelper {
  static generateUser(): UserData {
    const firstName = faker.person.firstName();
    const lastName = faker.person.lastName();

    return {
      firstName,
      lastName,
      address: faker.location.streetAddress(),
      city: faker.location.city(),
      state: faker.location.state(),
      zipCode: faker.location.zipCode("#####"),
      phone: faker.string.numeric(10),
      ssn: faker.string.numeric(9),
      username: `${firstName.toLowerCase()}_${faker.string.numeric(6)}`,
      password: "Test@1234",
      confirmPassword: "Test@1234",
    };
  }
}
