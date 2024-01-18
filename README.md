# README for Tegro Pay Extension for Google Chrome

## Introduction
Tegro Pay Extension is a Chrome extension that integrates seamlessly with the "https://tegro.money/" API to facilitate the creation and management of payment invoices directly from your browser.

## Features
- **Secure Authentication**: Utilizes Public and API keys for secure sign-in.
- **Data Encryption**: Implements MD5 and SHA256 encryption for data security.
- **Local Storage**: Leverages Chrome's local storage for persisting invoice parameters.
- **Dynamic Invoice Management**: Functions to add, remove, and display saved invoices.

## Architecture
- **Manifest**: Configured with Manifest v3 for modern Chrome extensions.
- **Icons**: A set of icons provided for various resolutions.
- **Background Script**: Powers the opening of the extension's page upon icon click.
- **Popup Interface**: Contains the HTML, CSS, and JavaScript for the user interface.

## Scripts
- `crypto-js.js`: A robust cryptographic library for secure hashing and encryption.
- `spark-md5.min.js`: An efficient MD5 hashing library.
- `popup.js`: The heart of the extension, handling API interactions and user inputs.

## Getting Started
To use the extension, load it into Chrome through the Extensions page (`chrome://extensions/`). Ensure you have the necessary API keys from Tegro.money for authentication.

## Usage
After installation, click the Tegro Pay icon to bring up the popup interface. Authenticate using your Public and API keys, and start creating and managing your payment invoices with ease.

## Contribution
Contributions to the Tegro Pay Extension are welcome. Please read the contributing guidelines before submitting pull requests.

## License
Tegro Pay Extension is licensed under the [MIT License](LICENSE.md), making it free and open-source software.
