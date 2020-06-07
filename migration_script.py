import requests, json
from dotenv import load_dotenv
import urllib.request, json 
import os




def main():
    load_dotenv()
    # with urllib.request.urlopen("http://api.dabas.com/DABASService/V2/articles?apikey=" + os.getenv('DABAS_API_KEY')) as url:
    #     data = json.loads(url.read().decode())

        # print(json.dumps(data, indent=4, sort_keys=True, separators=(',', ': ')))
        # print(data[0]["GTIN"])
        # for gtin in data:
        #     print(gtin["GTIN"])
        # Data dict
    data = { 'barcodeid': "123", 'jsonString': "test" }

    # Dict to Json
    # Difference is { "test":10, "test2":20 }
    data = json.dumps(data)

    # Convert to String
    data = str(data)

    # Convert string to byte
    data = data.encode('utf-8')
    
    # Post Method is invoked if data != None
    req =  urllib.request.Request("https://dry-scrubland-94711.herokuapp.com/products", data=data)

    req.add_header('Content-Type', 'application/json')

    # Response
    resp = urllib.request.urlopen(req)


if __name__ == "__main__":
    main()