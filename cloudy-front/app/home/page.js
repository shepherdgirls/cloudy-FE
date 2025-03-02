// app/home/page.js
import Navbar from '../components/Navbar';
import Image from 'next/image'; // Image 컴포넌트 import
import mainImage from '../../public/images/mainImage.svg'; // 이미지 파일 경로를 수정해주세요.

export default function NewHomePage() {
  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      {/* 네비게이션 바 */}
      <Navbar />

      {/* 메인 영역 */}
      <main className="flex-grow overflow-y-auto pt-20">
        <section id="main" className="bg-gray-100 py-16 text-center">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              {/* 텍스트 영역 */}
              <div className="md:text-left">
                <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
                  가상 서버 구축,<br />
                  이제는 쉽고 빠르게
                </h1>
                <p className="text-gray-600 mb-8 text-lg">
                  클라우디와 함께라면 가능합니다. 클라우디는 사용자 여러분의 소중한 시간을 절약하고 <br />
                  가상 서버 구축의 어려움을 덜어주는 가장 혁신적인 솔루션입니다. 지금 바로 클라우디를 경험해보세요.
                </p>
                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-full">
                  시작하기
                </button>
              </div>
              {/* 이미지 영역 */}
              <div className=''>
                <Image src={mainImage} alt="Main Image" width={600} height={400} className="mx-auto" />
              </div>
            </div>
          </div>
        </section>

        {/* About 영역 */}
        <section id="about" className="py-24 text-center">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-8">
              클라우디에 대해 알아보기
            </h2>
            <p className="text-gray-600 px-4 md:px-16 text-lg">
              클라우디는 사용자가 클라우드 서비스를 보다 쉽고 편리하게 사용할 수 있도록 도와주는 혁신적인 플랫폼입니다.<br />
              복잡한 인프라 설정 없이도 즉시 가상 서버를 생성하고 관리할 수 있는 간편함을 제공합니다.
            </p>
          </div>
        </section>

        {/* Users 영역 */}
        <section id="users" className="bg-gray-100 py-24 text-center">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-8">
              누가 클라우디를 사용할까요?
            </h2>
            <p className="text-gray-600 px-4 md:px-16 text-lg">
              클라우디는 개발자, 스타트업, 학생 등 다양한 사용자에게 이상적인 솔루션입니다. <br/>
              가상 서버를 처음 사용하는 분들도 쉽게 시작할 수 있도록 직관적인 인터페이스와 사용 방법을 제공합니다.
            </p>
          </div>
        </section>

        {/* Guide 영역 */}
        <section id="guide" className="py-24 text-center">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-8">
              클라우디 사용 가이드
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-16 px-4 md:px-16">
              {/* 3단계 설명 */}
              <div className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-xl font-semibold mb-4">Step 1</h3>
                <p className="text-gray-700 text-lg">회원가입 및 로그인</p>
              </div>
              <div className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-xl font-semibold mb-4">Step 2</h3>
                <p className="text-gray-700 text-lg">원하는 서버 유형 선택</p>
              </div>
              <div className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-xl font-semibold mb-4">Step 3</h3>
                <p className="text-gray-700 text-lg">서버 생성 및 관리</p>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
