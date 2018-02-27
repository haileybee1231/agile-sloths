import React from 'react'
import { Menu, Input, Header, Container, Button } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import data from '../testdata.js'
const uuidv4 = require('uuid/v4')

class Sidebar extends React.Component {
    constructor(){
        super()
        this.state={
            activeItem: '',
            currentUser: true // Created for testing purposes. Will need to call props.user once set up
        }
        this.handleItemClick = this.handleItemClick.bind(this)
    }

    handleItemClick(name){ this.setState({ activeItem: name }) }

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
                        {data.races.map((race) => {
                            return (
                                <Menu.Item name={race.office} active={activeItem === race.office} onClick={this.handleItemClick} key={uuidv4()}/>
                            )
                        })}
                    </Menu.Menu>
                </Menu.Item>

                <Menu.Item>
                    <Menu.Header>Candidates</Menu.Header>
                    <Menu.Menu>
                        {data.races.map((race) => {
                            return race.candidates.map((candidate) => {
                                return (
                                    <Menu.Item name={candidate} active={activeItem === candidate} onClick={this.handleItemClick}/>
                                )
                            })
                        })}
                    </Menu.Menu>
                </Menu.Item>
                <Menu.Item>
                    <Button size='small'>
                        { this.state.currentUser
                            ? <Link to="/logout">Logout</Link>
                            : <Link to="/login">Login</Link>
                        }
                    </Button>
                </Menu.Item>
            </Menu>
            </Container>
            
        )
    }
}

export default Sidebar