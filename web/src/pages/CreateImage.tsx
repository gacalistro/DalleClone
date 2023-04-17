import { useState, FormEvent } from "react";
import { Cookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import { Image, CircleNotch } from "@phosphor-icons/react";
import clsx from "clsx";

import { Layout } from "../components/Layout";
import { Header } from "../components/Header";
import { Section } from "../components/Section";

type FormProps = {
  prompt: string;
  openAiImage: string;
};

export function CreateImage() {
  const [formData, setFormData] = useState<FormProps>({
    prompt: "",
    openAiImage: "",
  });
  const [inputValue, setInputValue] = useState("");
  const [loadingImage, setLoadingImage] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [generateImageErrorMessage, setGenerateImageErrorMessage] = useState<
    string | null
  >(null);
  const [createImageErrorMessage, setCreateImageErrorMessage] = useState<
    string | null
  >(null);

  const cookies = new Cookies();
  const navigate = useNavigate();

  function handleSurprise() {
    console.log("surprise");
  }

  function clearImage() {
    setFormData((prevState) => {
      return {
        ...prevState,
        openAiImage: "",
      };
    });
  }

  function verifyToken() {
    const token = cookies.get("dalle-user-token");

    if (!token) {
      setLoadingImage(false);
      alert("Usuário não autenticado. Faça login e tente novamente.");
      navigate("/login");
    } else {
      return token;
    }
  }

  async function delay() {
    await new Promise((resolve) => setTimeout(resolve, 2500));
  }

  async function handleGenerateImage() {
    if (inputValue.trim()) {
      try {
        setLoadingImage(true);
        clearImage();

        const token = verifyToken();

        await fetch("http://localhost:3000/genimage", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            prompt: inputValue,
          }),
        })
          .then(async (response) => {
            const data = await response.json();

            if (!response.ok) {
              throw new Error(data.error);
            }

            setFormData({
              openAiImage: `data:image/jpeg;base64,${data.openAiImage}`,
              prompt: inputValue,
            });
          })
          .finally(() => setLoadingImage(false));
      } catch (error) {
        const { message } = error as Error;
        setGenerateImageErrorMessage(message);
        await delay();
        setGenerateImageErrorMessage(null);
      }
    }
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setIsSubmitting(true);

    if (!formData.prompt) {
      return;
    }

    const token = verifyToken();

    try {
      setIsSubmitting(true);

      await fetch("http://localhost:3000/images", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          ...formData,
        }),
      })
        .then(async (response) => {
          const data = await response.json();

          if (!response.ok) {
            throw new Error(data.error);
          }

          if (response.status === 201) {
            navigate("/");
          }
        })
        .finally(() => setIsSubmitting(false));
    } catch (error) {
      const { message } = error as Error;
      setCreateImageErrorMessage(message);
      await delay();
      setCreateImageErrorMessage(null);
    }
  }

  return (
    <Layout>
      <Header />
      <Section title="Crie">
        <form onSubmit={(e) => handleSubmit(e)}>
          <div>
            <div>
              <label htmlFor="prompt" className="text-sm text-gray-600/75">
                Comece com uma descrição detalhada
              </label>
              <button
                type="button"
                className="ml-2 p-2 font-bold text-xs bg-gray-100 rounded-md"
                onClick={handleSurprise}
              >
                Me surpreenda
              </button>
            </div>

            <div className="mt-3 flex rounded-md shadow-md [&>*]:p-3">
              <input
                type="text"
                name="prompt"
                id="prompt"
                placeholder="Uma pintura impressionista à óleo de girassóis em um vaso roxo ..."
                className="w-full bg-white border-r border-gray-200 rounded-l-md placeholder:text-gray-400 outline-none"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
              />

              <button
                type="button"
                className={clsx(
                  "font-semibold rounded-r-md transition-colors",
                  {
                    ["bg-gray-900 text-white hover:opacity-90"]:
                      inputValue.trim(),
                    ["text-gray-500 bg-white"]: !inputValue.trim(),
                  }
                )}
                disabled={!inputValue.trim()}
                onClick={handleGenerateImage}
              >
                {loadingImage ? (
                  <CircleNotch size={20} className="animate-spin" />
                ) : (
                  "Gerar"
                )}
              </button>
            </div>

            {!!generateImageErrorMessage && (
              <span className="mt-2 block text-red-500 text-sm">
                {generateImageErrorMessage}
              </span>
            )}
          </div>

          <div
            className={clsx(
              "mt-5 w-44 h-44 flex items-center justify-center bg-gray-100 rounded-lg shadow-md overflow-hidden",
              {
                ["animate-pulse"]: loadingImage,
              }
            )}
          >
            {formData.openAiImage ? (
              <img
                src={formData.openAiImage}
                alt={formData.prompt}
                className="object-contain peer"
                width={176}
                height={176}
              />
            ) : (
              <Image size={48} className="opacity-50" />
            )}
          </div>

          <div className="mt-10 mb-10">
            <button
              type="submit"
              disabled={!formData.openAiImage}
              className={clsx(
                "w-full sm:w-72 h-12 p-3 font-medium text-white bg-black rounded-md flex items-center justify-center",
                {
                  ["opacity-70"]: !formData.openAiImage,
                }
              )}
            >
              {isSubmitting ? (
                <CircleNotch size={20} className="animate-spin" />
              ) : (
                "Compartilhe com a comunidade"
              )}
            </button>

            {createImageErrorMessage && (
              <span className="mt-2 block text-red-500 text-sm">
                {createImageErrorMessage}
              </span>
            )}
          </div>
        </form>
      </Section>
    </Layout>
  );
}
