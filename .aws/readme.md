# install packages to AWS EC2 ubuntu

### docker
```
sudo apt update
sudo apt upgrade
sudo apt install ca-certificates curl gnupg lsb-release

sudo mkdir -p /etc/apt/keyrings
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo gpg --dearmor -o /etc/apt/keyrings/docker.gpg
sudo chmod a+r /etc/apt/keyrings/docker.gpg

echo "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.gpg] https://download.docker.com/linux/ubuntu $(lsb_release -cs) stable" | sudo tee /etc/apt/sources.list.d/docker.list > /dev/null

sudo apt update
sudo apt install docker-ce docker-ce-cli containerd.io

sudo groupadd docker
sudo usermod -aG docker $USER

docker -v
sudo docker run hello-world
```

### nodejs
```
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.5/install.sh | bash
. ~/.nvm/nvm.sh
nvm install --lts
```

### npm
```
sudo apt install npm -y
```

### nginx
```
sudo apt install nginx -y
```

### update
```
sudo apt update
sudo apt-get update -y
```

### ftp
```
sudo apt update
sudo apt install vsftpd -y

sudo vi /etc/vsftpd.conf
# anonymous_enable=NO
# pasv_enable=YES
# pasv_min_port=1024
# pasv_max_port=1048
# pasv_address=<Public IP of your instance>
sudo /etc/init.d/vsftpd restart

adduser awsftpuser
 passwd awsftpuser

sudo vi /etc/vsftpd.conf
# chroot_local_user=YES
sudo /etc/init.d/vsftpd restart

sudo usermod -d /files/ awsftpuser
usermod -a -G root awsftpuser
sudo /etc/init.d/vsftpd restart

sudo vi /etc/vsftpd.conf
# chroot_local_user=YES
# write_enable=YES
# allow_writeable_chroot=YES
sudo /etc/init.d/vsftpd restart

chown -R ftpusername /files
```


### ?https
```
sudo openssl req -newkey rsa:2048 -keyout cert.key -out cert.csr
sudo openssl x509 -signkey cert.key -in cert.csr -req -days 365 -out cert.crt

sudo openssl req -x509 -sha256 -days 1825 -newkey rsa:2048 -keyout rootCA.key -out rootCA.crt
sudo openssl x509 -req -CA rootCA.crt -CAkey rootCA.key -in cert.csr -out cert.crt -days 365 -CAcreateserial -extfile domain.ext
```
