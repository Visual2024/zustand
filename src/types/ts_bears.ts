interface bears {
  id: number;
  name: string;
}
export interface BearsState {
  //todo - Tipando nuestros paramentros
  blackBears: number;
  polarBears: number;
  pandaBears: number;

  bears: bears[];

  computer: {
    totalBears: number;
  }

  doNothing: () => void;

  increaseBlackBears: (by: number) => void;
  increasePolarBears: (by: number) => void;
  increasePandaBears: (by: number) => void;

  addbear: () => void;
  allRemove: () => void;
  oneRemoveBears: () => void;
}
