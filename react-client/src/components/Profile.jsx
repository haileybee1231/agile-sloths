import React from 'react';
import $ from 'jquery';


import { Icon, List, Card, Grid, Header, Container, Image, Button } from 'semantic-ui-react';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import Sidebar from './Sidebar.jsx';
import TabMenu from './Tabs.jsx'

const uuidv4 = require('uuid/v4');

class Profile extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			isFollowing: 'Follow', // change to 'following' on click
			following: [] // this should be taken out later when we can get followers by querying votercandidate
		}
		this.handleFollow = this.handleFollow.bind(this);
	}

	handleFollow() {
		console.log('follow click')
		// tbd
		if (this.state.isFollowing === 'Follow') {
			this.setState({isFollowing: 'Following'}); 
		} else {
			this.setState({isFollowing: 'Follow'});
		}

		// ajax post request to add to database
		// if (isFollowing === 'Follow') { // right now, only submit the post request if not already following
		// 	// later, if already following, call request to delete that row from the database and change back to 'follow' button?
		// for now just add name to following list in state
		//({voter: this.props.currentUser, candidate: this.props.selectedUser}),
			$.ajax({
				type: 'POST',
				url: '/follow', //?
				//data: JSON.stringify({voter: 'voter'}), 
				success: () => {
					console.log('follow POST success');
					// change following in state to change text of follow button
					//if (this.state.isFollowing === 'Follow') {
						//this.setState({isFollowing: 'Following', }); 
					//}// else {
						//this.setState({isFollowing: 'Follow', following: this.state.following.concat([this.state.selectedUser])});
					//}
				},
				error: () => {
					console.log('follow POST error');
				}
			})
		
	}
  
	render() {
		const user = this.props.selectedUser.user;
		console.log('current user: ', this.props.currentUser);

		return (
			<Container style={{paddingLeft: 210}}>
				<Grid container style={{paddingTop: 63}}>
					<Sidebar />

					<Grid.Column width={6}>
						<Grid.Row>
							<Card>
								<Image src='https://upload.wikimedia.org/wikipedia/commons/thumb/a/ad/Beto_O%27Rourke%2C_Official_portrait%2C_113th_Congress.jpg/800px-Beto_O%27Rourke%2C_Official_portrait%2C_113th_Congress.jpg'/>
								<Card.Header style={{paddingLeft: 15, paddingRight: 15, fontSize: 20, paddingTop: 10, fontWeight: 800, paddingBottom: 10}}>
									{`${user.firstname} ${user.lastname}`}
								</Card.Header>
								<Card.Meta style={{paddingLeft: 15, paddingRight: 15, paddingBottom: 10}}>
									{user.location}
								</Card.Meta>
								<Card.Description style={{paddingLeft: 15, paddingRight: 15}}>
									{user.bio}
								</Card.Description>
								<Card.Content extra>
									10 followers
								</Card.Content>
							</Card>
						</Grid.Row>

						<Grid.Row>
							<Button style={{marginTop: 20}} onClick={this.handleFollow}> {this.state.isFollowing} </Button>
						</Grid.Row>

					</Grid.Column>

					<Grid.Column width={10}>

						<TabMenu />

					</Grid.Column>

				</Grid>

			</Container>)

	}
}


const mapStateToProps = state => ({
	selectedUser: state.data.selectedUser,
	races: state.data.races,
	events: state.data.events
});

const mapDispatchToProps = dispatch => {
	return {};
}

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
