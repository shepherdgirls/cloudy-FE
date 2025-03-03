// app/home/page.js
'use client';
import Navbar from '../components/Navbar';
import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import mainImage from '../../public/images/mainImage.svg';
import Link from 'next/link';

export default function NewHomePage() {
    const handleScrollRef = useRef(null);
    const [isLoggedIn, setIsLoggedIn] = useState(false); // 로그인 상태 관리

    useEffect(() => {
        // 로컬 스토리지에서 토큰 확인 및 로그인 상태 업데이트
        const token = localStorage.getItem('token');
        if (token) {
            setIsLoggedIn(true);
        }

        if (typeof window !== 'undefined') {
            const smoothScrollLinks = document.querySelectorAll('.smoothscroll');
            const navLinks = document.querySelectorAll('.navbar-nav .nav-link');
            const sections = document.querySelectorAll('section');
            const navbar = document.querySelector('.navbar');

            smoothScrollLinks.forEach(link => {
                link.addEventListener('click', function (e) {
                    e.preventDefault();

                    const targetId = this.getAttribute('href');

                    // targetId가 유효한지 검증
                    if (targetId === '#' || targetId.startsWith('#')) {
                        if (targetId === '#') {
                            window.scrollTo({ top: 0, behavior: 'smooth' });
                        }
                        else {
                            const targetElement = document.querySelector(targetId);
                            if (targetElement) {
                                const headerHeight = navbar ? navbar.offsetHeight : 0;
                                const targetPosition = targetElement.offsetTop - headerHeight;
                                window.scrollTo({ top: targetPosition, behavior: 'smooth' });
                            }
                        }
                    } else {
                        console.error(`Invalid href attribute: ${targetId}`);
                        //유효하지 않은 타겟 아이디에 대한 처리를 진행할 수 있습니다.
                        //예를 들어, 사용자에게 오류를 알리는 메시지를 표시하거나, 아무 동작도 하지 않도록 할 수 있습니다.
                    }
                });
            });

            handleScrollRef.current = () => {
                let currentSectionIndex = 0;
                const scrollPosition = window.scrollY;
                const headerHeight = navbar ? navbar.offsetHeight : 0;

                if (sections && sections.length > 0) {
                    sections.forEach((section, index) => {
                        const sectionTop = section.offsetTop - headerHeight;
                        const sectionBottom = sectionTop + section.offsetHeight;
                        if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
                            currentSectionIndex = index;
                        }
                    });
                }

                if (navLinks && navLinks.length > 0) {
                    navLinks.forEach((link) => link.classList.remove('active'));
                    if (currentSectionIndex >= 0 && currentSectionIndex < navLinks.length) {
                        navLinks[currentSectionIndex].classList.add('active');
                    }
                }
            };

            window.addEventListener('scroll', handleScrollRef.current);

            if (navLinks && navLinks.length > 0) {
                navLinks[0].classList.add('active');
            }

            return () => {
                window.removeEventListener('scroll', handleScrollRef.current);
                handleScrollRef.current = null;
            };
        }
    }, []);

    return (
        <div className="flex flex-col min-h-screen bg-gray-50">
            <Navbar />
            <main className="flex-grow overflow-y-auto pt-20">
                {/* 1. 메인 (Hero Section) */}
                <section id="main" className="bg-gray-100 py-16 text-center">
                    <div className="container mx-auto px-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                            <div className="md:text-left">
                                <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
                                    <span className='text-blue-500'>CLOUD-CLOUDY</span><br />
                                    클라우드 인프라 배포를 더욱 쉽게!
                                </h1>
                                <p className="text-gray-600 mb-8 text-lg">
                                    AWS와 Terraform을 활용한 자동화된 인프라 구축 서비스
                                </p>
                                <div className='flex justify-center md:justify-start space-x-4'>
                                    <Link href="/login">
                                        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-full">
                                            시작하기
                                        </button>
                                    </Link>
                                </div>
                            </div>
                            <div className=''>
                                <Image src={mainImage} alt="Main Image" width={600} height={400} className="mx-auto" />
                            </div>
                        </div>
                    </div>
                </section>

                {/* 2. ABOUT (소개 섹션) */}
                <section id="about" className="py-24 text-center">
                    <div className="container mx-auto px-4">
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-8">
                            <span className='text-blue-500'>CLOUD-CLOUDY</span>는 무엇인가요?
                        </h2>
                        <p className="text-gray-600 px-4 md:px-16 text-lg mb-8">
                            <span className='text-blue-500'>CLOUD-CLOUDY</span>는 AWS 기반 인프라 자동화 서비스입니다.<br />
                            Terraform을 활용하여 초보 개발자도 손쉽게 클라우드 인프라를 구축할 수 있도록 돕습니다.
                        </p>
                        <div className='grid grid-cols-1 md:grid-cols-3 gap-8 px-4 md:px-16'>
                            <div className='bg-gray-100 rounded-lg p-6'>
                                <h3 className='text-xl font-semibold mb-4'>💡간편한 설정</h3>
                                <p className='text-gray-600'>몇 번의 클릭만으로 배포 가능</p>
                            </div>
                            <div className='bg-gray-100 rounded-lg p-6'>
                                <h3 className='text-xl font-semibold mb-4'>⚒️자동화된 배포</h3>
                                <p className='text-gray-600'>Terraform을 활용한 Infrastructure as Code (IaC)</p>
                            </div>
                            <div className='bg-gray-100 rounded-lg p-6'>
                                <h3 className='text-xl font-semibold mb-4'>⚙️최적화된 환경</h3>
                                <p className='text-gray-600'>보안 및 비용을 고려한 클라우드 구성</p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* 3. USERS (대상 사용자 섹션) */}
                <section id="users" className="bg-gray-100 py-24 text-center">
                    <div className="container mx-auto px-4">
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-8">
                            누가 <span className='text-blue-500'>CLOUD-CLOUDY</span>를 사용할까요?
                        </h2>
                        <p className="text-gray-600 px-4 md:px-16 text-lg">
                            <span className='text-blue-500'>CLOUD-CLOUDY</span>는 이런 분들을 위한 서비스입니다.
                        </p>
                        <div className='grid grid-cols-1 md:grid-cols-3 gap-8 px-4 md:px-16 mt-8'>
                            <div className='bg-white rounded-lg p-6'>
                                <h3 className='text-xl font-semibold mb-4'>초보 개발자</h3>
                                <p className='text-gray-600'>클라우드 인프라를 처음 접하는 초보 개발자</p>
                            </div>
                            <div className='bg-white rounded-lg p-6'>
                                <h3 className='text-xl font-semibold mb-4'>???</h3>
                                <p className='text-gray-600'>프로젝트 배포를 손쉽게 하고 싶은 개발자</p>
                            </div>
                            <div className='bg-white rounded-lg p-6'>
                                <h3 className='text-xl font-semibold mb-4'>???</h3>
                                <p className='text-gray-600'>인프라 운영 부담을 줄이고 싶은 개발자</p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* 4. GUIDE (이용 가이드 섹션) */}
                <section id="guide" className="py-24 bg-gradient-to-r from-blue-50 to-white text-center">
                    <div className="container mx-auto px-4">
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-8">
                            간단한 3단계로 클라우드 배포 완료!
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 px-4 md:px-16">
                            {/* Step 1 */}
                            <div className="bg-gradient-to-r from-blue-100 to-blue-200 rounded-lg shadow-lg p-8 hover:scale-105 transition-transform">
                                <div className="flex justify-center mb-4">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 4a2 2 0 012-2h14a2 2 0 012 2v16a2 2 0 01-2 2H5a2 2 0 01-2-2V4z" />
                                    </svg>
                                </div>
                                <h3 className="text-xl font-semibold mb-4 text-blue-800">Step 1</h3>
                                <p className="text-gray-700 text-lg">프로젝트 생성 → GitHub 연동 및 AWS 설정</p>
                            </div>
                            {/* Step 2 */}
                            <div className="bg-gradient-to-r from-green-100 to-green-200 rounded-lg shadow-lg p-8 hover:scale-105 transition-transform">
                                <div className="flex justify-center mb-4">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
                                    </svg>
                                </div>
                                <h3 className="text-xl font-semibold mb-4 text-green-800">Step 2</h3>
                                <p className="text-gray-700 text-lg">아키텍처 선택 → 원하는 환경 선택 (a, b, c 등)</p>
                            </div>
                            {/* Step 3 */}
                            <div className="bg-gradient-to-r from-orange-100 to-orange-200 rounded-lg shadow-lg p-8 hover:scale-105 transition-transform">
                                <div className="flex justify-center mb-4">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-orange-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                                    </svg>
                                </div>
                                <h3 className="text-xl font-semibold mb-4 text-orange-800">Step 3</h3>
                                <p className="text-gray-700 text-lg">배포 실행 → Terraform을 활용한 자동화 배포 진행</p>
                            </div>
                        </div>
                        <a href="#" className="mt-8 inline-block text-blue-500 hover:underline text-xl font-semibold">🔗 자세한 가이드 보기</a>
                    </div>
                </section>

                {/* 5. NOTICE (공지사항 섹션) */}
                <section id="notice" className="bg-gray-100 py-24 text-center">
                    <div className="container mx-auto px-4">
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-8">
                            새로운 소식과 업데이트를 확인하세요!
                        </h2>
                        <div className='grid grid-cols-1 md:grid-cols-3 gap-8 px-4 md:px-16'>
                            <div className='bg-white rounded-lg p-6'>
                                <p className='text-gray-600'>[업데이트] Terraform 최신 버전 적용</p>
                            </div>
                            <div className='bg-white rounded-lg p-6'>
                                <p className='text-gray-600'>[이벤트] 신규 가입자 ~~~ 제공</p>
                            </div>
                            <div className='bg-white rounded-lg p-6'>
                                <p className='text-gray-600'>[보안] AWS IAM 권한 관리 강화 안내</p>
                            </div>
                        </div>
                    </div>
                </section>
                {/* 6. 푸터 (Footer) */}
                <footer id="footer" className="bg-gray-800 text-white py-4 text-center">
                    <div className="container mx-auto px-4">
                        <h2 className='text-2xl font-bold mb-4'>문의하기</h2>
                        <p className='mb-4'>✉️ support@shepherdgirls.com</p>
                        <p className='mb-4'>📍 123 New York, USA</p>

                        <h2 className='text-2xl font-bold mb-4'>Follow us</h2>
                        <div className='flex justify-center space-x-4 mb-8'>
                            <a href="#" className="hover:text-blue-500">🔗 인스타그램</a>
                            <a href="#" className="hover:text-blue-500">🔗 링크드인</a>
                            <a href="#" className="hover:text-blue-500">🔗 깃허브</a>
                        </div>

                        <p>Copyright ⓒ 2025 CLOUD-CLOUDY. All rights reserved.</p>
                    </div>
                </footer>
            </main>
        </div>
    );
}
