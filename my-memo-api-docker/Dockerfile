# 1. ベースイメージ（Java 21 を使用）
FROM eclipse-temurin:21-jdk-alpine

# 2. コンテナ内の作業ディレクトリを作成・設定
WORKDIR /app

# 3. ホスト（Windows）の target フォルダにある JAR ファイルをコンテナにコピー
# ※ビルド後のファイル名に合わせて適宜修正してください
COPY target/*.jar app.jar

# 4. アプリケーションが使用するポート番号を公開（Spring Bootのデフォルトは8080）
EXPOSE 8080

# 5. コンテナ起動時にアプリを実行するコマンド
ENTRYPOINT ["java", "-jar", "app.jar"]