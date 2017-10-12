import React, { Component } from 'react';
import { Container, Image, List } from 'semantic-ui-react';

class ProfilePic extends Component {
  constructor (props) {
    super(props);

    this.state = {
      file: '',
      // imagePreviewUrl: '',
    }

    this.clickImg = this.clickImg.bind(this);
    this.setFile = this.setFile.bind(this);
  }

  clickImg() {
    this.inputElement.click();
  }
  setFile(event) {
    this.setState({
      file: event.target.files[0],
    });
    
    //console.log('file set -> start upload image');
    var data = new FormData();
    // data.append('username', '');
    data.append('file', event.target.files[0], event.target.files[0].name);

    fetch ('/profile/pic', {
      method: 'POST',
      credentials: 'include',
      body: data,
    }).then(res => {
      if(res.ok) {
        console.log('img sent to server');
      }
    })
  }

  render() {
    return (
      <Container style={{margin: '30px'}}>

        <Image onClick={this.clickImg} src={this.props.user} size='small' shape='circular' centered style={{margin: 'auto'}} />
        <input ref={input => this.inputElement = input} id="fileInput" style={{visibility: 'hidden'}} type="file" onChange={this.setFile} accept="image/png, image/jpeg"/>

      
        <Container style={{"textAlign": "center"}}>
          <List style={{margin: '10px'}}>
            <List.Item>
              <List.Header>My Dashboard</List.Header>
            </List.Item>
          </List>
        </Container>

      </Container>
    );
  }
}

export default ProfilePic;
