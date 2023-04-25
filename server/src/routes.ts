import { FastifyInstance } from "fastify";
import bcrypt from "bcrypt";
import z from "zod";

import { prisma } from "./lib/prisma";
import { openai } from "./lib/openai";
import { uploadImage } from "./lib/cloudinary";

import { generateToken, validateToken } from "./services/handleToken";

export async function routes(app: FastifyInstance) {
  // CREATE USER (SIGNIN and CREATE USER IN DATABASE)
  app.post("/signin", async (request, reply) => {
    // Validations using ZOD
    const UserValidation = z.object({
      name: z.string(),
      email: z.string().email(),
      password: z.string(),
    });

    const { name, email, password } = UserValidation.parse(request.body);

    const userExists = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (userExists) {
      return reply.status(401).send({ error: "Email já cadastrado" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    // Create User in Database
    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
      },
    });

    if (!user) {
      return reply
        .status(500)
        .send({ error: "Erro no servidor. Tente novamente mais tarde." });
    }

    const token = await generateToken(user);

    return reply.status(201).send({ token });
  });

  // AUTHENTICATE USER (LOGIN)
  app.post("/login", async (request, reply) => {
    const UserValidation = z.object({
      email: z.string().email(),
      password: z.string(),
    });

    const { email, password } = UserValidation.parse(request.body);

    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (!user) {
      return reply.status(401).send({ error: "Email não cadastrado" });
    }

    const passwordChecked = await bcrypt.compare(password, user.password);

    if (passwordChecked) {
      const token = await generateToken(user);

      return reply.status(200).send({
        token,
      });
    } else {
      return reply.status(401).send({ error: "Senha incorreta" });
    }
  });

  // VALIDATE USER (TOKEN)
  app.post("/users", async (request, reply) => {
    const token = request.headers.authorization;

    if (!token) {
      return reply.status(401).send({ error: "Usuário não autenticado." });
    }

    try {
      const { payload } = await validateToken(token);

      return reply.status(200).send({ payload });
    } catch (error) {
      return reply.status(401).send({ error: "Usuário não autenticado." });
    }
  });

  // GENERATE IMAGE (OPENAI API)
  app.post("/genimage", async (request, reply) => {
    // Validates token
    const token = request.headers.authorization;

    if (!token) {
      return reply.status(401).send({ error: "Usuário não autenticado." });
    }

    const { payload } = await validateToken(token);

    const { id } = payload as { id: string };

    // Verifies if users is registered in database
    const user = await prisma.user.findUnique({
      where: {
        id,
      },
    });

    if (!user) {
      return reply.status(401).send({ error: "Usuário não autorizado!" });
    }

    // Validations using ZOD
    const FormSchema = z.object({
      prompt: z
        .string()
        .trim()
        .min(4, "minimum of 4 characters")
        .max(1000, "maximum of 1000 characters"),
    });

    const { prompt } = FormSchema.parse(request.body);

    // Generating Image using OpenAiApi
    const openAiResponse = await openai.createImage({
      prompt,
      response_format: "b64_json",
    });

    const openAiImage = openAiResponse.data.data[0].b64_json;

    if (openAiImage) {
      return reply.status(201).send({ openAiImage });
    } else {
      return reply
        .status(500)
        .send({ error: "Erro ao gerar imagem. Tente novamente mais tarde." });
    }
  });

  // CREATE IMAGE IN DATABASE (CLOUDINARY and CREATE IMAGE IN DATABASE)
  app.post("/images", async (request, reply) => {
    // Validates token
    const token = request.headers.authorization;

    if (!token) {
      return reply.status(401).send({ error: "Usuário não autenticado." });
    }

    const { payload } = await validateToken(token);

    const { id } = payload as { id: string };

    // Verifies if users is registered in database
    const user = await prisma.user.findUnique({
      where: {
        id,
      },
    });

    if (!user) {
      return reply.status(401).send({ error: "Usuário não autorizado!" });
    }

    // Validations using ZOD
    const CreateImageSchema = z.object({
      prompt: z
        .string()
        .trim()
        .min(4, "minimum of 4 characters")
        .max(1000, "maximum of 1000 characters"),
      openAiImage: z.string(),
    });

    const { prompt, openAiImage } = CreateImageSchema.parse(request.body);

    const imageUrl = await uploadImage(openAiImage).catch((error) => {
      return reply
        .status(500)
        .send({ error: `Erro ao criar URL da imagem: ${error.message}` });
    });

    const image = await prisma.image.create({
      data: {
        userId: user.id,
        prompt,
        url: imageUrl,
      },
    });

    if (!image) {
      return reply.status(500).send({ error: "Erro ao criar a imagem." });
    }

    return reply.status(201).send({ success: "created" });
  });

  // GET UP TO 10 IMAGES FROM DATABASE
  app.get("/images", async (request, reply) => {
    return await prisma.image.findMany({
      take: 10,
      include: {
        user: {
          select: {
            name: true,
          },
        },
      },
    });
  });

  // GET ALL IMAGES FROM A SPECIFIC USER FROM DATABASE
  app.get("/history/:id", async (request, reply) => {
    const { id } = request.params as { id: string };

    const user = await prisma.user.findUnique({
      where: {
        id,
      },
    });

    if (!user) {
      return reply.status(400).send({ error: "Usuário não encontrado" });
    }

    return await prisma.image.findMany({
      where: {
        userId: user.id,
      },
      include: {
        user: {
          select: {
            name: true,
          },
        },
      },
    });
  });
}
