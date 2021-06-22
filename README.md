# UpTask
## Node.JS Web Application

This application allows you to keep track of the progress of your projects

### Requirements
- Node.JS (v10.0+)
- A MySQL Database (tested on 8.0+)
- A SMTP Service, for send activation and password reset mails, tested with ZohoMail and a Postfix instance.

## Setup (development)
1) Clone this repo
2) Install latest Node.JS or the latest LTS build from [here](https://nodejs.org/en/download/)
3) Install a MySQL database, or request one from a free service.
4) Register an account on ZohoMail or set-up a mail server in a VPS server
5) Fill-in a "variables.env" file in the root folder of the project with the following:

```
DB_HOST = yourdatabasehost.com
DB_PORT = 3306
DB_USER = dbusername
DB_PASS = dbpassword
DB_NAME = databasename

MAIL_HOST = smtp.yourmailhost.com
MAIL_PORT = 587
MAIL_USER = smtpuser
MAIL_PASS = smtpPassword
MAIL_ADDR = youremailaddress@mail.com

HOST = localhost
```
Be sure to fill in with the correspondent data

6) Execute `install-dep.sh` or `install-dep.bat` depending on your operating system for install all the required dependencies, or open a terminal in the same folder and execute `npm update --save`
7) Finally, execute `npm run start-all-dev` for compile the client code and run the server

The server will automatically initialize the database with the required tables and parameters.
At the end the server will be running on port 3000, now you can visit the page on http://localhost:3000

Issues for this project may or may not be fixed, but feel free to report them [here](https://github.com/PANCHO7532/uptask/issues)