interface PersonState {
  name: string;
  lastname: string;
}

interface Actions {
  setFirstName: (value: string) => void;
  setlastName: (value: string) => void;
}

export type StateStore = PersonState & Actions;