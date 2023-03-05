import React, { useRef, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/router";

const SingleEvent = ({event}) => {
    const inputEmail = useRef();
    const router = useRouter();
    const [ message, setMessage ] = useState("");

    const onSubmit = async (e) => {
        e.preventDefault();
        const emailValue = inputEmail.current.value;
        const eventId = router?.query.id;

        const validRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

        if (!emailValue.match(validRegex)) {
            setMessage("Please enter a valid email address. ");
        }

        try {
            const response = await fetch("/api/email-registration", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({email: emailValue, eventId}),
            });
            if (!response.ok) throw new Error("Something went wrong!");
            setMessage('You have been registered successfully!')
            inputEmail.current.value = "";
            const data = await response.json();
            console.log("POST response: ", data);
        } catch (e) {
            console.log("Error ", e);

        }


    };

    return (
      <div className="event_single_page">

          <Image src={event.image} width={1000} height={500} alt={event.title} />
          <h1>{event.title}</h1>
          <p>{event.description}</p>


          <form onSubmit={onSubmit} className="email_registration">
              <label> Get Register for this event!</label>
              <input ref={inputEmail}
                     type="text"
                     id="email"
                     placeholder="Please insert your email here" />
              <button> Submit</button>
          </form>
          <p>{message}</p>

      </div>
    );
};

export default SingleEvent;