/* eslint-disable prefer-destructuring */
export const fromEntries = (arr: any[]) => arr.reduce((acc, curr) => {
  acc[curr[0]] = curr[1];
  return acc;
}, {});

export const formatDate = (date: Date) => date.toISOString().split('T')[0];
