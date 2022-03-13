export type CMSThing = {
  _type: 'thing';
  _id: string;
  _rev: string;
  _createdAt: string;
  _updatedAt: string;
  name: string;
  details: string;
  links: string[];
  tags: { value: string; label: string }[];
};
