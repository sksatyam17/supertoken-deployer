---
name: "Superfluid Token Factory Deployer"
description: "Enables an AI agent to instantly upgrade any base ERC-20 token into a streamable Super Token via the Superfluid protocol factory."
---

## Capabilities
- Deploys an on-chain UUPSProxy Wrapper for an ERC-20 token.
- Natively registers the new token with the Superfluid framework so it can be streamed per second.

## Expected Agent Input Format (JSON)
```json
{
  "underlyingTokenAddress": "0x...", 
  "tokenName": "Super Tower Token",
  "tokenSymbol": "TOWERx"
}
