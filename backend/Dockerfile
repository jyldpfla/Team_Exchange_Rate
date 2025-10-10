# ---------- Build stage ----------
FROM eclipse-temurin:21-jdk-alpine AS build
WORKDIR /workspace

COPY gradlew settings.gradle build.gradle ./
COPY gradle ./gradle

# ⬇️ 중요: CRLF 제거 + 실행권한 부여
RUN sed -i 's/\r$//' gradlew && chmod +x gradlew

# 의존성 프리-다운로드
RUN ./gradlew --no-daemon dependencies

# 소스 복사 후 빌드
COPY src ./src
RUN ./gradlew --no-daemon clean bootJar -x test

# ---------- Runtime ----------
FROM eclipse-temurin:21-jre-alpine
WORKDIR /app
COPY --from=build /workspace/build/libs/*.jar app.jar
ENV SPRING_PROFILES_ACTIVE=prod
EXPOSE 8080
ENTRYPOINT ["sh","-c","java $JAVA_OPTS -jar app.jar"]
