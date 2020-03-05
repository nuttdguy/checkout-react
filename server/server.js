const express = require('express');
const app = express();

const mySql = require('mysql');
const connection = mySql.createConnection({
    user: 'student',
    password: 'student',
    database: 'Checkout',
    port: '3306'
});


const UserModel = (data) => {
    return {
        username: data.name,
        password: data.new_password,
        email: data.email
    }
}


const AddressModel = (data) => {
    return {
        line_1: data.line_1,
        line_2: data.line_2,
        city: data.city,
        states: data.states,
        zip_code: data.zip_code
    }
}


const PaymentsModel = (data) => {
    return {
        credit_card_number: data.card_number,
        expiry_date: data.expiry_date,
        ccv: data.ccv,
        billing_zip_code: data.billing_zip_code
    }
}

app.use(express.json())

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', req.headers.origin || '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
  });


app.post('/', (req, res, next) => {
    // console.log('body=', req.body);
    const data = req.body;
    const user = UserModel(data);
    const address = AddressModel(data.address);
    const payment = PaymentsModel(data.payment);

    const connection = openConnection(); // open a connection

    connection.beginTransaction((error) => {
        if (error) {
            throw error;
        }
        // users table
        var query = connection.query('INSERT INTO Users SET ?', user, (error, results, fields) => {
            if (error) {
                return connection.rollback(() => {
                    console.log('ERROR => insert payments=', error)
                    throw error;
                });
            };

            console.log('insert user query=', query.sql)
            console.log('insert user=', results, fields)
            // addresses table
            query = connection.query('INSERT INTO Addresses SET ?', address, (error, results, fields) => {
                if (error) {
                    return connection.rollback(() => {
                        console.log('ERROR => insert payments=', error)
                        throw error;
                    });
                };


                console.log('insert address query=', query.sql)
                console.log('insert address=', results, fields)
                // payments table
                query = connection.query('INSERT INTO Payments SET ?', payment, (error, results, fileds) => {
                    if (error) {
                        return connection.rollback(() => {
                            console.log('ERROR => insert payments=', error)
                            throw error;
                        });
                    };

                    console.log('insert user payments=', query.sql)
                    console.log('insert payments=', results, fields)
                    console.log('transaction was successful!')

                    res.send(results);
                    closeConnection(connection, next);

                })

            })

        })
    })



});


app.get('/users', (req, res, next) => {

    const connection = openConnection(); // open a connection

    connection.beginTransaction( (error) => {
        if (error) {
            throw error;
        }

        var query = connection.query('SELECT users_id, username, email FROM Users', (error, results, fields) => {
            if (error) {
                console.log(error);
                throw error;
            };

            res.send(results[0]);
            closeConnection(connection, next);

        })

    })

})

var openConnection = function() {
    return mySql.createConnection({
        user: 'student',
        password: 'student',
        database: 'Checkout',
        port: '3306'
    });

}

var closeConnection = function(connection, next) {
    connection.end((err) => {
        if (err) {
            console.log(err);
            return;
        }
        console.log('Connection closed');
        next();
    })

}


const port = 3000;
app.listen(port, () => {
    console.log('Server running on port: ', port);
})