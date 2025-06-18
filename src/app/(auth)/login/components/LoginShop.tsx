"use client";

import {
  TextInput,
  PasswordInput,
  Checkbox,
  Anchor,
  Paper,

  Group,
  Button,

  Input,
} from "@mantine/core";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { signIn } from "next-auth/react";
import { useRouter} from "next/navigation";


import { useEffect, useState } from "react";
import Link from "next/link";

function getCookie(name: string): string | undefined {
  const cookies = document.cookie.split(";");
  for (const cookie of cookies) {
    const [key, value] = cookie.split("=");
    if (key.trim() === name) {
      // return value;
      return decodeURIComponent(value);
    }
  }
  return undefined;
}

function deleteCookie(name: string) {
  document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/`;
}

export function LoginShop() {

  const schema = yup.object().shape({
    // email: yup.string().required('ป้อนข้อมูลอีเมล์ด้วย').email('รูปแบบอีเมล์ไม่ถูกต้อง'),
    email: yup.string().required("ป้อนข้อมูลอีเมล์ด้วย"),
    password: yup
      .string()
      .required("ป้อนข้อมูลอีเมล์ด้วย")
      .min(3, "ต้อง 3 ตัวอักษรขึ้นไปเท่านั้น"),
    p_type: yup.string().required("ป้อนข้อมูลด้วย"),
  });
  type FormData = yup.InferType<typeof schema>;
  const {register,handleSubmit,formState: { errors, isSubmitting, isValid },} = useForm({ resolver: yupResolver(schema), mode: "all" });

  const router = useRouter();
  const [p_type] = useState("egat");
  const [checked, setChecked] = useState(false);

  // const searchParams = useSearchParams(); // ใช้ next/navigation
  // const callbackUrl = searchParams.get("callbackUrl");
  const [callbackUrl, setCallbackUrl] = useState<string | null>(null);
  
    useEffect(() => {
      const params = new URLSearchParams(window.location.search);
      const url = params.get("callbackUrl");
      if (url) {
        setCallbackUrl(url);
      }
    }, []);

  const loginShop = async (data: FormData) => {
    
    const result = await signIn("credentials", {
      redirect: false,
      username: data.email,
      password: data.password,
      checked: checked
    });


    if (result?.ok) {
      const redirectUrl = getCookie("redirectUrl");
      if (callbackUrl) {
        router.replace(decodeURIComponent(callbackUrl));
      }
      else if (redirectUrl) {
        deleteCookie("redirectUrl");
        router.replace(redirectUrl);
      }
      else {
        router.replace("/");
      }
    } else if (result?.error) {
      alert(result.error);
    }
    return false;
  };

  return (
      <>
        <form onSubmit={handleSubmit(loginShop)} noValidate>
          <Paper withBorder shadow="md" p={20}  radius="md">
            <TextInput
              {...register("email")}
              error={errors.email && errors.email.message}
              label="ชื่อ-สมาชิก || ชื่อ-ร้านค้า"
              placeholder="shopsxxxx"
            />
            <PasswordInput
              {...register("password")}
              error={errors.password && errors.password.message}
              label="รหัสผ่าน"
              placeholder="กรอก รหัสผ่าน"
              required
              mt="md"
            />
            <Input
              {...register("p_type")}
              type="hidden" name="p_type" value={p_type} />
            <Group justify="space-between" mt="lg">
              <Checkbox label="จดจำ ฉัน" checked={checked} onChange={(event) => setChecked(event.currentTarget.checked)} />
              <Link href="/singup">
                <Anchor
                  component="button"
                  type="button"
                  size="xs"
                >
                  สมัครสมาชิก
                </Anchor>
              </Link>

            </Group>
            <Button
              fullWidth
              mt="xl"
              type="submit"
              loading={isSubmitting}
              disabled={!isValid}
            >
              เข้าสู่ระบบ
            </Button>
          </Paper>
        </form>
      </>
  );
}
