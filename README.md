# Fake Product Identification Using Blockchain Technology

## Overview

Fake Product Identification Using Blockchain Technology is a blockchain-based system developed to detect and prevent counterfeit products in the market. The project leverages blockchain's distributed ledger technology to provide transparency, security, and immutability in product verification.

Each product is assigned a unique serial number and stored on the blockchain. Consumers can verify the authenticity of a product by entering its serial number. If the serial number exists on the blockchain, the product is identified as genuine; otherwise, it is classified as fake.

## Problem Statement

Counterfeit products have become a major challenge across various industries, causing financial losses to manufacturers and reducing consumer trust. Traditional product verification methods can be manipulated or forged.

This project addresses these issues by utilizing blockchain technology, where product information is securely stored in a decentralized and tamper-proof ledger.

## Objectives

* Detect counterfeit products using blockchain technology.
* Provide secure and transparent product verification.
* Ensure data integrity through decentralized storage.
* Increase consumer trust in product authenticity.

## Features

* Product registration on blockchain.
* Unique serial number generation.
* Product authenticity verification.
* Tamper-proof product records.
* Transparent and decentralized ledger.
* Fake product detection mechanism.


## Technologies Used

- Blockchain Technology
- Solidity- v0.8.19
- Truffle Framework- v5.11.5
- Ganache- v7.9.1
- MetaMask Wallet
- Web3.js- v1.10.0
- Node.js- v18.20.8
- HTML5
- CSS3
- JavaScript

## System Workflow

1. Start Ganache and connect the blockchain network.
2. Open the project directory in Command Prompt or Visual Studio Code.
3. Compile the smart contracts using:

```bash
truffle compile
```
<img width="1917" height="1123" alt="truffle compile" src="https://github.com/user-attachments/assets/24545eae-174c-4303-a0ee-cd4e5001675a" />

4. Deploy the smart contracts to Ganache using:

```bash
truffle migrate
```
<img width="1687" height="1078" alt="Deployed contracts" src="https://github.com/user-attachments/assets/0b2d1660-9a22-4623-8f3f-18596091e4e7" />

5. Register products on the blockchain using:

```bash
truffle exec scripts/fullFlow.js
```
<img width="1919" height="1118" alt="adding products" src="https://github.com/user-attachments/assets/5e790ba7-b2df-4e2a-9137-b61f00ed6151" />

6. Verify products using:

```bash
truffle exec scripts/verifyProduct.js
```
<img width="1899" height="1107" alt="verify product" src="https://github.com/user-attachments/assets/83bd8634-27ed-4a7e-b543-230dc9a64ec7" />

7. Enter a product serial number:

   * If the serial number exists on the blockchain, the product is displayed as Genuine.
   * If the serial number does not exist, the product is displayed as Fake.

## Advantages

* Decentralized architecture.
* High security and transparency.
* Immutable product records.
* Reduced risk of counterfeit products.
* Easy product verification process.

## Future Enhancements

* QR Code-based product verification.
* Mobile application integration.
* Cloud deployment.
* Multi-manufacturer support.
* Real-time product tracking.

## Author

Hiteshini Kongara

## License

This project is developed for educational and academic purposes.
