# Erc 20 wallet Integration

## Features

### Wallet Connection and Account Management

- **Connect Wallet**: Users can connect their Ethereum-compatible wallet to the app using the Wagmi library.
- **Account Details**: Displays connected wallet information, including the account address and token balance.
- **Auto Refresh**: The `AccountDetails` component refreshes automatically on certain events, ensuring up-to-date account information.

### Token Interactions

- **Mint Token**: Allows the user to mint new tokens, with a callback to update the state upon successful minting.
- **Token Balance Display**: The `TokenDisplayComponent` shows the current token balance of the connected account, refreshing automatically as the balance changes.
- **Transfer Token**: Enables transferring tokens from the connected account to other addresses.
- **Approve Spending**: The `ApproveComponent` lets the user grant permission to a third party to spend tokens on their behalf.
- **Allowance Check**: The `AllowanceComponent` displays the approved allowance for a specific spender address.
- **Transfer From Another Account**: The `TransferFromComponent` allows tokens to be transferred from one account to another if allowance is set.

### Token Management

- **Burn Token**: Allows the connected account to burn (destroy) a specified amount of tokens.
- **Burn Token From Another Account**: Enables burning tokens from a different account if allowance is set.
- **Pause and Unpause**: The `PauseUnpauseComponent` lets the admin pause or unpause token transfers, useful for temporary restrictions.

### Transaction and Event Tracking

- **Transaction History**: Displays the transaction history of the connected account, automatically refreshing when state changes occur.
- **Event Log**: The `EventLogComponent` provides a log of token-related events, such as transfers and approvals, to help users track token activity.

### Additional Features

- **Automatic State Management**: State changes trigger component updates for a seamless and dynamic user experience.
- **Responsive Layout**: Components are organized within responsive containers, providing a user-friendly interface across devices.

### Getting Started

1. **Clone the Repository**

   ```bash
   git clone <repo-url>

   ```

1. **Running development server**

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```
