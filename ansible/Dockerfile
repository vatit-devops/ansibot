# halosan/ansible-auto:latest
FROM williamyeh/ansible:ubuntu16.04

RUN apt-get update && apt-get install -y vim python-pip
RUN pip install "pywinrm>=0.2.2"

WORKDIR /tmp

RUN mkdir /tmp/group_vars
COPY ./group_vars /tmp/group_vars/
RUN mkdir /tmp/roles
COPY ./roles /tmp/roles/
COPY ./site.yml /tmp/
COPY ./run.sh /tmp/

RUN chmod +x ./run.sh

# ENTRYPOINT ["/tmp/run.sh"]
CMD ["/tmp/run.sh"]