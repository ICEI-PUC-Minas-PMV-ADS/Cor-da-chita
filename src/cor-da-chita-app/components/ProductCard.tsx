// Para renderizar os cards dos produtos ao clicar em categoria ou usar o menu de busca
"use client";

import React, { useContext, useEffect, useState } from "react";
import { Card, CardBody, Image, CardFooter, Link } from "@nextui-org/react";

import CartPlusIcon from "../assets/icons/CartPlusIcon";
import { Produto } from "../lib/interface";
import { useRouter } from "next/navigation";
import { ProductContext } from "@/contexts/ProductContext/ProductContext";

interface ProductCardProps {
  data: Produto[] | undefined;
}

export default function ProductCard(product: ProductCardProps, ...props: any) {
  const route = useRouter();
  const b = [];

  // Pegar os dados do produto que foi clicado pelo usuário (exibido no anúncio)
  const productAds = useContext(ProductContext);
  const [productData, setProductData] = useState<Produto[] | undefined>([]);

  useEffect(() => {
    setProductData(product.data);
    // handleSeeLc();
  });

  function handleClick(product: Produto) {
    console.log(product);

    productAds.setId(product._id);
    productAds.setName(product.nome);
    productAds.setCategory(product.categoria);
    productAds.setStock(product.estoque);
    productAds.setDescription(product.descricao.children.text);
    productAds.setPrice(product.preco);
    productAds.setWeight(product.peso);
    productAds.setLength(product.comprimento);
    productAds.setWidth(product.largura);
    productAds.setHeight(product.altura);
    productAds.setImage(product.imagem);
    productAds.setSlug(product.slug.current);

    route.push(`/advertisement/${product.slug.current}/${product._id}`);
  }

  const handleStorageProductCart = (id: string) => {
    const arrItens = JSON.parse(localStorage.getItem("cartItens") || "[]");

    if (arrItens.includes(id)) {
      alert("Este item já esta no seu carrinho");
    } else {
      arrItens.push(id);

      localStorage.setItem("cartItens", JSON.stringify(arrItens));
    }
  };

  return (
    <>
      {productData?.map((product) => (
        <article key={product._id}>
          <Card isPressable onPress={() => handleClick(product)}>
            <CardBody className="overflow-visible p-4">
              <Image
                alt="Card background"
                className="object-cover rounded-xl"
                src={product.imagem}
                width={180}
                height={180}
              />
              <CardFooter className="pb-0 pt-2 flex-col items-start">
                <p className="font-bold text-medium">{product.nome}</p>
                <small className="text-500">
                  R$ {product.preco.toFixed(2)}
                </small>
              </CardFooter>
            </CardBody>
            <Link className="p-4" href="" onClick={() => handleStorageProductCart(product._id)}>
              <CartPlusIcon />
            </Link>
          </Card>
        </article>
      ))}
    </>
  );
}
