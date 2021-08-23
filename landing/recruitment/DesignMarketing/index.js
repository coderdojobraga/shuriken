import { MessageFilled } from "@ant-design/icons";

export default function DesignMarketing() {
    return (
        <section className="mt-12 bg-primary overflow-hidden">
            <div className="mb-20 container mx-auto">
                <div className="flex flex-wrap justify-center">
                    <div className="w-full md:w-5/12 px-12 md:px-4 ml-auto mr-auto mt-20">
                        <div className="text-primary p-3 text-center inline-flex items-center justify-center w-16 h-16 mb-6 shadow-lg rounded-full bg-white">
                            <MessageFilled style={{ fontSize: '150%' }} />
                        </div>
                        <h3 className="text-3xl mb-2 font-semibold leading-normal text-white">
                            Queres ajudar com Design e Marketing?
                        </h3>
                        <p className="text-lg font-light leading-relaxed mt-4 mb-4 text-white">
                            Lorem ipsum dolor sit amet,
                            consectetur adipiscing elit. Curabitur aliquam dui id mattis accumsan.
                            Nullam a ornare lorem, nec fermentum lorem.
                            is an open source project we wanted to continue this movement
                            too. You can give this version a try to feel the design and also
                            test the quality of the code!
                        </p>
                        <p className="text-lg font-light leading-relaxed mt-0 mb-4 text-white">
                            Praesent auctor purus sed ante gravida vehicula. Donec ut pretium enim.
                            Etiam nec massa augue. Duis semper enim a varius sollicitudin.
                            In a maximus magna.
                        </p>
                        <a
                            href=""
                            className="mt-4 inline-block text-primary 
                                       font-bold px-6 py-4 rounded outline-none
                                       mr-1 mb-1 bg-white uppercase text-sm shadow
                                       hover:bg-purple-100 hover:text-primary"
                        >
                            Quero ajudar com Design e Marketing
                        </a>
                    </div>
                    <div className="w-6/12 pl-80 pt-20 mr-auto ml-auto mt-20 relative">
                        <img
                            alt="Half Logo"
                            src="img/half_logo.png"
                            className="transform scale-150"
                        />
                    </div>
                </div>
            </div>
            <div className="mx-auto mt-12 mb-20">
                <div className="flex flex-wrap justify-center px-12 relative z-10">
                    <div className="w-full lg:w-8/12">
                        <h1 className="font-semibold text-white text-7xl">
                            "
                        </h1>
                        <p className="text-white text-2xl leading-relaxed mt-4 mb-4">
                            É realmente fantástico fazer parte de um projeto que tanto tem
                            crescido nos últimos anos e poder ajudá-lo a chegar ainda mais longe.
                            Integrar a equipa de Comunicação e Marketing do Dojo tem-me permitido ganhar
                            experiência prática na minha área e aprender imenso com os restantes mentores e voluntários.

                        </p>
                        <h1 className="font-semibold text-white text-right text-7xl">
                            "
                        </h1>
                        <p className="text-white text-2xl leading-relaxed mb-4">
                            - Francisco Alves, Ciências da Comunicação
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
}