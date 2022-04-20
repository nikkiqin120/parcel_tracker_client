# parcel_tracker_client

* Based on https://github.com/egg-/delivery-tracker, made some modification

* serverless on netlify as parcel tracker's client, parcel info can be get as:

.post("https://trackerclient.netlify.app/.netlify/functions/index", {
            cr: couriers,
            id: tracknumber,
          })

## Supported couriers

I | II | III | IV
---- | ---- | ---- | ---- 
|canadapost* 	| tnt	| ecargo	| poslaju
|fedex* 	| airbridge	| auspost	| xpost
|ups* 	| efs	| pantos	| kerrythai
|dhl	| yelloexpress	| rincos	| sicepat
|usps	| eparcel	| cjkoreaexpress	| xioexpress
|cesco	| koreapost	| deppon	



*Note : only * are tested by author*
