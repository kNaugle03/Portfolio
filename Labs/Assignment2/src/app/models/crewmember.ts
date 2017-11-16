import { Person } from './person';

// this class is defined based on the structure of the JSON data returned from the API
export class CrewMember {
  type: string;
  person: Person;
}
