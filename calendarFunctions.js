
            var CLIENT_ID = '782686039876-c407p8ak93h96p3jc6g4ffh5ot4t8iuc.apps.googleusercontent.com';
            var SCOPES = ["https://www.googleapis.com/auth/calendar"];
            
            function mainFunction(dataobj) {
                //var deadline = new Date(2016, 9, 24, 23, 00, 00, 0);
                var deadline = dataobj['edeadline'];
                var duration = dataobj['eduration'];
                // console.log(deadline);
                getAllUpcomingEventDateTimes(deadline, function(response) {
                    return algorithm(response, duration, deadline);
                });
            }
            /**
             * Check if current user has authorized this application.
             */
            function checkAuth() {
                gapi.auth.authorize({
                    'client_id': CLIENT_ID,
                    'scope': SCOPES.join(' '),
                    'immediate': true
                }, 
                handleAuthResult);
            }

            /**
             * Handle response from authorization server.
             *
             * @param {Object} authResult Authorization result.
             */
            function handleAuthResult(authResult) {
                var authorizeDiv = document.getElementById('authorize-div');
                if (authResult && !authResult.error) {
                // Hide auth UI, then load client library.
                authorizeDiv.style.display = 'none';
                loadCalendarApi();
                } else {
                // Show auth UI, allowing the user to initiate authorization by
                // clicking authorize button.
                authorizeDiv.style.display = 'inline';
                }
            }

            /**
             * Initiate auth flow in response to user clicking authorize button.
             *
             * @param {Event} event Button click event.
             */
            function handleAuthClick(event) {
                gapi.auth.authorize(
                    {client_id: CLIENT_ID, scope: SCOPES, immediate: false},
                handleAuthResult);
                return false;
            }
        
            
            function loadCalendarApi() {
                gapi.client.load('calendar', 'v3', main);
            }
            
            function convertToAlgoDateTime(givenString) {
                return Date.parse(givenString);
            }
            function convertToAPIDateTime(given) {

                return given.toISOString();
            }
            /**
             * Print the summary and start datetime/date of the next ten events in
             * the authorized user's calendar. If no events are found an
             * appropriate message is printed.
             */
            function listUpcomingEventsInACalendar(calendarId, deadline, callback) {
                console.log(deadline);
                var request = gapi.client.calendar.events.list({
                    'calendarId': calendarId,
                    'timeMin': (new Date()).toISOString(),
                    'showDeleted': false,
                    'singleEvents': true,
                    'maxResults': 50,
                    'orderBy': 'startTime',
                    'timeMax': deadline.toISOString()});
                request.execute(function(resp) {
                    var events = resp.items;
                    callback(events);
                });
                
                
            }
            function algorithm(eventtimes, duration, deadline) {
                //console.log(eventtimes);
                var slot_size = 1800; //Half hour time slots
                var current_time = new Date();
                current_time = Date.parse(current_time) * 0.001;
                //console.log(current_time);
                current_time += slot_size - (current_time % slot_size);
                time_slots_needed = duration / 1800;
                unavail_time_slots = [];

                //console.log(eventtimes.length);
                for (var i = 0; i < eventtimes.length; i++) {
                    var start_time = eventtimes[i]['start_time'];
                    var end_time   = eventtimes[i]['end_time'];
                    start_time -= start_time % slot_size;
                    end_time   += slot_size - (end_time % slot_size);
                    console.log(start_time);
                    console.log(end_time);
                    for (var j = start_time; j < end_time; j += slot_size) {
                        unavail_time_slots.push(j);
                    }
                }
                
                //console.log(unavail_time_slots);
                
                avail_time_slots = [];
                for (var i = current_time; i < deadline; i += slot_size) {
                    if (! unavail_time_slots.includes(i)) {
                        avail_time_slots.push(i);
                    }
                }
                //console.log(avail_time_slots);
                results = [];
                // IMPORTANT: assuming there are more available time slots than
                // needed
                for (var i = 0; i < time_slots_needed; i++) {
                    results.push(avail_time_slots[i]);
                }
                //console.log(results);
                // PENDING RETURN
                
            }

            function getAllUpcomingEventDateTimes(deadline, callback) {
                var request = gapi.client.calendar.calendarList.list();
                request.execute(function(resp) {
                    calendars = resp.items;
                    for (var i = 0; i<calendars.length; i++) {
                        listUpcomingEventsInACalendar(calendars[i].id, deadline, function(calendarEvents) {
                            var dateTimesReturn = [];
                            for (var j = 0; j<calendarEvents.length; j++) {
                                thisEvent = calendarEvents[j];
                                dateTimesReturn.push({'start':thisEvent.start.dateTime, 'finish':thisEvent.end.dateTime});
                            }

                            
                            callback(dateTimesReturn);
                        });
                    /* start of nesting, otherwise this would be outside of this*/
                }
            });
                
                }
            
            /*
                var dateTimesReturn
                for (var i = 0; i<calendars.length; i++) {
                    var calendarEvents = listUpcomingEventsInACalendar(calendars[i].id);
                    for (var j = 0; j<calendarEvents.length; j++) {
                        thisEvent = calendarEvents[j];
                        dateTimesReturn.push({'start':thisEvent.start.dateTime, 'finish':thisEvent.end.dateTime});
                    }
                }*/
                
            function parseEvent(incomingEvent, eventName) {
                var event = {
                'summary': eventName,
                'location': '',
                'description': '',
                'start': {
                    'dateTime':incomingEvent.start 
                },
                'end': {
                    'dateTime': incomingEvent.end
                }
                };
                return event;
             }

             function insertEvent(parsedEvent) {
                parsedEvent;
                var request = gapi.client.calendar.events.insert({'calendarId': 'primary','resource': parsedEvent});
                request.execute(function(parsedEvent) { 
                });
             }
