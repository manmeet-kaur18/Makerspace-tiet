$( document ).ready(function() {
    var projectmain =  document.getElementById('rowproject').value;
    $.ajax({
        type: "GET",
        url: "/getprojectdetailes",
        dataType: "json",
        success: function (msg) {
            console.log(msg);
        if (msg.length) {

            for (var x = 0; x < msg.length; x++) {
                var divcolumn = document.createElement('div');
                var divsingle = document.createElement('div');
                var heading = document.createElement('h3');     
                var para = document.createElement('para');                         
                var anchor = document.createElement('a');

                divcolumn.setAttribute('class','offset-lg-1 col-lg-4 col-md-6');
                divsingle.setAttribute('class','single_work_demo')
                heading.textContent = msg[x].name;
                para.textContent = msg[x].description;
                anchor.textContent=msg[x].nameowner;
                anchor.href = msg[x].giturl;

                divsingle.appendChild(heading);
                divsingle.appendChild(para);
                divsingle.appendChild(anchor);

                divcolumn.appendChild(divsingle);

                projectmain.appendChild(divcolumn);

            }
        }
            else {
                // alert("No projects to display yet!");
            }
        },
    });
});