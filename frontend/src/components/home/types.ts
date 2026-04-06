export interface ShoppingItem {
  id: string | number;
  title: string;
  count: string | number;
  completed: boolean;
}

export interface ShoppingHeaderProps {
  title: string;
  setTitle: (val: string) => void;
  count: string;
  setCount: (val: string) => void;
  onAdd: () => void;
}

export interface ShoppingItemProps {
  id: string | number;
  count: string | number;
  title: string;
  completed?: boolean;
  onDelete: (id: string | number) => void;
  onToggle?: (id: string | number, completed: boolean) => void;
}

export interface ShoppingListProps {
  items: ShoppingItem[];
  onDelete: (id: string | number) => void;
  onToggle: (id: string | number, completed: boolean) => void;
}
