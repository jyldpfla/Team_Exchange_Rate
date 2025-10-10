# ---------- Build stage ----------
FROM eclipse-temurin:21-jdk-alpine AS build
WORKDIR /workspace

# Gradle Wrapper / 설정 먼저 복사 (캐시 최적화)
COPY gradlew settings.gradle build.gradle ./
COPY gradle ./gradle

# 의존성 프리-다운로드 (src 없이)
RUN ./gradlew --no-daemon dependencies || true

# 소스 복사 후 빌드
COPY src ./src
RUN ./gradlew --no-daemon clean bootJar -x test

# ---------- Runtime ----------
FROM eclipse-temurin:21-jre-alpine
WORKDIR /app
# 산출물 jar 복사 (파일명은 *-SNAPSHOT.jar 혹은 버전에 맞춰 조정)
COPY --from=build /workspace/build/libs/*.jar app.jar

ENV JAVA_OPTS=""
EXPOSE 8080
# (선택) 헬스체크: actuator 사용 시 /actuator/health 권장
# HEALTHCHECK --interval=30s --timeout=3s \
#   CMD wget -qO- http://127.0.0.1:8080/actuator/health || exit 1

ENTRYPOINT ["sh", "-c", "java $JAVA_OPTS -jar app.jar"]
