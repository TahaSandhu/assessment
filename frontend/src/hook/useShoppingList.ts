'use client';
import { useEffect, useState, useCallback } from "react";
import {
  fetchTodosApi,
  addTodoApi,
  deleteTodoApi,
  updateTodoApi,
} from "@/services/api";
import { ShoppingItem } from "@/components/home/types";

export const useShoppingList = (initialLimit = 10) => {
  const [items, setItems] = useState<ShoppingItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadTodos = async () => {
      try {
        const response = await fetchTodosApi(initialLimit);
        const mappedItems = response.data.todos.map((t: any) => ({
          id: t.id,
          title: t.todo,
          count: t.userId,
          completed: t.completed,
        }));
        setItems(mappedItems);
      } catch (err) {
        console.error("Failed to fetch todos:", err);
      } finally {
        setLoading(false);
      }
    };

    loadTodos();
  }, [initialLimit]);

  const addItem = useCallback(async (title: string, count?: string) => {
    if (!title.trim()) return;

    const countValue = count?.trim() || Math.floor(Math.random() * 100).toString();
    const tempId = Date.now();

    const newItem: ShoppingItem = {
      id: tempId,
      title,
      count: countValue,
      completed: false,
    };

    setItems((prev) => [newItem, ...prev]);

    try {
      await addTodoApi(title, Number(countValue));
    } catch (err) {
      console.error("Failed to add todo:", err);
      setItems((prev) => prev.filter((item) => item.id !== tempId));
    }
  }, []);

  const deleteItem = useCallback(async (id: string | number) => {
    let deletedItem: ShoppingItem | undefined;

    setItems((prev) => {
      deletedItem = prev.find((item) => item.id === id);
      return prev.filter((item) => item.id !== id);
    });

    try {
      if (typeof id === "number" && id > 1000) return;
      await new Promise((res) => setTimeout(res, 200));
      await deleteTodoApi(id);
    } catch (err) {
      console.error("Failed to delete todo:", err);
      if (deletedItem) setItems((prev) => [...prev, deletedItem!]);
    }
  }, []);

  const toggleItem = useCallback(async (id: string | number, completed: boolean) => {
    setItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, completed } : item)),
    );

    try {
      if (typeof id === "number" && id > 1000) return;
      await updateTodoApi(id, completed);
    } catch (err) {
      console.error("Failed to toggle todo:", err);
      setItems((prev) =>
        prev.map((item) =>
          item.id === id ? { ...item, completed: !completed } : item,
        ),
      );
    }
  }, []);

  return {
    items,
    loading,
    addItem,
    deleteItem,
    toggleItem,
  };
};