document.getElementById('messageForm').addEventListener('submit', function (e) {
    e.preventDefault();
    
    // Get user input
    const name = document.getElementById('name').value;
    const message = document.getElementById('message').value;
    
    // Create the message to send to the webhook
    const data = JSON.stringify({
        username: name,
        content: message
    });

    // Replace 'YOUR_WEBHOOK_URL' with your actual webhook URL
    const webhookUrl = 'https://discord.com/api/webhooks/1163928911286112277/dRvbtABOV_cY2dp4OEwQbJVBUE_YpxnDJtAqB9P75a127mnIGWwc0l2dkubx6TbSECLi';

    // Send the message to the Discord webhook
    fetch(webhookUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: data
    }).then(response => {
        if (response.status === 204) {
            alert('Message sent successfully.');
            // You can clear the form or perform any other actions here
        } else {
            alert('An error occurred while sending the message.');
        }
    });
});