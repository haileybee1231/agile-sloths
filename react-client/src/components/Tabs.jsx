import React from 'react';
import { Tab, Grid, Header, Container, Item, List } from 'semantic-ui-react';
import data from '../testdata.js'
import ElectionInfo from './ElectionInfo.jsx';

var events = data.events;
var race = data.races[0];
var followers = data.users['bororourke@gmail.com'].followers;

const panes = [
	{ menuItem: 'Events', 
	render: () => <Tab.Pane attached={true}>
		{events.map(event => (
			<Item key={event.title} style={{paddingBottom: 12}}>
				<Item.Header as='as' style={{fontWeight: 700, color: '#0099ff'}}>{event.title} </Item.Header>
				<Item.Meta> <span style={{fontWeight: 700}}> {event.date} {event.time} </span> </Item.Meta>
				<Item.Description> 
					<div> Hosted by {event.host} </div>
					<div> {event.description} </div>
				</Item.Description>
				<Item.Extra> <span style={{fontWeight: 700}}>Location:</span> {event.location} </Item.Extra>
			</Item>
		))}
	</Tab.Pane>
	},
	{ menuItem: 'Election Info',
	render: () => <Tab.Pane attached={true}>
		<Item>
			<Item.Header> <span style={{fontWeight: 700}}> Office: </span> {race.office} </Item.Header>
			<Item.Meta> <span style={{fontWeight: 700}}>Location: </span> {race.city} {race.state} {race.district} </Item.Meta>
			<Item.Description> 
				<span style={{fontWeight: 700}}> Candidates: </span>
				{race.candidates.map(candidate => (
					<div> &nbsp;&nbsp;&nbsp;&nbsp; {candidate} </div>
				))}
			</Item.Description>
			<Item.Extra> <span style={{fontWeight: 700}}> Date: </span> {race.date} </Item.Extra>
		</Item>
	</Tab.Pane>
	},
	{ menuItem: 'Followers',
	render: () => <Tab.Pane attached={true}>
		<List>
			{followers.map(follower => (
				<List.Item key={follower}> {follower} </List.Item>
			))}
		</List>
	</Tab.Pane>
	}
]

const TabMenu = () => (
	<Tab menu={{ pointing: true }} panes={panes} />
)

export default TabMenu

// const EventsList = (props) => (
// 	<Item.Group>
// 		{this.props.events.map(event => (
// 			<Item> 
// 				<Item.Content>
// 					<Item.Header as='a'> {event.title} </Item.Header> 
// 					<Item.Meta> {event.date}, {event.time} </Item.Meta>
// 					<Item.Extra> {event.location} </Item.Extra>
// 					<Item.Description> {event.description} </Item.Description>
// 				</Item.Content>
// 			</Item>
// 			))}
// 	</Item.Group>

// );

// export default EventsList;