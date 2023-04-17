import { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import clsx from "clsx";
import { CircleNotch, WarningCircle } from "@phosphor-icons/react";

import Logo from "/openai.svg";

import { AuthContext } from "../contexts/AuthContext";

const loginFormSchema = z.object({
  email: z
    .string()
    .nonempty("Campo obrigatório")
    .email("Email precisa ser válido")
    .toLowerCase(),
  password: z
    .string()
    .nonempty("Campo obrigatório")
    .min(5, "Senha precisa de mín. 5 caracteres"),
});

type LoginFormData = z.infer<typeof loginFormSchema>;

export function Login() {
  const [fetchError, setFetchError] = useState<string | null>(null);

  const { login } = useContext(AuthContext);
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginFormSchema),
  });

  async function handleLogin({ email, password }: LoginFormData) {
    try {
      // Validates user data and if it returns a successful message, it will redirect to home page.
      await login({ email, password });
      navigate("/");
    } catch (error) {
      // If login function returns an error, it will show an error message for 1.8 seconds
      const { message } = error as Error;
      setFetchError(message);
      await new Promise((resolve) => setTimeout(resolve, 1000 * 1.8)); // 1.8 seconds
      setFetchError(null);
    }
  }

  return (
    <div className="w-full min-h-screen px-4 py-6 flex flex-col justify-center items-center">
      <img src={Logo} alt="OpenAi Logo" className="w-10" />

      <h1 className="my-7 font-bold text-gray-800 text-3xl text-center">
        Use sua conta
      </h1>

      <form
        className="max-w-xs w-full flex flex-col gap-4"
        onSubmit={handleSubmit(handleLogin)}
      >
        {/* EMAIL FIELD */}
        <div className="flex flex-col-reverse">
          {errors.email && (
            <span className="mt-1 text-xs text-red-500">
              {errors.email.message}
            </span>
          )}

          <input
            type="text"
            id="email"
            {...register("email")}
            className={clsx(
              "p-4 border border-gray-300 rounded-md outline-none peer",
              {
                ["border-red-500"]: errors.email,
                ["focus:border-emerald-600"]: !errors.email,
              }
            )}
          />

          <label
            htmlFor="email"
            className={clsx("text-sm", {
              ["text-red-500"]: errors.email,
              ["peer-focus:text-emerald-600"]: !errors.email,
            })}
          >
            Email
          </label>
        </div>

        {/* PASSWORD FIELD */}
        <div className="flex flex-col-reverse">
          {errors.password && (
            <span className="mt-1 text-xs text-red-500">
              {errors.password.message}
            </span>
          )}

          <input
            type="password"
            id="password"
            {...register("password")}
            className={clsx(
              "p-4 border border-gray-300 rounded-md outline-none peer",
              {
                ["border-red-500"]: errors.password,
                ["focus:border-emerald-600"]: !errors.password,
              }
            )}
          />

          <label
            htmlFor="password"
            className={clsx("text-sm", {
              ["text-red-500"]: errors.password,
              ["peer-focus:text-emerald-600"]: !errors.password,
            })}
          >
            Senha
          </label>
        </div>

        <div>
          <button
            type="submit"
            className={clsx(
              "w-full h-14 font-medium text-sm text-white bg-emerald-600 hover:bg-emerald-700 rounded-md flex items-center justify-center",
              {
                ["disabled:bg-emerald-700"]: isSubmitting && !fetchError,
                ["disabled:bg-red-500"]: isSubmitting && fetchError,
              }
            )}
            disabled={isSubmitting}
          >
            {isSubmitting && !fetchError && (
              <CircleNotch size={25} className="animate-spin" />
            )}

            {isSubmitting && fetchError && <WarningCircle size={25} />}

            {!isSubmitting && "Continuar"}
          </button>

          {fetchError && (
            <span className="mt-1 text-sm text-red-500">{fetchError}</span>
          )}
        </div>

        <div className="mt-3 text-sm text-center">
          Não tem uma conta?{" "}
          <a href="/signin" className="text-emerald-600">
            Registre-se
          </a>
        </div>
      </form>
    </div>
  );
}
