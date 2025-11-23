# ===== Stage 1: Build JAR =====
FROM jelastic/maven:3.9.5-openjdk-21 AS build
WORKDIR /app

# Cache dependencies
COPY pom.xml .
RUN mvn dependency:go-offline

# Copy source and build
COPY src ./src
RUN mvn clean package -DskipTests

# ===== Stage 2: Lightweight runtime =====
FROM eclipse-temurin:21-jre
WORKDIR /app

# Copy the built JAR only
COPY --from=build /app/target/*.jar app.jar

# Run the JAR
EXPOSE 8080
CMD ["java", "-jar", "app.jar"]
