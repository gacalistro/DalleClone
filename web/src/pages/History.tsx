import { useState, useEffect } from "react";
import { useLoaderData } from "react-router-dom";

import { Header } from "../components/Header";
import { Layout } from "../components/Layout";
import { Section } from "../components/Section";
import { ImageInList } from "../components/ImageInList";

import { UserPayloadProps, communityImageProps } from "./Home";

export function History() {
  const [userImages, setUserImages] = useState<communityImageProps[]>([]);

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
            <ImageInList key={item.id} {...item} />
          ))}
        </div>
      </Section>
    </Layout>
  );
}
