import React, { useState } from "react";
import { Footer, Header } from "@coderdojobraga/ui";
import { Disclosure } from "@headlessui/react";
import { MinusSmallIcon, PlusSmallIcon } from "@heroicons/react/24/outline";

import faqs from "~/data/faqs.json";

function Faq() {
  return (
    <>
      <Header landing={true} />

      <div className="container mx-auto mt-12">
        <h1 className="m-4 text-center text-4xl font-bold sm:text-5xl">
          FAQ&apos;s
        </h1>

        <div className="bg-primary h-8/12 container mx-auto w-6/12 py-0.5 text-center text-2xl lg:w-3/12" />

        <p className="mx-2 mt-4 text-center text-2xl leading-relaxed text-black lg:mx-12">
          Aqui podes esclarecer as perguntas mais frequentes!
        </p>
      </div>
      <div className="bg-white">
        <div className="mx-auto max-w-7xl px-6 py-8 sm:py-32 lg:py-8 lg:px-8">
          <dl className="mt-10 space-y-6 divide-y divide-gray-900/10">
            {faqs.map((faq, index) => (
              <Disclosure as="div" key={faq.question} className="pt-6">
                {({ open }) => (
                  <>
                    <dt>
                      <Disclosure.Button className="flex w-full items-start justify-between text-left text-gray-900">
                        <span className="text-2xl font-semibold leading-7">
                          {faq.question}
                        </span>
                        <span className="ml-6 flex h-7 items-center">
                          {open ? (
                            <MinusSmallIcon
                              className={`h-6 w-6 ${
                                open ? "text-primary" : "text-gray-900"
                              } transition duration-300`}
                              aria-hidden="true"
                            />
                          ) : (
                            <PlusSmallIcon
                              className={`h-6 w-6 ${
                                open ? "text-primary" : "text-gray-900"
                              } transition duration-300`}
                              aria-hidden="true"
                            />
                          )}
                        </span>
                      </Disclosure.Button>
                    </dt>
                    <Disclosure.Panel as="dd" className="mt-2 pr-12">
                      <p className="text-primary text-lg leading-7">
                        {faq.answer}
                      </p>
                    </Disclosure.Panel>
                  </>
                )}
              </Disclosure>
            ))}
          </dl>
        </div>
      </div>

      <Footer bgColor="white" fgColor="dark" />
    </>
  );
}

export default Faq;
