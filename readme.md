<h1 align="center">
<img src="https://i.imgur.com/0Fwu7pb.png" height="30"/>
DALL·E 2 Clone</h1>

<p align="center">
<img src="https://i.imgur.com/J1siJwQ.png" height="320"/>
<img src="https://i.imgur.com/7frTokE.jpeg" height="320"/>
</p>

## Projeto

Projeto feito baseado no DALL·E 2 da OpenAI utilizando a OpenAI API. Foram desenvolvidas versões web responsiva com React e também mobile nativo com React Native. As imagens são geradas pela IA da OpenAI enviando um prompt para a OpenAI API e como retorno uma imagem Base64. Para conversão e upload de imagens, utilizei a CloudinaryAPI que é excelente para o armazenamento e utilização na aplicação pois retorna apenas um URL da imagem armazenada. As imagens são vinculadas a cada usuário que a gerou. Os usuários são criados/armazenados/autenticados usando o conjunto poderoso de Fastify e Prisma como base do backend e gerenciamento da base de dados, ambos escrito com Typescript.

O Layout foi adaptado/criado por mim analisando o original e seu código fonte.

## Stack

- [TypeScript](https://www.typescriptlang.org/), [Fastify](https://www.fastify.io/), [React](https://reactjs.org/), [Vite](https://vitejs.dev/), [ReactNative](https://reactnative.dev/), [Expo](https://expo.dev/), [TailwindCSS](https://tailwindcss.com/), [Radix](https://www.radix-ui.com/), [NativeWind](https://www.nativewind.dev/), [Prisma](https://www.prisma.io/) and [Cloudinary](https://cloudinary.com/)
