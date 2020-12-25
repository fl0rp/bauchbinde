# Bauchbinde

## params

* headline: set headline
* speaker: set speaker name
* intro: 1=full intro, omit or set to 0 for low-profile version
* hold: hold time in ms, default 4000
* startdelay: delay before showing in ms, default 1000
* theme: "assembly" or "main", defaults to assembly
* room: enable schedule integration, room name as found in the schedule (https://data.c3voc.de/rC3/everything.schedule.json)
* time: override the current time for selecting which talk to display
* left, bottom, width: layout params which override the respective css properties on the containing element, any css units work, vw/vh are recommended. examples:
* * full width, no margins: `left=0&bottom=0&width=100vw`
* * half width, to the right: `left=50vw&&width=50vw`
