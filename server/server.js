const express = require('express');
const app = express();
const mySql = require('mysql');


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
        connection.query('INSERT INTO Users SET ?', user, (error, userResult, fields) => {
            if (error) {
                return connection.rollback(() => {
                    console.log('ERROR => insert payments=', error)
                    throw error;
                });
            };

            // addresses table
            // console.log(userResult)
            address.users_id = userResult.insertId;
            connection.query('INSERT INTO Addresses SET ?', address, (error, results, fields) => {
                if (error) {
                    return connection.rollback(() => {
                        console.log('ERROR => insert payments=', error)
                        throw error;
                    });
                };


                // payments table
                payment.users_id = userResult.insertId;
                connection.query('INSERT INTO Payments SET ?', payment, (error, results, fileds) => {
                    if (error) {
                        return connection.rollback(() => {
                            console.log('ERROR => insert payments=', error)
                            throw error;
                        });
                    };

                    connection.commit( (error) => {
                        if (error) {
                            return connection.rollback(() => {
                                console.log('ERROR => commit=', error)
                                throw error;
                            });
                        };

                        res.send(results);
                        closeConnection(connection, next);
                        console.log('transaction was successful!')
                    })

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

        connection.query('SELECT users_id, username, email FROM Users', (error, results, fields) => {
            if (error) {
                console.log(error);
                throw error;
            };

            res.send(results);
            closeConnection(connection, next);

        })

    })

})


app.get('/users/info', (req, res, next) => {

    const connection = openConnection();

    connection.beginTransaction(error => {
        if (error) {
            throw error;
        }

        const query = `
            SELECT a.username, a.email, a.password, 
                b.line_1, b.line_2, b.city, b.states, b.zip_code
            FROM Users AS a 
            INNER JOIN Addresses AS b ON b.users_id = a.users_id
            INNER JOIN Payments AS c ON c.users_id = a.users_id`;

        connection.query(query, (error, queryResult, fields) => {
            if (error) {
                throw error;
            }

            connection.commit((error) => {
                if (error) {
                    throw error;
                }

                res.send(queryResult);
                closeConnection(connection, next);
            })

        })

    })

})


app.get('/users/payment', (req, res, next) => {

    const connection = openConnection();

    connection.beginTransaction(error => {
        if (error) {
            throw error;
        }

        const query = `
            SELECT a.username, a.email, 
                c.credit_card_number, c.expiry_date, c.ccv, c.billing_zip_code
            FROM Users AS a 
            INNER JOIN Payments AS c ON c.users_id = a.users_id`;

        connection.query(query, (error, queryResult, fields) => {
            if (error) {
                throw error;
            }

            connection.commit((error) => {
                if (error) {
                    throw error;
                }

                res.send(queryResult);
                closeConnection(connection, next);
            })

        })

    })

})


app.get('/users/payment/count', (req, res, next) => {

    const connection = openConnection();

    connection.beginTransaction(error => {
        if (error) {
            throw error;
        }

        const query = `
            SELECT 
               (SELECT COUNT(c.credit_card_number) FROM Payments AS c) as PaymentAccounts,
                a.username, a.email
            FROM Users AS a 
            INNER JOIN Payments AS c ON c.users_id = a.users_id`;

        connection.query(query, (error, queryResult, fields) => {
            if (error) {
                throw error;
            }

            connection.commit((error) => {
                if (error) {
                    throw error;
                }

                res.send(queryResult);
                closeConnection(connection, next);
            })

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