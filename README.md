This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

## Overview

This is a basic react app that allows you to upload images to an aws s3 account.
Prior to running this app, make sure that you create an s3 bucket in your aws console.

### App.js

Make sure to add your credentials here:
```
const config = {
  bucketName: 'your-bucket-name',
  dirName: '', /* optional */
  region: 'us-east-1', /* example */
  accessKeyId: process.env.REACT_APP_ACCESS_ID,
  secretAccessKey: process.env.REACT_APP_SECRET_KEY
}
```

### .env.local

And here:
```
REACT_APP_ACCESS_ID='EXAMPLEACCESSID'
REACT_APP_SECRET_KEY='exampleSecretKey010101'
```

### Notes

Please keep in mind that there is a slight delay upon initial upload.  Wait a few seconds and the uploaded image should appear at the top of the screen.