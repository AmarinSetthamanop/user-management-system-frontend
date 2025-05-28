"use client";

import styles from './register.module.css'

import React from 'react'
import Link from 'next/link';
import { useState } from 'react'
import { useRouter } from 'next/navigation'; // App Router
import { service_register } from '@/app/services/user.service';


export default function RegisterPage() {

    // สำหรับเปลี่ยนหน้า
    const router = useRouter();

    // state สำหหรับ เก็บข้อมูลผู้ login
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmNewPassword, setConfirmNewPassword] = useState('');
    // const [error, setEror] = useState<string | undefined>('');
    const [loading, setLoading] = useState(false);


    // เมื่อกดปุ่ม Reset password
    async function register() {
    
        // กำลัง load ข้อมูล
        setLoading(true);

        try {
            
            // รหัสผ่านทั้งสองช่องตรงกันหรือไม่
            if (newPassword === confirmNewPassword) {

                // เรียกส่งข้อมูลไป service
                const result = await service_register(name, email, newPassword);

                // ถ้าได้ข้อมูลตอบกลับมา
                if (result?.status) {

                    // แสดง dialog
                    confirm(result.message);

                    //ไปหน้า login
                    router.push('/pages/login'); 
                }
                else {
                    // แสดง dialog
                    confirm(result?.message);
                    // setEror(result?.message);
                }
            }
            else {
                // setEror('รหัสผ่านไม่ตรงกัน');
                // แสดง dialog
                confirm('รหัสผ่านไม่ตรงกัน');
            }
            
            setLoading(false);

        } catch (error) {
            console.log(error);
            setLoading(false);
        }
    }

    return (
        <div className={styles.container}>

            <div className={styles.card}>

                <h1 className={styles.title_1}>Create account</h1>

                <p className={styles.text_1}>Please enter your details to sign up</p>


                {/* ข้อความและช่องกรอก Name */}
                <label className={styles.title_2}>Name</label>
                <input
                    className={styles.inputText}
                    type="text"
                    placeholder="Enter your name"
                    onChange={e => setName(e.target.value)}
                    required
                />


                {/* ข้อความและช่องกรอก Email */}
                <label className={styles.title_2}>Email</label>
                <input
                    className={styles.inputText}
                    type="email"
                    placeholder="Enter your email"
                    onChange={e => setEmail(e.target.value)}
                    required
                />


                {/* ข้อความและช่องกรอก Password */}
                <label className={styles.title_2}>New Password</label>
                <input
                    className={styles.inputText}
                    type="password"
                    placeholder="Enter new password"
                    onChange={e => setNewPassword(e.target.value)}
                    required
                />


                {/* ข้อความและช่องกรอก Confirm Password */}
                <label className={styles.title_2}>Confirm Password</label>
                <input
                    className={styles.inputText}
                    type="password"
                    placeholder="Confirm new password"
                    onChange={e => setConfirmNewPassword(e.target.value)}
                    required
                />


                {/* ข้อความเตือนหากใส่ข้อมูลผิด */}
                {/* {error && <p className={styles.errorText}>{error}</p>} */}


                {/* checkbox and forgot password */}
                <div className={styles.checkbox_text}>
                    {/* checkbox */}
                    <input type="checkbox" />
                    <p className={styles.text_4}>I agree to the</p>
                    <p className={styles.text_5}>Terms of Service</p>
                    <p className={styles.text_4}>and</p>
                    <p className={styles.text_5}>Privacy Policy</p>
                </div>


                {/* ปุ่มเข้าส่ระบบ */}
                <button
                className={styles.sendButton}
                onClick={register}
                disabled={
                    loading ||
                    !(email.trim().length > 0) ||
                    !(newPassword.trim().length > 0) ||
                    !(confirmNewPassword.trim().length > 0)
                }
                >
                    {loading ? <div className={styles.loader}></div> : 'Create account'}
                </button>


                {/* link สมัครสมาชิก */}
                <p className={styles.text_2}>
                    Already have an account?
                    <Link
                        className={styles.text_3}
                        href={'/pages/login'}
                    >
                        Sign in
                    </Link>
                </p>

            </div>
        </div>
    )
}

