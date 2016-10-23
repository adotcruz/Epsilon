import sys, time, json
from flask import Flask, jsonify, abort
from pprint import pprint

example = [(1477090800, 1477242000), (1477234800, 1477238400), \
           (1477263600, 1477263600), (1477265400, 1477270800), \
           (1477270800, 1477274400), (1477270800, 1477274400), \
           (1477279800, 1477279800), (1477335600, 1477340100), \
           (1477346400, 1477350900), (1477355400, 1477359000)]



def main(eventslist, neweventlen, deadline):
    '''
    Parameters:
        eventslist: a list (array? tuple? dict?) of existing events' start and 
        end times that are between now and the deadline
        neweventlen: the duration of the new event
        deadline: the due date/time
        All time should be in number of milliseconds since Jan 1, 1970 
        00:00:00 UTC 
    Returns:
        The start and end times of the new event
    '''
    """ Ver1: try to find a single chunk of time that works """

    # Half hour time slots
    slot_size = 1800 

    # Current epoch time
    current_time = int(time.time()) 

    # Round current time to nearest half hour in the future
    current_time += slot_size - (int(time.time()) % slot_size) 

    # Duration of the new event in terms of number of slots it takes
    time_slots_needed = neweventlen / 1800 

    # Loop through all events and fill each entry with a list of 
    # half hour slots that that event fills
    unavail_time_slots = set()
    for i, (start, end) in enumerate(eventslist):
        # Round start time down and end time up if need be 
        if (start % slot_size != 0):
            start -= start % slot_size
        if (end   % slot_size != 0):
            end   += slot_size (end % slot_size)
        unavail_time_slots = unavail_time_slots | set(range(start, end, slot_size))

    
    # Loop through time slots between now and deadline to find
    # possible time slots
    avail_time_slots = []
    for i in range(current_time, deadline, slot_size):
        if i not in unavail_time_slots:
            avail_time_slots.append(i)

    # For debugging purposes
    print avail_time_slots
    pprint([time.strftime('%Y-%m-%d %H:%M:%S', time.localtime(a)) for a in avail_time_slots])

    # TODO: Prioritize the time frame 10am - 10pm
    # TODO: maybe change to generator
    for time in avail_time_slots:
        return jsonify("start_time": time, 
                       "end_time": time_slots_needed * slot_size)

'''
if __name__ == "__main__":
    deadline = 1477418400 # Oct 25, 2016, 2pm
    duration = 7200 # Two hours
    main(example, duration, deadline)
'''
app = Flask(__name__)
@app.route('/generate', methods['GET'])
def generateSchedule():
    if not request.json:
        abort(400)
    return main()