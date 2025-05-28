"use client";

import styles from './edit_page.module.css'

import { RolesModel } from '@/app/models/role.model';
import { user_model } from '@/app/models/user.model';
import { service_get_roles } from '@/app/services/role.service';
import { service_edit_user } from '@/app/services/user.service';
import { useRouter } from 'next/navigation';

import React, { useEffect, useState } from 'react'

export default function EditPage() {

    // สำหรับเปลี่ยนหน้า
    const router = useRouter();

    // ดึงข้อมูลของคนที่จะถูกแก้ไข ใน localStorage
    const userForEdit: user_model = JSON.parse(localStorage.getItem('userForEdit')!);

    // state สำหหรับ เก็บข้อมูล
    const [id, setId] = useState<number>(userForEdit.id);
    const [name, setName] = useState<string>(userForEdit.name);
    const [email, setEmail] = useState<string>(userForEdit.email);
    const [newPassword, setNewPassword] = useState<string | undefined>(undefined);
    const [confirmNewPassword, setConfirmNewPassword] = useState<string>('');
    const [phone_number, setPhone_number] = useState<string>(userForEdit.phone_number);
    const [image, setImage] = useState(null);
    const [status, setStatus] = useState<boolean>(userForEdit.status);
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


    // แก้ไขผู้ใช้
    async function editUser() {
        // กำลัง load ข้อมูล
        setLoading(true);
        try {
            // ถ้าใส่รหัสใหม่
            if (newPassword || confirmNewPassword) {
                // รหัสผ่านทั้งสองช่องตรงกันหรือไม่
                if (newPassword === confirmNewPassword) {

                    // เรียกส่งข้อมูลไป service
                    const result = await service_edit_user(
                        id,
                        name,
                        email,
                        newPassword,
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
            }
            else {
                // เรียกส่งข้อมูลไป service
                const result = await service_edit_user(
                    id,
                    name,
                    email,
                    newPassword?.trim() == '' ? undefined : newPassword,
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

                <h1 className={styles.title_1}>Edit user</h1>

                <p className={styles.text_1}>Please enter new user details to update user</p>


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
                onClick={editUser}
                disabled={
                    loading ||
                    !(name.trim().length > 0) ||
                    !(email.trim().length > 0)
                }
                >
                    {loading ? <div className={styles.loader}></div> : 'Edit user'}
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
