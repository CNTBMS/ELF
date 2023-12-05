<img src="https://capsule-render.vercel.app/api?type=waving&color=0c2238&height=120&section=header&text=ELF&fontSize=100&fontColor=d6ace6" />
<h1>Emergency pronosis models using Federated Learning Platform</h1>

## Contents
1. [Introduction](#1.-Introduction)
2. [Environment](#2.-Environment)
3. [APIs](#3.-APIs)
---
## 1. Introduction

It is development of a platform for Federated learning with emergency room prognosis prediction models<br/>
To preserve the privacy of medical data distributed across multiple institutions, federated model learning is performed using model weights without data integration<br/>
It is operated in a cloud environment (Google Cloud Platform, Google Cloud Storage, Big Query)


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

  
* TensorFlow-based development virtualization  environment using Docker
* Deploying a development environment server for federated learning on a cloud computing instance
* As a model parameter storage, it is composed of independent storage considering security and stability
* DW service for loading learning round metadata and logs of federated learning
* Update federated learning model parameters or load metadata
* The medical data storage is not accessed from the outside, but only when training the local model on the development server of the participating institution.
* Print out monitoring indicator

---
## 3. APIs

* 1
* 2
* 3

---

<img src="https://capsule-render.vercel.app/api?type=waving&color=0c2238&height=120&section=footer&text=ELF&fontSize=100&fontColor=d6ace6" />
