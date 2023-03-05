import path from "path";
import fs from "fs";


function buildPath() {
    return path.join(process.cwd(), 'data', 'data.json');

}

function extractData(filePath) {
    const jsonData = fs.readFileSync(filePath);
    return JSON.parse(jsonData);
}

export default async function handler(req, res) {
    const {method} = req;
    // access our data from the request body
    // extract the email and eventId from the request body
    // AllEvents - loop through the events and find the event with the id that matches the eventId
    // if the event is found, add the email to the event's registeredEmails array
    // if the event is not found, return an error - res.status(404).json({message: "Event not found!"});
    // return a response with a message
    const filePath = buildPath();
    const { events_categories, allEvents } = extractData(filePath);

    if (!allEvents) {
        return res.status(404).json({
            status: 404,
            message: 'Events data not found',
        });
    }

    if (method === 'POST') {
        const { email, eventId } = req.body;

        if(!email || !email.includes('@')) {
            res.status(422).json({status: 422, message: "Invalid email address"});
            return
        }

        if (!email || !email.includes('@')) {
            res.status(422).json({ status: 422, message: 'Invalid email address' });
        }

        const newAllEvents = allEvents.map((ev) => {
            if (ev.id === eventId) {
                if (ev.emails_registered.includes(email)) {
                    res.status(409).json({ status: 409, message: 'This email has already been registered' });
                    return ev;
                }
                return {
                    ...ev,
                    emails_registered: [...ev.emails_registered, email],
                };
            }
            return ev;
        });

        const fsp = require('fs/promises');
        await fsp.writeFile(filePath, JSON.stringify({ events_categories, allEvents: newAllEvents }));

        res.status(201).json({
            message: `You have been registered successfully with the email: ${email} for the event: ${eventId}`,
        });
    }
}

/*
 export default  function  handler(req, res) {
 const  {email} = req.body;
 if  (!email) {
 res.status(422).json({message:  "Invalid email address."  });
 return ;
 }
 res.status(201).json({message:  "Successfully registered!"  });
 }*/
