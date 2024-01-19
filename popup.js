let btn_step_1 = document.getElementById('btn_step_1');
let btnGetAllOrders = document.getElementById('getAllOrders');
let step_1 = document.getElementById('step_1');
let step_2 = document.getElementById('step_2');

let api_key = document.getElementById('api_key')
let shop_id = document.getElementById('shop_id')
let secrt_key = document.getElementById('secrt_key')


let currency = document.getElementById('currency')
let amount = document.getElementById('amount')
let order_id = document.getElementById('order_id')
let orders_list = document.getElementById('orders_list')




function createOrder() {

    let currency = document.getElementById('currency').value;
    let amount = document.getElementById('amount').value;
    let order_id = document.getElementById('order_id').value;

    const secret = secrt_key.value;
    const data = {
        'shop_id': shop_id.value,
        'amount': amount,
        'currency': currency,
        'order_id': order_id,
    };

    const sortedData = Object.keys(data).sort().reduce((acc, key) => {
        acc[key] = data[key];
        return acc;
    }, {});

    const queryString = Object.entries(sortedData).map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value)}`).join('&');

    const spark = new SparkMD5();
    spark.append(queryString + secret);
    const hashHex = spark.end();
    const sign = hashHex;
    let link = "https://tegro.money/pay/?amount=" + amount + "&currency=" + currency + "&order_id=" + order_id + "&shop_id=" + shop_id.value + "&sign=" + sign
    document.getElementById('wrapper_order_link').style.display = "flex";
    document.getElementById('order_link').innerText = link;
    document.getElementById('order_link').href = link;

}

function getBalance() {
    return new Promise(async (resolve) => {
        try {
            let data = {
                'shop_id': shop_id.value,
                'nonce': new Date().getTime() / 1000
            };

            debugger
            let body = JSON.stringify(data);

            const sign = CryptoJS.HmacSHA256(body, api_key.value).toString(CryptoJS.enc.Hex);
            let response = await fetch('https://tegro.money/api/balance/', {
                method: 'POST',
                body,
                headers: {
                    'Authorization': `Bearer ${sign}`,
                    'Content-Type': 'application/json'
                }
            });
            let res = await response.json();
            debugger
            resolve(res);


        } catch (err) {
            console.log(err);
            debugger
            resolve({
                data: [],
                desc: "Exception error",
                type: "error"
            });
        }
    });
}



function getAllOrder() {

    const data = {
        shop_id: shop_id.value,
        nonce: Math.floor(Date.now() / 1000),
    };

    const body = JSON.stringify(data);
    const sign = CryptoJS.HmacSHA256(body, api_key.value).toString(CryptoJS.enc.Hex);

    fetch('https://tegro.money/api/orders/', {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${sign}`,
            'Content-Type': 'application/json',
        },
        body: body,
    })
        .then(response => response.json())
        .then((result) => {
            orders_list.innerHTML = ''
            result.data.forEach(element => {
                orders_list.innerHTML += `
                    <div>id:${element.id}  amount:${element.amount} status:${element.status}</div>
                `
            });
        })
        .catch(error => console.error('Error:', error));
}





document.getElementById('createOrder').addEventListener('click', () => {
    if (amount.value != "" && order_id.value != "") {
        document.querySelector('.error_string_2').classList.remove('active')
        createOrder()
    }
    else {
        document.querySelector('.error_string_2').classList.add('active')
    }

});

btn_step_1.addEventListener('click', async () => {
    if (api_key.value != "" && shop_id.value != "") {
        step_1.classList.remove('active');
        step_2.classList.add('active');
    }
    else {
        document.querySelector('.error_string').classList.add('active')
    }

});


btnGetAllOrders.addEventListener('click', () => {
    if (api_key.value != "" && shop_id.value != "") {
        getAllOrder();
    }
});


// Получение значений из storage
getDataFromStorage('shop_id')
    .then((value) => {
        if (value !== undefined) {
            shop_id.value = value;
        }
    });
getDataFromStorage('api_key')
    .then((value) => {
        if (value !== undefined) {
            api_key.value = value;
        }
    });
getDataFromStorage('secrt_key')
    .then((value) => {
        if (value !== undefined) {
            secrt_key.value = value;
        }
    });



// запись в storage
shop_id.addEventListener('input', () => {
    saveDataToStorage("shop_id", shop_id.value)
})
api_key.addEventListener('input', () => {
    saveDataToStorage("api_key", api_key.value)
})
secrt_key.addEventListener('input', () => {
    saveDataToStorage("secrt_key", secrt_key.value)
})

function saveDataToStorage(key, value) {
    chrome.storage.local.set({ [key]: value }, function () {
        console.log('Data saved successfully');
    });
}
function getDataFromStorage(key) {
    return new Promise((resolve) => {
        chrome.storage.local.get([key], function (result) {
            const value = result[key];
            resolve(value);
        });
    });
}
