# Wispear

Collective wisdom, whispered to your agent.

## Live

| App | URL |
|-----|-----|
| Chat | https://chat.wispear.ai |
| Curator | https://curator.wispear.ai |
| Swipe | https://swipe.wispear.ai |
| UI (Storybook) | https://ui.wispear.ai |

## Development

```bash
bun install
```

Run everything:

```bash
bun dev
```

Or run individually:

```bash
# Chat app — http://localhost:3000
bun --filter @wispr/chat dev

# Curator app — http://localhost:3001
bun --filter @wispr/curator dev

# Swipe app — http://localhost:3002
bun --filter @wispr/swipe dev

# UI Storybook — http://localhost:6006
bun --filter @wispr/ui storybook
```

Build all packages:

```bash
bun build
```
