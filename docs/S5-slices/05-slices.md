# Paso 5: Slices

Para stores más complejos, puedes dividir tu estado en "slices". Esto te ayuda a organizar tu código y a mantenerlo más manejable.

```javascript
import { create } from 'zustand'

const createBearSlice = (set) => ({
  bears: 0,
  addBear: () => set((state) => ({ bears: state.bears + 1 })),
})

const createFishSlice = (set) => ({
  fishes: 0,
  addFish: () => set((state) => ({ fishes: state.fishes + 1 })),
})

const useBoundStore = create((...a) => ({
  ...createBearSlice(...a),
  ...createFishSlice(...a),
}))
```

### Explicación:

1.  **`createSlice`**: Creas funciones que definen tus slices. Cada función recibe `set` y devuelve un objeto con el estado y las acciones de ese slice.
2.  **Combinar Slices**: En tu store principal, llamas a tus funciones de slice y combinas sus resultados usando el operador de propagación (`...`).
