import React, { Fragment } from 'react';

const Pokemon = ({ pokemons, pokeActual }) => {
  pokemons.forEach(objPoke => {
    if(objPoke.name === pokeActual) {
      return (
        <Fragment>
          <h1>{objPoke.name}</h1>
        </Fragment>
      )
    }
  });
}

export default Pokemon;