# Habitat Heroes

> Note: The current house building time and quiz reset time have been shortened for the purpose of allowing users to try out more features in the MVP.

## What it does

Habitat Heroes is a virtual house-building game that mirrors the experience of physical volunteering programmes. There are 6 main features that the game supports:

1. Simulate a virtual house building experience
2. Update players on news & latest events
3. Quiz players on housing issues
4. Provide daily quest challenges
5. Allow sharing of game experience on social media
6. Allow donations via purchasing in-game currency

## Demo Video

<p align="center"><a href="https://youtu.be/iKUKB8h2ZDU"><img width="65%" alt="Habitat Heroes Demo" src="https://img.youtube.com/vi/iKUKB8h2ZDU/maxresdefault.jpg"></img></a></p>

## Requirements

[Node.js](https://nodejs.org) is required to install dependencies and run scripts via `npm`.

## Available Commands

| Command         | Description                                                                     |
| --------------- | ------------------------------------------------------------------------------- |
| `npm install`   | Install project dependencies                                                    |
| `npm start`     | Build project and open web server running project                               |
| `npm run build` | Builds code bundle with production settings (minification, uglification, etc..) |

## Writing Code

After cloning the repo, run `npm install` from your project directory. Then, you can start the local development server by running `npm start`.

After starting the development server with `npm start`, you can edit any files in the `src` folder and webpack will automatically recompile and reload your server (available at `http://localhost:8080` by default).

## Deploying Code

After you run the `npm run build` command, your code will be built into a single bundle located at `dist/bundle.min.js` along with any other assets you project depended.

If you put the contents of the `dist` folder in a publicly-accessible location (say something like `http://mycoolserver.com`), you should be able to open `http://mycoolserver.com/index.html` and play your game.

## Using Redux

### Using existing actions

```js
store.dispatch(setName('Hello'));
```

### Fetching state

```js
const selectName = (state) => return state.user.name;

const name = selectName(store.getState());
```

### Subscribing to state

Example based on Redux's own example on their website:

```js
const selectName = (state) => state.user.name;

let currentName;
const handleNameChange = () => {
  const previousName = currentName;
  currentName = selectName(store.getState());

  if (previousName !== currentName) {
    // Handle name change
  }
};

const unsubscribeToNameChanges = store.subscribe(handleNameChange);
unsubscribeToNameChanges(); // to unsubscribe
```

### Defining your own reducers

Using `@reduxjs/toolkit`, reducer and action definitions have been greatly simplified. You can just create a "slice" of the state for a particular domain.

See `reducers/userReducer.js` for more information. One key thing to note is that you can directly mutate the state in the reducers - `@reduxjs/toolkit` will help to translate those mutations into immutable operations.

Note that Redux state is currently being persisted into the browser's cache. If you want to exclude a specific property from being cached, you can check out blacklists for `redux-persist`.
