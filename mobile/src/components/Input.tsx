import { InputField, Input as GlueStackInput } from "@gluestack-ui/themed";
import { ComponentProps } from "react";

type Props = ComponentProps<typeof InputField>

export function Input({...rest}: Props) {
    return (
        <GlueStackInput 
          bg="$gray400" 
          h="$14" 
          px="$4"
          borderRadius="$md"
          borderWidth="$0"
          $focus={{
            borderWidth: "$1",
            borderColor: "$red500"
          }}
          
        >
            <InputField 
                placeholderTextColor="$white"
                fontFamily="$body"
                color="$white"
                {...rest} 
            />
        </GlueStackInput>
    )
}