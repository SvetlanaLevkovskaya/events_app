import React from "react";
import Image from "next/image";

const SingleEvent = ({event}) => {
    return (
      <div>
          <Image src={event.image} width={1000} height={500} alt={event.title} />
          <h1>{event.title}</h1>
          <p>{event.description}</p>

          <input type='email'/>
          <button> Submit </button>
      </div>
    );
};

export default SingleEvent;