# JackuBot

## Usage

### Install dependencies and build from source:

```bash
yarn
yarn build
```

### Create `start.sh` file

**./starth.sh/**

```bash
#!/bin/bash

GITLAB_PRIVATE_TOKEN=<private_token> DISCORD_WEBHOOK_URL=https://discordapp.com/api/webhooks/<id>/<token> node dist/index.js
```

**Make the shell script executable**

```bash
chmod +x start.sh
```

**Run the bot**

```bash
./start.sh
```
