"use client";

import "./mypage.css"
import { useState, useEffect } from "react";
import { signIn } from "next-auth/react";


export default function MyPage() {
    const [isModalOpen, setIsModalOpen]=useState(false);
    const [userInfo, setUserInfo] = useState(null);
    const [loading, setLoading] = useState(true);
    const [activeTab, setActiveTab] = useState("aws");
    // const [awsAccounts, setAwsAccounts] = useState([]);

    // 아직 백엔드가 연결되지 않은 상태이므로 aws 더미 데이터 사용
    const [awsAccounts, setAwsAccounts] = useState([
        {
            id: 1,
            accountName: 'AWS Account 1',
            region: 'us-west-1',
            accessKey: 'AKIAxxxxxx1',
            secretKey: 'xxxxxxxxx1',
        },
        {
            id: 2,
            accountName: 'AWS Account 2',
            region: 'us-east-1',
            accessKey: 'AKIAxxxxxx2',
            secretKey: 'xxxxxxxxx2',
        },
    ]);

    // 아직 백엔드가 연결되지 않은 상태이므로 깃허브 더미 데이터 사용
    useEffect(() => {
        const fetchUserInfo = async () => {
            // 더미 사용자 정보
            const dummyUserInfo = {
                name: 'John Doe',
                login: 'johndoe',
                email: 'johndoe@example.com',
                html_url: 'https://github.com/johndoe',
            };

            // 더미 데이터로 설정
            setUserInfo(dummyUserInfo);
            setLoading(false);
        };

        fetchUserInfo();
    }, []);

    /*
    // 실제 깃허브 계정 정보 가져오는 코드
    useEffect(() => {
        const fetchUserInfo = async () => {
            const token = localStorage.getItem('token'); // 로컬 스토리지에서 토큰을 가져옵니다.

            if (!token) {
                return;
            }

            try {
                const response = await fetch('http://localhost:8000/user/github', {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${token}`,
                    }
                });

                if (!response.ok) {
                    throw new Error('Failed to fetch user info');
                }

                const data = await response.json();
                setUserInfo(data); // GitHub 사용자 정보 저장
            } catch (error) {
                console.error(error);
            }
        };
        fetchUserInfo();
    }, []);
    */

    // 실제 aws 계정 정보 가져오는 코드
    /*
    useEffect(() => {
        const fetchAwsAccounts = async () => {
            try {
                const response = await fetch('http://localhost:8000/api/aws/accounts');  // 백엔드에서 AWS 계정 정보 요청
                if (!response.ok) {
                    throw new Error('Failed to fetch AWS accounts');
                }
                const data = await response.json();
                setAwsAccounts(data);  // 실제 AWS 계정 정보로 설정
            } catch (error) {
                console.error('Error fetching AWS accounts:', error);
            }
        };

        fetchAwsAccounts();
    }, []);
    */

    if (loading) {
        return <div>Loading...</div>;
    }

    if (!userInfo) {
        return <div>사용자 정보가 없습니다. 로그인 해주세요.</div>;
    }

    //모달 열기
    const handleOpenModal = () => {
        setIsModalOpen(true);
    };

    // 모달 닫기
    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

    return (
        <div className="mypage">
            <h1> 마이페이지 </h1>
            <div className="user-info">
                <h2 className="font-bold"> GitHub 기본 정보 </h2>
                <div className="user-box">
                    <div className="user-header">
                        <span className="font-semibold">{userInfo.name}</span>
                        <div className="user-button">
                            <button>회원 정보 수정</button>
                            <button>로그아웃</button>
                        </div>
                    </div>
                    <p>아이디: {userInfo.login}</p>
                    <p>이메일: {userInfo.email}</p>
                    <p>프로필: <a href={userInfo.html_url} target="_blank" rel="noopener noreferrer">{userInfo.html_url}</a></p>
                </div>
                
            </div>
            <div className="account">
                <h2 className="font-bold"> 계정 연결 </h2>
                <div className="account-header">
                    <div className="tabs">
                        <button onClick={() => setActiveTab("aws")} className={activeTab === "aws" ? "active" : ""}>AWS</button>
                        <button onClick={() => setActiveTab("github")} className={activeTab === "github" ? "active" : ""}>GitHub</button>
                    </div>
                    <div className="add-account">
                        <button onClick={handleOpenModal}>계정 추가하기</button>
                    </div>
                </div>


                {activeTab === "aws" && (
                    <div className="account-grid">
                        {awsAccounts.map((account) => (
                            <div key={account.id} className="account-box">
                                <h3 className="font-semibold">{account.accountName}</h3>
                                <p>리전: {account.region}</p>
                                <p>Access Key: {account.accessKey}</p>
                                <p>Secret Key: {account.secretKey}</p>
                            </div>
                        ))}
                    </div>
                )}
                {activeTab === "github" && (
                    <div className="account-grid">
                        {/* 깃허브... 브랜치 정보? */}
                    </div>
                )}
            
                {isModalOpen && (
                    <div className="modal-overlay">
                        <div className="modal">
                                <div className="modal-header">
                                    <span>추가할 {activeTab} 계정의 정보를 입력해주세요.</span>
                                    <button className="close" onClick={handleCloseModal}>X</button>
                                </div>
                                <button onClick={() => signIn("cognito")} className="button">
                                    AWS 계정 추가하기
                                </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
  }