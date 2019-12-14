Grain Cart Upload

For a 4-minute tutorial: https://youtu.be/75wbA9eWlk4

Description: This tool takes in pasted excel data automatically fills out web elements on a page. This is currently used to bulk-upload tickets for existing customers.

How it works

- Executing the grainCart_upload.py script prompts the user to supply the account name to log into, and to paste all excel cells necessary to complete the ticket.
- Variables are then created and formatted based on the supplied data. A selenium browser opens, and javascript files execute to fill out the data sequentially.