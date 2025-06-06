"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import styled from "styled-components";

// styled-components 사용
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

const TabRow = styled.div`
  display: flex;
  gap: 1rem;
  margin-bottom: 2rem;
`;

const TabButton = styled.button`
  display: flex;
  align-items: center;
  padding: 0.75rem 1.5rem;
  border-radius: 0.75rem 0.75rem 0 0;
  background: ${({ $active }) => ($active ? "#fff" : "#f3f4f6")};
  border: none;
  border-bottom: 2px solid ${({ $active }) => ($active ? "#2563eb" : "transparent")};
  font-weight: bold;
  color: ${({ $active }) => ($active ? "#2563eb" : "#6b7280")};
  cursor: pointer;
  font-size: 1rem;
`;

const CardGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 2rem;
  margin-bottom: 2rem;
`;

const ArchCard = styled.button`
  background: #fff;
  border-radius: 1rem;
  box-shadow: 0 2px 8px rgba(0,0,0,0.06);
  padding: 2rem;
  border: 2px solid ${({ $selected }) => ($selected ? "#2563eb" : "transparent")};
  outline: ${({ $selected }) => ($selected ? "2px solid #bfdbfe" : "none")};
  transition: border 0.2s, outline 0.2s;
  text-align: left;
  cursor: pointer;
  &:hover {
    border: 2px solid #60a5fa;
  }
`;

const CardTitle = styled.div`
  font-size: 1.1rem;
  font-weight: bold;
  margin-bottom: 0.5rem;
`;

const CardDesc = styled.div`
  color: #6b7280;
  font-size: 0.95rem;
`;

const BottomRow = styled.div`
  display: flex;
  justify-content: space-between;
`;

const BottomButton = styled.button`
  padding: 0.9rem 2.5rem;
  border-radius: 0.5rem;
  font-weight: bold;
  font-size: 1.1rem;
  border: 1px solid #d1d5db;
  background: #fff;
  color: #111827;
  transition: background 0.2s;
  &:hover {
    background: #f3f4f6;
  }
  &.primary {
    background: #2563eb;
    color: #fff;
    border: none;
    &:hover {
      background: #1d4ed8;
    }
  }
`;

// 아키텍처 템플릿 목록
const architectures = [
  {
    key: "static_website",
    title: "EC2 + RDS + ALB",
    template_name: "static_website",
    desc: (
      <>
        <span style={{ fontStyle: "italic", fontWeight: 600 }}>static-website</span>
        <br />
        웹 서버와 데이터베이스를 갖춘<br />
        고가용성 웹 애플리케이션(EC2, RDS, ALB)
        <br /><br />
        <span style={{ color: "#6b7280", fontSize: "0.95rem" }}>
          사용 사례: 다양한 웹 애플리케이션, 백엔드 API 서버
        </span>
      </>
    ),
  },
  {
    key: "ec2_lambda",
    title: "EC2 + Lambda",
    template_name: "ec2_lambda",
    desc: (
      <>
        <span style={{ fontStyle: "italic", fontWeight: 600 }}>ec2-lambda</span>
        <br />
        서버리스 기능을 갖춘<br />
        하이브리드 아키텍처
        <br /><br />
        <span style={{ color: "#6b7280", fontSize: "0.95rem" }}>
          사용 사례: 이벤트 기반 처리, 비동기 작업 처리
        </span>
      </>
    ),
  },
  {
    key: "s3_cloudfront",
    title: "S3 + CloudFront",
    template_name: "s3_cloudfront",
    desc: (
      <>
        <span style={{ fontStyle: "italic", fontWeight: 600 }}>s3-cloudfront</span>
        <br />
        정적 웹사이트 호스팅을 위한<br />
        서버리스 아키텍처
        <br /><br />
        <span style={{ color: "#6b7280", fontSize: "0.95rem" }}>
          사용 사례: 정적 웹사이트, SPA 애플리케이션
        </span>
      </>
    ),
  },
];

export default function ArchitectureSelectPage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  // 이전 페이지에서 받은 값
  const [projectName, setProjectName] = useState("");
  const [projectDesc, setProjectDesc] = useState("");
  const [gitRepo, setGitRepo] = useState("");
  const [selected, setSelected] = useState(architectures[0].key);

  // 쿼리스트링에서 값 받아오기
  useEffect(() => {
    setProjectName(searchParams.get("projectName") || "");
    setProjectDesc(searchParams.get("projectDesc") || "");
    setGitRepo(searchParams.get("gitRepo") || "");
  }, [searchParams]);

  // 다음 단계로 이동
  const handleNext = () => {
    const selectedArch = architectures.find(a => a.key === selected);
    router.push(
      `/dashboard/project/custom?projectName=${encodeURIComponent(projectName)}&projectDesc=${encodeURIComponent(projectDesc)}&gitRepo=${encodeURIComponent(gitRepo)}&templateName=${encodeURIComponent(selectedArch.template_name)}`
    );
  };

  return (
    <Container>
      <Main>
        <Title>프로젝트</Title>
        <SubTitle>Projects &gt; Architecture</SubTitle>

        <TabRow>
          <TabButton onClick={() => router.push(`/dashboard/project?projectName=${encodeURIComponent(projectName)}&projectDesc=${encodeURIComponent(projectDesc)}&gitRepo=${encodeURIComponent(gitRepo)}`)}>
            환경설정
            <span style={{
              marginLeft: "0.5rem",
              background: "#ede9fe",
              color: "#7c3aed",
              borderRadius: "9999px",
              padding: "0 0.5rem",
              fontSize: "0.75rem"
            }}>25</span>
          </TabButton>
          <TabButton $active>
            아키텍처
            <span style={{
              marginLeft: "0.5rem",
              background: "#ede9fe",
              color: "#7c3aed",
              borderRadius: "9999px",
              padding: "0 0.5rem",
              fontSize: "0.75rem"
            }}>8</span>
          </TabButton>
          <TabButton disabled>
            테라폼 커스텀
            <span style={{
              marginLeft: "0.5rem",
              background: "#ede9fe",
              color: "#7c3aed",
              borderRadius: "9999px",
              padding: "0 0.5rem",
              fontSize: "0.75rem"
            }}>12</span>
          </TabButton>
        </TabRow>

        <h2 style={{ fontSize: "1.5rem", fontWeight: "bold", marginBottom: "0.5rem" }}>아키텍처</h2>
        <p style={{ color: "#6b7280", marginBottom: "2rem" }}>
          프로젝트에 적합한 아키텍처 템플릿을 선택합니다.
        </p>

        <CardGrid>
          {architectures.map((arch) => (
            <ArchCard
              key={arch.key}
              $selected={selected === arch.key}
              onClick={() => setSelected(arch.key)}
              type="button"
            >
              <CardTitle>{arch.title}</CardTitle>
              <CardDesc>{arch.desc}</CardDesc>
            </ArchCard>
          ))}
        </CardGrid>

        <BottomRow>
          <BottomButton
            onClick={() =>
              router.push(`/dashboard/project?projectName=${encodeURIComponent(projectName)}&projectDesc=${encodeURIComponent(projectDesc)}&gitRepo=${encodeURIComponent(gitRepo)}`)
            }
          >
            이전
          </BottomButton>
          <BottomButton className="primary" onClick={handleNext}>
            다음 단계
          </BottomButton>
        </BottomRow>
      </Main>
    </Container>
  );
}