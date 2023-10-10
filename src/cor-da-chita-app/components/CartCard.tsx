// EM ANDAMENTO

import React from "react";
import Link from "next/link";
import IconBagX from "@/assets/icons/IconBagX";
import { Card, CardBody, Image, Button, Progress } from "@nextui-org/react";
import { Produto } from "@/lib/interface";
import ButtonOnlyIcon from "./ui/ButtonOnlyIcon";

export default function CardCard(...props: any) {
  return (
    <div className="bg-zinc-600 ">
      <Card isBlurred className="w-11" shadow="md">
        <CardBody>
          <div className="flex flex-col w-full">
            <div className="flex  items-start w-full mt-4 ">
              <Image
                alt="Album cover"
                className="mr-2"
                height={200}
                shadow="md"
                src={props.imagem}
                width="20%"
              />

              <div className="flex flex-col">
                <p className="font-semibold font-sans mt-2 ml-2  ">Ecobag</p>
                {/* <p className="font-semibold font-sans mt-2 ">{props.categoria}</p>
                {/* <p className="font-semibold font-sans mt-2 ">{props.nome}</p>
                <p className="font-semibold font-sans mt-2 ">{props.preco}</p> */}
                <p className="font-semibold font-sans mt-2 ml-2 ">
                  Olha pro céu meu amor
                </p>
                <p className="font-semibold font-sans mt-2 ml-2  ">R$20,58</p>
              </div>
              <ButtonOnlyIcon className="h-9 mt-2" isIconOnly color="danger">
                <IconBagX />
              </ButtonOnlyIcon>
            </div>
          </div>
        </CardBody>
      </Card>
    </div>
  );
}
