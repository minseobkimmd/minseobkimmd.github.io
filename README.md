# minseobkimmd.github.io

개인 블로그 — [https://minseobkimmd.github.io](https://minseobkimmd.github.io)

Astro + [AstroPaper](https://github.com/satnaing/astro-paper) 테마, GitHub Pages 자동 배포.

## 브라우저에서 글쓰기 (Pages CMS)

[app.pagescms.org](https://app.pagescms.org) → GitHub 로그인 → 이 저장소 선택.
편집 양식은 저장소 루트의 `.pages.yml`이 정의한다 (글 목록, 소개 페이지, 이미지 업로드).

## 글 쓰는 법

1. `src/content/posts/` 폴더에 `파일명.md`를 만든다 (파일명 = URL).
2. 맨 위에 frontmatter를 쓴다:

   ```yaml
   ---
   title: "글 제목"
   description: "한두 문장 요약"
   pubDatetime: 2026-10-16T21:00:00+09:00
   tags:
     - topic
   draft: false
   ---
   ```

3. 커밋하고 `main`에 push하면 GitHub Actions가 자동으로 배포한다.
4. 배포 상태: 저장소 **Actions** 탭.

자세한 문법과 예시: [글 작성 가이드](https://minseobkimmd.github.io/posts/how-to-write-posts/)

## 로컬에서 미리보기

```bash
pnpm install
pnpm dev      # http://localhost:4321
```

## 주요 설정

- 사이트 정보(제목, 설명, 언어, 타임존): `astro-paper.config.ts`
- 폰트, 마크다운 플러그인: `astro.config.ts`
- 사이트맵 메뉴 문구(한국어): `src/i18n/lang/ko.ts`
- 소개 페이지: `src/content/pages/about.md`

## 배포 구조

```text
main push → GitHub Actions (.github/workflows/deploy.yml)
         → astro build → GitHub Pages 발행
```
