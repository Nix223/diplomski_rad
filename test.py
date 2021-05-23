import json
import datetime
import numpy as np
import statistics as stats

for i in range(1,20):
    raw_path = 'C:/Users/Marko/Downloads/locations/'
    raw_path = raw_path + "location_" + str(i)
    with open(raw_path + '/loc_sorted'+ str(i)+'.json') as f:
        d = json.load(f);
        #print(d)
        start_time = "2020-04-06 00:00:00"
        date_time_obj_start = datetime.datetime.strptime(start_time, "%Y-%m-%d %H:%M:%S")
        #print("Start time:" + str(date_time_obj_start))
        terminate = False
        interval = []
        data = {}
        for obj in d:
            processed = False
            while processed == False:
                obj_time = datetime.datetime.strptime(obj['time'], "%Y-%m-%d %H:%M:%S")
                #print("current <30 min int" + str(obj_time)+ " " + str(divmod((obj_time-date_time_obj_start).total_seconds(), 60)[0]))
                if date_time_obj_start > datetime.datetime.strptime("2020-04-11 00:30:00", "%Y-%m-%d %H:%M:%S"):
                    print("END")
                    processed = True
                    terminate = True
                    break
                if obj_time >= date_time_obj_start and divmod((obj_time-date_time_obj_start).total_seconds(), 60)[0] < 30:
                    #print("in interval :D ")
                    interval.append(obj)
                    #print(obj)
                    processed = True
                else:
                    minVals = [100,100,100,100,100,100]
                    maxVals = [0,0,0,0,0,0]
                    meanVals = [[],[],[],[],[],[]]
                    
                        
                    for x in interval:
                        #print(x)
                        if x["sewer_and_water"] == "-":
                            meanVals[0].append(0)
                        else:
                            if int(float(x["sewer_and_water"]))<minVals[0]:
                                minVals[0]=int(float(x["sewer_and_water"]))
                            if int(float(x["sewer_and_water"]))>maxVals[0]:
                                maxVals[0]=int(float(x["sewer_and_water"]))
                            meanVals[0].append(int(float(x["sewer_and_water"])))
                            
                        if x["power"] == "-":
                            meanVals[1].append(0)
                        else :                            
                            if int(float(x["power"]))<minVals[1]:
                                minVals[1]=int(float(x["power"]))
                            if int(float(x["power"]))>maxVals[1]:
                                maxVals[1]=int(float(x["power"]))
                            meanVals[1].append(int(float(x["power"])))
                            
                        if x["roads_and_bridges"] == "-":
                            meanVals[2].append(0)
                        else :                            
                            if int(float(x["roads_and_bridges"]))<minVals[2]:
                                minVals[2]=int(float(x["roads_and_bridges"]))
                            if int(float(x["roads_and_bridges"]))>maxVals[2]:
                                maxVals[2]=int(float(x["roads_and_bridges"]))
                            meanVals[2].append(int(float(x["roads_and_bridges"])))
                            
                        if x["medical"] == "-":
                            meanVals[3].append(0)
                        else :                            
                            if int(float(x["medical"]))<minVals[3]:
                                minVals[3]=int(float(x["medical"]))
                            if int(float(x["medical"]))>maxVals[3]:
                                maxVals[3]=int(float(x["medical"]))
                            meanVals[3].append(int(float(x["medical"])))
                            
                        if x["buildings"] == "-":
                            meanVals[4].append(0)
                        else :                            
                            if int(float(x["buildings"]))<minVals[4]:
                                minVals[4]=int(float(x["buildings"]))
                            if int(float(x["buildings"]))>maxVals[4]:
                                maxVals[4]=int(float(x["buildings"]))
                            meanVals[4].append(int(float(x["buildings"])))
                            
                        if x["shake_intensity"] == "-":
                            meanVals[5].append(0)
                            
                        else :                            
                            if int(float(x["shake_intensity"]))<minVals[5]:
                                minVals[5]=int(float(x["shake_intensity"]))
                            if int(float(x["shake_intensity"]))>maxVals[5]:
                                maxVals[5]=int(float(x["shake_intensity"]))
                            meanVals[5].append(int(float(x["shake_intensity"])))
                    
                    for j,val in enumerate(minVals):
                        if val == 100:
                           minVals[j]=0
                    #print(minVals)
                    #print(maxVals)
                    #print(meanVals)
                    mean = []
                    if len(interval) == 0:
                        minVals = [0,0,0,0,0,0]
                        maxVals = [0,0,0,0,0,0]
                        meanVals = [[0,0],[0,0],[0,0],[0,0],[0,0],[0,0]]
                    for m in meanVals:
                        mean.append(stats.median(m))
                    #print(mean)
                    interval = []
                    data[str(date_time_obj_start)]  =  {'minimumVals' : str(minVals) , 'maximumVals' :  str(maxVals) ,'meanVals' : str(mean)}
                    date_time_obj_start = date_time_obj_start + datetime.timedelta(minutes=30)
                    #print("increment time ++ " + str(date_time_obj_start))
            if terminate:
                break
    json_data = json.dumps(data)
    print(json_data)
    with open('C:/Users/Marko/Downloads/locations/interval30min_location_' + str(i) +'.json', 'w') as outfile:
        json.dump(data, outfile)
#print(d)
