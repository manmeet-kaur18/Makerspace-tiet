const button = document.getElementById('sendmessage');
button.addEventListener('click', function(e) {
  console.log('button was clicked');
    let message = {
        name: document.getElementById('name').value,
        email: document.getElementById('email').value,
        message: document.getElementById('message').value
    };
    if (checkEmptyString(message.name))
    {
        alert('Name is required');
        return;
    }
    if (checkEmptyString(message.email))
    {
        alert('Email is required');
        return;
    }
    if (checkEmptyString(message.message))
    {
        alert('message is required');
        return;
    }
    $.ajax({
        type: "POST",
        url: "/sendmessage",
        dataType: "json",
        success: function (msg) {
            if (msg.length > 0 && msg[0].status == true) {
                alert(msg[0].message);
                location.href='/';
            }
            else {
                alert("Something went wrong please try again !");
            }
        },
        data: message
    });
});

function checkEmptyString(val)
{
    return (val == undefined || val == null || val.trim().length == 0);
}
