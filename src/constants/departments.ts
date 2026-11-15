export interface Department {
  key: string;
  title: string;
}

export const DEPARTMENTS: Department[] = [
  { key: 'all', title: 'Все' },
  { key: 'android', title: 'Android' },
  { key: 'ios', title: 'iOS' },
  { key: 'design', title: 'Дизайн' },
  { key: 'management', title: 'Менеджмент' },
  { key: 'qa', title: 'QA' },
  { key: 'back_office', title: 'Бэк-офис' },
  { key: 'frontend', title: 'Frontend' },
  { key: 'hr', title: 'HR' },
  { key: 'pr', title: 'PR' },
  { key: 'backend', title: 'Backend' },
  { key: 'support', title: 'Техподдержка' },
  { key: 'analytics', title: 'Аналитика' },
];