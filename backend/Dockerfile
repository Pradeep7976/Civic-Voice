FROM jelastic/maven:3.9.5-openjdk-21
WORKDIR /app
COPY . .
RUN mvn clean install -DskipTests
CMD [ "echo","abcd" ]
CMD mvn spring-boot:run