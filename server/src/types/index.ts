export interface User {
  id?: number;
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  role: 'admin' | 'user';
  createdAt?: string;
  updatedAt?: string;
}

export interface Company {
  id?: number;
  name: string;
  website?: string;
  industry?: string;
  size?: string;
  phone?: string;
  email?: string;
  address?: string;
  city?: string;
  state?: string;
  zipCode?: string;
  country?: string;
  notes?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface Contact {
  id?: number;
  firstName: string;
  lastName: string;
  email?: string;
  phone?: string;
  title?: string;
  companyId?: number;
  address?: string;
  city?: string;
  state?: string;
  zipCode?: string;
  country?: string;
  notes?: string;
  createdAt?: string;
  updatedAt?: string;
  company?: Company;
}

export interface Lead {
  id?: number;
  firstName: string;
  lastName: string;
  email?: string;
  phone?: string;
  company?: string;
  title?: string;
  source?: string;
  status: 'new' | 'contacted' | 'qualified' | 'lost';
  value?: number;
  notes?: string;
  assignedTo?: number;
  createdAt?: string;
  updatedAt?: string;
  assignedUser?: User;
}

export interface Deal {
  id?: number;
  title: string;
  value: number;
  stage: 'prospecting' | 'qualification' | 'proposal' | 'negotiation' | 'closed-won' | 'closed-lost';
  probability: number;
  closeDate?: string;
  contactId?: number;
  companyId?: number;
  assignedTo?: number;
  notes?: string;
  createdAt?: string;
  updatedAt?: string;
  contact?: Contact;
  company?: Company;
  assignedUser?: User;
}

export interface Task {
  id?: number;
  title: string;
  description?: string;
  dueDate?: string;
  priority: 'low' | 'medium' | 'high';
  status: 'pending' | 'in-progress' | 'completed';
  assignedTo?: number;
  contactId?: number;
  companyId?: number;
  dealId?: number;
  createdAt?: string;
  updatedAt?: string;
  assignedUser?: User;
  contact?: Contact;
  company?: Company;
  deal?: Deal;
}

export interface Activity {
  id?: number;
  type: string;
  description: string;
  contactId?: number;
  companyId?: number;
  dealId?: number;
  userId?: number;
  createdAt?: string;
  contact?: Contact;
  company?: Company;
  deal?: Deal;
  user?: User;
}