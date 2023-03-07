import { Footer, Header } from "@coderdojobraga/ui";
import Member from "~/components/Member";

import team from "~/data/halloffame.json";

export default function HallOfFame() {
    return (
      <>
        <Header landing={true} />
  
        <div className="container mx-auto mt-12">
          <h1 className="m-4 text-center text-4xl font-bold sm:text-5xl">
            Hall Of Fame
          </h1>
  
          <div className="bg-primary h-8/12 container mx-auto w-6/12 py-0.5 text-center text-2xl lg:w-3/12" />
  
          <p className="mx-2 mt-4 mb-4 text-center text-2xl leading-relaxed text-black lg:mx-12">
            Não nos podemos esquecer daqueles que tornaram o CoderDojo tão especial até à data.            
          </p>
        </div>
  
        <div className="relative mb-20">
          <div className="container mx-auto pt-20">
            <div className="mx-2 -mt-12 flex flex-wrap lg:mx-12">
              {team.map((entry) => (
                <Member key={entry.name} {...entry} />
              ))}
            </div>
          </div>
        </div>
  
        <Footer bgColor="white" fgColor="dark" />
      </>
    );
  }