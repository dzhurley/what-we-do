export type CMSThing = {
  _id?: string;
  _rev?: string;
  _createdAt?: string;
  _updatedAt?: string;
  _type: 'thing';
  name: string;
  details: string;
  links: string[];
  tags: { value: string; label: string }[];
};
