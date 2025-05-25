FROM jenkins/jenkins:lts

# Skip setup wizard
ENV JAVA_OPTS="-Djenkins.install.runSetupWizard=false"

# Copy plugins list
COPY plugins.txt /usr/share/jenkins/plugins.txt

# Install plugins without SSL issues
RUN jenkins-plugin-cli --verbose --plugin-file /usr/share/jenkins/plugins.txt

# Add custom Groovy init script
COPY init.groovy.d/ /usr/share/jenkins/ref/init.groovy.d/
