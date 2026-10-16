---
title: "글 작성 가이드"
description: "이 블로그에 새 글을 올리는 방법 — 파일 위치, frontmatter 필드, 마크다운 문법 예시를 한 번에 정리했다."
pubDatetime: 2026-10-16T12:30:00+09:00
draft: false
tags:
  - guide
  - blog
---

이 블로그에 글을 올리는 방법을 정리해 둔다. 이 글 자체가 마크다운 문법의 예시이기도 하다.

## 1. 글 파일 만들기

`src/content/posts/` 폴더에 `.md` 파일을 하나 만들면 그것이 글 하나가 된다. 파일명이 URL이 된다.

- `src/content/posts/my-new-post.md` → `https://minseobkimmd.github.io/posts/my-new-post/`
- 파일명은 영어 소문자와 하이픈(-)으로 짓는 것을 권한다.

올리는 방법은 세 가지다. 편한 것을 쓰면 된다.

0. **브라우저에서 (Pages CMS)** — [app.pagescms.org](https://app.pagescms.org)에 GitHub 계정으로 로그인 → 이 저장소 선택 → `글 → 새 글`에서 제목·요약·본문을 쓰고 저장. Git 지식이 전혀 필요 없고, 사진도 드래그로 첨부된다. 태그는 미리 정의된 목록(정신의학, 투자, 기술·AI, 연구, 에세이, 가이드)에서 고른다. 새 글의 파일명은 영어 소문자-하이픈으로 입력한다(예: `my-new-post`).
1. **GitHub 웹사이트에서**: 저장소에서 `Add file → Create new file`, 경로에 `src/content/posts/파일명.md` 입력, 내용 작성 후 Commit. 끝나면 자동 배포된다.
2. **VS Code + Git으로**: 로컬에서 파일을 만들고 `git add`, `git commit`, `git push`.

## 2. frontmatter (머리말)

파일 맨 위에 아래처럼 글의 정보를 적는다.

```yaml
---
title: "글 제목"
description: "검색 결과와 소셜 미리보기에 보이는 요약. 한두 문장."
pubDatetime: 2026-10-16T21:00:00+09:00
modDatetime: 2026-10-17T09:00:00+09:00 # (선택) 수정 시에만
featured: false                        # (선택) 홈 '추천 글'에 표시
draft: true                            # (선택) true면 발행되지 않음
tags:
  - psychiatry
  - research
---
```

| 필드 | 필수 | 설명 |
| --- | --- | --- |
| `title` | O | 글 제목 |
| `description` | O | 요약 (SEO·미리보기용) |
| `pubDatetime` | O | 게시 시각. 미래 시각을 넣으면 **예약 발행** |
| `tags` | X | 태그 목록. URL이 되므로 영어 소문자 권장 |
| `draft` | X | `true`면 빌드에서 제외 |
| `featured` | X | 홈 상단 '추천 글' 표시 |

## 3. 마크다운 문법 예시

### 소제목과 목차

`##`, `###`으로 소제목을 만든다. (관리상 목차는 짧은 글에서는 생략한다.)

### 강조와 인용

*이탤릭*, **굵게**, `코드 한 조각`, [링크](https://astro.build/).

> 인용문은 이렇게.

> [!NOTE]
> GitHub 스타일 콜아웃도 지원된다. `> [!NOTE]`, `> [!TIP]`, `> [!WARNING]` 등.

### 목록과 표

1. 첫 번째
2. 두 번째
   - 하위 항목

| 항목 | 값 |
| --- | --- |
| 예시 | 1 |

### 코드 블록

```python
def hello(name: str) -> str:
    return f"안녕하세요, {name}님"
```

> [!TIP]
> 수식(LaTeX)은 KaTeX를 추가하면 쓸 수 있다. 필요해지면 그때 붙인다.

## 4. 발행 흐름

```text
.md 파일 작성 → git push (또는 GitHub 웹에서 Commit)
→ GitHub Actions 자동 빌드 (1~2분)
→ https://minseobkimmd.github.io 반영
```

배포 상태는 저장소의 **Actions** 탭에서 확인할 수 있다. 실패하면 보통 frontmatter 오타(필수 필드 누락, 날짜 형식 오류)다.
