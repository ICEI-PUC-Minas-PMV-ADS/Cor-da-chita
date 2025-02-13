﻿using cor_da_chita_api.Models;

namespace cor_da_chita_api
{
    public static class EmailBodyBuilderOwner
    {
        private static string TABLE_WITH_PRODUCT_INFO = @"
                <tr>
                    <th>Produto/Serviço</th>
                    <th>Quantidade</th>
                    <th>Preço Unitário</th>
                    <th>Total</th>
                </tr>";

        private static string MAIN_EMAIL_BODY = @"
            <!DOCTYPE html>
                <html lang=""en"">
                <head>
                    <meta charset=""UTF-8"">
                    <meta name=""viewport"" content=""width=device-width, initial-scale=1.0"">
                    <title>Confirmação de Pedido</title>
                    <style>
                        body {
                            font-family: 'Arial', sans-serif;
                            line-height: 1.6;
                            color: #333;
                        }

                        h1, h2, h3 {
                            color: #009688;
                        }

                        table {
                            width: 100%;
                            border-collapse: collapse;
                            margin-top: 15px;
                            table-layout: auto;
                        }

                        th, td {
                            border: 1px solid #ddd;
                            padding: 8px;
                            text-align: left;
                            width: auto;
                        }

                        th {
                            background-color: #009688;
                            color: #fff;
                        }

                        p {
                            margin-bottom: 10px;
                        }

                        .summary {
                            font-weight: bold;
                        }
                        
                    </style>
                </head>
                <body>
                    <h1>Olá <strong>Madriana</strong>,</h1>

                    <p>Você recebeu mais um pedido! O pedido número <strong>##ORDERNUMBER##</strong>, feito em <strong>##ORDERDATE##</strong>, está sendo processado.</p>

                    <h2>Detalhes do Pedido:</h2>
                    <table>
                        ##TABLE##
                    </table>

                    <h2>Informações do Cliente:</h2>
                    <p><strong>Nome:</strong> ##USERNAME##</p>
                    <p><strong>Endereço:</strong> ##SENDADDRESS##</p>
                    <p><strong>E-mail:</strong> ##USEREMAIL##</p>
                    <p><strong>Telefone:</strong> ##USERPHONENUMBER##</p>

                    <h2>Resumo Financeiro:</h2>
                    <p><strong>Subtotal:</strong> ##SUBTOTAL## </p>
                    <p><strong>Taxas de Envio:</strong> ##FREIGHT##</p>
                    <p><strong>Total do Pedido:</strong> ##ORDERTOTALPRICE##</p>

                    <h2>Informações de Envio:</h2>
                    <p><strong>Método de Envio:</strong> ##METODO_DE_ENVIO##</p>

                    <h3>Sugerimos contato com o cliente para confirmação de pagamento e repasse de informações de envio.</h3>
                </body>
                </html>";

        public static string EmailBodyTemplateOwner(OrderDto orderDetails)
        {
            // var productTable = string.Empty;
            var productTable = TABLE_WITH_PRODUCT_INFO;

            var dictionary = orderDetails.Items.GroupBy(i => i.ProductId)
                        .ToDictionary(x => x.Key, i => i.ToList());

            decimal? subTotal = 0;

            foreach (var item in dictionary)
            {
                var totalPrice = item.Value.Sum(x => x.ProductPrice);
                subTotal += totalPrice;

                // Append the table rows for each item
                productTable += $@"
                    <tr>
                        <td>{item.Value.First().ProductName}</td>
                        <td>{item.Value.Count}</td>
                        <td>{item.Value.First().ProductPrice}</td>
                        <td>{totalPrice}</td>
                    </tr>";
            }


            //     productTable += TABLE_WITH_PRODUCT_INFO
            //                     .Replace("##PRODUCTNAME##", item.Value.First().ProductName)
            //                     .Replace("##PRODUCTCOUNT##", item.Value.Count.ToString())
            //                     .Replace("##PRODUCTPRICE##", item.Value.First().ProductPrice.ToString())
            //                     .Replace("##TOTALPRICE##", totalPrice.ToString());
            // }

            var orderTotalPrice = orderDetails.Freight.FreightValue + subTotal;
            var freightMethod = orderDetails.Freight.FreightMethod;

            var result = MAIN_EMAIL_BODY
                        .Replace("##USERNAME##", orderDetails.UserName)
                        .Replace("##ORDERNUMBER##", orderDetails.Id)
                        .Replace("##ORDERDATE##", orderDetails.OrderDate.ToString())
                        .Replace("##TABLE##", productTable)
                        .Replace("##SENDADDRESS##", orderDetails.Neighborhood)
                        .Replace("##USEREMAIL##", orderDetails.UserEmail)
                        .Replace("##USERPHONENUMBER##", orderDetails.PhoneNumber)
                        .Replace("##SUBTOTAL##", subTotal.ToString())
                        .Replace("##FREIGHT##", orderDetails.Freight.FreightValue.ToString())
                        .Replace("##ORDERTOTALPRICE##", orderTotalPrice.ToString())
                        .Replace("##METODO_DE_ENVIO##", freightMethod.ToString());

            return result;
        }
    }
}
