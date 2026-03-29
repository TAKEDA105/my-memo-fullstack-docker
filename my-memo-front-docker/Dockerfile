# 1. Node.js の軽量版を使用
FROM node:20-alpine

# 2. コンテナ内の作業ディレクトリ
WORKDIR /app

# 3. ライブラリ定義ファイルを先にコピー（キャッシュを効かせる！）
COPY package*.json ./

# 4. ライブラリのインストール
RUN npm install

# 5. ソースコードを全部コピー
COPY . .

# 6. Vite の開発サーバーを起動
# --host 0.0.0.0 を付けることで Windows 側からアクセス可能にする
CMD ["npm", "run", "dev", "--", "--host", "0.0.0.0"]