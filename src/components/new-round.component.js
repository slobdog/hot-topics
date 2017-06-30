import React, { Component } from 'react';

class NewRound extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return(
      <div className="wrapper wrapper-round">
        <div className="main-img main-img--round">
          <img src="img/assets_megaphone.png" alt="megaphone" className="main-img__image" />
        </div>
        <div className="new-game new-game--round">
          <h1 className="new-game__title">ROUND
            <span className="new-game__round">{this.props.currentRound}</span>
          </h1>
        </div>
        <a className="content__button content__button--red content__button--end" onClick={this.props.onGameEnd}>END GAME</a>
        <div className="next-buttons">
          <a className="content__button content__button--black" onClick={this.props.backToScoreboard}>STANDINGS</a>
          <a href="#" className="content__button content__button--green" onClick={this.props.startRound}>LET'S GO!</a>
        </div>
      </div>
    );
  }
}

export default NewRound;
