# parcel_tracker_client

* Based on https://github.com/egg-/delivery-tracker, made some modification

* serverless on netlify as parcel tracker's client, parcel info can be get as:

.post("https://trackerclient.netlify.app/.netlify/functions/index", {
            cr: this.couriers[pack.courier].name,
            id: pack.tracknumber,
          })