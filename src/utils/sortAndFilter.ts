import type { User } from '../types/user';
import type { SortType } from '../types/filters';

export const filterUsers = (users: User[], query: string): User[] => {
  const q = query.trim().toLowerCase();
  if (!q) return users;

  return users.filter((u) => {
    const fullName = `${u.firstName} ${u.lastName}`.toLowerCase();
    const tag = u.userTag.toLowerCase();
    return fullName.includes(q) || tag.includes(q);
  });
};

const dayOfYear = (date: Date): number => {
  const start = new Date(date.getFullYear(), 0, 0);
  const diff = date.getTime() - start.getTime();
  return Math.floor(diff / (1000 * 60 * 60 * 24));
};

const nextBirthdayDate = (birthday: string): Date => {
  const now = new Date();
  const bday = new Date(birthday);
  const thisYear = new Date(now.getFullYear(), bday.getMonth(), bday.getDate());
  return thisYear >= now
    ? thisYear
    : new Date(now.getFullYear() + 1, bday.getMonth(), bday.getDate());
};

export const sortUsers = (users: User[], sortType: SortType): User[] => {
  const copy = [...users];
  if (sortType === 'alphabet') {
    return copy.sort((a, b) =>
      `${a.firstName} ${a.lastName}`.localeCompare(
        `${b.firstName} ${b.lastName}`
      )
    );
  }
  return copy.sort(
    (a, b) => nextBirthdayDate(a.birthday).getTime() - nextBirthdayDate(b.birthday).getTime()
  );
};

export interface GroupedUsers {
  year?: number;
  users: User[];
}

export const groupByBirthdayYear = (users: User[]): GroupedUsers[] => {
  const now = new Date();
  const currentYear = now.getFullYear();

  const groups: Record<number, User[]> = {};
  users.forEach((u) => {
    const year = nextBirthdayDate(u.birthday).getFullYear();
    if (!groups[year]) groups[year] = [];
    groups[year].push(u);
  });

  return Object.keys(groups)
    .map(Number)
    .sort((a, b) => a - b)
    .map((year) => ({
      year: year === currentYear ? undefined : year,
      users: groups[year],
    }));
};