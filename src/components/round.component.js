import React, { Component } from 'react';

class Round extends Component {
  constructor(props) {
    super(props)
    this.state = {
      score: 0
    };
    this.onRoundReset = this.onRoundReset.bind(this);
  }
  changeScore(delta) {
    let changedScore = this.state.score + delta;
    if (changedScore >= 0 && changedScore <= 99) {
      this.setState({
        score: changedScore
      });
    }
  }
  onRoundReset() {
    this.setState({score: 0})
  }
  render() {
    return(
      <div className="wrapper">
        <header className="header header--team">
          <h1 className="header__title">TEAM<span className="header__title--number">{this.props.currentTeam}</span></h1>
        </header>
        <div className="content container">
          <div className="row">
            <div className="col-md-4 team-wrapper">
              <div className="timer">
                <div className="item html">
                    <h2 className="timer__numbers">0</h2>
                    <svg width="250" height="250" xmlns="http://www.w3.org/2000/svg">
                    <g>
                      <title>Layer 1</title>
                      <circle id="circle" className="circle_animation" r="85" cy="120" cx="120" strokeWidth="15" stroke="#ffd22f" fill="none"/>
                    </g>
                    </svg>
                </div>
              </div>
            </div>
            <div className="col-md-4 team-wrapper">
              <h1 className="category-title">BOOKS</h1>
            </div>
            <div className="col-md-4 team-wrapper">
              <div className="score"><span className="score__title">SCORE</span>
                <ul className="score-list">
                  <li className="score-list__item">
                    <span className="score-list__number score-list__number--first">0</span>
                  </li>
                  <li className="score-list__item">
                    <span className="score-list__number">{this.state.score}</span>
                  </li>
                </ul>
                <span className="score-plus" onClick={() => {this.changeScore(1)}}></span>
                <span className="score-minus" onClick={() => {this.changeScore(-1)}}></span>
              </div>
              <a className="content__button content__button--black score__button score__button--reset" onClick={this.onRoundReset}>RESET</a>
              <a className="content__button content__button--black score__button" onClick={() => {this.props.onRoundFinish(this.state.score)}}>FINISH</a>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Round;
