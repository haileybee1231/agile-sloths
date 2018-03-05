import React from 'react';
import { Icon, Item, List, Card, Grid, Header, Container, Image, Button, Tab } from 'semantic-ui-react';
import data from '../testdata.js';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import $ from 'jquery';

import Sidebar from './Sidebar.jsx';
import EventCard from './EventCard.jsx';
import CandidateInfoTab from './CandidateInfoTab.jsx';

const uuidv4 = require('uuid/v4');

class TabMenu extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			followers: null
		}
	}

	render() {
		const race = this.props.races[0];
		const panes = [
		{ menuItem: 'Events',
			render: () =>
			<Tab.Pane attached={true}>
				{this.props.selectedUser.userEvents && this.props.selectedUser.userEvents.length ?
					this.props.selectedUser.userEvents.map(event => (
						<EventCard key={uuidv4()} event={event} />
					))
				: <h2 style={{textAlign: 'center'}}>No Events Currently Scheduled for This Candidate</h2>
				}
			</Tab.Pane>
		},
		{ menuItem: 'Election Info',
			render: () =>
			<Tab.Pane attached={true}>
				<Item>
					<CandidateInfoTab/>
				</Item>
			</Tab.Pane>
		},
		{ menuItem: 'Followers',
			render: () =>
			<Tab.Pane attached={true}>
				<List>
					<h3>Followers</h3>
					{this.props.selectedUser.followers && this.props.selectedUser.followers.length > 0 ?
						this.props.selectedUser.followers.map(follower => (
							<List.Item key={uuidv4()}> {follower} </List.Item>
						)) : null
					}
				</List>
			</Tab.Pane>
		}
	]

		return <Tab menu={{ pointing: true }} panes={panes} />
	}

}


const mapStateToProps = state => ({
	selectedUser: state.data.selectedUser,
	races: state.data.races
});

const mapDispatchToProps = dispatch => {
	return bindActionCreators({}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(TabMenu);
