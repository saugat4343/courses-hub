import { Box, HStack, Heading, Stack, VStack } from '@chakra-ui/react';
import React from 'react';
import { TiSocialFacebookCircular, TiSocialInstagramCircular } from 'react-icons/ti';
import { DiGithub } from 'react-icons/di'

const Footer = () => {
    return (
        <Box
            padding={"4"}
            bg={"blackAlpha.900"}
            minH={"10vh"}
        >

            <Stack direction={["column", "row"]}>

                <VStack alignItems={["center", "flex-start"]} width={"full"}>
                    <Heading children="All Rights Reserved" color={'white'} />
                    <Heading children="@Saugat Rai 2024" fontFamily={"body"} size={"sm"} color={'blue.400'} />
                </VStack>

                <HStack
                    spacing={["2", "10"]}
                    justifyContent={"center"}
                    color={"white"}
                    fontSize={"50"}
                    className='socialsBanner'
                >
                    <a href='https://facebook.com' target='blank'>
                        <TiSocialFacebookCircular />
                    </a>
                    <a href='https://instagram.com' target='blank'>
                        <TiSocialInstagramCircular />
                    </a>
                    <a href='https://github.com' target='blank'>
                        <DiGithub />
                    </a>
                </HStack>

            </Stack>

        </Box>
    )
}

export default Footer