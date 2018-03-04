import React from 'react';
import { Icon, Item, List, Card, Grid, Header, Container, Image, Button, Tab } from 'semantic-ui-react';
import data from '../testdata.js';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import Sidebar from './Sidebar.jsx';
import EventCard from './EventCard.jsx';

const uuidv4 = require('uuid/v4');



var events = data.events;
var race = data.races[0];
var followers = data.users['bororourke@gmail.com'].followers;

const TabMenu = (props) => {
	const panes = [
		{ menuItem: 'Events',
			render: () =>
			<Tab.Pane attached={true}>
				{props.events.length ?
					props.events.map(event => (
						<EventCard key={uuidv4()} event={event} />
					)
				)
				: <h2 style={{textAlign: 'center'}}>No Events Currently Scheduled for This Candidate</h2>
			}
		</Tab.Pane>
	},
	{ menuItem: 'Election Info',
		render: () => 
		<Tab.Pane attached={true}>
			<Item>
				<Item.Header> <span style={{fontWeight: 700}}> Office: </span> {race.office} </Item.Header>
				<Item.Meta> <span style={{fontWeight: 700}}>Location: </span> {race.city} {race.state} {race.district} </Item.Meta>
				<Item.Description>
					<span style={{fontWeight: 700}}> Candidates: </span>
					{race.candidates.map(candidate => (
						<div key={uuidv4()}> &nbsp;&nbsp;&nbsp;&nbsp; {candidate} </div>
					))}
				</Item.Description>
				<Item.Extra> <span style={{fontWeight: 700}}> Date: </span> {race.date} </Item.Extra>
			</Item>
		</Tab.Pane>
	},
	{ menuItem: 'Followers',
		render: () => 
		<Tab.Pane attached={true}>
			<List>
				{followers.map(follower => (
					<List.Item key={uuidv4()}> {follower} </List.Item>
				))}
			</List>
		</Tab.Pane>
	}
]
	return <Tab menu={{ pointing: true }} panes={panes} />
}

const mapStateToProps = state => ({
	events: state.data.selectedUser.userEvents
});

const mapDispatchToProps = dispatch => {
	return bindActionCreators({}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(TabMenu);
