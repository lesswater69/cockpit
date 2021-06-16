const reseller = document.getElementById("reseller");
const org_name = document.getElementById("org_name");
const output = document.getElementById("output");
const result = document.getElementById("result");
const button = document.getElementById("create");
var hyphen = "-";
var strSuffix = "-o365";


function awscli_run() {
    var strORG = org_name.value.toLowerCase();
    var strResell = reseller.value.toLowerCase();
    var bucketname = strResell.concat(hyphen.concat(strORG.concat(strSuffix)));
    //cockpit.spawn(["/bin/aws", "--endpoint-url", "https://s3-west.vmbackup.ca", "s3api", "create-bucket", "--region", "west", "--bucket", reseller.value.toLowerCase(),"-",org_name.value.toLowerCase(),"-o365"])
    //cockpit.spawn(["echo", bucketname])    
    cockpit.spawn(["/bin/aws", "help"])
    .stream(awscli_output)
        .then(awscli_success)
        .catch(awscli_fail);

    result.innerHTML = "";
    output.innerHTML = "";
}

function awscli_success() {
    result.style.color = "green";
    result.innerHTML = "success";
}

function awscli_fail() {
    result.style.color = "red";
    result.innerHTML = "fail";
}

function awscli_output(data) {
    output.append(document.createTextNode(data));
}

// Connect the button to starting the "create" process
button.addEventListener("click", awscli_run);

// Send a 'init' message.  This tells integration tests that we are ready to go
cockpit.transport.wait(function() { });
