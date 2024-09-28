function htmlEncode(input) {
    return input
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;');
}
function clearFormGroupFields() {
  // Select all elements with class 'form-group'
  const formGroups = document.querySelectorAll('.form-group');
  
  // Iterate through each form-group
  formGroups.forEach(group => {
    // Find input elements within the form-group
    const inputs = group.querySelectorAll('input[type="text"], input[type="email"], textarea');
    
    // Clear the value of each input
    inputs.forEach(input => {
      input.value = '';
    });
  });
  document.getElementById('submitEmailBtn').setAttribute("disabled", true);
}



async function postNotification(notification) {
    document.getElementById('emailFailed').setAttribute("hidden", true);
    document.getElementById('emailSent').setAttribute("hidden", true);
    
    let serviceId = 'service_nvfsdog';
    let templateId = 'template_560mmci';
    
    let responseData = await emailjs.send(serviceId,templateId, notification);
    if(responseData.status !== 200) {
        console.log(responseData.status);
        document.getElementById('emailFailed').removeAttribute("hidden");
        return
    }
    
    document.getElementById('emailSent').removeAttribute("hidden");
    clearFormGroupFields();
}

let formDocument = document.getElementById('contact-form');
if(formDocument){
    formDocument.addEventListener('keyup', function(event) {
        var isValid = () => {
            const emailRegex = /^[a-z0-9]+@[a-z]+\.[a-z]{2,3}$/;
            let email = document.getElementById('email').value
            return document.getElementById('name').value !== ""
                && email !== ""
                && document.getElementById('message').value !== ""
                && emailRegex.test(email);
        }
        if(isValid) {
            document.getElementById('submitEmailBtn').removeAttribute("disabled");
        }
    });
}

let notificationButtonId = document.getElementById('submitEmailBtn');
if(notificationButtonId){
    notificationButtonId.addEventListener('click',function(event){
        
        let fromName = document.getElementById('name').value;
        let fromEmail = document.getElementById('email').value;
        let message = document.getElementById('message').value;
        const notification = {
            name: htmlEncode(fromName),
            from: htmlEncode(fromEmail),
            reply_to: htmlEncode(fromEmail),
            message: htmlEncode(message)
        }
       if(notification.name === "" || notification.from ===""){
           console.log("Email couldn't be sent")
           return
       }
        postNotification(notification)
        
    });
}

