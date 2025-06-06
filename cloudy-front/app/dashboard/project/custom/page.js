"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import styled from "styled-components";

// styled-components 사용
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
  background: ${({ active }) => (active ? "#fff" : "#fff")};
  border-bottom: 2px solid ${({ active }) => (active ? "#2563eb" : "#fff")};
  font-weight: bold;
  color: ${({ active }) => (active ? "#2563eb" : "#6b7280")};
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
  gap: ${({ gap }) => gap || "0"};
  margin-bottom: ${({ mb }) => mb || "0"};
`;

const Input = styled.input`
  border: 1px solid #d1d5db;
  border-radius: 0.375rem;
  padding: 0.5rem 0.75rem;
  width: ${({ w }) => w || "100%"};
  margin-bottom: ${({ mb }) => mb || "0"};
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
  font-weight: ${({ bold }) => (bold ? "bold" : "normal")};
  margin-bottom: ${({ mb }) => mb || "0"};
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
  background: ${({ active }) => (active ? "#1f2937" : "transparent")};
  color: ${({ active }) => (active ? "#60a5fa" : "#9ca3af")};
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
  border: ${({ primary }) => (primary ? "none" : "1px solid #d1d5db")};
  background: ${({ primary }) => (primary ? "#2563eb" : "#fff")};
  color: ${({ primary }) => (primary ? "#fff" : "#111827")};
  &:hover {
    background: ${({ primary }) => (primary ? "#1d4ed8" : "#f3f4f6")};
  }
`;

const codeTabs = [
  { key: "main.tf", label: "main.tf" },
  { key: "vpc.tf", label: "vpc.tf" },
  { key: "ec2.tf", label: "ec2.tf" },
  { key: "alb.tf", label: "alb.tf" },
  { key: "rds.tf", label: "rds.tf" },
];

const initialForm = {
  vpcCidr: "10.0.0.0/16",
  vpcSubnetCount: 3,
  ec2Ami: "Ubuntu 20.04 LTS",
  ec2Name: "",
  ec2Count: 2,
  ec2SshKey: "",
  ec2Options: {
    httpd: false,
    docker: false,
  },
  albName: "",
  albTarget: "",
  albHealth: "",
  albPath: "",
  albHttps: false,
  rdsEngine: "mysql",
  rdsName: "",
  rdsUser: "",
  rdsPassword: "",
  rdsStorage: 20,
  rdsMultiAz: false,
  rdsPublic: false,
  securityOptions: {
    allowHttp: true,
    allowHttps: false,
    allowSsh: false,
  },
};

export default function TerraformCustomPage() {
  const router = useRouter();
  const [form, setForm] = useState(initialForm);
  const [activeTab, setActiveTab] = useState("main.tf");

  // 코드 미리보기 예시 (실제론 API로 받아올 예정)
  const codePreview = {
    "main.tf": `terraform {
  required_version = ">= 1.0.0"
}
provider "aws" {
  region = "ap-northeast-2"
}
# ...`,
    "vpc.tf": `resource "aws_vpc" "main" {
  cidr_block = "${form.vpcCidr}"
  # ...
}`,
    "ec2.tf": `resource "aws_instance" "web" {
  ami           = "${form.ec2Ami}"
  count         = ${form.ec2Count}
  # ...
}`,
    "alb.tf": `resource "aws_lb" "main" {
  name = "${form.albName}"
  # ...
}`,
    "rds.tf": `resource "aws_db_instance" "main" {
  engine         = "${form.rdsEngine}"
  allocated_storage = ${form.rdsStorage}
  # ...
}`,
  };

  // 입력값 변경 핸들러
  const handleChange = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };
  const handleNestedChange = (group, field, value) => {
    setForm((prev) => ({
      ...prev,
      [group]: { ...prev[group], [field]: value },
    }));
  };

  return (
    <Container>
      <Main>
        <Title>프로젝트</Title>
        <SubTitle>Projects &gt; Terraform Custom</SubTitle>

        <TabRow>
          <TabButton onClick={() => router.push("/dashboard/project")} active>
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
          <TabButton onClick={() => router.push("/dashboard/project/architecture")} active>
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
          <TabButton disabled>
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

        <Flex gap="2rem">
          {/* 왼쪽: 입력 폼 */}
          <FormCard>
            <h2 style={{ fontSize: "1.25rem", fontWeight: "bold", marginBottom: "1.5rem" }}>
              EC2 + RDS + ALB 커스텀 템플릿
            </h2>
            {/* VPC 설정 */}
            <Section>
              <SectionTitle>VPC 설정</SectionTitle>
              <Flex gap="0.5rem" mb="0.5rem">
                <Input
                  placeholder="VPC CIDR"
                  value={form.vpcCidr}
                  onChange={(e) => handleChange("vpcCidr", e.target.value)}
                  w="50%"
                />
                <Input
                  placeholder="서브넷 개수"
                  type="number"
                  value={form.vpcSubnetCount}
                  onChange={(e) => handleChange("vpcSubnetCount", e.target.value)}
                  w="50%"
                />
              </Flex>
            </Section>
            {/* EC2 설정 */}
            <Section>
              <SectionTitle>EC2 설정</SectionTitle>
              <Input
                placeholder="AMI (예: Ubuntu 20.04 LTS)"
                value={form.ec2Ami}
                onChange={(e) => handleChange("ec2Ami", e.target.value)}
                mb="0.5rem"
              />
              <Input
                placeholder="EC2 인스턴스 이름"
                value={form.ec2Name}
                onChange={(e) => handleChange("ec2Name", e.target.value)}
                mb="0.5rem"
              />
              <Input
                placeholder="인스턴스 개수"
                type="number"
                value={form.ec2Count}
                onChange={(e) => handleChange("ec2Count", e.target.value)}
                mb="0.5rem"
              />
              <Input
                placeholder="SSH 키 이름"
                value={form.ec2SshKey}
                onChange={(e) => handleChange("ec2SshKey", e.target.value)}
                mb="0.5rem"
              />
              <Flex gap="1rem" mb="0.5rem">
                <Label>
                  <Checkbox
                    checked={form.ec2Options.httpd}
                    onChange={(e) => handleNestedChange("ec2Options", "httpd", e.target.checked)}
                  />
                  Apache 설치
                </Label>
                <Label>
                  <Checkbox
                    checked={form.ec2Options.docker}
                    onChange={(e) => handleNestedChange("ec2Options", "docker", e.target.checked)}
                  />
                  Docker 설치
                </Label>
              </Flex>
            </Section>
            {/* ALB 설정 */}
            <Section>
              <SectionTitle>로드밸런서(ALB) 설정</SectionTitle>
              <Input
                placeholder="ALB 이름"
                value={form.albName}
                onChange={(e) => handleChange("albName", e.target.value)}
                mb="0.5rem"
              />
              <Input
                placeholder="Target Group"
                value={form.albTarget}
                onChange={(e) => handleChange("albTarget", e.target.value)}
                mb="0.5rem"
              />
              <Input
                placeholder="Health Check Path"
                value={form.albHealth}
                onChange={(e) => handleChange("albHealth", e.target.value)}
                mb="0.5rem"
              />
              <Input
                placeholder="Path"
                value={form.albPath}
                onChange={(e) => handleChange("albPath", e.target.value)}
                mb="0.5rem"
              />
              <Label mb="0.5rem">
                <Checkbox
                  checked={form.albHttps}
                  onChange={(e) => handleChange("albHttps", e.target.checked)}
                />
                HTTPS 사용 (ACM 인증서 필요)
              </Label>
            </Section>
            {/* RDS 설정 */}
            <Section>
              <SectionTitle>RDS 설정</SectionTitle>
              <Select
                value={form.rdsEngine}
                onChange={(e) => handleChange("rdsEngine", e.target.value)}
              >
                <option value="mysql">MySQL</option>
                <option value="postgres">PostgreSQL</option>
              </Select>
              <Input
                placeholder="DB 이름"
                value={form.rdsName}
                onChange={(e) => handleChange("rdsName", e.target.value)}
                mb="0.5rem"
              />
              <Input
                placeholder="DB 사용자"
                value={form.rdsUser}
                onChange={(e) => handleChange("rdsUser", e.target.value)}
                mb="0.5rem"
              />
              <Input
                placeholder="DB 비밀번호"
                type="password"
                value={form.rdsPassword}
                onChange={(e) => handleChange("rdsPassword", e.target.value)}
                mb="0.5rem"
              />
              <Input
                placeholder="스토리지(GB)"
                type="number"
                value={form.rdsStorage}
                onChange={(e) => handleChange("rdsStorage", e.target.value)}
                mb="0.5rem"
              />
              <Flex gap="1rem" mb="0.5rem">
                <Label>
                  <Checkbox
                    checked={form.rdsMultiAz}
                    onChange={(e) => handleChange("rdsMultiAz", e.target.checked)}
                  />
                  Multi-AZ
                </Label>
                <Label>
                  <Checkbox
                    checked={form.rdsPublic}
                    onChange={(e) => handleChange("rdsPublic", e.target.checked)}
                  />
                  퍼블릭 액세스 허용
                </Label>
              </Flex>
            </Section>
            {/* 보안 설정 */}
            <Section>
              <SectionTitle>보안 설정</SectionTitle>
              <Flex gap="1rem">
                <Label>
                  <Checkbox
                    checked={form.securityOptions.allowHttp}
                    onChange={(e) => handleNestedChange("securityOptions", "allowHttp", e.target.checked)}
                  />
                  HTTP 허용
                </Label>
                <Label>
                  <Checkbox
                    checked={form.securityOptions.allowHttps}
                    onChange={(e) => handleNestedChange("securityOptions", "allowHttps", e.target.checked)}
                  />
                  HTTPS 허용
                </Label>
                <Label>
                  <Checkbox
                    checked={form.securityOptions.allowSsh}
                    onChange={(e) => handleNestedChange("securityOptions", "allowSsh", e.target.checked)}
                  />
                  SSH 허용
                </Label>
              </Flex>
            </Section>
          </FormCard>
          {/* 오른쪽: 코드 패널 */}
          <CodePanel>
            <CodeTabs>
              {codeTabs.map((tab) => (
                <CodeTabButton
                  key={tab.key}
                  active={activeTab === tab.key}
                  onClick={() => setActiveTab(tab.key)}
                  type="button"
                >
                  {tab.label}
                </CodeTabButton>
              ))}
            </CodeTabs>
            <CodeBox>
              <CodePre>{codePreview[activeTab]}</CodePre>
            </CodeBox>
          </CodePanel>
        </Flex>
        {/* 하단 이동 버튼 */}
        <BottomRow>
          <BottomButton onClick={() => router.push("/dashboard/project/architecture")}>
            이전
          </BottomButton>
          <BottomButton primary>배포하기</BottomButton>
        </BottomRow>
      </Main>
    </Container>
  );
}