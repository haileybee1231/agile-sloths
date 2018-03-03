import React from 'react';
import { connect, bindActionCreators } from 'react-redux';
import { Grid } from 'semantic-ui-react';
import { savePollingInfo } from '../actions/actions.js';
import helper from '../../../lib/serverHelpers.js';
import config from '../../../config.js';
import { withRouter } from 'react-router-dom';
import axios from 'axios'
import uuidv1 from 'uuid'

class ConnectedVoterInfoTab extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      pollingInfo: []
    }
  }

  componentWillMount() {
    // create conditional to check if user is a voter
    // if so
      this.fetchPollingStations(this.props.savePollingInfo, '800 Brazos St Suite 500, Austin, TX 78701') //replace with currentUser location
    // else 
    // do nothing
  }

  fetchPollingStations(dispatch, address) {
    let location = helper.encodeRequest(address);
    axios.get(`https://www.googleapis.com/civicinfo/v2/voterinfo?key=${config.GOOGLE_API_KEY}&address=${location}`)
      .then(function (response) {
        dispatch(response)
        console.log('Polling info successfully updated', response.data)
      })
      .catch(function (error) {
        console.log('There was an error retrieving the polling information from the API', error)
      })
  }

  render() {
    const styles = {
      header: {
        fontSize: '20px'
      },
      name: {
        fontSize: '16px'
      },
      hours: {
        fontSize: '13px'
      },
      address: {
        fontSize: '12px'
      }
    }
    return (
      <div>
        <p style={ styles.header }>10 closest Election Day Polling Stations</p>
        <Grid divided='vertically'>
          {this.props.pollingInfo && // checks to see if there is pollingInfo object
          this.props.pollingInfo.data && // checks if that object has data before iterating
          this.props.pollingInfo.data.pollingLocations.slice(0, 10).map(location => ( // takes the first 10 (because there are a lot)
            <Grid.Row columns={1} key={ uuidv1() }>
                <Grid.Column>
                  <div>
                    <p style={ styles.name }>{ location.address.locationName }</p>
                    <p style={ styles.hours }>Open from { location.pollingHours }</p>  {/* make this into a pretty format */}
                    <p style={ styles.address }>{ location.address.line1 }</p>
                    <p style={ styles.address }>{ location.address.city}, {location.address.state } </p>
                    <p style={ styles.address }>{ location.address.zip }</p>
                  </div>
                </Grid.Column>
              </Grid.Row>
          ))}
        </Grid>
      </div>
    )
  }
}

let mapDispatchToProps = dispatch => {
  return { savePollingInfo: results => dispatch(savePollingInfo(results)) };
}

let mapStateToProps = state => {
  return {
    pollingInfo: state.data.pollingInfo,
    currentUser: state.data.currentUser
  };
}

const VoterInfoTab = connect(mapStateToProps, mapDispatchToProps)(withRouter(ConnectedVoterInfoTab));
export default VoterInfoTab;