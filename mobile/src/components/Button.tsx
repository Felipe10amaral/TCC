import { ComponentProps } from 'react'
import { Button as GlueStackButton, Spinner, Text} from '@gluestack-ui/themed'

type Props = ComponentProps<typeof GlueStackButton> & {
    title: string
    isLoading?: boolean
}

export function Button({title, isLoading = false ,...rest}: Props) {
    return (
        <GlueStackButton
            w="$full"
            h="$14"
            bg="$red700"
            borderWidth={"$0"}
            borderColor='$white'
            rounded="$sm"
            $active-bg='$red300'
            disabled={isLoading}
            {...rest}
        >
            {
               isLoading ? <Spinner color="$white"/> 
                         : <Text
                            color="$white"
                            fontSize="$lg"
                            fontFamily="$heading"
                           > 
               {title}  
           </Text>
            }
        </GlueStackButton>
    )
}