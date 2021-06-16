const reseller = document.getElementById("reseller");
const org_name = document.getElementById("org_name");
const output = document.getElementById("output");
const result = document.getElementById("result");
const button = document.getElementById("create");

function aws-cli_run() {
    cockpit.spawn(["aws", "--endpoint-url", "https://s3-west.vmbackup.ca", "s3api", "create-bucket", "--region", "west", "--bucket", reseller.value.toLowerCase(),"-",org_name.value.toLowerCase(),"-o365"])
        .stream(aws-cli_output)
        .then(aws-cli_success)
        .catch(aws-cli_fail);

    result.innerHTML = "";
    output.innerHTML = "";
}

function aws-cli_success() {
    result.style.color = "green";
    result.innerHTML = "success";
}

function aws-cli_fail() {
    result.style.color = "red";
    result.innerHTML = "fail";
}

function aws-cli_output(data) {
    output.append(document.createTextNode(data));
}

// Connect the button to starting the "create" process
button.addEventListener("click", aws-cli_run);

// Send a 'init' message.  This tells integration tests that we are ready to go
cockpit.transport.wait(function() { });
