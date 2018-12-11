import React from 'react';
import { Link } from 'react-router-dom'

const CardPokemon = ({ num, name, img }) => {
  return (
    <Link to={`/${name}`} className="col-6 col-sm-3 col-lg-2 text-center mb-2 pr-2 pl-2">
      <div className="card text-dark">
        <img src={img} className="img-fluid m-2" />
        <h4>{name}</h4>
        <b>{num}</b>
      </div>
    </Link>
  )
}

export default CardPokemon;