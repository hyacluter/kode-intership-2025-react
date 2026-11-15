import axios from 'axios';
import type { User, UsersResponse } from '../types/user';

const BASE_URL =
  'https://stoplight.io/mocks/kode-frontend-team/koder-stoplight/86566464/users';

export const fetchUsers = async (department?: string): Promise<User[]> => {
  const params: Record<string, string> = {};

  if (department && department !== 'all') {
    params.__example = department;
  } else {
    params.__example = 'all';
  }

  const { data } = await axios.get<UsersResponse>(BASE_URL, {
    params,
    headers: { 'Content-Type': 'application/json' },
  });

  return data.items ?? [];
};

export const fetchUserById = async (id: string): Promise<User | undefined> => {
  const users = await fetchUsers('all');
  return users.find((u) => u.id === id);
};