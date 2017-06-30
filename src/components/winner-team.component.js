import React from 'react';

let WinnerTeam = (props) => {
  return (
    <div>
      <div className="wrapper wrapper-team">
        <div className="container">
          <div className="row">
            <div className="results">
              <h1 className="results__pts">{props.winnerTeam.score} <br /> pts</h1>
              <img src="img/assets_trophy.png" alt="trophy" className="results__cup" />
              <img src="img/assets_winner_banner.png" alt="trophy" className="results__winner" />
            </div>
          </div>
        </div>
      </div>
      <header className="header header--results">
        <h1 className="header__title">TEAM<span className="header__title--number">{props.winnerTeam.team}</span></h1>
      </header>
      <div className="content__buttons content__buttons--total">
        <a className="content__button content__button--red" onClick={props.quitGame}>QUIT</a>
        <a className="content__button content__button--green" onClick={props.newGame}>NEW GAME</a>
      </div>
    </div>
  );
};

export default WinnerTeam;
