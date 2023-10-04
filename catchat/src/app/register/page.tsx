"use client";

import { useState, useEffect } from "react";

import {
  Flex,
  Text,
  FormControl,
  FormLabel,
  Input,
  Checkbox,
  Stack,
  Button,
  Heading,
  Link,
  Center,
  useColorModeValue,
} from "../../../components/chakra-client-components";
import {
  register,
  IRegisterForm,
  IRegister,
} from "../../../api/auth";
import { AnimatePresence, motion } from "framer-motion";
import { userContextStore } from "../../../store/userStore";
import { useRouter } from "next/navigation";
import { AxiosError } from "axios";
import { getDeviceData } from "../../../utils/location";

const Register = () => {
  const { save } = userContextStore();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState<IRegisterForm>({
    email: "",
    password: "",
    username: "",
    rememberme: false,
  });

  const router = useRouter();

  const sendRegisterForm = async () => {
    if (loading) return;
    if (!form.username) return setError("Please input a username");
    else if (!form.email) return setError("Please input a valid email");
    else if (!form.password) return setError("Please input a password");
    setLoading(true);

    const device = await getDeviceData();

    register({
      device: device,
      email: form.email,
      username: form.username,
      password: form.password,
    } as IRegister)
      .then(({ data }) => {
        save(data.data);
        router.push("/chat");
      })
      .catch((err: AxiosError) => {
        console.log(err);
        //@ts-ignore
        if(err.response?.data) setError(err.response.data.message)
      })
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    const timeout = setTimeout(() => setError(""), 2000);
    return () => clearTimeout(timeout);
  }, [error]);

  return (
    <Center color="white" minH="100vh">
      <Stack spacing={8} w="30%" py={12} px={6}>
        <Stack align="center">
          <Heading fontSize={"4xl"}>Sign Up</Heading>
        </Stack>
        <Flex
          rowGap={8}
          direction="column"
          textAlign="center"
          rounded="lg"
          bg={useColorModeValue("#191919", "pink.700")}
          boxShadow="lg"
          p={12}
        >
          <AnimatePresence>
            {error && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <Text color="red.600" fontWeight="semibold" h={4}>
                  {error}
                </Text>
              </motion.div>
            )}
          </AnimatePresence>
          <Stack spacing={4}>
            <FormControl>
              <FormLabel>Username</FormLabel>
              <Input
                type="text"
                onChange={(e) =>
                  setForm((prev) => ({ ...prev, username: e.target.value }))
                }
              />
            </FormControl>
            <FormControl>
              <FormLabel>Email address</FormLabel>
              <Input
                type="email"
                onChange={(e) =>
                  setForm((prev) => ({ ...prev, email: e.target.value }))
                }
              />
            </FormControl>
            <FormControl>
              <FormLabel>Password</FormLabel>
              <Input
                type="password"
                onChange={(e) =>
                  setForm((prev) => ({ ...prev, password: e.target.value }))
                }
              />
            </FormControl>
            <Stack spacing={10}>
              <Checkbox
                onChange={(e) =>
                  setForm((prev) => ({ ...prev, rememberme: e.target.checked }))
                }
              >
                Remember me
              </Checkbox>
              <Stack>
                <Flex columnGap={1}>
                  <Checkbox>Accept</Checkbox>
                  <Link href="/tac" target="_blank" color="pink.300">
                    Terms and Conditions
                  </Link>
                </Flex>
                <Button
                  onClick={sendRegisterForm}
                  bg="pink.300"
                  color="white"
                  _hover={{
                    bg: "pink.400",
                  }}
                >
                  Sign in
                </Button>
              </Stack>
            </Stack>
          </Stack>
        </Flex>
      </Stack>
    </Center>
  );
};

export default Register;
