#!/bin/bash

VERSION=6.2.6
RHOME="/usr/local/redis/"
#安装依赖包
yum -y install gcc make

#编译安装Redis
tar -xf redis-${VERSION}.tar.gz
cd redis-${VERSION}
make MALLOC=libc
make install PREFIX=${RHOME}

#配置Redis
mkdir -p ${RHOME}/{conf,data,logs}
cp redis.conf ${RHOME}/conf/

sed -ri '75cbind 0.0.0.0' ${RHOME}/conf/redis.conf
sed -ri '94s/yes/no/' ${RHOME}/conf/redis.conf
sed -ri '257s/no/yes/' ${RHOME}/conf/redis.conf
sed -ri '289cpidfile /usr/local/redis/data/redis.pid' ${RHOME}/conf/redis.conf
sed -ri '302clogfile "/usr/local/redis/logs/redis.log"' ${RHOME}/conf/redis.conf
sed -ri '454cdir /usr/local/redis/data/' ${RHOME}/conf/redis.conf

#清理文件
cd ..
rm -rf redis-${VERSION}
