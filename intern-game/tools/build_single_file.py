"""
index.html + css + js + 이미지 + 음악을 HTML 파일 하나로 합칩니다.
메일이나 메신저로 게임을 보낼 때 이 결과물(dist/인턴_내가무역좀하면안되냐.html)을 쓰세요.

사용법 (프로젝트 폴더에서):
    python tools/build_single_file.py

파이썬 3.8 이상, 추가 설치 없음.
"""
import base64
import mimetypes
import re
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
OUT_DIR = ROOT / "dist"
OUT_FILE = OUT_DIR / "인턴_내가무역좀하면안되냐.html"


def data_uri(rel_path: str) -> str:
    path = ROOT / rel_path
    mime = mimetypes.guess_type(path.name)[0] or "application/octet-stream"
    return f"data:{mime};base64,{base64.b64encode(path.read_bytes()).decode()}"


def inline_assets(text: str) -> str:
    """'assets/...' 경로를 전부 data URI 로 바꿈 (HTML 속성과 JS 문자열 모두)."""
    return re.sub(r"assets/[\w\-./]+\.(?:jpg|jpeg|png|webp|mp3|ogg|wav)",
                  lambda m: data_uri(m.group(0)), text)


def main() -> None:
    html = (ROOT / "index.html").read_text(encoding="utf-8")

    # CSS 인라인
    def css_tag(m):
        css = (ROOT / m.group(1)).read_text(encoding="utf-8")
        return "<style>\n" + inline_assets(css) + "\n</style>"
    html = re.sub(r'<link rel="stylesheet" href="(css/[^"]+)">', css_tag, html)

    # JS 인라인 (순서 유지)
    def js_tag(m):
        js = (ROOT / m.group(1)).read_text(encoding="utf-8")
        return "<script>\n/* " + m.group(1) + " */\n" + inline_assets(js) + "\n</script>"
    html = re.sub(r'<script src="(js/[^"]+)"></script>', js_tag, html)

    html = inline_assets(html)

    OUT_DIR.mkdir(exist_ok=True)
    OUT_FILE.write_text(html, encoding="utf-8")
    print(f"완료: {OUT_FILE.relative_to(ROOT)}  ({OUT_FILE.stat().st_size / 1_048_576:.1f} MB)")


if __name__ == "__main__":
    main()
