import { create } from "zustand";

type Database = {
  _id: string;
  name: string;
};

type DatabaseStoreType = {
  databases: Database[];
  addDatabase: (database: Database) => void;
  setDatabase: (databases: Database[]) => void;
};

const useDatabaseStore = create<DatabaseStoreType>((set) => ({
  databases: [
    {
      _id: "1",
      name: "MongoDB",
    },
  ],
  addDatabase: (database) =>
    set((state) => ({
      databases: [...state.databases, database],
    })),
  setDatabase: (databases) =>
    set((state) => ({
      databases,
    })),
}));

export { useDatabaseStore };
