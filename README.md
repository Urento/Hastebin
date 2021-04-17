# Hastebin
[![Server](https://github.com/Urento/Hastebin/actions/workflows/server.yml/badge.svg)](https://github.com/Urento/Hastebin/actions/workflows/server.yml)
[![Web](https://github.com/Urento/Hastebin/actions/workflows/web.yml/badge.svg)](https://github.com/Urento/Hastebin/actions/workflows/web.yml)
[![CodeQL](https://github.com/Urento/Hastebin/actions/workflows/codeql-analysis.yml/badge.svg)](https://github.com/Urento/Hastebin/actions/workflows/codeql-analysis.yml)

All pastes are AES256 encrypted, we cannot know what you paste...

# API
https://www.npmjs.com/package/hastebin-api

# Server Setup

Run npm install then go into the Server Directory and create a .env file with the same content as the .env.example. You just need to adjust the MONGODB_URI.
Then you can just start it with npm start

# React Setup

Run npm install then go into the Haste Directory and create a .env file with the same content as the .env.example. You just need to adjust the REACT_APP_ENCRYPTION_KEY your REACT_APP_HOSTNAME and REACT_APP_HTTP_OR_HTTPS.
Then you can just start it with npm start.

You can generate a Encryption Key at https://www.allkeysgenerator.com/Random/Security-Encryption-Key-Generator.aspx with 256-bit

# TODO

- Implement mikroORM
