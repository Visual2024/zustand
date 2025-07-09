import { useShallow } from 'zustand/react/shallow';
import { WhiteCard } from '../../components';
import { useBearsStore } from '../../store';

export const BearPage = () => {
  return (
    <>
      <h1>Contador de Osos</h1>
      <p>Manejo de estado simple de Zustand</p>
      <hr />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
        <BlackBears />
        <PandaBears />
        <PolarBears />
        <Bear />
      </div>

    </>
  );
};

export const BlackBears = () => {

  const blackBears = useBearsStore(state => state.blackBears);
  // Estoy obteniendo la accion de aumentar la cantidad de osos negros desde el store
  const increaseBlackBears = useBearsStore(state => state.increaseBlackBears);

  return (
    <WhiteCard centered>
      <h2>Osos Negros</h2>

      <div key={1} className="flex flex-col md:flex-row">
        <button onClick={() => increaseBlackBears(+1)}> +1</button>
        <span className="text-3xl mx-2 lg:mx-10"> {blackBears} </span>
        <button onClick={() => increaseBlackBears(-1)}>-1</button>
      </div>

    </WhiteCard>
  )
}

export const PolarBears = () => {
  const polarBears = useBearsStore(state => state.polarBears);
  const increasePolarBears = useBearsStore(state => state.increasePolarBears);
  return (
    <WhiteCard centered>
      <h2>Osos Polares</h2>

      <div className="flex flex-col md:flex-row">
        <button onClick={() => increasePolarBears(+1)}> +1</button>
        <span className="text-3xl mx-2 lg:mx-10">{polarBears}</span>
        <button onClick={() => increasePolarBears(-1)}>-1</button>

      </div>

    </WhiteCard>

  )
}

export const PandaBears = () => {

  const pandaBears = useBearsStore(state => state.pandaBears);

  const increasePandaBears = useBearsStore(state => state.increasePandaBears);
  return (
    <WhiteCard centered>
      <h2>Osos Pandas</h2>

      <div className="flex flex-col md:flex-row">
        <button onClick={() => increasePandaBears(+1)}> +1</button>
        <span className="text-3xl mx-2 lg:mx-10"> {pandaBears} </span>
        <button onClick={() => increasePandaBears(-1)}>-1</button>
      </div>

    </WhiteCard>
  )
}

export const Bear = () => {

  const bears = useBearsStore(useShallow(state => state.bears));
  const doNothing = useBearsStore(state => state.doNothing);

  const addBears = useBearsStore(state => state.addbear);
  const removeBears = useBearsStore(state => state.allRemove);


  return (

    <WhiteCard>
      {/* Total de Osos */}
      <h1>Oso</h1>
      <div className='flex flex-col gap-y-4 '>
        <button className='' onClick={doNothing}>do nothing</button>
        <button className='' onClick={addBears}>Add Oso</button>
        <button className='' onClick={removeBears}>Eliminar todo</button>
      </div>
      <div className='flex flex-col'>
        <span className="font-bold">
          {bears.map((item) => {
            return <div key={item.id} className='flex flex-row gap-10'>
              <h3>{item.name}</h3>
              <h3>{item.id}</h3>
            </div>
          })}
        </span>

      </div>

      <pre>

      </pre>
    </WhiteCard>
  )
}