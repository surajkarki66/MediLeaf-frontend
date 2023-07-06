import { CountryCode } from 'libphonenumber-js';

export type LoginType = {
  email: string;
  password: string;
};

export type RegisterType = {
  first_name: string;
  last_name: string;
  email: string;
  country: CountryCode | undefined;
  contact: string;
  password: string;
  confirm_password: string;
};

export type PlantType = {
  id: number;
  common_names: string[];
  common_names_ne: string[];
  description: string;
  description_ne: string;
  medicinal_properties: string;
  medicinal_properties_ne: string;
  duration: string;
  growth_habit: string;
  wikipedia_link: string;
  other_resources_links: string[];
  no_of_observations: number;
  family: string;
  genus: string;
  species: string;
  images: PlantImageType[];
  created_at: Date;
  updated_at: Date;
};

enum PlantPart {
  flower = 'flower',
  bark = 'bark',
  leaf = 'leaf',
  fruit = 'fruit',
  other = 'other',
}
export type PlantImageType = {
  id: number;
  plant: string;
  part: PlantPart;
  image: string;
  default: boolean;
  created_at: Date;
  updated_at: Date;
};
