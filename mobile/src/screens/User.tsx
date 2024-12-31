import { Center, VStack, Text } from "@gluestack-ui/themed";
import { Input } from "../components/Input";

export function User() {

    return (
        <VStack flex={1} bg="$gray700" px="$10" pb="$16">
            <Center my="$24">
                <Text color="$white" fontSize="$2xl">
                    Cadastrar usuário
                </Text>
            </Center>

            <Center gap="$2">
                <Input placeholder="Nome" />
                <Input placeholder="e-mail" keyboardType={"email-address"} />
                <Input placeholder="senha"  />
            </Center>
        </VStack>
    )
}