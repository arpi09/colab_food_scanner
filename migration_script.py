import requests, json
from dotenv import load_dotenv
import urllib.request, json 
import os




def main():
    load_dotenv()
    with urllib.request.urlopen("http://api.dabas.com/DABASService/V2/articles?apikey=" + os.getenv('DABAS_API_KEY')) as url:
        data = json.loads(url.read().decode())

        # print(json.dumps(data, indent=4, sort_keys=True, separators=(',', ': ')))
        print(data[0]["GTIN"])
        for gtin in data:
            print(gtin["GTIN"])


if __name__ == "__main__":
    main()