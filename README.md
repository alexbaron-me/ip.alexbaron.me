# IP Information Service

A minimal Cloudflare Worker that provides information about the requesting IP address. Built to avoid ad-heavy IP lookup sites.

## Features

- Returns IP address and geolocation data
- Content negotiation based on Accept header
- HTML response for browser requests
- JSON response for API requests
- Displays request headers
- Shows Cloudflare bot detection score

## Usage

### Browser Access
Navigate to the deployed URL in a browser to get a formatted HTML page with IP information.

### API Access
Send requests with `Accept: application/json` header to receive JSON response:

```bash
curl -H "Accept: application/json" https://ip.alexbaron.me/
```

## Response Data

- IP address
- Location (city, region, country, continent)
- Timezone and postal code
- Coordinates (latitude, longitude)
- ASN and organization
- Cloudflare bot score
- Raw request headers

## Development

```bash
# Install dependencies
pnpm install

# Run locally
pnpm dev

# Deploy to Cloudflare Workers
pnpm deploy
```

## Implementation

Built with TypeScript on Cloudflare Workers platform. Uses Cloudflare's request.cf object for IP geolocation data.
