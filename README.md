# ChangeKeyApp

**ChangeKeyApp** is a decentralized application (dApp) built with React that allows users to securely update their private key on the KaiaChain blockchain. With an intuitive interface, users can manually input their old private key and wallet address, generate a new private key, and update their public key on KaiaChain.
Visit the live version of the app: [ChangeKeyApp](https://changekaiakey.netlify.app/).

## Features

- **Manual Private Key Input**: Users manually input their old private key and wallet address to begin the key update process on KaiaChain.
- **Key Update Process**: The app generates a new private key and securely updates the account's public key on the KaiaChain blockchain.
- **Copy Functionality**: Users can easily copy the newly generated private key and account public key to their clipboard for safekeeping.
- **KaiaChain Integration**: The application is tightly integrated with the KaiaChain blockchain, making it a seamless solution for account key updates.
- **Error Handling and Validation**: The app includes robust error handling and private key validation, ensuring that users are informed if an invalid key format is provided.

## Technologies Used

- **React**: Frontend framework for building the user interface.
- **KaiaChain SDK**: For interacting with the KaiaChain blockchain.
- **JavaScript**: The programming language used to handle logic and data processing.
- **Netlify**: Hosting platform for the application.

## How It Works

1. The user enters their old private key and wallet address in the provided input fields.
2. Upon submission, the app interacts with KaiaChain to validate the old private key.
3. A new private key is generated, and the account's public key is updated on KaiaChain.
4. Users can copy the new private key and public key to their clipboard for safekeeping.

## Installation and Setup

To run this project locally, follow these steps:

1. Clone the repository:
   ```bash
   git clone https://github.com/vadrthanh/private_key_change.git
2. Navigate to the project directory:
    ```bash
    cd private_key_change
3. Install the dependencies
   ```bash
   npm install
4. Start the development server:
  ```bash
  npm start



