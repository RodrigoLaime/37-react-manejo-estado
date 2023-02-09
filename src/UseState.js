import React from "react";

const SECURITY_CODE = 'cantera';

function UseState({ name }) {

  const [state, setState] = React.useState({
    value: '',
    error: false,
    loading: false,
    deleted: false,
    confirmed: false,
  })
  //ESTADOS SIMPLES O INDEPENDIENTES
  /*   const [value, setValue] = React.useState('');
    const [error, setError] = React.useState(false);
    const [loading, setLoading] = React.useState(false); */

  const onConfirm = () => {
    setState({
      ...state,
      error: false,
      loading: false,
      confirmed: true,
    })
  }
  const onError = () => {
    setState({
      ...state,
      error: true,
      loading: false,
    })
  }
  const onWrite = (newValue) => {
    setState({
      ...state,
      value: newValue,
    })
  }
  const onCheck = () => {
    setState({
      ...state,
      loading: true,
    })
  }
  const onDelete = () => {
    setState({
      ...state,
      deleted: true
    })
  }
  const onReset = () => {
    setState({
      ...state,
      confirmed: false,
      deleted: false,
      value: '',
    })
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
          onClick={() => {
            onCheck()
          }}
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
          onClick={() => {
            onDelete()
          }}
        >
          Eliminar
        </button>
        <button
          onClick={() => {
            onReset();
          }}
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
          onClick={() => {
            onReset();
          }}
        >Revertir</button>
      </React.Fragment>
    )
  }
}

export { UseState }