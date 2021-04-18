![Repertoire](https://www.aaronresch.com/images/repertoirePoster.png
)
- - - -

***Repertoire*** is an app developed for guitar and bass players to log and keep track of the online sheet music they like to use when they practice in front of their computer. Users can search through songs added by any user, sort based on number of categories, and even have a song chosen for them at random.

### Additional Features Include:
- Per-user notes on each song, to keep track of how ***you*** like to play.
- Tuner utility featuring mp3 recordings of tones for guitar and bass players to tune their instruments to
- Rearrangeable setlist feature, including the ability to print a setlist
- Customizable user experience with selectable themes

# Getting Started

To run ***Repertoire*** locally, clone the project by running the following command in your terminal:
> `git clone git@github.com:Resch17/repertoire.git`

Once you have the project cloned in your terminal, run:
> `npm install`

This will install the libraries and other dependencies used by ***Repertoire***.

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Running the Database
You must run JSON server in another instance of your terminal so you will have access to the data that ***Repertoire*** is capturing. Navigate to the api directory and run the following command:
> `json-server -p 8088 repertoire.json`

This will run the provided sample database on port 8088. Please note that since this test database is inside the development folder, changes to the database may cause the app to refresh. To avoid this, copy `api/repertoire.json` to a folder outside the ***Repertoire*** directory and run the above command from there.

## Running the App
In the project directory, you can run:
> `npm start`

This runs the app in the development mode.
Open http://localhost:3000 to view ***Repertoire*** in your browser.

The page will reload if you make edits.
You will also see any lint errors in the console.

Log in to the app using the email `demo@demo` to start using ***Repertoire***.

## Learn More
You can learn more in the [Create React App](https://github.com/facebook/create-react-app) documentation.

To learn React, check out the [React](https://reactjs.org/) documentation.


# Tools and Resources

## Figma
<img src="https://upload.wikimedia.org/wikipedia/commons/thumb/3/33/Figma-logo.svg/320px-Figma-logo.svg.png" width="75" />

Figma was my primary tool for wireframing and mocking up a design for this app. Figma is a free application that allows users to prototype websites and applications with significant focus on UX and UI design.

For more information, check out [Figma](https://www.figma.com/).

## Font Awesome
<img src="https://upload.wikimedia.org/wikipedia/commons/thumb/8/89/Font_Awesome_5_logo_black.svg/320px-Font_Awesome_5_logo_black.svg.png" />

I used Font Awesome for all icons on this project. Font Awesome is an easy-to-use font and icon toolkit with hundreds of free and thousands of paid icons availble for use on any website or app.

For more information, check out [Font Awesome](https://fontawesome.com/).

## Material-UI
<img src="https://material-ui.com/static/logo_raw.svg" width="75">

Material-UI is a popular React UI component framework, based on Google's Material design principles. I used Material-UI for the confirmation dialog boxes in this app.

For more information, check out [Material-UI](https://material-ui.com).

----
&copy; 2021   | Application written by Aaron Resch
