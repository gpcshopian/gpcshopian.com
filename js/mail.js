/* 
    jQuery, SweetAlert & SMTPJS
    must be loaded beforehand to use this file.
*/   

function onSubmitEmail(event, to, subject) {
    event.preventDefault();
    var submit = null;
    for (let i = 0; i < event.target.length; i++) {
        if (event.target[i].type === "submit") {
            submit = $(event.target[i]);
            submit.attr('disabled', true);
        }
    }
    var elements = event.target.elements;
    Email.send("\"" + elements.name.value + "\"" + " <" + elements.email.value + ">",
                to,
                subject,
                elements.message.value + (elements.phone ? ' Ph: ' + elements.phone.value + '.' : ''),
                // ElasticMail - '7d662b08-e390-4e64-a593-13386e692b76'
                { 
                    token: '7d662b08-e390-4e64-a593-13386e692b76', 
                    callback(message) {
                        submit.attr('disabled', false);
                        if (message === 'OK') {
                            swal('Success!', 'Your message is successfully sent to us. Authorized teams will get back to you shortly.', 'success');
                            return;
                        }
                        console.log(message);
                        swal('Error!', 'Something bad happened. Please try again.', 'error');
                }}
    )
    return true;
}