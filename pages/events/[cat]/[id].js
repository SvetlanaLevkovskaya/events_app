import Image from "next/image";

const Page = ({event}) => {
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
export default Page;

export async function getStaticPaths() {

    const {allEvents} = await import("/data/data.json");

    const allPaths = allEvents.map(path => {
        return {
            params: {
                cat: path.city,
                id: path.id,
            }
        };
    });

    return {
        paths: allPaths,
        fallback: false,
    };
}

export async function getStaticProps(context) {

    const {allEvents} = await import("/data/data.json");

    const event = allEvents.find(event => event.id === context.params.id);

    return {
        props: {
            event,
        }
    };
}