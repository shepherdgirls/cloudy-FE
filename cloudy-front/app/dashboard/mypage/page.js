"use client";

import "./mypage.css"
import { useState, useEffect } from "react";


export default function MyPage() {
    const [isModalOpen, setIsModalOpen]=useState(false);
    const [users, setUsers]=useState([]);

    // 사용자 데이터를 비동기적으로 불러오는 함수
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('http://localhost:9999/users');
                const data = await response.json();
                setUsers(data);
            } catch (error) {
                console.error("데이터를 가져오는 중 오류가 발생했습니다:", error);
            }
        };
        fetchData();
    }, []); // 페이지 로드 시 한 번만 실행

    // const resp=await fetch('http://localhost:9999/users');
    // const users=await resp.json();

    const handleOpenModal = () => {
        setIsModalOpen(true); // 모달 열기
    };

    const handleCloseModal = () => {
        setIsModalOpen(false); // 모달 닫기
    };

    return (
        <div className="mypage">
            <h1> 마이페이지 </h1>
            <div className="user-info">
                <h2> 기본 정보 </h2>
                <div className="user-box">
                    {users.map((user, id)=>{
                        return (
                            <div key={id}>
                                <div className="user-header">
                                    <span>{user.name}</span>
                                    <div className="user-button">
                                        <button>회원 정보 수정</button>
                                        <button>로그아웃</button>
                                    </div>
                                </div>
                                <p>사용자 이름: {user.name}</p>
                                <p>email: {user.email}</p>
                            </div>
                        )
                    })}
                </div>
                
            </div>
            <div className="account">
                <h2> 계정 연결 </h2>
                <div className="account-">
                    <button onClick={handleOpenModal}>계정 추가하기</button>
                    {/* 모달이 열릴 때만 보이게 */}
                    {isModalOpen && (
                        <div className="modal-overlay">
                            <div className="modal">
                                <span>추가할 계정의 정보를 입력해주세요.</span>
                                <button className="close" onClick={handleCloseModal}>X</button>
                                <div className="form">
                                    <label for="account-id">ID</label>
                                    <input type="text" id="account-id" name="계정 id" required />
                                </div>
                                <button onClick={handleCloseModal}>취소</button>
                                <button>추가</button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
  }