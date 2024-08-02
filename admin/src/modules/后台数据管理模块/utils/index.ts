type RecordWithDates = { createdAt: Date | string; updatedAt: Date | string };

export function convertDatesToISO<T extends RecordWithDates>(
  record: T,
): Omit<T, 'createdAt' | 'updatedAt'> & {
  createdAt: string;
  updatedAt: string;
} {
  const { createdAt, updatedAt, ...rest } = record;

  return {
    ...rest,
    createdAt: createdAt instanceof Date ? createdAt.toISOString() : createdAt,
    updatedAt: updatedAt instanceof Date ? updatedAt.toISOString() : updatedAt,
  };
}
