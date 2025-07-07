//! Zustand no te va a obligar a hacer ciertars cosas
//* Creacion de Store
import { create } from "zustand";
import { BearsState } from "../../types/ts_bears";

 
export const useBearsStore = create<BearsState>()((set) => ({
  blackBears: 10,
  polarBears: 5,
  pandaBears: 1,

  bears : [{id: 1, name: 'Facundo'},{id: 2, name: 'Facundo'},{id: 3, name: 'Facundo'}],  

  //! Notar que el valor de "by" se va a sumar (no asignar) al valor actual de blackBears
  //? Si se pasa un negativo, se va a restar
  //* Esto pasa por la regla de los signos como vemos en matematica, end donde si tenemos un + y -, se va a restar.
  // ? valorActual = valorActual + (-1)
  increaseBlackBears: (by: number) => set((state) => ({ blackBears: state.blackBears + by })),
  increasePolarBears: (by: number) => set((state) => ({ polarBears: state.polarBears + by })),
  increasePandaBears: (by: number) => set((state) => ({ pandaBears: state.pandaBears + by })),

  doNothing: () => set((state)=>({bears: [...state.bears]})),

}));




