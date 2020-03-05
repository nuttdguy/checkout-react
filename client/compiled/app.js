const App = props => React.createElement(
    'div',
    null,
    ' ',
    React.createElement(CheckoutForm, { props: props })
);

class CheckoutForm extends React.Component {
    constructor(props) {
        super(props);

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
        };

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
        if (data === 'js-name') {
            this.setState({ name: value });
        } else if (data === 'js-new_password') {
            this.setState({ new_password: value });
        } else if (data === 'js-email') {
            this.setState({ email: value });
        }

        // address form
        else if (data.includes('js-address')) {
                var index = data.indexOf('_');
                data = data.slice(index + 1);
                var address = Object.assign({}, this.state.address);

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
                this.setState({ address: address });
            }

            // payment form
            else if (data.includes('js-payment')) {
                    var index = data.indexOf('_');
                    data = data.slice(index + 1);
                    var paymentCard = Object.assign({}, this.state.payment);

                    if (data === 'card_number') {
                        paymentCard['card_number'] = value;
                    } else if (data === 'expiry_date') {
                        paymentCard['expiry_date'] = value;
                    } else if (data === 'ccv') {
                        paymentCard['ccv'] = value;
                    } else if (data === 'billing_zip_code') {
                        paymentCard['billing_zip_code'] = value;
                    }
                    this.setState({ payment: paymentCard });
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
        this.setState({ checkoutStep: checkoutStep });
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
                billing_zip_code: '' },

            checkoutStep: 1
        });
    }

    submitForm() {
        var data = Object.assign({}, this.state);
        console.log(data);
        $.ajax({
            url: 'http://127.0.0.1:3000/',
            type: 'POST',
            data: JSON.stringify(data),
            contentType: 'application/json',
            success: data => {
                console.log('data=', data);
            },
            error: err => {
                console.log('err=', err);
            }
        });
    }

    ////////////////////////////////////////////////
    // TEMPLATES
    intakeFormTemplate(name, email, new_password) {

        return React.createElement(
            'form',
            { className: 'form form-intake' },
            React.createElement(
                'h3',
                null,
                'New User Form'
            ),
            React.createElement(InputField, {
                label: 'name',
                data: 'js-name',
                type: "text",
                inputValue: name,
                placeholder: 'Fill in name',
                onInputChangeHandler: this.onInputChangeHandler
            }),
            React.createElement(InputField, {
                label: 'email',
                data: 'js-email',
                type: "email",
                inputValue: email,
                placeholder: 'Fill in email',
                onInputChangeHandler: this.onInputChangeHandler
            }),
            React.createElement(InputField, {
                label: 'password',
                data: 'js-new_password',
                type: "new-password",
                inputValue: new_password,
                placeholder: 'Fill in password',
                onInputChangeHandler: this.onInputChangeHandler
            }),
            React.createElement(Button, {
                onClickHandler: this.onClickHandler,
                buttonText: "Next",
                type: "button",
                data: 'js-next'
            })
        );
    }

    addressFormTemplate(line_1, line_2, city, states, zip_code) {

        return React.createElement(
            'form',
            { className: 'form form-address' },
            React.createElement(
                'h3',
                null,
                'Address Form'
            ),
            React.createElement(InputField, {
                label: 'address-1',
                data: 'js-address_line_1',
                type: "text",
                inputValue: line_1,
                placeholder: 'Address line 1',
                onInputChangeHandler: this.onInputChangeHandler
            }),
            React.createElement(InputField, {
                label: 'address-2',
                data: 'js-address_line_2',
                type: "text",
                inputValue: line_2,
                placeholder: 'Address line 2',
                onInputChangeHandler: this.onInputChangeHandler
            }),
            React.createElement(InputField, {
                label: 'city',
                data: 'js-address_city',
                type: "text",
                inputValue: city,
                placeholder: 'city',
                onInputChangeHandler: this.onInputChangeHandler
            }),
            React.createElement(InputField, {
                label: 'states',
                data: 'js-address_states',
                type: "text",
                inputValue: states,
                placeholder: 'states',
                onInputChangeHandler: this.onInputChangeHandler
            }),
            React.createElement(InputField, {
                label: 'city',
                data: 'js-address_zip_code',
                type: "text",
                inputValue: zip_code,
                placeholder: 'zip_code',
                onInputChangeHandler: this.onInputChangeHandler
            }),
            React.createElement(Button, {
                onClickHandler: this.onClickHandler,
                buttonText: "Next",
                type: "button",
                data: 'js-next'
            })
        );
    }

    paymentFormTemplate(card_number, expiry_date, ccv, billing_zip_code) {

        return React.createElement(
            'form',
            { className: 'form form-payment' },
            React.createElement(
                'h3',
                null,
                'Payment Form'
            ),
            React.createElement(InputField, {
                label: 'card number',
                data: 'js-payment_card_number',
                type: "text",
                inputValue: card_number,
                placeholder: '4444 4444 4444 4444',
                onInputChangeHandler: this.onInputChangeHandler
            }),
            React.createElement(InputField, {
                label: 'expiration date',
                data: 'js-payment_expiry_date',
                type: "text",
                inputValue: expiry_date,
                placeholder: '04/22',
                onInputChangeHandler: this.onInputChangeHandler
            }),
            React.createElement(InputField, {
                label: 'ccv',
                data: 'js-payment_ccv',
                type: "text",
                inputValue: ccv,
                placeholder: '732',
                onInputChangeHandler: this.onInputChangeHandler
            }),
            React.createElement(InputField, {
                label: 'billing zip code',
                data: 'js-payment_billing_zip_code',
                type: "text",
                inputValue: billing_zip_code,
                placeholder: '55555',
                onInputChangeHandler: this.onInputChangeHandler
            }),
            React.createElement(Button, {
                onClickHandler: this.onClickHandler,
                buttonText: "Submit",
                type: "button",
                data: 'js-checkout'
            })
        );
    }

    successTemplate() {
        return React.createElement(
            'div',
            null,
            React.createElement(
                'h1',
                null,
                'Order successfully submitted'
            ),
            React.createElement(Button, {
                onClickHandler: this.onClickHandler,
                buttonText: "Go Home",
                type: "button",
                data: 'js-home'
            })
        );
    }

    render() {
        const { name, email, new_password,
            line_1, line_2, city, states, zip_code,
            card_number, expiry_date, ccv, billing_zip_code,
            checkoutStep } = this.state;

        // console.log('checkout step=', checkoutStep)

        return React.createElement(
            'div',
            null,
            checkoutStep === 1 ? this.intakeFormTemplate(name, email, new_password) : null,
            checkoutStep === 2 ? this.addressFormTemplate(line_1, line_2, city, states, zip_code) : null,
            checkoutStep === 3 ? this.paymentFormTemplate(card_number, expiry_date, ccv, billing_zip_code) : null,
            checkoutStep === 4 ? this.successTemplate() : null
        );
    }

}

const InputField = props => React.createElement(
    React.Fragment,
    null,
    React.createElement(
        'label',
        null,
        props.label
    ),
    React.createElement('input', { type: props.type,
        data: props.data,
        value: props.inputValue,
        className: props.style,
        placeholder: props.placeholder,
        onChange: props.onInputChangeHandler })
);

const Button = props => React.createElement(
    React.Fragment,
    null,
    React.createElement(
        'button',
        { onClick: props.onClickHandler,
            className: props.style,
            type: props.type,
            data: props.data },
        props.buttonText
    )
);

ReactDOM.render(React.createElement(App, null), document.getElementById('app'));
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL2FwcC5qc3giXSwibmFtZXMiOlsiQXBwIiwicHJvcHMiLCJDaGVja291dEZvcm0iLCJSZWFjdCIsIkNvbXBvbmVudCIsImNvbnN0cnVjdG9yIiwic3RhdGUiLCJuYW1lIiwiZW1haWwiLCJuZXdfcGFzc3dvcmQiLCJhZGRyZXNzIiwibGluZV8xIiwibGluZV8yIiwiY2l0eSIsInN0YXRlcyIsInppcF9jb2RlIiwicGF5bWVudCIsImNhcmRfbnVtYmVyIiwiZXhwaXJ5X2RhdGUiLCJjY3YiLCJiaWxsaW5nX3ppcF9jb2RlIiwiY2hlY2tvdXRTdGVwIiwib25JbnB1dENoYW5nZUhhbmRsZXIiLCJiaW5kIiwib25DbGlja0hhbmRsZXIiLCJlIiwidGFyZ2V0IiwidmFsdWUiLCJkYXRhIiwiZ2V0QXR0cmlidXRlIiwic2V0U3RhdGUiLCJpbmNsdWRlcyIsImluZGV4IiwiaW5kZXhPZiIsInNsaWNlIiwiT2JqZWN0IiwiYXNzaWduIiwicGF5bWVudENhcmQiLCJhY3Rpb24iLCJzdWJtaXRGb3JtIiwicmVzZXRTdGF0ZSIsImNvbnNvbGUiLCJsb2ciLCIkIiwiYWpheCIsInVybCIsInR5cGUiLCJKU09OIiwic3RyaW5naWZ5IiwiY29udGVudFR5cGUiLCJzdWNjZXNzIiwiZXJyb3IiLCJlcnIiLCJpbnRha2VGb3JtVGVtcGxhdGUiLCJhZGRyZXNzRm9ybVRlbXBsYXRlIiwicGF5bWVudEZvcm1UZW1wbGF0ZSIsInN1Y2Nlc3NUZW1wbGF0ZSIsInJlbmRlciIsIklucHV0RmllbGQiLCJsYWJlbCIsImlucHV0VmFsdWUiLCJzdHlsZSIsInBsYWNlaG9sZGVyIiwiQnV0dG9uIiwiYnV0dG9uVGV4dCIsIlJlYWN0RE9NIiwiZG9jdW1lbnQiLCJnZXRFbGVtZW50QnlJZCJdLCJtYXBwaW5ncyI6IkFBQUEsTUFBTUEsTUFBT0MsS0FBRCxJQUFXO0FBQUE7QUFBQTtBQUFBO0FBQU0sd0JBQUMsWUFBRCxJQUFjLE9BQU9BLEtBQXJCO0FBQU4sQ0FBdkI7O0FBR0EsTUFB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QUFBQTtBQUNJO0FBQUE7QUFBQTtBQUFRQSxjQUFNMEQ7QUFBZCxLQURKO0FBRUksbUNBQVEsTUFBTTFELE1BQU02QyxJQUFwQjtBQUNRLGNBQU03QyxNQUFNMkIsSUFEcEI7QUFFUSxlQUFPM0IsTUFBTTJELFVBRnJCO0FBR1EsbUJBQVczRCxNQUFNNEQsS0FIekI7QUFJUSxxQkFBYTVELE1BQU02RCxXQUozQjtBQUtRLGtCQUFVN0QsTUFBTXFCLG9CQUx4QjtBQUZKLENBREo7O0FBV0EsTUFBTXlDLFNBQVU5RCxLQUFELElBQ1g7QUFBQyxTQUFELENBQU8sUUFBUDtBQUFBO0FBQ0k7QUFBQTtBQUFBLFVBQVEsU0FBU0EsTUFBTXVCLGNBQXZCO0FBQ1EsdUJBQVd2QixNQUFNNEQsS0FEekI7QUFFUSxrQkFBTTVELE1BQU02QyxJQUZwQjtBQUdRLGtCQUFNN0MsTUFBTTJCLElBSHBCO0FBSUszQixjQUFNK0Q7QUFKWDtBQURKLENBREo7O0FBWUFDLFNBQVNSLE1BQVQsQ0FBZ0Isb0JBQUMsR0FBRCxPQUFoQixFQUF5QlMsU0FBU0MsY0FBVCxDQUF3QixLQUF4QixDQUF6QiIsImZpbGUiOiJhcHAuanMiLCJzb3VyY2VzQ29udGVudCI6WyJjb25zdCBBcHAgPSAocHJvcHMpID0+IDxkaXY+IDxDaGVja291dEZvcm0gcHJvcHM9e3Byb3BzfS8+PC9kaXY+XG5cblxuY2xhc3MgQ2hlY2tvdXRGb3JtIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcbiAgICBjb25zdHJ1Y3Rvcihwcm9wcykge1xuICAgICAgICBzdXBlcihwcm9wcylcblxuICAgICAgICB0aGlzLnN0YXRlID0ge1xuICAgICAgICAgICAgbmFtZTogJycsXG4gICAgICAgICAgICBlbWFpbDogJycsXG4gICAgICAgICAgICBuZXdfcGFzc3dvcmQ6ICcnLFxuICAgICAgICAgICAgYWRkcmVzczoge1xuICAgICAgICAgICAgICAgIGxpbmVfMTogJycsXG4gICAgICAgICAgICAgICAgbGluZV8yOiAnJyxcbiAgICAgICAgICAgICAgICBjaXR5OiAnJyxcbiAgICAgICAgICAgICAgICBzdGF0ZXM6ICcnLFxuICAgICAgICAgICAgICAgIHppcF9jb2RlOiAnJ1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHBheW1lbnQ6IHtcbiAgICAgICAgICAgICAgICBjYXJkX251bWJlcjogJycsXG4gICAgICAgICAgICAgICAgZXhwaXJ5X2RhdGU6ICcnLFxuICAgICAgICAgICAgICAgIGNjdjogJycsXG4gICAgICAgICAgICAgICAgYmlsbGluZ196aXBfY29kZTogJydcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBjaGVja291dFN0ZXA6IDFcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMub25JbnB1dENoYW5nZUhhbmRsZXIgPSB0aGlzLm9uSW5wdXRDaGFuZ2VIYW5kbGVyLmJpbmQodGhpcyk7XG4gICAgICAgIHRoaXMub25DbGlja0hhbmRsZXIgPSB0aGlzLm9uQ2xpY2tIYW5kbGVyLmJpbmQodGhpcyk7XG5cbiAgICB9XG5cblxuICAgIC8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xuICAgIC8vIFRFTVBMQVRFU1xuICAgIG9uSW5wdXRDaGFuZ2VIYW5kbGVyKGUpIHtcbiAgICAgICAgdmFyIHRhcmdldCA9IGUudGFyZ2V0O1xuICAgICAgICB2YXIgdmFsdWUgPSB0YXJnZXQudmFsdWU7XG4gICAgICAgIHZhciBkYXRhID0gdGFyZ2V0LmdldEF0dHJpYnV0ZSgnZGF0YScpO1xuXG4gICAgICAgIC8vIGludGFrZSBmb3JtXG4gICAgICAgIGlmICggZGF0YSA9PT0gJ2pzLW5hbWUnKSB7XG4gICAgICAgICAgICB0aGlzLnNldFN0YXRlKHtuYW1lOiB2YWx1ZX0pXG5cbiAgICAgICAgfSBlbHNlIGlmIChkYXRhID09PSAnanMtbmV3X3Bhc3N3b3JkJykge1xuICAgICAgICAgICAgdGhpcy5zZXRTdGF0ZSh7bmV3X3Bhc3N3b3JkOiB2YWx1ZX0pXG5cbiAgICAgICAgfSBlbHNlIGlmIChkYXRhID09PSAnanMtZW1haWwnKSB7XG4gICAgICAgICAgICB0aGlzLnNldFN0YXRlKHtlbWFpbDogdmFsdWV9KVxuICAgICAgICB9IFxuICAgICAgICBcbiAgICAgICAgLy8gYWRkcmVzcyBmb3JtXG4gICAgICAgIGVsc2UgaWYgKGRhdGEuaW5jbHVkZXMoJ2pzLWFkZHJlc3MnKSkge1xuICAgICAgICAgICAgdmFyIGluZGV4ID0gZGF0YS5pbmRleE9mKCdfJyk7XG4gICAgICAgICAgICBkYXRhID0gZGF0YS5zbGljZShpbmRleCsxKTtcbiAgICAgICAgICAgIHZhciBhZGRyZXNzID0gT2JqZWN0LmFzc2lnbih7fSwgdGhpcy5zdGF0ZS5hZGRyZXNzKVxuXG4gICAgICAgICAgICBpZiAoZGF0YSA9PT0gJ2xpbmVfMScpIHtcbiAgICAgICAgICAgICAgICBhZGRyZXNzWydsaW5lXzEnXSA9IHZhbHVlO1xuXG4gICAgICAgICAgICB9IGVsc2UgaWYgKGRhdGEgPT09ICdsaW5lXzInKSB7XG4gICAgICAgICAgICAgICAgYWRkcmVzc1snbGluZV8yJ10gPSB2YWx1ZTtcblxuICAgICAgICAgICAgfSBlbHNlIGlmIChkYXRhID09PSAnY2l0eScpIHtcbiAgICAgICAgICAgICAgICBhZGRyZXNzWydjaXR5J10gPSB2YWx1ZTtcblxuICAgICAgICAgICAgfSBlbHNlIGlmIChkYXRhID09PSAnc3RhdGVzJykge1xuICAgICAgICAgICAgICAgIGFkZHJlc3NbJ3N0YXRlcyddID0gdmFsdWU7XG5cbiAgICAgICAgICAgIH0gZWxzZSBpZiAoZGF0YSA9PT0gJ3ppcF9jb2RlJykge1xuICAgICAgICAgICAgICAgIGFkZHJlc3NbJ3ppcF9jb2RlJ10gPSB2YWx1ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRoaXMuc2V0U3RhdGUoe2FkZHJlc3M6IGFkZHJlc3N9KVxuICAgICAgICB9XG5cbiAgICAgICAgLy8gcGF5bWVudCBmb3JtXG4gICAgICAgIGVsc2UgaWYgKGRhdGEuaW5jbHVkZXMoJ2pzLXBheW1lbnQnKSkge1xuICAgICAgICAgICAgdmFyIGluZGV4ID0gZGF0YS5pbmRleE9mKCdfJyk7XG4gICAgICAgICAgICBkYXRhID0gZGF0YS5zbGljZShpbmRleCsxKTtcbiAgICAgICAgICAgIHZhciBwYXltZW50Q2FyZCA9IE9iamVjdC5hc3NpZ24oe30sIHRoaXMuc3RhdGUucGF5bWVudClcblxuICAgICAgICAgICAgaWYgKGRhdGEgPT09ICdjYXJkX251bWJlcicpIHtcbiAgICAgICAgICAgICAgICBwYXltZW50Q2FyZFsnY2FyZF9udW1iZXInXSA9IHZhbHVlO1xuICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgfSBlbHNlIGlmIChkYXRhID09PSAnZXhwaXJ5X2RhdGUnKSB7XG4gICAgICAgICAgICAgICAgcGF5bWVudENhcmRbJ2V4cGlyeV9kYXRlJ10gPSB2YWx1ZTtcblxuICAgICAgICAgICAgfSBlbHNlIGlmIChkYXRhID09PSAnY2N2Jykge1xuICAgICAgICAgICAgICAgIHBheW1lbnRDYXJkWydjY3YnXSA9IHZhbHVlO1xuXG4gICAgICAgICAgICB9IGVsc2UgaWYgKGRhdGEgPT09ICdiaWxsaW5nX3ppcF9jb2RlJykge1xuICAgICAgICAgICAgICAgIHBheW1lbnRDYXJkWydiaWxsaW5nX3ppcF9jb2RlJ10gPSB2YWx1ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRoaXMuc2V0U3RhdGUoe3BheW1lbnQ6IHBheW1lbnRDYXJkfSlcbiAgICAgICAgfVxuXG4gICAgfVxuXG4gICAgb25DbGlja0hhbmRsZXIoZSkge1xuICAgICAgICB2YXIgYWN0aW9uID0gZS50YXJnZXQuZ2V0QXR0cmlidXRlKCdkYXRhJyk7XG4gICAgICAgIHZhciBjaGVja291dFN0ZXAgPSB0aGlzLnN0YXRlLmNoZWNrb3V0U3RlcDtcblxuICAgICAgICAvLyBuZXh0ICYgc3VibWl0IFxuICAgICAgICBpZiAoYWN0aW9uID09PSAnanMtbmV4dCcpIHtcbiAgICAgICAgICAgIGNoZWNrb3V0U3RlcCA9IGNoZWNrb3V0U3RlcCArIDE7XG4gICAgICAgIH0gZWxzZSBpZiAoYWN0aW9uID09PSAnanMtY2hlY2tvdXQnKSB7XG4gICAgICAgICAgICB0aGlzLnN1Ym1pdEZvcm0oKTtcbiAgICAgICAgICAgIGNoZWNrb3V0U3RlcCA9IDQ7XG4gICAgICAgICAgICB0aGlzLnJlc2V0U3RhdGUoKTtcbiAgICAgICAgfSBlbHNlIGlmIChhY3Rpb24gPT09ICdqcy1ob21lJykge1xuICAgICAgICAgICAgY2hlY2tvdXRTdGVwID0gMTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLnNldFN0YXRlKHtjaGVja291dFN0ZXA6IGNoZWNrb3V0U3RlcH0pXG5cbiAgICB9XG5cblxuICAgIC8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xuICAgIC8vIEhFTFBFUlxuICAgIHJlc2V0U3RhdGUoKSB7XG4gICAgICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgICAgICAgbmFtZTogJycsXG4gICAgICAgICAgICBlbWFpbDogJycsXG4gICAgICAgICAgICBuZXdfcGFzc3dvcmQ6ICcnLFxuICAgICAgICAgICAgYWRkcmVzczoge1xuICAgICAgICAgICAgICAgIGxpbmVfMTogJycsXG4gICAgICAgICAgICAgICAgbGluZV8yOiAnJyxcbiAgICAgICAgICAgICAgICBjaXR5OiAnJyxcbiAgICAgICAgICAgICAgICBzdGF0ZXM6ICcnLFxuICAgICAgICAgICAgICAgIHppcF9jb2RlOiAnJ1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHBheW1lbnQ6IHtcbiAgICAgICAgICAgICAgICBjYXJkX251bWJlcjogJycsXG4gICAgICAgICAgICAgICAgZXhwaXJ5X2RhdGU6ICcnLFxuICAgICAgICAgICAgICAgIGNjdjogJycsXG4gICAgICAgICAgICAgICAgYmlsbGluZ196aXBfY29kZTogJyd9XG4gICAgICAgICAgICAsXG4gICAgICAgICAgICBjaGVja291dFN0ZXA6IDFcbiAgICAgICAgfSlcbiAgICB9XG5cbiAgICBzdWJtaXRGb3JtKCkge1xuICAgICAgICB2YXIgZGF0YSA9IE9iamVjdC5hc3NpZ24oe30sIHRoaXMuc3RhdGUpO1xuICAgICAgICBjb25zb2xlLmxvZyhkYXRhKTtcbiAgICAgICAgJC5hamF4KHtcbiAgICAgICAgICAgIHVybDogJ2h0dHA6Ly8xMjcuMC4wLjE6MzAwMC8nLFxuICAgICAgICAgICAgdHlwZTogJ1BPU1QnLFxuICAgICAgICAgICAgZGF0YTogSlNPTi5zdHJpbmdpZnkoZGF0YSksXG4gICAgICAgICAgICBjb250ZW50VHlwZTogJ2FwcGxpY2F0aW9uL2pzb24nLFxuICAgICAgICAgICAgc3VjY2VzczogKGRhdGEpID0+IHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygnZGF0YT0nLCBkYXRhKTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBlcnJvcjogKGVycikgPT4ge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCdlcnI9JywgZXJyKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfVxuXG5cbiAgICAvLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cbiAgICAvLyBURU1QTEFURVNcbiAgICBpbnRha2VGb3JtVGVtcGxhdGUobmFtZSwgZW1haWwsIG5ld19wYXNzd29yZCkge1xuICAgICAgICBcbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIDxmb3JtIGNsYXNzTmFtZT0nZm9ybSBmb3JtLWludGFrZSc+XG4gICAgICAgICAgICAgICAgPGgzPk5ldyBVc2VyIEZvcm08L2gzPlxuICAgICAgICAgICAgICAgIDxJbnB1dEZpZWxkIFxuICAgICAgICAgICAgICAgICAgICBsYWJlbD17J25hbWUnfVxuICAgICAgICAgICAgICAgICAgICBkYXRhPXsnanMtbmFtZSd9XG4gICAgICAgICAgICAgICAgICAgIHR5cGU9e1widGV4dFwifVxuICAgICAgICAgICAgICAgICAgICBpbnB1dFZhbHVlPXtuYW1lfVxuICAgICAgICAgICAgICAgICAgICBwbGFjZWhvbGRlcj17J0ZpbGwgaW4gbmFtZSd9XG4gICAgICAgICAgICAgICAgICAgIG9uSW5wdXRDaGFuZ2VIYW5kbGVyPXt0aGlzLm9uSW5wdXRDaGFuZ2VIYW5kbGVyfVxuICAgICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICAgICAgPElucHV0RmllbGQgXG4gICAgICAgICAgICAgICAgICAgIGxhYmVsPXsnZW1haWwnfVxuICAgICAgICAgICAgICAgICAgICBkYXRhPXsnanMtZW1haWwnfVxuICAgICAgICAgICAgICAgICAgICB0eXBlPXtcImVtYWlsXCJ9XG4gICAgICAgICAgICAgICAgICAgIGlucHV0VmFsdWU9e2VtYWlsfVxuICAgICAgICAgICAgICAgICAgICBwbGFjZWhvbGRlcj17J0ZpbGwgaW4gZW1haWwnfVxuICAgICAgICAgICAgICAgICAgICBvbklucHV0Q2hhbmdlSGFuZGxlcj17dGhpcy5vbklucHV0Q2hhbmdlSGFuZGxlcn1cbiAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgICAgIDxJbnB1dEZpZWxkIFxuICAgICAgICAgICAgICAgICAgICBsYWJlbD17J3Bhc3N3b3JkJ31cbiAgICAgICAgICAgICAgICAgICAgZGF0YT17J2pzLW5ld19wYXNzd29yZCd9XG4gICAgICAgICAgICAgICAgICAgIHR5cGU9e1wibmV3LXBhc3N3b3JkXCJ9XG4gICAgICAgICAgICAgICAgICAgIGlucHV0VmFsdWU9e25ld19wYXNzd29yZH1cbiAgICAgICAgICAgICAgICAgICAgcGxhY2Vob2xkZXI9eydGaWxsIGluIHBhc3N3b3JkJ31cbiAgICAgICAgICAgICAgICAgICAgb25JbnB1dENoYW5nZUhhbmRsZXI9e3RoaXMub25JbnB1dENoYW5nZUhhbmRsZXJ9XG4gICAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICAgICA8QnV0dG9uIFxuICAgICAgICAgICAgICAgICAgICBvbkNsaWNrSGFuZGxlcj17dGhpcy5vbkNsaWNrSGFuZGxlcn1cbiAgICAgICAgICAgICAgICAgICAgYnV0dG9uVGV4dD17XCJOZXh0XCJ9XG4gICAgICAgICAgICAgICAgICAgIHR5cGU9e1wiYnV0dG9uXCJ9XG4gICAgICAgICAgICAgICAgICAgIGRhdGE9eydqcy1uZXh0J31cbiAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgPC9mb3JtPlxuICAgICAgICApXG5cbiAgICB9IFxuXG4gICAgYWRkcmVzc0Zvcm1UZW1wbGF0ZShsaW5lXzEsIGxpbmVfMiwgY2l0eSwgc3RhdGVzLCB6aXBfY29kZSkge1xuXG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICA8Zm9ybSBjbGFzc05hbWU9J2Zvcm0gZm9ybS1hZGRyZXNzJz5cbiAgICAgICAgICAgICAgICA8aDM+QWRkcmVzcyBGb3JtPC9oMz5cbiAgICAgICAgICAgICAgICA8SW5wdXRGaWVsZCBcbiAgICAgICAgICAgICAgICAgICAgbGFiZWw9eydhZGRyZXNzLTEnfVxuICAgICAgICAgICAgICAgICAgICBkYXRhPXsnanMtYWRkcmVzc19saW5lXzEnfVxuICAgICAgICAgICAgICAgICAgICB0eXBlPXtcInRleHRcIn1cbiAgICAgICAgICAgICAgICAgICAgaW5wdXRWYWx1ZT17bGluZV8xfVxuICAgICAgICAgICAgICAgICAgICBwbGFjZWhvbGRlcj17J0FkZHJlc3MgbGluZSAxJ31cbiAgICAgICAgICAgICAgICAgICAgb25JbnB1dENoYW5nZUhhbmRsZXI9e3RoaXMub25JbnB1dENoYW5nZUhhbmRsZXJ9XG4gICAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICAgICA8SW5wdXRGaWVsZCBcbiAgICAgICAgICAgICAgICAgICAgbGFiZWw9eydhZGRyZXNzLTInfVxuICAgICAgICAgICAgICAgICAgICBkYXRhPXsnanMtYWRkcmVzc19saW5lXzInfVxuICAgICAgICAgICAgICAgICAgICB0eXBlPXtcInRleHRcIn1cbiAgICAgICAgICAgICAgICAgICAgaW5wdXRWYWx1ZT17bGluZV8yfVxuICAgICAgICAgICAgICAgICAgICBwbGFjZWhvbGRlcj17J0FkZHJlc3MgbGluZSAyJ31cbiAgICAgICAgICAgICAgICAgICAgb25JbnB1dENoYW5nZUhhbmRsZXI9e3RoaXMub25JbnB1dENoYW5nZUhhbmRsZXJ9XG4gICAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICAgICA8SW5wdXRGaWVsZCBcbiAgICAgICAgICAgICAgICAgICAgbGFiZWw9eydjaXR5J31cbiAgICAgICAgICAgICAgICAgICAgZGF0YT17J2pzLWFkZHJlc3NfY2l0eSd9XG4gICAgICAgICAgICAgICAgICAgIHR5cGU9e1widGV4dFwifVxuICAgICAgICAgICAgICAgICAgICBpbnB1dFZhbHVlPXtjaXR5fVxuICAgICAgICAgICAgICAgICAgICBwbGFjZWhvbGRlcj17J2NpdHknfVxuICAgICAgICAgICAgICAgICAgICBvbklucHV0Q2hhbmdlSGFuZGxlcj17dGhpcy5vbklucHV0Q2hhbmdlSGFuZGxlcn1cbiAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgICAgIDxJbnB1dEZpZWxkIFxuICAgICAgICAgICAgICAgICAgICBsYWJlbD17J3N0YXRlcyd9XG4gICAgICAgICAgICAgICAgICAgIGRhdGE9eydqcy1hZGRyZXNzX3N0YXRlcyd9XG4gICAgICAgICAgICAgICAgICAgIHR5cGU9e1widGV4dFwifVxuICAgICAgICAgICAgICAgICAgICBpbnB1dFZhbHVlPXtzdGF0ZXN9XG4gICAgICAgICAgICAgICAgICAgIHBsYWNlaG9sZGVyPXsnc3RhdGVzJ31cbiAgICAgICAgICAgICAgICAgICAgb25JbnB1dENoYW5nZUhhbmRsZXI9e3RoaXMub25JbnB1dENoYW5nZUhhbmRsZXJ9XG4gICAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICAgICA8SW5wdXRGaWVsZCBcbiAgICAgICAgICAgICAgICAgICAgbGFiZWw9eydjaXR5J31cbiAgICAgICAgICAgICAgICAgICAgZGF0YT17J2pzLWFkZHJlc3NfemlwX2NvZGUnfVxuICAgICAgICAgICAgICAgICAgICB0eXBlPXtcInRleHRcIn1cbiAgICAgICAgICAgICAgICAgICAgaW5wdXRWYWx1ZT17emlwX2NvZGV9XG4gICAgICAgICAgICAgICAgICAgIHBsYWNlaG9sZGVyPXsnemlwX2NvZGUnfVxuICAgICAgICAgICAgICAgICAgICBvbklucHV0Q2hhbmdlSGFuZGxlcj17dGhpcy5vbklucHV0Q2hhbmdlSGFuZGxlcn1cbiAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgICAgIDxCdXR0b24gXG4gICAgICAgICAgICAgICAgICAgIG9uQ2xpY2tIYW5kbGVyPXt0aGlzLm9uQ2xpY2tIYW5kbGVyfVxuICAgICAgICAgICAgICAgICAgICBidXR0b25UZXh0PXtcIk5leHRcIn1cbiAgICAgICAgICAgICAgICAgICAgdHlwZT17XCJidXR0b25cIn1cbiAgICAgICAgICAgICAgICAgICAgZGF0YT17J2pzLW5leHQnfVxuICAgICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICA8L2Zvcm0+XG4gICAgICAgIClcblxuICAgIH1cblxuICAgIHBheW1lbnRGb3JtVGVtcGxhdGUoY2FyZF9udW1iZXIsIGV4cGlyeV9kYXRlLCBjY3YsIGJpbGxpbmdfemlwX2NvZGUpIHtcblxuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgPGZvcm0gY2xhc3NOYW1lPVwiZm9ybSBmb3JtLXBheW1lbnRcIj5cbiAgICAgICAgICAgICAgICA8aDM+UGF5bWVudCBGb3JtPC9oMz5cbiAgICAgICAgICAgICAgICA8SW5wdXRGaWVsZCBcbiAgICAgICAgICAgICAgICAgICAgbGFiZWw9eydjYXJkIG51bWJlcid9XG4gICAgICAgICAgICAgICAgICAgIGRhdGE9eydqcy1wYXltZW50X2NhcmRfbnVtYmVyJ31cbiAgICAgICAgICAgICAgICAgICAgdHlwZT17XCJ0ZXh0XCJ9XG4gICAgICAgICAgICAgICAgICAgIGlucHV0VmFsdWU9e2NhcmRfbnVtYmVyfVxuICAgICAgICAgICAgICAgICAgICBwbGFjZWhvbGRlcj17JzQ0NDQgNDQ0NCA0NDQ0IDQ0NDQnfVxuICAgICAgICAgICAgICAgICAgICBvbklucHV0Q2hhbmdlSGFuZGxlcj17dGhpcy5vbklucHV0Q2hhbmdlSGFuZGxlcn1cbiAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgICAgIDxJbnB1dEZpZWxkIFxuICAgICAgICAgICAgICAgICAgICBsYWJlbD17J2V4cGlyYXRpb24gZGF0ZSd9XG4gICAgICAgICAgICAgICAgICAgIGRhdGE9eydqcy1wYXltZW50X2V4cGlyeV9kYXRlJ31cbiAgICAgICAgICAgICAgICAgICAgdHlwZT17XCJ0ZXh0XCJ9XG4gICAgICAgICAgICAgICAgICAgIGlucHV0VmFsdWU9e2V4cGlyeV9kYXRlfVxuICAgICAgICAgICAgICAgICAgICBwbGFjZWhvbGRlcj17JzA0LzIyJ31cbiAgICAgICAgICAgICAgICAgICAgb25JbnB1dENoYW5nZUhhbmRsZXI9e3RoaXMub25JbnB1dENoYW5nZUhhbmRsZXJ9XG4gICAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICAgICA8SW5wdXRGaWVsZCBcbiAgICAgICAgICAgICAgICAgICAgbGFiZWw9eydjY3YnfVxuICAgICAgICAgICAgICAgICAgICBkYXRhPXsnanMtcGF5bWVudF9jY3YnfVxuICAgICAgICAgICAgICAgICAgICB0eXBlPXtcInRleHRcIn1cbiAgICAgICAgICAgICAgICAgICAgaW5wdXRWYWx1ZT17Y2N2fVxuICAgICAgICAgICAgICAgICAgICBwbGFjZWhvbGRlcj17JzczMid9XG4gICAgICAgICAgICAgICAgICAgIG9uSW5wdXRDaGFuZ2VIYW5kbGVyPXt0aGlzLm9uSW5wdXRDaGFuZ2VIYW5kbGVyfVxuICAgICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICAgICAgPElucHV0RmllbGQgXG4gICAgICAgICAgICAgICAgICAgIGxhYmVsPXsnYmlsbGluZyB6aXAgY29kZSd9XG4gICAgICAgICAgICAgICAgICAgIGRhdGE9eydqcy1wYXltZW50X2JpbGxpbmdfemlwX2NvZGUnfVxuICAgICAgICAgICAgICAgICAgICB0eXBlPXtcInRleHRcIn1cbiAgICAgICAgICAgICAgICAgICAgaW5wdXRWYWx1ZT17YmlsbGluZ196aXBfY29kZX1cbiAgICAgICAgICAgICAgICAgICAgcGxhY2Vob2xkZXI9eyc1NTU1NSd9XG4gICAgICAgICAgICAgICAgICAgIG9uSW5wdXRDaGFuZ2VIYW5kbGVyPXt0aGlzLm9uSW5wdXRDaGFuZ2VIYW5kbGVyfVxuICAgICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICAgICAgPEJ1dHRvbiBcbiAgICAgICAgICAgICAgICAgICAgb25DbGlja0hhbmRsZXI9e3RoaXMub25DbGlja0hhbmRsZXJ9XG4gICAgICAgICAgICAgICAgICAgIGJ1dHRvblRleHQ9e1wiU3VibWl0XCJ9XG4gICAgICAgICAgICAgICAgICAgIHR5cGU9e1wiYnV0dG9uXCJ9XG4gICAgICAgICAgICAgICAgICAgIGRhdGE9eydqcy1jaGVja291dCd9XG4gICAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgIDwvZm9ybT5cbiAgICAgICAgKVxuXG4gICAgfVxuXG4gICAgc3VjY2Vzc1RlbXBsYXRlKCkge1xuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgPGRpdj5cbiAgICAgICAgICAgICAgICA8aDE+T3JkZXIgc3VjY2Vzc2Z1bGx5IHN1Ym1pdHRlZDwvaDE+XG4gICAgICAgICAgICAgICAgPEJ1dHRvbiBcbiAgICAgICAgICAgICAgICAgICAgb25DbGlja0hhbmRsZXI9e3RoaXMub25DbGlja0hhbmRsZXJ9XG4gICAgICAgICAgICAgICAgICAgIGJ1dHRvblRleHQ9e1wiR28gSG9tZVwifVxuICAgICAgICAgICAgICAgICAgICB0eXBlPXtcImJ1dHRvblwifVxuICAgICAgICAgICAgICAgICAgICBkYXRhPXsnanMtaG9tZSd9XG4gICAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICApXG4gICAgfVxuXG4gICAgcmVuZGVyKCkge1xuICAgICAgICBjb25zdCB7bmFtZSwgZW1haWwsIG5ld19wYXNzd29yZCxcbiAgICAgICAgICAgIGxpbmVfMSwgbGluZV8yLCBjaXR5LCBzdGF0ZXMsIHppcF9jb2RlLFxuICAgICAgICAgICAgY2FyZF9udW1iZXIsIGV4cGlyeV9kYXRlLCBjY3YsIGJpbGxpbmdfemlwX2NvZGUsXG4gICAgICAgICAgICBjaGVja291dFN0ZXAgfSA9IHRoaXMuc3RhdGU7XG5cbiAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKCdjaGVja291dCBzdGVwPScsIGNoZWNrb3V0U3RlcClcblxuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgPGRpdj4gXG4gICAgICAgICAgICAgICAgeyBjaGVja291dFN0ZXAgPT09IDEgPyB0aGlzLmludGFrZUZvcm1UZW1wbGF0ZShuYW1lLCBlbWFpbCwgbmV3X3Bhc3N3b3JkKSA6IG51bGwgfVxuICAgICAgICAgICAgICAgIHsgY2hlY2tvdXRTdGVwID09PSAyID8gdGhpcy5hZGRyZXNzRm9ybVRlbXBsYXRlKGxpbmVfMSwgbGluZV8yLCBjaXR5LCBzdGF0ZXMsIHppcF9jb2RlKSA6IG51bGwgfVxuICAgICAgICAgICAgICAgIHsgY2hlY2tvdXRTdGVwID09PSAzID8gdGhpcy5wYXltZW50Rm9ybVRlbXBsYXRlKGNhcmRfbnVtYmVyLCBleHBpcnlfZGF0ZSwgY2N2LCBiaWxsaW5nX3ppcF9jb2RlKSA6IG51bGwgfVxuICAgICAgICAgICAgICAgIHsgY2hlY2tvdXRTdGVwID09PSA0ID8gdGhpcy5zdWNjZXNzVGVtcGxhdGUoKSA6IG51bGwgfVxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgIClcbiAgICB9XG5cbn1cblxuXG5jb25zdCBJbnB1dEZpZWxkID0gKHByb3BzKSA9PiAoXG4gICAgPFJlYWN0LkZyYWdtZW50PlxuICAgICAgICA8bGFiZWw+e3Byb3BzLmxhYmVsfTwvbGFiZWw+XG4gICAgICAgIDxpbnB1dCAgdHlwZT17cHJvcHMudHlwZX1cbiAgICAgICAgICAgICAgICBkYXRhPXtwcm9wcy5kYXRhfVxuICAgICAgICAgICAgICAgIHZhbHVlPXtwcm9wcy5pbnB1dFZhbHVlfVxuICAgICAgICAgICAgICAgIGNsYXNzTmFtZT17cHJvcHMuc3R5bGV9XG4gICAgICAgICAgICAgICAgcGxhY2Vob2xkZXI9e3Byb3BzLnBsYWNlaG9sZGVyfVxuICAgICAgICAgICAgICAgIG9uQ2hhbmdlPXtwcm9wcy5vbklucHV0Q2hhbmdlSGFuZGxlcn0gLz5cbiAgICA8L1JlYWN0LkZyYWdtZW50PilcblxuY29uc3QgQnV0dG9uID0gKHByb3BzKSA9PiAoXG4gICAgPFJlYWN0LkZyYWdtZW50PlxuICAgICAgICA8YnV0dG9uIG9uQ2xpY2s9e3Byb3BzLm9uQ2xpY2tIYW5kbGVyfVxuICAgICAgICAgICAgICAgIGNsYXNzTmFtZT17cHJvcHMuc3R5bGV9XG4gICAgICAgICAgICAgICAgdHlwZT17cHJvcHMudHlwZX1cbiAgICAgICAgICAgICAgICBkYXRhPXtwcm9wcy5kYXRhfSA+XG4gICAgICAgICAgICB7cHJvcHMuYnV0dG9uVGV4dH1cbiAgICAgICAgPC9idXR0b24+XG4gICAgPC9SZWFjdC5GcmFnbWVudD5cbilcblxuXG5SZWFjdERPTS5yZW5kZXIoPEFwcCAvPiwgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2FwcCcpKTsiXX0=