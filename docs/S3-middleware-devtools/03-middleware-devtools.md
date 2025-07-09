# Paso 3: Middleware en Zustand

Zustand cuenta con un poderoso ecosistema de middlewares que te permiten extender su funcionalidad de manera sencilla. Los middlewares son funciones de orden superior que envuelven la definición de tu store para añadirle capacidades extra.

## Middleware `devtools`

El middleware `devtools` es una de las herramientas más útiles para depurar, ya que integra tu store con las **Redux DevTools**, una extensión de navegador que te permite inspeccionar el estado, viajar en el tiempo y analizar las acciones que se disparan.

### Uso Básico

Para implementarlo, simplemente importa `devtools` desde `zustand/middleware` y envuelve la función de creación de tu store.

```typescript
import { create } from 'zustand'
import { devtools } from 'zustand/middleware'

// Definición del store envuelta en devtools
const useBearStore = create(
  devtools(
    (set) => ({
      bears: 0,
      increasePopulation: () => set((state) => ({ bears: state.bears + 1 }), false, 'increasePopulation'),
      removeAllBears: () => set({ bears: 0 }, false, 'removeAllBears'),
    })
  )
)
```

**Recomendación:** Es una buena práctica añadir un nombre a cada acción en el `set` para identificarla fácilmente en las DevTools. El segundo argumento del `set` (`false`) indica que no se reemplaza el estado, y el tercero es el nombre de la acción.

### Nombrando el Store

Para evitar confusiones cuando tienes múltiples stores, puedes asignarle un nombre único a cada uno en las DevTools.

```typescript
import { devtools } from 'zustand/middleware'

// El segundo argumento de devtools es el nombre del store
const useBearStore = create(
  devtools(
    //... definicion del store
  , { name: 'Bears Store' })
)
```

## Middleware `persist`

`persist` es un middleware que te permite guardar el estado de tu store en un almacenamiento (como `localStorage` o `sessionStorage`) y rehidratarlo automáticamente cuando el usuario recarga la página.

### Uso Básico

Para usarlo, importa `persist` y envuelve la definición de tu store. Es crucial proporcionar un nombre (`name`) único, que se usará como clave en el almacenamiento.

```typescript
import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface PersonState {
  name: string;
  lastname: string;
}

interface Actions {
  setFirstName: (value: string) => void;
  setLastName: (value: string) => void;
}

// El store persistirá en localStorage bajo la clave 'person-storage'
export const usePersonStore = create<PersonState & Actions>()(
  persist(
    (set) => ({
      name: "",
      lastname: "",
      setFirstName: (value) => set({ name: value }),
      setLastName: (value) => set({ lastname: value }),
    }),
    { name: "person-storage" }
  )
);
```

### Opciones de `persist`

El middleware `persist` acepta un segundo argumento con varias opciones de configuración:

-   `name`: (Requerido) El nombre único para el almacenamiento.
-   `storage`: (Opcional) Define qué API de almacenamiento usar. Por defecto es `localStorage`. Puedes usar `sessionStorage` o crear tu propio storage.
-   `partialize`: (Opcional) Una función que recibe el estado y devuelve un objeto con solo las propiedades que quieres persistir. Esto es útil para excluir datos sensibles o no necesarios.

```typescript
// Ejemplo de `partialize` para guardar solo el nombre
persist(
  (set, get) => ({
    name: "",
    lastname: "",
    // ... actions
  }),
  {
    name: "person-storage",
    partialize: (state) => ({ name: state.name }),
  }
)
```

### Almacenamiento Personalizado (`Custom Storage`)

Puedes definir un motor de almacenamiento personalizado si necesitas un comportamiento específico, como guardar en `sessionStorage` o incluso en una base de datos asíncrona. Para ello, se utiliza `createJSONStorage`.

```typescript
import { createJSONStorage, persist } from "zustand/middleware";

// ...

persist(
  storeApi, // Tu definición de store
  {
    name: "person-storage",
    // Usa sessionStorage en lugar de localStorage
    storage: createJSONStorage(() => sessionStorage),
  }
)
```

## Combinando Middlewares

Es muy común querer usar `devtools` y `persist` juntos. Para ello, simplemente anida las llamadas. El orden importa: `devtools` debería envolver a `persist` para que las acciones de rehidratación de `persist` también sean visibles en las DevTools.

```typescript
import { create } from 'zustand'
import { devtools, persist } from 'zustand/middleware'

export const useAuthStore = create(
  devtools(
    persist(
      (set) => ({
        token: null,
        user: null,
        login: (token, user) => set({ token, user }, false, 'LOGIN'),
        logout: () => set({ token: null, user: null }, false, 'LOGOUT'),
      }),
      {
        name: 'auth-storage', // Nombre para persistencia
      }
    ),
    {
      name: 'Auth Store', // Nombre para DevTools
    }
  )
)
```

Con esta configuración, tu store `useAuthStore` persistirá su estado en `localStorage` y, al mismo tiempo, podrás depurarlo cómodamente con las Redux DevTools.