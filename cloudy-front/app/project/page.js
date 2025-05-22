"use client";

import { useState } from "react";

export default function ProjectSettingPage() {
  // UI 상태 (실제 API 연동 X)
  const [projectName, setProjectName] = useState("");
  const [projectDesc, setProjectDesc] = useState("");
  const [gitRepo, setGitRepo] = useState("");
  const [gitBranch, setGitBranch] = useState("");
  const [gitDir, setGitDir] = useState("");
  const [awsProfile, setAwsProfile] = useState("");
  const [region, setRegion] = useState("ap-northeast-2");
  const [tags, setTags] = useState([{ key: "Environment", value: "Development" }]);

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* 사이드바 */}
      <aside className="w-60 bg-white border-r p-6 flex flex-col justify-between">
        <div>
          <h2 className="text-xl font-bold mb-8">Cloud-Cloudy</h2>
          <nav>
            <ul className="space-y-4">
              <li><a href="#" className="font-semibold">Home</a></li>
              <li><a href="#">My Projects</a></li>
              <li><a href="#">Create projects</a></li>
              <li><a href="#">Security</a></li>
            </ul>
          </nav>
        </div>
        <div className="flex items-center space-x-2 mt-8">
          <img src="/avatar.png" alt="avatar" className="w-8 h-8 rounded-full" />
          <div>
            <p className="font-bold text-sm">Jenny Patron</p>
            <p className="text-xs text-gray-500">jenny@gmail.com</p>
          </div>
        </div>
      </aside>

      {/* 메인 */}
      <main className="flex-1 p-12">
        <h1 className="text-3xl font-bold mb-2">프로젝트</h1>
        <p className="text-sm text-gray-500 mb-8">Projects &gt; Pipeline</p>

        {/* 상단 탭 */}
        <div className="flex space-x-4 mb-8">
          <button className="flex items-center px-4 py-2 rounded-t bg-white border-b-2 border-blue-600 font-bold">
            환경설정 <span className="ml-2 bg-purple-100 text-purple-700 rounded-full px-2 text-xs">25</span>
          </button>
          <button className="flex items-center px-4 py-2 rounded-t bg-gray-100 text-gray-400 cursor-not-allowed">
            아키텍처 <span className="ml-2 bg-purple-100 text-purple-700 rounded-full px-2 text-xs">8</span>
          </button>
          <button className="flex items-center px-4 py-2 rounded-t bg-gray-100 text-gray-400 cursor-not-allowed">
            테라폼 커스텀 <span className="ml-2 bg-purple-100 text-purple-700 rounded-full px-2 text-xs">12</span>
          </button>
        </div>

        {/* 환경설정 폼 */}
        <div className="bg-white rounded-lg shadow p-12 max-w-5xl mx-auto">
          <h2 className="text-2xl font-bold mb-2">환경설정</h2>
          <p className="text-gray-500 mb-8">프로젝트의 기본 정보와 환경을 설정합니다.</p>
          <div className="grid grid-cols-2 gap-8">
            {/* 왼쪽 */}
            <div>
              <label className="block font-semibold mb-2">프로젝트 이름</label>
              <input
                className="w-full border rounded px-3 py-2 mb-6"
                placeholder="예: my-aws-project"
                value={projectName}
                onChange={e => setProjectName(e.target.value)}
              />

              <label className="block font-semibold mb-2">Git 저장소 연결</label>
              <select
                className="w-full border rounded px-3 py-2 mb-4"
                value={gitRepo}
                onChange={e => setGitRepo(e.target.value)}
              >
                <option value="">Git 저장소 선택</option>
                <option value="repo1">github.com/your/repo1</option>
                <option value="repo2">github.com/your/repo2</option>
              </select>
              <div className="flex space-x-2 mb-6">
                <select
                  className="w-1/2 border rounded px-3 py-2"
                  value={gitBranch}
                  onChange={e => setGitBranch(e.target.value)}
                >
                  <option value="">브랜치 선택</option>
                  <option value="main">main</option>
                  <option value="dev">dev</option>
                </select>
                <input
                  className="w-1/2 border rounded px-3 py-2"
                  placeholder="디렉토리 (선택)"
                  value={gitDir}
                  onChange={e => setGitDir(e.target.value)}
                />
              </div>

              <label className="block font-semibold mb-2">AWS 리전 선택</label>
              <select
                className="w-full border rounded px-3 py-2"
                value={region}
                onChange={e => setRegion(e.target.value)}
              >
                <option value="ap-northeast-2">ap-northeast-2 (서울)</option>
                <option value="us-east-1">us-east-1 (버지니아)</option>
              </select>
            </div>
            {/* 오른쪽 */}
            <div>
              <label className="block font-semibold mb-2">프로젝트 설명</label>
              <input
                className="w-full border rounded px-3 py-2 mb-6"
                placeholder="예: 웹 애플리케이션을 위한 AWS 인프라"
                value={projectDesc}
                onChange={e => setProjectDesc(e.target.value)}
              />

              <label className="block font-semibold mb-2">AWS 계정 설정</label>
              <select
                className="w-full border rounded px-3 py-2 mb-6"
                value={awsProfile}
                onChange={e => setAwsProfile(e.target.value)}
              >
                <option value="">AWS 프로필 선택</option>
                <option value="profile1">profile1</option>
                <option value="profile2">profile2</option>
              </select>

              <label className="block font-semibold mb-2">리소스 태그 설정 (선택)</label>
              <div className="flex space-x-2 mb-2">
                <input
                  className="border rounded px-3 py-2 w-1/2"
                  value={tags[0].key}
                  onChange={e => setTags([{ ...tags[0], key: e.target.value }])}
                  placeholder="키"
                />
                <input
                  className="border rounded px-3 py-2 w-1/2"
                  value={tags[0].value}
                  onChange={e => setTags([{ ...tags[0], value: e.target.value }])}
                  placeholder="값"
                />
              </div>
            </div>
          </div>
          <button
            className="mt-12 w-full bg-blue-600 text-white py-3 rounded font-bold hover:bg-blue-700"
            // 아키텍처 페이지로 이동
            onClick={() => window.location.href = "/project/architecture"}
          >
            다음 단계
          </button>
        </div>
      </main>
    </div>
  );
}