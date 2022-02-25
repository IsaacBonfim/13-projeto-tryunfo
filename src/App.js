import React from 'react';

import Form from './components/Form';
import Card from './components/Card';

class App extends React.Component {
  constructor() {
    super();

    this.handleChange = this.handleChange.bind(this);
    this.nameFilter = this.nameFilter.bind(this);
    this.onSaveButtonClick = this.onSaveButtonClick.bind(this);
    this.rareFilter = this.rareFilter.bind(this);
    this.removeCard = this.removeCard.bind(this);
    this.trunfoFilter = this.trunfoFilter.bind(this);
    this.validate = this.validate.bind(this);

    this.state = {
      cardName: '',
      cardDescription: '',
      cardAttr1: '0',
      cardAttr2: '0',
      cardAttr3: '0',
      cardImage: '',
      cardRare: 'normal',
      cardTrunfo: false,
      hasTrunfo: false,
      isSaveButtonDisabled: true,
      cardDeck: [],
      searchName: '',
      searchRarity: 'todas',
      trunfoFilterActive: false,
    };
  }

  handleChange({ target }) {
    const { name } = target;
    const value = target.type === 'checkbox' ? target.checked : target.value;

    this.setState({
      [name]: value,
    }, () => this.validate());
  }

  onSaveButtonClick() {
    const {
      cardName, cardDescription, cardImage, cardRare, cardAttr1, cardAttr2,
      cardAttr3, cardTrunfo } = this.state;

    const card = {
      cardName,
      cardDescription,
      cardImage,
      cardRare,
      cardAttr1,
      cardAttr2,
      cardAttr3,
      cardTrunfo,
    };

    this.setState((prevState) => ({
      cardDeck: [...prevState.cardDeck, card],
      cardName: '',
      cardDescription: '',
      cardAttr1: '0',
      cardAttr2: '0',
      cardAttr3: '0',
      cardImage: '',
      cardRare: 'normal',
      cardTrunfo: false,
      isSaveButtonDisabled: true,
    }), () => this.setState((previous) => ({
      hasTrunfo: previous.cardDeck.some((carta) => carta.cardTrunfo === true),
    })));
  }

  nameFilter({ target }) {
    this.setState({ searchName: target.value });
  }

  rareFilter({ target }) {
    this.setState({ searchRarity: target.value });
  }

  removeCard(card) {
    const { cardDeck } = this.state;

    const newDeck = cardDeck.filter((carta) => carta !== card);

    this.setState({
      cardDeck: [...newDeck],
    }, () => this.setState((prev) => ({
      hasTrunfo: prev.cardDeck.some((carta) => carta.cardTrunfo === true),
    })));
  }

  trunfoFilter({ target }) {
    if (target.checked === true) {
      this.setState({ trunfoFilterActive: true });
    } else {
      this.setState({ trunfoFilterActive: false });
    }
  }

  validate() {
    const {
      cardName, cardDescription, cardImage, cardRare, cardAttr1, cardAttr2,
      cardAttr3 } = this.state;

    const sumAttrs = Number(cardAttr1) + Number(cardAttr2) + Number(cardAttr3);
    const top = 90;
    const max = 210;

    this.setState({
      isSaveButtonDisabled: !(cardName
        && cardDescription
        && cardImage
        && cardRare
        && sumAttrs <= max
        && Number(cardAttr1) <= top
        && Number(cardAttr1) >= 0
        && Number(cardAttr2) <= top
        && Number(cardAttr2) >= 0
        && Number(cardAttr3) <= top
        && Number(cardAttr3) >= 0),
    });
  }

  render() {
    const {
      cardName, cardDescription, cardAttr1, cardAttr2, cardAttr3, cardImage,
      cardRare, cardTrunfo, hasTrunfo, cardDeck, isSaveButtonDisabled,
      searchName, searchRarity, trunfoFilterActive } = this.state;

    return (
      <div>
        <h1>Tryunfo</h1>

        <Form
          cardName={ cardName }
          cardDescription={ cardDescription }
          cardAttr1={ cardAttr1 }
          cardAttr2={ cardAttr2 }
          cardAttr3={ cardAttr3 }
          cardImage={ cardImage }
          cardRare={ cardRare }
          cardTrunfo={ cardTrunfo }
          hasTrunfo={ hasTrunfo }
          isSaveButtonDisabled={ isSaveButtonDisabled }
          onInputChange={ this.handleChange }
          onSaveButtonClick={ this.onSaveButtonClick }
        />

        <Card
          cardName={ cardName }
          cardDescription={ cardDescription }
          cardAttr1={ cardAttr1 }
          cardAttr2={ cardAttr2 }
          cardAttr3={ cardAttr3 }
          cardImage={ cardImage }
          cardRare={ cardRare }
          cardTrunfo={ cardTrunfo }
        />

        <h2>Baralho de Cartas</h2>

        <label htmlFor="nameFilter">
          Filtro por Nomes:
          <input
            type="text"
            name="nameFilter"
            data-testid="name-filter"
            onChange={ this.nameFilter }
            disabled={ trunfoFilterActive }
          />
        </label>

        <label htmlFor="rarityFilter">
          Filtro por Raridade:
          <select
            name="rarityFilter"
            data-testid="rare-filter"
            onChange={ this.rareFilter }
            disabled={ trunfoFilterActive }
          >
            <option value="todas">Todas</option>
            <option value="normal">Normal</option>
            <option value="raro">Raro</option>
            <option value="muito raro">Muito raro</option>
          </select>
        </label>

        <label htmlFor="trunfoFilter">
          <input
            type="checkbox"
            name="trunfoFilter"
            data-testid="trunfo-filter"
            onChange={ this.trunfoFilter }
          />
          Super Trunfo
        </label>

        <ul>
          {
            cardDeck.filter((card) => (
              trunfoFilterActive === true
                ? card.cardTrunfo === true
                : card))
              .filter((card) => card.cardName.includes(searchName))
              .filter((card) => (
                searchRarity !== 'todas'
                  ? card.cardRare === searchRarity
                  : card.cardName))
              .map((card, index) => (
                <li key={ index }>
                  <Card
                    cardName={ card.cardName }
                    cardDescription={ card.cardDescription }
                    cardAttr1={ card.cardAttr1 }
                    cardAttr2={ card.cardAttr2 }
                    cardAttr3={ card.cardAttr3 }
                    cardImage={ card.cardImage }
                    cardRare={ card.cardRare }
                    cardTrunfo={ card.cardTrunfo }
                  />
                  <button
                    type="button"
                    data-testid="delete-button"
                    onClick={ () => this.removeCard(card) }
                  >
                    Excluir
                  </button>
                </li>
              ))
          }
        </ul>

      </div>
    );
  }
}

export default App;
