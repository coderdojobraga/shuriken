import { MessageFilled } from "@ant-design/icons";
import Image from "next/image";

export default function Event({ title, description, link }) {
    return (
        <section className="bg-primary mt-12 overflow-hidden">
            <div className="container mx-auto mb-20">
                <div className="flex flex-wrap justify-center">
                    <div className="ml-auto mr-auto mt-20 w-full px-12 md:w-5/12 md:px-4">
                        <div className="text-primary mb-6 inline-flex h-16 w-16 items-center justify-center rounded-full bg-white p-3 text-center shadow-lg">
                            <MessageFilled style={{ fontSize: "150%" }} />
                        </div>
                        <h3 className="mb-2 text-3xl font-semibold leading-normal text-white">
                            ${title}
                        </h3>
                        <p className="mt-4 mb-4 text-lg font-light leading-relaxed text-white">
                            ${description}
                        </p>
                        <a href=
                        className="text-primary hover:text-primary mt-4
                        mr-1 mb-1 inline-block rounded-3xl bg-white
                        px-6 py-4 text-sm font-bold uppercase shadow
                        outline-none hover:bg-purple-100"
                        >
                            Quero ajudar com Design e Marketing
                        </a>
                    </div>
                    <div className="relative mr-auto ml-auto w-6/12 pl-80 pt-20">
                        <Image
                            alt="Half Logo"
                            src="/img/half_logo.svg"
                            width={300}
                            height={398}
                        />
                    </div>
                </div>
            </div>
        </section >
    );
}