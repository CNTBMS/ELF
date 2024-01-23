<img src="https://capsule-render.vercel.app/api?type=waving&color=0c2238&height=120&section=header&text=ELF&fontSize=100&fontColor=d6ace6" />
<h1>Emergency pronosis models using Federated Learning Platform</h1>
---
## Contents
1. [Introduction](#1-introduction)
2. [Environment](#2-environment)
3. [APIs](#3-apis)
4. [Experiments](#4-experiments)
---
## 1. Introduction
It is development of a platform for Federated learning with emergency room prognosis prediction models<br/>
To preserve the privacy of medical data distributed across multiple institutions, federated model learning is performed using model weights without data integration<br/>
It is operated in a cloud environment (Google Cloud Platform, Google Cloud Storage, Big Query)
---
---
---
## 2. Environment
### 2-1. Freamwork
* NodeJS v16.18.1
* Flask 2.0.3
### 2-2. Python & packages
* python 3.9.7
* Tensorflow 2.13.0
* numpy 1.24.3
* pandas 1.3.1
### 2-3. cloud environment
It is operated in google cloud platform(GCP) with Google cloud services(GCS, Big Query). platform webapp is running at GCP instance, model weights are stored in GCS and model parametes and FL logs are stored in Big Query

 ![1](https://github.com/CNTBMS/ELF/assets/69572216/9749d276-32a0-40c8-9b8c-2bcc18116286)

  
1) TensorFlow-based development virtualization  environment using Docker
2) Deploying a development environment server for federated learning on a cloud computing instance
3) As a model parameter storage, it is composed of independent storage considering security and stability
4) DW service for loading learning round metadata and logs of federated learning
5) Update federated learning model parameters or load metadata
6) The medical data storage is not accessed from the outside, but only when training the local model on the development server of the participating institution.
7) Print out monitoring indicator

---
## 3. APIs

※ Descripted common platform APIs without substantiation usage  

|Function|Request URL|Method|
|---|---|---|
|Login|/login|POST|
|Logout|/logout|GET|
|Check session|/session|GET|
|Check institution status|/readystat|GET|
|Upload|/upload|POST|
|Get moedels list|/files|GET|
|Download|/files/{Institution}/{Algorithm}/{model_variation}/{fl_round}/{file_name}|GET|
|Averaging|/averaging|GET|

---
## 4. Experiments

* With TF model and data of two institutions(Samsung medical center, Korea university medical center), We could get some results after progressing FL.
* FL doesn't always guarantee your model performance more better than local-learning model. But if you don't have enough data to ML, you could try FL with people or institutions in same purpose. It may improve your model performance



<img src="https://capsule-render.vercel.app/api?type=waving&color=0c2238&height=120&section=footer&text=ELF&fontSize=100&fontColor=d6ace6" />
