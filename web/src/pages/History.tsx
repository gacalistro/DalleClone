import { useState, useEffect } from "react";
import { useLoaderData } from "react-router-dom";

import { Header } from "../components/Header";
import { Layout } from "../components/Layout";
import { Section } from "../components/Section";

type communityImage = {
  id: string;
  prompt: string;
  url: string;
  user: {
    name: string;
  };
};

import { UserPayloadProps } from "./Home";

export function History() {
  const [userImages, setUserImages] = useState<communityImage[]>([]);

  const { id } = useLoaderData() as UserPayloadProps;

  useEffect(() => {
    fetch(`http://localhost:3000/history/${id}`)
      .then((response) => response.json())
      .then((data) => setUserImages(data));
  }, []);

  return (
    <Layout>
      <Header />
      <Section title="Histórico" subtitle="Todas as imagens criadas por você">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-2 justify-items-center">
          {userImages.map((item) => (
            <div
              key={item.id}
              className="relative  shadow-md overflow-hidden border group hover:bg-gray-900 transition-colors"
            >
              <img
                src={item.url}
                alt=""
                className="w-full group-hover:opacity-30 transition-opacity"
              />
              <div className="w-full p-3 flex flex-col text-white absolute bottom-0 opacity-0 group-hover:opacity-100 transition-opacity">
                <span className="font-medium text-xs uppercase tracking-wider">
                  "
                  {item.prompt.length <= 50
                    ? item.prompt
                    : item.prompt.slice(0, 60).concat(" ...")}
                  "
                </span>
              </div>
            </div>
          ))}
        </div>
      </Section>
    </Layout>
  );
}
