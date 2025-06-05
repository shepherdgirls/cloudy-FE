"use client";

import { useState } from "react";

export default function SecurityCheck() {
    const [code, setCode] = useState("");
    const [fixedCode, setFixedCode] = useState(""); // 🔹 자동 수정 코드
    const [activeTab, setActiveTab] = useState("upload");

    const handleSubmit = async () => {
        const response = await fetch("http://localhost:8000/api/snyk_fix/", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ terraform_code: code }),
        });

        const data = await response.json();
        console.log("Snyk 결과:", data);

        const lines = code.split("\n");

        data.results?.forEach((item) => {
            const fix = item.fix?.suggested_fix?.edit;
            if (fix?.content && typeof fix.line === "number") {
                lines[fix.line - 1] = fix.content; // 해당 라인에 수정 적용
            }
        });

        const newCode = lines.join("\n");
        setFixedCode(newCode); // 🔹 결과 우측에 표시
    };

    return (
        <div className="p-8">
            <h1 className="text-2xl font-bold mb-1">Terraform 보안 분석</h1>
            <div className="text-sm text-gray-500 mb-4">
                <span className="text-purple-600 cursor-pointer">Security</span> &gt; {activeTab === "upload" ? "Upload" : "Write Code"}
            </div>

            <div className="flex gap-6">
                {/* 좌측: 입력 */}
                <div className="w-1/2 flex flex-col">
                    <div className="flex items-center justify-between mb-2">
                        <h2 className="text-xl font-semibold">Terraform Code</h2>
                        <div className="flex space-x-2">
                            <button
                                onClick={() => setActiveTab("upload")}
                                className={`px-3 py-1 rounded ${activeTab === "upload" ? "bg-blue-600 text-white" : "bg-gray-200"}`}
                            >
                                Upload
                            </button>
                            <button
                                onClick={() => setActiveTab("write")}
                                className={`px-3 py-1 rounded ${activeTab === "write" ? "bg-blue-600 text-white" : "bg-gray-200"}`}
                            >
                                Write
                            </button>
                        </div>
                    </div>

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
                                자동 수정
                            </button>
                        </>
                    )}

                    {activeTab === "upload" && (
                        <>
                            <input
                                type="file"
                                accept=".tf"
                                className="mb-4"
                                onChange={(e) => {
                                    const file = e.target.files[0];
                                    if (file) {
                                        const reader = new FileReader();
                                        reader.onload = (event) => setCode(event.target.result);
                                        reader.readAsText(file);
                                    }
                                }}
                            />
                            <button
                                className="px-4 py-2 bg-blue-600 text-white rounded self-start"
                                onClick={handleSubmit}
                            >
                                자동 수정
                            </button>
                        </>
                    )}
                </div>

                {/* 우측: 수정된 코드 */}
                <div className="w-1/2">
                    {fixedCode && (
                        <>
                            <h2 className="text-xl font-semibold mb-2">🔧 수정된 코드</h2>
                            <textarea
                                className="w-full border p-2 h-96 bg-gray-50"
                                value={fixedCode}
                                readOnly
                            ></textarea>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
}
