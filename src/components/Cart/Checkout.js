import React, { useState, useRef } from 'react';

import classes from './Checkout.module.css';

const isEmpty = (value) => value.trim() !== '';
const isFiveChars = (value) => value.trim().length === 5;

const Checkout = (props) => {
    const [formInputValidity, setFormInputValidity] = useState({
        name: true,
        street: true,
        postal: true,
        city: true
    })
    const nameInputRef = useRef();
    const streetInputRef = useRef();
    const postalInputRef = useRef();
    const cityInputRef = useRef();

    const confirmHandler = (event) => {
        event.preventDefault();

        const name = nameInputRef.current.value;
        const street = streetInputRef.current.value;
        const postal = postalInputRef.current.value;
        const city = cityInputRef.current.value;

        const nameIsValid = isEmpty(name);
        const streetIsValid = isEmpty(street);
        const postalIsValid = isFiveChars(postal);
        const cityIsValid = isEmpty(city);

        setFormInputValidity({
            name: nameIsValid,
            street: streetIsValid,
            postal: postalIsValid,
            city: cityIsValid
        });

        const formIsValid = nameIsValid && streetIsValid && postalIsValid && cityIsValid;

        if(!formIsValid) {
            return;
        }
        
        props.onConfirm({
            name: name,
            street: street,
            postal: postal,
            city: city
        });
    };

    const nameInputClasses = `${classes.control} ${formInputValidity.name ? '' : classes.invalid}`;
    const streetInputClasses = `${classes.control} ${formInputValidity.street ? '' : classes.invalid}`;
    const postalInputClasses = `${classes.control} ${formInputValidity.postal ? '' : classes.invalid}`;
    const cityInputClasses = `${classes.control} ${formInputValidity.city ? '' : classes.invalid}`;


    return (
        <form className={classes.form} onSubmit={confirmHandler}>
            <div className={nameInputClasses}>
                <label htmlFor='name'>Your Name</label>
                <input type='text' id='name' ref={nameInputRef} />
                {!formInputValidity.name && <p>Please enter a valid name.</p>}
            </div>
            <div className={streetInputClasses}>
                <label htmlFor='street'>Street</label>
                <input type='text' id='street' ref={streetInputRef} />
                {!formInputValidity.street && <p>Please enter a valid street.</p>}
            </div>
            <div className={postalInputClasses}>
                <label htmlFor='postal'>Postal Code</label>
                <input type='text' id='postal' ref={postalInputRef} />
                {!formInputValidity.postal && <p>Please enter a valid postal (5 characters long).</p>}
            </div>
            <div className={cityInputClasses}>
                <label htmlFor='city'>City</label>
                <input type='text' id='city' ref={cityInputRef} />
                {!formInputValidity.city && <p>Please enter a valid name.</p>}
            </div>
            <div className={classes.actions}>
                <button type="button" onClick={props.onClose}>Cancel</button>
                <button className={classes.submit}>Confirm</button>
            </div>
        </form>
    );
};

export default Checkout;