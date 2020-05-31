import requests, json

def main():
    import urllib.request, json 
    with urllib.request.urlopen("http://api.dabas.com/DABASService/V2/article/gtin/05053990138722?apikey=bbb3c928-8c54-4ac6-88ef-7543c246d1ca") as url:
        data = json.loads(url.read().decode())

        print(json.dumps(data, indent=4, sort_keys=True, separators=(',', ': ')))

if __name__ == "__main__":
    main()