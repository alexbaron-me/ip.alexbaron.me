export const cssStyles = `
body {
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
    max-width: 800px;
    margin: 40px auto;
    padding: 20px;
    background: #f5f5f5;
}

.container {
    background: white;
    border-radius: 8px;
    padding: 30px;
    box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}

h1 {
    color: #333;
    margin-bottom: 30px;
    font-size: 28px;
}

.info-grid {
    display: grid;
    grid-template-columns: auto 1fr;
    gap: 15px;
    margin-bottom: 30px;
}

.label {
    font-weight: 600;
    color: #666;
    text-align: right;
    padding-right: 15px;
}

.value {
    color: #333;
    font-family: "SF Mono", Monaco, "Cascadia Code", monospace;
}

.null-value {
    color: #999;
    font-style: italic;
}

.section-title {
    font-size: 20px;
    color: #333;
    margin: 30px 0 20px 0;
    padding-top: 20px;
    border-top: 1px solid #e0e0e0;
}

details {
    margin-top: 30px;
    border-top: 1px solid #e0e0e0;
    padding-top: 20px;
}

summary {
    cursor: pointer;
    font-weight: 600;
    color: #666;
    margin-bottom: 15px;
}

.headers-list {
    background: #f8f8f8;
    padding: 15px;
    border-radius: 4px;
    font-family: "SF Mono", Monaco, "Cascadia Code", monospace;
    font-size: 14px;
    max-height: 400px;
    overflow-y: auto;
}

.header-item {
    display: grid;
    grid-template-columns: 200px 1fr;
    gap: 10px;
    margin-bottom: 8px;
    word-break: break-word;
}

.header-name {
    font-weight: 600;
    color: #0066cc;
}

.header-value {
    color: #333;
}`;