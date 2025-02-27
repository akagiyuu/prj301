FROM maven:3.8.6-openjdk-8 AS build

WORKDIR /app

COPY pom.xml .

COPY src ./src

RUN mvn package -DskipTests

FROM openjdk:8-jdk-alpine

WORKDIR /app

COPY --from=build /app/target/prj301_final-0.0.1-SNAPSHOT.jar /app/prj301_final-0.0.1-SNAPSHOT.jar

EXPOSE 3000

ENTRYPOINT ["java", "-jar", "prj301_final-0.0.1-SNAPSHOT.jar"]