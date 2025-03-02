// app/home/page.js
import Navbar from '../components/Navbar';

export default function NewHomePage() {
  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      {/* 네비게이션 바 */}
      <Navbar />

      {/* 헤더 영역 */}
      <header className="bg-gray-100 py-16 text-center">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">
          무료 가상서버 생성으로 클라우디를 시작하세요!
        </h1>
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-full">
          시작하기
        </button>
      </header>

      {/* 카드 형태의 섹션 */}
      <main className="flex-grow overflow-y-auto p-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-16">
          {/* 카드 1 */}
          <Card title="Card 1" content="This is the content of card 1." />
          {/* 카드 2 */}
          <Card title="Card 2" content="This is the content of card 2." />
          {/* 카드 3 */}
          <Card title="Card 3" content="This is the content of card 3." />
          {/* 카드 4 */}
          <Card title="Card 4" content="This is the content of card 4." />
          {/* 카드 5 */}
          <Card title="Card 5" content="This is the content of card 5." />
          {/* 카드 6 */}
          <Card title="Card 6" content="This is the content of card 6." />
        </div>
      </main>
    </div>
  );
}

// 카드 컴포넌트
function Card({ title, content }) {
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-xl font-semibold mb-4">{title}</h2>
      <p className="text-gray-700 mb-4">{content}</p>
      <a href="#" className="text-blue-500 hover:underline">더 보기</a>
    </div>
  );
}
