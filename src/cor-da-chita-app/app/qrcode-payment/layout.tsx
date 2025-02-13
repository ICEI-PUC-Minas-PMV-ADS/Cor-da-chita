// Layout das telas referentes ao processo de pedido:
// your-data; shipping-data; sumary-order
import React from "react";

export default function OrderLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="container mx-auto pb-20">
      {/* <h1>OrderLayout AQUI</h1>
      <p>Esse layout será para as telas referentes ao processo de pedido </p>
      <p>Seus Dados (your-data)</p>
      <p>Dados de Envio (shipping-data)</p>
      <p>Resumo do Pedido (sumary-order)</p> */}
      {children}
    </div>
  );
}
