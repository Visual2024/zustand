

# Paso 1: Creando un Store Básico en Zustand

En Zustand, un "store" es un hook. Puedes poner cualquier cosa en él: primitivas, objetos, funciones.

Para crear un store, importas la función `create` de Zustand.

```javascript
import { create } from 'zustand'

const useBearStore = create((set) => ({
  bears: 0,
  increasePopulation: () => set((state) => ({ bears: state.bears + 1 })),
  removeAllBears: () => set({ bears: 0 }),
}))
```

```javascript
import { create } from 'zustand'

interface BreadState {
  // todo - Los datos que vamos a usar o enviar 
  pandaBlack : number

  // Funciones que va a ejecutar
  increment: (by: number) => void
}

const useStoreBeard = create<BreadState>()((set)=>({
  beards : 10,

  // Funciones
  increment: () => set((state) => ({bears: state.bears + by}))

}))


```


### Explicación:

1.  **`create`**: Esta es la función principal que usarás para crear tu store.
2.  **`set`**: La función `set` es la forma en que modificas el estado. Recibe una función que te da el estado actual (`state`) y debe devolver un objeto con los nuevos valores que quieres actualizar. También puedes usar `set({ ... })` para reemplazar el estado.
