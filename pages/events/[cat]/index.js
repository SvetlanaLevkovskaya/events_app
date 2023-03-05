
import CatEvent from "@/components/events/catEvent";

const EventPerCityPage = ({data, pageName}) => <CatEvent data={data} pageName={pageName} />;

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

    const id = contex?.params.cat;
    const {allEvents} = await import("/data/data.json");
    const data = allEvents.filter(d => d.city === id);

    return {
        props: {
            data: data,
            pageName: id,

        }
    };
}

