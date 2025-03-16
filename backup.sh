#!/bin/bash
#backup script for homeassistant data
BACKUPFILE="/dev/shm/smarthome-$(hostname)-$(date +%Y%m%d).tar.gz"
cd /home/pi/homeassistant
sudo tar -zcvf ${BACKUPFILE} esphome/config/*.yaml homebridge/backups nlhome homeasistnt
#Upload backup to 
scp  ${BACKUPFILE} ubuntu@www.theworkingmethods.com:/home/ubuntu/datavol/homeassistant/daily/
#Upload backup to weekly folder as weekly backup
if [ $(date +%u) -eq 7 ];then
  scp ${BACKUPFILE} ubuntu@www.theworkingmethods.com:/home/ubuntu/datavol/homeassistant/weekly/
fi
#Upload backup to monthly folder as monthly backup
if [ $(date +%d) -eq 1 ];then
  scp ${BACKUPFILE} ubuntu@www.theworkingmethods.com:/home/ubuntu/datavol/homeassistant/monthly/
fi
