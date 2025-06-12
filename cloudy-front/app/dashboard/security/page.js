"use client";

import { useState, useEffect } from "react";

export default function SecurityCheck() {
    const [code, setCode] = useState("");
    const [results, setResults] = useState([]);
    const [activeTab, setActiveTab] = useState("project");
    const [projects, setProjects] = useState([]);

    // ✅ 더미 프로젝트 리스트
    const dummyProjects = [
        { name: "EC2+RDS 프로젝트", description: "기본 EC2 + RDS 구성 예제", createdAt: "2025.06.01" },
        { name: "S3 버킷 공개 설정", description: "S3 보안 테스트용 구성", createdAt: "2025.06.02" },
        { name: "Security Group 실험", description: "보안 그룹 허용 테스트", createdAt: "2025.06.03" },
    ];

    // ✅ 프로젝트 이름 ↔ 코드 매핑
    const projectCodeMap = {
        "EC2+RDS 프로젝트": `
resource "aws_instance" "web" {
  ami           = "ami-123456"
  instance_type = "t2.micro"
}

resource "aws_db_instance" "default" {
  allocated_storage    = 20
  engine               = "mysql"
  instance_class       = "db.t2.micro"
  name                 = "mydb"
  username             = "foo"
  password             = "bar"
  parameter_group_name = "default.mysql5.7"
}
        `,
        "S3 버킷 공개 설정": `
resource "aws_s3_bucket" "b" {
  bucket = "my-bucket"
  acl    = "public-read"
}
        `,
        "Security Group 실험": `
resource "aws_security_group" "sg" {
  name        = "allow_all"
  description = "Allow all inbound traffic"
  ingress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }
}
        `,
    };

    useEffect(() => {
        if (activeTab === "project") {
            // ✅ 더미 데이터 세팅
            setProjects(dummyProjects);
        }
    }, [activeTab]);

    // useEffect(() => {
    //     if (activeTab === "project") {
    //         fetch("http://localhost:8000/api/my_projects/")
    //             .then(res => res.json())
    //             .then(data => {
    //                 const content = data.file?.content || "";
    //                 setCode(content);       // 바로 코드 세팅
    //                 handleSubmit(content);  // 점검 실행
    //             })
    //             .catch(err => console.error("프로젝트 불러오기 실패:", err));
    //     }
    // }, [activeTab]);

    const handleProjectSelect = async (/*repo*/) => {
        try {
            const accessToken = localStorage.getItem("access"); // 🔐 저장된 JWT 가져오기

            /*const response = await fetch(
                `http://15.164.170.14:8000/github/repo-files/?repo_name=${repo}&branch=main&path=main.tf`,
                {
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                    },
                }
            );*/

            const response = await fetch(
                `http://15.164.170.14:8000/github/repo-files/?repo_name=cloud_TF&branch=main&path=main.tf`,
                {
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                    },
                }
            );

            const data = await response.json();
            const content = data.file?.content || ""; // content만 추출

            setCode(content); // 코드 상태 저장
            handleSubmit(content); // 여기 인자로 넘기면 분석 즉시 실행
        } catch (err) {
            console.error("main.tf 코드 불러오기 실패:", err);
        }
    };


    const handleSubmit = async (customCode = null) => {
        const codeToAnalyze =
            typeof customCode === "string" && customCode.trim() !== ""
                ? customCode
                : code;

        const response = await fetch("http://15.164.170.14:8000/check_security/", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ terraform_code: codeToAnalyze }),
        });

        const data = await response.json();
        try {
            const parsed = JSON.parse(data.stdout);
            setResults(parsed.results || []);
        } catch (err) {
            console.error("결과 파싱 오류:", err);
        }
    };



    const severityColor = (severity) => {
        switch (severity) {
            case "CRITICAL":
                return "bg-red-500 text-white";
            case "HIGH":
                return "bg-orange-400 text-white";
            case "LOW":
                return "bg-yellow-300 text-black";
            default:
                return "bg-gray-200";
        }
    };

    return (
        <div className="p-8">
            <h1 className="text-2xl font-bold mb-1">Terraform 보안 분석</h1>
            <div className="text-sm text-gray-500 mb-4">
                <span className="text-purple-600 cursor-pointer">Security</span> &gt; {activeTab === "project" ? "My Project" : "Write Code"}
            </div>

            <div className="flex gap-6">
                {/* 좌측: 코드 입력 영역 (고정된 w-1/2) */}
                <div className="w-1/2 flex flex-col">
                    <div className="flex items-center justify-between mb-2">
                        <h2 className="text-xl font-semibold">Terraform Code</h2>
                        <div className="flex space-x-2">
                            <button
                                onClick={() => setActiveTab("project")}
                                className={`px-3 py-1 rounded ${activeTab === "project" ? "bg-blue-600 text-white" : "bg-gray-200"}`}
                            >
                                My Project
                            </button>
                            <button
                                onClick={() => setActiveTab("write")}
                                className={`px-3 py-1 rounded ${activeTab === "write" ? "bg-blue-600 text-white" : "bg-gray-200"}`}
                            >
                                Write
                            </button>
                        </div>
                    </div>

                    {/* 코드 입력 or 업로드 선택 */}
                    {activeTab === "write" && (
                        <>
                            <textarea
                                className="w-full border p-2 h-96"
                                placeholder="Terraform 코드를 입력하세요"
                                value={code}
                                onChange={(e) => setCode(e.target.value)}
                            ></textarea>
                            <button
                                className="mt-4 px-4 py-2 bg-blue-600 text-white rounded self-start"
                                onClick={handleSubmit}
                            >
                                분석
                            </button>
                        </>
                    )}

                    {/* My Projects */}
                    {/*{activeTab === "project" && (
                        <div className="space-y-2">
                            {projects.length === 0 ? (
                                <p className="text-gray-500">프로젝트를 불러오는 중이거나 없습니다.</p>
                            ) : (
                                projects.map((project, idx) => (
                                    <div
                                        key={idx}
                                        className="p-3 border rounded hover:bg-gray-50 cursor-pointer"
                                        onClick={() => handleProjectSelect(project.name)}
                                    >
                                        <div className="font-semibold">{project.name}</div>
                                        <div className="text-sm text-gray-500">{project.description}</div>
                                        <div className="text-xs text-gray-400">{project.createdAt}</div>
                                    </div>
                                ))
                            )}
                        </div>
                    )}*/}
                    {activeTab === "project" && (
                        <div className="space-y-2">
                            <button
                                className="mb-3 px-4 py-2 bg-green-600 text-white rounded"
                                onClick={handleProjectSelect}
                            >
                                내 GitHub의 main.tf 분석
                            </button>

                            {projects.length === 0 ? (
                                <p className="text-gray-500">프로젝트를 불러오는 중이거나 없습니다.</p>
                            ) : (
                                projects.map((project, idx) => (
                                    <div
                                        key={idx}
                                        className="p-3 border rounded hover:bg-gray-50 cursor-pointer"
                                        onClick={() => setCode(projectCodeMap[project.name])}
                                    >
                                        <div className="font-semibold">{project.name}</div>
                                        <div className="text-sm text-gray-500">{project.description}</div>
                                        <div className="text-xs text-gray-400">{project.createdAt}</div>
                                    </div>
                                ))
                            )}
                        </div>
                    )}

                </div>

                {/* 우측: 결과 */}
                <div className="w-1/2">
                    {results.length > 0 && (
                        <div>
                            <h2 className="text-xl font-semibold mb-2">TFSec 분석 결과</h2>
                            <table className="table-auto border w-full">
                                <thead>
                                    <tr className="bg-gray-100">
                                        <th className="border px-2 py-1">Rule ID</th>
                                        <th className="border px-2 py-1">Severity</th>
                                        <th className="border px-2 py-1">Description</th>
                                        <th className="border px-2 py-1">Resource</th>
                                        <th className="border px-2 py-1">Line</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {results.map((item, idx) => (
                                        <tr key={idx}>
                                            <td className="border px-2 py-1">{item.rule_id}</td>
                                            <td className={`border px-2 py-1 ${severityColor(item.severity)}`}>
                                                {item.severity}
                                            </td>
                                            <td className="border px-2 py-1">{item.description}</td>
                                            <td className="border px-2 py-1">{item.resource}</td>
                                            <td className="border px-2 py-1">
                                                {item.location?.start_line} ~ {item.location?.end_line}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
