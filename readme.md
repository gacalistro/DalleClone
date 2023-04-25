<h1 align="center">
<img src="https://i.imgur.com/0Fwu7pb.png" height="30"/>
DALL·E 2 Clone</h1>

<p align="center">
<img src="https://i.imgur.com/J1siJwQ.png" height="320"/>
<img src="https://i.imgur.com/7frTokE.jpeg" height="320"/>
</p>

## Running it locally

###### First start the server

- server (node.js using fastify and typescript)

```
cd server/
npm run dev

# Let it running for the app keeps working
```

###### Then choose which platform to use

- web (using Vite)

```
cd web/
npm run dev

# Go to http://localhost:5173/ or the link provide by Vite
```

- native mobile app (using Expo and ExpoGO)

```
cd mobile/
npm run start
# Read the QRCode with Expo Go
```

## Stack

- [TypeScript](https://www.typescriptlang.org/), [Fastify](https://www.fastify.io/), [React](https://reactjs.org/), [Vite](https://vitejs.dev/), [ReactNative](https://reactnative.dev/), [Expo](https://expo.dev/), [TailwindCSS](https://tailwindcss.com/), [Radix](https://www.radix-ui.com/) and [NativeWind](https://www.nativewind.dev/)
