"use client";

import { RolesModel } from '@/app/models/role.model';
import styles from './add_user.module.css'

import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import { service_get_roles } from '@/app/services/role.service';
import { service_add_user } from '@/app/services/user.service';

export default function AddUserPage() {

    // สำหรับเปลี่ยนหน้า
    const router = useRouter();

    // state สำหหรับ เก็บข้อมูล
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [phone_number, setPhone_number] = useState('');
    const [image, setImage] = useState(null);
    const [status, setStatus] = useState<boolean>(true);
    const [role_id, setRole_id] = useState<number>(2);

    const [roles, setRoles] = useState<RolesModel>();
    const [loading, setLoading] = useState(false);

    
    // useEffect ทำงานก่อนทุกครั้งเมื่อเรียกใช้งาน class
    useEffect(() => {
    const loadUsers = async () => {
        // ดึงข้อมูล Roles ทั้งหมด
        const resultRoles = await service_get_roles();
        setRoles(resultRoles);
    };
        setLoading(true);
        loadUsers();
        setLoading(false);
    }, [loading, status]);


    // เพิ่มผู้ใช้
    async function addUser() {
        // กำลัง load ข้อมูล
        setLoading(true);
        try {  
            // รหัสผ่านทั้งสองช่องตรงกันหรือไม่
            if (password === confirmPassword) {

                // เรียกส่งข้อมูลไป service
                const result = await service_add_user(
                    name,
                    email,
                    password,
                    phone_number,
                    image,
                    status,
                    role_id
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

                <h1 className={styles.title_1}>Add user</h1>

                <p className={styles.text_1}>Please enter user details to add new user</p>


                {/* ข้อความและช่องกรอก Name */}
                <label className={styles.title_2}>Name</label>
                <input
                    className={styles.inputText}
                    type="text"
                    placeholder="Enter user name"
                    onChange={e => setName(e.target.value)}
                    required
                />


                {/* ข้อความและช่องกรอก Email */}
                <label className={styles.title_2}>Email</label>
                <input
                    className={styles.inputText}
                    type="email"
                    placeholder="Enter user email"
                    onChange={e => setEmail(e.target.value)}
                    required
                />


                {/* ข้อความและช่องกรอก Password */}
                <label className={styles.title_2}>Password</label>
                <input
                    className={styles.inputText}
                    type="password"
                    placeholder="Enter user password"
                    onChange={e => setPassword(e.target.value)}
                    required
                />


                {/* ข้อความและช่องกรอก Confirm Password */}
                <label className={styles.title_2}>Confirm Password</label>
                <input
                    className={styles.inputText}
                    type="password"
                    placeholder="Confirm password"
                    onChange={e => setConfirmPassword(e.target.value)}
                    required
                />


                {/* ข้อความและช่องกรอก Phone number */}
                <label className={styles.title_2}>Phone number</label>
                <input
                    className={styles.inputText}
                    type="text"
                    placeholder="Enter user phone number"
                    onChange={e => setPhone_number(e.target.value)}
                    required
                />


                {/* ส่วนแสดง select */}
                <div className={styles.select_filter}>
                    {/* เลือก Role */}
                    <select
                        className={styles.select_dropdown}
                        value={role_id}
                        onChange={(e) => {
                            const value = e.target.value;
                            setRole_id(Number(value));
                        }}
                    >
                        {Array.isArray(roles?.result) &&
                            roles.result.map((i) => (
                            <option key={i.id} value={i.id}>
                                {i.name}
                            </option>
                        ))}
                    </select>


                    {/* เลือก status */}
                    <select
                        className={styles.select_dropdown}
                        value={status ? '1' : '0'}
                        onChange={(e) => {
                            const value = e.target.value;
                            setStatus(Boolean(Number(value)));
                        }}
                    >
                        <option value="1">Active</option>
                        <option value="0">Inactive</option>
                    </select>
                </div>


                {/* add user button */}
                <button
                className={styles.sendButton}
                onClick={addUser}
                disabled={
                    loading ||
                    !(name.trim().length > 0) ||
                    !(email.trim().length > 0) ||
                    !(password.trim().length > 0) ||
                    !(confirmPassword.trim().length > 0)
                }
                >
                    {loading ? <div className={styles.loader}></div> : 'Create user'}
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



