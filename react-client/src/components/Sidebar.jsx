import React from 'react';
import { Menu, Input, Header, Container, Button } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import { logout, setUser, setFavoritesFollowers, setRacesAndCandidates, setCandidateFollowers } from '../../src/actions/actions.js';
import { bindActionCreators } from 'redux';
import $ from 'jquery';
const uuidv4 = require('uuid/v4');

class Sidebar extends React.Component {
    constructor(props){
        super(props)
        this.state={
          activeItem: '',
        }
        this.handleItemClick = this.handleItemClick.bind(this)
    }

    componentWillMount() {
      let email = window.localStorage.user;
      if (email) {
        $.ajax({
          type: 'GET',
          url: `/api/favoritesfollowers?${email}`,
          success: favoritesfollowers => {
            favoritesfollowers = JSON.parse(favoritesfollowers);
            let type = favoritesfollowers[0];
            let output = [];
            favoritesfollowers = favoritesfollowers[1].forEach(item => {
              output.push(`${item.firstname} ${item.lastname}`);
            })
            this.props.setFavoritesFollowers(type, output);
          }
        })
      }
      this.getRacesAndCandidates();
    }

    handleItemClick(e){
      let name = e.target.innerHTML.split('-->')[1].split('<!--')[0]; // Jacob, this wasn't targeting correclty and I had to come up with this... we should find a more elegant solution
      name = name.replace("'", '%60');
      this.setState({ activeItem: name });
      $.ajax({
        type: 'GET',
        url: `/api/user?${name}`,
        success: user => {
          this.props.setUser(JSON.parse(user));
          this.props.history.push(`/user?${name}`);
          $.ajax({
            type: 'GET',
            url: `/api/candidatefollowers?${name}`,
            success: followers => {
              this.props.setCandidateFollowers(followers);
            }
          })
        },
        error: err => {
          console.error('Error retrieving user: ', err);
        }
      })
    }

    sendLogoutRequest() {
      $.ajax({
        type: 'POST',
        url: '/logout',
        contentType: 'application/json',
        success: () => {
          window.localStorage.clear();
          this.props.logout();
          alert('You have been successfully logged out')
        },
        error: () => {
          alert('There was an issue logging you out. Please try again.')
        }
      })
    };

    getRacesAndCandidates() {
      $.ajax({
        type: 'GET',
        url: '/racescandidates',
        success: racesCandidates => {
          let elections = this.props.races;
          let candidates = [];
          racesCandidates = JSON.parse(racesCandidates);
          racesCandidates.forEach(combination => {
            elections.indexOf(combination.office) < 0 ?
              elections.push(combination.office) : null;
            combination.role === 'Candidate' ? candidates.push({
              email: combination.email,
              bio: combination.bio,
              firstname: combination.firstname,
              lastname: combination.lastname,
              role: combination.role,
              race: combination.race,
            }) : null;
          })
          this.props.setRacesAndCandidates(elections, candidates);
        }
      })
    }

    render() {
        const { activeItem } = this.state || {}
        return (
          <Container style={{paddingLeft: 100}}>
          <Menu vertical fixed = 'left' style={{overflowY: 'scroll', textAlign: 'center'}} size = 'large'>
          <Menu.Item>
            <Link to='/'>
              <Header as='h2' textAlign='center' size='huge'>
                GRASSROOTS
              </Header>
            </Link>
          </Menu.Item>
          <Menu.Item>
              <Input className='icon' icon='search' placeholder='Search...' />
          </Menu.Item>
              <Menu.Item>
                  <Menu.Header>Elections</Menu.Header>
                  <Menu.Menu>
                      {this.props.races.map((race) => {
                          return (
                              <Menu.Item name={race} active={activeItem === race} key={uuidv4()}/>
                          )
                      })}
                  </Menu.Menu>
              </Menu.Item>

              <Menu.Item>
                  <Menu.Header>Candidates</Menu.Header>
                  <Menu.Menu>
                      {this.props.users.map((user) => {
                        return (
                          <Menu.Item name={`${user.firstname} ${user.lastname}`} key={uuidv4()} active={activeItem === user} onClick={this.handleItemClick}/>
                        )
                      })}
                  </Menu.Menu>
              </Menu.Item>
              <Menu.Item>
                { this.props.fftype && this.props.fftype === 'favorites' ?
                  <Menu.Item>
                    <Menu.Header>Welcome, {this.props.firstname}!</Menu.Header>
                    <Menu.Item>Total Favorites: {this.props.favoritesfollowers.length}</Menu.Item>
                    <Menu.Menu>
                      {this.props.favoritesfollowers.map(favorite => {
                        return (
                          <Menu.Item
                            key={uuidv4()}
                            name={favorite}
                            active={activeItem === favorite}
                            onClick={this.handleItemClick}/>
                        )
                      })}
                    </Menu.Menu>
                  </Menu.Item>
                  : null
                }
                { this.props.fftype && this.props.fftype === 'followers' ?
                  <Menu.Item>
                    <Menu.Header>Welcome, {this.props.firstname}!</Menu.Header>
                    <Menu.Item>Total Followers: {this.props.favoritesfollowers.length}</Menu.Item>
                    <Menu.Menu>
                      {this.props.favoritesfollowers.map(follower => {
                        return (
                          <Menu.Item
                            key={uuidv4()}
                            name={follower}
                            active={activeItem === follower}
                          />)
                        })}
                    </Menu.Menu>
                  </Menu.Item>
                  : null
                }
              { this.props.currentUser
                ? <Button onClick={this.sendLogoutRequest.bind(this)} size='small'>Logout</Button>
                :
                <Link to="/login">
                    <Button size='small'>
                      Login
                    </Button>
                  </Link>
              }
              </Menu.Item>
              <Menu.Item>
                { this.props.currentUser
                  ?
                  <Link to="/vinfotab">
                    <Button size='small'>Get Polling Information In Your Area</Button>
                  </Link>
                  :
                  null
                }
              </Menu.Item>

          </Menu>
          </Container>

        )
    }
}

const mapStateToProps = (state) => ({
  races: state.data.races,
  users: state.data.users,
  currentUser: state.data.currentUser,
  fftype: state.data.fftype,
  favoritesfollowers: state.data.favoritesfollowers,
  firstname: state.data.firstname
});

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({logout, setUser, setFavoritesFollowers, setRacesAndCandidates, setCandidateFollowers}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Sidebar));
