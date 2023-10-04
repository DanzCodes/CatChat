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
  Center,
  useColorModeValue,
} from "../../../components/chakra-client-components";
import {
  login,
  ILoginForm,
  ILogin,
} from "../../../api/auth";
import { AnimatePresence, motion } from "framer-motion";
import { userContextStore } from "../../../store/userStore";
import { useRouter } from "next/navigation";
import { AxiosError } from "axios";
import { getDeviceData } from "../../../utils/location";

const Login = () => {
  const { save } = userContextStore();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState<ILoginForm>({
    email: "",
    password: "",
    rememberme: false,
  });

  const router = useRouter();

  const sendRegisterForm = async () => {
    if (loading) return;
    else if (!form.email) return setError("Please input a valid email");
    else if (!form.password) return setError("Please input a password");
    setLoading(true);

    const device = await getDeviceData();

    login({
      device: device,
      email: form.email,
      password: form.password,
    } as ILogin)
      .then(({ data }) => {
        save(data.data);
        router.push("/chat");
      })
      .catch((err: AxiosError) => {
        console.log(err);
        //@ts-ignore
        if (err.response?.data) setError(err.response.data.message);
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
          <Heading fontSize={"4xl"}>Log in</Heading>
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
              <Button
                onClick={sendRegisterForm}
                bg="pink.300"
                color="white"
                _hover={{
                  bg: "pink.400",
                }}
              >
                Log in
              </Button>
            </Stack>
          </Stack>
        </Flex>
      </Stack>
    </Center>
  );
};

export default Login;
