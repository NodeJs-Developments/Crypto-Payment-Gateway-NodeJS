const express = require("express");
const http = require("http");
const app = express();
const axios = require("axios");

// Create a server
const server = http.createServer(app)

app.get("/", async (req, res) => {
    // await open('https://commerce.coinbase.com/charges/CJRLQ3KM')
    console.log(res);
    // await open('http://sindresorhus.com', {app: 'chrome'}) // Specify the app to open in
    // res.status(200).json({status:200, message: "Crypto Payment api is working",data:JSON.stringify(res.data)});
    res.status(200).json({ status: 200, message: "Crypto Payment api is working" });
})

app.get("/payment", (req, res) => {

    let data = JSON.stringify({
        "name": "Anil Patidar",
        "description": "Online payment to friend",
        "metadata": {
            "customer_id": "123",
            "customer_name": "Anil Patidar"
        },
        "redirect_url": "http://localhost:8000/",
        "local_price": {
            "amount": 0.01,
            "currency": "USD"
        },
        "pricing_type": "fixed_price",
        "cancel_url": "http://localhost:8000/"
    });

    let config = {
        method: 'post',
        url: 'https://api.commerce.coinbase.com/charges',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'X-CC-Version': '2018-03-22',
            'X-CC-Api-Key': '82ce2f39-0b06-4ca5-82ce-833cfa143b61'
        },
        data: data
    };

    axios(config)
        .then((response) => {
            // res.send(JSON.stringify(response.data))
            res.send((response.data))
            // console.log(JSON.stringify(response.data));
        })
        .catch((error) => {
            res.send(error)
            // console.log(error);
        })
});

app.get("/status/:id", (req, res) => {

    const id = req.params.id;

    let config = {
        method: 'get',
        url: `https://api.commerce.coinbase.com/charges/${id}`,
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'X-CC-Version': '2018-03-22',
            'X-CC-Api-Key': '82ce2f39-0b06-4ca5-82ce-833cfa143b61'
        }
    };

    axios(config)
        .then((response) => {
            // Check payment status
            console.log((response.data.data.timeline[1].status));
            res.send((response.data))
        })
        .catch((error) => {
            console.log(error);
        });

})


app.get("/getall", (req, res) => {
    let config = {
        method: 'get',
        url: 'https://api.commerce.coinbase.com/charges',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'X-CC-Version': '2018-03-22',
            'X-CC-Api-Key': '82ce2f39-0b06-4ca5-82ce-833cfa143b61'
        }
    };

    axios(config)
        .then((response) => {
            // console.log(JSON.stringify(response.data));
            // get total payment
            console.log(response.data.data.length);
            res.send(response.data);
        })
        .catch((error) => {
            console.log(error);
        });
})


app.get("/cancel", (req, res) => {

    let config = {
        method: 'post',
        url: 'https://api.commerce.coinbase.com/charges/KALCBW8T/cancel',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'X-CC-Version': '2018-03-22',
            'X-CC-Api-Key': '82ce2f39-0b06-4ca5-82ce-833cfa143b61'
        }
    };

    axios(config)
        .then((response) => {
            // console.log(JSON.stringify(response.data));
            res.send(response.data)
        })
        .catch((error) => {
            console.log(error);
        });

})

// given error
app.get("/resolve", (req, res) => {

    let config = {
        method: 'post',
        url: 'https://api.commerce.coinbase.com/charges/6P4CGT66/resolve',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'X-CC-Version': '2018-03-22',
            'X-CC-Api-Key': '82ce2f39-0b06-4ca5-82ce-833cfa143b61'
        }
    };

    axios(config)
        .then((response) => {
            // console.log(JSON.stringify(response.data));
            res.send(response.data)
        })
        .catch((error) => {
            // console.log(error);
            res.send(error)

        });
})

const port = process.env.PORT || 8000;
server.listen(port, () => {
    console.log(`Server is Listening on Port : ${port}`);
})