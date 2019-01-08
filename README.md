# GATESapp

This app is designed to help employee's and employers communicate more effectively.
### **Easily allows user to create and update employee schedules dynamically.**
![Alt text](/../screenshots/admin-dashboard-edit.png?raw=true "Admin Dashboard")
![Alt text](/../screenshots/edit-current-schedule.png?raw=true "Edit Schedules")
### **Employees can view their schedules on their mobile device and make requests with real time notifications when they are going to be absent or late. Automatically tracks attendance infractions.**
![Alt text](/../screenshots/request-callout.png?raw=true "Request callout")
![Alt text](/../screenshots/request-callout1.png?raw=true "Request callout")

### **Managers are notified of employees status and can approve their requests.**
![Alt text](/../screenshots/request-callout2.png?raw=true "Manager approval")
![Alt text](/../screenshots/confirmed-callout.png?raw=true "Manager confirmed")


[GATESapp Demo](https://gates-app.herokuapp.com/)


## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.

### Prerequisites

```
axios
bcryptjs
body-parser
bootstrap
connect-mongo
express
express-session
mongoose
morgan
passport
passport-local
react
react-dom
react-router-dom
react-scripts
reactstrap
socket.io
```

### Installing

To create a new app

```
npm init react-app my-app
```

or

```
yarn create react-app my-app
```

It will create a directory called my-app inside the current folder.
Inside that directory, it will generate the initial project structure and install the transitive dependencies:

```
my-app
├── README.md
├── node_modules
├── package.json
├── .gitignore
├── public
│   ├── favicon.ico
│   ├── index.html
│   └── manifest.json
└── src
    ├── App.css
    ├── App.js
    ├── App.test.js
    ├── index.css
    ├── index.js
    ├── logo.svg
    └── serviceWorker.js
```
Once the installation is done, you can open your project folder:

```
cd my-app
```

Inside the newly created project, you can run some built-in commands:

```
npm start
```

```
yarn start
```
Runs the app in development mode.
Open http://localhost:3000 to view it in the browser.


```
npm run build
```
or
```
yarn build
```

Builds the app for production to the build folder.
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.

Your app is ready to be deployed.

## Deployment

Deployment done on heroku.

## Built With
```
MongoDB
Express
React
Node
socket.io
Passport
```

## Authors

* **Rich Schiffer** 

