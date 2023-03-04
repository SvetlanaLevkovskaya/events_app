import Image from "next/image";
import Link from "next/link";

const EventPerCityPage = ({data, pageName}) => {
    return <div>
        <h1> Events in {pageName} </h1>
        <div>
            {data.map(ev => (
              <Link key={ev.id} href={`/events/${ev.city}/${ev.id}`} passHref>

                  <Image width={300} height={300} src={ev.image} alt={ev.title} />
                  <h2>{ev.title}</h2>
                  <p>{ev.description}</p>

              </Link>

            ))}


        </div>

    </div>;
};
export default EventPerCityPage;

export async function getStaticPaths() {

    const {events_categories} = await import("/data/data.json");
    const allPath = events_categories.map(ev => {
        return {
            params: {
                cat: ev.id.toString()
            }
        };
    });

    return {
        paths: allPath,
        fallback: false,
    };
}

export async function getStaticProps(contex) {
    //console.log(contex);
    const id = contex?.params.cat;
    const {allEvents} = await import("/data/data.json");
    const data = allEvents.filter(d => d.city === id);
    //console.log(data);
    return {
        props: {
            data: data,
            pageName: id,

        }
    };
}

