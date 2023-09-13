# Read me

## Commands:
### Maven
``mvn install``

``mvn compile``

``mvn test``

``mvn spring-boot:run``


### Port
Check for items listening to port 8080 ``lsof -i TCP:8080``

Close item on port 8080 ``kill -9 <pid_value>``

### Docker
List all docker items ``docker ps``

Stop all docker items ``docker stop $(docker ps -q)``

Build docker image ``docker build -t java_hta .``

Run docker image ``docker run -p 8080:8080 -d java_hta ``
