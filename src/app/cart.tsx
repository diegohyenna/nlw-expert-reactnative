import { Button } from "@/components/button";
import Header from "@/components/header";
import Input from "@/components/input";
import LinkButton from "@/components/link-button";
import { Product } from "@/components/product";
import { ProductCartProps, useCartStore } from "@/stores/cart-store";
import { formatCurrency } from "@/utils/functions/format-currency";
import { Feather } from "@expo/vector-icons";
import { useNavigation } from "expo-router";
import React, { useState } from "react";
import { Alert, ScrollView, Text, View, Linking } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

const PHONE_NUMBER = "";

export default function Cart() {
  const cartStore = useCartStore();
  const [address, setAddress] = useState("");
  const navigation = useNavigation();

  const total = formatCurrency(
    cartStore.products.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    )
  );

  function handleProductRemove(product: ProductCartProps) {
    Alert.alert("Remover", `Deseja remover ${product.title} do carrinho?`, [
      {
        text: "Cancelar",
      },
      { text: "Remover", onPress: () => cartStore.remove(product.id) },
    ]);
  }

  function handleOrder() {
    if (address.trim().length === 0) {
      return Alert.alert("Pedido", "Informe os dados da entrega");
    }

    const products = cartStore.products
      .map((product) => `\n ${product.quantity} ${product.title}`)
      .join("");

    const message = `🍔 NOVO PEDIDO
     \n Entrega em: ${address}
      ${products}
      \n Valor total: ${total}
    `;

    //Descomente e informe o seu numero de whatsapp na constante PHONE_NUMBER no formato +5511988776655
    // Linking.openURL(
    //   `https://api.whatsapp.com/send?phone=${PHONE_NUMBER}&text=${message}`
    // );

    cartStore.clear();
    navigation.goBack();

    Alert.alert("Sucesso", "Pedido enviado com sucesso!");
  }

  return (
    <View className="flex-1 pt-8">
      <Header title="Seu carrinho"></Header>
      <KeyboardAwareScrollView>
        <ScrollView>
          <View className="p-5 flex-1">
            {cartStore.products.length > 0 ? (
              <View className="border-b border-slate-700">
                {cartStore.products.map((product) => (
                  <Product
                    key={product.id}
                    data={product}
                    onPress={() => handleProductRemove(product)}
                  ></Product>
                ))}
              </View>
            ) : (
              <Text className="font-body text-slate-400 text-center my-8">
                Seu carrinho está vázio!
              </Text>
            )}

            <View className="flex-row gap-2 items-center mt-5 mb-4">
              <Text className="text-white text-xl font-subtitle">Total: </Text>
              <Text className="text-lime-400 text-2xl font-heading">
                {total}
              </Text>
            </View>

            <Input
              placeholder="Informe o endereço de entrega com rua, bairro, cep, número e complemento"
              onChangeText={setAddress}
              blurOnSubmit={true}
              onSubmitEditing={handleOrder}
              returnKeyType="next"
            />
          </View>
        </ScrollView>
      </KeyboardAwareScrollView>

      <View className="p-5 gap-5">
        <Button onPress={handleOrder}>
          <Button.Text>Enviar pedido</Button.Text>
          <Button.Icon>
            <Feather name="arrow-right-circle"></Feather>
          </Button.Icon>
        </Button>
        <LinkButton title="voltar ao cardápio" href="/"></LinkButton>
      </View>
    </View>
  );
}
