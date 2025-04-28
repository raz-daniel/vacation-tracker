FROM localstack/localstack:latest

# Copy images and initialization scripts
COPY images/ /tmp/images/
COPY scripts/ /docker-entrypoint-initdb.d/

# Make sure script is executable
RUN chmod +x /docker-entrypoint-initdb.d/init-aws.sh