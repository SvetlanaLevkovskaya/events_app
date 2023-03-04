import SingleEvent from "@/components/events/single-event";

const Page = ({event}) => <SingleEvent event={event} />;
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