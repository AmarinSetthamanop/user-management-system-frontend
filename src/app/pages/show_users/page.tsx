"use client";

import { RolesModel } from "@/app/models/role.model";
import styles from "./show_users.module.css";

import { user_model, UsersModel } from "@/app/models/user.model";
import React, { useEffect, useState } from "react";
import { service_get_roles } from "@/app/services/role.service";
import { service_delete_user, service_get_users_by_filter } from "@/app/services/user.service";
import { useRouter } from "next/navigation";

// MUI (Material UI) Table
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { LoginModel } from "@/app/models/auth.model";
import { service_logout } from "@/app/services/auth.service";



export default function ShowUsersPage() {

  // สำหรับเปลี่ยนหน้า
  const router = useRouter();

  // ข้อมูลผู้ใช้ที่ login
  const [loginUserData, setLoginUserData] = useState<LoginModel>();

  // state เก็บข้อมูล users ทั้งหมด
  const [users, setUsers] = useState<UsersModel>();
  // ข้อมูลของ Roles
  const [roles, setRoles] = useState<RolesModel>();
  // กำหลัง load ข้อมูลหรือไม่
  const [loading, setLoading] = useState(false);

  // filter ที่ต้องการค้นหา users
  const [filter, setTitle] = useState<string | undefined>(undefined);
  const [roleId, setRoleId] = useState<number | undefined>(undefined);
  const [status, setStatus] = useState<boolean | undefined>(undefined);

  // useEffect ทำงานก่อนทุกครั้งเมื่อเรียกใช้งาน class
  useEffect(() => {
    const loadUsers = async () => {
      // ดึงข้อมูล users ทั้งหมด
      const resultUsers = await service_get_users_by_filter( filter, roleId, status );
      setUsers(resultUsers);
      // ดึงข้อมูล Roles ทั้งหมด
      const resultRoles = await service_get_roles();
      setRoles(resultRoles);
      // ดึงข้อมูล user หลัง login
      const itsme = JSON.parse(localStorage.getItem('loginUserData')!);
      setLoginUserData(itsme);
    };
    setLoading(true);
    loadUsers();
    setLoading(false);
  }, [loading, filter, roleId, status]);


  // ออกจากระบบ
  async function logout() {
    if (confirm('ต้องการออกจากระบหรือไม่')) {
      const result = await service_logout();
      confirm(result?.message);
      // ไปหน้าอื่น
       router.push('/pages/login'); 
    }
  }


  // แก้ไข user
  function editUser(userForEdit: user_model) {
    // เก็บข้อมูลของคงที่จะแก้ไขข้อมูลไว้ใน localStorage
    localStorage.setItem('userForEdit', JSON.stringify(userForEdit));
    // ไปหน้าอื่น
    router.push('/pages/edit_page'); 
  }


  // ลบผู้ใช้
  async function deleteUser(user_id: number, name: string) {
    const text = "ต้องการลบข้อมูล | " + name + " | หรือไม่"
    // ยืนยันการลบข้อมูลหรือไม่
    if (confirm(text)) {
      // เรียก service
      const result = await service_delete_user(user_id);
      confirm(result?.message);
      // ดึงข้อมูล users ทั้งหมด
      const resultUsers = await service_get_users_by_filter( filter, roleId, status );
      setUsers(resultUsers);
    }
  }





  return (
    <div className={styles.container}>

      <div className={styles.card}>

        {/* ส่วนหัว */}
        <div className={styles.header_myProfileButton_addNewUserButton}>
          
          <h1 className={styles.title_1}>Sytem Users</h1>

          <div className={styles.myProfileButton_addNewUserButton}>

            {/* ปุ่มดู logout */}
            <button
              className={styles.logoutButton}
              onClick={() => logout()}
            >
              Logout
            </button>
            
            {/* ปุ่มดู Profile */}
            <button
              className={styles.myProfileButton}
              onClick={() => router.push('/pages/profile')}
            >
              My Profile
            </button>

            {/* ปุ่มเพิ่ม user จะแสดงเฉพาะ Admin */}
            {loginUserData?.result?.role_name === 'Admin'
              ? <button
                  className={styles.addNewUserButton}
                  onClick={() => router.push('/pages/add_user')}
                >
                  Add New User
                </button>
              : ''
            }
            
          </div>
        </div>

        {/* ส่วนแสดง filter */}
        <div className={styles.filter}>

          {/* ช่องกรอก title เพื่อค้นหา name | email */}
          <input
            className={styles.inputText}
            type="text"
            placeholder="Input name or email"
            onChange={e => setTitle(e.target.value.trim())}
          />

          {/* ส่วนแสดง select */}
          <div className={styles.select_filter}>
            {/* เลือก Role */}
            <select
              className={styles.select_dropdown}
              value={roleId ?? ''}
              onChange={(e) => {
                const value = e.target.value;
                setRoleId(value === '' ? undefined : Number(value));
              }}
            >
              <option value="">
                All Roles
              </option>
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
              value={status === undefined ? '' : status ? '1' : '0'}
              onChange={(e) => {
                const value = e.target.value;
                setStatus(value === '' ? undefined : value === '1');
              }}
            >
              <option value="">All status</option>
              <option value="1">Active</option>
              <option value="0">Inactive</option>
            </select>
          </div>
          
        </div>



        {/* Table แสดงข้อมูล */}
        <TableContainer component={Paper}>
          <Table aria-label="Users table">
            {/* ส่วนหัว */}
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell align="left">Email</TableCell>
                <TableCell align="left">Role</TableCell>
                <TableCell align="center">Status</TableCell>
                <TableCell align="center">Last login</TableCell>
                {/* แสดงเฉพาะ Admin */}
                {loginUserData?.result?.role_name === 'Admin' && (
                  <TableCell align="right">Action</TableCell>
                )}
              </TableRow>
            </TableHead>

            {/* ส่วนเนื้อหา */}
            <TableBody>
              {users && users.result && users.result.length > 0 ? (
                users.result.map((i) => (
                  <TableRow key={i.id}>
                    <TableCell>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                        {/* {i.image ? (
                          <img
                            src={`data:image/jpeg;base64,${btoa(
                              String.fromCharCode(...i.image)
                            )}`}
                            alt="avatar"
                            width={40}
                            height={40}
                            style={{ borderRadius: '50%' }}
                          />
                        ) : (
                          <div className={styles.avatarPlaceholder}>N/A</div>
                        )} */}
                        <span>{i.name}</span>
                      </div>
                    </TableCell>
                    <TableCell align="left">{i.email}</TableCell>
                    <TableCell align="left">
                      {i.role_name === 'Admin' 
                        ? <p className={styles.roleAdmin}>{i.role_name}</p>
                        : <p className={styles.roleUser}>{i.role_name}</p>}
                    </TableCell>
                    <TableCell align="center">
                      {i.status
                        ? <p className={styles.statusActive}>Active</p>
                        : <p className={styles.statusInactive}>Inactive</p>}
                    </TableCell>
                    <TableCell align="center">
                      {i.last_login ? i.last_login.split('T')[0] : '_--_--_'}
                    </TableCell>
                    {/* แสดงเฉพาะ Admin */}
                    {loginUserData?.result?.role_name === 'Admin' && loginUserData?.result?.id !== i.id && i.role_name !== 'Admin' && (
                      <TableCell align="right">
                        {/* ปุ่ม edit */}
                        <button
                          className={styles.editButton}
                          onClick={() => editUser(i)}
                        >
                          <EditIcon color="primary" />
                        </button>
                        {/* ปุ่ม delete */}
                        <button
                          className={styles.deleteButton}
                          onClick={() => deleteUser(i.id, i.name)}
                        >
                          <DeleteIcon color="error" />
                        </button>
                      </TableCell>
                    )}
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={6} align="center">
                    {/* แสดง animation loading */}
                    <div className={styles.loader}></div>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>


      </div>
    </div>
  );
}
