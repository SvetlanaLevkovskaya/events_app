import React from "react";
import Link from "next/link";
import Image from "next/image";


const HomePage = ({data}) => {
    return (
          <main >
              {data.map(ev => (
                <Link key={ev.id} href={`/events/${ev.id}`} passHref>

                    <Image width={300} height={300} alt={ev.title} src={ev.image} />
                    <h2>{ev.title}</h2>
                    <p>{ev.description}</p>

                </Link>
              ))}
          </main>
    );
};

export default HomePage;

