import React from 'react';
import { getLaunches } from '../utilities/requests';

class Launches extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      launches: []
    }
  }

  componentDidMount() {
    getLaunches()
      .then((launches) => {
        console.log(launches);
        this.setState({
          launches: launches
        });
      });
  }

  _renderLaunches() {
    return this.state.launches.map((launch) => {
      return (
        <div className="Launch" key={ launch.id }>
          <p><strong>Rocket Name:</strong> { launch.name }</p>
          <p><strong>Agency:</strong> { launch.agency }</p>
          <p><strong>Location:</strong> { launch.location }</p>
          <p><strong>Date:</strong> { launch.time.slice(0, 10) }</p>
        </div>
      );
    });
  }

  render() {
    return (
      <div className="Launches">
        <h2 className="Launches-header">Upcoming Rocket Launches</h2>
        { this._renderLaunches() }
      </div>
    );
  }

};

export default Launches;
