#!/bin/bash

echo ....... DATABASE CONFIGURATION ........
echo "Database IP: " 
read dbip
echo "Database Port: "
read dbport
echo "Database Name: "
read dbname
echo "Database Username: "
read dbuser
echo "Database Password: "
read dbpass


mkdir Config
echo [database]> ./Config/database.ini
echo host          = $dbip>> ./Config/database.ini
echo dbname        = $dbname>> ./Config/database.ini
echo port          = $dbport>> ./Config/database.ini
echo username      = $dbuser>> ./Config/database.ini
echo password      = $dbpass>> ./Config/database.ini

echo ....... HTTPS CONFIGURATION ........ 
openssl req -x509 -nodes -days 365 -newkey rsa:2048 -keyout ./Config/selfsigned.key -out ./Config/selfsigned.crt



