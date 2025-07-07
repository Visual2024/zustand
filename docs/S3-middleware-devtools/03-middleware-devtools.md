# Paso 3: Middleware (DevTools)

Zustand tiene un ecosistema de middleware que te permite extender su funcionalidad. Uno de los más útiles es `devtools`, que integra tu store con las Redux DevTools.

```javascript
import { create } from 'zustand'
import { devtools } from 'zustand/middleware'

const useBearStore = create(devtools((set) => ({
  bears: 0,
  increasePopulation: () => set((state) => ({ bears: state.bears + 1 })),
  removeAllBears: () => set({ bears: 0 }),
})))
```

### Explicación:

1.  **`devtools`**: Importas `devtools` desde `zustand/middleware`.
2.  **Envolver el Store**: Envuelves la definición de tu store con la función `devtools`. Esto es todo lo que necesitas para conectar tu store a las Redux DevTools, permitiéndote inspeccionar el estado y las acciones en tu navegador.
