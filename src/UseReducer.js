import React from "react";

const SECURITY_CODE = 'cantera';

function UseReducer({ name }) {

  const [state, dispatch] = React.useReducer(reducer, initialState)

  console.log(state)

  const onConfirm = () => dispatch({ type: actionType.confirm });
  const onError = () => dispatch({ type: actionType.error });
  const onCheck = () => dispatch({ type: actionType.check });
  const onDelete = () => dispatch({ type: actionType.delete });
  const onReset = () => dispatch({ type: actionType.reset });
  const onWrite = (newValue) => {
    dispatch({ type: actionType.write, payload: newValue })
  }



  React.useEffect(() => {
    console.log("Empezando el effecto")
    if (!!state.loading) {
      setTimeout(() => {
        console.log("Haciendo la validacion")
        if (state.value === SECURITY_CODE) {
          onConfirm()
        } else {
          onError()
        }


        console.log("Terminando la validacion")
      }, 3000);
    }
    console.log("Terminando el effecto")
  }, [state.loading])

  if (!state.deleted && !state.confirmed) {
    return (
      <React.Fragment>
        <h2>Eliminar {name}</h2>
        <p>Por favor, escribe el codigo de seguridad</p>
        {(state.error && !state.loading) && (
          <p>Error: el codigo es incorrecto</p>
        )}
        {state.loading && (
          <p>Cargando...</p>
        )}
        <input
          placeholder="Codigo de seguridad"
          value={state.value}
          onChange={(event) => {
            onWrite(event.target.value);
          }}
        />
        <button
          onClick={onCheck}
        >
          Comprobar
        </button>
      </React.Fragment >
    );
  } else if (!state.deleted && !!state.confirmed) {
    return (
      <React.Fragment>
        <p>Confirmar. ¿Estas seguro?</p>
        <button
          onClick={onDelete}
        >
          Eliminar
        </button>
        <button
          onClick={onReset}
        >
          Cancelar
        </button>
      </React.Fragment >
    );
  } else {
    return (
      <React.Fragment>
        <p>Eliminado correctamente</p>
        <button
          onClick={onReset}
        >Revertir</button>
      </React.Fragment>
    )
  }
}

// ####################
const initialState = {
  value: '',
  error: false,
  loading: false,
  deleted: false,
  confirmed: false,
}

const actionType = {
  confirm: 'CONFIRM',
  error: 'ERROR',
  delete: 'DELETE',
  write: 'WRITE',
  reset: 'RESET',
  check: 'CHECK',
}

const reduceObject = (state, payload) => ({
  [actionType.confirm]: {
    ...state,
    error: false,
    loading: false,
    confirmed: true,
  },
  [actionType.error]: {
    ...state,
    error: true,
    loading: false,
  },
  [actionType.write]: {
    ...state,
    value: payload,
  },
  [actionType.check]: {
    ...state,
    loading: true,
  },
  [actionType.delete]: {
    ...state,
    deleted: true
  },
  [actionType.reset]: {
    ...state,
    confirmed: false,
    deleted: false,
    value: '',
  },
});

const reducer = (state, action) => {
  //si dentro de ese obj existe algun objeto que se llame como nuestro action type
  if (reduceObject(state)[action.type]) {
    return reduceObject(state, action.payload)[action.type]
  } else {
    return state;
  }
}

export { UseReducer }