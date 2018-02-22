import React from 'react'
import { Menu } from 'semantic-ui-react'

class Sidebar extends React.Component {

    render() {
        return (
            <Menu vertical>
                <Menu.Item>
                    <Menu.Header>Elections</Menu.Header>

                    <Menu.Menu>
                        <Menu.Item name='Governor'/>
                        <Menu.Item name='Dog Catcher'/>
                        <Menu.Item name='President'/>
                        <Menu.Item name='Senator'/>
                        <Menu.Item name='School Board'/>
                        <Menu.Item name='District Representative'/>
                        <Menu.Item name='House Member'/>
                    </Menu.Menu>
                </Menu.Item>
            </Menu>
        )
    }
}

export default Sidebar