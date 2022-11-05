# Ccm Front End React

**Core tech Stack**

- React
- Ionic
- React Leaflet

For the full list of dependencies see `package.json`

---

**How to run**

The first thing to do is to clone the repository:

      git clone https://github.com/carbonmap/ccm-front-end-react.git

Install the Ionic CLI globally with npm:

    npm install -g @ionic/cli@6.13.1

Switch to the project directory and run:

    cd ccm-front-end-react
    npm install
    ionic serve

The above will install all dependencies and run the app in the development mode locally

The application should now be accessible via `localhost:8100`

---

## Emulate data server

We need to put the dummy_data directory onto a local server so that we can make requests for its data from our front-end server.

1. Install http-server
```
   npm install -g http-server
```

2. In a terminal in the repository root, run:
```
   http-server ./dummy_data --cors -a localhost -p 8001
```
Or

1. Run the command using npx
```
   npx http-server ./dummy_data --cors -a localhost -p 8001
```
There should now be a localhost directory for the data in one of the links presented (e.g. http://localhost:8001)

This is emulating the data AWS bucket that we will be using
