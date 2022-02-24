import React from 'react';
import PropTypes from 'prop-types';

class Form extends React.Component {
  render() {
    const {
      cardName,
      cardDescription,
      cardAttr1,
      cardAttr2,
      cardAttr3,
      cardImage,
      cardRare,
      cardTrunfo,
      isSaveButtonDisabled,
      onInputChange,
      onSaveButtonClick } = this.props;

    return (
      <form>
        <label htmlFor="cardName">
          Nome da Carta
          <input
            type="text"
            name="cardName"
            data-testid="name-input"
            value={ cardName }
            onChange={ onInputChange }
          />
        </label>

        <label htmlFor="cardDescription">
          Descrição da Carta
          <textarea
            name="cardDescription"
            data-testid="description-input"
            value={ cardDescription }
            onChange={ onInputChange }
          />
        </label>

        <label htmlFor="cardAttr1">
          Atributo 1:
          <input
            type="number"
            name="cardAttr1"
            data-testid="attr1-input"
            min="0"
            max="90"
            value={ cardAttr1 }
            onChange={ onInputChange }
          />
        </label>

        <label htmlFor="cardAttr2">
          Atributo 2:
          <input
            type="number"
            name="cardAttr2"
            data-testid="attr2-input"
            min="0"
            max="90"
            value={ cardAttr2 }
            onChange={ onInputChange }
          />
        </label>

        <label htmlFor="cardAttr3">
          Atributo 3:
          <input
            type="number"
            name="cardAttr3"
            data-testid="attr3-input"
            min="0"
            max="90"
            value={ cardAttr3 }
            onChange={ onInputChange }
          />
        </label>

        <label htmlFor="cardImage">
          Informe o caminhao para a imagem:
          <input
            type="text"
            name="cardImage"
            data-testid="image-input"
            value={ cardImage }
            onChange={ onInputChange }
          />
        </label>

        <label htmlFor="cardRare">
          Selecione a raridade da carta:
          <select
            name="cardRare"
            data-testid="rare-input"
            value={ cardRare }
            onChange={ onInputChange }
          >
            <option value="normal">Normal</option>
            <option value="raro">Raro</option>
            <option value="muito raro">Muito raro</option>
          </select>
        </label>

        <label htmlFor="cardTrunfo">
          <input
            type="checkbox"
            name="cardTrunfo"
            data-testid="trunfo-input"
            checked={ cardTrunfo }
            onChange={ onInputChange }
          />
          Super Trunfo
        </label>

        <button
          type="submit"
          data-testid="save-button"
          disabled={ isSaveButtonDisabled }
          onClick={ onSaveButtonClick }
        >
          Salvar
        </button>
      </form>
    );
  }
}

Form.propTypes = {
  cardName: PropTypes.string.isRequired,
  cardDescription: PropTypes.string.isRequired,
  cardAttr1: PropTypes.string.isRequired,
  cardAttr2: PropTypes.string.isRequired,
  cardAttr3: PropTypes.string.isRequired,
  cardImage: PropTypes.string.isRequired,
  cardRare: PropTypes.string.isRequired,
  cardTrunfo: PropTypes.bool.isRequired,
  // hasTrunfo: PropTypes.bool.isRequired,
  isSaveButtonDisabled: PropTypes.bool.isRequired,
  onInputChange: PropTypes.func.isRequired,
  onSaveButtonClick: PropTypes.func.isRequired,
};

export default Form;
