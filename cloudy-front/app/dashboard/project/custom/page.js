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

const TabRow = styled.div`
  display: flex;
  gap: 1rem;
  margin-bottom: 2rem;
`;

const TabButton = styled.button`
  display: flex;
  align-items: center;
  padding: 0.5rem 1rem;
  border-radius: 0.5rem 0.5rem 0 0;
  background: ${({ $active }) => ($active ? "#fff" : "#fff")};
  border-bottom: 2px solid ${({ $active }) => ($active ? "#2563eb" : "#fff")};
  font-weight: bold;
  color: ${({ $active }) => ($active ? "#2563eb" : "#6b7280")};
  cursor: ${({ disabled }) => (disabled ? "not-allowed" : "pointer")};
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

const SectionTitle = styled.h3`
  font-weight: bold;
  margin-bottom: 0.5rem;
`;

const Flex = styled.div`
  display: flex;
  gap: ${({ $gap }) => $gap || "0"};
  margin-bottom: ${({ $mb }) => $mb || "0"};
`;

const Input = styled.input`
  border: 1px solid #d1d5db;
  border-radius: 0.375rem;
  padding: 0.5rem 0.75rem;
  width: ${({ $w }) => $w || "100%"};
  margin-bottom: ${({ $mb }) => $mb || "0"};
`;

const Select = styled.select`
  border: 1px solid #d1d5db;
  border-radius: 0.375rem;
  padding: 0.5rem 0.75rem;
  width: 100%;
  margin-bottom: 0.5rem;
`;

const Label = styled.label`
  display: flex;
  align-items: center;
  font-weight: ${({ $bold }) => ($bold ? "bold" : "normal")};
  margin-bottom: ${({ $mb }) => $mb || "0"};
`;

const Checkbox = styled.input.attrs({ type: "checkbox" })`
  margin-right: 0.5rem;
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

// 탭: main.tf, variables.tf만 사용
const codeTabs = [
  { key: "main.tf", label: "main.tf" },
  { key: "variables.tf", label: "variables.tf" },
];

// 필드와 코드 내 변수 매핑 (variables.tf는 rdsPassword 제외)
const fieldToCode = {
  vpcCidr: { tab: "main.tf", regex: /vpc_cidr\s*=\s*".*?"/ },
  ec2Ami: { tab: "variables.tf", regex: /variable\s+"ec2_ami_id"[\s\S]*?default\s*=\s*".*?"/ },
  rdsEngine: { tab: "variables.tf", regex: /variable\s+"rds_engine"[\s\S]*?default\s*=\s*".*?"/ },
  rdsUser: { tab: "variables.tf", regex: /variable\s+"rds_username"[\s\S]*?default\s*=\s*".*?"/ },
  rdsPassword: { tab: "variables.tf", regex: /variable\s+"rds_password"[\s\S]*?description\s*=\s*".*?"/ },
  // ...필요시 추가
};

const initialForm = {
  vpcCidr: "10.0.0.0/16",
  ec2Ami: "ami-0891aeb92f786d7a2",
  rdsEngine: "mysql",
  rdsUser: "rdstest01",
  rdsPassword: "",
};

export default function TerraformCustomPage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  // 이전 단계에서 받은 DB_PASSWORD
  const [form, setForm] = useState(initialForm);
  const [activeTab, setActiveTab] = useState("main.tf");
  const [highlightField, setHighlightField] = useState(null);

  useEffect(() => {
    // DB_PASSWORD는 쿼리스트링 또는 localStorage 등에서 받아옴
    const dbPassword =
      searchParams.get("dbPassword") ||
      localStorage.getItem("DB_PASSWORD") ||
      "";
    setForm((prev) => ({ ...prev, rdsPassword: dbPassword }));
  }, [searchParams]);

  // 코드 미리보기 (실제론 템플릿에서 변수 치환)
  const codePreview = {
    "main.tf": `resource "aws_vpc" "main" {
  vpc_cidr = "${form.vpcCidr}"
  # ...
}
`,
    "variables.tf": `variable "ec2_ami_id" {
  type        = string
  description = "EC2에서 사용할 AMI ID"
  default     = "${form.ec2Ami}"
}

variable "rds_engine" {
  type        = string
  default     = "${form.rdsEngine}"
  description = "RDS 데이터베이스 엔진"
}

variable "rds_username" {
  type        = string
  description = "RDS 마스터 사용자 이름"
  default     = "${form.rdsUser}"
}

variable "rds_password" {
  type        = string
  description = "RDS 마스터 비밀번호"
  sensitive   = true
  // 실제 값은 GitHub Secret(DB_PASSWORD)에서 주입
}
`,
  };

  // 입력값 변경 핸들러
  const handleChange = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    setHighlightField(field);
    if (fieldToCode[field]) setActiveTab(fieldToCode[field].tab);
    setTimeout(() => setHighlightField(null), 1200);
  };

  // 코드 하이라이트 처리
  const getHighlightedCode = (tabKey) => {
    let code = codePreview[tabKey];
    for (const [field, map] of Object.entries(fieldToCode)) {
      if (highlightField === field && map.tab === tabKey) {
        code = code.replace(map.regex, (match) => `<span class="highlight">${match}</span>`);
      }
    }
    return code;
  };

  return (
    <Container>
      <Main>
        <Title>프로젝트</Title>
        <SubTitle>Projects &gt; Terraform Custom</SubTitle>

        <TabRow>
          <TabButton onClick={() => router.push("/dashboard/project")} $active={false}>
            환경설정
            <span
              style={{
                marginLeft: "0.5rem",
                background: "#ede9fe",
                color: "#7c3aed",
                borderRadius: "9999px",
                padding: "0 0.5rem",
                fontSize: "0.75rem",
              }}
            >
              25
            </span>
          </TabButton>
          <TabButton onClick={() => router.push("/dashboard/project/architecture")} $active={false}>
            아키텍처
            <span
              style={{
                marginLeft: "0.5rem",
                background: "#ede9fe",
                color: "#7c3aed",
                borderRadius: "9999px",
                padding: "0 0.5rem",
                fontSize: "0.75rem",
              }}
            >
              8
            </span>
          </TabButton>
          <TabButton disabled $active={true}>
            테라폼 커스텀
            <span
              style={{
                marginLeft: "0.5rem",
                background: "#ede9fe",
                color: "#7c3aed",
                borderRadius: "9999px",
                padding: "0 0.5rem",
                fontSize: "0.75rem",
              }}
            >
              12
            </span>
          </TabButton>
        </TabRow>

        <Flex $gap="2rem">
          {/* 왼쪽: 입력 폼 */}
          <FormCard>
            <h2 style={{ fontSize: "1.25rem", fontWeight: "bold", marginBottom: "1.5rem" }}>
              EC2 + RDS + ALB 커스텀 템플릿
            </h2>
            {/* VPC 설정 */}
            <Section>
              <SectionTitle>VPC 설정</SectionTitle>
              <Input
                placeholder="VPC CIDR"
                value={form.vpcCidr}
                onChange={(e) => handleChange("vpcCidr", e.target.value)}
                $w="100%"
              />
            </Section>
            {/* EC2 설정 */}
            <Section>
              <SectionTitle>EC2 AMI ID</SectionTitle>
              <Input
                placeholder="EC2 AMI ID"
                value={form.ec2Ami}
                onChange={(e) => handleChange("ec2Ami", e.target.value)}
                $w="100%"
              />
            </Section>
            {/* RDS 설정 */}
            <Section>
              <SectionTitle>RDS 엔진</SectionTitle>
              <Select
                value={form.rdsEngine}
                onChange={(e) => handleChange("rdsEngine", e.target.value)}
              >
                <option value="mysql">MySQL</option>
                <option value="postgres">PostgreSQL</option>
              </Select>
            </Section>
            <Section>
              <SectionTitle>RDS 사용자</SectionTitle>
              <Input
                placeholder="RDS 사용자"
                value={form.rdsUser}
                onChange={(e) => handleChange("rdsUser", e.target.value)}
                $w="100%"
              />
            </Section>
            <Section>
              <SectionTitle>RDS 비밀번호 (GitHub Secret에서 주입)</SectionTitle>
              <Input
                placeholder="DB_PASSWORD"
                value={form.rdsPassword}
                disabled
                $w="100%"
              />
            </Section>
          </FormCard>
          {/* 오른쪽: 코드 패널 */}
          <CodePanel>
            <CodeTabs>
              {codeTabs.map((tab) => (
                <CodeTabButton
                  key={tab.key}
                  $active={activeTab === tab.key}
                  onClick={() => setActiveTab(tab.key)}
                  type="button"
                >
                  {tab.label}
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
          <BottomButton $primary>배포하기</BottomButton>
        </BottomRow>
      </Main>
    </Container>
  );
}