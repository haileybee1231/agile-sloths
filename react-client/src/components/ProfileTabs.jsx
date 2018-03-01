// this will have components for each of the profile tabs
import React from 'react';
import { Grid, Header, Container, Item } from 'semantic-ui-react';
import data from '../testdata.js'


const EventsList = (props) => (
	<Item.Group>
		{this.props.events.map(event => (
			<Item> 
				<Item.Content>
					<Item.Header as='a'> {event.title} </Item.Header> 
					<Item.Meta> {event.date}, {event.time} </Item.Meta>
					<Item.Extra> {event.location} </Item.Extra>
					<Item.Description> {event.description} </Item.Description>
				</Item.Content>
			</Item>
			))}
	</Item.Group>

);

const RaceInfo = (props) => (
	<div>
	<Header as='h1'> {race.office} </Header>
	<Header as='h3'> {race.city}, {race.state} </Header>
	<Header as='h3'> {race.district} </Header>
	<Header as='h2'> {race.date} </Header>
	<Header as='h3'> Candidates: </Header>
	<List>
	{race.candidaties.map(candidate => (
		<List.Item> candidate </List.Item>
		))}
	</List>
	</div>

);

const FollowersList = (props) => (
	<List>
	{data.users.map(user => (
		<List.Item> {user.name} </List.Item>
		))}
	</List>
);

export {Event};
export {EventsList};
export {RaceInfo};
export {FollowersList};