
/*....................................savecustomer........................*/
$("#btnCustomerSave").click(function () {
    let alert = confirm("Do you want save");
    if (alert) {
        addCustomer();
        loadAllCustomer();
    }
    genCusID();
});

function addCustomer() {
    let CustomerId = $("#txtCusID").val();
    let Customername = $("#txtCusName").val();
    let Customeraddress = $("#txtaddress").val();
    let CustomerContact = $("#txtcontact").val();

    var customer = new customerDTO(CustomerId, Customername, Customeraddress, CustomerContact);
    customerDB.push(customer);

}

function loadAllCustomer() {
    $("#custablebody").empty();
    for (var i = 0; i < customerDB.length; i++) {
        let row = `<tr><td>${customerDB[i].getID()}</td><td>${customerDB[i].getname()}</td><td>${customerDB[i].getaddress()}</td><td>${customerDB[i].getcontactno()}</td></tr>`;
        $("#custablebody").append(row);
    }
}

/*......................update customer...................................*/
$("#btnCustomerupdate").click(function () {
    let customerId = $("#txtCusID").val();
    UpdateCustomer(customerId);
    genCusID();
});

function UpdateCustomer(CId) {
    let id = $("#txtCusID").val();
    let name = $("#txtCusName").val();
    let address = $("#txtaddress").val();
    let contact = $("#txtcontact").val();

    for (var i=0; i<customerDB.length;i++){
        if (customerDB[i].getID()==CId){
            customerDB[i].setID(id);
            customerDB[i].setname(name);
            customerDB[i].setaddress(address);
            customerDB[i].setcontactno(contact);

            loadAllCustomer();
        }
    }
}

/*......................search customer.................................*/
$("#btnCustomerSearch").click(function () {
var CustomerId=$("#txtCusID").val();
    SearchCustomer(CustomerId);
   
});
function SearchCustomer(id) {
    for (var i=0; i<customerDB.length;i++){
        if (customerDB[i].getID()==id){
            $("#txtCusID").val(customerDB[i].getID());
            $("#txtCusName").val(customerDB[i].getname());
            $("#txtaddress").val(customerDB[i].getaddress());
            $("#txtcontact").val(customerDB[i].getcontactno());


        }
    }

}

/*...........................delete customer......................*/
$("#btnCustomerDelete").click(function () {
    let alert3=confirm("Do you want to Delete");
   if (alert3) {
       DeleteCustomer();
   }
});
function DeleteCustomer(id) {
    var searchCustomer=$("#txtCusID").val();
    for (var i=0; i<customerDB.length;i++){
        if(customerDB[i].getID()==searchCustomer){
            customerDB.splice(i, 1);
            loadAllCustomer();
            genCusID();
        }
    }

}
/*...........................other method......................*/
function genCusID() {
    if (customerDB.length == 0) {
        $("#txtCusID").val("C00-0001");
    } else if (customerDB.length > 0) {
        var code = customerDB[customerDB.length - 1].getID().split("-")[1];
        var tempCode = parseInt(code);
        tempCode = tempCode + 1;
        if (tempCode <= 9) {
            $("#txtCusID").val("C00-000" + tempCode);
        } else if (tempCode <= 99) {
            $("#txtCusID").val("C00-00" + tempCode);
        } else if (tempCode <= 999) {
            $("#txtCusID").val("C00-0" + tempCode);
        } else if (tempCode <= 9999) {
            $("#txtCusID").val("C00-" + tempCode);
        }
    }

}
$("#Customerpage").click(function () {
    genCusID();
})

/*...........................customer validation......................*/
const cusIDRegEx = /^(C00-)[0-9]{1,4}$/;
const cusNameRegEx = /^[A-z ]{5,20}$/;
const cusAddressRegEx = /^[0-9/A-z.]{7,}$/;
const cusSalaryRegEx = /^[076][0-9]$/;


$('#txtCusID,#txtCusName,#txtaddress,#txtcontact').on('keydown', function (eventOb) {
    if (eventOb.key == "Tab") {
        eventOb.preventDefault(); // stop execution of the button
    }
});

$('#txtCusID,#txtCusName,#txtaddress,#txtcontact').on('blur', function () {
    formValid();
});

//focusing events
$("#txtCusID").on('keyup', function (eventOb) {
    setButtonC();
    if (eventOb.key == "Enter") {
        checkIfValid();
    }

    if (eventOb.key == "Control") {
        var typedCustomerID = $("#txtCusID").val();
        var srcCustomer = searchCustomerFromID(typedCustomerID);
        $("#txtCusID").val(srcCustomer.getCustomerID());
        $("#txtCusName").val(srcCustomer.getCustomerName());
        $("#txtaddress").val(srcCustomer.getCustomerAddress());
        $("#txtcontact").val(srcCustomer.getCustomerContactno());
    }


});

$("#txtCusName").on('keyup', function (eventOb) {
    setButtonC();
    if (eventOb.key == "Enter") {
        checkIfValid();
    }
});

$("#txtaddress").on('keyup', function (eventOb) {
    setButtonC();
    if (eventOb.key == "Enter") {
        checkIfValidCustomer();
    }
});

$("#txtcontact").on('keyup', function (eventOb) {
    setButtonC();
    if (eventOb.key == "Enter") {
        checkIfValidCustomer();
    }
});
// focusing events end
$("#btnCustomerSave").attr('disabled', false);

function clearAllCustomer() {
    $('#txtCusID,#txtCusName,#txtaddress,#txtcontact').val("");
    $('#txtCusID,#txtCusName,#txtaddress,#txtcontact').css('border', '2px solid #ced4da');
    $('#txtCusID').focus();
    $("#btnCustomerSave").attr('disabled', true);
    loadAllCustomer();
    $("#lblcusid,#lblcusname,#lblcusaddress,#lblContact").text("");
}

function formValidCustomer() {
    var cusID = $("#txtCusID").val();
    $("#txtCusID").css('border', '2px solid green');
    $("#lblcusid").text("");
    if (cusIDRegEx.test(cusID)) {
        var cusName = $("#txtCusName").val();
        if (cusNameRegEx.test(cusName)) {
            $("#txtCusName").css('border', '2px solid green');
            $("#lblcusname").text("");
            var cusAddress = $("#txtaddress").val();
            if (cusAddressRegEx.test(cusAddress)) {
                var Contact = $("#txtcontact").val();
                var resp = cusSalaryRegEx.test(Contact);
                $("#txtaddress").css('border', '2px solid green');
                $("#lblcusaddress").text("");
                if (resp) {
                    $("#txtcontact").css('border', '2px solid green');
                    $("#lblContact").text("");
                    return true;
                } else {
                    $("#txtcontact").css('border', '2px solid red');
                    $("#lblContact").text("Cus Contact no is a required field : contact should be 10 number");
                    return false;
                }
            } else {
                $("#txtaddress").css('border', '2px solid red');
                $("#lblcusaddress").text("Cus Name is a required field : Minimum 7");
                return false;
            }
        } else {
            $("#txtCusName").css('border', '2px solid red');
            $("#lblcusname").text("Cus Name is a required field : Minimum 5, Max 20, Spaces Allowed");
            return false;
        }
    } else {
        $("#txtCusID").css('border', '2px solid red');
        $("#lblcusid").text("Cus ID is a required field : Pattern C00-000");
        return false;
    }
}

function checkIfValidCustomer() {
    var cusID = $("#txtCusID").val();
    if (cusIDRegEx.test(cusID)) {
        $("#txtCusName").focus();
        var cusName = $("#txtCusName").val();
        if (cusNameRegEx.test(cusName)) {
            $("#txtaddress").focus();
            var cusAddress = $("#txtCusAddress").val();
            if (cusAddressRegEx.test(cusAddress)) {
                $("#txtcontact").focus();
                var cusSalary = $("#txtcontact").val();
                var resp = cusSalaryRegEx.test(cusSalary);
                if (resp) {
                    let resCus = confirm("Do you really need to add this Customer..?");
                    if (resCus) {
                        addCustomer();
                        clearAllCustomer();
                    }
                } else {
                    $("#txtcontact").focus();
                }
            } else {
                $("#txtaddress").focus();
            }
        } else {
            $("#txtCusName").focus();
        }
    } else {
        $("#txtCusID").focus();
    }
}

function setButtonC() {
    let b = formValidCustomer();
    if (b) {
        $("#btnCustomerSave").attr('disabled', false);
    } else {
        $("#btnCustomerSave").attr('disabled', true);
    }
}

$('#btnCustomerSave').click(function () {
    checkIfValidCustomer();
});




