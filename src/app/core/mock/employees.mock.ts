export type Employee = {
  id: string;
  fullName: string;
  email: string;
  role: 'Engineer' | 'Manager' | 'HR';
  status: 'ACTIVE' | 'INACTIVE';
};

export const EMPLOYEES: Employee[] = [
  {
    id: 'e1',
    fullName: 'Rachel Green',
    email: 'rachel@demo.dev',
    role: 'Engineer',
    status: 'ACTIVE',
  },
  {
    id: 'e2',
    fullName: 'Chandler Bing',
    email: 'chandler@demo.dev',
    role: 'Manager',
    status: 'ACTIVE',
  },
  {
    id: 'e3',
    fullName: 'Joey Tribbiani',
    email: 'joey@demo.dev',
    role: 'HR',
    status: 'INACTIVE',
  },
];
