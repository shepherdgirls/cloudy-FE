import "./dashboard.css";
import Link from "next/link";

export default function DashboardLayout(props) {
    return (
      <div className="layout">
        {/* 헤더 */}
        <header className="header">
            <Link href="/home">
                <span>Cloud-Cloudy</span>
            </Link>
        </header>

        {/* 사이드바 */}
        <div className="container">
            <nav className="sidebar">
                <div className="sidebar-top">
                    <ul className="menu">
                        <li><Link href="/dashboard/myproject">My Project</Link></li>
                        <li><Link href="/dashboard/createproject">Create Project</Link></li>
                        <li><Link href="/dashboard/security">Security</Link></li>
                    </ul>
                </div>
                <div className="sidebar-bottom">
                    <ul>
                        <li><a href="/dashboard/setting">Setting</a></li>
                    </ul>
                    <div className="profile">
                        <Link href="/dashboard/mypage">
                            <img></img>
                            <div>
                                <p>Junny Patron</p>
                                <p>junny@example.com</p>
                            </div>
                        </Link>
                    </div>
                </div>
            </nav>
        </div>
  
        {/* 메인 콘텐츠 */}
        <main className="content">{props.children}</main>
      </div>
    );
  }
  