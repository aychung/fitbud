import React, { Component } from 'react';
import { Button, Container, Image, List } from 'semantic-ui-react';

class ProfilePic extends Component {
  constructor (props) {
    super(props);

    this.state = {
      file: '',
      imgSrc: '',
    }

    this.clickImg = this.clickImg.bind(this);
    this.setFile = this.setFile.bind(this);
    this.sendFile = this.sendFile.bind(this);
  }

  clickImg() {
    this.inputElement.click();
  }

  setFile(e) {
    this.setState({
      file: e.target.files[0],
    });
    this.sendFile();
  }

  sendFile() {
    //console.log('file set -> start upload image');
    var data = new FormData();
    // data.append('username', '');

    data.append('file', this.state.file, this.state.file.name);

    fetch ('/profile/pic', {
      method: 'POST',
      credentials: 'include',
      body: data,
    }).then(res => {
      if(res.ok) {
        console.log('img sent to server');
      }
    });
  }

  noPic() {
    this.setState({
      imgSrc: this.props.default,
    });
  }

  render() {
    return (
      <Container style={{margin: '30px'}}>

        <Image onClick={this.clickImg} src={`/pic/usr/${this.props.user}`} size='small' shape='circular' centered style={{margin: 'auto'}} />
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


