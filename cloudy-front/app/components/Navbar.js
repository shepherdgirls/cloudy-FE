// app/components/Navbar.js
import Image from 'next/image';
import logo from '../../public/images/logo.svg';

export default function Navbar() {
  return (
    <nav className="bg-white shadow-md p-4 flex justify-between items-center">
      {/* 로고 */}
      <div className="flex items-center">
        <Image src={logo} alt="Logo" width={50} height={50} />
        <span className="font-bold text-xl ml-2">Cloud-Cloudy</span>
      </div>
      {/* 메뉴 */}
      <div className="flex space-x-6">
        <a href="#" className="hover:text-blue-500">소개</a>
        <a href="#" className="hover:text-blue-500">기능</a>
        <a href="#" className="hover:text-blue-500">가격</a>
        <a href="#" className="hover:text-blue-500">문의</a>
      </div>
      {/* 로그인/회원가입 버튼 */}
      <div className="space-x-4">
        <button className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-2 px-4 rounded">
          로그인
        </button>
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          회원가입
        </button>
      </div>
    </nav>
  );
}
