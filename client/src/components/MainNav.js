import React, { Component } from 'react';
import LoginButtonModal from './LoginButtonModal.js';
import { Menu, Input, Button, Dropdown, Search } from 'semantic-ui-react';
import { NavLink, Link, Redirect } from 'react-router-dom';
import _ from 'lodash';
import $ from 'jquery';

class MainNav extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: false,
      value: '',
      results: {},
    };

    this.debouncedSearch = _.debounce((term, cb) => {
      var options = {
        method: 'GET',
        credentials: 'include',
      }
      return fetch('/search?term='+term, options)
        .then(res => {
          if (res.ok) {
            return res.json();
          }
        });
    }, 500, {'leading': true, 'trailing': false});
  }

  resetComponent = () => this.setState({ isLoading: false, results: [], value: '' });

  handleResultSelect = (e, { result }) => console.log(result);

  handleSearchChange = (e, { value }) => {
    this.setState({ 
      isLoading: true, 
      value 
    });

    this.debouncedSearch(value)
      .then(data => {
        console.log(data);

        var results = [];
        // =[{name:'Users', results:[]}, {name:'Events', results:[]}];
        if (data[0].length !== 0) {
          results.push({name:'Users', results:[]});
          data[0].forEach(val => {
            results[0].results.push({title:val.name, description:val.email, image:val.photo});
          });
        }
        if (data[1].length !== 0) {
          results.push({name:'Postings', results:[]});
          data[1].forEach(val => {
            results[results.length - 1].results.push({title:val.title, description:val.details});
          });
        }

        this.setState({
          isLoading: false,
          results: results,
        });
      });
  }

  signOutRedirect = () => {}

  render() {
    return (
      <Menu secondary size='huge' style={{marginBottom: 0}}>
        <Menu.Item exact name='home' as={NavLink} to='/' />
        <Menu.Item name='listings' as={NavLink} to='/listings' />
        <Menu.Item name='about' as={NavLink} to='/about' />
        <Menu.Menu position='right'>
          <Menu.Item>
            <Search
              category
              loading={this.state.isLoading}
              onResultSelect={this.handleResultSelect}
              onSearchChange={this.handleSearchChange}
              results={this.state.results}
              value={this.state.value}
              {...this.props}
            />
          </Menu.Item>

          {!this.props.isAuthed && ([
            <Menu.Item style={{paddingLeft: '0px'}}> 
              {/*<Button content='Log In' onClick={this.handleLoginClick} /> */}
              {/*<LoginButtonModal authenticate={this.props.authenticate}/> */}
              <Button as={Link} to='/login' content='Log In' />
            </Menu.Item>,
            <Menu.Item style={{paddingLeft: '0px'}}> 
              <Button as={Link} to='/signup' primary content='Sign Up' />
            </Menu.Item>
          ])}

          {this.props.isAuthed && ([
            <Menu.Item style={{paddingLeft: '0px'}}> 
              <Button as={Link} to='/create' primary content='Create Listing' />
            </Menu.Item>,
            <Dropdown text={this.props.user.name} className='link item' pointing>          
              <Dropdown.Menu> 
                <Dropdown.Item as={Link} to='/dashboard'>Dashboard</Dropdown.Item>
                <Dropdown.Item>Profile</Dropdown.Item>
                <Dropdown.Item>Referral</Dropdown.Item>
                <Dropdown.Divider />
                <Dropdown.Item onClick={this.props.signoff} as={Link} to='/'>Log Out</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          ])}
        </Menu.Menu>
      </Menu>
    );
  }
}

export default MainNav;

