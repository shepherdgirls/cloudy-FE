"use client";

import { useState, useEffect } from "react";

export default function MyPage() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [userInfo, setUserInfo] = useState(null);
    const [loading, setLoading] = useState(true);

    // if (loading) return <div>Loading...</div>;
    // if (!userInfo) return <div>사용자 정보가 없습니다. 로그인 해주세요.</div>;

    return (
        <div className="mypage">
            <h1>마이페이지</h1>
            <div className="user-info">
                <h2 className="font-bold">GitHub 기본 정보</h2>
                <div className="user-box">
                    <div className="user-header">
                        <span className="font-semibold">{userInfo.username}</span>
                        <div className="user-button">
                            <button>회원 정보 수정</button>
                            <button onClick={() => {
                                localStorage.removeItem("token");
                                window.location.href = "/";
                            }}>로그아웃</button>
                        </div>
                    </div>
                    <img src={userInfo.github_avatar_url} alt="GitHub Avatar" style={{ width: "100px", borderRadius: "8px" }} />
                    <p>아이디: {userInfo.username}</p>
                    <p>이메일: {userInfo.email}</p>
                </div>
            </div>

            <div className="account">
                <h2 className="font-bold">계정 연결</h2>
                <div className="account-header">
                    <div className="tabs">
                        <button onClick={() => setActiveTab("aws")} className={activeTab === "aws" ? "active" : ""}>AWS</button>
                        <button onClick={() => setActiveTab("github")} className={activeTab === "github" ? "active" : ""}>GitHub</button>
                    </div>
                    <div className="add-account">
                        <button onClick={() => setIsModalOpen(true)}>계정 추가하기</button>
                    </div>
                </div>
                {activeTab === "aws" && (
                    <div className="account-grid">
                        {awsAccounts.map(account => (
                            <div key={account.id} className="account-box">
                                <h3>{account.accountName}</h3>
                                <p>리전: {account.region}</p>
                                <p>Access Key: {account.accessKey}</p>
                                <p>Secret Key: {account.secretKey}</p>
                            </div>
                        ))}
                    </div>
                )}

                {activeTab === "github" && (
                    <div className="account-grid">
                        <p>GitHub 계정은 이미 연결되어 있습니다.</p>
                    </div>
                )}

                {isModalOpen && (
                    <div className="modal-overlay">
                        <div className="modal">
                            <div className="modal-header">
                                <span>추가할 {activeTab} 계정의 정보를 입력해주세요.</span>
                                <button className="close" onClick={() => setIsModalOpen(false)}>X</button>
                            </div>
                            <button onClick={() => alert("계정 추가 기능은 추후 구현 예정")} className="button">
                                {activeTab === "aws" ? "AWS 계정 추가하기" : "GitHub 계정 연결하기"}
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}