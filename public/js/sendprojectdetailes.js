const button = document.getElementById('sendmessage');
button.addEventListener('click', function(e) {
  console.log('button was clicked');
    let project = {
        name: document.getElementById('name').value,
        description: document.getElementById('description').value,
        nameowner: document.getElementById('nameowner').value,
        giturl:document.getElementById('giturl').value,

    };
    if (checkEmptyString(project.name))
    {
        alert('Name is required');
        return;
    }
    if (checkEmptyString(project.description))
    {
        alert('Email is required');
        return;
    }
    if (checkEmptyString(project.nameowner))
    {
        alert('message is required');
        return;
    }
    $.ajax({
        type: "POST",
        url: "/sendprojectdetailes",
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
        data: project
    });
});

function checkEmptyString(val)
{
    return (val == undefined || val == null || val.trim().length == 0);
}
