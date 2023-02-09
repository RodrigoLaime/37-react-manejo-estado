const initialState = {
  value: '',
  error: false,
  loading: false,
  deleted: false,
  confirmed: false,
}

const reduceIf = (state, action) => {
  if (action.type === 'ERROR') {
    return {
      ...state,
      error: true,
      loading: false,
    };
  } else if (action.type === 'CHECK') {
    return {
      ...state,
      loading: true
    }
  } else {
    return {
      ...state
    };
  }
}

const reduceSwitch = (state, action) => {
  switch (action) {
    case 'ERROR':
      return {
        ...state,
        error: true,
        loading: false,
      };
    case 'CHECK':
      return {
        ...state,
        loading: true
      }
    default:
      return {
        ...state
      };
  }
}

const reduceObject = (state) => ({
  'ERROR': {
    ...state,
    error: true,
    loading: false,
  },
  'CHECK': {
    ...state,
    loading: true,
  }
});

const reduce = (state, action) => {
  //si dentro de ese obj existe algun objeto que se llame como nuestro action type
  if (reduceObject(state)[action.type]) {
    return reduceObject(state)[action.type]
  } else {
    return state;
  }
}
