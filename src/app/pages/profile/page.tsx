"use client";

import styles from './profile.module.css'

import { LoginModel } from '@/app/models/auth.model';
import { service_edit_my_profile } from '@/app/services/user.service';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react'

export default function ProfilePage() {

    // สำหรับเปลี่ยนหน้า
    const router = useRouter();

    // ดึงข้อมูลของเราหลังจาก login ใน localStorage
    const loginUserData: LoginModel = JSON.parse(localStorage.getItem('loginUserData')!);

    // state สำหหรับ เก็บข้อมูล
    const [id, setId] = useState<number>(loginUserData.result!.id);
    const [name, setName] = useState<string>(loginUserData.result!.name);
    const [email, setEmail] = useState<string>(loginUserData.result!.email);
    const [newPassword, setNewPassword] = useState<string | undefined>(undefined);
    const [confirmNewPassword, setConfirmNewPassword] = useState<string>('');
    const [phone_number, setPhone_number] = useState<string>(loginUserData.result!.phone_number);
    const [image, setImage] = useState(null);

    const [loading, setLoading] = useState(false);



    // แก้ไข Profile
    async function updateMyProfile() {
        // กำลัง load ข้อมูล
        setLoading(true);
        try {
            // ถ้าใส่รหัสใหม่
            if (newPassword || confirmNewPassword) {
                // รหัสผ่านทั้งสองช่องตรงกันหรือไม่
                if (newPassword === confirmNewPassword) {

                    // เรียกส่งข้อมูลไป service
                    const result = await service_edit_my_profile(
                        id,
                        name,
                        email,
                        newPassword,
                        phone_number,
                        image,
                    );

                    // ถ้าได้ข้อมูลตอบกลับมา
                    if (result?.status) {

                        // แสดง dialog
                        confirm(result.message);

                        // ไปหน้า...
                        router.push('/pages/show_users'); 
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
            }
            else {
                // เรียกส่งข้อมูลไป service
                const result = await service_edit_my_profile(
                    id,
                    name,
                    email,
                    newPassword?.trim() == '' ? undefined : newPassword,
                    phone_number,
                    image
                );

                // ถ้าได้ข้อมูลตอบกลับมา
                if (result?.status) {

                    // แสดง dialog
                    confirm(result.message);

                    // ไปหน้า...
                    router.push('/pages/show_users'); 
                }
                else {
                    // แสดง dialog
                    confirm(result?.message);
                    // setEror(result?.message);
                }
            }
                
            
            setLoading(false);

        } catch (error) {
            console.log(error);
            setLoading(false);
        }
    }

    // ออกจากหน้าการทำงาน
    function cancel() {
        // ไปหน้าอื่น
        router.push('/pages/show_users');
    }

  

    return (
        <div className={styles.container}>

            <div className={styles.card}>

                <h1 className={styles.title_1}>Profile</h1>

                <p className={styles.text_1}>Do you want update your profile?</p>


                {/* ข้อความและช่องกรอก Name */}
                <label className={styles.title_2}>Name</label>
                <input
                    value={name}
                    className={styles.inputText}
                    type="text"
                    placeholder="Enter user name"
                    onChange={e => setName(e.target.value)}
                    required
                />


                {/* ข้อความและช่องกรอก Email */}
                <label className={styles.title_2}>Email</label>
                <input
                    value={email}
                    className={styles.inputText}
                    type="email"
                    placeholder="Enter user email"
                    onChange={e => setEmail(e.target.value)}
                    required
                />


                {/* ข้อความและช่องกรอก Password */}
                <label className={styles.title_2}>new Password</label>
                <input
                    value={undefined}
                    className={styles.inputText}
                    type="password"
                    placeholder="Enter new user password"
                    onChange={e => setNewPassword(e.target.value)}
                    required
                />


                {/* ข้อความและช่องกรอก Confirm Password */}
                <label className={styles.title_2}>Confirm Password</label>
                <input
                    value={undefined}
                    className={styles.inputText}
                    type="password"
                    placeholder="Confirm password"
                    onChange={e => setConfirmNewPassword(e.target.value)}
                    required
                />


                {/* ข้อความและช่องกรอก Phone number */}
                <label className={styles.title_2}>Phone number</label>
                <input
                    value={phone_number}
                    className={styles.inputText}
                    type="text"
                    placeholder="Enter user phone number"
                    onChange={e => setPhone_number(e.target.value)}
                    required
                />


                {/* add user button */}
                <button
                className={styles.sendButton}
                onClick={updateMyProfile}
                disabled={
                    loading ||
                    !(name.trim().length > 0) ||
                    !(email.trim().length > 0)
                }
                >
                    {loading ? <div className={styles.loader}></div> : 'Update profile'}
                </button>


                {/* cancel */}
                <button
                    className={styles.cancelButton}
                    onClick={cancel}
                >
                    Cancel
                </button>

            </div>
        </div>
    )
}

