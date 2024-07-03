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

#### `npm test`

#### `npm run build`

## Docker

#### Environment Variables

The following environment variables can be passed in

##### Frontend

`SE_API_HOST` is the hostname for your `solaredge-api` instance. Note that because fetching of data is done client-side, this host must be accessible to all end users. Example: `SE_API_HOST=api.domain.com`

`SE_API_HTTPS` is a true/false value to determine whether HTTPS is used when hitting the API. Example: `SE_API_HTTPS=true`

### Run

For the backend: `docker run -p 8080:8080 jordz0005/solaredge-api`
For the frontend: `docker run -p 3000:3000 jordz0005/solaredge-web`

### Compose

An example compose file can be found at `compose.yaml`.

Similar to the above, your services do not need to be on the same network or be linked, as the API requests are done client side.
