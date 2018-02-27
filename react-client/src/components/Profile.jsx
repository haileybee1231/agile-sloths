import React from 'react';
import { Card, Grid, Header, Container, Image } from 'semantic-ui-react';
import data from '../testdata.js'

var thisUser = data.users['bororourke@gmail.com'];

class Profile extends React.Component {
	constructor() {
		super()
		this.state = {
			placeholder: []
		}
		this.handleBioTabClick = this.handleBioTabClick.bind(this),
		this.handleEventsTabClick = this.handleEventsTabClick.bind(this),
		this.handleFollowersTabClick = this.handleFollowersTabClick.bind(this),
		this.handleRaceTabClick = this.handleRaceTabClick.bind(this)
	}

	handleBioTabClick() {
		// should empty container and render bio element
	}

	handleEventsTabClick() {
		// should empty container and render events list

	}

	handleFollowersTabClick() {
		// should empty container and render followers list
	}

	handleRaceTabClick() {
		// should empty container and render race info element

	}

	render() {
		console.log(thisUser)
		return ( 
			<Container style={{paddingLeft: 100}}>
				<Grid container style={{paddingTop: 100}}>
					<Grid.Row>

					<Card>
						<Image src='https://upload.wikimedia.org/wikipedia/commons/thumb/a/ad/Beto_O%27Rourke%2C_Official_portrait%2C_113th_Congress.jpg/800px-Beto_O%27Rourke%2C_Official_portrait%2C_113th_Congress.jpg'/>
						<Card.Header>
							{thisUser.name}
						</Card.Header>
						<Card.Description>
							{thisUser.bio}
						</Card.Description>
					</Card>


						<Header as='h1'> hi </Header> 
					</Grid.Row>

				</Grid>

			</Container>)


		// basic render should include profile photo, 
		// name, location, tabs/buttons

	}
}

export default Profile