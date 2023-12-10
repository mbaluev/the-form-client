export type OrNull<T> = { [K in keyof T]: T[K] | null };
