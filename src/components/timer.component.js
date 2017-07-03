import React, { Component } from 'react';

class Timer extends Component {

  constructor(props) {
    super(props)
    this.seconds = 0;
    this.text = 1;
    this.state = {
      time: 0
    }
    this.radius = null;
    this.fraction = null;
    this.timeoutIds = [];
    this.displayName = 'ReactCountdownClock';
    this.pauseTimer = this.pauseTimer.bind(this);
    this.startTimer = this.startTimer.bind(this);
  }

  componentDidUpdate(props) {
    if (props.seconds !== this.props.seconds) {
      this.seconds = props.seconds;
      this.setupTimer();
    }
    if (props.color !== this.props.color) {
      this.updateCanvas();
    }
    if (props.paused !== this.props.paused) {
      if (!this.props.paused) {
        this.startTimer();
      }
      if (this.props.paused) {
        return this.pauseTimer();
      }
    }
  };

  componentDidMount() {
    this.seconds = this.props.seconds;
    return this.setupTimer();
  };

  componentWillUnmount() {
    return this.cancelTimer();
  };

  resetAll() {
    this.seconds = this.props.seconds;
    return this.setupTimer();
  }

  setupTimer() {
    this.setScale();
    this.setupCanvases();
    this.drawTimer();
    this.seconds = this.props.seconds;
    this.setState({
      time: this.props.seconds
    })
    if (!this.props.paused) {
      return this.startTimer();
    }
  };

  updateCanvas() {
    this.clearTimer();
    return this.drawTimer();
  };

  setScale() {
    this.radius = this.props.size / 2;
    this.fraction = 2 / this.seconds;
    this.tickPeriod = this.calculateTick();
    return this._innerRadius = this.props.weight ? this.radius - this.props.weight : this.radius / 1.3  ;
  };

  calculateTick() {
    let tick, tickScale;
    tickScale = 1.8;
    tick = this.seconds * tickScale;
    if (tick > 1000) {
      return 1000;
    } else {
      return tick;
    }
  };

  setupCanvases() {
    this._background = this.refs.background.getContext('2d');
    this._timer = this.refs.timer.getContext('2d');
    this._timer.textAlign = 'center';
    this._timer.textBaseline = 'middle';
    if (this.props.onClick != null) {
      return this.refs.component.addEventListener('click', this.props.onClick);
    }
  };

  startTimer() {
    return this.timeoutIds.push(setTimeout(((function(_this) {
      return function() {
        return _this.tick();
      };
    })(this)), 200));
  };

  pauseTimer() {
    this.stopTimer();
    return this.updateCanvas();
  };

  stopTimer() {
    let i, len, ref, results, timeout;
    ref = this.timeoutIds;
    results = [];
    for (i = 0, len = ref.length; i < len; i++) {
      timeout = ref[i];
      results.push(clearTimeout(timeout));
    }
    return results;
  };

  cancelTimer() {
    this.stopTimer();
    if (this.props.onClick != null) {
      return this.refs.component.removeEventListener('click', this.props.onClick);
    }
  };

  tick() {
    let start;
    start = Date.now();
    return this.timeoutIds.push(setTimeout(((function(_this) {
      return function() {
        let duration;
        duration = (Date.now() - start) / 1000;
        _this.seconds -= duration;
        if (_this.seconds <= 0) {
          _this.seconds = 0;
          _this.handleComplete();
          return _this.clearTimer();
        } else {
          _this.updateCanvas();
          return _this.tick();
        }
      };
    })(this)), this.tickPeriod));
  };

  handleComplete() {
    if (this.props.onComplete) {
      return this.props.onComplete();
    }
  };

  clearTimer() {
    return this._timer.clearRect(0, 0, this.refs.timer.width, this.refs.timer.height);
  };

  formattedTime() {
    let decimals, ref, seconds, timeParts;
    decimals = (ref = this.seconds <= 9.9 && this.props.showMilliseconds);
    seconds = (this.seconds).toFixed(decimals);
    timeParts = [];
    timeParts.push(seconds);
    return timeParts;
  };

  drawTimer() {
    let formattedTime, percent;
    percent = this.fraction * this.seconds + 1.5;
    formattedTime = this.formattedTime();
    this.setState({
      time: this.props.paused && (this.props.pausedText != null) ? this.props.pausedText : formattedTime
    });
    this._timer.globalAlpha = this.props.alpha;
    this._timer.fillStyle = this.props.color;
    this._timer.beginPath();
    this._timer.arc(this.radius, this.radius, this.radius, Math.PI * 1.5, Math.PI * percent, false);
    this._timer.arc(this.radius, this.radius, this._innerRadius, Math.PI * percent, Math.PI * 1.5, true);
    this._timer.closePath();
    return this._timer.fill();
  };

  render() {
    let style1 = {
      position: 'absolute'
    };
    let style2 = {
      position: 'absolute',
      top: '30px',
      left: '30px'
    };
    return(
      <div>
        <div className="timer">
          <div style={style2}>
            <canvas ref='background' style={ style1 } width={this.props.size} height={this.props.size}></canvas>
            <canvas className="circle_animation" ref='timer' style={ style1 } width={this.props.size} height={this.props.size}></canvas>
          </div>
          <div className="item html">
            <h2 className="timer__numbers">{this.state.time}</h2>
          </div>
        </div>
      </div>
    )
  }

}

Timer.defaultProps = {
  seconds: 15,
  size: 190,
  color: '#FFB808',
  alpha: 1,
  timeFormat: 'hms',
  showMilliseconds: true,
  paused: true
}

export default Timer;
