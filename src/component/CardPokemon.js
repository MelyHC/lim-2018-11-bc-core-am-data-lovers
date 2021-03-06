import React from 'react';
import { Link } from 'react-router-dom';

const CardPokemon = ({ name, img, updatePokemon, num, topPage }) => {
  return (
    <div className="col-6 col-sm-3 col-lg-2 text-center mb-2 mb-md-3 pr-2 pl-2 pr-md-3 pl-md-3">
      <Link to={`/${num}`} onClick={() => { updatePokemon(num); topPage(); }} className="card text-dark">
        <figure className="m-0">
          <img src={img} alt={name} className="img-fluid m-2" />
        </figure>
        <h5>{name}</h5>
      </Link>
    </div>
  )
}

export default CardPokemon;