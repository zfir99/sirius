const fetch = require('node-fetch');
var randomize = require('randomatic');
var random = require('random-name');

var keyOtp = '125893Ub94d76db2f267d52c42e5bb0dd98deb3' // api key smshub
var reffCode = ''

const functionGetNumber = () => new Promise((resolve, reject) => {
    fetch(`https://smshub.org/stubs/handler_api.php?api_key=${keyOtp}&action=getNumber&service=aj&operator=&country=6`, { 
        method: 'GET'
    })
    .then(res => res.text())
    .then(result => {
        resolve(result);
    })
    .catch(err => reject(err))
});

const functionChangeConfirm = (idOrder) => new Promise((resolve, reject) => {
    fetch(`https://smshub.org/stubs/handler_api.php?api_key=${keyOtp}&action=setStatus&status=6&id=${idOrder}`, { 
        method: 'GET'
    })
    .then(res => res.text())
    .then(result => {
        resolve(result);
    })
    .catch(err => reject(err))
});

const functionChangeCancel = (idOrder) => new Promise((resolve, reject) => {
    fetch(`https://smshub.org/stubs/handler_api.php?api_key=${keyOtp}&action=setStatus&status=8&id=${idOrder}`, { 
        method: 'GET'
    })
    .then(res => res.text())
    .then(result => {
        resolve(result);
    })
    .catch(err => reject(err))
});

const functionGetOtp = (idOrder) => new Promise((resolve, reject) => {
    fetch(`https://smshub.org/stubs/handler_api.php?api_key=${keyOtp}&action=getStatus&id=${idOrder}`, { 
        method: 'GET'
    })
    .then(res => res.text())
    .then(result => {
        resolve(result);
    })
    .catch(err => reject(err))
});

const functionGetBalance = () => new Promise((resolve, reject) => {
    fetch(`https://smshub.org/stubs/handler_api.php?api_key=${keyOtp}&action=getBalance`, { 
        method: 'GET'
    })
    .then(res => res.text())
    .then(result => {
        resolve(result);
    })
    .catch(err => reject(err))
});

const functionGenerateSession = (deviceId, nomor) => new Promise((resolve, reject) => {

    const bodys = {
        "brand": "OneAset",
        "deviceId": deviceId,
        "mobile": `0${nomor}`
    }

    fetch('https://apac2-auth-api.capillarytech.com/auth/v1/token/generate', { 
        method: 'POST',
        body: JSON.stringify(bodys),
        headers: {
            'Accept': 'application/json',
            'cap_brand': 'SHELLINDONESIALIVE',
            'cap_device_id': deviceId,
            'cap_mobile': '',
            'Content-Type': 'application/json; charset=UTF-8',
            'Content-Length': 166,
            'Host': 'apac2-auth-api.capillarytech.com',
            'Connection': 'Keep-Alive',
            'Accept-Encoding': 'gzip',
            'User-Agent': 'okhttp/3.14.9'
        }
    })
    .then(res => res.json())
    .then(result => {
        resolve(result);
    })
    .catch(err => reject(err))
});

const functionSendOtp = (deviceId, nomor, sessionId) => new Promise((resolve, reject) => {

    const bodys = {
        "brand":"SHELLINDONESIALIVE",
        "deviceId":deviceId,
        "mobile":`0${nomor}`,
        "mobile_temp":`0 ${nomor}`,
        "sessionId":`${sessionId}`
    }

    fetch('https://apac2-auth-api.capillarytech.com/auth/v1/otp/generate', { 
        method: 'POST',
        body: JSON.stringify(bodys),
        headers: {
            'Accept': 'application/json',
            'cap_brand': 'SHELLINDONESIALIVE',
            'cap_device_id': deviceId,
            'cap_mobile': '',
            'Content-Type': 'application/json; charset=UTF-8',
            'Content-Length': 166,
            'Host': 'apac2-auth-api.capillarytech.com',
            'Connection': 'Keep-Alive',
            'Accept-Encoding': 'gzip',
            'User-Agent': 'okhttp/3.14.9'
        }
    })
    .then(res => res.json())
    .then(result => {
        resolve(result);
    })
    .catch(err => reject(err))
});

const functionVerifOtp = (deviceId, nomor, sessionId, otp) => new Promise((resolve, reject) => {

    const bodys = {
        "brand":"SHELLINDONESIALIVE",
        "deviceId":deviceId,
        "mobile":`62${nomor}`,
        "mobile_temp":`+62 ${nomor}`,
        "otp": otp,
        "sessionId":`${sessionId}`
    }

    fetch('https://apac2-auth-api.capillarytech.com/auth/v1/otp/validate', { 
        method: 'POST',
        body: JSON.stringify(bodys),
        headers: {
            'Accept': 'application/json',
            'cap_brand': 'SHELLINDONESIALIVE',
            'cap_device_id': deviceId,
            'cap_mobile': '',
            'Content-Type': 'application/json; charset=UTF-8',
            'Content-Length': 166,
            'Host': 'apac2-auth-api.capillarytech.com',
            'Connection': 'Keep-Alive',
            'Accept-Encoding': 'gzip',
            'User-Agent': 'okhttp/3.14.9'
        }
    })
    .then(res => res.json())
    .then(result => {
        resolve(result);
    })
    .catch(err => reject(err))
});

const functionRegist = (deviceId, nomor, token) => new Promise((resolve, reject) => {

    const bodys = {
        "extendedFields":{
            "acquisition_channel":
            "mobileApp",
            "dob":"2000/08/20",
            "verification_status":"false"
        },
        "loyaltyInfo":{
            "loyaltyType":"loyalty"
        },"profiles":[{
            "fields":{
                "onboarding":"pending",
                "app_privacy_policy":"1",
                "goplus_tnc":"1"
            },
            "firstName":random.first(),
            "identifiers":[{
                "type":"mobile",
                "value":`62${nomor}`
            },{
                "type":"email",
                "value":`${random.first()}${randomize('5')}@gmail.com`
            }],
            "lastName":random.last()
        }],
        "referralCode":reffCode,
        "statusLabel":"Active",
        "statusLabelReason":"App Registration"
    }

    fetch('https://apac2-api-gateway.capillarytech.com/mobile/v2/api/v2/customers', { 
        method: 'POST',
        body: JSON.stringify(bodys),
        headers: {
            'Accept': 'application/json',
            'cap_authorization': token,
            'cap_brand': 'SHELLINDONESIALIVE',
            'cap_device_id': deviceId,
            'cap_mobile': `62${nomor}`,
            'Content-Type': 'application/json; charset=UTF-8',
            'Content-Length': 166,
            'Host': 'apac2-auth-api.capillarytech.com',
            'Connection': 'Keep-Alive',
            'Accept-Encoding': 'gzip',
            'User-Agent': 'okhttp/3.14.9'
        }
    })
    .then(res => res.json())
    .then(result => {
        resolve(result);
    })
    .catch(err => reject(err))
});

(async () => {
   while(true){
        try {

            do {
                var getBalance = await functionGetBalance()
            } while(!getBalance.includes('ACCESS_BALANCE'))

            const balance = getBalance.split(':')[1]

            if(balance >= 7){
               
                do{
                    var getNumber = await functionGetNumber()
                } while(!getNumber.includes('ACCESS_NUMBER'))

                const idOrder = getNumber.split(':')[1]
                const nomor = getNumber.split(':')[2].slice(2)
        
                console.log(`Nomor 0${nomor}`)

                const deviceId = randomize('Aa0', 22)

                const getSession = await functionGenerateSession(deviceId, nomor)
                if(getSession.user.appRegistered == false){
                    const sessionId = getSession.user.sessionId
                    console.log("Nomor belum terdaftar")

                    const sendOtp = await functionSendOtp(deviceId, nomor, sessionId)
                    if(sendOtp.status.success == true){
                        console.log('OTP berhasil dikirim')
                       
                        let countGetOtp = 0;
                        let statusOtp = false;

                        console.log(`Sedang menunggu OTP`)

                        do{
                            countGetOtp++   
                            var getOtp = await functionGetOtp(idOrder)
                            if(getOtp.includes('Dear Customer')){
                                statusOtp = true;
                            }
                        } while(!getOtp.includes('Dear Customer') && countGetOtp <= 200)

                        if(statusOtp == true){

                            const otp = getOtp.match(/\d+/)[0]

                            console.log(`OTP ${otp}`)

                            const verifOtp = await functionVerifOtp(deviceId, nomor, sessionId, otp)
                            if(verifOtp.status.success == true){
                                console.log('OTP benar')
                                const token = verifOtp.auth.token
            
                                const regist = await functionRegist(deviceId, nomor, token)
                                if(regist.hasOwnProperty('createdId')){
                                    console.log("Regist sukses\n")
                                    for(var i = 0; i < 2; i++){
                                        var done = await functionChangeConfirm(idOrder)
                                    }
                                } else {
                                    console.log('Regist gagal\n')
                                    for(var i = 0; i < 2; i++){
                                        var done = await functionChangeConfirm(idOrder)
                                    }
                                }
                            } else {
                                console.log('OTP salah\n')
                                for(var i = 0; i < 2; i++){
                                    var done = await functionChangeConfirm(idOrder)
                                }
                            }
                        } else {
                            console.log('OTP gagal didapatkan\n')
                            for(var i = 0; i < 2; i++){
                                var done = await functionChangeCancel(idOrder)
                            }
                        }
                    } else {
                        console.log('OTP gagal dikirim\n')
                        for(var i = 0; i < 2; i++){
                            var done = await functionChangeCancel(idOrder)
                        }
                    }
                } else {
                    console.log('Nomor sudah terdaftar\n')
                    for(var i = 0; i < 2; i++){
                        var done = await functionChangeCancel(idOrder)
                    }
                }
            } else {
                console.log('Saldo abis !')
                break;
            }
        } catch (e) {
            console.log(e)
        }
    }
})();
