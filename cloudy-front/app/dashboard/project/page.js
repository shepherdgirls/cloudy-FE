"use client";

import { useState } from "react";
import styled from "styled-components";
import { useRouter } from "next/navigation";

const Container = styled.div`
  min-height: 100vh;
  background: #f9fafb;
  display: flex;
`;

const Main = styled.main`
  flex: 1;
  padding: 48px;
`;

const Title = styled.h1`
  font-size: 2rem;
  font-weight: bold;
  margin-bottom: 0.5rem;
`;

const SubTitle = styled.p`
  font-size: 0.95rem;
  color: #6b7280;
  margin-bottom: 2rem;
`;

const Card = styled.div`
  background: #fff;
  border-radius: 1rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
  padding: 3rem;
  max-width: 600px;
  margin: 0 auto;
`;

const SectionTitle = styled.h2`
  font-size: 1.3rem;
  font-weight: bold;
  margin-bottom: 0.5rem;
`;

const SectionDesc = styled.p`
  color: #6b7280;
  margin-bottom: 2rem;
`;

const Label = styled.label`
  display: block;
  font-weight: 600;
  margin-bottom: 0.5rem;
`;

const Input = styled.input`
  width: 100%;
  border: 1px solid #d1d5db;
  border-radius: 0.5rem;
  padding: 0.5rem 0.75rem;
  margin-bottom: 1.5rem;
  font-size: 1rem;
  &:focus {
    outline: 2px solid #2563eb;
    border-color: #2563eb;
  }
`;

const Button = styled.button`
  width: 100%;
  background: #2563eb;
  color: #fff;
  padding: 0.9rem 0;
  border-radius: 0.5rem;
  font-weight: bold;
  font-size: 1.1rem;
  margin-top: 2.5rem;
  transition: background 0.2s;
  &:hover {
    background: #1d4ed8;
  }
`;

export default function ProjectSettingPage() {
  const [projectName, setProjectName] = useState("");
  const [projectDesc, setProjectDesc] = useState("");
  const [gitRepo, setGitRepo] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  // 레포 생성 API 호출
  const createRepo = async () => {
    const token = localStorage.getItem("access");
    if (!token) {
      alert("로그인이 필요합니다.");
      return false;
    }
    try {
      const res = await fetch("http://15.164.170.14:8000/github/create-repo/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          name: gitRepo,
          description: projectDesc,
          auto_init: true,
        }),
      });
      if (!res.ok) {
        const msg = await res.text();
        alert("레포 생성 실패: " + msg);
        return false;
      }
      return true;
    } catch (e) {
      alert("네트워크 오류: " + e.message);
      return false;
    }
  };

  // 다음 단계로 이동
  const handleNext = async () => {
    if (!projectName || !gitRepo) {
      alert("프로젝트 이름과 Git 레포 이름을 입력하세요.");
      return;
    }
    setLoading(true);
    const repoCreated = await createRepo();
    setLoading(false);
    if (repoCreated) {
      router.push(
        `/dashboard/project/architecture?projectName=${encodeURIComponent(
          projectName
        )}&projectDesc=${encodeURIComponent(
          projectDesc
        )}&gitRepo=${encodeURIComponent(gitRepo)}`
      );
    }
  };

  return (
    <Container>
      <Main>
        <Title>프로젝트</Title>
        <SubTitle>Projects &gt; Pipeline</SubTitle>
        <Card>
          <SectionTitle>환경설정</SectionTitle>
          <SectionDesc>프로젝트의 기본 정보와 git 저장소를 입력하세요.</SectionDesc>
          <form onSubmit={(e) => { e.preventDefault(); handleNext(); }}>
            <Label htmlFor="projectName">프로젝트 이름</Label>
            <Input
              id="projectName"
              placeholder="예: my-aws-project"
              value={projectName}
              onChange={(e) => setProjectName(e.target.value)}
              required
            />

            <Label htmlFor="projectDesc">프로젝트 설명</Label>
            <Input
              id="projectDesc"
              placeholder="예: 웹 애플리케이션을 위한 AWS 인프라"
              value={projectDesc}
              onChange={(e) => setProjectDesc(e.target.value)}
            />

            <Label htmlFor="gitRepo">새로 만들 Git 레포 이름</Label>
            <Input
              id="gitRepo"
              placeholder="예: my-aws-repo"
              value={gitRepo}
              onChange={(e) => setGitRepo(e.target.value)}
              required
            />

            <Button type="submit" disabled={loading}>
              {loading ? "레포 생성 중..." : "다음 단계"}
            </Button>
          </form>
        </Card>
      </Main>
    </Container>
  );
}