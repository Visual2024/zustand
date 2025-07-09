import { StateStorage, createJSONStorage } from "zustand/middleware";

const sectionStorageApi: StateStorage = {
    getItem: function (name: string): string | Promise<string | null> | null {
      const date = sessionStorage.getItem(name);
      return date;
    },
    setItem: function (name: string, value: string): void | Promise<void> {
      sessionStorage.setItem(name, value);
    },
    removeItem: function (name: string): Promise<void> | void {
      console.log(name);
    },
   
  };

export const customSectionStorage = createJSONStorage(() => sectionStorageApi);