## Two stage docker file
# 1. Stage compile build
FROM maven:3.9.6-eclipse-temurin-21-alpine AS build
WORKDIR /app

COPY pom.xml .
RUN mvn dependency:go-offline

COPY src ./src
RUN mvn clean package

# Copy the pre-built JAR from the 1. stage build
FROM eclipse-temurin:21-jre-alpine
WORKDIR /app

COPY --from=build app/target/*.jar app.jar

ENTRYPOINT ["java", "-Dspring.profiles.active=prod", "-jar", "app.jar"]
EXPOSE 8080
