# Repertoire User Stories
### Login and Registration
- **GIVEN** a user wants to log in or register
- **WHEN** a user loads the app while not logged in
- **THEN** two forms will appear to the user, one to log in and one to register

### Adding a song
- **GIVEN** a user wants to store a song in the database
- **WHEN** a user clicks "+ add a tab"
- **THEN** a modal dialog form will appear for the user to enter or select the following:
1. Song title
2. Song artist
3. Song genre
4. Song instrument
5. Song tuning
6. Tab URL
7. Youtube URL

### Viewing a song
- **GIVEN** a user wants to view a song they have (or another user has) stored
- **WHEN** a user selects a song from the song list
- **THEN** the details of the song, affordances for adding to a setlist, editing or deleting the song, adding notes, visiting the tab (external site), and playing an embedded youtube video will be presented to the user

### Sorting the song list
- **GIVEN** a user wants to arrange the song list sorted by something other than alphabetical-by-artist (the default sorting)
- **WHEN** a user clicks either the song, genre, or instrument column header on the song list
- **THEN** the song list should sort by the attribute the user clicked

### Searching the song list
- **GIVEN** a user wants to search for a song, artist, or genre
- **WHEN** a user enters a term in the provided search bar
- **THEN** the song list will filter to include only search matches

### Random song selection
- **GIVEN** a user can't decide what song to choose
- **WHEN** a user interacts with the random song affordance
- **THEN** a random song from the database will be selected

### Tuning
- **GIVEN** a user wants to tune their guitar or bass to match the tuning of a song they have selected
- **WHEN** a user access the tuning utility
- **THEN** a user is presented with an affordance for selecting which instrument they want to tune (guitar or bass)
- **THEN** a user is presented with a list of available tunings for that instrument
- **THEN** a user is presented with a list of the notes in that tuning, each of which when clicked will play an MP3 of that note

### Setlists
#### Adding to setlist
- **GIVEN** a user wants to save a list of songs
- **WHEN** a user interacts with the "add to setlist" affordance on a given song
- **THEN** the song is added to the user's setlist

#### Deleting from setlist
- **GIVEN** a user wants to remove a song from their setlist
- **WHEN** a user interacts with the "remove song" affordance on their setlist
- **THEN** that song is removed from the setlist

#### Rearranging setlist
- **GIVEN** a user wants to change the order of their setlist
- **WHEN** a user drags a song in their setlist to a different position
- **THEN** the setlist is saved in the new order
