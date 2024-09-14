function onLoadCallback() {
    grecaptcha.render('div-recaptcha', {
        sitekey: '6LcZi0AqAAAAAF2_KgPTc1lVjwBul67tA96R8Xq3',
        callback: successCallback,
    });
}

function successCallback(response) {
    recaptchaResponse = response;
    console.log(recaptchaResponse);
}