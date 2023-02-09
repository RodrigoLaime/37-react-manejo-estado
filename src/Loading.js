import React from "react";

class Loading extends React.Component {

  //metodos CICLOS DE VIDA
  componentWillUnmount() {
    console.log("componentWillUnmount")
  }

  render() {
    return (
      <p>Cargando...</p>
    );
  }

}

export { Loading }