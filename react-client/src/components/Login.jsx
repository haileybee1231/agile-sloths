import React from 'react'

const LoginForm = () =>  (
    <div className = 'login-form'>
  
  
      <Grid
        textAlign='center'
        
        verticalAlign='middle'
      >
        <Grid.Column >
          <Header as='h2' textAlign='center'>
            {' '}Log-in to your account
          </Header>
  
          <Form size='large'>
            <Segment stacked>
              <Form.Input
                fluid
                icon='user'
                iconPosition='left'
                placeholder='Username'
              />
              <Form.Input 
                fluid
                icon='lock'
                iconPosition='left'
                placeholder='Password'
                type='password'
              />
                
              <Button fluid size='large'>Login</Button>
            </Segment>
          </Form>
          <Message>
            New to Grassroots?  <a href='#'>Sign up</a>
          </Message>
        </Grid.Column>
      </Grid>
    </div>
  )

  export default LoginForm