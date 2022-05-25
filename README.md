# Urodaga - Dots & Boxes Frontend

## Development setup
It is recommended to clone the parent repository instead. Once you do, run the following:
```bash
# Initialising this repo as a submodule
git submodule init
git submodule update
```

If you don't clone this repo as a submodule, skip the step above. Go into the
project directory 'Frondaga', and run the following:

```bash
# Installing dependencies
npm install
```

To run the development server, run the following:
```bash
npm run dev
```

To build a production-ready build, run:
```bash
npm run build:prod
```

## Technical documentation
#### Technologies
The frontend part of this project is created in react (mostly typescript). We used webpack to build and manage the code. The design of the app was created in Figma.
#### Division
Our product is divided into backend and frontend that communicate through websockets. The way backend API works is described on the backend repository. The websocket address and port are defined as development environment variables.
#### Structure
The react components are either whole views or individual, common parts. There are also configuration, logging and service files, as well as styling sheets. All are placed in directories named accordingly.