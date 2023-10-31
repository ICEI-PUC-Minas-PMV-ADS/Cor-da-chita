"use client";

import { NextUIProvider } from "@nextui-org/react";
import { SessionProvider } from "next-auth/react";

import UserContextProvider from "@/contexts/UserContext/UserContext";
import AddressContextProvider from "@/contexts/AddressContext/AddressContext";
import ProductContextProvider from "@/contexts/ProductContext/ProductContext";
import CartContextProvider from "@/contexts/CartContext/CartContext";
import SearchContextProvider from "@/contexts/ProductContext/SearchContext";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      <NextUIProvider>
        <ProductContextProvider>
          <SearchContextProvider>
            <UserContextProvider>
              <AddressContextProvider>
                <CartContextProvider>{children}</CartContextProvider>
              </AddressContextProvider>
            </UserContextProvider>
          </SearchContextProvider>
        </ProductContextProvider>
      </NextUIProvider>
    </SessionProvider>
  );
}
