# Ansibot - Provision your Dev Machines

Author: Harry Lee <harryl@vatit.com>

## Introduction

Front end for provisioning machines using **Ansible** through a web app. The purpose of this project is to allow end users to provision their own machines/other hosts through a frontend without worring about changing the `hosts` file. This abstracts the end users from the underlying implementations of `playbooks`. This example front-end allows users to enter their own credentials and will stream console logs from **Ansible** to the web front-end.

This project is based on [react-starter-kit](https://github.com/kriasoft/react-starter-kit) and uses **Docker** to deploy **Ansible**. Websockets (using [Socket.io](https://socket.io/)) are used to stream logs to the web front-end. [Material-UI](https://material-ui-1dab0.firebaseapp.com/) is used for the front-end.

## Background

At **VAT IT**, it takes a very long time for new developers to get their machine set up with the correct configurations. This is a hideous and manual process. We have decided to automate this process by using **Ansible** to configure these developers' machines. This allows the developers to get started with the more important tasks instead of doing mundane set ups. The developers do not have to be clued up with **Ansible** either, they just have to enter their credentials.

## Pre-requisites

This example project assumes that you have the following setup:
- **Docker** installed.
- Docker image with **Ansible** configured. Such as the one by [williamyeh/ansible](https://hub.docker.com/r/williamyeh/ansible/).
- The dev machine should be configured for **Ansible** access: [Windows Config](http://docs.ansible.com/ansible/latest/intro_windows.html), [Linux Config](http://docs.ansible.com/ansible/latest/intro_installation.html#managed-node-requirements).

## Directory Structure

_ansible_: This directory has the example Docker image for Ansible usage.
_src_: Source code for front-end.

## Usage

This example is biased to the specific dev machine setup for use in **_VAT IT_**. 

1. The host with this app installed (control machine) must be on the same network as the dev machine (ensure that they can discover each other).
2. Run the web app on the control machine (the web app is default to serve on `port 3000`).
2. Ensure that the dev machine is **Ansible** ready.
3. Access the web app from the dev machine (_ip address_:3000) and enter dev machine credentials.
4. Click "Submit" and view the logs.

To Run:

```bash
NODE_ENDPOINT_IP='http://localhost:3000' NODE_ENV_IMAGE='halosan/ansible-auto:demo' node build/server.js
```

## Conclusion

This is a very simple implementation of viewing the remote docker output (process.stdout). There are many other applications for this implementation.