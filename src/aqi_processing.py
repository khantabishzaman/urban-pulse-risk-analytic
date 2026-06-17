import numpy as np
import pandas as pd
from datetime import datetime
def parse_aqi_file(filepath, station_name):
    
    with open(filepath, "r", encoding="utf-8") as f:
        lines = [line.strip() for line in f.readlines()]
    
    records = []
    current_month = None
    
    for line in lines:
        
        # skip empty separators
        if line in ['""', '']:
            continue
        
        # detect month header
        if "-" in line and "00:00:00" in line:
            
            current_month = line.split(",")[0]
            continue
        
        parts = line.split(",")
        
        # day rows
        if parts[0].isdigit():
            
            day = int(parts[0])
            
            if current_month is None:
                continue
            
            values = []
            
            for v in parts[1:]:
                
                if v.strip() != "":
                    try:
                        values.append(float(v))
                    except:
                        pass
            
            if len(values) == 0:
                continue
            
            daily_avg = np.mean(values)
            
            month_dt = datetime.strptime(
                current_month,
                "%B-%Y"
            )
            
            full_date = datetime(
                month_dt.year,
                month_dt.month,
                day
            )
            
            records.append({
                "date": full_date,
                "station": station_name,
                "daily_avg_aqi": round(daily_avg, 2)
            })
    
    return pd.DataFrame(records)