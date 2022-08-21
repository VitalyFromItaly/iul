import { formatISO } from 'date-fns';

export const formatDate = (date: string) => formatISO(new Date(date), { representation: 'date' })
  .split('-').reverse().join('.');

export const formatTime = (date: string) => formatISO(new Date(date), { representation: 'time' }).slice(0, -6);
