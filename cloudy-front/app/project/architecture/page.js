"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

const architectures = [
	{
		key: "ec2-rds-alb",
		title: "EC2 + RDS + ALB",
		img: "/arch-ec2.png", // 실제 이미지 경로로 교체
		desc: (
			<>
				<span className="italic font-semibold">EC2 + RDS + ALB</span>
				<br />
				웹 서버와 데이터베이스를 갖춘
				<br />
				고가용성 웹 애플리케이션
				<br />
				<br />
				<span className="text-gray-500 text-sm">
					사용 사례: 다양한 웹 애플리케이션, 백엔드 API 서버
				</span>
			</>
		),
	},
	{
		key: "ec2-lambda",
		title: "EC2 + Lambda",
		img: "/arch-lambda.png",
		desc: (
			<>
				<span className="italic font-semibold">EC2 + Lambda</span>
				<br />
				서버리스 기능을 갖춘
				<br />
				하이브리드 아키텍처
				<br />
				<br />
				<span className="text-gray-500 text-sm">
					사용 사례: 이벤트 기반 처리, 비동기 작업 처리
				</span>
			</>
		),
	},
	{
		key: "s3-cloudfront",
		title: "S3 + CloudFront",
		img: "/arch-s3.png",
		desc: (
			<>
				<span className="italic font-semibold">S3 + CloudFront</span>
				<br />
				정적 웹사이트 호스팅을 위한
				<br />
				서버리스 아키텍처
				<br />
				<br />
				<span className="text-gray-500 text-sm">
					사용 사례: 정적 웹사이트, SPA 애플리케이션
				</span>
			</>
		),
	},
];

export default function ArchitectureSelectPage() {
	const [selected, setSelected] = useState("ec2-rds-alb");
	const router = useRouter();

	return (
		<div className="flex min-h-screen bg-gray-50">
			{/* 사이드바 (재사용) */}
			<aside className="w-60 bg-white border-r p-6 flex flex-col justify-between">
				<div>
					<h2 className="text-xl font-bold mb-8">Cloud-Cloudy</h2>
					<nav>
						<ul className="space-y-4">
							<li>
								<a href="#" className="font-semibold">
									Home
								</a>
							</li>
							<li>
								<a href="#">My Projects</a>
							</li>
							<li>
								<a href="#">Create projects</a>
							</li>
							<li>
								<a href="#">Security</a>
							</li>
						</ul>
					</nav>
				</div>
				<div className="flex items-center space-x-2 mt-8">
					<img
						src="/avatar.png"
						alt="avatar"
						className="w-8 h-8 rounded-full"
					/>
					<div>
						<p className="font-bold text-sm">Jenny Patron</p>
						<p className="text-xs text-gray-500">jenny@gmail.com</p>
					</div>
				</div>
			</aside>

			{/* 메인 */}
			<main className="flex-1 p-12">
				<h1 className="text-3xl font-bold mb-2">프로젝트</h1>
				<p className="text-sm text-gray-500 mb-8">
					Projects &gt; Architecture
				</p>

				{/* 상단 탭 */}
				<div className="flex space-x-4 mb-8">
					<button
						className="flex items-center px-4 py-2 rounded-t bg-white border-b-2 border-blue-600 font-bold"
						onClick={() => router.push("/project")}
					>
						환경설정{" "}
						<span className="ml-2 bg-purple-100 text-purple-700 rounded-full px-2 text-xs">
							25
						</span>
					</button>
					<button
						className="flex items-center px-4 py-2 rounded-t bg-white border-b-2 border-blue-600 font-bold"
						onClick={() => router.push("/project/architecture")}
					>
						아키텍처{" "}
						<span className="ml-2 bg-purple-100 text-purple-700 rounded-full px-2 text-xs">
							8
						</span>
					</button>
					<button
						className="flex items-center px-4 py-2 rounded-t bg-gray-100 text-gray-400 cursor-not-allowed"
						disabled
					>
						테라폼 커스텀{" "}
						<span className="ml-2 bg-purple-100 text-purple-700 rounded-full px-2 text-xs">
							12
						</span>
					</button>
				</div>

				<h2 className="text-2xl font-bold mb-2">아키텍처</h2>
				<p className="text-gray-500 mb-8">
					프로젝트에 적합한 아키텍처 템플릿을 선택합니다.
				</p>

				<div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
					{architectures.map((arch) => (
						<button
							key={arch.key}
							onClick={() => setSelected(arch.key)}
							className={`bg-white rounded-lg shadow p-6 text-left border-2 transition-all
                ${
					selected === arch.key
						? "border-blue-600 ring-2 ring-blue-200"
						: "border-transparent"
				}
                hover:border-blue-400`}
							type="button"
						>
							{/* 이미지 영역 */}
							{arch.img ? (
								<img
									src={arch.img}
									alt={arch.title}
									className="w-full h-40 object-contain mb-4"
								/>
							) : (
								<div className="h-40 bg-gray-200 rounded mb-4"></div>
							)}
							<div className="text-lg mb-2">{arch.desc}</div>
						</button>
					))}
				</div>

				<div className="flex justify-between">
                    <button
                        className="px-8 py-3 rounded bg-white border font-bold"
                        onClick={() => router.push("/project")}
                    >
                        이전
                    </button>
                    <button className="px-8 py-3 rounded bg-blue-600 text-white font-bold hover:bg-blue-700">
                        다음 단계
                    </button>
                </div>
			</main>
		</div>
	);
}