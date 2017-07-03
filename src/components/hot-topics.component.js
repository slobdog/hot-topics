import React, { Component } from 'react';

import Home from './home.component';
import HowToPlay from './how-to-play.component';
import NewGame from './new-game.component';
import Scoreboard from './scoreboard.component';

class HotTopics extends Component {

  constructor(props) {
    super(props);
    this.state = {
      gameStatus: 'home',
      gameOptions: {
        teams: 1,
        duration: 60,
        rounds: 3
      }
    }
    this.onTeamsChange = this.onTeamsChange.bind(this);
    this.onDurationChange = this.onDurationChange.bind(this);
    this.onRoundsChange = this.onRoundsChange.bind(this);
  }

  setGameStatus(option) {
    this.setState({gameStatus: option})
  }

  onTeamsChange(delta) {
    if (delta === 1
        && this.state.gameOptions.teams < 4
        || delta === -1
        && this.state.gameOptions.teams > 1) {
      this.state.gameOptions.teams += delta;
      this.setState(this.state);
    }
  }

  onDurationChange(delta) {
    if (delta === 10
        && this.state.gameOptions.duration < 100
        || delta === -10
        && this.state.gameOptions.duration > 10) {
      this.state.gameOptions.duration += delta;
      this.setState(this.state);
    }
  }

  onRoundsChange(delta) {
    if (delta === 1
        && this.state.gameOptions.rounds < 3
        || delta === -1
        && this.state.gameOptions.rounds > 1) {
      this.state.gameOptions.rounds += delta;
      this.setState(this.state);
    }
  }

  render() {
    let currentView = '';
    switch (this.state.gameStatus) {
      case 'home':
        currentView = <Home
          startNewGame={() => {this.setGameStatus('new-game')}}
          howToPlay={() => {this.setGameStatus('how-to-play')}} />;
        break;
      case 'new-game':
        currentView = <NewGame
          backToHomeScreen={() => {this.setGameStatus('home')}}
          teams={this.state.gameOptions.teams}
          onTeamsChange={this.onTeamsChange}
          duration={this.state.gameOptions.duration}
          onDurationChange={this.onDurationChange}
          rounds={this.state.gameOptions.rounds}
          onRoundsChange={this.onRoundsChange}
          startGame={() => {this.setGameStatus('scoreboard')}} />;
        break;
      case 'how-to-play':
        currentView = <HowToPlay
          backToHomeScreen={() => {this.setGameStatus('home')}} />;
        break;
      case 'scoreboard':
        currentView = <Scoreboard
          backToHomeScreen={() => {this.setGameStatus('home')}}
          startNewRound={() => {this.setGameStatus('new-round')}}
          teams={this.state.gameOptions.teams}
          rounds={this.state.gameOptions.rounds}
          duration={this.state.gameOptions.duration} />
        break;
    }

    return (
      <div>
        { currentView }
      </div>
    );
  };

}

export default HotTopics;
