import React, {Component} from 'react';
import ReactS3 from 'react-s3';
import ReactDom from 'react-dom';
import { uploadFile } from 'react-s3';
import './App.css';

const config = {
  bucketName: 'instaimages1',
  dirName: 'test', /* optional */
  region: 'us-east-1',
  accessKeyId: process.env.REACT_APP_ACCESS_ID,
  secretAccessKey: process.env.REACT_APP_SECRET_KEY
}

var AWS = require('aws-sdk');
var awsconfig = {
  "apiVersion": "2012-08-10",
  "accessKeyId": process.env.REACT_APP_ACCESS_ID,
  "secretAccessKey": process.env.REACT_APP_SECRET_KEY,
  "region": "us-east-1",
  "endpoint": "http://dynamodb.us-east-1.amazonaws.com"
}
AWS.config.update(awsconfig);



class Home extends Component {
  constructor(props) {
    super(props);
    this.onClick = this.onClick.bind(this);
   
    this.state = {
      active: false,
      posts: [
          {
              id: '1',
              name: 'sample image 1',
              company: '',
              likes: '0',
              image: 'https://cdn.pixabay.com/photo/2020/08/10/14/17/hummingbird-5477966_960_720.jpg', // Replace this link with the link to your image on aws s3
              link_url: ''
          },
          {
              id: '2',
              name: 'sample image 2',
              company: '',
              likes: '0',
              image: 'https://cdn.pixabay.com/photo/2020/07/27/13/27/animals-5442452_960_720.jpg', // Replace this link with the link to your image on aws s3
              link_url: ''
          },
          {
            id: '3',
            name: 'sample image 3',
            company: '',
            likes: '0',
            image: 'https://cdn.pixabay.com/photo/2020/08/11/13/28/flowers-5479950_960_720.jpg', // Replace this link with the link to your image on aws s3
            link_url: ''
        }
      ],
      currentImage: 0,
      images: [
        "heart-outline.jpg","heart_icon.png"
      ]
    }
    // We need to bind the upload function to 'this' context in order to access state
     this.upload = this.upload.bind(this);
     this.toggleImage = this.toggleImage.bind(this);


  }
  toggleClass() {
    const currentState = this.state.active;
    this.setState({ active: !currentState });
};

  onClick(e) {
    this.props.update(this.props.data.id);
  }

  toggleImage() {
    if (this.state.currentImage < this.state.images.length - 1) {
      this.setState({
        currentImage: this.state.currentImage + 1
      });
    } else {
      this.setState({
        currentImage: 0
      });
    }
    return this.currentImage;
  }



  upload(e) {
    let currentComponent = this;
    let uploadCount = 0;
    console.log("check " + e.target.files[0]);
    ReactS3.uploadFile(e.target.files[0], config)

    .then((data)=>{
      console.log("data.location" + data.location)
      currentComponent.setState(currentComponent => ({
      posts: [ {
        image:data.location,
        foodtype: 'hamburger',
        likes:uploadCount + 1
        // "likes":currentComponent.foods.likes
      }, ...currentComponent.posts]
    }))
    })
    .catch((err)=>{
      alert(err);
    })
  }
  


  render() {
    const items = [];
    for (const [index] of this.state.posts.entries()) {
      items.push(<div className='post-wrapper'><img className='main-images' key={index} alt='posted images' src={this.state.posts[index].image} />
      <img className='heart-icon' onClick={this.toggleImage} src={this.state.images[this.state.currentImage]} alt='heart icon' /></div>
      )
    }

    return (
      <div className='container'>
        <nav id='navbar'>
          <header>
            <div className='nav--item'>
              <h3>upload</h3>
                <span>
                <input 
                  type="file"
                  onChange={this.upload}
                />
                </span>
            </div>

          </header>
          <div className='wrapper'>
            <div className='left-col'>
              {items}
            </div>          
          </div>
        </nav>
      </div>
    );
  }
}

export default Home