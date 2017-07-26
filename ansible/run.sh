#! /bin/bash

Host=$1
Username=$2
Password=$3

cd /tmp

touch /tmp/hosts

echo "[windows]" >> hosts
echo $Host >> hosts
echo "[windows:vars]" >> hosts
echo "ansible_user=vatit.local\\$Username" >> hosts
echo "ansible_password=$Password" >> hosts
echo "ansible_files_remote=C:\\Users\\$Username\\Downloads" >> hosts
echo "ansible_files_root=\\\\192.168.10.6\\devops\\dev-machine" >> hosts
echo "ansible_dir=/tmp" >> hosts

# ansible windows -i hosts -m win_ping
ansible-playbook -i hosts site.yml -vvvv

