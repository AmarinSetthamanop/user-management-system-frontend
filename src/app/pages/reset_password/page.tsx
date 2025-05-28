"use client";

import styles from './reset_password.module.css'

import React from 'react'
import Link from 'next/link';
import { useState } from 'react'
import { useRouter } from 'next/navigation'; // App Router
import { service_reset_password } from '@/app/services/user.service';



export default function ResetPasswordPage() {

    // สำหรับเปลี่ยนหน้า
    const router = useRouter();

    // state สำหหรับ เก็บข้อมูลผู้ login
    const [email, setEmail] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmNewPassword, setConfirmNewPassword] = useState('');
    // const [error, setEror] = useState<string | undefined>('');
    const [loading, setLoading] = useState(false);


    // เมื่อกดปุ่ม Reset password
    async function resetPassword() {
    
        // กำลัง load ข้อมูล
        setLoading(true);

        try {
            
            // รหัสผ่านทั้งสองช่องตรงกันหรือไม่
            if (newPassword === confirmNewPassword) {

                // เรียกส่งข้อมูลไป service
                const result = await service_reset_password(email, newPassword);

                // ถ้าได้ข้อมูลตอบกลับมา
                if (result?.status) {

                    // แสดง dialog
                    confirm(result.message);

                    //ไปหน้า login
                    router.push('/pages/login'); 
                }
                else {
                    // setEror(result?.message);
                    // แสดง dialog
                    confirm(result?.message);
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

                <h1 className={styles.title_1}>Reset password</h1>

                <p className={styles.text_1}>Enter your email and create a new password</p>


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


                {/* ปุ่มเข้าส่ระบบ */}
                <button
                className={styles.sendButton}
                onClick={resetPassword}
                disabled={
                    loading ||
                    !(email.trim().length > 0) ||
                    !(newPassword.trim().length > 0) ||
                    !(confirmNewPassword.trim().length > 0)
                }
                >
                    {loading ? <div className={styles.loader}></div> : 'Reset password'}
                </button>


                {/* link สมัครสมาชิก */}
                <p className={styles.text_2}>
                    Remember your password?
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

