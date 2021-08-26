import { Header, Footer } from "@landing";
import Developer from "landing/recruitment/Volunteer";
import Mentor from "landing/recruitment/Mentor";
import Communication from "landing/recruitment/DesignMarketing";

export default function Recruitment() {
  return (
    <>
      <Header />
      <div className="mt-12 container mx-auto">
        <h1 className="text-4xl sm:text-5xl text-center font-bold m-4">
          Junta-te ao CoderDojo!
        </h1>
        <div className="py-0.5 mx-auto w-6/12 lg:w-5/12 bg-primary h-8/12 text-2xl" />
        <p className="pt-6 text-center text-xl sm:text-xl font-normal m-4">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam non
          euismod eros, non sollicitudin nibh. Fusce imperdiet dui ac nibh
          convallis, vitae facilisis mauris lobortis. Curabitur luctus
          condimentum dolor. Curabitur magna leo, dapibus ac posuere nec,
          fringilla at ipsum. Orci varius natoque penatibus et magnis dis
          parturient montes, nascetur ridiculus mus. Mauris in urna rhoncus,
          euismod elit et, feugiat orci. Sed rutrum leo lectus. Ut tincidunt
          consectetur pellentesque. Nulla placerat ante non nisi dapibus
          tincidunt. Vestibulum ut massa nec eros vestibulum feugiat.
        </p>
      </div>
      <Mentor />
      <Communication />
      <Developer />
      <Footer bgColor="dark" fgColor="white" />
    </>
  );
}
