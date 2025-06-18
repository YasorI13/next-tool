import React from "react";

import { useRouter } from "next/navigation";
import {
  Button,

  Paper,
  PasswordInput,

  TextInput,
} from "@mantine/core";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { http } from "@/services/http-service";
import { notifications } from "@mantine/notifications";


export default function SingUpFrom() {

    const schema = yup.object().shape({
        email: yup.string().required("ป้อนข้อมูลอีเมล์ด้วย").max(30, "ต้องไม่เกิน 30 ตัวอักษร"),
        password: yup.string().required("ป้อนข้อมูล password ด้วย").min(10, "ต้อง 10 ตัวอักษรขึ้นไปเท่านั้น"),
        password2: yup.string()
            .required("ป้อนข้อมูล password ด้วย")
            .oneOf([yup.ref('password')], "password ไม่ตรงกัน"),
        firstName: yup.string().required("ป้อนข้อมูลด้วย").min(3, "ต้อง 3 ตัวอักษรขึ้นไปเท่านั้น"),
        lastName: yup.string().required("ป้อนข้อมูลด้วย").min(3, "ต้อง 3 ตัวอักษรขึ้นไปเท่านั้น"),
    });
    type FormData = yup.InferType<typeof schema>;

    const { register, handleSubmit, setError, setValue, formState: { errors, isSubmitting, isValid } } = useForm({
        resolver: yupResolver(schema),
        mode: "all"
    });

    const router = useRouter();


const loginEgat = async (data: FormData) => {
    const response =  await http.post("/auth/signup",data);

    if (response.status === 201) {
        setValue("email", ""); // set email to empty
        setError("email", { type: "manual", message: "Email นี้ถูกใช้งานแล้ว กรุณาใช้อีเมล์อื่น" });
    notifications.show({
        title: "ผลการทำงาน",
        color: "red",
        message: response.data.message,
    });
    }
    else if (response.status === 200) {
        notifications.show({
            title: "ผลการทำงาน",
            message: response.data.message,
        });
        router.push(`/waiting`);
    }
};

return (
    <>
        <form onSubmit={handleSubmit(loginEgat)} noValidate>
        <Paper withBorder shadow="md" p={20} radius="md">
            <TextInput
            {...register("email")}
            error={errors.email && errors.email.message}
            label="username or email"
            placeholder="you@mantine.dev"
            />
            <PasswordInput
            {...register("password")}
            error={errors.password && errors.password.message}
            label="Password"
            placeholder="Your password"
            required
            mt="md"
            />
            <PasswordInput
            {...register("password2")}
            error={errors.password2 && errors.password2.message}
            label="Password2"
            placeholder="Your password2"
            required
            mt="md"
            />
            <TextInput
                {...register("firstName")}
                error={errors.firstName && errors.firstName.message}
                label="ชื่อจริง"
                placeholder="ชื่อจริง"
            />

            <TextInput
                {...register("lastName")}
                error={errors.lastName && errors.lastName.message}
                label="นามสกุล"
                placeholder="นามสกุล"
            />


        <Button
            fullWidth
            mt="xl"
            type="submit"
            loading={isSubmitting}
            disabled={!isValid}
        >
            สมัคร สมาชิก
        </Button>
        </Paper>
        </form>
    </>
);
}
