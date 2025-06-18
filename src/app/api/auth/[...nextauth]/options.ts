import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

import prisma from "@/lib/db";

import bcrypt from 'bcryptjs'
import { EgatAPI } from "@/app/(toolsList)/types/EgatAPItype";


export const options: NextAuthOptions = {
    session: {
        strategy: "jwt",
        maxAge: 1 * 4 * 60 * 60, // 4 hours
    },
    pages: {
        signIn: "/login",
        error: '/login', // Add error page
    },
    secret: process.env.NEXTAUTH_SECRET, // Make sure this is set in .env
    providers: [
        CredentialsProvider({
            id: "credentials",
            name: "credentials",
            credentials: {
                username: { label: "username", type: "text" },
                password: { label: "password", type: "password" },
                p_type: { label: "p_type", type: "text" },
                // checked : { label: "checked", type : "text" }
            },
            async authorize(credentials) {
                try {
                    if (!credentials) return null;

                    if (credentials.p_type === 'egat') {

                        // EGAT Login
                        const response = await fetch('https://it-emd.egat.co.th/emd_system/loginAPI.php', {
                            method: 'POST',
                            body: JSON.stringify(credentials),
                            headers: { 'Content-Type': 'application/json' }
                        });

                        const user = await response.json();
                        if (user.msg === "FALSE") {
                            throw new Error("เลขประจำตัว-พนักงาน หรือ รหัสผ่านไม่ถูกต้อง");
                        }

                        const person = await prisma.person.findUnique({
                            where: { id_no: credentials.username }
                        });

                        if (!person) {
                            const res = await fetch(`https://hrapi.egat.co.th/api/v1/persons?filter[PersonCode]=00${credentials.username}`, {
                                method: 'GET',
                                headers: {
                                    'Content-Type': 'application/json',
                                    'Accept': 'application/json',
                                    'Authorization': `Bearer ${process.env.EGAT_HR_Bearer}`
                                }
                            });

                            const json = await res.json();

                            for (const item of json.data as EgatAPI[]) {
                                const data = {
                                    id_no: item.person_code.slice(2),
                                    person_thai_prefix_name: item.person_thai_prefix_name,
                                    person_thai_thai_firstname: item.person_thai_thai_firstname,
                                    person_thai_thai_lastname: item.person_thai_thai_lastname,
                                    person_eng_name: item.person_eng_name,
                                    person_type: item.person_type,
                                    person_level: item.person_level,
                                    person_mail_address: item.person_mail_address,
                                    person_gender: item.person_gender,
                                    person_employment_date: item.person_employment_date ? (new Date(item.person_employment_date.split(' ')[0] + "T00:00:00.000Z")) : null,
                                    person_admission_date: item.person_admission_date ? (new Date(item.person_admission_date.split(' ')[0] + "T00:00:00.000Z")) : null,
                                    person_retirement_date: item.person_retirement_date ? (new Date(item.person_retirement_date.split(' ')[0] + "T00:00:00.000Z")) : null,
                                    person_position: item.person_position,
                                    position_key_without_level: item.position_key_without_level,
                                    person_position_period_year: Number(item.person_position_period_year),
                                    person_level_period_year: Number(item.person_level_period_year),
                                    person_is_boss_main_org: Boolean(item.person_is_boss_main_org),
                                    main_org_code: item.main_org_code,
                                    costCtr: item.main_org_cost_center_code,
                                };

                                // upsert เพื่อไม่ให้ซ้ำกันที่ SapCode
                                await prisma.person.upsert({
                                    where: { id_no: data.id_no },
                                    create: data,
                                    update: data
                                });
                            }
                        }

                        // eslint-disable-next-line @typescript-eslint/no-unused-vars
                        const savelogin = await prisma.loginLog.create({
                            data: {
                                email: user.username,
                            }
                        })


                        return {
                            id: String(person?.id),
                            name: person?.person_thai_thai_firstname + " " + person?.person_thai_thai_lastname,
                            email: user.username,
                            image: "https://xsgames.co/randomusers/avatar.php?g=pixel",
                            role: person?.role,
                            address: person?.costCtr
                        };

                    } else {
                        // Shop member login
                        const member = await prisma.member.findUnique({
                            where: { email: credentials.username }
                        });

                        if (!member) {
                            throw new Error("ไม่พบบัญชีผู้ใช้");
                        }

                        if (!member.status) {
                            throw new Error("ยังไม่ได้ยืนยันตัวตน ติดต่อผู้ดูแลระบบเพื่อทำการยืนยันตัวตน");
                        }

                        const isValidPassword = await bcrypt.compare(credentials.password, member.password);
                        if (!isValidPassword) {
                            throw new Error("รหัสผ่านไม่ถูกต้อง");
                        }

                        const person = await prisma.person.findUnique({
                            where: { id_no: credentials.username }
                        });

                        // eslint-disable-next-line @typescript-eslint/no-unused-vars
                        const savelogin = await prisma.loginLog.create({
                            data: {
                                email: member.email,
                            }
                        })

                        return {
                            id: person ? String(person.id) : String(member.id),
                            name: member.firstName + " " + member.lastName,
                            email: member.email,
                            image: "https://xsgames.co/randomusers/avatar.php?g=pixel",
                            role: String(member.role),
                            address: person?.costCtr,
                            options: person?.options

                        };
                    }
                } catch (error) {
                    console.error('Auth error:', error);
                    throw error;
                }
            }
        })
    ],
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token.id = user.id;
                token.role = user.role;
                token.address = user.address;
            }
            return token;
        },
        async session({ session, token }) {
            if (session.user) {
                session.user.id = token.id;
                session.user.role = token.role;
                session.user.address = token.address
            }
            return session;
        }
    }
};