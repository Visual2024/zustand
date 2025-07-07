# Introducción a Zustand

Zustand es una biblioteca de gestión de estado para React, pequeña, rápida y escalable. Su principal atractivo es la simplicidad y el bajo nivel de "boilerplate" (código repetitivo) que requiere.

### ¿Para qué se usa?

Se utiliza para manejar el estado global de una aplicación de React de una manera sencilla y centralizada. Es una alternativa a otras bibliotecas como Redux o Context API, pero con una sintaxis mucho más simple y un rendimiento optimizado, ya que los componentes solo se vuelven a renderizar cuando cambia la parte específica del estado a la que están suscritos.

---

### Instalación

Puedes instalar Zustand usando npm o yarn:

```bash
# Con NPM
npm install zustand

# Con Yarn
yarn add zustand
```

---

### Configuración y Creación de un Store

No requiere una configuración compleja con "Providers" como la Context API. Simplemente creas un "store" y lo exportas para usarlo en tus componentes.

Un store es un hook que se crea con la función `create` de Zustand.

```javascript
import { create } from 'zustand'

const useBearStore = create((set) => ({
  bears: 0,
  increasePopulation: () => set((state) => ({ bears: state.bears + 1 })),
  removeAllBears: () => set({ bears: 0 }),
}))

export default useBearStore;
```

---

### Uso con TypeScript

Zustand tiene un excelente soporte para TypeScript. Para tipar tu store, primero defines una interfaz con el "shape" (la forma) de tu estado y tus acciones.

```typescript
import { create } from 'zustand'

// 1. Definir la interfaz del estado y las acciones
interface BearState {
  bears: number;
  increasePopulation: () => void;
  removeAllBears: () => void;
}

// 2. Crear el store usando la interfaz
const useBearStore = create<BearState>()((set) => ({
  bears: 0,
  increasePopulation: () => set((state) => ({ bears: state.bears + 1 })),
  removeAllBears: () => set({ bears: 0 }),
}))

export default useBearStore;
```
Al pasar `BearState` a `create<BearState>()`, Zustand se asegura de que la implementación de tu store cumpla con la interfaz definida.

---

### ¿Qué son `set` y `get`?

La función que define el store recibe dos argumentos: `set` y `get`.

*   **`set`**: Es la función que usas para actualizar el estado.
    *   **Sobrescribiendo el estado**: `set({ bears: 0 })` reemplaza el valor de `bears` en el estado.
    *   **Usando el estado anterior**: `set(state => ({ bears: state.bears + 1 }))` te da acceso al estado actual para calcular el nuevo estado. Esto es útil para evitar condiciones de carrera.

*   **`get`**: Es una función que te permite acceder al estado actual del store *dentro de una acción*. Es útil cuando una acción necesita leer otra pieza del estado para realizar su lógica.

```typescript
import { create } from 'zustand'

interface AppState {
  bears: number;
  fishes: number;
  eatFish: () => void;
}

const useAppStore = create<AppState>()((set, get) => ({
  bears: 0,
  fishes: 10,
  eatFish: () => {
    // Usamos get() para leer el número de peces
    const fishCount = get().fishes;

    if (fishCount > 0) {
      set(state => ({
        fishes: state.fishes - 1,
      }));
    }
  },
}))
```

---

  ### Stores Anidados (Pattern "Slices")

Para organizar stores grandes y complejos, puedes dividirlos en "slices" (rebanadas). Cada slice es una parte del estado con su propia lógica y se combina para formar el store completo.

Para hacerlo de forma segura con TypeScript, se recomienda usar `StateCreator`.

```typescript
import { create, StateCreator } from 'zustand'

// --- Slice de Osos ---
interface BearSlice {
  bears: number;
  addBear: () => void;
}
const createBearSlice: StateCreator<BearSlice> = (set) => ({
  bears: 0,
  addBear: () => set((state) => ({ bears: state.bears + 1 })),
})


// --- Slice de Peces ---
interface FishSlice {
  fishes: number;
  addFish: () => void;
}
const createFishSlice: StateCreator<FishSlice> = (set) => ({
  fishes: 0,
  addFish: () => set((state) => ({ fishes: state.fishes + 1 })),
})


// --- Store Combinado ---
// El tipo combinado usa una intersección de los tipos de los slices (&)
const useBoundStore = create<BearSlice & FishSlice>()((...a) => ({
    ...createBearSlice(...a),
    ...createFishSlice(...a),
}))

// Ahora puedes acceder a todo desde un único store
// const bears = useBoundStore(state => state.bears);
// const addFish = useBoundStore(state => state.addFish);
```
