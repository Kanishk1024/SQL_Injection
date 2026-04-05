FROM mysql:8.0

# Copy initialization script
COPY init.sql /docker-entrypoint-initdb.d/

# Set default authentication plugin for MySQL 8.0
RUN echo "default-authentication-plugin=mysql_native_password" >> /etc/mysql/conf.d/mysql.cnf

EXPOSE 3306
