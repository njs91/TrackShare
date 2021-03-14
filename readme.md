# Demo Full-stack App

## Introduction

Project comprises of a front-end app using react and a back-end app using python. Both ends communicate via a GraphQL API.

## Installation

**Installing & running the back-end app**:

Execute these commands in /root/app:

```
pipenv install
```

```
pipenv shell
```

```
python manage.py runserver
```

Run the above command from within the app folder.

**Installing the front-end app**:

Install with:

```
npm install
```

Run with:

```
npm start
```

## Troubleshooting

**Using the correct version of python:**

To specify the python version, run this after cd'ing to /root/app (may need to download & install python 3.8 first):

```
pipenv --python /Library/Frameworks/Python.framework/Versions/3.8/bin/python3
```

Then ```python --version``` should show python 3.8.

Issues often caused from running other versions of python 3.8 or pyjwt 1.7.1.

**Error “’str' object has no attribute 'decode’”:**

Run ```pip list``` to check version of pyjwt, and run ```pip install PyJWT==1.7.1``` to install the correct version if the version is not 1.7.1.