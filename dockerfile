FROM eclipse-temurin:17-jdk
VOLUME /hta_app
ARG JAR_FILE=target/java_hta-0.0.1.jar
ADD ${JAR_FILE} app.jar
ENTRYPOINT ["java","-jar","/app.jar"]