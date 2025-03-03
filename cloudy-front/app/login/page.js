// app/login/page.js
'use client';
import { useEffect } from 'react';

export default function LoginPage() {
    const handleGitHubLogin = () => {
        // GitHub OAuth URL (백엔드에서 제공해야 함)
        const githubAuthUrl = 'http://localhost:8000/auth/github/login'; // 예시 URL, 실제 주소로 변경해야 합니다.

        // GitHub OAuth 로그인 창 열기
        window.location.href = githubAuthUrl;
    };

    useEffect(() => {
        const fetchToken = async () => {
            const urlParams = new URLSearchParams(window.location.search);
            const code = urlParams.get('code');

            if (code) {
                try {
                    const response = await fetch(`http://localhost:8000/auth/github/callback?code=${code}`, {
                        method: 'GET',
                        headers: {
                            'Content-Type': 'application/json'
                        }
                    });

                    if (!response.ok) {
                         localStorage.removeItem('token');
                         window.location.href = '/login';
                         throw new Error(`HTTP error! status: ${response.status}`);
                    }

                    const data = await response.json();

                    if (data.token) {
                        console.log('success');
                        localStorage.setItem('token', data.token);
                        window.location.href = '/';
                    } else {
                         localStorage.removeItem('token');
                        console.error('Token not received');
                         window.location.href = '/login';
                    }
                } catch (error) {
                     localStorage.removeItem('token');
                    console.error('Failed to fetch token:', error);
                     window.location.href = '/login';
                }
            }
        };

        fetchToken();
    }, []);

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
            <div className="bg-white p-8 rounded shadow-md w-96">
                <h2 className="text-2xl font-bold mb-6 text-center">로그인</h2>
                <button
                    className="bg-gray-800 hover:bg-gray-900 text-white font-bold py-2 px-4 rounded w-full flex items-center justify-center"
                    onClick={handleGitHubLogin}
                >
                    <svg
                        className="fill-current w-6 h-6 mr-2"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        {/* GitHub 로고 (SVG path) */}
                        <path
                            d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.124-.3-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.98-.399 3.003-.404 1.02.005 2.04.138 3.003.404 2.287-1.552 3.295-1.23 3.295-1.23.65 1.652.24 2.876.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.01 2.896-.01 3.285 0 .315.21.69.825.57C20.56 22.095 24 17.595 24 12.297c0-6.627-5.373-12-12-12"
                        />
                    </svg>
                    GitHub으로 로그인
                </button>
            </div>
        </div>
    );
}
