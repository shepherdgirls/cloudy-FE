"use client";

import { useState } from "react";

export default function SecurityCheck() {
    const [code, setCode] = useState("");
    const [results, setResults] = useState([]);
    const [activeTab, setActiveTab] = useState("upload");

    const handleSubmit = async () => {
        const response = await fetch("http://localhost:8000/api/check_security/", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ terraform_code: code }),
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
                <span className="text-purple-600 cursor-pointer">Security</span> &gt; {activeTab === "upload" ? "Upload" : "Write Code"}
            </div>

            <div className="flex gap-6">
                {/* 좌측: 코드 입력 영역 (고정된 w-1/2) */}
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
                                분석
                            </button>
                        </>
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
