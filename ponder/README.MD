t ## Getting Started

### Prerequisites
- Python 3.8 or higher
- pip package manager

### Installation
1. Clone the repository
```
git clone https://github.com/FormaArt/ponder.git
```
2. Install required dependencies
```
cd ponder
pip install -r requirements.txt
```
3. Create a .env file with the following variables:
```
PONDER_RPC_URL=https://rpc.sketchpad-1.forma.art
PONDER_CHAIN_ID=984123
PONDER_START_BLOCK=584693
PONDER_DROP_ADDRESS=
PONDER_MARKETPLACE_ADDRESS=
PONDER_GENERATIVE_ERC721_ADDRESSES=
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/postgres"
```
4. Run the script
```
yarn dev
```

