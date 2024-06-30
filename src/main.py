def handler(event, context):


    
    logger.info("An event received %s" % (event))
    
    html = f"<html>"
    html = html + f"<h3>Name: {event['alarmData']['alarmName']}</h3>"
    html = html + f"<h3>Status: {event['alarmData']['state']['value']}</h3>"
    html = html + f"<h3>Reason: {event['alarmData']['state']['reason']}</h3>"
    html = html + f"</html>"
    
    subject = f"Cloudwatch - {event['alarmData']['alarmName']} - {event['alarmData']['state']['value']}"
    
    sesmail(subject,html,'vipinable@gmail.com')
    
    return None
