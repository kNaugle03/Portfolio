
// this class is defined based on the structure of the JSON data returned from the API

// this definition may need to be expanded on depending on whether we start loading embedded data

import {Show} from "./show";
import {CastMember} from "./castmember";
import {CrewMember} from "./crewmember";

export class Person {
  id: number;
  url: string;
  name: string;
  image: {
    medium: string;
    original: string;
  };
  _links: {
    self: {
      href: string;
    }
  };
  _embedded: {
    shows: Show[];
    cast: CastMember[];
    crew: CrewMember[];
  };
}
