import React from 'react';
import { connect, bindActionCreators } from 'react-redux';
import { Grid, Menu, Item, Header, Container } from 'semantic-ui-react';
import { savePollingInfo } from '../actions/actions.js';
import helper from '../../../lib/serverHelpers.js';
import config from '../../../config.js';
import { withRouter, Link } from 'react-router-dom';
import axios from 'axios'
import uuidv4 from 'uuid'

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
    return (
      <Container>
      <Menu vertical fluid style={{overflowY: 'scroll', textAlign: 'center'}} size = 'huge'>
      <Menu.Item>
        <Link to='/'>
          <Header as='h2' textAlign='center' size='huge'>
            GRASSROOTS
          </Header>
        </Link>
      </Menu.Item>
      <Menu.Header>10 closest Election Day Polling Stations</Menu.Header>
      <Menu.Menu>
        {this.props.pollingInfo && // checks to see if there is pollingInfo object
        this.props.pollingInfo.data && // checks if that object has data before iterating
        this.props.pollingInfo.data.pollingLocations.slice(0, 10).map(location => ( // takes the first 10 (because there are a lot)
            <Menu.Item key={uuidv4()}>
              <Menu.Item>{ location.address.locationName }</Menu.Item>
              <Menu.Item>Open from { location.pollingHours }</Menu.Item>  {/* make this into a pretty format */}
              <Menu.Item>{ location.address.line1 }</Menu.Item>
              <Menu.Item>{ location.address.city}, {location.address.state } </Menu.Item>
              <Menu.Item>{ location.address.zip }</Menu.Item>
            </Menu.Item>
        ))}
      </Menu.Menu>
      </Menu>
      </Container>
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
