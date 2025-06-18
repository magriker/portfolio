# Portfolio page for Sophie

## 概要

- このポートフォリオは日本で就活をする予定の Sophie さんから依頼を受け、自分のスキルを使用し作った就活用ポートフォリオの Web アプリです。
- フロント部分は React と TypeScript で作成し、データベースは Supabase を利用しております。
- 本アプリはポートフォリオを閲覧用のユーザー画面と表示情報を管理する管理画面の２つに分かれています。
- 本アプリは Vercel を用いて、公開しております。

### 公開用 URL

- ユーザー画面： https://portfolio-git-main-kennys-projects-79817d7f.vercel.app
- 管理画面：https://portfolio-kennys-projects-79817d7f.vercel.app/admin//login
  - ログイン email : -----
  - パスワード: -----

## 使用技術

- フロントエンド:
  - HTML / CSS / JavaScript
  - TypeScript v5
  - React v18
  - i18next
  - uuid
  - react-drag-drop-files
  - React-router
- データベース:
  - supabase
- その他:
  - Git / GitHub
  - Vercel

## 主な機能

### ユーザー画面

- ユーザー画面はポートフォリオ用の紹介画面

#### トップ画面

- 多言語機能
  - ページ上部に英語と日本語の切り替えアイコンを用意し、ボタン押下で日本語と英語を切り替える機能
  - 多言語ライブラリ i18next(i18n)を使用した。
- スクロールリンク
  - 画面上部のリンク(work, about, contact )をクリックすると、指定のエリアまで自動でスクロールする。
- タブ切り替え
  - タブのリンク(All, Product, Packaging Graphic)押下したときに、該当の種類でフィルターされた画像の一覧を表示する。

#### 詳細画面

- トップ画面の画像一覧から任意の画像をクリックすると、詳細情報を表示する。
- バックリンクをクリックするとトップ画面へ遷移する。

### 管理画面

- ユーザー画面に表示する情報を管理する画面

#### ログイン画面

#### 一覧画面



#### 登録画面(モーダル)

#### 編集画面(モーダル)

#### 削除画面(モーダル)
