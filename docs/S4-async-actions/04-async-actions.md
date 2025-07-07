# Paso 4: Acciones Asíncronas

Zustand hace que el manejo de acciones asíncronas sea muy sencillo. No necesitas ningún middleware especial como `redux-thunk` o `redux-saga`.

```javascript
import { create } from 'zustand'

const useBearStore = create((set) => ({
  bears: 0,
  fetchBears: async (url) => {
    const response = await fetch(url)
    const data = await response.json()
    set({ bears: data.bears })
  },
}))
```

### Explicación:

1.  **`async/await`**: Simplemente puedes usar `async/await` dentro de las acciones de tu store.
2.  **`set`**: Después de que tu operación asíncrona se complete, llamas a `set` para actualizar el estado con los nuevos datos.
