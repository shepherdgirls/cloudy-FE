"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import styled from "styled-components";

// styled-components 정의
const Container = styled.div`
  display: flex;
  min-height: 100vh;
  background-color: #f9fafb;
`;

const Main = styled.main`
  flex: 1;
  padding: 3rem;
`;

const Title = styled.h1`
  font-size: 1.875rem;
  font-weight: bold;
  margin-bottom: 0.5rem;
`;

const SubTitle = styled.p`
  font-size: 0.875rem;
  color: #6b7280;
  margin-bottom: 2rem;
`;

const Flex = styled.div`
  display: flex;
  gap: 2rem;
`;

const FormCard = styled.div`
  flex: 1;
  background: #fff;
  border-radius: 0.5rem;
  box-shadow: 0 1px 2px 0 rgb(0 0 0 / 0.05);
  padding: 2rem;
`;

const Section = styled.div`
  margin-bottom: 1.5rem;
`;

const Label = styled.label`
  display: flex;
  align-items: center;
  font-weight: 600;
  margin-bottom: 0.5rem;
`;

const Input = styled.input`
  border: 1px solid #d1d5db;
  border-radius: 0.375rem;
  padding: 0.5rem 0.75rem;
  width: 100%;
  margin-bottom: 0.5rem;
`;

const Select = styled.select`
  border: 1px solid #d1d5db;
  border-radius: 0.375rem;
  padding: 0.5rem 0.75rem;
  width: 100%;
  margin-bottom: 0.5rem;
`;

const Info = styled.span`
  font-size: 0.85rem;
  color: #2563eb;
  margin-left: 0.5rem;
`;

const CodePanel = styled.div`
  width: 500px;
`;

const CodeTabs = styled.div`
  background: #111827;
  border-radius: 0.5rem 0.5rem 0 0;
  display: flex;
`;

const CodeTabButton = styled.button`
  padding: 0.5rem 1rem;
  font-size: 0.875rem;
  font-family: "Fira Mono", monospace;
  background: ${({ $active }) => ($active ? "#1f2937" : "transparent")};
  color: ${({ $active }) => ($active ? "#60a5fa" : "#9ca3af")};
  border-radius: 0.5rem 0.5rem 0 0;
  border: none;
  cursor: pointer;
`;

const CodeBox = styled.div`
  background: #111827;
  border-radius: 0 0 0.5rem 0.5rem;
  padding: 1rem;
  height: 500px;
  overflow: auto;
`;

const CodePre = styled.pre`
  color: #bbf7d0;
  font-size: 0.75rem;
  font-family: "Fira Mono", monospace;
  white-space: pre-wrap;
  .highlight {
    background: #2563eb;
    color: #fff;
    border-radius: 0.25rem;
    padding: 0 0.2em;
  }
`;

const BottomRow = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 2rem;
`;

const BottomButton = styled.button`
  padding: 0.75rem 2rem;
  border-radius: 0.5rem;
  font-weight: bold;
  border: ${({ $primary }) => ($primary ? "none" : "1px solid #d1d5db")};
  background: ${({ $primary }) => ($primary ? "#2563eb" : "#fff")};
  color: ${({ $primary }) => ($primary ? "#fff" : "#111827")};
  &:hover {
    background: ${({ $primary }) => ($primary ? "#1d4ed8" : "#f3f4f6")};
  }
`;

const initialForm = {
  ec2InstanceType: "t2.micro",
  keyPairName: "",
  dbEngine: "postgres",
  dbUsername: "admin",
  dbPassword: "",
  dbStorage: 20,
  albHealthPath: "/",
};

export default function TerraformCustomPage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [form, setForm] = useState(initialForm);
  const [activeTab, setActiveTab] = useState("main.tf");
  const [highlightField, setHighlightField] = useState(null);
  const [loading, setLoading] = useState(false);

  // 프로젝트 정보 쿼리스트링에서 받기
  const projectName = searchParams.get("projectName") || "";
  const projectDesc = searchParams.get("projectDesc") || "";
  const gitRepo = searchParams.get("gitRepo") || "";

  useEffect(() => {
    const dbPassword =
      searchParams.get("dbPassword") ||
      localStorage.getItem("DB_PASSWORD") ||
      "";
    setForm((prev) => ({
      ...prev,
      dbPassword: dbPassword ?? "",
      keyPairName: prev.keyPairName ?? "",
      dbUsername: prev.dbUsername ?? "",
      albHealthPath: prev.albHealthPath ?? "/",
    }));
  }, [searchParams]);

  // variables.tf 생성 함수
  const generateVariablesTf = () => {
    return `variable "project_name" {
  type        = string
  description = "AWS 리소스 태그로 사용될 프로젝트 이름"
  default     = "${projectName}"
}

variable "ec2_instance_type" {
  type        = string
  default     = "${form.ec2InstanceType}"
  description = "EC2 인스턴스 타입"
}

variable "ec2_ami_id" {
  type        = string
  description = "EC2에서 사용할 AMI ID"
  default     = "ami-0891aeb92f786d7a2"
}

variable "rds_engine" {
  type        = string
  default     = "${form.dbEngine}"
  description = "RDS 데이터베이스 엔진"
}

variable "rds_instance_class" {
  type        = string
  default     = "db.t3.micro"
  description = "RDS 인스턴스 타입"
}

variable "rds_username" {
  type        = string
  description = "RDS 마스터 사용자 이름"
  default     = "${form.dbUsername}"
}

variable "rds_password" {
  type        = string
  description = "RDS 마스터 비밀번호"
  sensitive   = true
}

variable "allowed_ip" {
  type        = string
  default     = "0.0.0.0/0"
  description = "접근 허용할 IP 범위"
}
`;
  };

  // 코드 미리보기
  const codePreview = {
    "main.tf": "// main.tf는 템플릿 그대로 업로드됩니다.",
    "variables.tf": generateVariablesTf(),
  };

  // 입력값 변경 핸들러
  const handleChange = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    setHighlightField(field);
    setTimeout(() => setHighlightField(null), 1200);
  };

  // 코드 하이라이트 처리 (간단)
  const getHighlightedCode = (tabKey) => {
    let code = codePreview[tabKey];
    if (highlightField && tabKey === "variables.tf") {
      code = code.replace(
        new RegExp(`default\\s*=\\s*"?${form[highlightField]}"?`, "g"),
        (match) => `<span class="highlight">${match}</span>`
      );
    }
    return code;
  };

  // main.tf fetch 함수
  const fetchMainTf = async () => {
    const res = await fetch("/terraform/main.tf");
    if (!res.ok) throw new Error("main.tf 템플릿을 불러올 수 없습니다.");
    return await res.text();
  };

  // 파일 업로드 API 호출
  const uploadFilesToGithub = async (mainTfContent, variablesTfContent) => {
    const token = localStorage.getItem("access");
    if (!token) {
      alert("로그인이 필요합니다.");
      return false;
    }
    const body = {
      repo_name: gitRepo,
      branch: "main",
      commit_message: "terraform infra files upload",
      files: [
        { path: "main.tf", content: mainTfContent },
        { path: "variables.tf", content: variablesTfContent },
      ],
    };
    const res = await fetch("http://15.164.170.14:8000/github/upload-files/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(body),
    });
    if (!res.ok) {
      const msg = await res.text();
      alert("파일 업로드 실패: " + msg);
      return false;
    }
    return true;
  };

  // 배포하기 버튼 핸들러
  const handleDeploy = async () => {
    if (!gitRepo) {
      alert("Git 레포 정보가 없습니다.");
      return;
    }
    setLoading(true);
    try {
      const mainTf = await fetchMainTf();
      const variablesTf = generateVariablesTf();
      const ok = await uploadFilesToGithub(mainTf, variablesTf);
      setLoading(false);
      if (ok) {
        alert("Terraform 파일이 깃허브에 업로드되었습니다!");
        // 원하는 페이지로 이동
        router.push("/dashboard/project");
      }
    } catch (e) {
      setLoading(false);
      alert("에러: " + e.message);
    }
  };

  return (
    <Container>
      <Main>
        <Title>EC2 + RDS + ALB 커스텀 배포</Title>
        <SubTitle>
          주요 인프라 옵션을 선택하면, 아래 코드가 자동 생성되어 GitHub에 업로드됩니다.
        </SubTitle>
        <Flex>
          {/* 왼쪽: 입력 폼 */}
          <FormCard>
            <h2 style={{ fontSize: "1.15rem", fontWeight: "bold", marginBottom: "1.5rem" }}>
              주요 배포 옵션
            </h2>
            <Section>
              <Label>
                EC2 인스턴스 타입
                <Info>프리티어: t2.micro 권장</Info>
              </Label>
              <Select
                value={form.ec2InstanceType}
                onChange={(e) => handleChange("ec2InstanceType", e.target.value)}
              >
                <option value="t2.micro">t2.micro</option>
                <option value="t3.micro">t3.micro</option>
                <option value="t3.small">t3.small</option>
              </Select>
            </Section>
            <Section>
              <Label>
                EC2 SSH 키페어 이름
                <Info>EC2 콘솔에서 미리 생성 필요</Info>
              </Label>
              <Input
                value={form.keyPairName || ""}
                onChange={(e) => handleChange("keyPairName", e.target.value)}
                placeholder="예: default-key"
              />
            </Section>
            <Section>
              <Label>
                RDS DB 엔진
                <Info>PostgreSQL 권장</Info>
              </Label>
              <div style={{ display: "flex", gap: "1rem" }}>
                <Label>
                  <input
                    type="radio"
                    name="dbEngine"
                    value="postgres"
                    checked={form.dbEngine === "postgres"}
                    onChange={(e) => handleChange("dbEngine", e.target.value)}
                  />
                  PostgreSQL
                </Label>
                <Label>
                  <input
                    type="radio"
                    name="dbEngine"
                    value="mysql"
                    checked={form.dbEngine === "mysql"}
                    onChange={(e) => handleChange("dbEngine", e.target.value)}
                  />
                  MySQL
                </Label>
              </div>
            </Section>
            <Section>
              <Label>
                RDS DB 사용자명
                <Info>admin 권장</Info>
              </Label>
              <Input
                value={form.dbUsername}
                onChange={(e) => handleChange("dbUsername", e.target.value)}
                placeholder="예: admin"
              />
            </Section>
            <Section>
              <Label>
                RDS DB 비밀번호
                <Info>GitHub Secret에서 주입</Info>
              </Label>
              <Input
                value={form.dbPassword || ""}
                onChange={(e) => handleChange("dbPassword", e.target.value)}
                placeholder="DB_PASSWORD"
                type="password"
              />
            </Section>
            <Section>
              <Label>
                RDS 스토리지(GB)
                <Info>20~100GB 권장</Info>
              </Label>
              <Input
                type="number"
                min={20}
                max={100}
                value={form.dbStorage}
                onChange={(e) => handleChange("dbStorage", e.target.value)}
              />
            </Section>
            <Section>
              <Label>
                ALB Health Check 경로
                <Info>기본값: /</Info>
              </Label>
              <Input
                value={form.albHealthPath || "/"}
                onChange={(e) => handleChange("albHealthPath", e.target.value)}
                placeholder="/health"
              />
            </Section>
          </FormCard>
          {/* 오른쪽: 코드 패널 */}
          <CodePanel>
            <CodeTabs>
              {["main.tf", "variables.tf"].map((tab) => (
                <CodeTabButton
                  key={tab}
                  $active={activeTab === tab}
                  onClick={() => setActiveTab(tab)}
                  type="button"
                >
                  {tab}
                </CodeTabButton>
              ))}
            </CodeTabs>
            <CodeBox>
              <CodePre
                dangerouslySetInnerHTML={{
                  __html: getHighlightedCode(activeTab),
                }}
              />
            </CodeBox>
          </CodePanel>
        </Flex>
        {/* 하단 이동 버튼 */}
        <BottomRow>
          <BottomButton onClick={() => router.push("/dashboard/project/architecture")}>
            이전
          </BottomButton>
          <BottomButton $primary onClick={handleDeploy} disabled={loading}>
            {loading ? "업로드 중..." : "배포하기"}
          </BottomButton>
        </BottomRow>
      </Main>
    </Container>
  );
}