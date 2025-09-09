export const htmlTemplate = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>IP Information</title>
    <style>
        {{CSS_CONTENT}}
    </style>
</head>
<body>
    <div class="container">
        <h1>IP Information</h1>
        
        <div class="info-grid">
            <div class="label">IP Address:</div>
            <div class="value">{{IP}}</div>
            
            <div class="label">Location:</div>
            <div class="value">{{LOCATION}}</div>
            
            <div class="label">Continent:</div>
            <div class="value">{{CONTINENT}}</div>
            
            <div class="label">Timezone:</div>
            <div class="value">{{TIMEZONE}}</div>
            
            <div class="label">Postal Code:</div>
            <div class="value">{{POSTAL_CODE}}</div>
            
            <div class="label">Coordinates:</div>
            <div class="value">{{COORDINATES}}</div>
            
            <div class="label">ASN:</div>
            <div class="value">{{ASN}}</div>
            
            <div class="label">Organization:</div>
            <div class="value">{{ORGANIZATION}}</div>
            
            <div class="label">Bot Score:</div>
            <div class="value">{{BOT_SCORE}}</div>
        </div>
        
        <details>
            <summary>Request Headers ({{HEADER_COUNT}})</summary>
            <div class="headers-list">
                {{HEADERS_HTML}}
            </div>
        </details>
    </div>
</body>
</html>`;