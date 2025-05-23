"use client";

import "./dashboard.css";
import Link from "next/link";
import { useState, useEffect } from "react";

export default function DashboardLayout(props) {
  // 프로필 팝업
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [userInfo, setUserInfo] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("access");
    if (!token) {
      console.warn("❗ 토큰 없음");
      setLoading(false);
      return;
    }

    const fetchUserInfo = async () => {
      try {
        const response = await fetch(
          "https://42e0-58-79-8-251.ngrok-free.app/cloudy/cherry",
          {
            method: "GET",
            credentials: "include",
            headers: {
              Authorization: `Bearer ${token}`,
              Accept: "application/json",
            },
          }
        );

        if (!response.ok) {
          const errorMessage = await response.text();
          console.error("API 요청 실패:", errorMessage);
          throw new Error("Failed to fetch user info");
        }

        const contentType = response.headers.get("content-type");

        if (!contentType?.includes("application/json")) {
          throw new Error("❌ 응답이 JSON이 아님");
        }

        const data = await response.json();
        setUserInfo(data);
      } catch (error) {
        console.error("GitHub 정보 가져오기 실패:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserInfo();
  }, []);

  return (
    <div className="layout">
      {/* 헤더 */}
      <header className="header">
        <Link href="/home">
          <span>Cloud-Cloudy</span>
        </Link>
      </header>

      {/* 사이드바 */}
      <div className="container">
        <nav className="sidebar">
          <div className="sidebar-top">
            <ul className="menu">
              <li>
                <Link href="/dashboard/myproject">My Project</Link>
              </li>
              <li>
                <Link href="/dashboard/createproject">Create Project</Link>
              </li>
              <li>
                <Link href="/dashboard/security">Security</Link>
              </li>
            </ul>
          </div>
          <div className="sidebar-bottom">
            <ul>
              <li>
                <a href="/dashboard/setting">Setting</a>
              </li>
            </ul>
            {userInfo && (
              <div
                className="profile"
                onClick={() => setIsProfileOpen((prev) => !prev)}
              >
                <div className="flex items-center space-x-2">
                  <img
                    src={userInfo.github_avatar_url}
                    alt="GitHub Avatar"
                    className="w-8 h-8 rounded-full" // 작고 둥근 이미지
                  />
                  <div className="text-left">
                    <p className="text-sm font-medium">{userInfo.username}</p>
                    <p className="text-xs text-gray-500">{userInfo.email}</p>
                  </div>
                </div>
              </div>
            )}

            {/* 슬라이드 팝업 */}
            {isProfileOpen && (
              <div className="profile-popup">
                <button
                  className="close-btn"
                  onClick={() => setIsProfileOpen(false)}
                >
                  ×
                </button>
                <div className="user">
                  <h2 className="font-bold text-xl">GitHub 정보</h2>
                  <div className="user-info">
                    <img
                      src={userInfo.github_avatar_url}
                      alt="GitHub Avatar"
                      style={{ width: "100px", borderRadius: "8px" }}
                    />
                    <div>
                      <p className="font-bold text-l">{userInfo.username}</p>
                      <p>{userInfo.email}</p>
                      <div className="logout-button">
                        <button
                          onClick={() => {
                            localStorage.removeItem("token");
                            window.location.href = "/";
                          }}
                        >
                          Logout
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </nav>
      </div>

      {/* 메인 콘텐츠 */}
      <main className="content">{props.children}</main>
    </div>
  );
}
