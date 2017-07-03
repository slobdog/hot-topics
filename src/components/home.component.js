import React from 'react';

import Timer from './timer.component';

let Home = (props) => {
  return (
    <div className="wrapper wrapper-home">
      <div className="main-img">
        <img src="img/assets_megaphone.png" alt="megaphone" className="main-img__image" />
      </div>
      <div className="new-game">
        <h1 className="new-game__title">HOT<br /> TOPIC</h1>
        <img src="img/assets_fire.png" alt="fire" className="new-game__image" />
        <a onClick={props.startNewGame} className="new-game__button new-game__button--green">NEW GAME</a><br />
        <a onClick={props.howToPlay} className="new-game__button new-game__button--orange">HOW TO PLAY</a>
      </div>
    </div>
  );
};

export default Home;
