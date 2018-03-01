import React from 'react';
import { Tab, Grid, Header, Container, Item } from 'semantic-ui-react';
import data from '../testdata.js'
import ElectionInfo from './ElectionInfo.jsx';

var events = data.events;
var race = data.races[0];
var followers = data.users;

const panes = [
	{ menuItem: 'Events', 
	render: () => <Tab.Pane attached={true}>
		{events.map(event => (
			<Item>
				<Item.Header as='a'> {event.title} </Item.Header>
				<Item.Meta> Hosted by {event.host} </Item.Meta>
				<Item.Description> 
					<div> {event.description} </div>
					<div> {event.date} {event.time} </div>
				</Item.Description>
				<Item.Extra> {event.location} </Item.Extra>
			</Item>
		))}
	</Tab.Pane>
	},
	{ menuItem: 'Election Info',
	render: () => <Tab.Pane attached={true}>
		<Item>
			<Item.Header> {race.office} </Item.Header>
			<Item.Meta> {race.city} {race.state} {race.district} </Item.Meta>
			<Item.Description> 
			<div>
				{race.candidates.map(candidate => (
					<div> {candidate} </div>
				))}
			</div>
			</Item.Description>
			<Item.Extra> {race.date} </Item.Extra>
		</Item>
	</Tab.Pane>
	},
	{ menuItem: 'Followers',
	render: () => <Tab.Pane attached={true}>
		<List>
			{followers.map(follower => (
				<List.Item> {follower.name} </List.Item>
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