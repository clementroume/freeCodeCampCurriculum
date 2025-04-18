#!/opt/homebrew/bin/python3

def add_time(start, duration, day=None):
    week_days = [
        "Monday", "Tuesday", "Wednesday",
        "Thursday", "Friday", "Saturday", "Sunday"
    ]

    start_time, period = start.split()
    start_hour, start_minute = map(int, start_time.split(':'))

    if period.upper() == 'PM' and start_hour != 12:
        start_hour += 12
    elif period.upper() == 'AM' and start_hour == 12:
        start_hour = 0

    duration_hour, duration_minute = map(int, duration.split(':'))

    total_minutes = start_minute + duration_minute
    total_hours = start_hour + duration_hour + total_minutes // 60
    final_minutes = total_minutes % 60
    final_hours_24 = total_hours % 24
    days_later = total_hours // 24

    final_period = "AM" if final_hours_24 < 12 else "PM"
    final_hours_12 = final_hours_24 % 12
    if final_hours_12 == 0:
        final_hours_12 = 12

    final_minutes_str = f"{final_minutes:02d}"

    if day:
        day_index = week_days.index(day.capitalize())
        final_day = week_days[(day_index + days_later) % 7]
        day_str = f", {final_day}"
    else:
        day_str = ""

    if days_later == 1:
        later_str = " (next day)"
    elif days_later > 1:
        later_str = f" ({days_later} days later)"
    else:
        later_str = ""

    result = (
        f"{final_hours_12}:{final_minutes_str} {final_period}"
        f"{day_str}{later_str}"
    )
    return result


if __name__ == '__main__':
    print(add_time('3:00 PM', '3:10'))  # Returns: 6:10 PM
    print(add_time('11:30 AM', '2:32', 'Monday'))  # Returns: 2:02 PM, Monday
    print(add_time('11:43 AM', '00:20'))  # Returns: 12:03 PM
    print(add_time('10:10 PM', '3:30'))  # Returns: 1:40 AM (next day)
    print(add_time('11:43 PM',
                   '24:20',
                   'tueSday'))  # Returns: 12:03 AM, Thursday (2 days later)
    print(add_time('6:30 PM', '205:12'))  # Returns: 7:42 AM (9 days later)
