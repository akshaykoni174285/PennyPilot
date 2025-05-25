# Use the official Jenkins LTS image
FROM jenkins/jenkins:lts

# Switch to root user
USER root

# Install basic tools and update certificates
RUN apt-get update && apt-get install -y \
    curl \
    git \
    ca-certificates \
    && update-ca-certificates \
    && rm -rf /var/lib/apt/lists/*

# Switch back to jenkins user
USER jenkins

# Disable Jenkins setup wizard and configure Java options
ENV JAVA_OPTS="-Djenkins.install.runSetupWizard=false -Dhudson.model.DownloadService.noSignatureCheck=true"

# Install essential plugins
RUN jenkins-plugin-cli --plugins \
    ant:latest \
    build-timeout:latest \
    credentials-binding:latest \
    timestamper:latest \
    ws-cleanup:latest \
    workflow-aggregator:latest \
    git:latest \
    github:latest \
    pipeline-stage-view:latest \
    junit:latest \
    ssh-agent:latest \
    copyartifact:latest \
    matrix-auth:latest

# Create admin user and configure security
RUN mkdir -p /usr/share/jenkins/ref/init.groovy.d && \
    echo 'import jenkins.model.*' > /usr/share/jenkins/ref/init.groovy.d/basic-security.groovy && \
    echo 'import hudson.security.*' >> /usr/share/jenkins/ref/init.groovy.d/basic-security.groovy && \
    echo 'import jenkins.install.InstallState' >> /usr/share/jenkins/ref/init.groovy.d/basic-security.groovy && \
    echo 'import hudson.model.UpdateCenter' >> /usr/share/jenkins/ref/init.groovy.d/basic-security.groovy && \
    echo '' >> /usr/share/jenkins/ref/init.groovy.d/basic-security.groovy && \
    echo 'def instance = Jenkins.getInstance()' >> /usr/share/jenkins/ref/init.groovy.d/basic-security.groovy && \
    echo '' >> /usr/share/jenkins/ref/init.groovy.d/basic-security.groovy && \
    echo '// Configure update center to work online' >> /usr/share/jenkins/ref/init.groovy.d/basic-security.groovy && \
    echo 'def updateCenter = instance.getUpdateCenter()' >> /usr/share/jenkins/ref/init.groovy.d/basic-security.groovy && \
    echo 'updateCenter.updateDefaultSite()' >> /usr/share/jenkins/ref/init.groovy.d/basic-security.groovy && \
    echo '' >> /usr/share/jenkins/ref/init.groovy.d/basic-security.groovy && \
    echo '// Create admin user' >> /usr/share/jenkins/ref/init.groovy.d/basic-security.groovy && \
    echo 'def hudsonRealm = new HudsonPrivateSecurityRealm(false)' >> /usr/share/jenkins/ref/init.groovy.d/basic-security.groovy && \
    echo 'if (hudsonRealm.getAllUsers().empty) {' >> /usr/share/jenkins/ref/init.groovy.d/basic-security.groovy && \
    echo '    hudsonRealm.createAccount("admin", "admin123")' >> /usr/share/jenkins/ref/init.groovy.d/basic-security.groovy && \
    echo '    instance.setSecurityRealm(hudsonRealm)' >> /usr/share/jenkins/ref/init.groovy.d/basic-security.groovy && \
    echo '    def strategy = new FullControlOnceLoggedInAuthorizationStrategy()' >> /usr/share/jenkins/ref/init.groovy.d/basic-security.groovy && \
    echo '    strategy.setAllowAnonymousRead(false)' >> /usr/share/jenkins/ref/init.groovy.d/basic-security.groovy && \
    echo '    instance.setAuthorizationStrategy(strategy)' >> /usr/share/jenkins/ref/init.groovy.d/basic-security.groovy && \
    echo '    instance.save()' >> /usr/share/jenkins/ref/init.groovy.d/basic-security.groovy && \
    echo '}' >> /usr/share/jenkins/ref/init.groovy.d/basic-security.groovy && \
    echo '' >> /usr/share/jenkins/ref/init.groovy.d/basic-security.groovy && \
    echo 'instance.setInstallState(InstallState.INITIAL_SETUP_COMPLETED)' >> /usr/share/jenkins/ref/init.groovy.d/basic-security.groovy

# Configure Jenkins to be online
RUN echo 'import jenkins.model.*' > /usr/share/jenkins/ref/init.groovy.d/configure-online.groovy && \
    echo 'import hudson.model.*' >> /usr/share/jenkins/ref/init.groovy.d/configure-online.groovy && \
    echo '' >> /usr/share/jenkins/ref/init.groovy.d/configure-online.groovy && \
    echo 'def instance = Jenkins.getInstance()' >> /usr/share/jenkins/ref/init.groovy.d/configure-online.groovy && \
    echo 'instance.setNoUsageStatistics(false)' >> /usr/share/jenkins/ref/init.groovy.d/configure-online.groovy && \
    echo 'instance.save()' >> /usr/share/jenkins/ref/init.groovy.d/configure-online.groovy

# Expose Jenkins ports
EXPOSE 8080 50000

# Start Jenkins
CMD ["/usr/local/bin/jenkins.sh"]