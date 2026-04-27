# Security Policy

## Supported Versions

Only the latest version of RAMScan India is supported for security updates.

| Version | Supported          |
| ------- | ------------------ |
| v1.x    | :white_check_mark: |

## Reporting a Vulnerability

If you discover a security vulnerability within this project, please do not use the public issue tracker. Instead, please report it via the contact methods listed on the contributor profiles or the repository owner's GitHub page.

We take security seriously and will respond to reports within 48 hours.

## Local Security Measures

- **Data Privacy**: All scanned prices and comparison data are stored locally in your browser's `localStorage`. No data is ever transmitted to a central server.
- **Rate Limiting**: The client-side rate limiter is designed to protect third-party vendor sites from excessive automated requests originating from the app.
- **Content Security**: We use trusted CDNs for external assets (fonts, images) and ensure all dependencies are kept up-to-date.
