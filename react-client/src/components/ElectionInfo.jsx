import React from 'react';
import { Grid, Header, Container, Item } from 'semantic-ui-react';
import data from '../testdata.js'



//export default ElectionInfo

// const ElectionInfo = (props) => (
// 	<Item> 
// 	<Item.Content>
// 		<Item.Header as='a'> {props.race.office} </Item.Header>
// 		<Item.Meta> {props.race.city} {props.race.state} {props.race.district} </Item.Meta>
// 		<Item.Description> {props.race.date} </Item.Description>
// 	</Item.Content>
// 	</Item>

// 	<div> Candidates: 
// 	{props.race.candidates.map(candidate => 
// 		<div> {candidate} </div>
// 	)} </div>

// );
						// <Grid.Row style={{paddingBottom: 30}}>
						// 	<Button style={{marginRight: 10}} onClick={this.handleEventsTabClick}> Events </Button>
						// 	<Button style={{marginRight: 10}} onClick={this.handleRaceTabClick}> Election Info </Button>
						// 	<Button style={{marginRight: 10}} onClick={this.handleFollowersTabClick}> Followers </Button>
						// </Grid.Row>

						// <Grid.Row>
						// 	<div> Dummy events so this space is not empty: </div>
						// 	{data.events.map(event => (
						// 		<div style={{padding: 5, fontWeight: 700}}> {event.title} by {event.host} at {event.location} </div> 
						// 		))}
						// </Grid.Row>