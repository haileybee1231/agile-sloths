import React from 'react';
import { Menu, Input, Header, Container, Button } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import { logout } from '../../src/actions/actions.js';
import { bindActionCreators } from 'redux';
const uuidv4 = require('uuid/v4');

class Sidebar extends React.Component {
    constructor(props){
        super(props)
        this.state={
            activeItem: '',
            currentUser: false // Created for testing purposes. Will need to call props.user once set up
        }
        this.handleItemClick = this.handleItemClick.bind(this)
    }

    handleItemClick(e){
      let name = e.target.innerHTML.split('-->')[1].split('<!--')[0]; // Jacob, this wasn't targeting correclty and I had to come up with this... we should find a more elegant solution
      this.setState({ activeItem: name })
    }

    render() {
        const { activeItem } = this.state || {}
        return (
            <Container style={{paddingLeft: 100}}>
            <Menu vertical fixed = 'left' style={{overflowY: 'scroll'}} size = 'large'>
            <Menu.Item>
                <Header as='h2' textAlign='center' size='huge'>GRASSROOTS</Header>
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
                { this.state.currentUser
                  ? <Button onClick={this.props.logout} size='small'>Logout</Button>
                  : <Button size='small'>
                      <Link to="/login">Login</Link>
                    </Button>
                }
                </Menu.Item>
            </Menu>
            </Container>

        )
    }
}

const mapStateToProps = (state) => ({
  races: state.data.races
});

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({logout}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Sidebar));
