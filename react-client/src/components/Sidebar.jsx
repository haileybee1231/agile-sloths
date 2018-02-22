import React from 'react'
import { Menu, Input, Header } from 'semantic-ui-react'

class Sidebar extends React.Component {

    handleItemClick(name){ this.setState({ activeItem: name }) }

    render() {
        const { activeItem } = this.state || {}
        return (
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
                        {/* map out elections here */}
                        <Menu.Item name='governor' active={activeItem === 'governor'} onClick={this.handleItemClick}/>
                        <Menu.Item name='Dog Catcher' active={activeItem === 'dog catcher'} onClick={this.handleItemClick}/>
                        <Menu.Item name='President' active={activeItem === 'president'} onClick={this.handleItemClick}/>
                        <Menu.Item name='Senator' active={activeItem === 'senator'} onClick={this.handleItemClick}/>
                        <Menu.Item name='School Board' active={activeItem === 'school board'} onClick={this.handleItemClick}/>
                        <Menu.Item name='District Representative' active={activeItem === 'district representative'} onClick={this.handleItemClick}/>
                        <Menu.Item name='House Member' active={activeItem === 'house member'} onClick={this.handleItemClick}/>
                    </Menu.Menu>
                </Menu.Item>

                <Menu.Item>
                    <Menu.Header>Candidates</Menu.Header>
                    <Menu.Menu>
                        {/* map out candidates here */}
                        <Menu.Item name='beto oRourke' active={activeItem === 'beto oRourke'} onClick={this.handleItemClick}/>

                        
                    </Menu.Menu>
                </Menu.Item>
            </Menu>
            
        )
    }
}

export default Sidebar