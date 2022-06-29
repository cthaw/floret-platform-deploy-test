// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { camelCase } from 'lodash';

export class User {
  // Mandatory Fields
  sub!: string

  names!: string

  nickname!: string

  picture!: string

  updatedAt!: string

  email!: string

  emailVerified!: boolean

  provider!: string

  id!: string
  // End Mandatatory fields

  [key: string]: string | boolean | undefined

  constructor(auth0User?: { [key: string]: string | boolean | undefined }) {
    if (!auth0User) {
      return;
    }

    Object.keys(auth0User).forEach((key) => {
      this[key] = auth0User[key];
    });

    this.sub = auth0User.sub as string;
    [this.provider, this.id] = this.sub.split('|');
  }
}
