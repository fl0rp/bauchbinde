# Bauchbinde

## params

* headline: set headline
* speaker: set speaker name
* intro: 1=full intro, omit or set to 0 for low-profile version
* hold: hold time in seconds, default 10
* startdelay: delay before showing in seconds, default 1
* theme: "assembly" or "main", defaults to assembly
* room: enable schedule integration, room name as found in the schedule (https://data.c3voc.de/rC3/everything.schedule.json)
* time: override the current time for selecting which talk to display
* gracePeriod: time in seconds. if no talk is found for current time, retry with current time offset by gracePeriod in both directions. default: 360s (5min)
* interval: time in seconds. if set, redisplay in the configured interval
* left, bottom, width, top: layout params which override the respective css properties on the containing element, any css units work, vw/vh are recommended. examples:
* * full width, no margins: `left=0&bottom=0&width=100vw`
* * half width, to the right: `left=50vw&&width=50vw`
