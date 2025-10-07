# Signed Typed Data Issue Demo

This demo app showcases a Privy message signing issue with typed data. It allows you to test signing EIP-712 typed data with two different examples to demonstrate the problem.

## How to Use

1. **Start the app**: Run `npm run dev` to start the development server
2. **Connect your wallet**: Click "Get started" to authenticate with Privy
3. **Test signing**: Once authenticated, you'll see two options:
   - **"Sign typed data - working"**: Tests with a smaller data payload that should work
   - **"Sign typed data - failing"**: Tests with a larger data payload that may fail

## What This Demonstrates

The app demonstrates an issue where signing large typed data payloads through Privy may fail, while smaller payloads work correctly. The "failing" example uses the full data payload, while the "working" example uses only the 1/3 of the data.