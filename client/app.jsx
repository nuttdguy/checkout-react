const App = (props) => <div> <CheckoutForm props={props}/></div>


class CheckoutForm extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            name: '',
            email: '',
            new_password: '',
            address: {
                line_1: '',
                line_2: '',
                city: '',
                states: '',
                zip_code: ''
            },
            payment: {
                card_number: '',
                expiry_date: '',
                ccv: '',
                billing_zip_code: ''
            },
            checkoutStep: 1
        }

        this.onInputChangeHandler = this.onInputChangeHandler.bind(this);
        this.onClickHandler = this.onClickHandler.bind(this);

    }


    ////////////////////////////////////////////////
    // TEMPLATES
    onInputChangeHandler(e) {
        var target = e.target;
        var value = target.value;
        var data = target.getAttribute('data');

        // intake form
        if ( data === 'js-name') {
            this.setState({name: value})

        } else if (data === 'js-new_password') {
            this.setState({new_password: value})

        } else if (data === 'js-email') {
            this.setState({email: value})
        } 
        
        // address form
        else if (data.includes('js-address')) {
            var index = data.indexOf('_');
            data = data.slice(index+1);
            var address = Object.assign({}, this.state.address)

            if (data === 'line_1') {
                address['line_1'] = value;

            } else if (data === 'line_2') {
                address['line_2'] = value;

            } else if (data === 'city') {
                address['city'] = value;

            } else if (data === 'states') {
                address['states'] = value;

            } else if (data === 'zip_code') {
                address['zip_code'] = value;
            }
            this.setState({address: address})
        }

        // payment form
        else if (data.includes('js-payment')) {
            var index = data.indexOf('_');
            data = data.slice(index+1);
            var paymentCard = Object.assign({}, this.state.payment)

            if (data === 'card_number') {
                paymentCard['card_number'] = value;
                
            } else if (data === 'expiry_date') {
                paymentCard['expiry_date'] = value;

            } else if (data === 'ccv') {
                paymentCard['ccv'] = value;

            } else if (data === 'billing_zip_code') {
                paymentCard['billing_zip_code'] = value;
            }
            this.setState({payment: paymentCard})
        }

    }

    onClickHandler(e) {
        var action = e.target.getAttribute('data');
        var checkoutStep = this.state.checkoutStep;

        // next & submit 
        if (action === 'js-next') {
            checkoutStep = checkoutStep + 1;
        } else if (action === 'js-checkout') {
            this.submitForm();
            checkoutStep = 4;
            this.resetState();
        } else if (action === 'js-home') {
            checkoutStep = 1;
        }
        this.setState({checkoutStep: checkoutStep})

    }


    ////////////////////////////////////////////////
    // HELPER
    resetState() {
        this.setState({
            name: '',
            email: '',
            new_password: '',
            address: {
                line_1: '',
                line_2: '',
                city: '',
                states: '',
                zip_code: ''
            },
            payment: {
                card_number: '',
                expiry_date: '',
                ccv: '',
                billing_zip_code: ''}
            ,
            checkoutStep: 1
        })
    }

    submitForm() {
        var data = Object.assign({}, this.state);
        // console.log(data);
        $.ajax({
            url: 'http://127.0.0.1:3000/',
            type: 'POST',
            data: JSON.stringify(data),
            contentType: 'application/json',
            success: (data) => {
                console.log('data=', data);
            },
            error: (err) => {
                console.log('err=', err);
            }
        });
    }


    ////////////////////////////////////////////////
    // TEMPLATES
    intakeFormTemplate(name, email, new_password) {

        
        return (
            <form className='form form-intake'>
                <h3>New User Form</h3>
                <InputField 
                    label={'name'}
                    data={'js-name'}
                    type={"text"}
                    inputValue={name}
                    placeholder={'Fill in name'}
                    onInputChangeHandler={this.onInputChangeHandler}
                />
                <InputField 
                    label={'email'}
                    data={'js-email'}
                    type={"email"}
                    inputValue={email}
                    placeholder={'Fill in email'}
                    onInputChangeHandler={this.onInputChangeHandler}
                />
                <InputField 
                    label={'password'}
                    data={'js-new_password'}
                    type={"new-password"}
                    inputValue={new_password}
                    placeholder={'Fill in password'}
                    onInputChangeHandler={this.onInputChangeHandler}
                />
                <Button 
                    onClickHandler={this.onClickHandler}
                    buttonText={"Next"}
                    type={"button"}
                    data={'js-next'}
                />
            </form>
        )

    } 

    addressFormTemplate(line_1, line_2, city, states, zip_code) {

        return (
            <form className='form form-address'>
                <h3>Address Form</h3>
                <InputField 
                    label={'address-1'}
                    data={'js-address_line_1'}
                    type={"text"}
                    inputValue={line_1}
                    placeholder={'Address line 1'}
                    onInputChangeHandler={this.onInputChangeHandler}
                />
                <InputField 
                    label={'address-2'}
                    data={'js-address_line_2'}
                    type={"text"}
                    inputValue={line_2}
                    placeholder={'Address line 2'}
                    onInputChangeHandler={this.onInputChangeHandler}
                />
                <InputField 
                    label={'city'}
                    data={'js-address_city'}
                    type={"text"}
                    inputValue={city}
                    placeholder={'city'}
                    onInputChangeHandler={this.onInputChangeHandler}
                />
                <InputField 
                    label={'states'}
                    data={'js-address_states'}
                    type={"text"}
                    inputValue={states}
                    placeholder={'states'}
                    onInputChangeHandler={this.onInputChangeHandler}
                />
                <InputField 
                    label={'zip_code'}
                    data={'js-address_zip_code'}
                    type={"text"}
                    inputValue={zip_code}
                    placeholder={'zip_code'}
                    onInputChangeHandler={this.onInputChangeHandler}
                />
                <Button 
                    onClickHandler={this.onClickHandler}
                    buttonText={"Next"}
                    type={"button"}
                    data={'js-next'}
                />
            </form>
        )

    }

    paymentFormTemplate(card_number, expiry_date, ccv, billing_zip_code) {

        return (
            <form className="form form-payment">
                <h3>Payment Form</h3>
                <InputField 
                    label={'card number'}
                    data={'js-payment_card_number'}
                    type={"text"}
                    inputValue={card_number}
                    placeholder={'4444 4444 4444 4444'}
                    onInputChangeHandler={this.onInputChangeHandler}
                />
                <InputField 
                    label={'expiration date'}
                    data={'js-payment_expiry_date'}
                    type={"text"}
                    inputValue={expiry_date}
                    placeholder={'04/22'}
                    onInputChangeHandler={this.onInputChangeHandler}
                />
                <InputField 
                    label={'ccv'}
                    data={'js-payment_ccv'}
                    type={"text"}
                    inputValue={ccv}
                    placeholder={'732'}
                    onInputChangeHandler={this.onInputChangeHandler}
                />
                <InputField 
                    label={'billing zip code'}
                    data={'js-payment_billing_zip_code'}
                    type={"text"}
                    inputValue={billing_zip_code}
                    placeholder={'55555'}
                    onInputChangeHandler={this.onInputChangeHandler}
                />
                <Button 
                    onClickHandler={this.onClickHandler}
                    buttonText={"Submit"}
                    type={"button"}
                    data={'js-checkout'}
                />
            </form>
        )

    }

    successTemplate() {
        return (
            <div>
                <h1>Order successfully submitted</h1>
                <Button 
                    onClickHandler={this.onClickHandler}
                    buttonText={"Go Home"}
                    type={"button"}
                    data={'js-home'}
                />
            </div>
        )
    }

    render() {
        const {name, email, new_password,
            line_1, line_2, city, states, zip_code,
            card_number, expiry_date, ccv, billing_zip_code,
            checkoutStep } = this.state;

        return (
            <div> 
                { checkoutStep === 1 ? this.intakeFormTemplate(name, email, new_password) : null }
                { checkoutStep === 2 ? this.addressFormTemplate(line_1, line_2, city, states, zip_code) : null }
                { checkoutStep === 3 ? this.paymentFormTemplate(card_number, expiry_date, ccv, billing_zip_code) : null }
                { checkoutStep === 4 ? this.successTemplate() : null }
            </div>
        )
    }

}


const InputField = (props) => (
    <div className="input input-container">
        <label>{props.label}</label>
        <input  type={props.type}
                data={props.data}
                value={props.inputValue}
                className={props.style}
                placeholder={props.placeholder}
                onChange={props.onInputChangeHandler} />
    </div>)

const Button = (props) => (
    <div>
        <button onClick={props.onClickHandler}
                className={props.style}
                type={props.type}
                data={props.data} >
            {props.buttonText}
        </button>
    </div>
)


ReactDOM.render(<App />, document.getElementById('app'));