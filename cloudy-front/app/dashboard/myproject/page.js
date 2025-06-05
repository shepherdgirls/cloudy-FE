'use client';

// pages/dashboard/my-projects.js
import { useEffect, useState } from 'react';

export default function MyProjects() {
  // 나중에 GitHub API로 대체될 mock 데이터
  const [projects, setProjects] = useState([
    {
      name: 'Vel pellentesque bibendum.',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
      architecture: 'EC2+RDS+ALB',
      createdAt: '2025.01.01',
    },
    {
      name: 'Magna quis at non',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Libero.',
      architecture: '아키텍처 어쩌구',
      createdAt: '2025.01.01',
    },
    {
      name: 'Cursus tortor ac eget',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
      architecture: '아키텍처 저쩌구',
      createdAt: '2025.01.01',
    },
  ]);

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-1">내 프로젝트</h1>
      <div className="text-sm text-gray-500 mb-4">
        <span className="text-purple-600 cursor-pointer">My Projects</span> &gt; Projects lists
      </div>

      <div className="border rounded-lg overflow-hidden">
        <div className="grid grid-cols-12 bg-gray-100 text-sm font-semibold px-6 py-3">
          <div className="col-span-5">프로젝트 이름</div>
          <div className="col-span-3">사용한 아키텍처</div>
          <div className="col-span-2">생성 날짜</div>
        </div>

        {projects.map((project, index) => (
          <div
            key={index}
            className="grid grid-cols-12 items-center border-t px-6 py-4 hover:bg-gray-50"
          >
            <div className="col-span-5">
              <div className="italic font-medium">{project.name}</div>
              <div className="text-sm text-gray-500">{project.description}</div>
            </div>
            <div className="col-span-3">{project.architecture}</div>
            <div className="col-span-2">{project.createdAt}</div>
            <div className="col-span-2 flex justify-center gap-3 text-gray-600">
                <button className="text-blue-500">수정</button>
                <button className="text-red-500">삭제</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
