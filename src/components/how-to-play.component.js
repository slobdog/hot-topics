import React from 'react';

let HowToPlay = (props) => {
  return (
    <div className="wrapper">
      <header className="header">
        <h1 className="header__title">HOW TO PLAY</h1>
        <div className="container">
          <h2 className="header__sub-title">Stay on topic for as long as possible! --dummy<br /> text here and below</h2>
        </div>
      </header>
      <div className="content container">
        <ul className="rules">
          <li className="rules__item clearfix">
            <img src="img/assets_team.png" alt="team" className="rules__img" />
            <span className="rules__description rules__description--one">Determine the number of teams</span>
          </li>
          <li className="rules__item clearfix">
            <img src="img/assets_clock.png" alt="clock" className="rules__img" />
            <span className="rules__description rules__description--one">Set the number of seconds per round, per team</span>
          </li>
          <li className="rules__item clearfix">
            <img src="img/assets_circle_check.png" alt="check" className="rules__img" />
            <span className="rules__description rules__description--one">Choose a topic for each round</span>
          </li>
          <li className="rules__item clearfix">
            <img src="img/assets_mouth.png" alt="mouth" className="rules__img" />
            <span className="rules__description">Each team member takes turns saying a word <br />related to the chosen topic</span>
          </li>
          <li className="rules__item clearfix">
            <img src="img/assets_X.png" alt="x" className="rules__img" />
            <span className="rules__description">Score as many points within the time limit <br />until a team member fails</span>
            <a className="content__button content__rules" onClick={props.backToHomeScreen}>BACK</a>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default HowToPlay;
