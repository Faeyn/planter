FROM tomcat:10.0.14-jre17-temurin-focal
COPY ./target/*.jar ./app.jar
CMD ["java", "-jar", "app.jar"]