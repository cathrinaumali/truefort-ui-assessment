export type STATUS = "REGISTERED" | "INITIATED";
export interface UserData {
  userId: string;
  firstName: string;
  lastName: string;
  email: string;
  status: STATUS;
  createdOn: string;
  id?: string;
}

export interface ColumnProps<T> {
  id: keyof T;
  align: "left" | "right" | "center" | "inherit" | "justify" | undefined;
  label: string;
}

export interface UiTableProps<T> {
  data: T[];
  columns: ColumnProps<T>[];
  onSelect: (selected: string[]) => void;
}

export interface FormData {
  userId: string;
  firstName: string;
  lastName: string;
  email: string;
  id?: string;
}
