import React from 'react';
import PropTypes from 'prop-types';

class Card extends React.Component {
  render() {
    const {
      cardName,
      cardDescription,
      cardAttr1,
      cardAttr2,
      cardAttr3,
      cardImage,
      cardRare,
      cardTrunfo } = this.props;

    return (
      <div className="card-view">
        <div className={ `card ${cardRare.split(' ').join('-')}` }>
          <h1 data-testid="name-card" className="card-name">{ cardName }</h1>

          <img src={ cardImage } alt={ cardName } data-testid="image-card" />

          <p data-testid="description-card" className="description">
            { cardDescription }
          </p>

          <span data-testid="attr1-card" className="Attr1">
            { `Attr1: ................ ${cardAttr1}` }
          </span>
          <span data-testid="attr2-card" className="Attr2">
            { `Attr2: ................ ${cardAttr2}` }
          </span>
          <span data-testid="attr3-card" className="Attr3">
            { `Attr3: ................ ${cardAttr3}` }
          </span>

          <span
            data-testid="rare-card"
            className="rarity"
          >
            { cardRare === 'm-raro' ? 'Muito Raro' : cardRare }
          </span>

          {
            cardTrunfo
              ? <p data-testid="trunfo-card" className="trunfo">Super Trunfo</p>
              : ''
          }

        </div>
      </div>
    );
  }
}

Card.propTypes = {
  cardName: PropTypes.string.isRequired,
  cardDescription: PropTypes.string.isRequired,
  cardAttr1: PropTypes.string.isRequired,
  cardAttr2: PropTypes.string.isRequired,
  cardAttr3: PropTypes.string.isRequired,
  cardImage: PropTypes.string.isRequired,
  cardRare: PropTypes.string.isRequired,
  cardTrunfo: PropTypes.bool.isRequired,
};

export default Card;
