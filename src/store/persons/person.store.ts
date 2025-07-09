import { type StateCreator, create } from "zustand";
import { persist } from "zustand/middleware";
import { StateStore } from "../../types/ts_persons";
import { customSectionStorage } from "../customs/section_storage";

const storeApi: StateCreator<StateStore> = (set) => ({
  name: "",
  lastname: "",

  setFirstName: (value: string) => set((state) => ({ name: value })),
  setlastName: (value: string) => set((state) => ({ lastname: value })),
});

export const usePersonStore = create<StateStore>()(
  persist(storeApi, {
    name: "person-storage",
    storage: customSectionStorage,
  })
);
