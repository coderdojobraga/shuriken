export default function Event({ title, description, link, button }) {
    return (
        <section className="bg-white mt-12 overflow-hidden">
            <div className="container mx-auto mb-20">
                <div className="flex flex-wrap justify-center">
                    <div className="ml-auto mr-auto mt-20 w-full px-12 md:w-5/12 md:px-4">
                        <h3 className="mb-2 text-3xl font-semibold leading-normal text-primary" style={{ fontFamily: "Bankai", fontSize: "3rem" }} >
                            {title}
                        </h3>
                        <p className="mt-4 mb-4 text-lg font-light leading-relaxed text-primary">
                            {description}
                        </p>
                        {button ? (
                            <a href={link}
                                className="text-primary hover:text-primary mt-4
                                mr-1 mb-1 inline-block rounded-3xl bg-white
                                px-6 py-4 text-sm font-bold uppercase shadow
                                outline-none hover:bg-purple-100"
                            >
                                {button}
                            </a>) : (
                            <></>
                        )}
                    </div>
                </div>
            </div>
        </section >
    );

}