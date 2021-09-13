# Homeproved Frontend

The application is build with [NX](https://nx.dev/) in React.  

It contains 2 applications: .com (is the public website for all visitors) and .pro (private crm website for our clients only)

### Login (will autoprefill normally)
u: superadmin@calibrator.be  
p: password

## Installation
I run Node 14.17.4 | npm 6.14.14 | yarn 1.22.5
```bash
yarn install
```
Build homeproved.PRO
```bash
yarn build pro --with-deps
```
Start homeproved.PRO (http://localhost:3001/)
```bash
yarn start pro
```

Build homeproved.COM
```bash
yarn build com --with-deps
```
Start homeproved.COM (http://localhost:3000/)
```bash
yarn start com
```

## API documentation
https://5a18-178-51-88-175.eu.ngrok.io/openapi  
For now I just hosted my local env with localtunnel, so if you see somewhere a localhost http://homeproved-backend.lokal.host:8888 you can replace this with the loca.lt url.  
 
It is a OpenApi docs, you can also copy this into https://editor.swagger.io/ or something, make a postman collection with it.

## NX documentation
I don't know NX myself, but some commands maybe needed are
#### shared-ui component
```bash
yarn rc:shared
```
#### other components
```bash
yarn rc pro
```
#### Libraries
```bash
yarn rl pro
```
#### Storybook
```bash
yarn storybook
```

Projectnames can be found in `workspace.json`
