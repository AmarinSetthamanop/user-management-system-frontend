"use client";

import styles from './login.module.css'

import React from 'react'
import Link from 'next/link';
import { useState } from 'react'
import { useRouter } from 'next/navigation'; // App Router

import { service_login } from "../../services/auth.service";



export default function LoginPage() {

  // สำหรับเปลี่ยนหน้า
  const router = useRouter();

  // state สำหหรับ เก็บข้อมูลผู้ login
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  // const [error, setEror] = useState<string | undefined>('');
  const [loading, setLoading] = useState(false);


  // เมื่อกดปุ่ม sign up
  async function signin() {
    
    // กำลัง load ข้อมูล
    setLoading(true);

    try {
      
      // เรียกส่งข้อมูลไป service login
      const loginUserData = await service_login(email, password);

      // ถ้าได้ข้อมูลตอบกลับมา
      if (loginUserData?.status) {
        
        // เก็บข้อมูล user ไว้ใน localStorage หลังจาก login
        localStorage.setItem('loginUserData', JSON.stringify(loginUserData));

        // ไปหน้าอื่น
        router.push('/pages/show_users');
      }
      else {
        // setEror(loginUserData?.message);
        // แสดง dialog
        confirm(loginUserData?.message);
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

        <h1 className={styles.title_1}>Welcome back</h1>

        <p className={styles.text_1}>Please enter your details to sign in</p>


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
        <label className={styles.title_2}>Password</label>
        <input
          className={styles.inputText}
          type="password"
          placeholder="Enter your password"
          onChange={e => setPassword(e.target.value)}
          required
        />


        {/* ข้อความเตือนหากใส่ข้อมูลผิด */}
        {/* {error && <p className={styles.errorText}>{error}</p>} */}


        
        {/* checkbox and forgot password */}
        <div className={styles.rememberMe_forgotPassword}>
          {/* checkbox */}
          <div className={styles.rememberMe}>
            <input type="checkbox" />
            <p className={styles.text_4}>Remember me</p>
          </div>

          {/* ปุ่ม reset password */}
          <Link
            className={styles.text_5}
            href={'/pages/reset_password'}
          >
            Forgot password?
          </Link>
        </div>


        {/* ปุ่มเข้าส่ระบบ */}
        <button
          className={styles.sendButton}
          onClick={signin}
          disabled={loading || !(email.trim().length > 0) || !(password.trim().length > 0)}
        >
          {loading ? <div className={styles.loader}></div> : 'Sign in'}
        </button>


        {/* link สมัครสมาชิก */}
        <p className={styles.text_2}>
          Don&apos;t have an account?
          <Link
            className={styles.text_3}
            href={'/pages/register'}
          >
            Sign up
          </Link>
        </p>

      </div>
    </div>
  )
}