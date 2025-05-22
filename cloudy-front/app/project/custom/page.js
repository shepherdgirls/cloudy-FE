"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

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

  // 추후 API 연동 시 form 상태를 그대로 전송하면 됩니다.

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
        <p className="text-sm text-gray-500 mb-8">Projects &gt; Terraform Custom</p>

        {/* 상단 탭 */}
        <div className="flex space-x-4 mb-8">
          <button
            className="flex items-center px-4 py-2 rounded-t bg-white border-b-2 border-blue-600 font-bold"
            onClick={() => router.push("/project")}
          >
            환경설정 <span className="ml-2 bg-purple-100 text-purple-700 rounded-full px-2 text-xs">25</span>
          </button>
          <button
            className="flex items-center px-4 py-2 rounded-t bg-white border-b-2 border-blue-600 font-bold"
            onClick={() => router.push("/project/architecture")}
          >
            아키텍처 <span className="ml-2 bg-purple-100 text-purple-700 rounded-full px-2 text-xs">8</span>
          </button>
          <button
            className="flex items-center px-4 py-2 rounded-t bg-white border-b-2 border-blue-600 font-bold"
            disabled
          >
            테라폼 커스텀 <span className="ml-2 bg-purple-100 text-purple-700 rounded-full px-2 text-xs">12</span>
          </button>
        </div>

        <div className="flex gap-8">
          {/* 왼쪽: 입력 폼 */}
          <div className="flex-1 bg-white rounded-lg shadow p-8">
            <h2 className="text-xl font-bold mb-6">EC2 + RDS + ALB 커스텀 템플릿</h2>
            {/* VPC 설정 */}
            <div className="mb-6">
              <h3 className="font-bold mb-2">VPC 설정</h3>
              <div className="flex gap-2 mb-2">
                <input
                  className="border rounded px-3 py-2 w-1/2"
                  placeholder="VPC CIDR"
                  value={form.vpcCidr}
                  onChange={e => handleChange("vpcCidr", e.target.value)}
                />
                <input
                  className="border rounded px-3 py-2 w-1/2"
                  placeholder="서브넷 개수"
                  type="number"
                  value={form.vpcSubnetCount}
                  onChange={e => handleChange("vpcSubnetCount", e.target.value)}
                />
              </div>
            </div>
            {/* EC2 설정 */}
            <div className="mb-6">
              <h3 className="font-bold mb-2">EC2 설정</h3>
              <input
                className="border rounded px-3 py-2 w-full mb-2"
                placeholder="AMI (예: Ubuntu 20.04 LTS)"
                value={form.ec2Ami}
                onChange={e => handleChange("ec2Ami", e.target.value)}
              />
              <input
                className="border rounded px-3 py-2 w-full mb-2"
                placeholder="EC2 인스턴스 이름"
                value={form.ec2Name}
                onChange={e => handleChange("ec2Name", e.target.value)}
              />
              <input
                className="border rounded px-3 py-2 w-full mb-2"
                placeholder="인스턴스 개수"
                type="number"
                value={form.ec2Count}
                onChange={e => handleChange("ec2Count", e.target.value)}
              />
              <input
                className="border rounded px-3 py-2 w-full mb-2"
                placeholder="SSH 키 이름"
                value={form.ec2SshKey}
                onChange={e => handleChange("ec2SshKey", e.target.value)}
              />
              <div className="flex gap-4 mb-2">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={form.ec2Options.httpd}
                    onChange={e => handleNestedChange("ec2Options", "httpd", e.target.checked)}
                    className="mr-2"
                  />
                  Apache 설치
                </label>
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={form.ec2Options.docker}
                    onChange={e => handleNestedChange("ec2Options", "docker", e.target.checked)}
                    className="mr-2"
                  />
                  Docker 설치
                </label>
              </div>
            </div>
            {/* ALB 설정 */}
            <div className="mb-6">
              <h3 className="font-bold mb-2">로드밸런서(ALB) 설정</h3>
              <input
                className="border rounded px-3 py-2 w-full mb-2"
                placeholder="ALB 이름"
                value={form.albName}
                onChange={e => handleChange("albName", e.target.value)}
              />
              <input
                className="border rounded px-3 py-2 w-full mb-2"
                placeholder="Target Group"
                value={form.albTarget}
                onChange={e => handleChange("albTarget", e.target.value)}
              />
              <input
                className="border rounded px-3 py-2 w-full mb-2"
                placeholder="Health Check Path"
                value={form.albHealth}
                onChange={e => handleChange("albHealth", e.target.value)}
              />
              <input
                className="border rounded px-3 py-2 w-full mb-2"
                placeholder="Path"
                value={form.albPath}
                onChange={e => handleChange("albPath", e.target.value)}
              />
              <label className="flex items-center mb-2">
                <input
                  type="checkbox"
                  checked={form.albHttps}
                  onChange={e => handleChange("albHttps", e.target.checked)}
                  className="mr-2"
                />
                HTTPS 사용 (ACM 인증서 필요)
              </label>
            </div>
            {/* RDS 설정 */}
            <div className="mb-6">
              <h3 className="font-bold mb-2">RDS 설정</h3>
              <select
                className="border rounded px-3 py-2 w-full mb-2"
                value={form.rdsEngine}
                onChange={e => handleChange("rdsEngine", e.target.value)}
              >
                <option value="mysql">MySQL</option>
                <option value="postgres">PostgreSQL</option>
              </select>
              <input
                className="border rounded px-3 py-2 w-full mb-2"
                placeholder="DB 이름"
                value={form.rdsName}
                onChange={e => handleChange("rdsName", e.target.value)}
              />
              <input
                className="border rounded px-3 py-2 w-full mb-2"
                placeholder="DB 사용자"
                value={form.rdsUser}
                onChange={e => handleChange("rdsUser", e.target.value)}
              />
              <input
                className="border rounded px-3 py-2 w-full mb-2"
                placeholder="DB 비밀번호"
                type="password"
                value={form.rdsPassword}
                onChange={e => handleChange("rdsPassword", e.target.value)}
              />
              <input
                className="border rounded px-3 py-2 w-full mb-2"
                placeholder="스토리지(GB)"
                type="number"
                value={form.rdsStorage}
                onChange={e => handleChange("rdsStorage", e.target.value)}
              />
              <div className="flex gap-4 mb-2">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={form.rdsMultiAz}
                    onChange={e => handleChange("rdsMultiAz", e.target.checked)}
                    className="mr-2"
                  />
                  Multi-AZ
                </label>
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={form.rdsPublic}
                    onChange={e => handleChange("rdsPublic", e.target.checked)}
                    className="mr-2"
                  />
                  퍼블릭 액세스 허용
                </label>
              </div>
            </div>
            {/* 보안 설정 */}
            <div className="mb-6">
              <h3 className="font-bold mb-2">보안 설정</h3>
              <div className="flex gap-4">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={form.securityOptions.allowHttp}
                    onChange={e => handleNestedChange("securityOptions", "allowHttp", e.target.checked)}
                    className="mr-2"
                  />
                  HTTP 허용
                </label>
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={form.securityOptions.allowHttps}
                    onChange={e => handleNestedChange("securityOptions", "allowHttps", e.target.checked)}
                    className="mr-2"
                  />
                  HTTPS 허용
                </label>
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={form.securityOptions.allowSsh}
                    onChange={e => handleNestedChange("securityOptions", "allowSsh", e.target.checked)}
                    className="mr-2"
                  />
                  SSH 허용
                </label>
              </div>
            </div>
          </div>
          {/* 오른쪽: 코드 패널 */}
          <div className="w-[500px]">
            <div className="bg-gray-900 rounded-t-lg flex">
              {codeTabs.map((tab) => (
                <button
                  key={tab.key}
                  className={`px-4 py-2 text-sm font-mono ${
                    activeTab === tab.key
                      ? "bg-gray-800 text-blue-400"
                      : "text-gray-400"
                  } rounded-t-lg`}
                  onClick={() => setActiveTab(tab.key)}
                  type="button"
                >
                  {tab.label}
                </button>
              ))}
            </div>
            <div className="bg-gray-900 rounded-b-lg p-4 h-[500px] overflow-auto">
              <pre className="text-green-200 text-xs font-mono whitespace-pre-wrap">
                {codePreview[activeTab]}
              </pre>
            </div>
          </div>
        </div>
        {/* 하단 이동 버튼 */}
        <div className="flex justify-between mt-8">
          <button
            className="px-8 py-3 rounded bg-white border font-bold"
            onClick={() => router.push("/project/architecture")}
          >
            이전
          </button>
          <button
            className="px-8 py-3 rounded bg-blue-600 text-white font-bold hover:bg-blue-700"
            // onClick={() => ...API 연동 및 다음 단계 이동}
          >
            배포하기
          </button>
        </div>
      </main>
    </div>
  );
}