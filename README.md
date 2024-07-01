# SolarEdge UI

A little React Web UI to keep an eye on your SolarEdge usage.
Backend API written in Go with the ability to cache specific requests.

# Example
![image](https://github.com/jordan-mace/solaredge-ui/assets/1805887/5c5716fe-0fb7-4cae-b048-15809a7b84d7)

## Backend

The backend runs on port 8080 while the frontend runs on port 3000.

### Setup

To get started, you'll need to get your site ID and your API Key.

Go to [SolarEdge Monitoring](https://monitoring.solaredge.com/solaredge-web/p/login?locale=en_US) and log in. Your site ID is your ID shown on the page.

To get your API key, click Admin > Site Access and scroll down to API Access.

Tick the 'I have agreed' and click Save. A new API Key should generate.

### Run

Running the backend is simple, just run `SE_API_KEY=[YOUR API KEY HERE] SE_SITE=[YOUR SITE ID HERE] go run api/index.go`

## Frontend

#### Available Scripts

In the project directory, you can run:

#### `npm start`

Runs the app in the development mode.
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.
You will also see any lint errors in the console.

#### `npm test`

Launches the test runner in the interactive watch mode.

#### `npm run build`

Builds the app for production to the `build` folder.
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.
