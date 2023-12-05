import tensorflow as tf
import numpy as np
import sys
from datetime import datetime
from keras import backend as K
import re
#from keras.utils.layer_utils import count_params #  tf old version
from tensorflow.python.keras.utils import layer_utils # tf 2.1.3
import json

model = tf.keras.models.load_model(sys.argv[1])

dict={}
dict["opt"] = re.search('\<(.*?) object', str(model.optimizer)).group(1)
dict["loss"] = re.search('function (.*?)at', str(model.loss)).group(1)
dict["train"] =  layer_utils.count_params(model.trainable_weights)
dict["nontrain"] = layer_utils.count_params(model.non_trainable_weights)
dict["lr"] = str(K.eval(model.optimizer.lr))

json_val = json.dumps(dict)
print(json_val)

