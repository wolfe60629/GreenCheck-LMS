@echo off

echo ....... DATABASE CONFIGURATION ........ 
set /p dbip="Database IP: "
set /p dbport="Database Port: "
set /p dbname="Database Name: "
set /p dbuser="Database Username: "
set /p dbpass="Database Password: "


mkdir Config
echo [database]> ./Config/database.ini
echo:host          = %dbip%>> ./Config/database.ini
echo:dbname        = %dbname%>> ./Config/database.ini
echo:port          = %dbport%>> ./Config/database.ini
echo:username      = %dbuser%>> ./Config/database.ini
echo:password      = %dbpass%>> ./Config/database.ini

echo ....... HTTPS CONFIGURATION ........ 
openssl req -x509 -nodes -days 365 -newkey rsa:2048 -keyout .\Config\selfsigned.key -out .\Config\selfsigned.crt



