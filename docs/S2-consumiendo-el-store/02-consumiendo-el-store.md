# Paso 2: Consumiendo el Store

Una vez que has creado tu store, puedes usarlo en cualquier componente de React.

```javascript
import useBearStore from './stores/bearStore';

function BearCounter() {
  const bears = useBearStore((state) => state.bears)
  return <h1>{bears} around here ...</h1>
}

function Controls() {
  const increasePopulation = useBearStore((state) => state.increasePopulation)
  return <button onClick={increasePopulation}>one up</button>
}
```

### Explicación:

1.  **`useBearStore`**: Simplemente importa tu store como cualquier otro hook.
2.  **Selector**: Para acceder a una parte específica del estado (como `bears`), usas un selector. Esto es una función que recibe el estado completo y devuelve la parte que necesitas. Esto es útil para optimizar el rendimiento, ya que tu componente solo se volverá a renderizar si la parte del estado que seleccionaste cambia.
3.  **Acciones**: Las acciones (como `increasePopulation`) también se pueden acceder desde el store de la misma manera.
