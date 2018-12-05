// hàm validate trước khi nhấn nút Submit
function SubmitBtn()
{
	if (checkEmpty() == true)
	{
		return false;
	}
	else if (isEmail(document.getElementById("youremail").value) == false)
	{
		alert("Email không hợp lệ hoặc có chứa khoảng trắng");
		document.getElementById("youremail").focus();
		return false;
	}
	else if (checkPWLen() == true)
	{
		alert("Mật khẩu phải từ 6 ký tự trở lên.");
		document.getElementById("password").focus();
		return false;
	}
	else if (checkSamePW() == false)
	{
		alert("Mật khẩu không trùng khớp.");
		return false;
	}
	else if (checkSpecialLetter() == false)
	{
		return false;
	}
	alert("Xin chúc mừng ! Bạn đã trở thành thành viên của Rabbit");
	return true;
}

// kiểm tra trống
function checkEmpty()
{
	var firstName = document.forms["regForm"]["firstname"].value;
	var lastName = document.forms["regForm"]["lastname"].value;
	var email = document.forms["regForm"]["youremail"].value;
	var address = document.forms["regForm"]["address"].value;
	var userName = document.forms["regForm"]["username"].value;
	var passWord = document.forms["regForm"]["password"].value;
	var retypePassword = document.forms["regForm"]["retypepassword"].value;
	var male = document.getElementById("Male");
	var female = document.getElementById("Female");

	if (firstName == "" && lastName == "" && email == "" && address == "" && userName == "" && 
		passWord == "" && retypePassword == "")
	{
		alert("Bạn chưa nhập đủ thông tin.");
		return true;
	}
	else if (firstName == "")
	{
		alert("Bạn chưa nhập họ.");
		document.getElementById("firstname").focus();
		return true;
	}
	else if (lastName == "")
	{
		alert("Bạn chưa nhập tên.");
		document.getElementById("lastname").focus();
		return true;
	}
	else if (email == "")
	{
		alert("Bạn chưa nhập địa chỉ email.");
		document.getElementById("youremail").focus();
		return true;
	}
	else if (address == "")
	{
		alert("Bạn chưa nhập địa chỉ.");
		document.getElementById("address").focus();
		return true;
	}
	else if (userName == "")
	{
		alert("Bạn chưa nhập tên đăng nhập.");
		document.getElementById("username").focus();
		return true;
	}
	else if (passWord == "")
	{
		alert("Bạn chưa nhập mật khẩu.");
		document.getElementById("password").focus();
		return true;
	}
	else if (retypePassword == "")
	{
		alert("Bạn chưa nhập lại mật khẩu.");
		document.getElementById("retypepassword").focus();
		return true;
	}
	else if (male.checked == false && female.checked == false)
	{
		alert("Bạn là nam hay nữ ?");
		return true;
	}
	return false;
}

// kiểm tra khớp mật khẩu trong ô nhập lại mật khẩu
function checkSamePW()
{
	var passWord = document.getElementById("password").value;
	var retypePassword = document.getElementById("retypepassword").value;
	// kiểm tra mật khẩu nhập lại có trống hay không
	if (passWord == retypePassword)
	{
		return true;
	}
	return false;
}

// kiểm tra độ dài của mật khẩu < 6
function checkPWLen()
{
	var passWord = document.getElementById("password").value;
	if (passWord.length < 6)
	{
		return true;
	}
	return false;
}

// kiểm tra email có hợp lệ hay không (Google)
function isEmail(emailStr) 
{
	var emailPat = /^(.+)@(.+)$/;
	var specialChars = "\\(\\)<>@,;:\\\\\\\"\\.\\[\\]";
	var validChars = "\[^\\s" + specialChars + "\]";
	var quotedUser = "(\"[^\"]*\")";
	var ipDomainPat = /^\[(\d{1,3})\.(\d{1,3})\.(\d{1,3})\.(\d{1,3})\]$/;
	var atom = validChars + '+';
	var word = "(" + atom + "|" + quotedUser + ")";
	var userPat = new RegExp("^" + word + "(\\." + word + ")*$");
	var domainPat = new RegExp("^" + atom + "(\\." + atom +")*$");
	var matchArray = emailStr.match(emailPat);
	if (matchArray == null) 
	{
		return false;
	}
	var user = matchArray[1];
	var domain = matchArray[2];
    // See if "user" is valid
    if (user.match(userPat) == null) {
    	return false;
    }
    var IPArray = domain.match(ipDomainPat);
    if (IPArray != null)
    {
        // this is an IP address
        for (var i = 1;i <= 4;i++)
        {
        	if (IPArray[i] > 255) 
        	{
        		return false;
        	}
        }
        return true;
    }
    var domainArray = domain.match(domainPat)
    if (domainArray == null)
    {
    	return false;
    }
    var atomPat = new RegExp(atom,"g");
    var domArr = domain.match(atomPat);
    var len = domArr.length;
    if (domArr[domArr.length-1].length < 2 || domArr[domArr.length-1].length > 3) 
    {
    	return false;
	}
    // Make sure there's a host name preceding the domain.
    if (len < 2) 
    {
        return false;
    }
    // If we've gotten this far, everything's valid!
    return true;
}

// Google (đổi tiếng Việt có dấu sang không dấu)
function change_alias(alias) {
    var str = alias;
    str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, "a");
    str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, "e");
    str = str.replace(/ì|í|ị|ỉ|ĩ/g, "i");
    str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, "o");
    str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, "u");
    str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, "y");
    str = str.replace(/đ/g, "d");
    str = str.replace(/À|Á|Ạ|Ả|Ã|Â|Ầ|Ấ|Ậ|Ẩ|Ẫ|Ă|Ằ|Ắ|Ặ|Ẳ|Ẵ/g, "A");
    str = str.replace(/È|É|Ẹ|Ẻ|Ẽ|Ê|Ề|Ế|Ệ|Ể|Ễ/g, "E");
    str = str.replace(/Ì|Í|Ị|Ỉ|Ĩ/g, "I");
    str = str.replace(/Ò|Ó|Ọ|Ỏ|Õ|Ô|Ồ|Ố|Ộ|Ổ|Ỗ|Ơ|Ờ|Ớ|Ợ|Ở|Ỡ/g, "O");
    str = str.replace(/Ù|Ú|Ụ|Ủ|Ũ|Ư|Ừ|Ứ|Ự|Ử|Ữ/g, "U");
    str = str.replace(/Ỳ|Ý|Ỵ|Ỷ|Ỹ/g, "Y");
    str = str.replace(/Đ/g, "D");
    return str;
}


// kiểm tra có các ký tự đặc biệt trong text (Google)
function checkSpecialLetter() {
	var firstName = document.getElementById("firstname").value;
	var lastName = document.getElementById("lastname").value;
	var userName = document.getElementById("username").value;
	
	// chuyển chữ có dấu sang không dấu
	var fN = change_alias(firstName);
	var lN = change_alias(lastName);

	// regular expression
    var re1 = /^[a-zA-Z ]+$/;
    var re2 = /^[\w]+$/;

    // validation fails if the input doesn't match our regular expression
    if(!re1.test(fN) || !re1.test(lN))
    {
      alert("Họ và tên không được chứa ký tự đặc biệt và chữ số.");
      return false;
    }
    else if (!re2.test(userName))
    {
    	alert("Tên đăng nhập không được chứa ký tự đặc biệt.");
    	document.getElementById("username").focus();
    	return false;
    }
    // validation was successful
    return true;
}