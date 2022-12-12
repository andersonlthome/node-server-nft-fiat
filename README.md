## Backend NFT Marketplace with FIAT - NodeJS | Web3Auth | Prisma | Swagger | Thirdweb ERC-721 | MercadoPagoAPI

The goal of this project is to create a backend for a marketplace that allows users to buy NFTs (non-fungible tokens) using their fiat currency, with credit card or pix using MercadoPago API. The marketplace utilizes web3auth for user authentication, allowing users to login with their social account or blockchain wallet.

The project is built using Node.js and Typescript, with Swagger for API documentation and Prisma as the ORM to connect to the Postgres database. The Thirdweb ERC-721 contract is used for the NFT transactions.

With this marketplace, users can easily and securely purchase NFTs using their existing payment methods, without the need for a cryptocurrency wallet or exchange.

### Tecnologies:
- NodeJS
- Typescript
- Prisma
- Swagger
- PostgresDB
- Web3Auth
- MercadoPagoAPI
- Thirdweb ERC-721

See the [FRONTEND](https://github.com/andersonlthome/next-nft-fiat-web3auth) for the client-side implementation.

## Steps to run:

- To start the development run:
```
yarn install
yarn build
yarn dev
```

- when altering schema.prisma (tables db) example
```
npx prisma migrate dev --name name_modification
```

- to see the Database
```
npx prisma studio
```
