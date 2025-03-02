// app/components/Navbar.js
import Image from 'next/image';
import logo from '../../public/images/logo.svg';
import Link from 'next/link'; // Link 컴포넌트 import

export default function Navbar() {
  return (
    <nav className="bg-white shadow-md p-4 flex justify-between items-center fixed top-0 left-0 w-full z-50">
      {/* 로고 */}
      <div className="flex items-center">
        <Link href="#">
            <Image src={logo} alt="Logo" width={50} height={50} />
        </Link>
        <Link href="#">
            <span className="font-bold text-xl ml-2 cursor-pointer">Cloud-Cloudy</span>
        </Link>
      </div>
      {/* 메뉴 */}
      <div className="flex space-x-6">
        <Link href="#main" className="hover:text-blue-500">MAIN</Link>
        <Link href="#about" className="hover:text-blue-500">ABOUT</Link>
        <Link href="#users" className="hover:text-blue-500">USERS</Link>
        <Link href="#guide" className="hover:text-blue-500">GUIDE</Link>
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
