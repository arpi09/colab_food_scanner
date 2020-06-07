import requests, json
from dotenv import load_dotenv
import urllib.request, json 
import os




def main():
    load_dotenv()
    with urllib.request.urlopen("http://api.dabas.com/DABASService/V2/articles?apikey=" + os.getenv('DABAS_API_KEY')) as url:
        gtinList = json.loads(url.read().decode())

        # print(json.dumps(data, indent=4, sort_keys=True, separators=(',', ': ')))
        # print(data[0]["GTIN"])
        for gtin in gtinList:
            print(gtin["GTIN"])

            with urllib.request.urlopen("http://api.dabas.com/DABASService/V2/article/gtin/" + gtin["GTIN"] + "?apikey=" + os.getenv('DABAS_API_KEY')) as url:
                data = json.loads(url.read().decode())

            print(data["Ingrediensforteckning"])

            # data = { 'barcodeid': data, 'jsonString': "test" }

            # data = json.dumps(data)

            # data = str(data)

            # data = data.encode('utf-8')
            
            # req =  urllib.request.Request("https://dry-scrubland-94711.herokuapp.com/products", data=data)

            # req.add_header('Content-Type', 'application/json')

            # resp = urllib.request.urlopen(req)


if __name__ == "__main__":
    main()