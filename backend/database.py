from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from sqlalchemy.ext.declarative import declarative_base
from fastapi import FastAPI, HTTPException, Depends
import configparser
import os.path


config_file = None
if (os.path.isfile('../config/dev.cfg')):
    config_file = '../config/dev.cfg'
else:
    config_file = '../config/settings.cfg'

# read from the configuration file
config = configparser.ConfigParser()
config.read(config_file)

db_host = config['DATABASE']['HOST']
db_port = config['DATABASE']['PORT']
db_schema = config['DATABASE']['SCHEMA']
db_user = config['DATABASE']['USER']
db_password = config['DATABASE']['PASSWORD']

URL_DATABASE = f'mysql+pymysql://{db_user}:{db_password}@{db_host}:{db_port}/{db_schema}'

engine = create_engine(URL_DATABASE)

SessionLocal = sessionmaker(autocommit = False, autoflush=False, bind=engine)

Base = declarative_base()

