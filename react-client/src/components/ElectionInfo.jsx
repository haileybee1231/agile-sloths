import React from 'react';
import { Grid, Header, Container, Item } from 'semantic-ui-react';
import data from '../testdata.js'


const ElectionInfo = (props) => (
	<div>
	<Header as='h1'> {props.race.office} </Header>
	<Header as='h3'> {props.race.city} </Header>
	<Header as='h3'> {props.race.state} </Header>
	<Header as='h3'> {props.race.district} </Header>
	<Header as='h2'> {props.race.date} </Header>
	<Header as='h3'> Candidates: </Header>
	<List>
	{props.race.candidates.map(candidate => (
		<List.Item> {candidate} </List.Item>
		))}
	</List>
	</div>

);

export default ElectionInfo

						<Grid.Row style={{paddingBottom: 30}}>
							<Button style={{marginRight: 10}} onClick={this.handleEventsTabClick}> Events </Button>
							<Button style={{marginRight: 10}} onClick={this.handleRaceTabClick}> Election Info </Button>
							<Button style={{marginRight: 10}} onClick={this.handleFollowersTabClick}> Followers </Button>
						</Grid.Row>

						<Grid.Row>
							<div> Dummy events so this space is not empty: </div>
							{data.events.map(event => (
								<div style={{padding: 5, fontWeight: 700}}> {event.title} by {event.host} at {event.location} </div> 
								))}
						</Grid.Row>