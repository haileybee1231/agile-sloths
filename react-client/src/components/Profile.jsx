import React from 'react';
import { Icon, List, Card, Grid, Header, Container, Image, Button } from 'semantic-ui-react';
import data from '../testdata.js';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import Sidebar from './Sidebar.jsx';
import Event from './ProfileTabs.jsx';
import EventsList from './ProfileTabs.jsx';
import RaceInfo from './ProfileTabs.jsx';
import FollowersList from './ProfileTabs.jsx';
import TabMenu from './Tabs.jsx'

const uuidv4 = require('uuid/v4');

var thisUser = data.users['bororourke@gmail.com'];
var eventsData = data.events;
var race = data.races[0];

class Profile extends React.Component {
	constructor() {
		super()
		this.state = {
			placeholder: []
		}
	}

	render() {
		console.log(data.events)
		console.log(race)
		return ( 
			<Container style={{paddingLeft: 210}}>
				<Grid container style={{paddingTop: 63}}>
					<Sidebar />

					<Grid.Column width={4}>
						<Card>
							<Image src='https://upload.wikimedia.org/wikipedia/commons/thumb/a/ad/Beto_O%27Rourke%2C_Official_portrait%2C_113th_Congress.jpg/800px-Beto_O%27Rourke%2C_Official_portrait%2C_113th_Congress.jpg'/>
							<Card.Header style={{paddingLeft: 15, paddingRight: 15, fontSize: 20, paddingTop: 10, fontWeight: 800, paddingBottom: 10}}>
								{thisUser.name}
							</Card.Header>
							<Card.Meta style={{paddingLeft: 15, paddingRight: 15, paddingBottom: 10}}>
							location goes here?
							</Card.Meta>
							<Card.Description style={{paddingLeft: 15, paddingRight: 15}}>
								{thisUser.bio}
							</Card.Description>
							<Card.Content extra>
								{thisUser.followers.length} followers
							</Card.Content>
						</Card>
					</Grid.Column>

					<Grid.Column width={10}>

					<TabMenu />

					</Grid.Column>

				</Grid>

			</Container>)

	}
}

export default Profile

						// <div>
						// <Header as='h1'> {race.office} </Header>
						// <Header as='h3'> {race.city}, {race.state} </Header>
						// <Header as='h3'> {race.district} </Header>
						// <Header as='h2'> {race.date} </Header>
						// <Header as='h3'> Candidates: </Header>
						// <List>
						// {race.candidates.map(candidate => (
						// 	<List.Item> {candidate} </List.Item>
						// 	))}
						// </List>
						// </div>