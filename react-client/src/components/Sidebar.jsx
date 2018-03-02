import React from 'react';
import { Menu, Input, Header, Container, Button } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import { logout } from '../../src/actions/actions.js';
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

    handleItemClick(e){
      let name = e.target.innerHTML.split('-->')[1].split('<!--')[0]; // Jacob, this wasn't targeting correclty and I had to come up with this... we should find a more elegant solution
      this.setState({ activeItem: name });
      $.ajax({
        type: 'GET',
        url: `/user?${name}`,
        success: user => {
          console.log(user)
          this.props.history.push(`/user?${name}`);
        },
        error: err => {
          console.error(err);
        }
      })
    }

    sendLogoutRequest() {
      $.ajax({
        type: 'POST',
        url: '/logout',
        contentType: 'application/json',
        success: () => {
          this.props.logout();
          alert('You have been successfully logged out')
        },
        error: () => {
          alert('There was an issue logging you out. Please try again.')
        }
      })
    };

    render() {
        const { activeItem } = this.state || {}
        return (
          <Container style={{paddingLeft: 100}}>
          <Menu vertical fixed = 'left' style={{overflowY: 'scroll'}} size = 'large'>
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
                              <Menu.Item name={race.office} active={activeItem === race.office} onClick={this.handleItemClick} key={uuidv4()}/>
                          )
                      })}
                  </Menu.Menu>
              </Menu.Item>

              <Menu.Item>
                  <Menu.Header>Candidates</Menu.Header>
                  <Menu.Menu>
                      {this.props.races.map((race) => {
                          return race.candidates.map((candidate) => {
                              return (
                                  <Menu.Item name={candidate} active={activeItem === candidate} onClick={this.handleItemClick}/>
                              )
                          })
                      })}
                  </Menu.Menu>
              </Menu.Item>
              <Menu.Item>
              { this.props.currentUser
                ? <Button onClick={this.sendLogoutRequest.bind(this)} size='small'>Logout</Button>
                : <Link to="/login">
                    <Button size='small'>
                      Login
                    </Button>
                  </Link>
              }
              </Menu.Item>
          </Menu>
          </Container>

        )
    }
}

const mapStateToProps = (state) => ({
  races: state.data.races,
  currentUser: state.data.currentUser
});

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({logout}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Sidebar));
